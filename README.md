# knowledge-quiz

A quiz app for the Mudita Kompakt E-ink phone (Android), built with Expo / React Native from
`ordergroup/boilerplate-react-native-expo`. Specification: `docs/specs/`.

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
| `yarn test:acceptance` | `yarn stack` and the Maestro flows in `tests/maestro/`, then the unit tests; JUnit reports go to `test-results/` (or `$OG_RUN_DIR`) |

Acceptance tests need Maestro (`curl -Ls https://get.maestro.mobile.dev | bash`). Each Maestro
flow is named after its test case (`TC-NN-MM …`). CI runs `yarn test:acceptance` on every pull
request on an Android 12 emulator (`.github/workflows/acceptance.yml`) and uploads the JUnit
reports as the artifact `og-test-results`; a new test needs no change to the workflow.

## Gates

`yarn format:check`, `yarn lint`, `yarn tsc` and `yarn test` — the og plugin runs them before every
commit and push. `yarn prettier` fixes formatting.
