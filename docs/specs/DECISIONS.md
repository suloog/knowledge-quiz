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

## [DEC-41] Story order across modules

- **Date:** 2026-10-14
- **Decided by:** tech lead (Maciej)
- **Source:** /og:stories 2026-10-14
- **Affects:** `DEC-34`, `MOD-02-F04`, `US-03-01`, `US-02-02`, `US-02-03`
- **Decision:** `MOD-02-F04` (choosing a category opens its cards) is delivered by `US-03-01`, where the cards exist; `US-02-02` (continue entry) and `US-02-03` (language switch) are delivered after the deck stories `US-03-02` and `US-03-03` they rely on. Delivery order: US-01-01 → US-01-02 → US-02-01 → US-03-01 → US-03-02 → US-03-03 / US-03-04 → US-02-02 / US-02-03 → US-01-03 / US-01-04 → US-03-05.
- **Why:** The continue entry resumes saved decks and the language switch must keep their positions; neither is testable before the deck exists. Module order (`DEC-34`) stands for requirements, story dependencies follow behaviour.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-42] Foundation keeps the boilerplate's tooling, leaves out its demo and network code

- **Date:** 2026-10-14
- **Decided by:** developer (delivery loop)
- **Source:** implementation (`US-00-01`)
- **Affects:** `US-00-01`, `US-01-01`, `DEC-06`, `DEC-07`, `constitution.md`
- **Decision:** The app starts from `ordergroup/boilerplate-react-native-expo` upgraded to Expo SDK 57 / React Native 0.86 (`DEC-06`). Kept: Yarn 1, Expo Router under `src/app`, the TypeScript, ESLint, Prettier, Babel and Husky setup, Jest with `jest-expo`, the image assets. Left out, because nothing in the app uses them and the constitution forbids network code: the login and todo demo screens, the MSW mocks and their polyfills, the RTK Query API layer and the Redux store, `react-native-paper` and the theme built on it, AsyncStorage, Reanimated, Gesture Handler, React Native Web, the `.default.env` file and the boilerplate's CI workflow. Added for tests (`DEC-37`): React Native Testing Library and `jest-junit`.
- **Why:** Simplest foundation consistent with the constitution (*No network*) that leaves the component library to `DEC-07` and the persistence module to its own story; each later story adds the library it needs.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-43] Android application id pl.ordergroup.knowledgequiz

- **Date:** 2026-10-14
- **Decided by:** developer (delivery loop)
- **Source:** implementation (`US-00-01`)
- **Affects:** `US-00-01`, `US-01-01`, `app.json`, `.claude/og-test-targets.json`
- **Decision:** The Android application id (package) is `pl.ordergroup.knowledgequiz`, the app's display name `Knowledge Quiz`. The Maestro flows and `.claude/og-test-targets.json` use it.
- **Why:** The foundation must build, install and test the app before `US-01-01`; the id follows the company's domain. It can still change before the first signed APK is released.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-44] Network permission, release signing, component library and the offline test for US-01-01

- **Date:** 2026-10-14
- **Decided by:** product owner (delivery loop, confirmed 2026-10-14)
- **Source:** implementation (`US-01-01`)
- **Affects:** `US-01-01`, `NFR-05`, `NFR-06`, `NFR-12`, `DEC-07`, `DEC-09`, `TC-01-02`, `constitution.md`
- **Decision:** Option a — Take all four points as proposed. (1) Network: the `INTERNET` permission (with the other network permissions) is removed from the release build only, through a release manifest written by a config plugin; the debug build that `yarn stack` and CI run keeps it, because it loads its JavaScript from Metro. Criterion 3 is proven by a unit test on that manifest and by `aapt` on a built release APK. (2) Signing: the release build reads the keystore path, alias and passwords from the Gradle properties `KQ_UPLOAD_STORE_FILE`, `KQ_UPLOAD_STORE_PASSWORD`, `KQ_UPLOAD_KEY_ALIAS` and `KQ_UPLOAD_KEY_PASSWORD` (in `~/.gradle/gradle.properties` or the environment) and fails without them — never signed with the debug key. (3) Component library: none — React Native core components with the app's own black-and-white theme tokens, written into `constitution.md` *Stack*. (4) Offline test: criterion 4 is proven by the derived test `AC-01-01-4` (airplane mode on, the app opens its first screen); the `TC-01-02` flow is written in `US-03-01`, once the category screen and cards exist.
- **Why:** The APK that reaches the Kompakt has no network permission (`NFR-05`) without changing the foundation's start command or CI; no dependency is added; no reviewed test case is changed.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-45] Upload key variables in the environment win over Gradle properties of the same name

- **Date:** 2026-10-14
- **Decided by:** product owner (delivery loop, confirmed 2026-10-14)
- **Source:** implementation (`US-01-01`, code review round 2, finding B1)
- **Affects:** `US-01-01`, `DEC-44`, `NFR-06`, `AC-01-01-5`, `plugins/withReleaseSigning.js`, `README.md`
- **Decision:** Option a — Environment wins over gradle.properties (implemented). When a `KQ_UPLOAD_*` value is set both as an environment variable and as a Gradle property (e.g. in `~/.gradle/gradle.properties`), the release build uses the environment variable. The acceptance run passes its throwaway key only through the environment, so tests never sign with the real upload key and no password goes on the command line.
- **Why:** A value given explicitly for one build should beat a persistent default; it keeps the real key out of every test build and passwords out of the process list. A release build with the values only in `gradle.properties` behaves as before. Cost: a stray `KQ_UPLOAD_*` exported in the shell overrides the real key for a release build.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-46] Content data format, adding categories, and the evidence for US-01-02 criteria 4 and 7

- **Date:** 2026-10-14
- **Decided by:** product owner (delivery loop, confirmed 2026-10-14)
- **Source:** implementation (`US-01-02`)
- **Affects:** `US-01-02`, `US-01-03`, `US-01-04`, `US-03-01`, `MOD-01-F09`, `MOD-01-F10`, `MOD-01-F14`, `TC-01-02`, `DEC-44`, `constitution.md`
- **Decision:** Option a — Take all four points as proposed. (1) Format: one file per category, `src/content/decks/3-plus.json`, with `schemaVersion` 1, `category` "3+" and 50 questions, each with a stable `id`, a `kind` (educational, popular-science, nature, trivia), `pl` and `en` question and answer strings, and an optional illustration file name. (2) A new category is its JSON file plus one import line in `src/content/decks/index.ts`; screens read content only through `src/content`; a test fails when a deck file is not registered. (3) Criterion 7: `TC-01-02` runs in `US-03-01` (as in `DEC-44`); until then the derived test `AC-01-02-7` checks that the release APK's embedded bundle holds the 3+ deck and that the content code makes no network calls. (4) Criterion 4: a per-question record, `docs/delivery/content-checks/US-01-02-3-plus.md`, with the four `Q29` checks, copied into the PR, and a unit test that fails on any question without a row passing all four.
- **Why:** The simplest data format that satisfies the constitution (*Content is data*) and lets 4+ and 5+ follow without code changes; the content data schema is the tech lead's to approve (constitution, *Review rules*). No category screen exists yet to run `TC-01-02` on, and the age-suitability check needs a durable, testable record beside the PR.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-47] 3+ questions stay open, each checked for a near miss recorded per question

- **Date:** 2026-10-14
- **Decided by:** product owner (delivery loop, confirmed 2026-10-14)
- **Source:** implementation (`US-01-02`)
- **Affects:** `US-01-02`, `US-01-03`, `US-01-04`, `MOD-01-F06`, `MOD-01-F14`, `MOD-03-U02`, `DSC-04-04`, `SRC-01-17`, `SRC-01-18`
- **Decision:** Option c — Back to open questions for 3+, under a stricter near-miss rule. No 3+ question names answer options (no either/or): every one is an open question with one answer. Each is attacked, in Polish and in English, for any other answer a child or a parent reading aloud could give that is also correct — another thing that fits the question, a near miss (a neck warmer for a scarf, a hood for an umbrella, fire for candles); where one exists the question is reworded (a distinguishing detail, a more specific question, or another fact) until none does. A synonym naming the same thing (a puppy for a dog) is the same answer. The record `docs/delivery/content-checks/US-01-02-3-plus.md` names, for every question, the near misses checked and why each is ruled out; `AC-01-02-4` fails on a row without them and on any 3+ question that offers options. The 4+ and 5+ decks (`US-01-03`, `US-01-04`) are open questions under the same rule. The content data format (`DEC-46`) does not change.
- **Why:** The product owner's answer to the question put in the delivery loop. It reads the `must` `MOD-03-U02` ("no buttons, choices or score on it"), `DSC-04-04` (no answer choices) and the `SRC-01-17` / `SRC-01-18` non-goals (no A/B/C answers, not a classic quiz) as written, and keeps the questions worth asking: an either/or against an absurd option is a 50% guess. The near misses three review rounds found are handled question by question in the record instead. Critical: it settles how a `must` requirement is read, so it was the product owner's to decide.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-48] Category screen: order by age; 4+ and 5+ on screen, and the full TC-02-01/02 check, deferred to US-01-03 and US-01-04

- **Date:** 2026-10-14
- **Decided by:** product owner (delivery loop, confirmed 2026-10-15)
- **Source:** implementation (`US-02-01`, code review round 1, finding B1)
- **Affects:** `US-02-01`, `US-01-03`, `US-01-04`, `MOD-02-F02`, `MOD-02-F03`, `MOD-02-U03`, `TC-02-01`, `TC-02-02`, `src/content/index.ts`, `scripts/test-acceptance.sh`
- **Decision:** Option a — Merge now with 3+ only; full check when 4+ and 5+ land. (1) The category list is built in `src/content` from the registered decks and sorted by the age number its label starts with ("3+" → 3; a label without one last), so the screen shows 3+, 4+, 5+ whatever order the decks are registered in, and a new deck takes its place by age with no change to the screen. (2) The entry shows the deck's `category` label as it is: it is the same in both languages (`MOD-02-U03`), so it needs no i18n string; the screen keeps the app title from the content data above the list. (3) `US-02-01` merges with the 3+ category only, the one deck shipped on `main` today. The executable tests for `TC-02-01` and `TC-02-02` check the categories the shipped content data holds, youngest first, and no other entry — today 3+ alone, as the story's edge case says — so the `must` `MOD-02-F02` ("lists 3+, 4+ and 5+") and the TCs' "three entries" are proven for 3+ only until `US-01-03` and `US-01-04` ship the 4+ and 5+ decks (the 4+ deck is in PR #8, `feature/US-01-03`, not yet merged). CI runs `TC-02-01` and `TC-02-02` on every PR and expects every shipped deck in age order, so the 4+ and 5+ PRs cannot merge unless their deck shows; the same flows then check all three with no change to the tests.
- **Why:** The simplest order rule that guarantees `MOD-02-F02` without relying on the registration order in `src/content/decks/index.ts`. Criterion 2 lists "the categories found in the content data", and the story's edge case says the screen shows only 3+ while only that deck exists: a flow that demanded 4+ and 5+ now would fail on content not yet shipped, not on the screen. Critical: point 3 defers part of a `must` requirement and the full check of two reviewed test cases, so it was put to the product owner, who took option a.
- **Scope effect:** reduction (deferred) — the 4+ and 5+ part of `MOD-02-F02` and the full `TC-02-01` / `TC-02-02` check move to `US-01-03` / `US-01-04`
- **Resolves:** —
- **Status:** accepted

## [DEC-49] What makes the 4+ deck harder than 3+

- **Date:** 2026-10-15
- **Decided by:** developer (delivery loop)
- **Source:** implementation (`US-01-03`)
- **Affects:** `US-01-03`, `MOD-01-F06`, `MOD-01-F14`
- **Decision:** The 4+ deck asks what a 4-year-old learns beyond the 3+ basics: counting to ten and adding within ten, the days of the week, flat shapes, mixing two paint colours, opposites, animal babies, how animals and plants live (a caterpillar becoming a butterfly, the roots, winter sleep), what happens to water and ice, and the people who help us (the dentist, the baker, the postman). It keeps the 3+ form — short open questions, one answer, words a 4-year-old meets at home, in picture books and at preschool — and the `DEC-47` near-miss rule; each question's near misses are in `docs/delivery/content-checks/US-01-03-4-plus.md`.
- **Why:** The story asks for "a little harder than 3+, still suited to the youngest child of the category" (`MOD-01-F06`) without saying how; these are the topics a 4-year-old's preschool year covers, one step past the 3+ deck's body parts, animal sounds and everyday objects. The product owner reviews all content before release (`DEC-26`).
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-50] A 4+ question repeats a 3+ one when it has its text or its answer

- **Date:** 2026-10-15
- **Decided by:** developer (delivery loop)
- **Source:** implementation (`US-01-03`)
- **Affects:** `US-01-03`, `MOD-01-F02`
- **Decision:** `US-01-03#6` ("none of the 4+ questions repeats a 3+ question") is read as: no 4+ question has the text of a 3+ question in either language, ignoring case and punctuation, and no 4+ question asks for the answer of a 3+ question, so none is a 3+ question in other words. `AC-01-03-6` checks both; the content checks (`DEC-46`) already refuse a repeated text across decks. A 4+ question may touch a subject a 3+ question touched when it asks for something else (3+ asks what ice is made of, 4+ what happens to it when it gets warm).
- **Why:** A repeat of the text alone would let the same question back in reworded, which is what a child would notice; the answer is the simplest thing that shows it. Subjects are not exclusive to one category: a child meets the same things again, a level up.
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted

## [DEC-51] What makes the 5+ deck harder than 4+, and what counts as a repeat

- **Date:** 2026-10-15
- **Decided by:** developer (delivery loop)
- **Source:** implementation (`US-01-04`)
- **Affects:** `US-01-04`, `MOD-01-F02`, `MOD-01-F06`, `MOD-01-F14`
- **Decision:** The 5+ deck asks what a 5-year-old learns in the year before school, one step past 4+: numbers past ten and adding within twenty, the months, hours and minutes, the weeks, reading a clock at the full hour, the day before yesterday and family words; the planets, the skeleton and the lungs, the compass, the atlas and the sides of the world, echo, gravity and volcanoes; record-holding and unusual animals (the cheetah, the chameleon, the ostrich, the beaver), what animals eat and how plants grow; Poland's capital, flag and coat of arms, and the places and people of a town (the library, the airport, the lighthouse, the conductor). It keeps the form of the younger decks — short open questions, one answer — and the `DEC-47` near-miss rule; each question's near misses are in `docs/delivery/content-checks/US-01-04-5-plus.md`. `US-01-04#6` is read as `DEC-50` reads `US-01-03#6`, against both younger decks: no 5+ question has the text of a 3+ or 4+ question in either language, ignoring case and punctuation, and none asks for the answer of a 3+ or 4+ question; `AC-01-04-6` checks both.
- **Why:** The story asks for the hardest of the three decks, still suited to the youngest child of the category (`MOD-01-F06`), without saying how; these are the topics of the Polish preschool's last year (zerówka) and the picture books of that age, past what 4+ asks (`DEC-49`). The repeat rule is the one already accepted for 4+, so the three decks are held to one rule. The product owner reviews all content before release (`DEC-26`).
- **Scope effect:** within scope
- **Resolves:** —
- **Status:** accepted
