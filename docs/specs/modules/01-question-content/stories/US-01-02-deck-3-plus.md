---
id: US-01-02 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-01
covers: [MOD-01-F02, MOD-01-F03, MOD-01-F04, MOD-01-F05, MOD-01-F06, MOD-01-F07, MOD-01-F09, MOD-01-F10, MOD-01-F11, MOD-01-F12, MOD-01-F14, MOD-01-F15] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: ready # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-01-01] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can rely on a full 3+ deck in Polish and English, so that a 3-year-old gets questions at their level

|  |  |
| --- | --- |
| **Module** | `[MOD-01]` Question content — `docs/specs/modules/01-question-content/REQUIREMENTS.md` |
| **Covers** | `MOD-01-F02`, `F03`, `F04`, `F05`, `F06`, `F07`, `F09`, `F10`, `F11`, `F12`, `F14`, `F15` |
| **Priority** | must |
| **Status** | ready |
| **Depends on** | `US-01-01` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

The first deck of questions, and with it the way all content is kept: 50 questions for the 3+ category, each with one answer, in Polish and English, shipped inside the app. The automatic content checks set up here guard every later deck. Questions are written by AI in the delivery loop; the product owner reviews all content once, before release (`DEC-26`). The 4+ and 5+ decks are US-01-03 and US-01-04; illustrations are US-03-05.

## Acceptance criteria

- [ ] The 3+ category holds exactly 50 questions, each with exactly one answer, in Polish and in English.
- [ ] Every question is at most 100 characters and every answer at most 60 characters, in each language.
- [ ] Each of the four kinds of content (educational, popular-science, nature, trivia) appears at least 5 times among the 50 questions.
- [ ] The pull request records the age-suitability check of every 3+ question: words a child of that age knows, nothing frightening, violent or adult, one unambiguous answer, a verifiable fact.
- [ ] All automatic content checks pass; breaking any one of them makes the test suite fail.
- [ ] Adding a question or a new age category requires a change to the content data only — no screen changes.
- [ ] All content ships inside the app; nothing is downloaded.

## Edge cases

- Content failing any check (count, one answer per language, length limits) → the test suite fails and the content is not released.
- A category with fewer than 50 questions in either language → the test suite fails.

## Out of scope / what not to worry about

- 4+ and 5+ questions — US-01-03, US-01-04.
- Illustrations — US-03-05.
- Showing the questions — MOD-03.
- The owner's content review — once, before release (`DEC-26`).

## Technical notes

- One versioned data file per category; each question carries `pl` and `en` for question and answer, and an optional illustration reference (constitution: *Content is data*).
- Schema and content checks as Jest tests: count, one answer per language, length ≤ 100 / ≤ 60 (`DEC-39`), at least 5 per kind (Q30).
- Age-suitability check per Q29, recorded in the PR description.
