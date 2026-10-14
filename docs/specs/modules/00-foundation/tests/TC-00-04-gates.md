---
id: TC-00-04
module: MOD-00
covers: [US-00-01#4]
layer: api # admin | web | api | mobile — what executes this test
type: happy-path
automation: manual-only # the gates guard the commit itself — a test inside the suite they run cannot stand outside them
roles: []
status: ready # draft | ready
depends_on: []
---

<!-- Copied by /og:deliver to docs/specs/modules/00-foundation/tests/ with the foundation story.
     Content in the project language; headings fixed. This file carries no results. -->

# [TC-00-04] The commit and push gates are detected and green on a clean checkout

|  |  |
| --- | --- |
| **Layer** | api |
| **Verifies** | `US-00-01#4` |
| **Role** | — |
| **Type** | happy-path |
| **Automation** | manual-only |
| **Depends on** | — |

## Preconditions

- A clean checkout of the pull request's head, its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | List the gates: `/og:pre-push`, or `detect-stack.sh commit .` and `detect-stack.sh push .` from the og plugin's `hooks/scripts/` | each list names a format check, a linter and the unit tests, and a type check where the language has one | console |
| 2 | Run every command listed | each of them ends green | console |
| 3 | Break the formatting of one file and commit it from a Claude Code session with the og plugin | the commit is refused, and the refusal names the gate that failed | console |

## Pass criterion

- The repository's gates are found without any setting outside the repository, and they hold a
  commit that breaks them.

## Cleanup

- Discard the broken file of step 3.

## Out of scope for this test

- The acceptance tests — they are not a commit gate; CI runs them (`TC-00-02`).
