---
id: TC-01-01 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-01
covers: [US-01-01#2, NFR-10] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-01-01] The app installs and opens on an Android 12 emulator

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-01-01#2`, `NFR-10` |
| **Role** | Parent (no sign-in) |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- A clean Android 12 (API 31) emulator with the app not installed.

## Test data

| What | Value / source |
| --- | --- |
| Device language | Polish (unless stated otherwise) |
| Content | the app's shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Install the app on a clean Android 12 (API 31) emulator | Installation completes without error | screenshot |
| 2 | Open the app | The app opens and shows its first screen without an error dialog | screenshot |

## Pass criterion

- The app opens on Android 12 without an error.

## Cleanup

- Uninstall the app.

## Out of scope for this test

- The Kompakt — `TC-01-03`.
- What the first screen shows — `TC-02-01`.
