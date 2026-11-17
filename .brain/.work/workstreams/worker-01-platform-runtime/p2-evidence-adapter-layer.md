# Worker 01 — Platform, Runtime, and Integration

## P2 — Evidence Adapter Layer

**Status:** `PLANNED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Expose deterministic and optional model-backed evidence through one typed interface without allowing adapters to decide the final verdict.

## Entry gate

Manifest and evidence-ledger fields from Worker 2 are accepted.

## Scope and tasks

Implement order/reference/hash checks; add adapter registry; add fixture adapter; add optional model adapter boundary; capture model ID, inference mode, preprocessing, latency, cost, and failure reason.

## Receiving-party review

Worker 2 validates that adapter output preserves confidence, exclusions, and uncertainty.

## Acceptance evidence

Every adapter returns evidence or an explicit `TIMEOUT`, `UNSUPPORTED`, `UNVERIFIED`, or schema-error state; no adapter returns a bare boolean.

## Risks and non-goals

Model SDK instability; inconsistent image preprocessing; vendor response changes.

## Handoff / dependency

P4 policy consumes the adapter contract; live adapters remain optional for the MVP.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
