---
id: AC-01-01-1 # derived by the delivery loop from US-01-01#1 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-01#1, MOD-01-F01] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-01-1] The platform versions the app is built on are recorded

|  |  |
| --- | --- |
| **Layer** | mobile — the app's build configuration (unit test suite) |
| **Verifies** | `US-01-01#1`, `MOD-01-F01` |
| **Role** | — (no sign-in) |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Test data

| What | Value / source |
| --- | --- |
| Recorded versions | the *Platform versions* section of the README |
| Installed versions | the installed Expo, Expo Router, React Native, React and TypeScript packages; the Android SDK levels React Native builds with |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Compare the recorded Expo, Expo Router, React Native, React and TypeScript versions with the installed ones | Each recorded version is the installed one | console |
| 2 | Compare the recorded Android versions with the app's build settings | The oldest supported Android is 12 (API 31), and the target and compile SDK are the ones the build uses | console |

## Pass criterion

- The README records the platform versions the app is actually built on.

## Out of scope for this test

- Whether these are the latest stable versions — settled by `DEC-06` and `DEC-42` at the upgrade.
