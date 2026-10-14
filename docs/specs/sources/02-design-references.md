---
id: SRC-02
title: MVP supplement — design references and starting point
kind: formal # formal (binding: contract, appendix, signed offer/estimate, RFP) | informal (e-mail, notes, slides, chat)
origin: Order Group (internal)
date: 2026-10-14
received_via: repo file docs/specs/sources/original/2026-10-14-2.md
supersedes:
status: read-only
---

<!-- This file records what the document SAYS — quoted or faithfully paraphrased, in the
     client's own words and order. No interpretation, no priorities, no acceptance criteria,
     no technical notes; those are written in discovery/ and modules/. Once written, never edited. -->

# [SRC-02] MVP supplement — design references and starting point

## Summary

A short note supplementing `SRC-01`. It names the design references to follow, Mudita Mindful
Design and Mudita's MMD repository, and gives the starting point for the code: the company React
Native / Expo boilerplate and an open choice of component library. It does not say how closely to
follow the references or which version of the guidelines applies. The original is in Polish, and
the items below are faithful English renderings.

## Items

### Design references

- [SRC-02-01] Link to Mudita Mindful Design: https://zeroheight.com/956ff055a/p/79359a-mudita-mindful-design — *line 1*
- [SRC-02-02] Link to the repo https://github.com/mudita/MMD. It is written in Kotlin, but the point is to model ourselves on it. — *line 2*

## Noted but not scope

- Link to the company repo: https://github.com/ordergroup/boilerplate-react-native-expo. It would be nice to start with the latest RN, Expo and other packages. — *line 3*
- As for the component package, nothing is imposed. It can be any choice that meets the E-ink criteria. — *line 5*

## Contradictions and unclear points

- "Model ourselves on it": how closely the app should follow MMD is not stated (`SRC-02-02`) → `Q21`
- Mudita Mindful Design is a living site, and which version or date is binding is not stated (`SRC-02-01`) → `Q22`
- "The latest RN, Expo and other packages": whether upgrading the boilerplate is part of this project is not stated (line 3) → `Q23`
- "Meets the E-ink criteria": which criteria apply and who approves the component library is not stated (line 5) → `Q24`
