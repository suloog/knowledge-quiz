---
id: DSC-01
title: Users, technology and data
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

# [DSC-01] Users, technology and data

## Topic scope

Who uses the app and in what setting, the platform and stack constraints the sources impose, where data lives (locally, no backend), and what the MVP explicitly leaves out (accounts, sync, CMS). Feeds PROJECT.md (Actors, Stack & integrations, Out of scope) and the constitution's Stack section. Visual and device constraints are `DSC-02`; the content itself is `DSC-05`.

## Sources in this topic

<Items from ALL sources that speak about this topic, side by side — so a contradiction between the
contract and the kick-off note is visible in one place, not in two files.>

| Item | Kind | Short |
| ---- | ---- | ----- |
| `SRC-01-01` | formal | Mobile app for Android devices with an E-ink screen |
| `SRC-01-02` | formal | Parent and child playing together, a simple educational quiz |
| `SRC-01-03` | formal | The parent presents or reads the question, then reveals the answer |
| `SRC-01-20` | formal | No backend, API or downloading content from the Internet |
| `SRC-01-30` | formal | Out of scope, among others: backend/CMS, online updates, login, child profiles, sync, statistics, achievements, gamification |
| `SRC-01 §6 (noted)` | formal | Android only · React Native · Expo preferred · company boilerplate · no backend · local content |
| `SRC-02 line 3 (noted)` | formal | Company boilerplate `boilerplate-react-native-expo`; nice to start with the latest RN, Expo and other packages |
| `SRC-02 line 5 (noted)` | formal | No component package imposed; any choice meeting the E-ink criteria |
| `SRC-03-01` | informal | The app is the analyst's own idea; the analyst is the product owner |
| `SRC-03-02` | informal | No deadline |
| `SRC-03-03` | informal | Built with the og plugin's delivery loop |
| `SRC-03-04` | informal | Parent or child may operate the device |
| `SRC-03-05` | informal | Only SRC-01 §1–5 with SRC-02 is in the MVP |
| `SRC-03-06` | informal | No analytics, no crash reporting |
| `SRC-03-07` | informal | APK installed directly on the device |
| `SRC-03-08` | informal | Start from the boilerplate, upgrade RN/Expo/packages first |
| `SRC-03-09` | informal | Tech lead picks the component library against §5 + Mindful Design |
| `SRC-03-10` | informal | Code with automated tests; no UI design step, no support |
| `SRC-03-11` | informal | Accepted on a real E-ink device via the core scenario |
| `SRC-03-12` | informal | Repo in Order Group GitHub; Maciej owns access and signing key; no hosting |

## Key findings

<One finding = one sentence about what the client wants in this area, as we understand it. Business
language, coarse. Each with its provenance: source items in brackets, `— *source: DEC-nn*` for a
ruling, `— *assumption: Qnn*` for a default waiting on the client. A finding with none of the three
is an unrecorded assumption — do not write it. Numbers are never reused; a withdrawn finding is
struck through with its DEC-nn.>

- [DSC-01-01] The app is used by a parent and a child together; the parent leads — presents or reads each question and reveals the answer. (`SRC-01-02`, `SRC-01-03`)
- [DSC-01-02] The app targets Android devices with an E-ink screen; no other platform is part of the MVP. (`SRC-01-01`, `SRC-01` §6)
- [DSC-01-03] The MVP works entirely on the device: no backend, no API, no content downloaded from the Internet. (`SRC-01-20`)
- [DSC-01-04] There are no user accounts or sign-in of any kind; whoever holds the device uses the app. (`SRC-01-17`, `SRC-01-30`)
- [DSC-01-05] Nothing about the child is stored or shared: no child profiles, no statistics, no sync between devices. (`SRC-01-30`)
- [DSC-01-06] The app is built in React Native with Expo, starting from the company boilerplate `ordergroup/boilerplate-react-native-expo`. (`SRC-01` §6, `SRC-02` line 3)
- [DSC-01-07] The app is an internal Order Group initiative; its author is the product owner and makes the scope decisions. (`SRC-03-01`)
- [DSC-01-08] The MVP has no deadline. (`SRC-03-02`) — *source: `DEC-01`*
- [DSC-01-09] The app is implemented through the og plugin's autonomous delivery loop. (`SRC-03-03`)
- [DSC-01-10] Either the parent or the child may operate the device. (`SRC-03-04`) — *source: `DEC-02`*
- [DSC-01-11] The MVP is exactly what SRC-01 §1–5 and SRC-02 describe; anything else is out. (`SRC-03-05`) — *source: `DEC-03`*
- [DSC-01-12] The app makes no network calls: no analytics and no crash reporting. (`SRC-03-06`) — *source: `DEC-04`*
- [DSC-01-13] The MVP is distributed as an APK installed directly on the device, not through an app store. (`SRC-03-07`) — *source: `DEC-05`*
- [DSC-01-14] Upgrading the boilerplate to the latest React Native, Expo and packages is the first piece of work and part of the scope. (`SRC-03-08`) — *source: `DEC-06`*
- [DSC-01-15] The component library is the tech lead's choice, measured against the E-ink requirements and Mudita Mindful Design. (`SRC-03-09`) — *source: `DEC-07`*
- [DSC-01-16] The delivery is code with automated tests; there is no separate UI design step and no post-release support. (`SRC-03-10`) — *source: `DEC-08`*
- [DSC-01-17] The MVP is accepted by the product owner running the core scenario on a real E-ink device. (`SRC-03-11`, `SRC-01-31`) — *source: `DEC-08`*
- [DSC-01-18] The repository lives in the Order Group GitHub organisation; Maciej owns its access and the release signing key; there is no hosting. (`SRC-03-12`) — *source: `DEC-09`*

## Contradictions

<Between sources or inside one. What A says, what B says, how it was settled (`DEC-nn`) or which
question waits (`Qnn`). A settled contradiction stays here with its reference — it is the history a
developer looks for when a requirement puzzles them.>

- None between the sources. `SRC-01` §6 "Expo preferred" and "the company boilerplate" looked like a possible conflict; the boilerplate is Expo-based → `DEC-06`.

## Ambiguities

<Statements with two plausible readings. Both readings written out, then the ruling or the
question. Picking a reading inside a finding with no entry here is silent interpretation.>

- "The user" (`SRC-01-06`) next to "the parent presents or reads" (`SRC-01-03`): (a) only the parent operates the device, (b) the parent or the child → (b), `DEC-02`
- "Among others" in the out-of-scope list (`SRC-01-30`): (a) illustrative list, decide case by case, (b) everything not described in §1–5 is out → (b), `DEC-03`

## From the calls, not the documents

<What the analyst knows from talking to the client that no document records. Written first as
items in `sources/NN-analyst-notes-<date>.md`, only pointed at here — so the finding it produces has
a source like any other.>

- `SRC-03-01`…`SRC-03-12` — the product owner's own statements in the discovery interview 2026-10-14.

## For the client workshop

<Open questions in this topic — numbers only; the text lives in QUESTIONS.md, the list to send in
discovery/AGENDA.md.>

- None open. Resolved here: `Q03`, `Q14`, `Q15`, `Q16`, `Q18`, `Q19`, `Q20`, `Q23`, `Q24`.

## Parked

<What came up in the documents or the conversation that this project does not do — candidates for
non-goals in PROJECT.md or for the deferred-scope module. Always with a reason. Parking a formal
source item needs a `DEC-nn` (reduction).>

- Everything `SRC-01-30` lists (backend/CMS, online updates, login, child profiles, sync, statistics, achievements, extended gamification) — out of the MVP by the formal source itself; non-goals for PROJECT.md (`DEC-03`).
- Distribution through an app store (Google Play, Mudita) — not in any formal source; not needed for sideload (`DEC-05`).
- Analytics and crash reporting — not in any formal source; no network calls in the MVP (`DEC-04`).
- A separate UI design step and post-release support — not in any formal source (`DEC-08`).

