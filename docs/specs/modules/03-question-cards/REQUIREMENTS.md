---
id: MOD-03
title: Question cards
ticket: # optional YouTrack ID, filled by /og:sync-youtrack
status: draft # draft | ready | in-progress | done
depends_on: [MOD-01, MOD-02] # other module IDs
sources: [SRC-01, SRC-03] # SRC-NN documents this module draws on, e.g. [SRC-01, SRC-03]
---

<!-- Content in the project language; headings fixed by this template. Delete sections that
     have no content; never write "none". -->

# [MOD-03] Question cards

## Context

The deck itself — the core of the MVP: one question at a time, a touch reveals the answer below it, the next touch moves on; each category shuffled once and gone through without repeats, the position remembered, an end card when the deck runs out, and a way back to the categories. A deck of cards, not a test: no answer choices, no scoring. Answers for the scope area *Question cards* in PROJECT.md; comes from discovery topic `DSC-04`; owns the brief's statements about the parent and child playing together (`DEC-36`).

## Scope coverage

| Source item | Kind | Delivered by |
| ----------- | ---- | ------------ |
| `SRC-01-02` The application is to support a parent and child playing together i… | formal | `MOD-03-F03`, `MOD-03-F05`, `MOD-03-U01` |
| `SRC-01-03` The parent presents or reads the question to the child, then reveals… | formal | `MOD-03-F02`, `MOD-03-F03` |
| `SRC-01-11` The screen presents one question at a time. | formal | `MOD-03-F01` |
| `SRC-01-12` The question should take up as much of the available screen as possi… | formal | `MOD-03-U01` |
| `SRC-01-13` The interaction has two steps: Question → Answer. | formal | `MOD-03-F02`, `MOD-03-F03` |
| `SRC-01-14` On first display the user sees only the question. | formal | `MOD-03-F02` |
| `SRC-01-15` After touching the screen the application reveals the correct answer. | formal | `MOD-03-F03`, `MOD-03-F04` |
| `SRC-01-16` The next interaction moves on to the next question. | formal | `MOD-03-F05` |
| `SRC-01-17` Not planned in the MVP: choosing answers A/B/C, scoring, ranking, us… | formal | — *(non-goals by the source itself, `DEC-03`; see Out of scope)* |
| `SRC-01-18` The application should resemble a digital deck of question cards mor… | formal | `MOD-03-U02` |
| `SRC-01-31` Core of the MVP: I launch the app → choose the age → get a question… | formal | `MOD-03-F01`…`MOD-03-F05` (with `MOD-02-F01`, `MOD-02-F04`) |
| `SRC-03-27` Each category's questions are shuffled once and gone through without… | informal | `MOD-03-F06`, `MOD-03-F08` |
| `SRC-03-28` When a category runs out, an end card offers to shuffle and start ag… | informal | `MOD-03-F09`, `MOD-03-F10`, `MOD-03-F11` |
| `SRC-03-29` The whole card is the tap target; the answer appears below the quest… | informal | `MOD-03-F03`, `MOD-03-F04` |
| `SRC-03-30` The way back to the categories is the Android back action plus a sma… | informal | `MOD-03-F12`, `MOD-03-F13` |

## Functional requirements

Every requirement in this module is priority **must** unless marked otherwise.

- [MOD-03-F01] The cards show one question at a time.
- [MOD-03-F02] When a card appears, only its question is shown.
- [MOD-03-F03] Touching anywhere on the card reveals its correct answer below the question. — *source: `DEC-24`*
- [MOD-03-F04] The question stays on screen after the answer is revealed. — *source: `DEC-24`*
- [MOD-03-F05] Touching the card after its answer is revealed moves on to the next card.
- [MOD-03-F06] Each category's cards are shuffled once and shown without repeats until the deck is finished. — *source: `DEC-22`*
- [MOD-03-F07] A card counts as seen once its answer has been revealed. — *source: `DEC-38`*
- [MOD-03-F08] Each category's order and position are remembered after the app is closed, and returning resumes at the first unseen card. — *source: `DEC-22`*
- [MOD-03-F09] After the last card of a category, an end card says the deck is finished. — *source: `DEC-23`*
- [MOD-03-F10] From the end card the parent or the child can start the category again in a new shuffled order, with every card unseen. — *source: `DEC-23`*
- [MOD-03-F11] From the end card the parent or the child can go back to the categories. — *source: `DEC-23`*
- [MOD-03-F12] From any card the Android back action returns to the categories. — *source: `DEC-25`*
- [MOD-03-F13] From any card a small visible control, outside the card's touch area, returns to the categories. — *source: `DEC-25`*
- [MOD-03-F14] A touch within 0.5 s of the screen changing is ignored. — *source: `DEC-40`*

## UI/UX requirements

- [MOD-03-U01] The question takes up as much of the screen as possible and is readable for both a parent and a child.
- [MOD-03-U02] The card looks like a card from a deck, not a quiz form: no buttons, choices or score on it.
- [MOD-03-U03] A question's illustration, when it has one, is shown with the question from the moment the card appears. — *assumption: `Q35`*
- [MOD-03-U04] The answer is clearly set apart from the question, so a child can tell which is which. — *assumption: `Q36`*
- [MOD-03-U05] The card is shown in the language chosen on the category screen. — *source: `DEC-29`*

## Constraints and edge cases

- App closed on a card whose answer was not revealed → returning shows that same card, question only (`DEC-38`).
- App closed on a revealed card → returning shows the next unseen card (`DEC-38`).
- A touch on the return control is never taken as a reveal or a next.
- A new app version adds or removes questions in a category with a saved deck → the saved order is kept, removed questions are skipped, added questions join the unseen remainder in shuffled order. — *assumption: `Q37`*
- Saved deck missing or unreadable → the category starts with a fresh shuffle.
- Each step (reveal, next) is a single screen change — nothing else redraws (`NFR-04`).

## Technical notes

- Deck state per category (shuffled order, set of seen cards) is written to the single persistence module after every reveal; MOD-02 reads it for the continue entry.
- The 0.5 s touch guard starts when the new frame is drawn, not when the touch is handled (`DEC-40`).
- The answer reveal and the next card change content in place — no navigation transition, no animation (`NFR-03`).
- E2e flows in Maestro cover reveal, next, end card, restart and return on the emulator (`DEC-37`); the 1 s reveal time (`NFR-01`) is measured by hand on the Kompakt.

## Out of scope / what not to worry about

- Answer choices (A/B/C), scoring, ranking, achievements, gamification or tracking the child's results — out of the MVP by the brief itself (`SRC-01-17`, `DEC-03`).
- Going back to a previous card — the deck only moves forward.
- Skipping a card without revealing it — not asked for; the next touch always reveals first.
- Choosing which questions to see or filtering by kind — the deck is the whole category.

## Acceptance criteria

- [ ] Choosing a category shows a question alone; a touch reveals the answer below it; the next touch shows another question — the core scenario of the brief end to end.
- [ ] Going through a whole category shows each of its 50 questions exactly once, then the end card, which offers a new shuffle or the categories.
- [ ] Closing the app mid-deck and coming back resumes at the first card whose answer has not been revealed.
- [ ] A fast double touch never skips an answer.
- [ ] On the Mudita Kompakt the answer appears within 1 s of a touch, without animation (`NFR-01`, `NFR-03`).
