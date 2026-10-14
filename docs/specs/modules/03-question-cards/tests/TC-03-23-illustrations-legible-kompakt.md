---
id: TC-03-23 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-03
covers: [US-03-05#5] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: manual-only # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-03-23] Every illustration is legible on the Kompakt

|  |  |
| --- | --- |
| **Layer** | mobile — Mudita Kompakt, by hand |
| **Verifies** | `US-03-05#5` |
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
| Who judges | the product owner, during the content review |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Go through every illustrated question on the Kompakt | Each illustration is shown | screenshot |
| 2 | Judge each illustration | The subject of each picture is recognisable at arm's length | screenshot (one per illustration) |

## Pass criterion

- Every illustration is recognisable on the Kompakt.

## Cleanup

- Nothing to remove: a manual check on the reference device leaves the app as it is.
