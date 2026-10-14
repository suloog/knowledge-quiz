---
id: AC-01-02-6 # derived by the delivery loop from US-01-02#6 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-02#6, MOD-01-F10] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-02-6] Adding a question or an age category changes content data only

|  |  |
| --- | --- |
| **Layer** | mobile — the repository's sources, unit test suite |
| **Verifies** | `US-01-02#6`, `MOD-01-F10` |
| **Role** | — (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | List the deck files in the content data and the decks the app ships | Every deck file is shipped, and nothing else | console |
| 2 | Read every screen's source | No screen reads a deck file or holds a question text | console |
| 3 | Read the content checks | They name no category, so a new deck is checked without a code change | console |

## Pass criterion

- A question or a category is added by changing the content data only (`DEC-46`).

## Out of scope for this test

- Showing a new category on screen — MOD-02 / MOD-03.
