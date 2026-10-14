---
id: TC-02-07 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [US-02-02#3] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-07] After a restart, continue resumes the last category at its first unseen card

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-02-02#3` |
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
| 1 | Open 4+ and reveal three answers, noting the fourth question | Three answers revealed; the fourth question is on screen | screenshot + app state |
| 2 | Close the app fully and open it again | The category screen shows a continue entry for 4+ | screenshot |
| 3 | Touch the continue entry | The noted fourth question is shown, answer hidden | screenshot + app state |

## Pass criterion

- After a restart the continue entry opens the 4+ deck at its fourth card.

## Cleanup

- Clear the app's data on the emulator.
