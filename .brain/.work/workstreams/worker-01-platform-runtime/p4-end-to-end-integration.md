# Worker 01 — Platform, Runtime, and Integration

## P4 — End-to-End Integration

**Status:** `PLANNED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Connect intake, evidence adapters, Worker 2 policy, report writing, and Worker 3 review UI into one narrow vertical slice.

## Entry gate

Clean, drifted, and verifier-error fixtures exist; policy API is callable offline.

## Scope and tasks

Wire the command/API; add run status; expose evidence packets to UI; add error mapping; add demo-safe replay; preserve original failed runs.

## Receiving-party review

Worker 3 executes the creator flow; Worker 2 verifies that UI decisions match policy receipts exactly.

## Acceptance evidence

Clean fixture produces `ALLOW`/`WARN`; drift fixture produces `BLOCK`; verifier-error fixture produces `UNVERIFIED`; all receipts validate.

## Risks and non-goals

Integration timing; UI/backend vocabulary mismatch; hidden network call.

## Handoff / dependency

P6 evaluation and P8 freeze depend on this phase being green.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
