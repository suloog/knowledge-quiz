# Coverage — [MOD-02] Age categories

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
| `MOD-02-F01` | `US-02-01` |
| `MOD-02-F02` | `US-02-01` |
| `MOD-02-F03` | `US-02-01` |
| `MOD-02-F04` | `US-03-01` |
| `MOD-02-F05` | `US-02-02` |
| `MOD-02-F06` | `US-02-02` |
| `MOD-02-F07` | `US-02-02` |
| `MOD-02-F08` | `US-02-02` |
| `MOD-02-F09` | `US-02-02` |
| `MOD-02-F10` | `US-02-03` |
| `MOD-02-F11` | `US-02-03` |
| `MOD-02-F12` | `US-02-03` |
| `MOD-02-F13` | `US-02-03` |

### UI/UX requirements

| Requirement | Covered by |
| ----------- | ---------- |
| `MOD-02-U01` | `US-02-01` |
| `MOD-02-U02` | `US-02-02` |
| `MOD-02-U03` | `US-02-01` |
| `MOD-02-U04` | `US-02-03` |
| `MOD-02-U05` | `US-02-01` |

<!-- og:part tests -->

## Part 2 — Acceptance criteria → tests

### User story acceptance criteria

<One row per criterion of every story in the module, in story order. `#n` is the criterion's
position in the story file — counted from 1, with a Given/When/Then scenario counting as one.>

| Criterion | Text (short) | Covered by | Automation | Note |
| --------- | ------------ | ---------- | ---------- | ---- |

### Module constraints and edge cases

<Items from the "Constraints and edge cases" section of REQUIREMENTS.md. This is where `type: edge`
and `type: negative` tests come from — the module states them once, the tests prove them one by one.>

| Constraint | Covered by | Note |
| ---------- | ---------- | ---- |

### Non-functional requirements under test

<Only the `NFR-nn` and `MOD-NN-NFR-nn` that can be checked against this module. The "How" column
says what the evidence is measured with — response time from the network log, query count,
contrast, touch target size. An NFR with no measurable evidence is `manual-only`, not green.>

| Requirement | Covered by | How | Note |
| ----------- | ---------- | --- | ---- |
