# Coverage — [MOD-01] Question content

> The maps the other way round from a story's **Covers** field and a test case's **Verifies** field.
> They stop a requirement quietly falling out when the module is sliced, and a criterion quietly
> falling out when the tests are written.
>
> Fill it in the same run that writes the story or the test case. A row with an empty "Covered by"
> is a requirement not yet sliced or a criterion with no test. The module is **sliced** when part 1
> has no empty row; it is **covered** when every row of part 2 has a test **or** an explicit
> justification in the "Note" column (e.g. "manual verification — email delivery").
>
> Source: `REQUIREMENTS.md`, `stories/`, `tests/` in this directory · Registers: `docs/specs/BACKLOG.md`,
> `docs/specs/TESTPLAN.md`

<!-- og:part stories -->

## Part 1 — Requirements → user stories

### Functional requirements

| Requirement | Covered by |
| ----------- | ---------- |
| `MOD-01-F01` | `US-01-01` |
| `MOD-01-F02` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F03` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F04` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F05` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F06` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F07` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F08` | `US-03-05` |
| `MOD-01-F09` | `US-01-02` |
| `MOD-01-F10` | `US-01-02` |
| `MOD-01-F11` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F12` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F13` | `US-03-05` |
| `MOD-01-F14` | `US-01-02`, `US-01-03`, `US-01-04` |
| `MOD-01-F15` | `US-01-02`, `US-01-03`, `US-01-04` |

<!-- og:part tests -->

## Part 2 — Acceptance criteria → tests

### User story acceptance criteria

<One row per criterion of every story in the module, in story order. `#n` is the criterion's
position in the story file — counted from 1, with a Given/When/Then scenario counting as one.>

| Criterion | Text (short) | Covered by | Automation | Note |
| --------- | ------------ | ---------- | ---------- | ---- |
| `US-01-01#1` | The app is built on the company's mobile app foundation a… | — | unit / review | PR review — platform versions recorded in the upgrade PR |
| `US-01-01#2` | The app installs and starts on an Android 12 emulator and… | `TC-01-01`, `TC-01-03` | auto | — |
| `US-01-01#3` | The installed app asks for no network permission. | — | unit / review | unit test suite — manifest check (no network permission) |
| `US-01-01#4` | The app starts and runs with the device's network switche… | `TC-01-02` | auto | — |
| `US-01-01#5` | A signed release APK can be built; the signing key is kep… | — | unit / review | release build — signed APK built by Maciej; key outside the repo (`DEC-09`) |
| `US-01-02#1` | The 3+ category holds exactly 50 questions, each with exa… | — | unit / review | unit test suite — content checks (count, one answer per language) |
| `US-01-02#2` | Every question is at most 100 characters and every answer… | — | unit / review | unit test suite — content checks (length limits) |
| `US-01-02#3` | Each of the four kinds of content (educational, popular-s… | — | unit / review | unit test suite — content checks (kinds, at least 5 each) |
| `US-01-02#4` | The pull request records the age-suitability check of eve… | — | unit / review | PR review — age-suitability check recorded in the PR (Q29) |
| `US-01-02#5` | All automatic content checks pass; breaking any one of th… | — | unit / review | unit test suite — a broken check fails the suite |
| `US-01-02#6` | Adding a question or a new age category requires a change… | — | unit / review | unit test suite — a fixture question/category added as data only |
| `US-01-02#7` | All content ships inside the app; nothing is downloaded. | `TC-01-02` | auto | — |
| `US-01-03#1` | The 4+ category holds exactly 50 questions, each with exa… | — | unit / review | unit test suite — content checks (count, one answer per language) |
| `US-01-03#2` | Every question is at most 100 characters and every answer… | — | unit / review | unit test suite — content checks (length limits) |
| `US-01-03#3` | Each of the four kinds of content (educational, popular-s… | — | unit / review | unit test suite — content checks (kinds, at least 5 each) |
| `US-01-03#4` | The pull request records the age-suitability check of eve… | — | unit / review | PR review — age-suitability check recorded in the PR (Q29) |
| `US-01-03#5` | All automatic content checks pass; breaking any one of th… | — | unit / review | unit test suite — a broken check fails the suite |
| `US-01-03#6` | None of the 4+ questions repeats a 3+ question. | — | unit / review | unit test suite — no question repeated across decks |
| `US-01-04#1` | The 5+ category holds exactly 50 questions, each with exa… | — | unit / review | unit test suite — content checks (count, one answer per language) |
| `US-01-04#2` | Every question is at most 100 characters and every answer… | — | unit / review | unit test suite — content checks (length limits) |
| `US-01-04#3` | Each of the four kinds of content (educational, popular-s… | — | unit / review | unit test suite — content checks (kinds, at least 5 each) |
| `US-01-04#4` | The pull request records the age-suitability check of eve… | — | unit / review | PR review — age-suitability check recorded in the PR (Q29) |
| `US-01-04#5` | All automatic content checks pass; breaking any one of th… | — | unit / review | unit test suite — a broken check fails the suite |
| `US-01-04#6` | None of the 5+ questions repeats a 3+ or 4+ question. | — | unit / review | unit test suite — no question repeated across decks |

### Module constraints and edge cases

<Items from the "Constraints and edge cases" section of REQUIREMENTS.md. This is where `type: edge`
and `type: negative` tests come from — the module states them once, the tests prove them one by one.>

| Constraint | Covered by | Note |
| ---------- | ---------- | ---- |
| Content failing any check is never released | — | unit test suite — content checks |
| A category with fewer than 50 questions fails the suite | — | unit test suite — content checks |

### Non-functional requirements under test

<Only the `NFR-nn` and `MOD-NN-NFR-nn` that can be checked against this module. The "How" column
says what the evidence is measured with — response time from the network log, query count,
contrast, touch target size. An NFR with no measurable evidence is `manual-only`, not green.>

| Requirement | Covered by | How | Note |
| ----------- | ---------- | --- | ---- |
| `NFR-10` | `TC-01-01` | install and open on an API 31 emulator | — |
| `NFR-11` | `TC-01-03` | manual check on the Kompakt | manual-only |
| `NFR-12` | `TC-01-02` | app used with the network off | — |
| `NFR-05` | — | unit test suite — manifest check | no executor test |
