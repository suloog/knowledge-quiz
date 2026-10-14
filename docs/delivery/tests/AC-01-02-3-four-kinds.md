---
id: AC-01-02-3 # derived by the delivery loop from US-01-02#3 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-02#3, MOD-01-F05, MOD-01-F15] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-02-3] Each kind of content appears at least 5 times in the 3+ deck

|  |  |
| --- | --- |
| **Layer** | mobile — the content data the app ships, unit test suite |
| **Verifies** | `US-01-02#3`, `MOD-01-F05`, `MOD-01-F15` |
| **Role** | — (no sign-in) |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Read the kind of every 3+ question | Each is educational, popular-science, nature or trivia | console |
| 2 | Count the questions of each kind | Each kind appears at least 5 times | console |

## Pass criterion

- All four kinds appear at least 5 times among the 50 questions.

## Out of scope for this test

- Whether a question's kind is well chosen — the owner's content review (`DEC-26`).
