---
id: SRC-01
title: Children's quiz app — MVP requirements ("Aplikacja quizowa dla dzieci — wymagania MVP")
kind: formal # formal (binding: contract, appendix, signed offer/estimate, RFP) | informal (e-mail, notes, slides, chat)
origin: Order Group (internal)
date: 2026-10-14
received_via: repo file docs/specs/sources/original/2026-10-14.md
supersedes:
status: read-only
---

<!-- This file records what the document SAYS — quoted or faithfully paraphrased, in the
     client's own words and order. No interpretation, no priorities, no acceptance criteria,
     no technical notes; those are written in discovery/ and modules/. Once written, never edited. -->

# [SRC-01] Children's quiz app — MVP requirements

## Summary

The MVP brief for an Android E-ink app in which a parent and child play a question-and-answer card
game together. It settles the main flow (age category → question → tap → answer → next question),
local-only content, the E-ink UI constraints and what is out of the MVP. It leaves open the exact
category list, the content itself, navigation details and the Mudita UI guidelines it refers to.
The original is in Polish; items below are faithful English renderings.

## Items

### 1. Purpose of the application

- [SRC-01-01] A mobile application for Android devices with an E-ink screen. — *§1*
- [SRC-01-02] The application is to support a parent and child playing together in the form of a simple educational quiz. — *§1*
- [SRC-01-03] The parent presents or reads the question to the child, then reveals the answer. — *§1*
- [SRC-01-04] The content should be primarily educational, popular-science, nature-related and trivia. — *§1*
- [SRC-01-05] The content should be adapted in level to the child's age. — *§1*

### 2. Main user scenario

- [SRC-01-06] After launching the application the user lands on the age-category selection screen. — *§2*
- [SRC-01-07] In the first version the available categories will be, for example: 3+, 4+, 5+. — *§2*
- [SRC-01-08] The most recently used category should be highlighted and easily reachable at the top of the screen. — *§2*
- [SRC-01-09] Categories are defined in the application, but the UI should allow adding more later without rebuilding the interface. — *§2*
- [SRC-01-10] After choosing a category the user goes to the quiz. — *§2*

### 3. Quiz screen

- [SRC-01-11] The screen presents one question at a time. — *§3*
- [SRC-01-12] The question should take up as much of the available screen as possible and be readable for both the parent and the child. — *§3*
- [SRC-01-13] The interaction has two steps: Question → Answer. — *§3*
- [SRC-01-14] On first display the user sees only the question. — *§3*
- [SRC-01-15] After touching the screen the application reveals the correct answer. — *§3*
- [SRC-01-16] The next interaction moves on to the next question. — *§3*
- [SRC-01-17] Not planned in the MVP: choosing answers A/B/C, scoring, ranking, user accounts, extended gamification, tracking the child's results. — *§3*
- [SRC-01-18] The application should resemble a digital deck of question cards more than a classic quiz application. — *§3*

### 4. Content

- [SRC-01-19] Questions and answers are embedded locally in the application. — *§4*
- [SRC-01-20] The MVP does not require a backend, an API or downloading content from the Internet. — *§4*
- [SRC-01-21] The data structure should nevertheless allow easily adding further questions and categories in later versions. — *§4*

### 5. E-ink requirements

- [SRC-01-22] The interface is designed primarily for E-ink screens. — *§5*
- [SRC-01-23] High contrast. — *§5*
- [SRC-01-24] A limited colour palette / monochrome interface. — *§5*
- [SRC-01-25] Large, readable elements. — *§5*
- [SRC-01-26] No animations or transitions requiring a high refresh rate. — *§5*
- [SRC-01-27] Minimising unnecessary screen refreshes. — *§5*
- [SRC-01-28] A simple structure of screens and navigation. — *§5*
- [SRC-01-29] Detailed UI rules will be completed based on the guidelines for Mudita E-ink devices. — *§5*

### 7. Out of MVP scope

- [SRC-01-30] At this stage, among others, the following remain out of scope: backend/CMS, updating questions over the Internet, login, child profiles, synchronisation between devices, statistics, achievements and extended gamification. — *§7*
- [SRC-01-31] Core of the MVP: I launch the app → choose the age → get a question → ask the child → touch the screen → we learn the answer → we move to the next question. — *§7*

## Noted but not scope

- §6 Technology: Android only. — *§6*
- §6 Technology: React Native. — *§6*
- §6 Technology: Expo preferred. — *§6*
- §6 Technology: eventually based on the company boilerplate. — *§6*
- §6 Technology: no backend within the MVP scope. — *§6*
- §6 Technology: locally stored content. — *§6*

## Contradictions and unclear points

- "for example: 3+, 4+, 5+" — the v1 category list is not fixed (`SRC-01-07`) → `Q01`
- "defined in the application" vs "adding more later without rebuilding the interface" — whether new categories and questions arrive only with an app release (`SRC-01-09`, `SRC-01-21`) → `Q02`
- "the user" — the parent, the child, or either operates the device (`SRC-01-03`, `SRC-01-06`) → `Q03`
- "highlighted and easily reachable at the top" — how this works with only three categories, and whether it persists (`SRC-01-08`) → `Q04`
- "touching the screen" / "the next interaction" — any tap anywhere or specific targets; no way back to the categories is described (`SRC-01-15`, `SRC-01-16`) → `Q07`, `Q08`
- "Mudita E-ink devices" — guidelines referenced but not supplied; target device(s) not named (`SRC-01-01`, `SRC-01-29`) → `Q12`, `Q13`
- "among others" — the out-of-scope list is open-ended (`SRC-01-30`) → `Q14`
- "Expo preferred" and "the company boilerplate" — their compatibility is not stated (§6) → `Q20`
