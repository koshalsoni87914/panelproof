# PanelProof Master Execution Plan

**Mode:** planning-first, evidence-first. **Track:** 04 — Visual Art & Design Assist. **Delivery:** one complete panel-audit vertical slice, followed by bounded repair and sequence workflow.

## Goal

Deliver a creator-facing review bench that takes a character canon and panel image, verifies identity and declared traits, explains failures with evidence crops, and emits a fail-closed receipt.

## Non-goals

No general image editor, no unrestricted autonomous art agent, no claim of perfect visual truth, no required cloud service for the demo, no mobile app, no payments, and no full comic-production suite.

## Build sequence and gates

1. **Preflight:** freeze PanelProof language, Track 04 alignment, verdict vocabulary, and scope.
2. **Contract first:** freeze claim, verdict, receipt, region-lock, and capability schemas.
3. **Fixture vertical slice:** clean panel → verifier → `ACCEPT`; drifted panel → evidence → `BLOCK`; verifier error → `UNVERIFIED`.
4. **Creator review UI:** panel strip, verdict chips, evidence drawer, reference comparison, override-with-reason.
5. **Region Lock:** server-side parent compositing and `locked_pixel_delta == 0` assertion.
6. **Bounded repair:** flagged claim → target region → edit instruction → re-verify, maximum two attempts, accept/revert.
7. **Evaluation:** labelled corpus, recall, false-block rate, abstention rate, latency, and cost.
8. **Demo freeze:** offline replay, clean-clone run, README, video, and truthful capability ledger.

## MVP completeness rule

MVP is complete only when a clean clone can audit one clean fixture, one deliberately drifted fixture, and one verifier-error fixture; produce receipts; show evidence for the drift; and prove the locked-region invariant.

## 50/50 submission split

**Pre-built:** claim schema, deterministic policy, identity/palette verifiers or replay adapters, one-panel review UI, receipts, fixtures, tests, and documentation.

**Build live at the finale:** sequence planning, full trait checklist, SAM/box region targeting, bounded repair loop, branch/revert/compare, export gate, and threshold sweep.

Every live-sprint feature must have a `TODO(live-sprint):` marker and must not be presented as implemented before it exists.
