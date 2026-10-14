---
id: TC-02-06 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [US-02-02#2] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-06] After a category is used, a continue entry for it stands above the unchanged list

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-02-02#2` |
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
| 1 | Open the app and choose 4+ | A 4+ card is shown | screenshot |
| 2 | Go back to the categories | A continue entry naming 4+ stands above the list, visibly set apart | screenshot |
| 3 | Read the list below it | Still "3+", "4+", "5+" in that order | screenshot |

## Pass criterion

- A continue entry for 4+ is shown above a list whose order has not changed.

## Cleanup

- Clear the app's data on the emulator.
