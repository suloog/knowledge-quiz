---
id: TC-02-03 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [US-02-01#7, NFR-02] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: manual-only # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-03] The category screen appears within 3 s of launch on the Kompakt

|  |  |
| --- | --- |
| **Layer** | mobile — Mudita Kompakt, by hand |
| **Verifies** | `US-02-01#7`, `NFR-02` |
| **Role** | Parent (no sign-in) |
| **Type** | nfr |
| **Automation** | manual-only |
| **Depends on** | — |

## Preconditions

- A release build of the app is installed on the Mudita Kompakt with its data cleared.

## Test data

| What | Value / source |
| --- | --- |
| Device | Mudita Kompakt (Android 12) |
| Measuring | a stopwatch or screen recording on a second device |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Close the app fully and start a recording | — | — |
| 2 | Open the app | The category screen is fully drawn | screenshot |
| 3 | Measure the time from the touch on the app icon to the drawn screen | At most 3 s, measured three times | screenshot (recording) |

## Pass criterion

- All three measurements are at most 3 s.

## Cleanup

- Nothing to remove: a manual check on the reference device leaves the app as it is.
