---
id: US-03-02 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-03
covers: [MOD-03-F06, MOD-03-F07, MOD-03-F08] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: in-progress # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-03-01] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can go through a category without repeats and come back where we left off, so that my child never gets the same question twice in a row

|  |  |
| --- | --- |
| **Module** | `[MOD-03]` Question cards — `docs/specs/modules/03-question-cards/REQUIREMENTS.md` |
| **Covers** | `MOD-03-F06`, `F07`, `F08` |
| **Priority** | must |
| **Status** | in-progress |
| **Depends on** | `US-03-01` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

Each category is shuffled once and gone through without repeats; a card is used up once its answer has been revealed. The order and the position are remembered, so coming back to the category — even after closing the app — resumes at the first card whose answer has not been seen.

## Acceptance criteria

### Scenario: No repeats

- **Given** the 3+ category is opened for the first time
- **When** all 50 answers are revealed one after another
- **Then** each of the 50 questions has appeared exactly once

### Scenario: Closed before the reveal

- **Given** a question is on screen with its answer hidden
- **When** the app is closed and the category opened again
- **Then** the same question appears, answer hidden

### Scenario: Closed after the reveal

- **Given** an answer has been revealed
- **When** the app is closed and the category opened again
- **Then** the next unseen question appears

### Scenario: Separate decks

- **Given** cards of 3+ have been revealed
- **When** the 4+ category is opened
- **Then** 4+ starts at its own first unseen card, unaffected by 3+

## Edge cases

- A new app version adds or removes questions in a category with a saved deck → the saved order is kept, removed questions are skipped, added ones join the unseen remainder in shuffled order (Q37).
- Saved deck missing or unreadable → the category starts with a fresh shuffle.

## Out of scope / what not to worry about

- What happens after the last card — US-03-03.
- The continue entry on the category screen — US-02-02.
- Going back to a previous card — the deck only moves forward.

## Technical notes

- Per category: shuffled order and the set of seen cards, written to the single persistence module after every reveal (`DEC-22`, `DEC-38`).
- Unit tests for the deck logic, including the content-update case (Q37).
