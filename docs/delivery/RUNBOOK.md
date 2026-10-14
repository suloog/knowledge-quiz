<!-- Written to docs/delivery/RUNBOOK.md by /og:deliver. Content in the project language; headings fixed.
     The machine-readable settings are docs/delivery/delivery.json (the snapshot; the loop works from its
     live copy, `og-delivery config`) — this file says the same in words,
     for the owner and for any later session. Change settings with /og:deliver, not by hand. -->

# Delivery runbook — Knowledge Quiz

> The autonomous delivery loop for this repo. It runs as `/loop /og:deliver-next` in a session
> started with `claude --permission-mode auto`, one user story at a time: implementation, tests,
> review, PR, merge. The procedure is the og plugin's (`/og:deliver-next`); this file holds this
> project's settings and the owner's standing authorisations.
>
> Armed: 2026-10-14 by Maciej (Slack: U04AVB19V, GitHub: suloog). The live state — settings, event log,
> implementer results — is in the clone's git directory (`og-delivery where`), outside every
> branch; `og-delivery status` shows it, `og-delivery report` builds the report. When the loop
> ends, the log and the report are committed here as `log.jsonl` and `REPORT.md`.

## Input

Test cases partly missing — 6 stories have acceptance criteria that are proved by the unit test suite or PR review by design (content, colour and animation checks, versions, the age check); for those the loop writes the test itself, as the constitution's unit tests.

## Order

| # | Story | Title | Depends on | Test cases |
| --- | --- | --- | --- | --- |
| 1 | `US-00-01` | As a developer, I can start the whole stack with one command and have CI run the acceptance tests on every pull request, so that every later story is built and proven on the same ground | — | `TC-00-01`, `TC-00-02`, `TC-00-03`, `TC-00-04` |
| 2 | `US-01-01` | As a Parent, I can install the app on the Kompakt and open it, so that we have a dependable app to play on | — | `TC-01-01`, `TC-01-02`, `TC-01-03` |
| 3 | `US-01-02` | As a Parent, I can rely on a full 3+ deck in Polish and English, so that a 3-year-old gets questions at their level | `US-01-01` | `TC-01-02` |
| 4 | `US-02-01` | As a Parent, I can open the app and see the age categories, so that I pick questions meant for my child's age | `US-01-02` | `TC-02-01`, `TC-02-02`, `TC-02-03` |
| 5 | `US-03-01` | As a Child, I can touch a card to see the answer and touch again for the next question, so that we play the quiz | `US-02-01` | `TC-03-01`, `TC-03-02`, `TC-03-03`, `TC-03-04`, `TC-03-05`, `TC-03-06` |
| 6 | `US-03-02` | As a Parent, I can go through a category without repeats and come back where we left off, so that my child never gets the same question twice in a row | `US-03-01` | `TC-03-07`, `TC-03-08`, `TC-03-09`, `TC-03-10` |
| 7 | `US-03-03` | As a Parent, I can see when a deck is finished and start it again or go back, so that the game has a clear end | `US-03-02` | `TC-03-12`, `TC-03-13`, `TC-03-14` |
| 8 | `US-03-04` | As a Parent, I can go back to the categories from any card, so that we can change the age at any time | `US-03-01` | `TC-03-16`, `TC-03-17`, `TC-03-18`, `TC-03-19` |
| 9 | `US-02-02` | As a Parent, I can continue the last-used category straight from the top of the screen, so that we pick up where we stopped | `US-02-01`, `US-03-02`, `US-03-03` | `TC-02-05`, `TC-02-06`, `TC-02-07`, `TC-02-08` |
| 10 | `US-02-03` | As a Parent, I can switch the app between Polish and English, so that we play in our language | `US-02-01`, `US-03-02` | `TC-02-10`, `TC-02-11`, `TC-02-12`, `TC-02-13` |
| 11 | `US-01-03` | As a Parent, I can rely on a full 4+ deck in Polish and English, so that a 4-year-old gets questions at their level | `US-01-02` | — (unit suite) |
| 12 | `US-01-04` | As a Parent, I can rely on a full 5+ deck in Polish and English, so that a 5-year-old gets questions at their level | `US-01-02` | — (unit suite) |
| 13 | `US-03-05` | As a Child, I can see a picture with some questions, so that a question is easier to understand | `US-03-01`, `US-01-02`, `US-01-03`, `US-01-04` | `TC-03-20`, `TC-03-21`, `TC-03-22`, `TC-03-23` |

The order follows `DEC-41`: the playable core (3+ deck, categories, cards) first, the 4+ and 5+ decks and the illustrations last.

The next story is the first in this order that is neither done, failed, skipped nor waiting,
and whose dependencies are met. Stories waiting on the owner never stop the others.

## Settings

| Area | Setting |
| --- | --- |
| Base branch | `main` — PRs target it; story statuses travel in each story's PR; the final report goes straight to it |
| Stories the loop starts | whatever is in the order, stories without a test case for every criterion included (`lenient`) |
| Foundation | `US-00-01` first — nothing else starts until it is merged. Its PR adds the CI workflow, so the owner reviews and merges it on GitHub, then switches the test results to CI with `/og:deliver` → *Change settings* |
| Pilot | pause after the first story until the owner says continue |
| Stop | when the scope is done — and after 3 failed stories |
| A failed story | one more attempt on the retry's model and effort, then skipped with its dependents |
| Decisions | semi-automatic: critical ones wait for the owner; the loop works on other stories meanwhile |
| Code review | standard — code and spec reviewers, up to 3 rounds, blocking findings fixed, the rest listed in the PR |
| Merge | automatic — merged once review is clean and every criterion is evidenced (while test results are `local`, every merge still waits for the owner) |
| Approving a waiting PR | the loop acts as `suloog`, the owner's own account — GitHub lets nobody approve their own PR, so the owner merges a waiting PR on GitHub themselves and the loop picks that up |
| Protected paths | only the built-in signals · size ceiling none |
| Dependents of an unmerged PR | wait |
| Unit tests | as the constitution says — 80% line coverage on changed code, unit-first, plus the content-quality tests |
| End-to-end | each story's test cases (criteria when none) · regression at the end |
| Questions for the owner | an issue on GitHub — answered in a comment as `suloog` (`DEC-nn: <answer>`); the loop runs as that same account, so an answer there is not independently verified |
| Test results a merge relies on | the agents' own runs (`local`) — every merge waits for the owner, until the switch to CI after `US-00-01` |
| Models and effort | Balanced — orchestrator `claude-opus-5-5` · medium · implementer `claude-opus-5-5` · medium · its retry `claude-opus-5-5` · high · code review `claude-sonnet-5-5` · high · spec review `claude-opus-5-5` · high · commit messages and summaries `claude-haiku-5-5`. Provisional: the profiles rest on vendor data as of 2026-10-09, not yet on this team's measurements; the report names the model that really answered for each role |
| Weekly limit | pause at 80% |
| 5-hour limit | ignored |
| Extra credits | not used |
| After a limit pause | resumes by itself; when usage cannot be read, it waits and looks again |
| Environment files | `.env.example` (key names only); no other `.env*` |
| Variables the loop needs | none |
| Reports | Slack thread https://ordergroup.slack.com/archives/C02MEF2FG5A/p1791962854992019 — milestones; the thread carries reports and can only pause or stop the loop (and answer `status`) — answers and other commands go through the loop's session, `og-delivery` in a terminal, or GitHub |
| Backup of the run's state | after every iteration to the branch `og-delivery/state` on `origin` (run `20261014T072840Z`) — a commit on top of the last, never the base, never a PR; a new clone starts from it, and `og-delivery status` says when the last one was |
| Where the loop runs | on the machine it is started on — `og-deliver-run` or `/loop` |

## Critical decisions

What counts as critical (they wait for the owner): deviations from a `must`
requirement or an NFR, scope changes, new dependencies or paid services, irreversible data or
schema changes, authentication / permissions / secrets / personal data, contracts other modules
rely on, refactors beyond the story.

## Authorisations

The owner's standing consent, in plain words — what the loop may do without asking:

- Merge PRs into `main` with squash when review is clean and every criterion is evidenced, except critical ones — automatic merging chosen by the owner on 2026-10-14.
- **Override of two blocking preflight findings**, the owner's choice on 2026-10-14: "Auto now, fix access before CI switch". The loop runs as `suloog` (ADMIN) and `main` has no ruleset or protection. Accepted for now because every merge waits for the owner while test results are `local`; before switching the evidence to CI the owner adds a token with Contents and Pull requests only and a ruleset on `main` (og plugin, `skills/deliver/references/github-protection.md`).
- Commit `chore(delivery)` log, status and report updates straight to `main`.
- Decide non-critical implementation questions itself and record them as DEC entries.
- The owner confirmed on 2026-10-14 that the shell the loop is started from holds no production credentials.

## Steering

Write in the loop's session — or in the Slack thread, as far as the *Reports* row lets the thread
steer (this thread takes only `pause`, `stop` and `status`): `pause` · `continue` · `stop` · `status` ·
`skip US-xx-yy` · `retry US-xx-yy` (`… fresh` for a new attempt on a new branch) ·
`DEC-nn: <answer>` (in the run's GitHub issue, the session or a terminal) · merge a waiting PR on GitHub · `fix #n: <what>` · `take over` / `fresh` / `skip US-xx-yy` (when
the loop finds someone else's work on a story). Only the owner's messages are commands.

People may keep working alongside the loop: a story set to `in-progress` on the base is left to
them (its dependents wait for their merge), and a story with someone's branch, PR or tagged
commits is never started without asking. More stories join with `/og:deliver add MOD-nn`.

The loop runs either as `/loop /og:deliver-next` in one long session, or as `og-deliver-run` from
a terminal — a fresh session per story, with a clock and a budget the driver enforces. Same state,
either way. Nobody can answer a session the driver started: `og-delivery status` shows what waits,
a decision is answered in the run's GitHub issue or from a terminal in the clone with
`og-delivery log decision_resolved story=<id> dec=<DEC-nn> answer="…" by=<owner>` (then run the
driver again if it has ended), and a waiting PR is merged on GitHub.

After a restart — Claude Code, the terminal, the machine — the loop does **not** come back on its
own: a `/loop` lives only as long as its session (and `og-deliver-run` as long as its terminal). Open a new session with
`claude --permission-mode auto --model claude-opus-5-5 --effort medium` and run
`/loop /og:deliver-next` again; it carries on from the live state, nothing is lost. (`og-deliver-run`
takes both from the settings by itself.)

`pause` stops new work but the loop keeps reading the thread every hour, so `continue` brings it
back. `stop` ends the loop's wake-ups — nothing reads the thread after that; restart with
`/og:deliver` → *Resume*, then `/loop /og:deliver-next`.

## Preflight — 2026-10-14

- ✓ repo clean, origin reachable, base `main` exists; this clone has no other worktrees, stashes or local branches
- ✓ the loop runs on GitHub as suloog (ADMIN) in suloog/knowledge-quiz
- ✗ suloog administers suloog/knowledge-quiz: an account that can lift the base's protection is not held by it → **accepted by the owner** (see Authorisations): "Auto now, fix access before CI switch"
- ✗ main has no ruleset or branch protection → **accepted by the owner** (see Authorisations): "Auto now, fix access before CI switch"
- ⚠ test results are the agents' own runs (`local`) — every merge waits for the owner until `US-00-01` is merged and the run is switched to CI
- ⚠ questions on GitHub as the same account the loop runs as — answers there are not independently verified
- ⚠ gates, the app's start command and the CI workflow do not exist yet — built by `US-00-01`
- ⚠ `maestro` is not installed on this machine (Android SDK present) — install it (`curl -Ls "https://get.maestro.mobile.dev" | bash`) and have an Android 12 (API 31) emulator image before the first e2e run
- ✓ usage readable — 5-hour 33%, weekly 15%; extra credits enabled on the account, not used by the loop
- ✓ Slack thread readable (`C02MEF2FG5A` / `1791962854.992019`)
- ✓ Claude Code 2.1.299; `CLAUDE_CODE_EFFORT_LEVEL` unset
- ✓ every story in scope runnable (`lenient`), foundation `US-00-01` first; nothing blocked
- ✓ `docs/specs/DECISIONS.md` present
- ⚠ the loop needs a **new** session started with `claude --permission-mode auto`; the repo default is plan mode
- ✓ allowlist extended with `Bash(npm:*)`, `Bash(npx expo:*)`, `Bash(maestro:*)`

## What the loop never does

- Changes the specification beyond story statuses, `BACKLOG.md` rows and DEC entries.
- Edits a test case, relaxes an assertion or adds a retry to make a test pass.
- Touches `.env*` files beyond the ones named above, prints a credential or asks for one.
- Pushes anything to the base branch except, at the end, the `chore(delivery)` report commit
  (the backup of its state goes to a branch of its own, never to the base).
- Mentions AI in commits or PRs.
- Keeps state anywhere but this clone (the live state directory and the repo).
- Runs against a host listed in `forbidden_hosts`.
