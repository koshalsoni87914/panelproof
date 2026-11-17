# Worker 01 — Platform, Runtime, and Integration

## P0 — Runtime Contract Review

**Status:** `PLANNED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Freeze the run envelope, identifiers, hashes, schema versions, adapter interface, and failure vocabulary before implementation begins.

## Entry gate

Contract review approved by Workers 2 and 3.

## Scope and tasks

Create run metadata types; define adapter input/output contracts; define deterministic clock and run ID injection; define artifact paths; add version mismatch and malformed-input errors.

## Receiving-party review

Worker 2 confirms evidence fields are sufficient for policy; Worker 3 confirms public names and failure labels are understandable.

## Acceptance evidence

`runtime/contracts` tests reject malformed manifests and incompatible schema versions; a sample run envelope serializes and round-trips.

## Risks and non-goals

Unknown model output shape; overdesigning the contract before the first fixture.

## Handoff / dependency

P1 can begin only after contract version is recorded in the decision log.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
