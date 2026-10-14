# Non-functional requirements

> Project-wide. A requirement that constrains one module only lives in that module's file as
> `MOD-NN-NFR-nn`, not here.
>
> Every requirement here is priority **must** unless marked otherwise. Only list constraints that
> actually shape the design — an NFR nobody can fail is noise.

## Performance

- [NFR-01] On the Mudita Kompakt the answer appears within 1 s of a touch. — *source: `DEC-31`*
- [NFR-02] On the Mudita Kompakt the category screen appears within 3 s of launch. — *source: `DEC-31`*
- [NFR-03] Nothing on any screen animates and no transition is animated. (`SRC-01-26`)
- [NFR-04] A screen redraws only when its content changes. (`SRC-01-27`)

## Security

- [NFR-05] The app makes no network calls and requests no network permission. (`SRC-01-20`) — *source: `DEC-04`*
- [NFR-06] The release APK is signed with a key owned by Maciej that never enters the repository. — *source: `DEC-09`*

## Accessibility

- [NFR-07] The interface uses pure black and white only — no greys, no colour. (`SRC-01-23`, `SRC-01-24`) — *source: `DEC-12`*
- [NFR-08] Text and touch targets are large enough for a parent and a child aged 3–5, judged on the Kompakt. (`SRC-01-25`) — *source: `DEC-17`*
- [NFR-09] Every screen is reachable in at most two steps from the category screen. (`SRC-01-28`)

## Compatibility

- [NFR-10] The app runs on Android 12 (API 31) and newer. — *source: `DEC-16`*
- [NFR-11] The Mudita Kompakt is the reference device; every release is checked on it by hand. — *source: `DEC-10`*
- [NFR-12] The app works fully offline. (`SRC-01-20`)
- [NFR-13] The app is distributed as a signed APK installed directly on the device. — *source: `DEC-05`*

## Compliance and audit

- [NFR-14] The app stores and processes no personal data. — *source: `DEC-14`*
