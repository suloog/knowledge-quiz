---
id: US-01-01 # US-NN-MM — NN is the parent module, MM a counter inside it; never reused
module: MOD-01
covers: [MOD-01-F01, NFR-05, NFR-06, NFR-10, NFR-12, NFR-13] # every requirement this story delivers
ticket: # optional YouTrack ID — filled by /og:sync-youtrack
status: in-progress # draft | ready | in-progress | review | done | blocked
priority: must # must | should | nice-to-have — inherited from the requirement
depends_on: [] # story IDs that must be done first
---

<!-- Content in the project language; headings fixed by this template. -->

# As a Parent, I can install the app on the Kompakt and open it, so that we have a dependable app to play on

|  |  |
| --- | --- |
| **Module** | `[MOD-01]` Question content — `docs/specs/modules/01-question-content/REQUIREMENTS.md` |
| **Covers** | `MOD-01-F01`, `NFR-05`, `NFR-06`, `NFR-10`, `NFR-12`, `NFR-13` |
| **Priority** | must |
| **Status** | in-progress |
| **Depends on** | — |
| **YouTrack** | — |
| **Open questions** | — |

## Description

The project's first piece of work: the company's mobile app foundation, brought up to its latest platform versions, built into an app that installs on the Mudita Kompakt and opens. No feature screens yet — the category screen is US-02-01. This story also settles that the app never touches the network and can be shipped as a signed APK.

## Acceptance criteria

- [ ] The app is built on the company's mobile app foundation at its latest platform versions, and the versions are recorded.
- [ ] The app installs and starts on an Android 12 emulator and on the Mudita Kompakt.
- [ ] The installed app asks for no network permission.
- [ ] The app starts and runs with the device's network switched off.
- [ ] A signed release APK can be built; the signing key is kept outside the repository.

## Edge cases

- Device older than Android 12 → the app is not offered for installation (NFR-10).

## Out of scope / what not to worry about

- The category screen and everything after it — US-02-01 onwards.
- Publishing to an app store (`DEC-05`).

## Technical notes

- Boilerplate `ordergroup/boilerplate-react-native-expo` upgraded to the latest Expo SDK / React Native (`DEC-06`); verify the build on an API 31 emulator before feature work.
- Remove the `INTERNET` permission from the Android manifest; a test asserts its absence (constitution: *No network*).
- Choose the component library against SRC-01 §5 with Mindful Design as inspiration and write it into `constitution.md` *Stack* (`DEC-07`).
- Set up Jest + RNTL and Maestro on the emulator (`DEC-37`); signing keystore stays with Maciej (`DEC-09`).
