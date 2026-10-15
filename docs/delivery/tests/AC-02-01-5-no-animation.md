---
id: AC-02-01-5 # derived by the delivery loop from US-02-01#5 — not reviewed; /og:tests can promote it
module: MOD-02
covers: [US-02-01#5, NFR-03] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-02-01-5] Nothing on the category screen animates and no screen transition is animated

|  |  |
| --- | --- |
| **Layer** | mobile — the app rendered by the unit test suite, and the repository's sources |
| **Verifies** | `US-02-01#5`, `NFR-03` |
| **Role** | Parent (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open the app and read the transition every screen of the navigation stack is given | Every screen's transition is `none` | console |
| 2 | Give a screen an animated transition and read the transitions again | The check reports it: an enabled animation fails the test | console |
| 3 | Read every source file under `src/` | None uses an animation API or a component that animates by itself (`Animated`, `LayoutAnimation`, Reanimated, `ActivityIndicator`, `TouchableOpacity`, `TouchableHighlight`) | console |

## Pass criterion

- No screen transition is animated and no component animates; enabling an animation fails the test.

## Out of scope for this test

- The device's own system animations (launcher, app start) — not the app's.
