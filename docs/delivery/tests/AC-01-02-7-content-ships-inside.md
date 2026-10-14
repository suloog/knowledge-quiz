---
id: AC-01-02-7 # derived by the delivery loop from US-01-02#7 — not reviewed; /og:tests can promote it
module: MOD-01
covers: [US-01-02#7, MOD-01-F09, NFR-12] # what this test proves
layer: mobile # admin | web | api | mobile
type: nfr # happy-path | edge | negative | nfr
automation: auto # auto | manual-only — manual-only is never green in the report
roles: [] # no sign-in in this app
status: draft # draft | ready
depends_on: [AC-01-01-5] # test case IDs that must pass first
---

<!-- Content in the project language; headings fixed by this template.
     🔴 This file carries no results. -->

# [AC-01-02-7] All content ships inside the app; nothing is downloaded

|  |  |
| --- | --- |
| **Layer** | mobile — the content code (unit test suite) and the release APK built in the acceptance run (`AC-01-01-5`) |
| **Verifies** | `US-01-02#7`, `MOD-01-F09`, `NFR-12` |
| **Role** | — (no sign-in) |
| **Type** | nfr |
| **Automation** | auto |
| **Depends on** | `AC-01-01-5` |

## Preconditions

- The repository checked out with its dependencies installed.

## Steps

| # | Action | Expected result | Evidence |
| - | ------ | --------------- | -------- |
| 1 | Read the content code | No network call and no remote address | console |
| 2 | Read the release APK's embedded JavaScript bundle | Every question id, question and answer of every deck the app ships, in Polish and English, is in it | console (`release/bundle-content.txt`) |

## Pass criterion

- All content is inside the installed app and nothing in the content code reaches the network.

## Out of scope for this test

- Playing a card offline — `TC-01-02`, written in `US-03-01` once the category screen exists (`DEC-44`, `DEC-46`).
