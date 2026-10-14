---
id: AC-01-04-6 # derived by the delivery loop from US-01-04#6 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-04#6, MOD-01-F02] # what this test proves
layer: mobile # admin | web | api | mobile
type: negative # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-04-6] None of the 5+ questions repeats a 3+ or 4+ question

|  |  |
| --- | --- |
| **Layer** | mobile — the content data the app ships and the content checks (`src/content/checks.ts`), unit test suite |
| **Verifies** | `US-01-04#6`, `MOD-01-F02` |
| **Role** | — (no sign-in) |
| **Type** | negative |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Compare every 5+ question's text with every 3+ and 4+ question's, in Polish and in English, ignoring case and punctuation | No 5+ question has the text of a 3+ or 4+ question | console |
| 2 | Compare what every 5+ question asks for (its English answer, without its article) with what every 3+ and 4+ question asks for | No 5+ question asks for the answer of a 3+ or 4+ question, so none is a younger question in other words (`DEC-50`, `DEC-51`) | console |
| 3 | Run the content checks on the 3+ deck and on the 4+ deck, each with a copy of the 5+ deck holding one of its English questions | The repeated text is reported, for each of the two | console |

## Pass criterion

- No 5+ question repeats a 3+ or 4+ question, and the content checks catch a repeated text from either.

## Out of scope for this test

- Questions that ask about the same subject for a different answer (a 4+ question asks which way an apple falls, a 5+ one the name of the force that pulls it) — they are different questions; the owner's content review (`DEC-26`).
