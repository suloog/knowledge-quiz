---
id: AC-01-04-4 # derived by the delivery loop from US-01-04#4 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-04#4, MOD-01-F04, MOD-01-F06, MOD-01-F14] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-04-4] The age-suitability check of every 5+ question is recorded

|  |  |
| --- | --- |
| **Layer** | mobile — the record `docs/delivery/content-checks/US-01-04-5-plus.md` (copied into the pull request, `DEC-46`; open questions with their near misses, `DEC-47`), unit test suite |
| **Verifies** | `US-01-04#4`, `MOD-01-F04`, `MOD-01-F06`, `MOD-01-F14` |
| **Role** | — (no sign-in) |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Find each 5+ question's row in the record, and count the record's rows | Every question has a row; no id has two rows, and the record holds as many rows as the deck holds questions | console |
| 2 | Compare each row with the question it names, in Polish and in English | The row has exactly the record's nine cells after the id, and shows that question and its answer in both languages, as the deck holds them | console |
| 3 | Read each row's four checks: known words, nothing frightening, one answer, verifiable | All four are `pass` for every question | console |
| 4 | Read each row's near-miss cell | Every row names the near misses checked for its one answer (`DEC-47`); none is empty, `—` or `none` | console |
| 5 | Read every 5+ question's text, in Polish and in English | No question names answer options: no `czy` in Polish, no `or` in English (`DEC-47`) | console |

## Pass criterion

- Every 5+ question has a recorded age-suitability check passing all four points of `Q29`.
- Every 5+ question is an open question, and its record row names the near misses checked for its one answer (`DEC-47`).

## Out of scope for this test

- The quality of the judgement itself — the owner's content review before release (`DEC-26`).
