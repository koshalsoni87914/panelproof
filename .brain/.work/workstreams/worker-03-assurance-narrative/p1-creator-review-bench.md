# Worker 03 — Assurance, Creator UX, Narrative, and Submission

## P1 — Creator Review Bench

**Status:** `PLANNED`  
**Primary owner:** Worker 03  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Make the decision understandable to a visual creator without requiring raw JSON knowledge.

## Entry gate

Receipt schema and policy vocabulary are stable.

## Scope and tasks

Build panel strip; reference/target comparison; evidence card; human-readable reason; score/threshold context; next action; override-with-reason; fixture-only badge.

## Receiving-party review

Worker 2 verifies that UI labels preserve `ALLOW/WARN/BLOCK/UNVERIFIED`; Worker 1 verifies data comes from receipts.

## Acceptance evidence

A creator can answer what failed, where, why, what can be done next, and whether export is safe.

## Risks and non-goals

Turning `UNVERIFIED` into “failed” or “passed”; adding a chat sidebar instead of evidence.

## Handoff / dependency

P4 integration and demo freeze depend on this flow.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
