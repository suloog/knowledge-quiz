---
id: AC-01-03-2 # derived by the delivery loop from US-01-03#2 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-03#2, MOD-01-F11, MOD-01-F12] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-03-2] Every 4+ question is at most 100 characters and every answer at most 60

|  |  |
| --- | --- |
| **Layer** | mobile — the content data the app ships, unit test suite |
| **Verifies** | `US-01-03#2`, `MOD-01-F11`, `MOD-01-F12` |
| **Role** | — (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Measure every question of the 4+ deck, in Polish and in English | None is longer than 100 characters | console |
| 2 | Measure every answer, in Polish and in English | None is longer than 60 characters | console |

## Pass criterion

- No 4+ question exceeds 100 characters and no answer 60, in either language.

## Out of scope for this test

- How the texts fit on the Kompakt screen — MOD-03.
