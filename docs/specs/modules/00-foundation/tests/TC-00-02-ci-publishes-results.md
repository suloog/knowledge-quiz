---
id: TC-00-02
module: MOD-00
covers: [US-00-01#2]
layer: api # admin | web | api | mobile — what executes this test
type: happy-path
automation: manual-only # the run and its artifact are seen on GitHub, by a person — nothing in the repository can show them
roles: []
status: ready # draft | ready
depends_on: [TC-00-01, TC-00-03]
---

<!-- Copied by /og:deliver to docs/specs/modules/00-foundation/tests/ with the foundation story.
     Content in the project language; headings fixed. This file carries no results. -->

# [TC-00-02] The pull request's own workflow run publishes the acceptance tests' results

|  |  |
| --- | --- |
| **Layer** | api |
| **Verifies** | `US-00-01#2` |
| **Role** | — |
| **Type** | happy-path |
| **Automation** | manual-only |
| **Depends on** | `TC-00-01`, `TC-00-03` |

## Preconditions

- The story's pull request is open on GitHub, and its checks have finished.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open the pull request and look at its checks | the acceptance workflow ran on the pull request's head commit | screenshot |
| 2 | Open that workflow run | it lists an artifact named `og-test-results` | screenshot |
| 3 | Download the artifact and open it | it holds a JUnit report (`*.xml`) whose tests carry `TC-00-01` and `TC-00-03` in their names | — |
| 4 | Read the workflow file in the pull request | it runs on pull requests; the acceptance tests are run by one command of the repository and are not listed in the workflow; the step that uploads the reports runs whether the tests passed or failed, and fails when there is no report | — |

## Pass criterion

- The pull request's own workflow run shows the artifact `og-test-results`, with a JUnit report
  that names the story's automatic test cases — as `ci-evidence.md` of the og plugin asks.

## Out of scope for this test

- Whether the tests in the report passed — `TC-00-01` and `TC-00-03` say that.
- Required status checks on the base branch — the owner's setting on GitHub.
