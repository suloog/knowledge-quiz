---
id: US-02-01 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-02
covers: [MOD-02-F01, MOD-02-F02, MOD-02-F03, MOD-02-U01, MOD-02-U03, MOD-02-U05, NFR-02, NFR-03, NFR-04, NFR-07, NFR-08, NFR-09] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: in-progress # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-01-02] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can open the app and see the age categories, so that I pick questions meant for my child's age

|  |  |
| --- | --- |
| **Module** | `[MOD-02]` Age categories — `docs/specs/modules/02-age-categories/REQUIREMENTS.md` |
| **Covers** | `MOD-02-F01`, `F02`, `F03`, `U01`, `U03`, `U05`, `NFR-02`, `NFR-03`, `NFR-04`, `NFR-07`, `NFR-08`, `NFR-09` |
| **Priority** | must |
| **Status** | in-progress |
| **Depends on** | `US-01-02` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

The screen the app opens on: the age categories 3+, 4+ and 5+, listed from the content data in a fixed order, large enough for a small child to read and touch. This first screen sets the look of the whole app — pure black and white, no animation — in the spirit of Mudita's own apps. Choosing a category opens its cards in US-03-01; the continue entry is US-02-02; the language switch is US-02-03.

## Acceptance criteria

- [ ] Every launch opens on the category screen.
- [ ] The screen lists the categories found in the content data, in the order 3+, 4+, 5+, labelled "3+", "4+", "5+".
- [ ] A category added to the content data appears on the screen with no change to the screen.
- [ ] Every element on screen is pure black or pure white; a test fails if any other colour is used.
- [ ] Nothing animates and no transition is animated; a test fails if an animation is enabled.
- [ ] Each category entry spans the full width of the screen.
- [ ] On the Mudita Kompakt the screen appears within 3 s of launch (checked by hand).

## Edge cases

- Only the 3+ deck exists yet → the screen shows only 3+.
- Android back on this screen → the app closes (Q34).
- Saved data missing or unreadable → the screen still opens normally.

## Out of scope / what not to worry about

- What happens after choosing — US-03-01.
- The continue entry — US-02-02.
- The language switch — US-02-03.

## Technical notes

- Establish the app-wide theme here: #000/#FFF tokens, animations and navigation transitions disabled globally (constitution: *E-ink rendering*).
- Category list built from the content data (`MOD-02-F03`); labels via i18n.
- Touch-target size judged on the Kompakt, no fixed number (`DEC-17`); launch time measured by hand (`NFR-02`).
