---
id: TC-03-06 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-01#6, NFR-01, NFR-03] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: manual-only # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-06] On the Kompakt the answer appears within 1 s of a touch, with no animation

|  |  |
| --- | --- |
| **Layer** | mobile — Mudita Kompakt, by hand |
| **Verifies** | `US-03-01#6`, `NFR-01`, `NFR-03` |
| **Role** | Child (no sign-in) |
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
| 1 | Choose 3+ on the Kompakt and start a recording | A question is shown | screenshot |
| 2 | Touch the card; repeat for five cards | Each answer is fully drawn within 1 s, with no animation | screenshot (recording) |

## Pass criterion

- All five reveals take at most 1 s with no animation.

## Cleanup

- Nothing to remove: a manual check on the reference device leaves the app as it is.
