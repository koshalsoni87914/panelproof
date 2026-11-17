# Worker 02 — Continuity Analysis and Policy

## P4 — Calibration and One Model-Backed Signal

**Status:** `PLANNED`  
**Primary owner:** Worker 02  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Add one validated visual signal only if the deterministic baseline is green and the adapter has a clear abstention boundary.

## Entry gate

P2 policy tests and P3 corpus pass offline.

## Scope and tasks

Choose patch similarity, region evidence, or another bounded signal; define preprocessing; sweep thresholds; measure false accept/reject and abstention; document bias and unsupported conditions.

## Receiving-party review

Worker 1 packages the adapter; Worker 3 checks that public language is narrower than the evidence.

## Acceptance evidence

A report includes corpus version, denominators, exclusions, threshold version, model ID, and a repeatability result.

## Risks and non-goals

Treating upstream benchmark numbers as PanelProof thresholds; identity bias; unstable vendor output.

## Handoff / dependency

If this threatens the live sprint, keep fixture adapter as the MVP and mark the model path planned.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
