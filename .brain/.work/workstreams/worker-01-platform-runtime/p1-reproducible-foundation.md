# Worker 01 — Platform, Runtime, and Integration

## P1 — Reproducible Foundation

**Status:** `PLANNED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Make a clean checkout boot, validate its environment, discover fixtures, and execute a deterministic local run without network access.

## Entry gate

P0 contract version exists and the repository has a pinned runtime target.

## Scope and tasks

Pin Node/Python versions; add lockfiles; implement environment check; create fixture loader; add structured logger; inject clock; cap output and execution time; add `verify:foundation`.

## Receiving-party review

Worker 3 runs the command from a clean clone and records the result in a phase-gate report.

## Acceptance evidence

`verify:foundation` passes twice; fixture IDs and run IDs are stable for the same inputs; no network is required.

## Risks and non-goals

Native dependency install failure; platform-specific path behavior; accidental network dependency.

## Handoff / dependency

P2 and P3 use the same fixture loader and artifact layout.

## Required phase-close record

- Changed paths and commit hash.
- Command or test used for acceptance.
- Evidence file, report, screenshot, or recording.
- Known limitations and unsupported cases.
- Updated claims/capability status.
- Receiving reviewer decision: `PASS`, `CONDITIONAL PASS`, or `HOLD`.

## Definition of done

This phase is not complete because the file exists. It is complete only when the acceptance evidence is produced, the receiving reviewer runs the acceptance command, and the capability ledger is updated honestly.
