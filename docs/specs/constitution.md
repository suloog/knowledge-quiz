---
project: knowledge-quiz
status: draft # draft (written at discovery close) | active (confirmed by the tech lead at /og:modules)
---

# Engineering constitution

<Per-project engineering law. Every module, user story, and PR must satisfy this document. Keep it short; link to company/repo standards instead of restating them.>

## Stack

- Language/framework versions: TypeScript, React Native and Expo at the latest stable versions at project start (`DEC-06`); exact versions pinned by the M1 upgrade
- Package manager: as in the boilerplate
- Boilerplate/base: `ordergroup/boilerplate-react-native-expo`, upgraded to the latest RN/Expo/packages as the first piece of work (`DEC-06`)
- Target: Android 12 (API 31) and newer; Mudita Kompakt is the only reference device (`DEC-10`, `DEC-16`)
- Component library: <tech lead's choice, measured against SRC-01 §5 and Mudita Mindful Design (`DEC-07`) — to confirm at /og:modules>
- No backend, no network access; content is local data in the repository (`SRC-01-20`, `DEC-04`)

## Architecture principles

<3–7 rules specific to this project — for the tech lead to confirm at /og:modules.>

- …

## Quality bar

- Lint/format/type-check/tests must be green before every push (enforced by the og gate hook).
- Test coverage threshold: <tech lead, at /og:modules>
- Testing approach: <tech lead, at /og:modules>
- Required test levels: unit and e2e for every story, run by the delivery loop on an Android emulator; manual acceptance by the product owner on a real Mudita Kompakt; no load testing (`TQ16`, `DEC-15`, `DEC-18`)

## Definition of done (per user story)

- [ ] Every acceptance criterion in the story spec verified, with evidence
- [ ] Every requirement in the story's `Covers` field actually delivered
- [ ] Tests added or updated for the behaviour the criteria describe
- [ ] Gates green (`/og:pre-push`)
- [ ] PR created with the standard template, linked to story spec + ticket
- [ ] Story spec `status` updated, and its row in `docs/specs/BACKLOG.md` with it

## Review rules

- Every PR reviewed by a human; agent review (code-reviewer + spec-compliance-reviewer) runs first.
- <Who must approve — tech lead, at /og:modules; in the delivery loop per its policies>

## Security & compliance

- No personal data is processed; no regulation-specific work (`TQ11`, `TQ12`, `DEC-14`).
- No encryption at rest needed — only the last-used category, the language and deck positions are stored on the device (`TQ01`).
- The app makes no network calls: no analytics, no crash reporting (`DEC-04`).
- No hosting; the repository lives in the Order Group GitHub organisation, and Maciej owns repository access and the release signing key — the keystore never enters the repository (`TQ17`, `TQ18`, `DEC-09`).
