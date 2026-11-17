# Worker 02 — Continuity Analysis and Policy

## P6 — Final Measurement

**Status:** `PLANNED`  
**Primary owner:** Worker 02  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Release/post-event

## Objective

Produce the authoritative evaluation artifact for the release candidate.

## Entry gate

Corpus, thresholds, model/config versions, and commit are frozen.

## Scope and tasks

Run full corpus; compute false accepts, false rejects, abstention, evidence coverage, reproducibility, latency, and cost; write drift report; record exclusions and limitations.

## Receiving-party review

Worker 3 maps measured results to the claims register; Worker 1 confirms report replay.

## Acceptance evidence

Every metric has a denominator and version metadata; no unsupported universal accuracy claim is published.

## Risks and non-goals

Changing thresholds after seeing results without recording it; mixing fixture and live results.

## Handoff / dependency

This phase is a release blocker if claims depend on the measurements.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
