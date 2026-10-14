---
id: AC-01-04-5 # derived by the delivery loop from US-01-04#5 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-04#5, MOD-01-F02, MOD-01-F03, MOD-01-F04, MOD-01-F07, MOD-01-F11, MOD-01-F12, MOD-01-F15] # what this test proves
layer: mobile # admin | web | api | mobile
type: negative # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-04-5] All automatic content checks pass; breaking any one fails the suite

|  |  |
| --- | --- |
| **Layer** | mobile — the content checks (`src/content/checks.ts`), unit test suite |
| **Verifies** | `US-01-04#5`, `MOD-01-F02`, `MOD-01-F03`, `MOD-01-F04`, `MOD-01-F07`, `MOD-01-F11`, `MOD-01-F12`, `MOD-01-F15` |
| **Role** | — (no sign-in) |
| **Type** | negative |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Run the content checks on every deck the app ships | They report nothing | console |
| 2 | Run them on copies of the 5+ deck, each broken in one way: a question fewer or more than 50, a missing, empty or doubled answer, a missing question text, a question of 101 or an answer of 61 characters, a kind with fewer than 5 questions, an unknown kind, no id, an empty illustration name, a wrong schema version | Each broken copy is reported | console |
| 3 | Run them on decks sharing a question id, a question text in one language (also differing only in case or surrounding spaces, in one deck or across two), or a category with otherwise distinct content; and on a deck with two questions missing their English text | Each sharing is reported by its own message, and only that one; the missing texts are not reported as a duplicate | console |
| 4 | Run them on a copy whose question carries an illustration file name | Nothing reported | console |

## Pass criterion

- The shipped content passes every check, and each kind of breakage is caught.

## Out of scope for this test

- Pure black-and-white illustrations — US-03-05, when illustrations exist.
