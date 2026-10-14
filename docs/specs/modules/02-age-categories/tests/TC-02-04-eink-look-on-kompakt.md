---
id: TC-02-04 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-02
covers: [NFR-03, NFR-07] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: manual-only # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-02-04] The category screen is pure black and white with no animation on the Kompakt

|  |  |
| --- | --- |
| **Layer** | mobile — Mudita Kompakt, by hand |
| **Verifies** | `NFR-03`, `NFR-07` |
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

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open the app on the Kompakt | The category screen is shown | screenshot |
| 2 | Look at every element, then choose a category and come back | Only black and white, nothing moves or fades between screens | screenshot (recording) |

## Pass criterion

- No grey, no colour and no animation is seen on the Kompakt.

## Cleanup

- Nothing to remove: a manual check on the reference device leaves the app as it is.

## Out of scope for this test

- The automatic colour and animation checks — unit test suite.
