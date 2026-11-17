# Worker 01 — Platform, Runtime, and Integration

## P3 — Receipt and Report Runtime

**Status:** `PLANNED`  
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

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
