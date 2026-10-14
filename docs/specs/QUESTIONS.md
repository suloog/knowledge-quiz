# Open questions — for the client

> Every assumption taken while writing the sources, requirements and stories, and every point
> deliberately left to the client, collected in one place — so the list can be sent ahead of a
> workshop instead of being reconstructed from twelve files. Written so the client can answer it
> as it stands: business language, one question per line, our proposed default where we have one.
>
> **[A]** an assumption with a default already written into the artifacts — confirm or correct it.
> **[W]** a wider question with no assumption taken — it needs a ruling before anything depending
> on it can be built.
>
> Each question names the artifact it affects and, once sent, when and how it was asked
> (*asked: YYYY-MM-DD, e-mail*). A story that depends on an unanswered question names it under
> "Open questions" and carries `status: blocked`. When a question is answered, `/og:decide`
> records the ruling as a `DEC-nn` and moves the question to **Resolved**. Numbers are never
> reused.

## General

<Questions that predate the module split — about the sources, actors, scope areas, the project
as a whole.>


## Resolved

<One line per answered question — the ruling and the decision that records it. The reasoning
lives in DECISIONS.md, not here.>

- **Q03** Who operates the device — only the parent, or the child as well? — parent or child may operate the device, 2026-10-14 (`DEC-02`)
- **Q14** The out-of-scope list says "among others" — is everything not described in §1–5 out of the MVP? — only SRC-01 §1–5 with SRC-02 is in; everything else is out, 2026-10-14 (`DEC-03`)
- **Q15** Are analytics or crash reporting allowed in this children's app, and are there privacy constraints to meet (GDPR, app-store family policies)? — no analytics, no crash reporting, 2026-10-14 (`DEC-04`)
- **Q16** Through which channel is the app distributed — Google Play, a Mudita store, direct installation? — APK sideload, no store, 2026-10-14 (`DEC-05`)
- **Q18** What does the delivery include — UI design, testing on the target device, post-release support — and how will the MVP be accepted? — code with automated tests, no UI design step or support; accepted on a real E-ink device, 2026-10-14 (`DEC-08`)
- **Q19** What are the milestones and the target date for the MVP? — no deadline, 2026-10-14 (`DEC-01`)
- **Q20** Expo is preferred and the app is to be based on the company boilerplate — is the boilerplate Expo-compatible, and which wins if not? — Expo, from the company boilerplate (already Expo-based), 2026-10-14 (`DEC-06`)
- **Q23** Is bringing the company boilerplate up to the latest React Native / Expo / package versions part of this project's scope and estimate? — yes — upgrade to latest is the first piece of work, in scope, 2026-10-14 (`DEC-06`)
- **Q24** What counts as "meeting the E-ink criteria" for the component library — SRC-01 §5 plus Mindful Design, or other criteria — and who approves the choice? — tech lead chooses against SRC-01 §5 + Mindful Design, confirmed in the constitution, 2026-10-14 (`DEC-07`)
- **Q12** Which devices exactly is the app for (Mudita model(s)), with which screen sizes, orientation and minimum Android version? — Mudita Kompakt only, 2026-10-14 (`DEC-10`)
- **Q13** When will the Mudita E-ink UI guidelines be provided, and where they differ from §5, which prevails? — no export needed — Mindful Design is inspiration only; SRC-01 §5 binds, 2026-10-14 (`DEC-11`)
- **Q17** Are there accessibility expectations beyond E-ink readability (system font size, screen reader)? — none in the MVP — pure black and white, no font scaling, no screen reader, 2026-10-14 (`DEC-12`)
- **Q21** How closely should the app follow Mudita's MMD — visual look, component set, interaction patterns, or only as loose inspiration? — interaction patterns and visual language, no 1:1 parity, 2026-10-14 (`DEC-11`)
- **Q22** Which version or date of the Mudita Mindful Design guidelines is binding, given the site may change during the project? — none — the guidelines are inspiration, not binding, 2026-10-14 (`DEC-11`)
- **Q25** What is the minimum Android version the app supports? — Android 12 (API 31) and newer, 2026-10-14 (`DEC-16`)
- **Q01** Which age categories ship in v1 — exactly 3+, 4+ and 5+, or a different set? — exactly 3+, 4+ and 5+, 2026-10-14 (`DEC-20`)
- **Q02** Are new categories and questions added only with a new app release, or must the app also accept them some other way? — only with a new app release, 2026-10-14 (`DEC-19`)
- **Q04** With only three categories, how should the last-used one appear — moved to the top, repeated above the list, or highlighted in place? Should it be remembered after the app is closed? — a separate continue entry above a fixed-order list; remembered after the app is closed, 2026-10-14 (`DEC-21`)
- **Q05** In what order are questions shown within a category — fixed, random, or shuffled without repeats? Should the app resume where the family left off? — shuffled once, no repeats, position remembered; continue resumes, 2026-10-14 (`DEC-22`)
- **Q06** What happens when all questions in a category have been shown? — an end card offers to start again (reshuffled) or go back to the categories, 2026-10-14 (`DEC-23`)
- **Q07** Where does the user tap to reveal the answer and to move on — anywhere on the screen, or on specific areas? Does the question stay visible next to the answer? — anywhere on the card; the answer appears below the question, which stays visible, 2026-10-14 (`DEC-24`)
- **Q08** How does the user get back to the category selection from the quiz? — Android back or a small visible control outside the card's tap area, 2026-10-14 (`DEC-25`)
- **Q09** Who writes the questions and checks they suit each age, how many questions per category are needed for the MVP, and in what form will they be delivered? — AI writes and accepts the content in the loop; the owner reviews it after the loop; 50 questions per category; kept as data in the app, 2026-10-14 (`DEC-26`, `DEC-27`)
- **Q10** Are questions and answers text only, or do they include pictures? — optional AI-generated black-and-white illustrations where they help, 2026-10-14 (`DEC-28`)
- **Q11** Which language(s) are the content and the interface in — Polish only? — Polish and English, same questions translated, with an in-app switch, 2026-10-14 (`DEC-29`, `DEC-30`)
- **Q26** How fast must the app respond on the Kompakt? — confirmed — ≤1 s to reveal, ≤3 s to the category screen, 2026-10-14 (`DEC-31`)
- **Q27** What does the category screen show the very first time the app is opened, before any category has been used? — confirmed — no continue entry, only the list, 2026-10-14 (`DEC-32`)
- **Q28** Where is the language switch, and which language does the app start in? — confirmed — switch on the category screen, device language first, choice remembered, 2026-10-14 (`DEC-33`)
