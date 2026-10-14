---
id: TC-03-15 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [MOD-03-F09] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [TC-03-12] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-15] An app closed on the end card reopens the category on its end card

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `MOD-03-F09` — module constraint |
| **Role** | Parent (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | `TC-03-12` |

## Preconditions

- The app is installed on the Android 12 emulator with its data cleared (first launch).
- The app-state bridge is available to set the deck state.

## Test data

| What | Value / source |
| --- | --- |
| Device language | Polish (unless stated otherwise) |
| Content | the app's shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Bring 3+ to its end card | The end card is shown | screenshot |
| 2 | Close the app fully, open it and choose 3+ | The end card is shown again | screenshot |

## Pass criterion

- A finished deck stays finished after closing.

## Cleanup

- Clear the app's data on the emulator.
