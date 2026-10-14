---
id: TC-02-14 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [NFR-09] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-14] Android back on the category screen closes the app

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `NFR-09` — module constraint |
| **Role** | Parent (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The app is installed on the Android 12 emulator with its data cleared (first launch).

## Test data

| What | Value / source |
| --- | --- |
| Device language | Polish (unless stated otherwise) |
| Content | the app's shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open the app | The category screen is shown | screenshot |
| 2 | Press the Android back action | The app closes and the home screen is shown | screenshot |

## Pass criterion

- Back on the category screen leaves the app.

## Cleanup

- Clear the app's data on the emulator.
