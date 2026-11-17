# Worker 02 — Continuity Analysis and Policy Workstream

## Mission

Define what PanelProof can responsibly check and convert evidence into an explainable, calibrated decision. This worker owns the boundary between a useful signal and an unsupported claim.

## Exclusive paths

`policy/`, `analysis/`, `corpus/`, `fixtures/continuity/`, `eval/`, threshold configuration, and analysis sections of `docs/`.

## Phases

### W2-P0 — Continuity boundary
**Build:** manifest schema for entities, traits, props, palettes, style anchors, panel order, intentional changes, reference requirements, and unsupported conditions.  
**Exit:** every MVP check has a positive case, a negative case, an ambiguity rule, and a reason code.

### W2-P1 — Evidence ledger design
**Build:** per-check evidence record with source region, confidence, threshold, model/checkpoint, inference mode, exclusions, and status. Keep global similarity separate from local/semantic evidence.  
**Exit:** Worker 1 can serialize the ledger without losing uncertainty or denominator information.

### W2-P2 — Deterministic policy engine
**Build:** `ALLOW`, `WARN`, `BLOCK`, `UNVERIFIED`, `BASELINE_FAILED`, `TIMEOUT`, `UNSUPPORTED`, and `COMPILE_ERROR` semantics; conservative aggregation; override policy; no network calls.  
**Exit:** unit tests cover every ordering and every fail-closed condition.

### W2-P3 — Adversarial corpus and calibration
**Build:** known-good, allowed intentional change, identity break, costume/prop break, palette/style break, order break, ambiguous, missing-reference, unsupported, malformed, and timeout fixtures.  
**Exit:** corpus report includes denominators, exclusions, corpus version, threshold version, and false-accept/false-reject/abstention/coverage metrics.

### W2-P4 — One model-backed signal
**Build:** implement only one validated adapter path if time permits, such as patch similarity or region evidence. Record limitations; do not combine model signals into a magic score.  
**Exit:** adapter has a calibration slice and a documented abstention boundary.

### W2-P5 — Live sprint policy extension
**Build:** sequence-level aggregation or a repair-target decision. The extension must improve a visible failure mode and remain bounded.  
**Exit:** before/after corpus result plus a live trace and rollback behavior.

### W2-P6 — Final measurement
**Build:** run exact release corpus and produce `drift_report.json` or equivalent with all version metadata.  
**Exit:** Worker 3 accepts the claims register wording against the measured report.

## Loop Engineering Protocol (Work → Test → Update → Work → Finalized)

Every continuity policy and evaluation phase must be delivered via this five-stage engineering cycle:
1. **Work:** Define continuity schemas, trait/anchor definitions, evidence ledger schemas, and threshold configurations.
2. **Test:** Run against the adversarial corpus (known-good, intentional changes, identity breaks, missing references, edge-case ambiguities).
3. **Update:** Calibrate numerical thresholds, eliminate false positives/negatives, refine reason codes, and adjust fail-closed boundaries.
4. **Work (Re-verify):** Re-run calibration metrics, recalculate precision/recall denominators, and ensure conservative aggregation rules hold.
5. **Finalized:** Freeze threshold configs, export `drift_report.json`, seal policy version, and sign formal handoff to Worker 1 and Worker 3.

## Definition of done

Worker 2 is done only when PanelProof can say “not enough evidence” honestly and can show why a known-bad fixture was blocked without claiming universal visual truth.
