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
| **Layer** | mobile — the app rendered by the unit test suite, the repository's sources, and the app on the Android 12 emulator |
| **Verifies** | `US-02-01#4`, `NFR-07` |
| **Role** | Parent (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.
- For step 4: the app running on the Android 12 emulator, on the category screen, with a GPU that draws the screen (a frame of one colour only blocks the step).

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Open the app (root layout and navigation included) and read the colour of every element drawn | Every colour is #000000 or #FFFFFF — the navigation's screen background included | console |
| 2 | Draw an element in a third colour (grey) and read the colours again | The check reports the grey: another colour fails the test | console |
| 3 | Read every source file under `src/` except `src/theme.ts`, and the app configuration | No colour is written anywhere but the theme; the app configuration's colours are black or white | console |
| 4 | Take a screenshot of the category screen on the emulator and read every pixel of the app's area (system bars excluded) outside the text glyphs — each text element shrunk by 8 dp | Every pixel is #000000 or #FFFFFF: no grey row beside a rule, no other colour | screenshot |

## Pass criterion

- Only #000000 and #FFFFFF are drawn — in the app's styles and in the pixels on the device — and a third colour makes the test fail.

## Out of scope for this test

- How the screen looks on the Mudita Kompakt's E-ink panel — checked by hand (`TC-02-04`).
