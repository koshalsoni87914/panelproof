# PanelProof Phase Register

| Phase | Outcome | Exit evidence | Status |
|---|---|---|---|
| P0 Preflight | Name, track, scope, verdict vocabulary frozen | ADRs, claims register | Complete in design |
| P1 Contracts | Schemas and policy defined | Contract docs and fixtures | Design complete |
| P2 Vertical slice | Clean/drifted/error audit works offline | Receipts and tests | To build |
| P3 Review bench | Creator-facing evidence UI | Screen recording | To build |
| P4 Region Lock | Pixel invariant enforced | Delta report | To build |
| P5 Repair | Bounded edit and re-score | Two-attempt trace | Finale target |
| P6 Sequence | Plan and aggregate panel status | Sequence receipt | Finale target |
| P7 Evaluation | Metrics and calibration table | `drift_report.json` | To build |
| P8 Freeze | Demo, README, clean-clone proof | Video, build log, submission | To build |

## Suggested ownership

- **Worker 01 — Gate/runtime:** schemas, policy, receipts, fixtures, CLI/API.
- **Worker 02 — Vision/evaluation:** identity, palette, trait adapters, calibration, metrics.
- **Worker 03 — UI/release:** review bench, evidence drawer, region lock, offline demo, QA.
- **Worker 04 — Narrative:** README, demo, pitch, judge guide, capability ledger, submission lock.

If the team is smaller, preserve boundaries by capability rather than by directory count.
