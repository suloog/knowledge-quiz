---
id: TC-00-01
module: MOD-00
covers: [US-00-01#1]
layer: mobile # admin | web | api | mobile — what executes this test
type: happy-path
automation: auto
roles: []
status: ready # draft | ready
depends_on: []
---

<!-- Copied by /og:deliver to docs/specs/modules/00-foundation/tests/ with the foundation story.
     Content in the project language; headings fixed. This file carries no results. -->

# [TC-00-01] The documented start command builds the app and starts it on the Android emulator

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-00-01#1` |
| **Role** | — |
| **Type** | happy-path |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- A clean checkout of the repository; an Android 12 (API 31) emulator is running without the app installed.
- The README names the one command that starts the stack.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Start the app with the command the README names, and with nothing else | the command builds the app, installs it on the emulator and reports it started; nothing was done by hand | console |
| 2 | Look at the emulator | the app is open on its first screen, with no error dialog | screenshot |

## Pass criterion

- After that one command, and no other step, the app runs on the emulator.

## Cleanup

- Stop the app and the bundler the command started; nothing of it keeps running.

## Out of scope for this test

- That a request travels through the layers and comes back — `TC-00-03`.
- That CI starts the stack the same way — `TC-00-02`.
