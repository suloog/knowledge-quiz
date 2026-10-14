---
id: US-03-05 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-03
covers: [MOD-01-F08, MOD-01-F13, MOD-03-U03] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: ready # draft | ready | in-progress | review | done | blocked
priority: should # must | should | nice-to-have — inherited from the requirement
depends_on: [US-03-01, US-01-02, US-01-03, US-01-04] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Child, I can see a picture with some questions, so that a question is easier to understand

|  |  |
| --- | --- |
| **Module** | `[MOD-03]` Question cards — `docs/specs/modules/03-question-cards/REQUIREMENTS.md` |
| **Covers** | `MOD-01-F08`, `MOD-01-F13`, `MOD-03-U03` |
| **Priority** | should |
| **Status** | ready |
| **Depends on** | `US-03-01`, `US-01-02`, `US-01-03`, `US-01-04` |
| **YouTrack** | — |
| **Open questions** | — |

## Description

Some questions — only where a picture really helps — carry one black-and-white illustration, shown with the question from the moment the card appears. Most questions stay text-only. Priority is should, inherited from `MOD-01-F08`.

## Acceptance criteria

- [ ] Only questions where a picture helps carry an illustration; a question without one shows no placeholder.
- [ ] Every illustration is pure black and white; a test fails on any other pixel value.
- [ ] An illustration is shown with its question as soon as the card appears, and stays visible after the reveal.
- [ ] The same question shows the same illustration in both languages; illustrations carry no text.
- [ ] On the Mudita Kompakt every illustration is legible (checked by hand at the owner's review).

## Edge cases

- An illustration that is not legible in pure black and white → it is dropped, the question stays text-only (`DEC-28`).

## Out of scope / what not to worry about

- An illustration on every question (`DEC-28`).
- Colour or greyscale images (`DEC-12`).

## Technical notes

- PNG, 1-bit; AI-generated then converted; pixel test in Jest (`MOD-01-F13`).
- Referenced from the question's content entry (US-01-02 structure).
