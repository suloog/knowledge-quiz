---
id: TC-00-03
module: MOD-00
covers: [US-00-01#3]
layer: mobile # admin | web | api | mobile — what executes this test; the outermost layer the stack has
type: happy-path
automation: auto
roles: []
status: ready # draft | ready
depends_on: [TC-00-01]
---

<!-- Copied by /og:deliver to docs/specs/modules/00-foundation/tests/ with the foundation story.
     Content in the project language; headings fixed. This file carries no results. -->

# [TC-00-03] The first screen shows a value read from the app's bundled content data

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-00-01#3` |
| **Role** | — |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | `TC-00-01` |

## Preconditions

- The app runs on the emulator, started with the documented command.
- The app's bundled content data holds the one value the first screen shows.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open the app on the emulator | it opens without an error | screenshot + console |
| 2 | Look at what the first screen shows | the value kept in the content data is shown — read from the data at run time, not written into the screen | screenshot + app state |

## Pass criterion

- What the user sees came through every layer the app has — the bundled content data and the screen
  that reads it; this app has no server (`SRC-01-20`).

## Out of scope for this test

- Anything the product does with that value — the stories that follow.
- Signing in: the path needs no account.
