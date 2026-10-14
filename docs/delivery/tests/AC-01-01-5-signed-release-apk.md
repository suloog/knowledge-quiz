---
id: AC-01-01-5 # derived by the delivery loop from US-01-01#5 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-01#5, NFR-06, NFR-13] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-01-5] The release APK is signed with a key kept outside the repository

|  |  |
| --- | --- |
| **Layer** | mobile — the release build's configuration (unit test suite) and a release APK built in the acceptance run (`scripts/test-acceptance.sh`) |
| **Verifies** | `US-01-01#5`, `NFR-06`, `NFR-13` |
| **Role** | — (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed; no signing key in it.
- For steps 4–6: the Android SDK build tools (`apksigner`, `aapt`) and a JDK (`keytool`).

## Test data

| What | Value / source |
| --- | --- |
| Signing key | named by the Gradle properties `KQ_UPLOAD_STORE_FILE`, `KQ_UPLOAD_STORE_PASSWORD`, `KQ_UPLOAD_KEY_ALIAS`, `KQ_UPLOAD_KEY_PASSWORD` — names only, never values |
| Throwaway key (steps 4–6) | generated with `keytool` for the run in a temporary directory outside the repository and the run directory, deleted after the build (`DEC-44`) |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Generate the app's build configuration and read the release build type | It is signed with the release signing configuration, not the debug key | console |
| 2 | Read the release signing configuration | The keystore, alias and passwords come from the `KQ_UPLOAD_*` Gradle properties or environment variables, nothing from the repository | console |
| 3 | Read what a release build does when those properties are missing | It fails and names the missing properties | console |
| 4 | Build the release APK with a throwaway key passed only through the `KQ_UPLOAD_*` environment variables | The build succeeds and writes `app-release.apk` | console (`release-build.log`) |
| 5 | Verify the APK's signature with `apksigner verify --print-certs` | It verifies, and its certificate is the throwaway key's, not the debug key's | console (`release/apksigner.txt`) |
| 6 | Read the APK's minimum SDK with `aapt dump badging` | `sdkVersion:'31'` — Android 12 and newer only (`NFR-10`) | console (`release/badging.txt`) |

## Pass criterion

- A release build can only be signed with the key kept outside the repository.

## Out of scope for this test

- Signing with the real upload key — it stays with Maciej (`DEC-09`); done by hand (README, *Release APK*).
