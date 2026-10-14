---
id: MOD-02
title: Age categories
ticket: # optional YouTrack ID, filled by /og:sync-youtrack
status: draft # draft | ready | in-progress | done
depends_on: [MOD-01] # other module IDs
sources: [SRC-01, SRC-02, SRC-03] # SRC-NN documents this module draws on, e.g. [SRC-01, SRC-03]
---

<!-- Content in the project language; headings fixed by this template. Delete sections that
     have no content; never write "none". -->

# [MOD-02] Age categories

## Context

The screen the app opens on: the three age categories, the continue entry that brings the family back to the last-used category, the list built from the content data, and the language switch (`DEC-35`). As the first screen built, it is where the E-ink look of the whole app is established, so it owns the brief's E-ink statements and the Mudita design references, delivered through the project-wide NFRs (`DEC-36`). Answers for the scope area *Age categories* in PROJECT.md; comes from discovery topic `DSC-03` plus `DSC-05-11` and `DSC-05-12`.

## Scope coverage

| Source item | Kind | Delivered by |
| ----------- | ---- | ------------ |
| `SRC-01-06` After launching the application the user lands on the age-category… | formal | `MOD-02-F01` |
| `SRC-01-07` In the first version the available categories will be, for example:… | formal | `MOD-02-F02`, `MOD-02-U03` |
| `SRC-01-08` The most recently used category should be highlighted and easily re… | formal | `MOD-02-F05`, `MOD-02-F07`, `MOD-02-U02` |
| `SRC-01-09` Categories are defined in the application, but the UI should allow… | formal | `MOD-02-F03` |
| `SRC-01-10` After choosing a category the user goes to the quiz. | formal | `MOD-02-F04` |
| `SRC-01-22` The interface is designed primarily for E-ink screens. | formal | `NFR-03`, `NFR-04`, `NFR-07`, `MOD-02-U05` |
| `SRC-01-23` High contrast. | formal | `NFR-07` |
| `SRC-01-24` A limited colour palette / monochrome interface. | formal | `NFR-07` |
| `SRC-01-25` Large, readable elements. | formal | `MOD-02-U01`, `NFR-08` |
| `SRC-01-26` No animations or transitions requiring a high refresh rate. | formal | `NFR-03` |
| `SRC-01-27` Minimising unnecessary screen refreshes. | formal | `NFR-04` |
| `SRC-01-28` A simple structure of screens and navigation. | formal | `NFR-09` |
| `SRC-01-29` Detailed UI rules will be completed based on the guidelines for Mud… | formal | `MOD-02-U05` — *interpreted as inspiration, `DEC-11`* |
| `SRC-02-01` Link to Mudita Mindful Design: https://zeroheight.com/956ff055a/p/7… | formal | `MOD-02-U05` — *`DEC-11`* |
| `SRC-02-02` Link to the repo https://github.com/mudita/MMD. It is written in Ko… | formal | `MOD-02-U05` — *`DEC-11`* |
| `SRC-03-24` New categories and questions come only with a new app version. | informal | — *(`DEC-19`; see Out of scope)* |
| `SRC-03-25` Version 1 has exactly the categories 3+, 4+ and 5+. | informal | `MOD-02-F02` |
| `SRC-03-26` The last-used category is shown as a separate "continue" entry abov… | informal | `MOD-02-F05`, `MOD-02-F07` |
| `SRC-03-35` The language is chosen with a switch in the app. | informal | `MOD-02-F10` |
| `SRC-03-37` Confirmed: on first launch there is no continue entry, only the lis… | informal | `MOD-02-F08` |
| `SRC-03-38` Confirmed: the language switch is on the category screen; on first… | informal | `MOD-02-F10`, `MOD-02-F11`, `MOD-02-F12` |

## Functional requirements

Every requirement in this module is priority **must** unless marked otherwise.

- [MOD-02-F01] The app always opens on the category screen.
- [MOD-02-F02] The category screen lists the age categories 3+, 4+ and 5+, always in that order. — *source: `DEC-20`*
- [MOD-02-F03] The list of categories comes from the content data, so a category added to the data appears on the screen with no change to the screen.
- [MOD-02-F04] Choosing a category opens its question cards.
- [MOD-02-F05] Once a category has been used, a continue entry above the list leads back to the last-used category. — *source: `DEC-21`*
- [MOD-02-F06] The continue entry resumes that category at its first unseen card. — *source: `DEC-22`*
- [MOD-02-F07] The last-used category is remembered after the app is closed. — *source: `DEC-21`*
- [MOD-02-F08] Before any category has been used, the screen shows no continue entry. — *source: `DEC-32`*
- [MOD-02-F09] When the last-used category's deck is finished, the continue entry opens its end card. — *assumption: `Q31`*
- [MOD-02-F10] A language switch on the category screen changes the whole app between Polish and English. — *source: `DEC-30`*
- [MOD-02-F11] On first launch the app is in Polish if the device is set to Polish, and in English otherwise. — *source: `DEC-33`*
- [MOD-02-F12] The chosen language is remembered after the app is closed. — *source: `DEC-33`*
- [MOD-02-F13] Switching the language keeps every category's deck order and position. — *assumption: `Q32`*

## UI/UX requirements

- [MOD-02-U01] Each category and the continue entry are large enough for a small child to read and touch.
- [MOD-02-U02] The continue entry stands out from the list (for example shown inverted, white on black) and names the category it leads to. — *source: `DEC-21`*
- [MOD-02-U03] Categories are labelled "3+", "4+" and "5+" in both languages. — *assumption: `Q33`*
- [MOD-02-U04] The language switch shows which language is active. — *source: `DEC-33`*
- [MOD-02-U05] The screen follows the interaction patterns and visual language of Mudita's own apps, without being a copy of them. — *source: `DEC-11`*

## Constraints and edge cases

- Saved data missing or unreadable → the screen behaves as on first launch: no continue entry, language from the device setting.
- Device set to a language other than Polish or English → the app starts in English (`DEC-33`).
- Android back on the category screen closes the app. — *assumption: `Q34`*
- The screen redraws only when something on it changes — choosing a language redraws it once (`NFR-04`).

## Technical notes

- This module establishes the app-wide E-ink theme the other screens reuse: #000/#FFF tokens only, animations and navigation transitions disabled globally (constitution: *E-ink rendering*, `NFR-03`, `NFR-07`).
- Last-used category, deck state and language live in the single persistence module (constitution); MOD-03 writes the deck state, this screen reads it.
- All labels go through i18n (pl, en); category labels come from the content data.
- The minimum touch-target size is judged on the Kompakt, not fixed by a number (`DEC-17`).

## Out of scope / what not to worry about

- Adding or downloading categories in the running app — they come only with a new app version (`DEC-19`).
- A settings screen — the language switch sits on this screen; there is nothing else to set.
- Languages other than Polish and English (`DEC-29`).
- Reordering categories or moving the last-used one to the top of the list — the list keeps a fixed order (`DEC-21`).

## Acceptance criteria

- [ ] On first launch the app opens on the category screen showing 3+, 4+ and 5+ and no continue entry, in the device's language (Polish or English).
- [ ] After a category has been used and the app restarted, a continue entry above the list leads back to that category at its first unseen card.
- [ ] The language switch changes every text in the app; the choice survives a restart and keeps every deck's position.
- [ ] On the Mudita Kompakt the screen is pure black and white, without animation, and appears within 3 s of launch (`NFR-02`, `NFR-03`, `NFR-07`).
