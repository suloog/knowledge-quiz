# Discovery — topic map

> What we understood from the sources, topic by topic, and what we agree on before the first
> requirement is written. `sources/` says what the client wrote; this directory says how we read
> it; `modules/` says what we will build. The topic file `discovery/NN-<topic>.md` is the source of
> truth; this file is its **mirror** and changes in the same run.
>
> **Business topics** (`kind: business`) are the future modules — `/og:modules` turns them into the
> split. **Cross-cutting topics** (`kind: cross-cutting`: roles and access, technology and
> integrations, non-functional requirements) feed PROJECT.md, NFR.md and the constitution; they are
> never a module. By convention they come first in the numbering.
>
> **Status:** `open` — not discussed · `discussed` — discussed with the analyst, waiting on the
> client · `settled` — no `[W]` question in the topic is open.
> The client questions from every topic, in a form ready to send: `AGENDA.md`.

## Sessions

| Date | Who | Topics | Outcome |
| ---- | --- | ------ | ------- |
| 2026-10-14 | analyst + agent | `DSC-01` | 18 findings, 9 questions resolved, `DEC-01`…`DEC-09`, notes `SRC-03` |
| 2026-10-14 | analyst + agent | `DSC-02` | 18 findings, 6 questions resolved, 1 [A] open, `DEC-10`…`DEC-18`, tech checklist 24/24 |
| 2026-10-14 | analyst + agent | `DSC-03` | 7 findings, 3 questions resolved, 1 [A] added, `DEC-19`…`DEC-21` |
| 2026-10-14 | analyst + agent | `DSC-04` | 10 findings, 4 questions resolved, `DEC-22`…`DEC-25` |
| 2026-10-14 | analyst + agent | `DSC-05` | 12 findings, 3 questions resolved, 1 [A] added, `DEC-26`…`DEC-30` (3 extensions) |

## Topics

| Topic | Title | Kind | Sources | Findings | Open questions | Status | Module |
| ----- | ----- | ---- | ------- | -------- | -------------- | ------ | ------ |
| `DSC-01` | Users, technology and data | cross-cutting | `SRC-01`, `SRC-02`, `SRC-03` | 18 | 0 [W] / 0 [A] | settled | — |
| `DSC-02` | E-ink UI and non-functional requirements | cross-cutting | `SRC-01`, `SRC-02`, `SRC-03` | 18 | 0 [W] / 1 [A] | settled | — |
| `DSC-03` | Age categories | business | `SRC-01`, `SRC-03` | 7 | 0 [W] / 1 [A] | settled | — |
| `DSC-04` | Question cards | business | `SRC-01`, `SRC-03` | 10 | 0 [W] / 0 [A] | settled | — |
| `DSC-05` | Question content | business | `SRC-01`, `SRC-03` | 12 | 0 [W] / 1 [A] | settled | — |

## Source items with no topic

<`SRC-NN-nn` items that belong to no topic. The list must be empty before discovery closes — a
formal item with no topic is scope that will fall out of the requirements. The sources' "Noted but
not scope" sections do not count here.>

— none

## Closing

<Filled by `/og:discovery` in close mode. Condition: every business topic discussed, every `[W]`
question answered or deferred by an explicit decision, the list of items with no topic empty.>

- Closed: YYYY-MM-DD, approved by: <analyst> · `PROJECT.md` `status: approved` ·
  `constitution.md` `status: draft` → next step `/og:modules`
