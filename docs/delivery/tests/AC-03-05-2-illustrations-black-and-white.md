---
id: AC-03-05-2 # derived by the delivery loop from US-03-05#2 — not reviewed; /og:tests can promote it
module: MOD-03
covers: [US-03-05#2, MOD-01-F13, NFR-07] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-03-05-2] Every illustration is pure black and white, and any other pixel value fails the test

|  |  |
| --- | --- |
| **Layer** | mobile — the shipped illustration files, read by the unit test suite |
| **Verifies** | `US-03-05#2`, `MOD-01-F13`, `NFR-07` |
| **Role** | Child (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | — |

## Preconditions

- The repository checked out with its dependencies installed.

## Test data

| What | Value / source |
| --- | --- |
| Illustrations | every PNG file in `src/content/illustrations/` |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Read every illustration file and decode every pixel | Each is a 1-bit black-and-white PNG; every pixel is #000000 or #FFFFFF, both are drawn, and every pixel was read | console |
| 2 | Run the same check on pictures holding a grey, a colour, a see-through pixel, black and white in an 8-bit file, and a file that is not a PNG | The check reports each of them: any other pixel value or format fails the test | console |

## Pass criterion

- Every shipped illustration holds only #000000 and #FFFFFF pixels in a 1-bit file, and the check fails on anything else.

## Out of scope for this test

- How the illustrations look on the device — `TC-03-21` and `TC-03-22` find the shown picture pixel for pixel on the emulator; legibility on the Mudita Kompakt is checked by hand (`TC-03-23`).
