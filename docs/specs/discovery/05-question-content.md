---
id: DSC-05
title: Question content
kind: business # business (a functional area — becomes a module at /og:modules) | cross-cutting (roles and access, technology and integrations, non-functional requirements — feeds PROJECT.md, NFR.md and the constitution, never a module)
status: settled # open (not yet discussed) | discussed (discussed with the analyst, waiting on the client) | settled (no [W] question in this topic is open)
sources: [SRC-01, SRC-03] # SRC-NN documents whose items this topic gathers, e.g. [SRC-01, SRC-03]
module: # MOD-NN — filled by /og:modules; empty for cross-cutting topics
sessions: [2026-10-14] # dates of the discovery sessions in which the topic was discussed, YYYY-MM-DD
---

<!-- This file records what we UNDERSTOOD about this topic after reading every source and talking
     to the analyst — the layer between the sources (what the client wrote) and the requirements
     (what we will build). It is alive: after every client workshop /og:discovery updates the
     findings. A finding is NOT a requirement: no acceptance criteria, no priority, no UI; one
     finding becomes 1–3 requirements in the module's REQUIREMENTS.md later. -->

# [DSC-05] Question content

## Topic scope

The questions and answers themselves: their character, how they match the child's age, that they ship inside the app, and that their structure lets more questions and categories be added later. Who writes and checks them is part of this topic. How they are displayed is `DSC-04`.

## Sources in this topic

<Items from ALL sources that speak about this topic, side by side — so a contradiction between the
contract and the kick-off note is visible in one place, not in two files.>

| Item | Kind | Short |
| ---- | ---- | ----- |
| `SRC-01-04` | formal | Content educational, popular-science, nature, trivia |
| `SRC-01-05` | formal | Content level adapted to the child's age |
| `SRC-01-19` | formal | Questions and answers embedded locally in the app |
| `SRC-01-21` | formal | Data structure allows easily adding questions and categories later |
| `SRC-03-31` | informal | AI writes and accepts the content; owner reviews after the loop |
| `SRC-03-32` | informal | 50 questions per category |
| `SRC-03-33` | informal | Optional AI-generated B/W illustrations where they help |
| `SRC-03-34` | informal | Polish and English, same questions translated |
| `SRC-03-35` | informal | Language chosen with an in-app switch |
| `SRC-03-38` | informal | Confirmed: switch on category screen, device language first |

## Key findings

<One finding = one sentence about what the client wants in this area, as we understand it. Business
language, coarse. Each with its provenance: source items in brackets, `— *source: DEC-nn*` for a
ruling, `— *assumption: Qnn*` for a default waiting on the client. A finding with none of the three
is an unrecorded assumption — do not write it. Numbers are never reused; a withdrawn finding is
struck through with its DEC-nn.>

- [DSC-05-01] The questions are educational, popular-science, nature-related and trivia. (`SRC-01-04`)
- [DSC-05-02] Each question's difficulty matches its age category. (`SRC-01-05`)
- [DSC-05-03] Questions and answers ship inside the app. (`SRC-01-19`)
- [DSC-05-04] Content is kept in a structure where adding questions or categories is a change of data, not of the app's screens. (`SRC-01-21`)
- [DSC-05-05] Every question has exactly one correct answer. (`SRC-01-15`)
- [DSC-05-06] AI writes the questions and answers within the delivery loop and checks that each suits its age category. (`SRC-03-31`) — *source: `DEC-26`*
- [DSC-05-07] The product owner reviews all the content once the loop has finished, before release. (`SRC-03-31`) — *source: `DEC-26`*
- [DSC-05-08] Each category has 50 questions, 150 in total. (`SRC-03-32`) — *source: `DEC-27`*
- [DSC-05-09] Some questions carry a pure black-and-white illustration, AI-generated, only where a picture helps. (`SRC-03-33`) — *source: `DEC-28`*
- [DSC-05-10] The app and its content exist in Polish and English, with the same questions in both. (`SRC-03-34`) — *source: `DEC-29`*
- [DSC-05-11] The language is chosen with a switch inside the app. (`SRC-03-35`) — *source: `DEC-30`*
- [DSC-05-12] The switch sits on the category screen, the first launch follows the device language (Polish, otherwise English), and the choice is remembered. (`SRC-03-38`) — *source: `DEC-33`*

## Contradictions

<Between sources or inside one. What A says, what B says, how it was settled (`DEC-nn`) or which
question waits (`Qnn`). A settled contradiction stays here with its reference — it is the history a
developer looks for when a requirement puzzles them.>

- None between the sources.

## Ambiguities

<Statements with two plausible readings. Both readings written out, then the ruling or the
question. Picking a reading inside a finding with no entry here is silent interpretation.>

- "Adapted in level to the child's age" (`SRC-01-05`): who judges it — (a) a human before each release, (b) AI within the loop with a human review at the end → (b), `DEC-26`

## From the calls, not the documents

<What the analyst knows from talking to the client that no document records. Written first as
items in `sources/NN-analyst-notes-<date>.md`, only pointed at here — so the finding it produces has
a source like any other.>

- `SRC-03-31`…`SRC-03-35` — the product owner's rulings in the discovery interview 2026-10-14.

## For the client workshop

<Open questions in this topic — numbers only; the text lives in QUESTIONS.md, the list to send in
discovery/AGENDA.md.>

- None open. Resolved here: `Q09`, `Q10`, `Q11`, `Q28`.

## Parked

<What came up in the documents or the conversation that this project does not do — candidates for
non-goals in PROJECT.md or for the deferred-scope module. Always with a reason. Parking a formal
source item needs a `DEC-nn` (reduction).>

- Separate, culturally adapted decks per language — the English deck is a translation (`DEC-29`).
- Illustrations on every question — only where they help (`DEC-28`).

