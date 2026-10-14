---
id: TC-03-21 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-05#3] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-21] An illustration shows with its question from the start and after the reveal

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-03-05#3` |
| **Role** | Child (no sign-in) |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The app is installed on the Android 12 emulator with its data cleared (first launch).
- The app-state bridge is available to bring a chosen question to the front of the deck.

## Test data

| What | Value / source |
| --- | --- |
| Question | any question with an illustration, from the shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open a category on a question that has an illustration | The illustration is shown with the question, before any touch | screenshot |
| 2 | Touch the card | The answer appears; the illustration is still shown | screenshot |

## Pass criterion

- The illustration is visible both before and after the reveal.

## Cleanup

- Clear the app's data on the emulator.
