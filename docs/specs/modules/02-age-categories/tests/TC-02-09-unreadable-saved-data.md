---
id: TC-02-09 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [MOD-02-F08] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-09] Unreadable saved data makes the category screen behave as on first launch

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `MOD-02-F08` |
| **Role** | Parent (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The app is installed on the Android 12 emulator with its data cleared (first launch).
- The app-state bridge is available to overwrite the saved data.

## Test data

| What | Value / source |
| --- | --- |
| Device language | Polish (unless stated otherwise) |
| Content | the app's shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Replace the app's saved data with unreadable content | The saved data is unreadable | app state |
| 2 | Open the app | The category screen opens without an error, with no continue entry, in the device language | screenshot |

## Pass criterion

- With unreadable saved data the app opens as on first launch.

## Cleanup

- Clear the app's data on the emulator.
