---
id: AC-01-04-1 # derived by the delivery loop from US-01-04#1 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-04#1, MOD-01-F02, MOD-01-F03, MOD-01-F04, MOD-01-F07] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-04-1] The 5+ category holds 50 questions, each with one answer in Polish and English

|  |  |
| --- | --- |
| **Layer** | mobile — the content data the app ships (`src/content`), unit test suite |
| **Verifies** | `US-01-04#1`, `MOD-01-F02`, `MOD-01-F03`, `MOD-01-F04`, `MOD-01-F07` |
| **Role** | — (no sign-in) |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Read the decks the app ships | A 5+ deck is among them | console |
| 2 | Count the questions of the 5+ deck | Exactly 50 | console |
| 3 | Read every question's Polish and English text | Each has a question and exactly one answer, non-empty, in both languages | console |

## Pass criterion

- The 5+ deck has 50 questions, each with one answer in Polish and in English.

## Out of scope for this test

- That the English text means the same as the Polish one — the owner's content review (`DEC-26`).
