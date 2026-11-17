# Worker 02 — Continuity Analysis and Policy

## P3 — Adversarial Corpus and Fixture Labels

**Status:** `PLANNED`  
**Primary owner:** Worker 02  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Create a small but meaningful corpus that exposes false accepts, false rejects, and abstention behavior.

## Entry gate

Deterministic fixture runner and manifest schema work.

## Scope and tasks

Add known-good; allowed intentional change; identity break; costume/prop break; palette/style break; order break; ambiguous; missing-reference; unsupported; malformed; timeout cases.

## Receiving-party review

Worker 3 reviews whether each case can be demoed and whether labels are honest.

## Acceptance evidence

Each fixture has ID, label, expected reason code, reference conditions, exclusions, and whether evidence is fixture-backed or model-backed.

## Risks and non-goals

Too few cases to calibrate; ambiguous labels; accidental leakage between train/demo and evaluation fixtures.

## Handoff / dependency

P6 measurement and the claims register must reference corpus version.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
