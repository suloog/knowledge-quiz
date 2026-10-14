---
id: TC-03-11 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [MOD-03-F08] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-11] An unreadable saved deck starts a fresh shuffle

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `MOD-03-F08` — module constraint |
| **Role** | Parent (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The app is installed on the Android 12 emulator with its data cleared (first launch).
- The app-state bridge is available to overwrite the saved deck.

## Test data

| What | Value / source |
| --- | --- |
| Device language | Polish (unless stated otherwise) |
| Content | the app's shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Replace the saved 3+ deck with unreadable content | The saved deck is unreadable | app state |
| 2 | Open the app and choose 3+ | A question is shown without an error; the deck starts from its first card | screenshot + app state |

## Pass criterion

- The category opens with a fresh deck and no error.

## Cleanup

- Clear the app's data on the emulator.
