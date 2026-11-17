# Worker 03 — Assurance, Creator UX, Narrative, and Submission

## P2 — QA and Adversarial Assurance

**Status:** `PLANNED`  
**Primary owner:** Worker 03  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Prove that the product handles invalid inputs, live failures, security boundaries, and misleading states safely.

## Entry gate

Runtime, policy, and UI paths are available.

## Scope and tasks

Execute test matrix; validate schema errors; test missing asset, unsupported layout, timeout, malformed response, secret redaction, path traversal, oversized input, and fallback labels; track defects.

## Receiving-party review

Workers 1 and 2 fix defects in their domains; Worker 3 owns the release decision.

## Acceptance evidence

All release-blocking cases pass or have an explicit remove/narrow/fix decision; no hidden failure state remains.

## Risks and non-goals

Testing only the happy path; assuming a fixture fallback is self-explanatory.

## Handoff / dependency

P3 evidence packet and P4 demo lock depend on QA results.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
