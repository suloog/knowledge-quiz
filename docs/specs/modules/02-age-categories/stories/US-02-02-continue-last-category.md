---
id: US-02-02 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-02
covers: [MOD-02-F05, MOD-02-F06, MOD-02-F07, MOD-02-F08, MOD-02-F09, MOD-02-U02] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: done # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-02-01, US-03-02, US-03-03] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can continue the last-used category straight from the top of the screen, so that we pick up where we stopped

|  |  |
| --- | --- |
| **Module** | `[MOD-02]` Age categories — `docs/specs/modules/02-age-categories/REQUIREMENTS.md` |
| **Covers** | `MOD-02-F05`, `F06`, `F07`, `F08`, `F09`, `U02` |
| **Priority** | must |
| **Status** | done |
| **Depends on** | `US-02-01`, `US-03-02`, `US-03-03` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

A separate continue entry above the category list that names the last-used category and resumes its deck where the family stopped — also after the app was closed. The list itself keeps its fixed order. Delivered after the deck stories because it resumes their saved position (`DEC-41`).

## Acceptance criteria

### Scenario: First launch

- **Given** the app has never been used
- **When** the category screen opens
- **Then** no continue entry is shown, only the list

### Scenario: After use

- **Given** the 4+ category has been opened
- **When** the parent returns to the category screen
- **Then** a continue entry for 4+ stands above the list, visibly set apart, and the list keeps the order 3+, 4+, 5+

### Scenario: After a restart

- **Given** 4+ was the last category used and three of its answers were revealed
- **When** the app is closed and opened again
- **Then** the continue entry for 4+ is shown, and touching it opens the fourth card of the 4+ deck

### Scenario: Finished deck

- **Given** the last-used category's deck is finished
- **When** the continue entry is touched
- **Then** that category's end card is shown

## Edge cases

- Saved data missing or unreadable → no continue entry, as on first launch.

## Out of scope / what not to worry about

- Remembering the position inside a deck — US-03-02.
- The end card itself — US-03-03.
- Reordering the list — the list order is fixed (`DEC-21`).

## Technical notes

- Reads last-used category and deck state from the single persistence module (constitution).
- Continue entry shown inverted (white on black) per `MOD-02-U02`.
