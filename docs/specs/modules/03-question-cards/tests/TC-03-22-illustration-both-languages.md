---
id: TC-03-22 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-05#4] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-22] A question shows the same illustration in both languages

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-03-05#4` |
| **Role** | Child (no sign-in) |
| **Type** | edge |
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
| 1 | Open the illustrated question in Polish | The illustration is shown | screenshot |
| 2 | Switch to English and open the same question | The same illustration is shown, with no text in it | screenshot |

## Pass criterion

- The illustration is identical in Polish and English.

## Cleanup

- Clear the app's data on the emulator.
