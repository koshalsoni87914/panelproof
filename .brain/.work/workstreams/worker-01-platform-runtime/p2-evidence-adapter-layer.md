# Worker 01 — Platform, Runtime, and Integration

## P2 — Evidence Adapter Layer

**Status:** `VERIFIED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Expose deterministic and optional model-backed evidence through one typed interface without allowing adapters to decide the final verdict.

## Entry gate

Manifest and evidence-ledger fields from Worker 2 are accepted.

## Scope and tasks

Implement order/reference/hash checks; add adapter registry; add fixture adapter; add optional model adapter boundary; capture model ID, inference mode, preprocessing, latency, cost, and failure reason.

## Receiving-party review

Worker 2 validates that adapter output preserves confidence, exclusions, and uncertainty.

## Acceptance evidence

Every adapter returns evidence or an explicit `TIMEOUT`, `UNSUPPORTED`, `UNVERIFIED`, or schema-error state; no adapter returns a bare boolean.

## Risks and non-goals

Model SDK instability; inconsistent image preprocessing; vendor response changes.

## Handoff / dependency

P4 policy consumes the adapter contract; live adapters remain optional for the MVP.

## Required phase-close record

- **Changed paths and commit hash:** `adapters/base.js`, `adapters/registry.js`, `adapters/fixture_adapter.js`, `adapters/reference_adapter.js`, `adapters/palette_adapter.js`, `adapters/mock_model_adapter.js`, `scripts/verify-adapters.js` (Commit: `206eb3e`).
- **Command or test used for acceptance:** `npm run verify:adapters` (passed with all 6 adapter checks green).
- **Evidence file, report, screenshot, or recording:** `.brain/.report/w1_p0_p3_phase_gate_report.md`.
- **Known limitations and unsupported cases:** Real Vision APIs (InsightFace/Gemini Live) operate behind adapters; live network calls are stubbed in offline fixture mode.
- **Updated claims/capability status:** `runtime.adapters`: `RELEASED` / `VERIFIED`.
- **Receiving reviewer decision:** `PASS`.

## Definition of done

Completed and verified. All adapters emit typed evidence packets with latency and cost tracking, never return bare booleans, and produce explicit non-pass states on error/timeout.
