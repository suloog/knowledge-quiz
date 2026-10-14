---
id: TC-02-01 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [US-02-01#1, US-02-01#2] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-01] Launch opens on the category screen listing 3+, 4+ and 5+ in that order

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-02-01#1`, `US-02-01#2` |
| **Role** | Parent (no sign-in) |
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
| 1 | Open the app | The category screen is shown | screenshot |
| 2 | Read the list | Three entries in the order "3+", "4+", "5+" | screenshot |

## Pass criterion

- The first screen is the category list 3+, 4+, 5+ in that order.

## Cleanup

- Clear the app's data on the emulator.

## Out of scope for this test

- Continue entry — `TC-02-05`…`TC-02-08`.
