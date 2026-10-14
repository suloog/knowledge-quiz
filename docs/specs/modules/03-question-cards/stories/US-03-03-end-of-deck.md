---
id: US-03-03 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-03
covers: [MOD-03-F09, MOD-03-F10, MOD-03-F11] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: ready # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-03-02] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can see when a deck is finished and start it again or go back, so that the game has a clear end

|  |  |
| --- | --- |
| **Module** | `[MOD-03]` Question cards — `docs/specs/modules/03-question-cards/REQUIREMENTS.md` |
| **Covers** | `MOD-03-F09`, `F10`, `F11` |
| **Priority** | must |
| **Status** | ready |
| **Depends on** | `US-03-02` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

After the last card of a category an end card says the deck is finished and offers two choices: start the category again in a new shuffled order, or go back to the categories.

## Acceptance criteria

### Scenario: End card

- **Given** 49 answers of a category have been revealed
- **When** the 50th answer is revealed and the card touched again
- **Then** an end card says the deck is finished and offers "again" and "categories"

### Scenario: Again

- **Given** the end card is shown
- **When** "again" is touched
- **Then** the category starts over in a new shuffled order with all 50 cards unseen

### Scenario: Categories

- **Given** the end card is shown
- **When** "categories" is touched
- **Then** the category screen appears

## Edge cases

- App closed on the end card → reopening the category shows the end card again.

## Out of scope / what not to worry about

- The continue entry leading to a finished deck — US-02-02.
- Statistics or a score on the end card — out of the MVP (`SRC-01-17`).

## Technical notes

- Restart resets the category's deck state to a fresh shuffle (`DEC-23`).
- Maestro flow uses a test content set with a short deck to reach the end card quickly.
