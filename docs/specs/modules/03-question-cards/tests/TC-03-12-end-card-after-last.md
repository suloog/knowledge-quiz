---
id: TC-03-12 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-03#1] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-12] After the last card the end card appears

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-03-03#1` |
| **Role** | Parent (no sign-in) |
| **Type** | happy-path |
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
| 1 | Set the 3+ deck to 49 answers revealed | The saved state shows one card left | app state |
| 2 | Choose 3+, reveal the last answer and touch again | An end card says the deck is finished and offers "again" and "categories" | screenshot |

## Pass criterion

- The end card follows the 50th card.

## Cleanup

- Clear the app's data on the emulator.
