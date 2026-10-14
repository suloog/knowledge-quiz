---
id: TC-01-03 # TC-NN-MM — NN is the parent module, MM a counter within it; never reused
module: MOD-01
covers: [US-01-01#2, NFR-11] # what this test proves
layer: mobile # admin | web | api | mobile
type: happy-path # happy-path | edge | negative | nfr
automation: manual-only # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app; the acting person is named in the header
status: draft # draft | ready
depends_on: [] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [TC-01-03] The app installs and opens on the Mudita Kompakt

|  |  |
| --- | --- |
| **Layer** | mobile — Mudita Kompakt, by hand |
| **Verifies** | `US-01-01#2`, `NFR-11` |
| **Role** | Parent (no sign-in) |
| **Type** | happy-path |
| **Automation** | manual-only |
| **Depends on** | — |

## Preconditions

- A Mudita Kompakt without the app installed; the signed release APK.

## Test data

| What | Value / source |
| --- | --- |
| Device | Mudita Kompakt (Android 12) |
| Measuring | a stopwatch or screen recording on a second device |

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Install the release APK on the Kompakt | Installation completes | screenshot |
| 2 | Open the app | The category screen appears, legible and black and white | screenshot |

## Pass criterion

- The app opens on the Mudita Kompakt.

## Cleanup

- Uninstall the app, or keep it for the next manual checks.

## Out of scope for this test

- Timings — `TC-02-03`, `TC-03-06`.
