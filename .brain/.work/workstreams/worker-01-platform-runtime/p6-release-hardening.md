# Worker 01 — Platform, Runtime, and Integration

## P6 — Release Hardening

**Status:** `PLANNED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Release/post-event

## Objective

Make the final artifact reproducible, clean, safe, and easy to run by judges.

## Entry gate

All critical capabilities are frozen and Worker 3 starts release QA.

## Scope and tasks

Add package allowlist; run dependency/license audit; verify lockfiles; remove debug secrets; check path portability; build clean-clone script; preserve offline fallback.

## Receiving-party review

Worker 3 runs the full release gate twice and signs the release candidate.

## Acceptance evidence

Clean clone setup, tests, fixtures, reports, and demo command pass; archive contains no keys, private paths, or undeclared assets.

## Risks and non-goals

A last-minute dependency change; stale README command; fixture label missing.

## Handoff / dependency

No new features after this phase; only contract-preserving defect fixes.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
