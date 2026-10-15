---
id: AC-02-01-3 # derived by the delivery loop from US-02-01#3 — not reviewed; /og:tests can promote it
module: MOD-02
covers: [US-02-01#3, MOD-02-F03] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-02-01-3] A category added to the content data appears on the category screen with no change to the screen

|  |  |
| --- | --- |
| **Layer** | mobile — the category screen rendered by the unit test suite |
| **Verifies** | `US-02-01#3`, `MOD-02-F03` |
| **Role** | Parent (no sign-in) |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Test data

| What | Value / source |
| --- | --- |
| Content data | the shipped decks plus a test deck labelled "6+", registered first in the list |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Add a deck labelled "6+" to the shipped content data, registered first in the list | The content data holds the shipped decks and "6+" | console |
| 2 | Open the category screen | Each shipped category has an entry, and a "6+" entry follows them | console |
| 3 | Read the category screen's source | It names no category, so the new entry needed no change to it | console |

## Pass criterion

- A new category in the content data is listed on the screen, in age order, with the screen unchanged.

## Out of scope for this test

- What choosing the new category opens — `US-03-01`.
