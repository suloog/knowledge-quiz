# Decisions — the project's decision log

> Every ruling that shapes the scope lands here, whoever made it: the client at a workshop or by
> e-mail, the analyst taking an assumption, the tech lead choosing between two readings, a
> developer who found a requirement impossible. Not only departures — every decision, so the log
> reads as the full history of how the scope got to where it is.
>
> **Append-only.** An entry is never edited away or renumbered. A ruling that changes later is a
> new entry whose **Status** on the old one becomes `superseded by DEC-nn`. `/og:analyze`,
> `/og:discovery`, `/og:modules`, `/og:requirements`, `/og:stories`, `/og:decide` and `/og:start-story`
> all append here as they work.
>
> **Decided by** — `client (<name or role>)` · `analyst` · `tech lead` · `developer`.
> **Source** — where the ruling comes from: `workshop YYYY-MM-DD` · `e-mail from … YYYY-MM-DD` ·
> `call YYYY-MM-DD` · `assumption` (the analyst's default, awaiting the client) ·
> `implementation` (found while building) — with the `SRC-NN` holding the notes when there is one.
> **Scope effect** — `within scope` (interprets the sources) · `extension` (goes beyond every
> formal source — commercial follow-up with the client) · `reduction` (drops or narrows a formal
> source item — the client consciously gives it up).
> **Status** — `accepted` · `to confirm with the client` · `rejected` · `superseded by DEC-nn`.
>
> An entry that answers a question names it under **Resolves**; the question moves to the
> "Resolved" section of QUESTIONS.md in the same run.

## [DEC-01] No deadline for the MVP

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-02`)
- **Affects:** `Q19`, `DSC-01-08`
- **Decision:** The MVP has no fixed deadline or milestones.
- **Why:** Internal initiative of the product owner, built through the delivery loop.
- **Scope effect:** within scope
- **Resolves:** `Q19`
- **Status:** accepted

## [DEC-02] Parent or child operates the device

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-04`)
- **Affects:** `SRC-01-03`, `SRC-01-06`, `DSC-01-10`, `DSC-02`, `DSC-04`
- **Decision:** Either the parent or the child may operate the device; the parent still leads the game.
- **Why:** The product owner wants children to be able to tap through themselves.
- **Scope effect:** within scope
- **Resolves:** `Q03`
- **Status:** accepted

## [DEC-03] MVP scope is SRC-01 §1–5 with SRC-02

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-05`)
- **Affects:** `SRC-01-30`, `DSC-01-11`
- **Decision:** Only what SRC-01 §1–5 and SRC-02 describe is in the MVP; everything else, listed in §7 or not, is out. Adding anything is an extension with its own DEC.
- **Why:** Turns the open-ended "among others" into a closed boundary.
- **Scope effect:** within scope
- **Resolves:** `Q14`
- **Status:** accepted

## [DEC-04] No analytics, no crash reporting

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-06`)
- **Affects:** `SRC-01-20`, `DSC-01-12`
- **Decision:** The app collects no analytics and sends no crash reports; it makes no network calls.
- **Why:** A children's app with no data collected keeps privacy trivial, consistent with the offline MVP.
- **Scope effect:** within scope
- **Resolves:** `Q15`
- **Status:** accepted

## [DEC-05] Distribution by APK sideload

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-07`)
- **Affects:** `DSC-01-13`
- **Decision:** The MVP is distributed as an APK installed directly on the device; no app store listing in the MVP.
- **Why:** No store account, review or listing work needed for the MVP.
- **Scope effect:** within scope
- **Resolves:** `Q16`
- **Status:** accepted

## [DEC-06] Start from the boilerplate, upgraded to latest

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-08`)
- **Affects:** `SRC-02` line 3, `DSC-01-14`
- **Decision:** The project starts from `ordergroup/boilerplate-react-native-expo`; upgrading React Native, Expo and the packages to the latest versions is the first piece of work and part of the scope. Expo is used.
- **Why:** SRC-02 asks to start on the latest versions; the boilerplate is already Expo-based.
- **Scope effect:** within scope
- **Resolves:** `Q20`, `Q23`
- **Status:** accepted

## [DEC-07] Component library chosen by the tech lead

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-09`)
- **Affects:** `SRC-02` line 5, `DSC-01-15`
- **Decision:** The tech lead chooses the component library (or none) against SRC-01 §5 and Mudita Mindful Design; the choice is recorded in constitution.md and confirmed at /og:modules.
- **Why:** SRC-02 imposes no library; the criteria already exist.
- **Scope effect:** within scope
- **Resolves:** `Q24`
- **Status:** accepted

## [DEC-08] Delivery: code with automated tests, accepted on device

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-10`, `SRC-03-11`)
- **Affects:** `DSC-01-16`, `DSC-01-17`, TQ14, TQ16
- **Decision:** The delivery is code with automated tests per story, built by the delivery loop; there is no separate UI design step and no post-release support. The MVP is accepted by the product owner running the core scenario (SRC-01-31) on a real E-ink device.
- **Why:** Mudita Mindful Design serves as the design; the product owner is the only acceptor.
- **Scope effect:** within scope
- **Resolves:** `Q18`
- **Status:** accepted

## [DEC-09] Repository and signing key owned by Maciej

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-12`)
- **Affects:** TQ17, TQ18, `DSC-01-18`
- **Decision:** The repository lives in the Order Group GitHub organisation; Maciej owns access to it and the release signing key. There is no hosting environment.
- **Why:** Offline app distributed by sideload — the repo and the keystore are the only assets to own.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-10] Mudita Kompakt is the only reference device

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-13`)
- **Affects:** `SRC-01-01`, `DSC-02-10`, TQ23, TQ24
- **Decision:** The MVP is built for and accepted on the Mudita Kompakt only; other Android E-ink devices are neither targeted nor tested. Tablets are out.
- **Why:** One concrete device makes acceptance (DEC-08) and manual testing meaningful.
- **Scope effect:** within scope
- **Resolves:** `Q12`
- **Status:** accepted

## [DEC-11] Mudita design references are inspiration, not a binding spec

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-14`, `SRC-03-15`)
- **Affects:** `SRC-01-29`, `SRC-02-01`, `SRC-02-02`, `DSC-02-06`
- **Decision:** Mudita Mindful Design and MMD are an inspiration: the app follows their interaction patterns and visual language without being a 1:1 copy, and no particular version of the guidelines is binding. SRC-01 §5 remains the binding bar for the UI.
- **Why:** The product owner wants freedom from a living external site; §5 already states the constraints.
- **Scope effect:** within scope
- **Resolves:** `Q13`, `Q21`, `Q22`
- **Status:** accepted

## [DEC-12] Pure black and white; no font scaling or screen reader in the MVP

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-16`)
- **Affects:** `SRC-01-24`, `DSC-02-08`, `DSC-02-09`
- **Decision:** The interface uses black and white only, no greys. The MVP does not support system font scaling or a screen reader.
- **Why:** Simplest reading of "monochrome" for E-ink; accessibility beyond E-ink readability is not needed for the MVP.
- **Scope effect:** within scope
- **Resolves:** `Q17`
- **Status:** accepted

## [DEC-13] No security audit in the MVP

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-17`)
- **Affects:** TQ04, `DSC-02-13`
- **Decision:** No penetration test or security audit is planned; acceptance does not depend on one.
- **Why:** Offline app with no data, accounts or network calls.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-14] No personal data processed

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-18`)
- **Affects:** TQ11, TQ12, `DSC-02-14`
- **Decision:** The app processes no personal data, so no regulation-specific work (GDPR, store family policies) is part of the MVP.
- **Why:** No accounts, profiles, statistics or network calls (`DEC-04`, `SRC-01-30`).
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-15] Test levels

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-19`)
- **Affects:** TQ16, `DSC-02-15`, `DEC-08`
- **Decision:** Every story is delivered with unit and e2e tests by the delivery loop; the MVP is accepted manually on the Mudita Kompakt; there is no load testing.
- **Why:** E-ink rendering cannot be verified by automation; the delivery loop needs automated tests per story.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-16] Minimum Android version is 12

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-20`)
- **Affects:** TQ22, `DSC-02-11`
- **Decision:** The app supports Android 12 (API level 31) and newer — the version the Mudita Kompakt runs.
- **Why:** The Kompakt is the only target (`DEC-10`) and runs Android 12.
- **Scope effect:** within scope
- **Resolves:** `Q25`
- **Status:** accepted

## [DEC-17] No numeric minimum for element sizes

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-22`)
- **Affects:** `SRC-01-25`, `DSC-02-03`, `DSC-02-17`
- **Decision:** Text and touch-target sizes are set by judgement against SRC-01 §5, with no hard numeric minimum; they are judged at acceptance on the Kompakt.
- **Why:** The product owner prefers judging sizes on the device to fixing a number up front.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-18] Delivery loop verifies in an emulator

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-23`)
- **Affects:** `DEC-15`, `DSC-02-18`
- **Decision:** The delivery loop runs each story's e2e tests on an Android emulator; the Kompakt itself is checked manually by the product owner.
- **Why:** Automation cannot reach the E-ink device; an emulator is enough for the loop.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-19] Categories and questions change only with an app release

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-24`)
- **Affects:** `SRC-01-09`, `SRC-01-21`, `DSC-03-03`
- **Decision:** New categories and questions are added only by releasing a new app version; the app has no other way to receive them.
- **Why:** Follows from no backend and no online updates (`SRC-01-20`, `SRC-01-30`).
- **Scope effect:** within scope
- **Resolves:** `Q02`
- **Status:** accepted

## [DEC-20] v1 categories: 3+, 4+, 5+

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-25`)
- **Affects:** `SRC-01-07`, `DSC-03-05`, `DSC-05`
- **Decision:** Version 1 ships exactly three age categories: 3+, 4+ and 5+.
- **Why:** The brief's example is the intended set.
- **Scope effect:** within scope
- **Resolves:** `Q01`
- **Status:** accepted

## [DEC-21] Last-used category as a continue entry above a fixed list

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-26`)
- **Affects:** `SRC-01-08`, `DSC-03-06`
- **Decision:** The last-used category is offered as a separate entry at the top of the screen, above the full list of categories, which keeps a fixed order; the last-used category is remembered after the app is closed.
- **Why:** A stable layout on E-ink — nothing moves between sessions, so a child can learn where each category is.
- **Scope effect:** within scope
- **Resolves:** `Q04`
- **Status:** accepted

## [DEC-22] Shuffled deck without repeats, position remembered

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-27`)
- **Affects:** `SRC-01-11`, `SRC-01-16`, `DEC-21`, `DSC-04-06`, `DSC-04-07`
- **Decision:** Each category's questions are shuffled once and shown without repeats; the position in each category is remembered across restarts, and the continue entry (`DEC-21`) resumes at the next unseen question.
- **Why:** Feels like a real deck of cards; continuing makes sense only if the position is kept.
- **Scope effect:** within scope
- **Resolves:** `Q05`
- **Status:** accepted

## [DEC-23] End-of-deck card

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-28`)
- **Affects:** `SRC-01-16`, `DSC-04-08`
- **Decision:** When every question of a category has been shown, an end card says so and offers two choices: shuffle and start the category again, or go back to the categories.
- **Why:** An explicit end is clearer for a child than a silent restart.
- **Scope effect:** within scope
- **Resolves:** `Q06`
- **Status:** accepted

## [DEC-24] Whole card is the tap target; answer below the question

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-29`)
- **Affects:** `SRC-01-14`, `SRC-01-15`, `SRC-01-16`, `DSC-04-09`
- **Decision:** The whole card responds to a touch; the revealed answer appears below the question, which stays on screen.
- **Why:** Largest possible target for a child, one screen change per step on E-ink.
- **Scope effect:** within scope
- **Resolves:** `Q07`
- **Status:** accepted

## [DEC-25] Way back to the categories

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-30`)
- **Affects:** `SRC-01-28`, `DSC-04-10`
- **Decision:** From the cards the user returns to the categories with the Android back action or a small visible control placed outside the card's tap area.
- **Why:** Discoverable, but hard to hit by accident while tapping through cards.
- **Scope effect:** within scope
- **Resolves:** `Q08`
- **Status:** accepted

## [DEC-26] AI authors and accepts the content; owner reviews after the loop

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-31`)
- **Affects:** `SRC-01-04`, `SRC-01-05`, `DSC-05-06`, `DSC-05-07`
- **Decision:** The questions and answers are written by AI within the delivery loop, which also checks that each suits its age category and accepts it; the product owner reviews the whole content after the loop is finished, before release.
- **Why:** Content production fits the autonomous delivery loop; one human review at the end.
- **Scope effect:** within scope
- **Resolves:** `Q09`
- **Status:** accepted

## [DEC-27] 50 questions per category

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-32`)
- **Affects:** `DSC-05-08`, `DEC-20`
- **Decision:** Each of the three categories has 50 questions — 150 in total, the same in every language.
- **Why:** Several sessions before the end card (`DEC-23`) appears.
- **Scope effect:** within scope
- **Resolves:** `Q09`
- **Status:** accepted

## [DEC-28] Optional AI-generated black-and-white illustrations

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-33`)
- **Affects:** `SRC-01-24`, `DEC-12`, `DSC-05-09`
- **Decision:** Questions may carry an illustration where a picture genuinely helps; illustrations are AI-generated in pure black and white, with no target count, and are covered by the owner's post-loop review.
- **Why:** Pictures help small children; SRC-01 §1–5 does not describe them, so this extends the MVP (`DEC-03`).
- **Scope effect:** extension
- **Resolves:** `Q10`
- **Status:** accepted

## [DEC-29] Polish and English, same questions translated

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-34`)
- **Affects:** `SRC-01-04`, `DSC-05-10`
- **Decision:** The interface and the content are available in Polish and English; the English deck holds the same questions as the Polish one, translated.
- **Why:** SRC-01 names no language; a second language is beyond §1–5 (`DEC-03`).
- **Scope effect:** extension
- **Resolves:** `Q11`
- **Status:** accepted

## [DEC-30] In-app language switch

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** discovery interview 2026-10-14 (`SRC-03`, `SRC-03-35`)
- **Affects:** `SRC-01-28`, `DSC-05-11`, `DSC-05-12`
- **Decision:** The language is chosen with a switch inside the app, not by the device setting alone.
- **Why:** The product owner wants the language independent of the device setting.
- **Scope effect:** extension
- **Resolves:** `Q11`
- **Status:** accepted

## [DEC-31] Response-time targets on the Kompakt

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** /og:decide 2026-10-14 (`SRC-03`, `SRC-03-36`)
- **Affects:** TQ05, `DSC-02-12`, `PROJECT.md` G3
- **Decision:** On the Mudita Kompakt the answer appears within 1 s of a tap and the category screen within 3 s of launch.
- **Why:** The product owner confirmed the proposed default.
- **Scope effect:** within scope
- **Resolves:** `Q26`
- **Status:** accepted

## [DEC-32] First launch shows only the category list

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** /og:decide 2026-10-14 (`SRC-03`, `SRC-03-37`)
- **Affects:** `SRC-01-08`, `DEC-21`, `DSC-03-07`
- **Decision:** The very first time the app is opened, before any category has been used, the category screen shows no continue entry, only the list of categories.
- **Why:** The product owner confirmed the proposed default.
- **Scope effect:** within scope
- **Resolves:** `Q27`
- **Status:** accepted

## [DEC-33] Language switch placement and starting language

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** /og:decide 2026-10-14 (`SRC-03`, `SRC-03-38`)
- **Affects:** `DEC-30`, `DSC-05-12`
- **Decision:** The language switch is on the category screen; on first launch the app uses Polish if the device is set to Polish and English otherwise; the chosen language is remembered.
- **Why:** The product owner confirmed the proposed default; it details `DEC-30`, already recorded as an extension.
- **Scope effect:** within scope
- **Resolves:** `Q28`
- **Status:** accepted

## [DEC-34] Module split and order: Content → Categories → Cards

- **Date:** 2026-10-14
- **Decided by:** tech lead (Maciej)
- **Source:** /og:modules 2026-10-14
- **Affects:** `MOD-01`, `MOD-02`, `MOD-03`, `DSC-03`, `DSC-04`, `DSC-05`
- **Decision:** Three modules, one per business topic, ordered by dependency: MOD-01 Question content, MOD-02 Age categories, MOD-03 Question cards. This departs from the brief's order (§2 categories, §3 quiz, §4 content) and from the discovery numbering.
- **Why:** Every screen is built on real data; content is what both screens depend on.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-35] Language switch delivered by Age categories

- **Date:** 2026-10-14
- **Decided by:** tech lead (Maciej)
- **Source:** /og:modules 2026-10-14
- **Affects:** `DSC-05-11`, `DSC-05-12`, `DEC-30`, `DEC-33`, `MOD-02`
- **Decision:** The language switch found in discovery topic DSC-05 is delivered by MOD-02 Age categories, not by MOD-01 Question content.
- **Why:** The switch sits on the category screen; the content module only provides both languages.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-36] Owners of the cross-cutting formal items

- **Date:** 2026-10-14
- **Decided by:** tech lead (Maciej)
- **Source:** /og:modules 2026-10-14
- **Affects:** `SRC-01-01`, `SRC-01-02`, `SRC-01-03`, `SRC-01-20`, `SRC-01-22`…`SRC-01-30`, `SRC-02-01`, `SRC-02-02`
- **Decision:** Formal items from the cross-cutting topics are owned in a module's Scope coverage and delivered through NFR-nn: SRC-01 §5 and SRC-02 by MOD-02 Age categories (the first screen, where the E-ink look is set); SRC-01-01, -20 and -30 by MOD-01 Question content; SRC-01-02 and -03 by MOD-03 Question cards.
- **Why:** Every formal item needs exactly one owner for /og:clarify to check.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-37] Test tooling and coverage bar

- **Date:** 2026-10-14
- **Decided by:** tech lead (Maciej)
- **Source:** /og:modules 2026-10-14
- **Affects:** `constitution.md`, TQ16, `DEC-15`
- **Decision:** Unit tests use Jest with React Native Testing Library, e2e tests use Maestro on an Android emulator, and changed code needs 80% line coverage; unit-first, no TDD mandate. Added to the boilerplate's setup where it lacks them.
- **Why:** Maestro runs against Expo builds without native test code, simple for the delivery loop to write and run.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-38] A card is seen once its answer is revealed

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** /og:requirements 2026-10-14 (`SRC-03`, `SRC-03-39`)
- **Affects:** `DEC-22`, `MOD-03-F07`, `MOD-03-F08`, `MOD-02-F06`
- **Decision:** A card counts as seen — and is never shown again in that round of the deck — once its answer has been revealed; a card closed before the reveal is shown again.
- **Why:** An unrevealed question was never asked; the family should not lose it.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-39] Length limits for questions and answers

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** /og:requirements 2026-10-14 (`SRC-03`, `SRC-03-40`)
- **Affects:** `MOD-01-F11`, `MOD-01-F12`
- **Decision:** Every question is at most 100 characters and every answer at most 60 characters, in each language; enforced by an automatic content check.
- **Why:** Fits large type on the Kompakt's small E-ink screen without scrolling and suits a 3-year-old.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-40] Touches right after a screen change are ignored

- **Date:** 2026-10-14
- **Decided by:** analyst (product owner)
- **Source:** /og:requirements 2026-10-14 (`SRC-03`, `SRC-03-41`)
- **Affects:** `DEC-24`, `MOD-03-F14`
- **Decision:** A touch within 0.5 s of the screen changing is ignored.
- **Why:** With the whole card as the target, a child's double tap would otherwise reveal and skip a card in one go.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted
