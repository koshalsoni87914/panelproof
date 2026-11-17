# PanelProof Three-Member Team Execution Model

## Member 1 — Platform, runtime, and integration

**Owns:** repository/runtime, schemas and serialization, manifest/reference ingestion, run IDs and hashes, adapter interfaces, bounded execution, receipt persistence, CLI/API integration, offline replay, packaging, and live model hooks.

**Does not own:** final continuity thresholds, public claims, visual narrative, or release approval.

**Primary acceptance:** `clean clone → fixture run → evidence packet → machine-readable report` works without a network call.

## Member 2 — Continuity analysis and policy

**Owns:** continuity manifest semantics, entity/attribute anchors, allowed intentional changes, evidence ledger, signal composition, thresholds, reason codes, adversarial fixtures, calibration, and policy tests.

**Does not own:** deployment secrets, final UI wording, README claims, or release packaging.

**Primary acceptance:** known-good, intentional-change, known-bad, ambiguous, unsupported, missing-reference, and timeout cases remain correctly distinct.

## Member 3 — Assurance, creator UX, narrative, and submission

**Owns:** review bench UX, creator language, claims register, source-confidence labels, threat/risk controls, QA/release gates, reuse disclosure, README, demo video, judge Q&A, live-build ledger, and submission lock.

**Does not own:** changing model thresholds or policy semantics without Worker 2’s approval.

**Primary acceptance:** every public claim maps to evidence, the creator can understand the result, and the release candidate works from a clean state twice.

## Cadence

At phase start, all three review the contract and the exit artifact. During implementation, each worker keeps work in progress to one active phase and posts a short handoff note when a dependency is ready. At phase close, the receiving reviewer runs the acceptance command and records limitations. The team freezes the schema, claims, fixtures, and demo before adding polish.

## Synchronization rule (Pull Before Push)

Every worker must synchronize with the remote (`git pull --rebase origin main`) and verify passing acceptance tests prior to pushing any commits. Pushing without pulling is prohibited to protect the shared commit ledger and avoid merge conflicts.

## Conflict rule

A worker may not edit another worker’s exclusive domain without a written handoff and an updated dependency note. Product language changes require Worker 3 review; policy changes require Worker 2 review; runtime/contract changes require Worker 1 review.

## Minimum handoff format

```md
## Handoff: <phase/capability>
Owner:
Receiving reviewer:
Changed paths:
Contract/version:
Command to accept:
Expected result:
Known limitations:
Open risk:
Capability status:
```
