# knowledge-quiz

A quiz app for the Mudita Kompakt E-ink phone (Android), built with Expo / React Native from
`ordergroup/boilerplate-react-native-expo`. Specification: `docs/specs/`.

## Platform versions

The boilerplate brought up to the latest stable versions before any feature work (`DEC-06`,
`DEC-42`); `yarn.lock` pins the exact versions below (`package.json` holds the ranges).

| What | Version |
| --- | --- |
| Expo SDK | 57 (`expo` 57.0.28, `expo-router` 57.0.26) |
| React Native | 0.86.3 (New Architecture, Hermes) |
| React | 19.2.3 |
| TypeScript | 6.0.3 |
| Android | minSdk 31 (Android 12, `NFR-10`), targetSdk and compileSdk 36 |

## Start the whole stack

```bash
yarn stack
```

From a fresh clone this one command checks the tools, installs the dependencies, uses the running
Android emulator or boots one (an Android 12 AVD, or the one named by `KQ_AVD=<name>`), builds the
app, installs it, opens it and keeps the Metro bundler running. When a tool is missing it says
which and stops. Ctrl-C stops the bundler, and the emulator too when `yarn stack` booted it.

The app has no backend: the emulator, the app and its bundler are the whole stack.

What it needs: Node.js 22+, Yarn 1, a JDK 17+, the Android SDK (`ANDROID_HOME`) with the emulator
and an Android 12 (API 31) AVD.

## Tests

| Command | What it runs |
| --- | --- |
| `yarn test` | unit tests (Jest + React Native Testing Library), with coverage |
| `yarn test:acceptance` | builds the release APK with a throwaway key and checks it (`apksigner`, `aapt`); runs the start command's script (`scripts/stack.sh`) and, on that debug build, the Maestro flow tagged `debug-build` (TC-00-01); stops the stack, installs the release APK and runs every other flow in `tests/maestro/` on it with Metro stopped; then the unit tests. JUnit reports go to `test-results/` (or `$OG_RUN_DIR`) |

Acceptance tests need Maestro (`curl -Ls https://get.maestro.mobile.dev | bash`), the Android
SDK build tools (`apksigner`, `aapt`) and a running Android 12 emulator: start it before
`yarn test:acceptance`, which stops at once when no device is attached — the offline flows run on
the release build after the stack has stopped, so the emulator must not be one the stack booted
(and stops). Each Maestro
flow is named after its test case (`TC-NN-MM …`). Only TC-00-01, which checks that `yarn stack` builds
and starts the app, runs on the debug build; every other flow runs on the signed release APK
(owner's decision, 2026-10-15), because the debug build crashes intermittently when a flow
relaunches it with a cleared state (a native SIGSEGV on the JS thread `mqt_v_js` right after
`Running "main"`, about one flow in six per run). A new flow runs on the release build unless it is
tagged `debug-build`. CI runs `yarn test:acceptance` on every pull
request on an Android 12 emulator (`.github/workflows/acceptance.yml`) and uploads the JUnit
reports as the artifact `og-test-results`; a new test needs no change to the workflow.

## Release APK

The APK installed on the Kompakt (`NFR-13`) is the release build, signed with the upload key Maciej
keeps outside the repository (`NFR-06`, `DEC-09`, `DEC-44`). The build reads the key from four
Gradle properties — in `~/.gradle/gradle.properties` or as environment variables of the same names;
an environment variable wins over the Gradle property (`DEC-45`):

| Property | What |
| --- | --- |
| `KQ_UPLOAD_STORE_FILE` | absolute path of the keystore |
| `KQ_UPLOAD_STORE_PASSWORD` | the keystore's password |
| `KQ_UPLOAD_KEY_ALIAS` | the key's alias |
| `KQ_UPLOAD_KEY_PASSWORD` | the key's password |

```bash
npx expo prebuild --platform android
(cd android && ./gradlew assembleRelease)
# → android/app/build/outputs/apk/release/app-release.apk
```

Without the four properties the release build stops and names the missing ones; it is never signed
with the debug key. The release build asks for no network permission (`NFR-05`); check a built APK
with `$ANDROID_HOME/build-tools/<version>/aapt dump permissions <apk>`. The debug build that
`yarn stack` runs keeps the Internet permission: it loads its JavaScript from the Metro bundler.

`yarn test:acceptance` builds the same release APK with a throwaway key it generates with `keytool`
for the run (in a temporary directory, deleted after the build) and passes through the four
variables — never the upload key.

## Gates

`yarn format:check`, `yarn lint`, `yarn tsc` and `yarn test` — the og plugin runs them before every
commit and push. `yarn prettier` fixes formatting.
