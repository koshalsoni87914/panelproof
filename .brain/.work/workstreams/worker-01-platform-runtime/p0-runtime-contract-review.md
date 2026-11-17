# Worker 01 — Platform, Runtime, and Integration

## P0 — Runtime Contract Review

**Status:** `VERIFIED`  
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

- **Changed paths and commit hash:** `packages/contracts/package.json`, `packages/contracts/src/errors.js`, `packages/contracts/src/claim.js`, `packages/contracts/src/verdict.js`, `packages/contracts/src/envelope.js`, `packages/contracts/src/receipt.js`, `packages/contracts/src/index.js`, `scripts/verify-contracts.js` (Commit: `206eb3e`).
- **Command or test used for acceptance:** `npm run verify:contracts` (passed with 100% assertions green).
- **Evidence file, report, screenshot, or recording:** `.brain/.report/w1_p0_p3_phase_gate_report.md`.
- **Known limitations and unsupported cases:** Schemas strictly versioned at `@1`; version mutations throw `SchemaVersionMismatchError`.
- **Updated claims/capability status:** `runtime.contracts`: `RELEASED` / `VERIFIED`.
- **Receiving reviewer decision:** `PASS`.

## Definition of done

Completed and verified. Contract schemas validated, rejecting malformed manifests, rejecting blocking severity on model-inferred claims, and validating round-trips.
