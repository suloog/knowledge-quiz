---
id: DSC-03
title: Age categories
kind: business # business (a functional area — becomes a module at /og:modules) | cross-cutting (roles and access, technology and integrations, non-functional requirements — feeds PROJECT.md, NFR.md and the constitution, never a module)
status: settled # open (not yet discussed) | discussed (discussed with the analyst, waiting on the client) | settled (no [W] question in this topic is open)
sources: [SRC-01, SRC-03] # SRC-NN documents whose items this topic gathers, e.g. [SRC-01, SRC-03]
module: MOD-02 # MOD-NN — filled by /og:modules; empty for cross-cutting topics
sessions: [2026-10-14] # dates of the discovery sessions in which the topic was discussed, YYYY-MM-DD
---

<!-- This file records what we UNDERSTOOD about this topic after reading every source and talking
     to the analyst — the layer between the sources (what the client wrote) and the requirements
     (what we will build). It is alive: after every client workshop /og:discovery updates the
     findings. A finding is NOT a requirement: no acceptance criteria, no priority, no UI; one
     finding becomes 1–3 requirements in the module's REQUIREMENTS.md later. -->

# [DSC-03] Age categories

## Topic scope

The screen the app opens on: choosing an age category, how the last-used one is offered, and how the set of categories can grow later. Ends where the chosen category hands over to the question cards (`DSC-04`); what content a category holds is `DSC-05`.

## Sources in this topic

<Items from ALL sources that speak about this topic, side by side — so a contradiction between the
contract and the kick-off note is visible in one place, not in two files.>

| Item | Kind | Short |
| ---- | ---- | ----- |
| `SRC-01-06` | formal | After launch the user lands on the age-category selection screen |
| `SRC-01-07` | formal | First version offers, for example, 3+, 4+, 5+ |
| `SRC-01-08` | formal | Last-used category highlighted and easily reachable at the top |
| `SRC-01-09` | formal | Categories defined in the app; UI allows adding more later without rebuilding |
| `SRC-01-10` | formal | After choosing a category the user goes to the quiz |
| `SRC-03-24` | informal | New categories and questions only with a new app version |
| `SRC-03-25` | informal | v1: exactly 3+, 4+, 5+ |
| `SRC-03-26` | informal | Continue entry above a fixed list; remembered after closing |
| `SRC-03-37` | informal | Confirmed: first launch shows only the list |

## Key findings

<One finding = one sentence about what the client wants in this area, as we understand it. Business
language, coarse. Each with its provenance: source items in brackets, `— *source: DEC-nn*` for a
ruling, `— *assumption: Qnn*` for a default waiting on the client. A finding with none of the three
is an unrecorded assumption — do not write it. Numbers are never reused; a withdrawn finding is
struck through with its DEC-nn.>

- [DSC-03-01] The app always opens on the age-category screen. (`SRC-01-06`)
- [DSC-03-02] The list of categories is driven by the app's data, so adding a category later needs no screen redesign. (`SRC-01-09`, `SRC-01-21`)
- [DSC-03-03] New categories and questions arrive only with a new app version; nothing is updated online. (`SRC-01-19`, `SRC-01-20`, `SRC-01-30`, `SRC-03-24`) — *source: `DEC-19`*
- [DSC-03-04] Choosing a category starts the question cards of that category. (`SRC-01-10`)
- [DSC-03-05] Version 1 has exactly three categories: 3+, 4+ and 5+. (`SRC-01-07`, `SRC-03-25`) — *source: `DEC-20`*
- [DSC-03-06] The last-used category is remembered after the app is closed and offered as a separate entry above the full list, which keeps a fixed order. (`SRC-01-08`, `SRC-03-26`) — *source: `DEC-21`*
- [DSC-03-07] On the very first launch there is no such entry, only the list of categories. (`SRC-03-37`) — *source: `DEC-32`*

## Contradictions

<Between sources or inside one. What A says, what B says, how it was settled (`DEC-nn`) or which
question waits (`Qnn`). A settled contradiction stays here with its reference — it is the history a
developer looks for when a requirement puzzles them.>

- None between the sources.

## Ambiguities

<Statements with two plausible readings. Both readings written out, then the ruling or the
question. Picking a reading inside a finding with no entry here is silent interpretation.>

- "For example: 3+, 4+, 5+" (`SRC-01-07`): (a) an illustration, the set is open, (b) the intended v1 set → (b), `DEC-20`
- "Highlighted and easily reachable at the top" (`SRC-01-08`) with only three categories: (a) the list reorders with the last-used first, (b) a separate entry above a fixed list, (c) marked in place → (b), `DEC-21`
- "Without rebuilding the interface" (`SRC-01-09`): (a) adding a category needs no UI change but does need an app release, (b) categories can be added without a release → (a), `DEC-19`

## From the calls, not the documents

<What the analyst knows from talking to the client that no document records. Written first as
items in `sources/NN-analyst-notes-<date>.md`, only pointed at here — so the finding it produces has
a source like any other.>

- `SRC-03-24`…`SRC-03-26` — the product owner's rulings in the discovery interview 2026-10-14.

## For the client workshop

<Open questions in this topic — numbers only; the text lives in QUESTIONS.md, the list to send in
discovery/AGENDA.md.>

- None open. Resolved here: `Q01`, `Q02`, `Q04`, `Q27`.

## Parked

<What came up in the documents or the conversation that this project does not do — candidates for
non-goals in PROJECT.md or for the deferred-scope module. Always with a reason. Parking a formal
source item needs a `DEC-nn` (reduction).>

- None. The topic adds nothing beyond the sources.

