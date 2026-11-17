# Worker 01 — Platform, Runtime, and Integration

## P3 — Receipt and Report Runtime

**Status:** `VERIFIED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Persist an evidence ledger and decision receipt that a judge can inspect and replay.

## Entry gate

Adapter output schema is stable and policy reason codes are versioned.

## Scope and tasks

Write NDJSON evidence records; write panel/sequence receipts; hash inputs and configs; validate report schema; redact secrets and private paths; implement bounded retry/cancellation.

## Receiving-party review

Worker 3 inspects the report for creator-facing traceability and release safety.

## Acceptance evidence

A single command produces a complete report with source hash, fixture/corpus version, threshold version, adapter metadata, decision, reasons, and next action.

## Risks and non-goals

Receipt schema drift; leaking raw prompts or tokens; reports that depend on local absolute paths.

## Handoff / dependency

P5 UI uses receipts as its read model rather than inventing a second decision format.

## Required phase-close record

- **Changed paths and commit hash:** `runtime/report.js`, `scripts/verify-receipts.js`, `scripts/run-fixture-audit.js`, `.brain/.report/` (Commit: `206eb3e`).
- **Command or test used for acceptance:** `npm run verify:receipts` and `npm run audit:fixtures` (passed with all receipts and NDJSON files verified).
- **Evidence file, report, screenshot, or recording:** `.brain/.report/fixture_run_audit_report.json`, `.brain/.report/fixture_run_evidence_ledger.ndjson`.
- **Known limitations and unsupported cases:** Receipts redact private local paths to `<workspace>`; sequence status aggregation will hook to UI in P5.
- **Updated claims/capability status:** `runtime.receipts`: `RELEASED` / `VERIFIED`.
- **Receiving reviewer decision:** `PASS`.

## Definition of done

Completed and verified. A single command produces a complete audit report with NDJSON evidence records, source hashes, and decision receipts.
