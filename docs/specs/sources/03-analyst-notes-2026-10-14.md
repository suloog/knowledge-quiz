---
id: SRC-03
title: Analyst notes — discovery interview 2026-10-14
kind: informal # formal (binding: contract, appendix, signed offer/estimate, RFP) | informal (e-mail, notes, slides, chat)
origin: analyst (Maciej, product owner)
date: 2026-10-14
received_via: interview — /og:discovery session 2026-10-14
supersedes:
status: read-only
---

<!-- This file records what the analyst SAID in the discovery interview — faithfully paraphrased.
     No interpretation, no acceptance criteria. Once written, never edited; later sessions append
     new items under a new dated heading. -->

# [SRC-03] Analyst notes — discovery interview 2026-10-14

## Summary

What the analyst, who is also the product owner, said during the discovery session on topic
`DSC-01`: how the project came about, how it will be delivered, and rulings on the open questions
about users, scope, distribution and the starting point of the code.

## Items

### 2026-10-14 — DSC-01 Users, technology and data

- [SRC-03-01] The app is the analyst's own idea; the analyst is its product owner. — *interview, DSC-01*
- [SRC-03-02] There is no deadline. — *interview, DSC-01*
- [SRC-03-03] The app is to be built using the og plugin's delivery loop. — *interview, DSC-01*
- [SRC-03-04] The device may be operated by the parent or by the child. — *interview, Q03*
- [SRC-03-05] Only what SRC-01 §1–5 (with SRC-02) describes is in the MVP; anything else is out. — *interview, Q14*
- [SRC-03-06] No analytics and no crash reporting. — *interview, Q15*
- [SRC-03-07] The MVP is distributed as an APK installed directly on the device. — *interview, Q16*
- [SRC-03-08] Start from the company boilerplate and upgrade React Native, Expo and the packages to the latest versions as the first piece of work; Expo is used. — *interview, Q20, Q23*
- [SRC-03-09] The tech lead picks the component library against the E-ink list of SRC-01 §5 and Mudita Mindful Design; the choice is confirmed in the constitution. — *interview, Q24*
- [SRC-03-10] The delivery is code with automated tests; no separate UI design step and no post-release support. — *interview, Q18*
- [SRC-03-11] The MVP is accepted by the product owner running the core scenario on a real E-ink device. — *interview, Q18*
- [SRC-03-12] The repository lives in the Order Group GitHub organisation; Maciej owns access to it and the release signing key. There is no hosting. — *interview, TQ17, TQ18*

### 2026-10-14 — DSC-02 E-ink UI and non-functional requirements

- [SRC-03-13] Mudita Kompakt is the only device the MVP is built and accepted on. — *interview, Q12*
- [SRC-03-14] For now Mudita Mindful Design is only an inspiration; the app does not have to match it 1:1. — *interview, Q13, Q22*
- [SRC-03-15] Follow MMD's interaction patterns and visual language, without visual parity. — *interview, Q21*
- [SRC-03-16] Pure black and white only; no font-scaling or screen-reader work in the MVP. — *interview, Q17*
- [SRC-03-17] No security audit in the MVP. — *interview, TQ04*
- [SRC-03-18] The app processes no personal data. — *interview, TQ11, TQ12*
- [SRC-03-19] Every story has unit and e2e tests; the MVP is accepted manually on the Kompakt; no load testing. — *interview, TQ16*

### 2026-10-14 — DSC-02 follow-up

- [SRC-03-20] The Mudita Kompakt runs Android 12. — *interview, Q25*
- [SRC-03-21] Assume the Kompakt's screen refreshes at about 10 Hz. — *interview, DSC-02*
- [SRC-03-22] Element sizes are chosen intuitively; there will be no hard number. — *interview, DSC-02-03*
- [SRC-03-23] The delivery loop verifies the app in an emulator. — *interview, DEC-15*

### 2026-10-14 — DSC-03 Age categories

- [SRC-03-24] New categories and questions come only with a new app version. — *interview, Q02 (accepted batch)*
- [SRC-03-25] Version 1 has exactly the categories 3+, 4+ and 5+. — *interview, Q01*
- [SRC-03-26] The last-used category is shown as a separate "continue" entry above the full list, which keeps a fixed order; it is remembered after the app is closed. — *interview, Q04*

### 2026-10-14 — DSC-04 Question cards

- [SRC-03-27] Each category's questions are shuffled once and gone through without repeats; the position is remembered, so continuing picks up at the next unseen question, also after a restart. — *interview, Q05*
- [SRC-03-28] When a category runs out, an end card offers to shuffle and start again or to go back to the categories. — *interview, Q06*
- [SRC-03-29] The whole card is the tap target; the answer appears below the question, which stays visible. — *interview, Q07*
- [SRC-03-30] The way back to the categories is the Android back action plus a small visible control outside the card's tap area. — *interview, Q08*

### 2026-10-14 — DSC-05 Question content

- [SRC-03-31] AI writes and accepts the questions within the loop; the product owner reviews them after the loop is finished. — *interview, Q09*
- [SRC-03-32] 50 questions per category. — *interview, Q09*
- [SRC-03-33] Optional black-and-white illustrations, AI-generated, only where a picture helps the question. — *interview, Q10*
- [SRC-03-34] The interface and the content are in Polish and English; both languages have the same questions, translated. — *interview, Q11*
- [SRC-03-35] The language is chosen with a switch in the app. — *interview, Q11*

### 2026-10-14 — /og:decide, open assumptions confirmed

- [SRC-03-36] Confirmed: the answer appears within 1 s of a tap and the category screen within 3 s of launch, on the Kompakt. — *interview, Q26*
- [SRC-03-37] Confirmed: on first launch there is no continue entry, only the list of categories. — *interview, Q27*
- [SRC-03-38] Confirmed: the language switch is on the category screen; on first launch the app follows the device language (Polish, otherwise English); the choice is remembered. — *interview, Q28*

## Noted but not scope

- …

## Contradictions and unclear points

- …
