---
project: knowledge-quiz
status: active # draft (written at discovery close) | active (confirmed by the tech lead at /og:modules)
---

# Engineering constitution

Per-project engineering law. Every module, user story and PR must satisfy this document.

## Stack

- Language/framework versions: TypeScript, React Native and Expo at the latest stable versions at project start (`DEC-06`); exact versions pinned by the M1 upgrade
- Package manager: as in the boilerplate
- Boilerplate/base: `ordergroup/boilerplate-react-native-expo`, upgraded to the latest RN/Expo/packages as the first piece of work (`DEC-06`)
- Target: Android 12 (API 31) and newer; Mudita Kompakt is the only reference device (`DEC-10`, `DEC-16`)
- Component library: chosen in MOD-01's first story against SRC-01 §5, with Mudita Mindful Design as inspiration (`DEC-07`, `DEC-11`); recorded here when chosen
- Testing: Jest + React Native Testing Library (unit), Maestro (e2e) on an Android emulator (`DEC-37`)
- No backend, no network access; content is local data in the repository (`SRC-01-20`, `DEC-04`)

## Architecture principles

- **Content is data.** Categories, questions, answers and illustrations live in versioned data files in the repository, validated by a schema test; screens never hard-code content.
- **No network.** No HTTP or analytics libraries; the Android `INTERNET` permission is removed from the manifest.
- **E-ink rendering.** Colours only from theme tokens (#000, #FFF); animations and navigation transitions disabled globally; a test or lint check forbids any other colour.
- **One persistence module** holds the last category, each category's deck order and position, and the language; the app starts cleanly when storage is empty or corrupt.
- **i18n everywhere.** Every user-facing string goes through i18n (pl, en) — no literal strings in components; content carries both languages per question.
- **Content quality is tested.** Every question has exactly one answer in both languages and stays within length limits; every illustration file is pure 1-bit black and white — enforced by tests, so the delivery loop checks them.

## Quality bar

- Lint/format/type-check/tests must be green before every push (enforced by the og gate hook).
- Test coverage threshold: 80% line coverage on changed code (`DEC-37`)
- Testing approach: unit-first; no TDD mandate
- Required test levels: unit (Jest + RNTL) and e2e (Maestro) for every story, run by the delivery loop on an Android emulator; manual acceptance by the product owner on a real Mudita Kompakt; no load testing (`TQ16`, `DEC-15`, `DEC-18`)

## Definition of done (per user story)

- [ ] Every acceptance criterion in the story spec verified, with evidence
- [ ] Every requirement in the story's `Covers` field actually delivered
- [ ] Tests added or updated for the behaviour the criteria describe
- [ ] Gates green (`/og:pre-push`)
- [ ] PR created with the standard template, linked to story spec + ticket
- [ ] Story spec `status` updated, and its row in `docs/specs/BACKLOG.md` with it

## Review rules

- Every PR reviewed by a human; agent review (code-reviewer + spec-compliance-reviewer) runs first.
- In the delivery loop the code-reviewer and spec-compliance-reviewer agents run on every PR, then human review per the `/og:deliver` policies.
- Changes to the content data schema are approved by Maciej (tech lead).

## Security & compliance

- No personal data is processed; no regulation-specific work (`TQ11`, `TQ12`, `DEC-14`).
- No encryption at rest needed — only the last-used category, the language and deck positions are stored on the device (`TQ01`).
- The app makes no network calls: no analytics, no crash reporting (`DEC-04`).
- No hosting; the repository lives in the Order Group GitHub organisation, and Maciej owns repository access and the release signing key — the keystore never enters the repository (`TQ17`, `TQ18`, `DEC-09`).
