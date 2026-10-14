---
id: TC-02-08 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [US-02-02#4] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-08] Continue on a finished deck opens its end card

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-02-02#4` |
| **Role** | Parent (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | — |

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
| 1 | Set the 3+ deck to all 50 answers revealed, last used 3+ | The saved state shows 3+ finished | app state |
| 2 | Open the app | A continue entry for 3+ is shown | screenshot |
| 3 | Touch the continue entry | The 3+ end card is shown | screenshot |

## Pass criterion

- Continue on a finished deck shows the end card.

## Cleanup

- Clear the app's data on the emulator.
