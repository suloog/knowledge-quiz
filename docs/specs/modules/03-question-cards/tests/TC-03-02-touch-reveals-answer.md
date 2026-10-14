---
id: TC-03-02 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-01#2] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-02] Touching the card reveals the answer below a line, and the question stays

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-03-01#2` |
| **Role** | Child (no sign-in) |
| **Type** | happy-path |
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
| 1 | Choose 3+ | A question is shown | screenshot |
| 2 | Touch the middle of the card | The answer appears below the question, separated by a horizontal line; the question is still there | screenshot |

## Pass criterion

- The answer appears below the question, which stays visible.

## Cleanup

- Clear the app's data on the emulator.
