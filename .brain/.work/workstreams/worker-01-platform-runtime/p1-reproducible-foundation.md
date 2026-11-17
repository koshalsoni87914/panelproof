# Worker 01 — Platform, Runtime, and Integration

## P1 — Reproducible Foundation

**Status:** `VERIFIED`  
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

- **Changed paths and commit hash:** `package.json`, `runtime/env.js`, `runtime/clock.js`, `runtime/logger.js`, `runtime/fixtures.js`, `runtime/runner.js`, `scripts/verify-foundation.js`, `fixtures/runtime/fixtures.json` (Commit: `206eb3e`).
- **Command or test used for acceptance:** `npm run verify:foundation` (passed twice cleanly with 0 errors).
- **Evidence file, report, screenshot, or recording:** `.brain/.report/w1_p0_p3_phase_gate_report.md`.
- **Known limitations and unsupported cases:** Node >= 20.0.0 required; platform-specific path separators normalized to POSIX slashes in logs.
- **Updated claims/capability status:** `runtime.reproducible_foundation`: `RELEASED` / `VERIFIED`.
- **Receiving reviewer decision:** `PASS`.

## Definition of done

Completed and verified. All acceptance evidence produced, passing twice under deterministic clock and offline sandbox without external network calls.
