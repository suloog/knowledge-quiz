---
id: DSC-04
title: Question cards
kind: business # business (a functional area — becomes a module at /og:modules) | cross-cutting (roles and access, technology and integrations, non-functional requirements — feeds PROJECT.md, NFR.md and the constitution, never a module)
status: settled # open (not yet discussed) | discussed (discussed with the analyst, waiting on the client) | settled (no [W] question in this topic is open)
sources: [SRC-01, SRC-03] # SRC-NN documents whose items this topic gathers, e.g. [SRC-01, SRC-03]
module: MOD-03 # MOD-NN — filled by /og:modules; empty for cross-cutting topics
sessions: [2026-10-14] # dates of the discovery sessions in which the topic was discussed, YYYY-MM-DD
---

<!-- This file records what we UNDERSTOOD about this topic after reading every source and talking
     to the analyst — the layer between the sources (what the client wrote) and the requirements
     (what we will build). It is alive: after every client workshop /og:discovery updates the
     findings. A finding is NOT a requirement: no acceptance criteria, no priority, no UI; one
     finding becomes 1–3 requirements in the module's REQUIREMENTS.md later. -->

# [DSC-04] Question cards

## Topic scope

The quiz itself as a deck of cards: one question at a time, a tap reveals the answer, the next interaction moves on. Includes what the MVP deliberately does not do on this screen (choosing answers, scoring, tracking). Starts once a category is chosen (`DSC-03`); the questions' wording and volume are `DSC-05`.

## Sources in this topic

<Items from ALL sources that speak about this topic, side by side — so a contradiction between the
contract and the kick-off note is visible in one place, not in two files.>

| Item | Kind | Short |
| ---- | ---- | ----- |
| `SRC-01-11` | formal | One question at a time |
| `SRC-01-12` | formal | Question takes as much of the screen as possible, readable for parent and child |
| `SRC-01-13` | formal | Two-step interaction: Question → Answer |
| `SRC-01-14` | formal | On first display only the question is visible |
| `SRC-01-15` | formal | Touching the screen reveals the correct answer |
| `SRC-01-16` | formal | The next interaction moves to the next question |
| `SRC-01-17` | formal | Not in MVP: A/B/C answers, scoring, ranking, accounts, gamification, tracking results |
| `SRC-01-18` | formal | A digital deck of question cards rather than a classic quiz app |
| `SRC-01-31` | formal | MVP core: launch → age → question → ask → touch → answer → next |
| `SRC-03-27` | informal | Shuffled once, no repeats, position remembered, continue resumes |
| `SRC-03-28` | informal | End card: start again or back to categories |
| `SRC-03-29` | informal | Whole card is the tap target; answer below the question |
| `SRC-03-30` | informal | Android back + small control outside the tap area |

## Key findings

<One finding = one sentence about what the client wants in this area, as we understand it. Business
language, coarse. Each with its provenance: source items in brackets, `— *source: DEC-nn*` for a
ruling, `— *assumption: Qnn*` for a default waiting on the client. A finding with none of the three
is an unrecorded assumption — do not write it. Numbers are never reused; a withdrawn finding is
struck through with its DEC-nn.>

- [DSC-04-01] One question is shown at a time, filling as much of the screen as possible, readable for both parent and child. (`SRC-01-11`, `SRC-01-12`)
- [DSC-04-02] Each card has two states: first the question alone, then with its correct answer revealed. (`SRC-01-13`, `SRC-01-14`, `SRC-01-15`)
- [DSC-04-03] A touch reveals the answer; the next interaction moves on to the next card. (`SRC-01-15`, `SRC-01-16`)
- [DSC-04-04] It is a deck of cards, not a test: no answer choices, scoring, ranking or tracking of the child's results. (`SRC-01-17`, `SRC-01-18`)
- [DSC-04-05] The whole MVP is one loop: choose an age, see a question, ask the child, touch, see the answer, next question. (`SRC-01-31`)
- [DSC-04-06] Each category's questions are shuffled once and shown without repeats. (`SRC-03-27`) — *source: `DEC-22`*
- [DSC-04-07] The position in each category is remembered after the app is closed, and continuing resumes at the next unseen question. (`SRC-03-27`) — *source: `DEC-22`*
- [DSC-04-08] When a category runs out, an end card offers to start it again in a new order or to go back to the categories. (`SRC-03-28`) — *source: `DEC-23`*
- [DSC-04-09] The whole card responds to a touch, and the answer appears below the question, which stays on screen. (`SRC-03-29`) — *source: `DEC-24`*
- [DSC-04-10] The user returns to the categories with the Android back action or a small visible control kept clear of the card's tap area. (`SRC-03-30`) — *source: `DEC-25`*

## Contradictions

<Between sources or inside one. What A says, what B says, how it was settled (`DEC-nn`) or which
question waits (`Qnn`). A settled contradiction stays here with its reference — it is the history a
developer looks for when a requirement puzzles them.>

- None between the sources.

## Ambiguities

<Statements with two plausible readings. Both readings written out, then the ruling or the
question. Picking a reading inside a finding with no entry here is silent interpretation.>

- "After touching the screen" (`SRC-01-15`): (a) anywhere on the screen, (b) a dedicated control → (a), the whole card, `DEC-24`
- "Reveals the correct answer" (`SRC-01-15`): (a) the answer replaces the question, (b) the answer appears with the question still visible → (b), `DEC-24`
- "Moves on to the next question" (`SRC-01-16`): order, repeats and the end of a category were not stated → `DEC-22`, `DEC-23`

## From the calls, not the documents

<What the analyst knows from talking to the client that no document records. Written first as
items in `sources/NN-analyst-notes-<date>.md`, only pointed at here — so the finding it produces has
a source like any other.>

- `SRC-03-27`…`SRC-03-30` — the product owner's rulings in the discovery interview 2026-10-14.

## For the client workshop

<Open questions in this topic — numbers only; the text lives in QUESTIONS.md, the list to send in
discovery/AGENDA.md.>

- None open. Resolved here: `Q05`, `Q06`, `Q07`, `Q08`.

## Parked

<What came up in the documents or the conversation that this project does not do — candidates for
non-goals in PROJECT.md or for the deferred-scope module. Always with a reason. Parking a formal
source item needs a `DEC-nn` (reduction).>

- Answer choices (A/B/C), scoring, ranking, user accounts, extended gamification and tracking the child's results — out of the MVP by the formal source itself (`SRC-01-17`); non-goals for PROJECT.md.

