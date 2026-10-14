---
id: US-03-01 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-03
covers: [MOD-02-F04, MOD-03-F01, MOD-03-F02, MOD-03-F03, MOD-03-F04, MOD-03-F05, MOD-03-F14, MOD-03-U01, MOD-03-U02, MOD-03-U04, MOD-03-U05, NFR-01, NFR-03, NFR-04] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: ready # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-02-01] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Child, I can touch a card to see the answer and touch again for the next question, so that we play the quiz

|  |  |
| --- | --- |
| **Module** | `[MOD-03]` Question cards — `docs/specs/modules/03-question-cards/REQUIREMENTS.md` |
| **Covers** | `MOD-02-F04`, `MOD-03-F01`, `F02`, `F03`, `F04`, `F05`, `F14`, `U01`, `U02`, `U04`, `U05`, `NFR-01`, `NFR-03`, `NFR-04` |
| **Priority** | must |
| **Status** | ready |
| **Depends on** | `US-02-01` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

The core of the MVP: choosing a category opens its cards, one question at a time filling the screen; a touch anywhere reveals the answer below the question, the next touch moves on. A card from a deck, not a quiz form. Shuffling and remembering the position are US-03-02; the end of the deck is US-03-03.

## Acceptance criteria

### Scenario: Card appears

- **Given** the 3+ category is chosen
- **When** its first card appears
- **Then** the question is the only text on the card, set in the largest type of the app, with no buttons, choices or score on the card

### Scenario: Reveal

- **Given** a question is shown
- **When** the card is touched anywhere
- **Then** the correct answer appears below the question, separated from it by a horizontal line, and the question stays on screen

### Scenario: Next

- **Given** an answer is revealed
- **When** the card is touched again
- **Then** the next question appears alone

### Scenario: Double touch

- **Given** a question has just appeared
- **When** the card is touched twice within 0.5 s
- **Then** only the answer is revealed — no card is skipped

- [ ] Cards are shown in the language chosen on the category screen.
- [ ] On the Mudita Kompakt the answer appears within 1 s of a touch, without animation (checked by hand).

## Edge cases

- Each step changes the screen once; nothing else redraws.

## Out of scope / what not to worry about

- Shuffling, no repeats, resume — US-03-02.
- End of the deck — US-03-03.
- Going back to the categories — US-03-04.
- Illustrations — US-03-05.
- Answer choices, scoring, tracking — out of the MVP (`SRC-01-17`).

## Technical notes

- Reveal and next change content in place — no navigation transition (`NFR-03`).
- 0.5 s touch guard starts when the new frame is drawn (`DEC-40`).
- Maestro flows on the emulator: appear, reveal, next, double touch; reveal time measured by hand on the Kompakt.
