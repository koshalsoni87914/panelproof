# Worker 02 — Continuity Analysis and Policy

## P1 — Evidence Ledger Design

**Status:** `PLANNED`  
**Primary owner:** Worker 02  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Define one record per check so a verdict can be explained, calibrated, and replayed.

## Entry gate

Manifest fields and check IDs are versioned.

## Scope and tasks

Define source region/bbox/mask; confidence; threshold; model/checkpoint; inference mode; exclusions; evidence status; next action; intentional-change reference.

## Receiving-party review

Worker 1 confirms the record is serializable; Worker 3 confirms evidence can be shown in the review bench.

## Acceptance evidence

Ledger retains enough information to distinguish `ALLOW`, `WARN`, `BLOCK`, `UNVERIFIED`, `UNSUPPORTED`, and operational failures.

## Risks and non-goals

Collapsing global similarity and local evidence into one magic score; missing denominators.

## Handoff / dependency

P3 runtime and P5 UI must use this ledger, not bespoke fields.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
