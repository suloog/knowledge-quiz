# Test plan — test case register

> Every test in the project in one view. The test case file
> `docs/specs/modules/NN-<slug>/tests/TC-NN-MM-<slug>.md` is the source of truth for content; this file is
> its **mirror** and changes in the same pass.
>
> 🔴 **This register carries no results.** There is no "last result" column and no last-run date —
> results live in `run.json` and in that run's HTML report. The test plan says what must be
> checked; the report says what happened. Mixing the two gives a register that lies a week after
> the last run.

## Legend

| Status | Meaning |
| ------ | ------- |
| `draft` | written, not yet reviewed |
| `ready` | reviewed — ready to run |

| Layer | Executed by |
| ----- | ----------- |
| `admin` | Django panel, through Playwright |
| `web` | web application, through Playwright |
| `api` | HTTP, no browser |
| `mobile` | mobile app, through Maestro (+ the Metro bridge for app state) |

| Type | Meaning |
| ---- | ------- |
| `happy-path` | the main path, everything works in order |
| `edge` | a boundary case from the module's "Constraints and edge cases" |
| `negative` | the system must **refuse** — validation, no permission, conflict |
| `nfr` | a measurable non-functional requirement |

**Automation:** `auto` (run by the executor) · `manual-only` (out of the executor's reach — never
green in the report, goes onto the manual-check list).

**Identifiers:** `TC-NN-MM`, where `NN` is the parent module (`MOD-NN`) and `MM` a counter within
that module. Numbers are never reused or renumbered.

## Progress

| Module | Story criteria | Covered | TC (auto / manual) | Written |
| ------ | -------------- | ------- | ------------------ | ------- |
| `MOD-01` Question content | 24 | 24 | 2 / 1 | written |
| `MOD-02` Age categories | 15 | 15 | 12 / 2 | written |
| `MOD-03` Question cards | 22 | 22 | 21 / 2 | written |
| **Total** | **61** | **61** | **35 / 5** | 3 / 3 modules written |

A module counts as **written** when part 2 of its `COVERAGE.md` has no row without either a test or a note. Criteria covered by a note are proved by the unit test suite or PR review, not by the executor.

## Environments

Addresses live in `.claude/og-test-targets.json`; this app has no sign-in, so there are no credentials at all.

| Environment | Used for | Data |
| ----------- | -------- | ---- |
| `local` | Maestro on an Android 12 (API 31) emulator — the delivery loop's run per story | the app's shipped content; deck states set through the app-state bridge |
| Mudita Kompakt | manual checks before a release (`manual-only` tests) — no automation reaches the E-ink device (TQ24) | a release build with shipped content |

## [MOD-01] Question content

`docs/specs/modules/01-question-content/REQUIREMENTS.md` · `docs/specs/modules/01-question-content/tests/`

| TC | Title | Verifies | Layer | Type | Automation | Status |
| -- | ----- | -------- | ----- | ---- | ---------- | ------ |
| `TC-01-01` | The app installs and opens on an Android 12 emulator | `US-01-01#2`, `NFR-10` | mobile | happy-path | auto | draft |
| `TC-01-02` | The app opens and plays a card with the network switched off | `US-01-01#4`, `US-01-02#7`, `NFR-12` | mobile | edge | auto | draft |
| `TC-01-03` | The app installs and opens on the Mudita Kompakt | `US-01-01#2`, `NFR-11` | mobile | happy-path | manual-only | draft |

## [MOD-02] Age categories

`docs/specs/modules/02-age-categories/REQUIREMENTS.md` · `docs/specs/modules/02-age-categories/tests/`

| TC | Title | Verifies | Layer | Type | Automation | Status |
| -- | ----- | -------- | ----- | ---- | ---------- | ------ |
| `TC-02-01` | Launch opens on the category screen listing 3+, 4+ and 5+ in that order | `US-02-01#1`, `US-02-01#2` | mobile | happy-path | auto | draft |
| `TC-02-02` | Each category entry spans the full width of the screen | `US-02-01#6` | mobile | happy-path | auto | draft |
| `TC-02-03` | The category screen appears within 3 s of launch on the Kompakt | `US-02-01#7`, `NFR-02` | mobile | nfr | manual-only | draft |
| `TC-02-04` | The category screen is pure black and white with no animation on the Kompakt | `NFR-03`, `NFR-07` | mobile | nfr | manual-only | draft |
| `TC-02-05` | First launch shows no continue entry | `US-02-02#1` | mobile | happy-path | auto | draft |
| `TC-02-06` | After a category is used, a continue entry for it stands above the unchanged list | `US-02-02#2` | mobile | happy-path | auto | draft |
| `TC-02-07` | After a restart, continue resumes the last category at its first unseen card | `US-02-02#3` | mobile | happy-path | auto | draft |
| `TC-02-08` | Continue on a finished deck opens its end card | `US-02-02#4` | mobile | edge | auto | draft |
| `TC-02-09` | Unreadable saved data makes the category screen behave as on first launch | `MOD-02-F08` | mobile | edge | auto | draft |
| `TC-02-10` | On a Polish device the first launch is in Polish | `US-02-03#1` | mobile | happy-path | auto | draft |
| `TC-02-11` | On a device set to another language the first launch is in English | `US-02-03#2` | mobile | edge | auto | draft |
| `TC-02-12` | A language switch changes every text and survives a restart | `US-02-03#3` | mobile | happy-path | auto | draft |
| `TC-02-13` | A language switch keeps every deck's position | `US-02-03#4` | mobile | edge | auto | draft |
| `TC-02-14` | Android back on the category screen closes the app | `NFR-09` | mobile | edge | auto | draft |

## [MOD-03] Question cards

`docs/specs/modules/03-question-cards/REQUIREMENTS.md` · `docs/specs/modules/03-question-cards/tests/`

| TC | Title | Verifies | Layer | Type | Automation | Status |
| -- | ----- | -------- | ----- | ---- | ---------- | ------ |
| `TC-03-01` | A new card shows only its question, with no buttons, choices or score | `US-03-01#1` | mobile | happy-path | auto | draft |
| `TC-03-02` | Touching the card reveals the answer below a line, and the question stays | `US-03-01#2` | mobile | happy-path | auto | draft |
| `TC-03-03` | Touching a revealed card shows the next question alone | `US-03-01#3` | mobile | happy-path | auto | draft |
| `TC-03-04` | A double touch within 0.5 s never skips an answer | `US-03-01#4` | mobile | negative | auto | draft |
| `TC-03-05` | Cards appear in the language chosen on the category screen | `US-03-01#5` | mobile | happy-path | auto | draft |
| `TC-03-06` | On the Kompakt the answer appears within 1 s of a touch, with no animation | `US-03-01#6`, `NFR-01`, `NFR-03` | mobile | nfr | manual-only | draft |
| `TC-03-07` | A whole category shows each of its 50 questions exactly once | `US-03-02#1` | mobile | happy-path | auto | draft |
| `TC-03-08` | Closing before the reveal brings back the same question | `US-03-02#2` | mobile | edge | auto | draft |
| `TC-03-09` | Closing after the reveal resumes at the next unseen question | `US-03-02#3` | mobile | edge | auto | draft |
| `TC-03-10` | Each category keeps its own position | `US-03-02#4` | mobile | edge | auto | draft |
| `TC-03-11` | An unreadable saved deck starts a fresh shuffle | `MOD-03-F08` | mobile | edge | auto | draft |
| `TC-03-12` | After the last card the end card appears | `US-03-03#1` | mobile | happy-path | auto | draft |
| `TC-03-13` | "Again" restarts the category with every card unseen | `US-03-03#2` | mobile | happy-path | auto | draft |
| `TC-03-14` | "Categories" on the end card returns to the category screen | `US-03-03#3` | mobile | happy-path | auto | draft |
| `TC-03-15` | An app closed on the end card reopens the category on its end card | `MOD-03-F09` | mobile | edge | auto | draft |
| `TC-03-16` | Android back on a card returns to the categories | `US-03-04#1` | mobile | happy-path | auto | draft |
| `TC-03-17` | The return control on a card returns to the categories | `US-03-04#2` | mobile | happy-path | auto | draft |
| `TC-03-18` | Touching the return control never reveals an answer or moves on | `US-03-04#3` | mobile | negative | auto | draft |
| `TC-03-19` | After returning to the categories, the category resumes where it was left | `US-03-04#4` | mobile | edge | auto | draft |
| `TC-03-20` | A question without an illustration shows no placeholder | `US-03-05#1` | mobile | edge | auto | draft |
| `TC-03-21` | An illustration shows with its question from the start and after the reveal | `US-03-05#3` | mobile | happy-path | auto | draft |
| `TC-03-22` | A question shows the same illustration in both languages | `US-03-05#4` | mobile | edge | auto | draft |
| `TC-03-23` | Every illustration is legible on the Kompakt | `US-03-05#5` | mobile | nfr | manual-only | draft |
