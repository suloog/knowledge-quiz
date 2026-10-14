---
id: DSC-02
title: E-ink UI and non-functional requirements
kind: cross-cutting # business (a functional area — becomes a module at /og:modules) | cross-cutting (roles and access, technology and integrations, non-functional requirements — feeds PROJECT.md, NFR.md and the constitution, never a module)
status: settled # open (not yet discussed) | discussed (discussed with the analyst, waiting on the client) | settled (no [W] question in this topic is open)
sources: [SRC-01, SRC-02, SRC-03] # SRC-NN documents whose items this topic gathers, e.g. [SRC-01, SRC-03]
module: # MOD-NN — filled by /og:modules; empty for cross-cutting topics
sessions: [2026-10-14] # dates of the discovery sessions in which the topic was discussed, YYYY-MM-DD
---

<!-- This file records what we UNDERSTOOD about this topic after reading every source and talking
     to the analyst — the layer between the sources (what the client wrote) and the requirements
     (what we will build). It is alive: after every client workshop /og:discovery updates the
     findings. A finding is NOT a requirement: no acceptance criteria, no priority, no UI; one
     finding becomes 1–3 requirements in the module's REQUIREMENTS.md later. -->

# [DSC-02] E-ink UI and non-functional requirements

## Topic scope

The constraints every screen obeys because the app runs on an E-ink display: contrast, palette, element size, refresh behaviour, navigation simplicity, and the Mudita design references that will detail them. Also the technical checklist (devices, accessibility, performance, security, privacy). Feeds NFR.md and the constitution, never a module.

## Sources in this topic

<Items from ALL sources that speak about this topic, side by side — so a contradiction between the
contract and the kick-off note is visible in one place, not in two files.>

| Item | Kind | Short |
| ---- | ---- | ----- |
| `SRC-01-22` | formal | Interface designed primarily for E-ink screens |
| `SRC-01-23` | formal | High contrast |
| `SRC-01-24` | formal | Limited colour palette / monochrome interface |
| `SRC-01-25` | formal | Large, readable elements |
| `SRC-01-26` | formal | No animations or transitions requiring a high refresh rate |
| `SRC-01-27` | formal | Minimise unnecessary screen refreshes |
| `SRC-01-28` | formal | Simple structure of screens and navigation |
| `SRC-01-29` | formal | Detailed UI rules to come from the Mudita E-ink device guidelines |
| `SRC-02-01` | formal | Link to Mudita Mindful Design (zeroheight) |
| `SRC-02-02` | formal | Mudita MMD repo — Kotlin, but model ourselves on it |
| `SRC-03-13` | informal | Mudita Kompakt is the only device |
| `SRC-03-14` | informal | Mindful Design is only an inspiration, not 1:1 |
| `SRC-03-15` | informal | Follow MMD's patterns and visual language, no parity |
| `SRC-03-16` | informal | Pure black and white; no font scaling or screen reader |
| `SRC-03-17` | informal | No security audit |
| `SRC-03-18` | informal | No personal data processed |
| `SRC-03-19` | informal | Unit + e2e per story; manual acceptance on Kompakt; no load tests |
| `SRC-03-20` | informal | Kompakt runs Android 12 |
| `SRC-03-21` | informal | Assume ~10 Hz refresh |
| `SRC-03-22` | informal | Element sizes intuitive, no hard number |
| `SRC-03-23` | informal | The delivery loop verifies in an emulator |
| `SRC-03-36` | informal | Confirmed: ≤1 s to reveal, ≤3 s to categories |

## Key findings

<One finding = one sentence about what the client wants in this area, as we understand it. Business
language, coarse. Each with its provenance: source items in brackets, `— *source: DEC-nn*` for a
ruling, `— *assumption: Qnn*` for a default waiting on the client. A finding with none of the three
is an unrecorded assumption — do not write it. Numbers are never reused; a withdrawn finding is
struck through with its DEC-nn.>

- [DSC-02-01] Every screen is designed for an E-ink display first. (`SRC-01-22`)
- [DSC-02-02] The interface is high-contrast and monochrome. (`SRC-01-23`, `SRC-01-24`)
- [DSC-02-03] Text and touch targets are large enough for both a parent and a small child to read and hit. (`SRC-01-25`, `SRC-01-12`) — *source: `DEC-02`*
- [DSC-02-04] Nothing animates: the screen changes only when its content changes, and unnecessary refreshes are avoided. (`SRC-01-26`, `SRC-01-27`)
- [DSC-02-05] The app has few screens and a flat, simple navigation. (`SRC-01-28`)
- [DSC-02-06] Mudita Mindful Design and MMD are an inspiration: the app follows their interaction patterns and visual language without being a 1:1 copy; the E-ink requirements of the MVP brief are the binding bar. (`SRC-01-29`, `SRC-02-01`, `SRC-02-02`, `SRC-03-14`, `SRC-03-15`) — *source: `DEC-11`*
- [DSC-02-07] MMD's Kotlin code is not reused; it is a pattern to model on. (`SRC-02-02`)
- [DSC-02-08] Only black and white are used — no greys. (`SRC-01-24`, `SRC-03-16`) — *source: `DEC-12`*
- [DSC-02-09] The MVP does not support system font scaling or a screen reader. (`SRC-03-16`) — *source: `DEC-12`*
- [DSC-02-10] The Mudita Kompakt is the only device the app is built for and accepted on, and it is tested manually. (`SRC-03-13`) — *source: `DEC-10`*
- [DSC-02-11] The app supports Android 12 and newer — the version the Kompakt runs. (`SRC-03-20`) — *source: `DEC-16`*
- [DSC-02-12] On the Kompakt the answer appears within 1 s of a tap and the category screen within 3 s of launch. (`SRC-03-36`) — *source: `DEC-31`*
- [DSC-02-13] There is no security audit in the MVP. (`SRC-03-17`) — *source: `DEC-13`*
- [DSC-02-14] The app processes no personal data, so no regulation-specific work is needed. (`SRC-03-18`) — *source: `DEC-14`*
- [DSC-02-15] Every story ships with unit and e2e tests; the MVP is accepted manually on the Kompakt; there is no load testing. (`SRC-03-19`) — *source: `DEC-15`*
- [DSC-02-16] The design assumes the Kompakt's screen refreshes at about 10 Hz. (`SRC-03-21`)
- [DSC-02-17] Element sizes are set by judgement, with no hard numeric minimum, and are judged on the Kompakt. (`SRC-03-22`) — *source: `DEC-17`*
- [DSC-02-18] The delivery loop verifies each story on an Android emulator; the Kompakt is checked by hand. (`SRC-03-23`) — *source: `DEC-18`*

## Contradictions

<Between sources or inside one. What A says, what B says, how it was settled (`DEC-nn`) or which
question waits (`Qnn`). A settled contradiction stays here with its reference — it is the history a
developer looks for when a requirement puzzles them.>

- None between the sources.

## Ambiguities

<Statements with two plausible readings. Both readings written out, then the ruling or the
question. Picking a reading inside a finding with no entry here is silent interpretation.>

- "Limited colour palette / monochrome" (`SRC-01-24`): (a) black, white and some greys, (b) pure black and white → (b), `DEC-12`
- "Detailed UI rules will be completed based on the Mudita guidelines" (`SRC-01-29`) with "model ourselves on" MMD (`SRC-02-02`): (a) the guidelines bind and override §5, (b) they inspire and §5 binds → (b), `DEC-11`

## From the calls, not the documents

<What the analyst knows from talking to the client that no document records. Written first as
items in `sources/NN-analyst-notes-<date>.md`, only pointed at here — so the finding it produces has
a source like any other.>

- `SRC-03-13`…`SRC-03-23` — the product owner's statements in the discovery interview 2026-10-14.

## For the client workshop

<Open questions in this topic — numbers only; the text lives in QUESTIONS.md, the list to send in
discovery/AGENDA.md.>

- None open. Resolved here: `Q12`, `Q13`, `Q17`, `Q21`, `Q22`, `Q25`, `Q26`.

## Parked

<What came up in the documents or the conversation that this project does not do — candidates for
non-goals in PROJECT.md or for the deferred-scope module. Always with a reason. Parking a formal
source item needs a `DEC-nn` (reduction).>

- Other Android E-ink devices and tablets — the Kompakt is the only target (`DEC-10`).
- Visual parity with Mudita apps and tracking the live Mindful Design site — inspiration only (`DEC-11`); `SRC-01-29` is interpreted, not dropped.
- Greys, system font scaling and screen-reader support — not in the MVP (`DEC-12`).
- Security audit and load testing — not in the MVP (`DEC-13`, `DEC-15`).

