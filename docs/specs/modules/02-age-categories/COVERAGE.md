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
| `US-02-01#1` | Every launch opens on the category screen. | `TC-02-01` | auto | — |
| `US-02-01#2` | The screen lists the categories found in the content data… | `TC-02-01` | auto | — |
| `US-02-01#3` | A category added to the content data appears on the scree… | — | unit / review | unit test suite — a fixture category appears without screen change |
| `US-02-01#4` | Every element on screen is pure black or pure white; a te… | — | unit / review | unit test suite — colour check (#000/#FFF only); on device `TC-02-04` |
| `US-02-01#5` | Nothing animates and no transition is animated; a test fa… | — | unit / review | unit test suite — animation check; on device `TC-02-04` |
| `US-02-01#6` | Each category entry spans the full width of the screen. | `TC-02-02` | auto | — |
| `US-02-01#7` | On the Mudita Kompakt the screen appears within 3 s of la… | `TC-02-03` | manual-only | Kompakt only — out of the executor's reach |
| `US-02-02#1` | First launch | `TC-02-05` | auto | — |
| `US-02-02#2` | After use | `TC-02-06` | auto | — |
| `US-02-02#3` | After a restart | `TC-02-07` | auto | — |
| `US-02-02#4` | Finished deck | `TC-02-08` | auto | — |
| `US-02-03#1` | Polish device | `TC-02-10` | auto | — |
| `US-02-03#2` | Other device language | `TC-02-11` | auto | — |
| `US-02-03#3` | Switch and restart | `TC-02-12` | auto | — |
| `US-02-03#4` | Decks kept | `TC-02-13` | auto | — |

### Module constraints and edge cases

<Items from the "Constraints and edge cases" section of REQUIREMENTS.md. This is where `type: edge`
and `type: negative` tests come from — the module states them once, the tests prove them one by one.>

| Constraint | Covered by | Note |
| ---------- | ---------- | ---- |
| Saved data unreadable → as on first launch | `TC-02-09` | — |
| Device language other than PL/EN → English | `TC-02-11` | — |
| Android back on the category screen closes the app (Q34) | `TC-02-14` | — |
| Choosing a language redraws the screen once | `TC-02-04` | manual — refresh behaviour seen on the Kompakt |

### Non-functional requirements under test

<Only the `NFR-nn` and `MOD-NN-NFR-nn` that can be checked against this module. The "How" column
says what the evidence is measured with — response time from the network log, query count,
contrast, touch target size. An NFR with no measurable evidence is `manual-only`, not green.>

| Requirement | Covered by | How | Note |
| ----------- | ---------- | --- | ---- |
| `NFR-02` | `TC-02-03` | stopwatch / recording on the Kompakt | manual-only |
| `NFR-03` | `TC-02-04` | observed on the Kompakt; unit animation check | manual-only |
| `NFR-07` | `TC-02-04` | observed on the Kompakt; unit colour check | manual-only |
| `NFR-08` | `TC-02-02` | entry width vs screen width; finger comfort judged on the Kompakt | partly manual |
