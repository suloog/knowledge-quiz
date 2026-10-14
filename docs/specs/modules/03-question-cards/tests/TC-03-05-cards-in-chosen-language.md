---
id: TC-03-05 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-01#5] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-05] Cards appear in the language chosen on the category screen

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-03-01#5` |
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
| 1 | Switch to English on the category screen and choose 3+ | The question is in English | screenshot |
| 2 | Touch the card | The answer is in English | screenshot |

## Pass criterion

- Question and answer are shown in the chosen language.

## Cleanup

- Clear the app's data on the emulator.
