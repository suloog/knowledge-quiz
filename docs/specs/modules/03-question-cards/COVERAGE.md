# Coverage — [MOD-03] Question cards

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
| `MOD-03-F01` | `US-03-01` |
| `MOD-03-F02` | `US-03-01` |
| `MOD-03-F03` | `US-03-01` |
| `MOD-03-F04` | `US-03-01` |
| `MOD-03-F05` | `US-03-01` |
| `MOD-03-F06` | `US-03-02` |
| `MOD-03-F07` | `US-03-02` |
| `MOD-03-F08` | `US-03-02` |
| `MOD-03-F09` | `US-03-03` |
| `MOD-03-F10` | `US-03-03` |
| `MOD-03-F11` | `US-03-03` |
| `MOD-03-F12` | `US-03-04` |
| `MOD-03-F13` | `US-03-04` |
| `MOD-03-F14` | `US-03-01` |

### UI/UX requirements

| Requirement | Covered by |
| ----------- | ---------- |
| `MOD-03-U01` | `US-03-01` |
| `MOD-03-U02` | `US-03-01` |
| `MOD-03-U03` | `US-03-05` |
| `MOD-03-U04` | `US-03-01` |
| `MOD-03-U05` | `US-03-01` |

<!-- og:part tests -->

## Part 2 — Acceptance criteria → tests

### User story acceptance criteria

<One row per criterion of every story in the module, in story order. `#n` is the criterion's
position in the story file — counted from 1, with a Given/When/Then scenario counting as one.>

| Criterion | Text (short) | Covered by | Automation | Note |
| --------- | ------------ | ---------- | ---------- | ---- |
| `US-03-01#1` | Card appears | `TC-03-01` | auto | — |
| `US-03-01#2` | Reveal | `TC-03-02` | auto | — |
| `US-03-01#3` | Next | `TC-03-03` | auto | — |
| `US-03-01#4` | Double touch | `TC-03-04` | auto | — |
| `US-03-01#5` | Cards are shown in the language chosen on the category sc… | `TC-03-05` | auto | — |
| `US-03-01#6` | On the Mudita Kompakt the answer appears within 1 s of a… | `TC-03-06` | manual-only | Kompakt only — out of the executor's reach |
| `US-03-02#1` | No repeats | `TC-03-07` | auto | — |
| `US-03-02#2` | Closed before the reveal | `TC-03-08` | auto | — |
| `US-03-02#3` | Closed after the reveal | `TC-03-09` | auto | — |
| `US-03-02#4` | Separate decks | `TC-03-10` | auto | — |
| `US-03-03#1` | End card | `TC-03-12` | auto | — |
| `US-03-03#2` | Again | `TC-03-13` | auto | — |
| `US-03-03#3` | Categories | `TC-03-14` | auto | — |
| `US-03-04#1` | From any card, the Android back action shows the category… | `TC-03-16` | auto | — |
| `US-03-04#2` | Every card shows a small control, outside the card's touc… | `TC-03-17` | auto | — |
| `US-03-04#3` | Touching the control never reveals an answer or moves to… | `TC-03-18` | auto | — |
| `US-03-04#4` | After returning, opening the same category resumes where… | `TC-03-19` | auto | — |
| `US-03-05#1` | Only questions where a picture helps carry an illustratio… | `TC-03-20` | auto | — |
| `US-03-05#2` | Every illustration is pure black and white; a test fails… | — | unit / review | unit test suite — illustration pixel check (pure black and white) |
| `US-03-05#3` | An illustration is shown with its question as soon as the… | `TC-03-21` | auto | — |
| `US-03-05#4` | The same question shows the same illustration in both lan… | `TC-03-22` | auto | — |
| `US-03-05#5` | On the Mudita Kompakt every illustration is legible (chec… | `TC-03-23` | manual-only | Kompakt only — out of the executor's reach |

### Module constraints and edge cases

<Items from the "Constraints and edge cases" section of REQUIREMENTS.md. This is where `type: edge`
and `type: negative` tests come from — the module states them once, the tests prove them one by one.>

| Constraint | Covered by | Note |
| ---------- | ---------- | ---- |
| App closed on an unrevealed card → same card again | `TC-03-08` | — |
| App closed on a revealed card → next unseen card | `TC-03-09` | — |
| Return control never taken as reveal or next | `TC-03-18` | — |
| New app version changes a saved deck (Q37) | — | unit test suite — deck logic |
| Saved deck unreadable → fresh shuffle | `TC-03-11` | — |
| Each step is a single screen change | `TC-03-06` | manual — refresh behaviour seen on the Kompakt |

### Non-functional requirements under test

<Only the `NFR-nn` and `MOD-NN-NFR-nn` that can be checked against this module. The "How" column
says what the evidence is measured with — response time from the network log, query count,
contrast, touch target size. An NFR with no measurable evidence is `manual-only`, not green.>

| Requirement | Covered by | How | Note |
| ----------- | ---------- | --- | ---- |
| `NFR-01` | `TC-03-06` | recording on the Kompakt, 5 reveals | manual-only |
| `NFR-03` | `TC-03-06` | observed on the Kompakt | manual-only |
| `NFR-04` | `TC-03-06` | refresh behaviour observed on the Kompakt | manual-only |
