---
id: AC-02-01-4 # derived by the delivery loop from US-02-01#4 — not reviewed; /og:tests can promote it
module: MOD-02
covers: [US-02-01#4, NFR-07] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-02-01-4] Every element on the category screen is pure black or pure white, and any other colour fails the test

|  |  |
| --- | --- |
| **Layer** | mobile — the app rendered by the unit test suite, and the repository's sources |
| **Verifies** | `US-02-01#4`, `NFR-07` |
| **Role** | Parent (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open the app (root layout and navigation included) and read the colour of every element drawn | Every colour is #000000 or #FFFFFF — the navigation's screen background included | console |
| 2 | Draw an element in a third colour (grey) and read the colours again | The check reports the grey: another colour fails the test | console |
| 3 | Read every source file under `src/` except `src/theme.ts`, and the app configuration | No colour is written anywhere but the theme; the app configuration's colours are black or white | console |

## Pass criterion

- Only #000000 and #FFFFFF are drawn, and a third colour makes the test fail.

## Out of scope for this test

- How the screen looks on the Mudita Kompakt's E-ink panel — checked by hand (`TC-02-04`).
