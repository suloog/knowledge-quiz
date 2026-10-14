# Technical checklist

> The company's standing list of technical questions every project answers. The canon (what exactly
> to establish, who answers, where the answer lands) lives in the plugin:
> `skills/discovery/references/tech-checklist.md`. This file holds **this project's answers**.
>
> `/og:discovery close` will not run while any item has no status, or while its reference points at
> an identifier that does not exist. There is no flag that bypasses it.
>
> **Statuses** (always the English values): `answered` — settled, points at a `DSC-NN-nn` ·
> `assumed` — we took a default, points at a `Qnn [A]` · `open` — only the client can say, points
> at a `Qnn [W]` · `decided` — settled by a ruling, points at a `DEC-nn` · `n/a` — deliberately out
> of scope, points at a `SRC-NN-nn` or `DEC-nn` and **requires a note giving the reason**.

## A. Security

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ01 | Encryption at rest | n/a | `SRC-01-30` | Only the last-used category is stored on the device; no profiles or personal data |
| TQ02 | Encryption in transit | n/a | `DEC-04` | The app makes no network calls |
| TQ03 | Multi-factor authentication | n/a | `SRC-01-30` | No login of any kind |
| TQ04 | Security audits | decided | `DEC-13` | No security audit in the MVP |

## B. Performance

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ05 | Response time | assumed | `Q26` | Answer ≤1 s after a tap, category screen ≤3 s after launch, on the Kompakt |
| TQ06 | Throughput | n/a | `SRC-01-20` | Single offline device, no backend or server |
| TQ07 | Vertical and horizontal scalability | n/a | `SRC-01-20` | Single offline device, no backend or server |

## C. Availability

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ08 | SLA | n/a | `SRC-01-20` | Single offline device, no backend or server |
| TQ09 | Redundancy | n/a | `SRC-01-20` | Single offline device, no backend or server |
| TQ10 | Disaster recovery (RTO/RPO, backups) | n/a | `DEC-09` | No hosting; content and code live in the repository |

## D. Compliance

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ11 | Applicable regulations (GDPR, PCI DSS, HIPAA, local) | decided | `DEC-14` | No personal data processed — no regulation-specific work |
| TQ12 | Personal data — roles, processing agreement, region, retention | decided | `DEC-14` | No personal data processed |

## E. Portability

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ13 | Delivery form and offline operation | answered | `DSC-01-03` | Native Android app, fully offline; installed as an APK (`DSC-01-13`) |

## F. Maintainability

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ14 | Updates and maintenance | decided | `DEC-08` | No post-release support; updates are new APK builds |
| TQ15 | Monitoring and diagnostics | decided | `DEC-04` | No monitoring, analytics or crash reporting — the app makes no network calls |

## G. Testability

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ16 | Required test levels | decided | `DEC-15` | Unit + e2e per story; manual acceptance on the Kompakt; no load tests — goes to the constitution |

## H. Deployment environment

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ17 | Infrastructure ownership | n/a | `DEC-09` | No hosting: offline app distributed by sideload; the repo lives in the Order Group GitHub org |
| TQ18 | Owner of permissions and access (named) | decided | `DEC-09` | Maciej owns repository access and the release signing key |

## I. Test targets

| TQ | Question | Status | Reference | Note |
|------|----------|--------|-----------|------|
| TQ19 | Web — browsers and minimum versions | n/a | `SRC-01-01` | Android app only, no web |
| TQ20 | Web — resolutions and breakpoints | n/a | `SRC-01-01` | Android app only, no web |
| TQ21 | iOS — scope, minimum version, devices | n/a | `SRC-01-01` | Android only |
| TQ22 | Android — scope, minimum version, devices | decided | `DEC-16` | Reference device: Mudita Kompakt; Android 12 (API 31) and newer |
| TQ23 | Tablet — scope, orientations, devices | n/a | `DEC-10` | Kompakt is the only target; no tablets |
| TQ24 | E-reader — scope, engine, how it is tested | decided | `DEC-10` | Mudita Kompakt in scope; tested manually — no automation reaches it |
