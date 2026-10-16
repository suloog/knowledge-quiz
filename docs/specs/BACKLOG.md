# Backlog — user story register

> Every user story in the project, in one view. The story file
> `docs/specs/modules/NN-<slug>/stories/US-NN-MM-<slug>.md` is the source of truth for content; this file
> **mirrors** it and is updated in the same run that changes a story.
>
> The work itself runs in YouTrack. The `YouTrack` column ties a row to its issue.

## Legend

| Status | Means |
| ------ | ----- |
| `draft` | written, not yet gated by `/og:clarify` |
| `ready` | gated — free to pick up |
| `in-progress` | being implemented |
| `review` | implemented, in review / testing |
| `done` | accepted against its acceptance criteria |
| `blocked` | held — a dependency or an unanswered question |

**Priority:** `must` (default, blocking) · `should` · `nice-to-have`.

**IDs:** `US-NN-MM`, where `NN` is the parent module (`MOD-NN`) and `MM` a counter inside that
module. Numbers are never reused or renumbered — a new story is appended to the series.

**Covers:** the requirements this story delivers (the story's `covers:` frontmatter). The full map
the other way round (requirement → stories) lives in the module's `COVERAGE.md`.

## Progress

| Module | Requirements (F/U) | Stories | done | Slicing |
| ------ | ------------------ | ------- | ---- | ------- |
| `MOD-01` Question content | 15 / 0 | 4 | 0 | sliced |
| `MOD-02` Age categories | 13 / 5 | 3 | 0 | sliced |
| `MOD-03` Question cards | 14 / 5 | 5 | 0 | sliced |
| **Total** | **42 / 10** | **12** | **0** | 3 / 3 modules sliced |

A module counts as **sliced** once part 1 of its `COVERAGE.md` has no empty rows.

## [MOD-01] Question content

`docs/specs/modules/01-question-content/REQUIREMENTS.md` · `docs/specs/modules/01-question-content/stories/`

| Story | Title | Covers | Prio | Status | Depends on | YouTrack |
| ----- | ----- | ------ | ---- | ------ | ---------- | -------- |
| `US-01-01` | Parent can install the app on the Kompakt and open it | F01, NFR-05, NFR-06, NFR-10, NFR-12, NFR-13 | must | done | — | — |
| `US-01-02` | Parent can rely on a full 3+ deck in Polish and English | F02, F03, F04, F05, F06, F07, F09, F10, F11, F12, F14, F15 | must | done | `US-01-01` | — |
| `US-01-03` | Parent can rely on a full 4+ deck in Polish and English | F02, F03, F04, F05, F06, F07, F11, F12, F14, F15 | must | done | `US-01-02` | — |
| `US-01-04` | Parent can rely on a full 5+ deck in Polish and English | F02, F03, F04, F05, F06, F07, F11, F12, F14, F15 | must | done | `US-01-02` | — |

## [MOD-02] Age categories

`docs/specs/modules/02-age-categories/REQUIREMENTS.md` · `docs/specs/modules/02-age-categories/stories/`

| Story | Title | Covers | Prio | Status | Depends on | YouTrack |
| ----- | ----- | ------ | ---- | ------ | ---------- | -------- |
| `US-02-01` | Parent can open the app and see the age categories | F01, F02, F03, U01, U03, U05, NFR-02, NFR-03, NFR-04, NFR-07, NFR-08, NFR-09 | must | done | `US-01-02` | — |
| `US-02-02` | Parent can continue the last-used category straight from the top of the screen | F05, F06, F07, F08, F09, U02 | must | done | `US-02-01`, `US-03-02`, `US-03-03` | — |
| `US-02-03` | Parent can switch the app between Polish and English | F10, F11, F12, F13, U04 | must | done | `US-02-01`, `US-03-02` | — |

## [MOD-03] Question cards

`docs/specs/modules/03-question-cards/REQUIREMENTS.md` · `docs/specs/modules/03-question-cards/stories/`

| Story | Title | Covers | Prio | Status | Depends on | YouTrack |
| ----- | ----- | ------ | ---- | ------ | ---------- | -------- |
| `US-03-01` | Child can touch a card to see the answer and touch again for the next question | MOD-02-F04, F01, F02, F03, F04, F05, F14, U01, U02, U04, U05, NFR-01, NFR-03, NFR-04 | must | done | `US-02-01` | — |
| `US-03-02` | Parent can go through a category without repeats and come back where we left off | F06, F07, F08 | must | done | `US-03-01` | — |
| `US-03-03` | Parent can see when a deck is finished and start it again or go back | F09, F10, F11 | must | done | `US-03-02` | — |
| `US-03-04` | Parent can go back to the categories from any card | F12, F13 | must | done | `US-03-01` | — |
| `US-03-05` | Child can see a picture with some questions | MOD-01-F08, MOD-01-F13, U03 | should | done | `US-03-01`, `US-01-02`, `US-01-03`, `US-01-04` | — |
