---
id: AC-01-01-4 # derived by the delivery loop from US-01-01#4 (DEC-44) — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-01#4, NFR-12] # what this test proves
layer: mobile # admin | web | api | mobile
type: edge # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-01-4] The app starts and runs with the device's network switched off

|  |  |
| --- | --- |
| **Layer** | mobile — Android 12 emulator |
| **Verifies** | `US-01-01#4`, `NFR-12` |
| **Role** | Parent (no sign-in) |
| **Type** | edge |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The app is installed on the Android 12 emulator.
- The emulator's network can be switched off.

## Test data

| What | Value / source |
| --- | --- |
| Content | the app's shipped content |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Switch the emulator's network off (airplane mode) | The network is off | screenshot |
| 2 | Open the app with its data cleared | The app starts and shows its first screen without an error dialog | screenshot |

## Pass criterion

- With no network the app starts and shows its first screen.

## Cleanup

- Switch the network back on.

## Out of scope for this test

- Playing a card offline — `TC-01-02`, once the category screen and cards exist (`US-03-01`, `DEC-44`).
