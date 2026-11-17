# PanelProof Production Roadmap

The roadmap is ordered so the team always has a runnable slice. Each phase has one primary owner, one receiving reviewer, a required artifact, and an exit command or evidence packet.

| Phase | Goal | Primary owner | Receiving reviewer | Exit artifact |
|---|---|---|---|---|
| P0 Contract and threat freeze | Freeze name, scope, vocabulary, supported inputs, reuse policy, and risks | Worker 3 | Workers 1 and 2 | Signed decision log, claims register, threat model |
| P1 Reproducible foundation | Create locked environment, repo layout, schemas, fixtures, run metadata, and demo shell | Worker 1 | Worker 3 | Clean clone boots; schema validation passes |
| P2 Continuity manifest | Define references, panel order, entities, anchors, intentional changes, and unsupported cases | Worker 2 | Worker 1 | Versioned manifest and fixture corpus |
| P3 Evidence adapters | Implement deterministic checks and one bounded optional model adapter | Worker 1 | Worker 2 | Adapter contract tests and evidence packets |
| P4 Policy and decision gate | Aggregate signals into ALLOW/WARN/BLOCK/UNVERIFIED without network calls | Worker 2 | Worker 1 | Policy tests, reason-code report, fail-closed cases |
| P5 Creator review bench | Show panel strip, evidence cards, reasons, next actions, and override flow | Worker 3 | Workers 1 and 2 | Usable screen recording on known-good/bad fixtures |
| P6 Adversarial evaluation | Measure false accepts, false rejects, abstention, coverage, reproducibility, latency | Worker 2 | Worker 3 | Corpus report with denominators and exclusions |
| P7 Live-sprint capability | Add one meaningful extension: sequence propagation plus bounded repair or stronger adapter | Worker 1 | Worker 2 | Dated live commits and end-to-end proof |
| P8 Integration and demo freeze | Freeze exact commands, fixtures, reports, screenshots, README, and video | Worker 3 | Entire team | Release-candidate checklist passes twice |
| P9 Post-hackathon production | Harden packaging, model registry, studio workspaces, CI gate, and monitoring | Worker 1 | Workers 2 and 3 | Separate post-event roadmap; not required for submission |

## Hackathon cut line

For the online MVP, P0–P5 must be complete enough to show a reliable vertical slice. During the live sprint, complete P6 and one visible P7 extension. P9 remains explicitly post-hackathon.

## Global phase gate

A phase closes only when its owner supplies: changed files, command run, result, evidence path, known limitations, updated capability status, and a receiving-party acceptance note.
