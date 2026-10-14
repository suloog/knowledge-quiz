---
id: US-00-01 # the foundation story — module 00 is the delivery loop's own; analysts' modules count from 01
module: MOD-00
covers: [] # no client requirement: this is the ground every story that delivers one stands on
ticket:
status: done # draft | ready | in-progress | review | done | blocked
priority: must
depends_on: []
---

<!-- Copied by /og:deliver to docs/specs/modules/00-foundation/stories/ when the owner asks for the
     foundation story (an empty project, no CI yet). Content in the project language; headings fixed.
     The setup may sharpen the wording to the stack PROJECT.md and the constitution name; the ID, the
     four criteria and their order stay — the test cases beside it cite them by number. -->

# As a developer, I can start the whole stack with one command and have CI run the acceptance tests on every pull request, so that every later story is built and proven on the same ground

|  |  |
| --- | --- |
| **Module** | `[MOD-00]` Foundation — the delivery loop's own module: no `REQUIREMENTS.md`, no row in `BACKLOG.md` |
| **Covers** | — *(no client requirement; what every other story needs before it can be built and verified)* |
| **Priority** | must |
| **Status** | done |
| **Depends on** | — |
| **YouTrack** | — |
| **Open questions** | — |

## Description

The project has no application to start, no CI and no test that could prove a story works. This
story builds that ground and nothing on top of it: one command that brings the whole stack up, a
CI workflow that runs the acceptance tests on every pull request and publishes their results, one
acceptance test that goes through every layer, and the quality gates. No feature of the product
is in it — the first of those is the next story.

## Acceptance criteria

- [ ] One documented command starts the whole stack locally — every service the application needs,
  from a fresh clone — and the README names it.
- [ ] A GitHub Actions workflow runs on every pull request, runs the acceptance tests through one
  command that lives in the repository, and uploads their JUnit reports as the artifact
  `og-test-results` whether the tests passed or failed.
- [ ] One path through every layer of the stack has a passing acceptance test whose name carries
  its test case id.
- [ ] The repository's commit and push gates are in place: the gate detection lists a format check,
  a linter, a type check where the language has one and the unit tests, and every command it lists
  passes on a clean checkout.

## Edge cases

- an acceptance test fails → the workflow run is red and the artifact is still uploaded;
- the tests wrote no JUnit report → the upload step fails; an empty artifact is never published;
- the start command is run on a machine that has none of the stack's services → it brings them up
  itself or says what is missing — it never leaves half a stack running silently.

## Out of scope / what not to worry about

- Any feature of the product, authentication and accounts included — the stories that follow.
- Deployment and any environment other than the developer's machine and CI.
- Branch protection and required status checks on the base — the owner sets them on GitHub.
- More tests than the one path: each later story brings its own.

## Technical notes

- **This project's stack:** one Expo / React Native app for Android, started from `ordergroup/boilerplate-react-native-expo` upgraded to the latest versions (`DEC-06`), with no backend (`SRC-01-20`). "The whole stack" is that app on an Android 12 (API 31) emulator; the start command builds and launches it there. The CI workflow boots an Android 12 emulator, runs the Maestro acceptance flows and the unit tests through the repository's one test command, and uploads their JUnit reports as `og-test-results` (`DEC-37`).
- **The workflow's contract** is the og plugin's `skills/deliver/references/ci-evidence.md` — what
  a merge reads once the run takes its test results from CI: the workflow's run on the pull
  request's head, the artifact `og-test-results`, the JUnit reports in it, and a test matched to
  its test case by the id in its name (`TC-00-03 …`, `test_tc_00_03_…`). Upload with
  `if: always()` and `if-no-files-found: error`.
- **One command for the acceptance tests**, kept in the repository — a script, a Make target, a
  package script — and the workflow calls it and lists no test itself. A later story then adds its
  tests without touching `.github/**`; a change there sends that story's pull request to a person.
- The workflow starts the stack with the command of criterion 1, so CI exercises what the README
  documents.
- **Gates.** The commit and push gates are detected (`hooks/scripts/detect-stack.sh commit|push`
  of the og plugin) from what the stack itself declares: a `pre-push` target in the `Makefile`;
  ruff, mypy and pytest in `pyproject.toml`; the `format:check`, `lint`, `tsc` or `typecheck` and
  `test` scripts in `package.json`. Declare them there. `.claude/og-gates.json` is the override for
  a layout the detection cannot read (a monorepo): a file people edit, and one the commit hook
  reads from the base branch while a delivery loop is live — on this story's branch it changes
  nothing until it is merged.
- This story's pull request adds `.github/**`. The delivery loop never merges such a change: the
  owner reviews it and merges it on GitHub, then switches the run's test results to CI
  (`/og:deliver` → Change settings).
- A choice of stack the constitution does not settle is a decision (`DEC-nn`), not a default.
- The story has no row in `BACKLOG.md` and no `COVERAGE.md`: its status changes in this file only.
