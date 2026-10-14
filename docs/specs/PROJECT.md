---
project: knowledge-quiz
client: Order Group (internal)
language: en # language of every spec artifact (en | pl) — chosen once, at /og:analyze
status: approved
created: 2026-10-14
analyst: Maciej
---

<!-- Content in the project language. Section headings are fixed by this template — do not
     rename, reorder or add sections; the same structure is used in every Order Group project. -->

# Knowledge Quiz

## Overview

A quiz app for the Mudita Kompakt E-ink phone that a parent and a child aged 3–5 play together like
a deck of question cards: pick an age, read a question, touch to reveal the answer, move on. It
works fully offline, in Polish and English. It is an internal Order Group initiative, built by the og
plugin's autonomous delivery loop.

## Sources

- Binding: `SRC-01` Children's quiz app — MVP requirements, `SRC-02` MVP supplement — design references and starting point
- Informative: `SRC-03` Analyst notes — discovery interview 2026-10-14

## Goals

- G1: From launch, the first answer is on screen after two touches — one to pick a category, one to reveal. (`SRC-01-31`)
- G2: Each of the three categories holds 50 questions in Polish and English, all reviewed by the product owner before release. (`DEC-26`, `DEC-27`, `DEC-29`)
- G3: On the Mudita Kompakt the core scenario runs without animation; the answer appears within 1 s of a touch and the category screen within 3 s of launch. (`SRC-01-26`, `DEC-08`, `DEC-31`)
- G4: Every story is delivered by the delivery loop with its unit and e2e tests green on the emulator. (`SRC-03-03`, `DEC-15`, `DEC-18`)

## Actors

| Actor | Who they are | How they sign in | Access, in short | Source |
| ----- | ------------ | ---------------- | ---------------- | ------ |
| Parent | The adult playing with the child; reads questions aloud and leads the game | No sign-in | The whole app: categories, cards, language switch | `SRC-01-02`, `SRC-01-03` |
| Child | A child aged 3–5 playing with the parent; may tap through the cards themselves | No sign-in | The whole app, same as the parent | `SRC-01-02`, `DEC-02` |

## Glossary

| Term | Means exactly |
| ---- | ------------- |
| Age category | A group of questions for children of a given minimum age; v1 has 3+, 4+ and 5+ (`SRC-01-06`, `DEC-20`) |
| Card | One question with its single correct answer, shown alone on the screen (`SRC-01-11`, `SRC-01-18`) |
| Deck | All cards of one age category, in the shuffled order the app goes through without repeats (`SRC-01-18`, `DEC-22`) |
| Reveal | The touch on a card that shows the answer below the question (`SRC-01-15`, `DEC-24`) |
| Continue entry | The entry above the category list that returns to the last-used category at its next unseen card (`DEC-21`, `DEC-22`) |
| End card | The card shown after the last card of a deck, offering a new shuffle or the categories (`DEC-23`) |
| Content | The questions, answers and illustrations shipped inside the app, in Polish and English (`SRC-01-19`, `DEC-29`) |
| E-ink | The black-and-white electronic-paper screen of the Mudita Kompakt, with slow refresh (`SRC-01-22`, `DEC-10`) |
| Delivery loop | The og plugin's autonomous delivery process (`/og:deliver`) that builds the stories (`SRC-03-03`) |

## Scope

### In scope

- Age categories — the opening screen: choosing one of the three categories, the continue entry above a fixed list, a list driven by data. (`discovery/03-age-categories.md` · `SRC-01-06`…`SRC-01-10` · `DEC-19`…`DEC-21`)
- Question cards — the deck: one card at a time, reveal on touch, shuffled without repeats with the position remembered, the end card, the way back to the categories. (`discovery/04-question-cards.md` · `SRC-01-11`…`SRC-01-18`, `SRC-01-31` · `DEC-22`…`DEC-25`)
- Question content — 150 questions (50 per category) in Polish and English, optional black-and-white illustrations, a data structure open to additions, the in-app language switch. (`discovery/05-question-content.md` · `SRC-01-04`, `SRC-01-05`, `SRC-01-19`, `SRC-01-21` · `DEC-26`…`DEC-30`)

### Out of scope (non-goals)

- Answer choices (A/B/C), scoring, ranking, achievements, gamification or any tracking of the child's results. (`SRC-01-17`, `SRC-01-30`)
- User accounts, sign-in or child profiles. (`SRC-01-17`, `SRC-01-30`)
- A backend, CMS or API; downloading or updating content online; sync between devices. (`SRC-01-20`, `SRC-01-30`, `DEC-19`)
- Analytics, crash reporting or any other network call. (`SRC-01-30`, `DEC-04`)
- Distribution through an app store. (`DEC-05`)
- Devices other than the Mudita Kompakt — tablets, iOS, web. (`SRC-01-01`, `DEC-10`)
- Greys, system font scaling or screen-reader support. (`DEC-12`)
- Visual parity with Mudita's own apps, or tracking changes to the Mindful Design site. (`DEC-11`)
- A separate UI design step, post-release support, a security audit or load testing. (`DEC-08`, `DEC-13`, `DEC-15`)
- Separate, culturally adapted decks per language. (`DEC-29`)

## Stack & integrations

React Native with Expo at the latest versions, starting from `ordergroup/boilerplate-react-native-expo`,
which is upgraded as the first piece of work (`DEC-06`). Android 12 and newer (`DEC-16`), with the Mudita
Kompakt as the only target (`DEC-10`). No backend, no integrations, no network calls (`SRC-01-20`,
`DEC-04`): all logic and content live on the device, the content as local data in the repository
(`SRC-01-19`). The component library is the tech lead's choice (`DEC-07`). Distributed as a signed APK
by sideload (`DEC-05`). The repository is in the Order Group GitHub organisation; Maciej owns its access
and the signing key (`DEC-09`).

## Milestones

| Milestone | Contains | Target |
| --------- | -------- | ------ |
| M1 | Boilerplate upgraded to the latest RN/Expo, building on Android 12 | — (no deadline, `DEC-01`) |
| M2 | Categories, cards and content complete in the delivery loop | — |
| M3 | Owner's content review and acceptance on a real Kompakt | — |

## Risks

| Risk | Impact | Mitigation |
| ---- | ------ | ---------- |
| AI-written content is wrong or unsuitable for the age | Formal `SRC-01-05` not met; large rework after the loop | Checks the loop runs on every question; the owner's full review before release (`DEC-26`) |
| AI illustrations lose legibility when reduced to pure black and white | Pictures that confuse rather than help | Illustrations are optional; an unreadable one is dropped; checked on the Kompakt (`DEC-28`) |
| E-ink behaviour (ghosting, refresh) is seen only on the device; the loop tests on an emulator | Problems surface late, at acceptance | Regular manual checks on the Kompakt during the loop, not only at the end (`DEC-18`) |
| Scope grows through extensions with no deadline to stop it | The MVP never finishes | `DEC-03` boundary — anything new needs its own DEC; extensions can go to a later module |
| Upgrading the boilerplate to the latest versions breaks parts of it or Android 12 compatibility | Foundation rework before any feature | The upgrade comes first (M1) and is verified before feature work (`DEC-06`) |
| Timings and refresh rate are set but not yet measured (`DEC-31`, ~10 Hz assumed) | G3 targets that turn out to be unreachable | Measure on the Kompakt early in M1–M2 |

<Requirements are NOT listed here. They are enumerated per module in
docs/specs/modules/NN-<slug>/REQUIREMENTS.md (MOD-NN-Fnn / Unn) and, project-wide, in
docs/specs/NFR.md (NFR-nn). Source documents are registered in
docs/specs/SOURCES.md, open questions in docs/specs/QUESTIONS.md, decisions in
docs/specs/DECISIONS.md.>
