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
| **Layer** | mobile — the release build's configuration (unit test suite) |
| **Verifies** | `US-01-01#5`, `NFR-06`, `NFR-13` |
| **Role** | — (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed; no signing key in it.

## Test data

| What | Value / source |
| --- | --- |
| Signing key | named by the Gradle properties `KQ_UPLOAD_STORE_FILE`, `KQ_UPLOAD_STORE_PASSWORD`, `KQ_UPLOAD_KEY_ALIAS`, `KQ_UPLOAD_KEY_PASSWORD` — names only, never values |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Generate the app's build configuration and read the release build type | It is signed with the release signing configuration, not the debug key | console |
| 2 | Read the release signing configuration | The keystore, alias and passwords come from the `KQ_UPLOAD_*` Gradle properties or environment variables, nothing from the repository | console |
| 3 | Read what a release build does when those properties are missing | It fails and names the missing properties | console |

## Pass criterion

- A release build can only be signed with the key kept outside the repository.

## Out of scope for this test

- Building and signing a real release APK — needs Maciej's key (`DEC-09`); done by hand (README, *Release APK*).
