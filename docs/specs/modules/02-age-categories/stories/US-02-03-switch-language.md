---
id: US-02-03 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-02
covers: [MOD-02-F10, MOD-02-F11, MOD-02-F12, MOD-02-F13, MOD-02-U04] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: done # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [US-02-01, US-03-02] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can switch the app between Polish and English, so that we play in our language

|  |  |
| --- | --- |
| **Module** | `[MOD-02]` Age categories — `docs/specs/modules/02-age-categories/REQUIREMENTS.md` |
| **Covers** | `MOD-02-F10`, `F11`, `F12`, `F13`, `U04` |
| **Priority** | must |
| **Status** | done |
| **Depends on** | `US-02-01`, `US-03-02` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

A language switch on the category screen that changes every text in the app — screens and questions — between Polish and English. The first language follows the device; the choice is remembered. Both languages hold the same questions, so switching never disturbs a deck (`DEC-41`).

## Acceptance criteria

### Scenario: Polish device

- **Given** the device is set to Polish and the app has never been opened
- **When** the app opens
- **Then** every text is in Polish and the switch shows Polish as active

### Scenario: Other device language

- **Given** the device is set to any language other than Polish
- **When** the app opens for the first time
- **Then** every text is in English

### Scenario: Switch and restart

- **Given** the app is in Polish
- **When** the parent switches to English and later reopens the app
- **Then** every text, including the questions, is in English

### Scenario: Decks kept

- **Given** three cards of 3+ have been revealed
- **When** the language is switched
- **Then** the 3+ deck resumes at its fourth card, in the new language

## Edge cases

- Saved language missing or unreadable → the device language decides, as on first launch.

## Out of scope / what not to worry about

- Languages other than Polish and English (`DEC-29`).
- A settings screen — the switch is on the category screen.

## Technical notes

- All user-facing strings via i18n (constitution); content carries both languages per question.
- Language stored in the single persistence module.
