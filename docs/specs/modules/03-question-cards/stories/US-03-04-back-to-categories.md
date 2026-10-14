---
id: US-03-04 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-03
covers: [MOD-03-F12, MOD-03-F13] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: ready # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-03-01] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can go back to the categories from any card, so that we can change the age at any time

|  |  |
| --- | --- |
| **Module** | `[MOD-03]` Question cards — `docs/specs/modules/03-question-cards/REQUIREMENTS.md` |
| **Covers** | `MOD-03-F12`, `F13` |
| **Priority** | must |
| **Status** | ready |
| **Depends on** | `US-03-01` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

From any card the Android back action, or a small visible control kept clear of the card's touch area, returns to the category screen. The deck keeps its position.

## Acceptance criteria

- [ ] From any card, the Android back action shows the category screen.
- [ ] Every card shows a small control, outside the card's touch area, that shows the category screen.
- [ ] Touching the control never reveals an answer or moves to the next card.
- [ ] After returning, opening the same category resumes where it was left.

## Edge cases

- Back pressed while an answer is hidden → that card is not counted as seen (`DEC-38`).

## Out of scope / what not to worry about

- Back on the category screen — closes the app (Q34, US-02-01).

## Technical notes

- The control sits outside the card's touch target; e2e asserts that touching it changes no deck state.
