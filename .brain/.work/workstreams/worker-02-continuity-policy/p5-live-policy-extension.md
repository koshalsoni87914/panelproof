# Worker 02 — Continuity Analysis and Policy

## P5 — Live Sprint Policy Extension

**Status:** `PLANNED`  
**Primary owner:** Worker 02  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Live sprint

## Objective

Make the live contribution visible by adding sequence-level propagation or repair-target selection.

## Entry gate

Baseline policy and pre-event tag are preserved.

## Scope and tasks

Implement one extension; update reason codes and receipts; add before/after fixtures; add rollback and unresolved cases; record changed thresholds/config.

## Receiving-party review

Worker 1 validates runtime integration; Worker 3 validates the demo narrative and capability wording.

## Acceptance evidence

The extension improves one measured failure mode and never converts an unresolved case into a pass.

## Risks and non-goals

Overfitting one demo image; adding a second uncalibrated model; losing the fail-closed invariant.

## Handoff / dependency

P8 claims may mention only measured behavior of the selected extension.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
