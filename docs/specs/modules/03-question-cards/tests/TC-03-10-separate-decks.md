---
id: TC-03-10 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-02#4] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-10] Each category keeps its own position

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-03-02#4` |
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
| 1 | Choose 3+ and reveal three answers, go back | Back on the category screen | app state |
| 2 | Choose 4+ | 4+ shows its first card | screenshot + app state |
| 3 | Go back and choose 3+ | 3+ shows its fourth card | screenshot + app state |

## Pass criterion

- Using 4+ does not move the 3+ deck, and 3+ does not move 4+.

## Cleanup

- Clear the app's data on the emulator.
