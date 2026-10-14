---
id: US-01-03 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-01
covers: [MOD-01-F02, MOD-01-F03, MOD-01-F04, MOD-01-F05, MOD-01-F06, MOD-01-F07, MOD-01-F11, MOD-01-F12, MOD-01-F14, MOD-01-F15] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: ready # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-01-02] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can rely on a full 4+ deck in Polish and English, so that a 4-year-old gets questions at their level

|  |  |
| --- | --- |
| **Module** | `[MOD-01]` Question content — `docs/specs/modules/01-question-content/REQUIREMENTS.md` |
| **Covers** | `MOD-01-F02`, `F03`, `F04`, `F05`, `F06`, `F07`, `F11`, `F12`, `F14`, `F15` |
| **Priority** | must |
| **Status** | ready |
| **Depends on** | `US-01-02` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

50 questions for the 4+ category, each with one answer, in Polish and English, in the content structure and under the automatic checks set up by US-01-02. A little harder than 3+, still suited to the youngest child of the category.

## Acceptance criteria

- [ ] The 4+ category holds exactly 50 questions, each with exactly one answer, in Polish and in English.
- [ ] Every question is at most 100 characters and every answer at most 60 characters, in each language.
- [ ] Each of the four kinds of content (educational, popular-science, nature, trivia) appears at least 5 times among the 50 questions.
- [ ] The pull request records the age-suitability check of every 4+ question: words a child of that age knows, nothing frightening, violent or adult, one unambiguous answer, a verifiable fact.
- [ ] All automatic content checks pass; breaking any one of them makes the test suite fail.
- [ ] None of the 4+ questions repeats a 3+ question.

## Edge cases

- Content failing any check → the test suite fails and the content is not released.

## Out of scope / what not to worry about

- The content structure and checks — US-01-02.
- Illustrations — US-03-05.

## Technical notes

- Reuse the structure and tests from US-01-02; add only data.
- Age-suitability check per Q29, recorded in the PR description.
