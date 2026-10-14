---
id: AC-01-01-3 # derived by the delivery loop from US-01-01#3 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-01#3, NFR-05] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-01-3] The installed app asks for no network permission

|  |  |
| --- | --- |
| **Layer** | mobile — the release build's manifest (unit test suite) |
| **Verifies** | `US-01-01#3`, `NFR-05` |
| **Role** | — (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Test data

| What | Value / source |
| --- | --- |
| Build | the release build — the one installed on the Kompakt (`DEC-44`) |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Generate the release build's manifest from the app's configuration | It removes the Internet, network state and Wi-Fi state permissions | console |

## Pass criterion

- The release build declares no network permission.

## Out of scope for this test

- The debug build used for development and the e2e tests, which keeps the Internet permission to load its code from the bundler (`DEC-44`).
- Checking the permissions of a built and signed APK — done by hand with `aapt` when a release APK is built (README, *Release APK*).
