---
id: MOD-01
title: Question content
ticket: # optional YouTrack ID, filled by /og:sync-youtrack
status: draft # draft | ready | in-progress | done
depends_on: [] # other module IDs
sources: [SRC-01, SRC-03] # SRC-NN documents this module draws on, e.g. [SRC-01, SRC-03]
---

<!-- Content in the project language; headings fixed by this template. Delete sections that
     have no content; never write "none". -->

# [MOD-01] Question content

## Context

The questions and answers the app ships with: 150 questions (50 per age category) of an educational, popular-science, nature and trivia character, matched to the child's age, in Polish and English, some with a black-and-white illustration, kept as data so that adding questions or categories needs no screen change. It also carries the project's first piece of work, bringing the company boilerplate up to the latest React Native and Expo (`DEC-06`), and owns the brief's statements about the platform, the offline nature of the MVP and its out-of-scope list (`DEC-36`). Answers for the scope area *Question content* in PROJECT.md; comes from discovery topic `DSC-05` (`DSC-05-01`…`DSC-05-10`); the language switch from that topic is delivered by MOD-02 (`DEC-35`).

## Scope coverage

| Source item | Kind | Delivered by |
| ----------- | ---- | ------------ |
| `SRC-01-01` A mobile application for Android devices with an E-ink screen. | formal | `MOD-01-F01`, `NFR-10`, `NFR-11` |
| `SRC-01-04` The content should be primarily educational, popular-science, natur… | formal | `MOD-01-F05` |
| `SRC-01-05` The content should be adapted in level to the child's age. | formal | `MOD-01-F02`, `MOD-01-F06`, `MOD-01-F14` |
| `SRC-01-19` Questions and answers are embedded locally in the application. | formal | `MOD-01-F09` |
| `SRC-01-20` The MVP does not require a backend, an API or downloading content fr… | formal | `MOD-01-F09`, `NFR-05`, `NFR-12` |
| `SRC-01-21` The data structure should nevertheless allow easily adding further q… | formal | `MOD-01-F10` |
| `SRC-01-30` At this stage, among others, the following remain out of scope: back… | formal | — *(non-goals, kept out by `DEC-03`; see Out of scope)* |
| `SRC-03-08` Start from the company boilerplate and upgrade React Native, Expo an… | informal | `MOD-01-F01` |
| `SRC-03-31` AI writes and accepts the questions within the loop; the product own… | informal | `MOD-01-F14`, `MOD-01-F15` |
| `SRC-03-32` 50 questions per category. | informal | `MOD-01-F03` |
| `SRC-03-33` Optional black-and-white illustrations, AI-generated, only where a p… | informal | `MOD-01-F08`, `MOD-01-F13` |
| `SRC-03-34` The interface and the content are in Polish and English; both langua… | informal | `MOD-01-F07` |

## Functional requirements

Every requirement in this module is priority **must** unless marked otherwise.

- [MOD-01-F01] The app is built on the company's mobile app foundation, brought up to its latest platform versions before any feature work, and starts on Android 12. — *source: `DEC-06`*
- [MOD-01-F02] Every question belongs to exactly one age category: 3+, 4+ or 5+. — *source: `DEC-20`*
- [MOD-01-F03] Each age category holds 50 questions. — *source: `DEC-27`*
- [MOD-01-F04] Every question has exactly one correct answer. (`SRC-01-15`)
- [MOD-01-F05] Every question is educational, popular-science, nature-related or trivia.
- [MOD-01-F06] Every question's difficulty and vocabulary suit the youngest child of its age category.
- [MOD-01-F07] Every question and its answer exist in Polish and in English, with the same meaning in both. — *source: `DEC-29`*
- [MOD-01-F08] A question may carry one illustration, only where a picture helps; a question without one is complete as text. — **priority: should** — *source: `DEC-28`*
- [MOD-01-F09] All questions, answers and illustrations ship inside the app; nothing is downloaded.
- [MOD-01-F10] Adding a question or an age category is a change of content data only, with no change to any screen.
- [MOD-01-F11] Every question is at most 100 characters long, in each language. — *source: `DEC-39`*
- [MOD-01-F12] Every answer is at most 60 characters long, in each language. — *source: `DEC-39`*
- [MOD-01-F13] Every illustration consists of pure black and white only. — *source: `DEC-12`*
- [MOD-01-F14] Every question passes an age-suitability check: words a child of that age knows, nothing frightening, violent or adult, one unambiguous answer, a fact that can be verified. — *assumption: `Q29`*
- [MOD-01-F15] Each age category mixes the four kinds of content, each kind appearing at least 5 times among its 50 questions. — *assumption: `Q30`*

## Constraints and edge cases

- Content that fails any automatic content check (count, one answer per language, length limits, pure black-and-white illustrations) fails the test suite and is never released.
- A category with fewer than 50 questions in either language fails the test suite.
- A question without an illustration shows no placeholder for one (`MOD-03`).
- The same question has the same illustration in both languages; illustrations carry no text.

## Technical notes

- Foundation: `ordergroup/boilerplate-react-native-expo`, upgraded to the latest Expo SDK and React Native and the packages with them as the first story; verified to build and start on an Android 12 (API 31) emulator before any feature work (`DEC-06`, `DEC-16`).
- The component library is chosen in that first story against SRC-01 §5, with Mudita Mindful Design as inspiration, and recorded in `constitution.md` *Stack* (`DEC-07`).
- Content as versioned data files in the repository, one per age category, each question carrying `pl` and `en` texts for question and answer and an optional illustration reference; validated by a schema test in Jest (constitution: *Content is data*).
- The content checks (F02–F07, F11–F13, F15) are Jest tests, so the delivery loop enforces them on every story; the illustration test reads pixel values and fails on anything other than #000/#FFF.
- Illustrations: PNG, 1-bit black and white, generated by AI and converted; an illustration that loses legibility in conversion is dropped rather than shipped (`DEC-28`).
- Content is produced by a content story in the delivery loop, which also runs the age-suitability check (F14) and records it in the PR (`DEC-26`).

## Out of scope / what not to worry about

- A CMS, a backend or any way to edit or download content after release — out of the MVP by the brief itself (`SRC-01-30`, `DEC-03`); content changes come with a new app version (`DEC-19`).
- Login, child profiles, sync between devices, statistics, achievements, gamification — out of the MVP (`SRC-01-30`, `DEC-03`).
- Separate, culturally adapted decks per language — the English deck is a translation (`DEC-29`).
- An illustration on every question (`DEC-28`).
- The language switch — `MOD-02` (`DEC-35`). Showing the content on screen — `MOD-03`.

## Acceptance criteria

- [ ] The app, built on the upgraded foundation, starts on an Android 12 emulator and on the Mudita Kompakt.
- [ ] The app contains 150 questions — 50 in each of 3+, 4+ and 5+ — each with exactly one answer, in Polish and in English.
- [ ] Every automatic content check passes: counts, one answer per language, question ≤ 100 and answer ≤ 60 characters, illustrations pure black and white, at least 5 questions of each kind per category.
- [ ] The product owner has reviewed every question, answer and illustration before release (`DEC-26`).
