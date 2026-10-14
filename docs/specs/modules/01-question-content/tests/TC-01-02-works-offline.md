---
id: TC-01-02 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-01
covers: [US-01-01#4, US-01-02#7, NFR-12] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-01-02] The app opens and plays a card with the network switched off

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-01-01#4`, `US-01-02#7`, `NFR-12` |
| **Role** | Parent (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The app is installed on the Android 12 emulator with its data cleared (first launch).
- The emulator's network can be switched off.

## Test data

| What | Value / source |
| --- | --- |
| Device language | Polish (unless stated otherwise) |
| Content | the app's shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Switch the emulator's network off (airplane mode) | The network is off | screenshot |
| 2 | Open the app | The category screen appears | screenshot |
| 3 | Choose 3+ and touch the card | A question appears, then its answer | screenshot |

## Pass criterion

- With no network the app opens and shows a question and its answer.

## Cleanup

- Switch the network back on.
- Clear the app's data on the emulator.

## Out of scope for this test

- That the app requests no network permission — unit test suite (manifest check).
