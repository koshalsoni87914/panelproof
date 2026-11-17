# Worker 01 — Platform, Runtime, and Integration Workstream

## Mission

Build the boring, reliable spine that lets the continuity policy run repeatedly, offline, and with evidence. The worker is measured by reproducibility and bounded failure, not by the number of model providers integrated.

## Exclusive paths

`apps/`, `packages/contracts/`, `runtime/`, `adapters/`, `scripts/`, `fixtures/runtime/`, package manifests, lockfiles, and runtime sections of `docs/`.

## Phases

### W1-P0 — Runtime contract review [STATUS: TESTED / VERIFIED]
**Input:** interface contracts, threat model, event constraints.  
**Build:** run envelope, IDs, hashes, schema versioning, adapter interface.  
**Exit:** malformed input and version mismatch are rejected with typed reasons; Worker 2 signs the handoff.

### W1-P1 — Reproducible foundation [STATUS: TESTED / VERIFIED]
**Build:** pinned Node/Python versions, environment check, fixture loader, deterministic clock injection, structured logger, bounded worker execution, and local artifact directory.  
**Exit command:** `npm run verify:foundation` or equivalent proves clean install, schema validation, and fixture discovery.

### W1-P2 — Evidence adapter layer [STATUS: TESTED / VERIFIED]
**Build:** deterministic manifest/reference/order adapters first; optional DINO/segmentation/vision adapters behind the same interface. Persist model ID, inference mode, preprocessing, latency, cost, and failure reason.  
**Exit:** adapters never return a bare boolean; they return evidence or an explicit non-pass state.

### W1-P3 — Receipt and report runtime [STATUS: TESTED / VERIFIED]
**Build:** NDJSON evidence ledger, panel decision receipt, report schema validator, artifact hashing, retry/cancellation, timeout, and redacted logs.  
**Exit:** one command produces a replayable report with no secrets or absolute private paths.

### W1-P4 — Integration vertical slice
**Build:** connect intake → adapter → Worker 2 policy → report → Worker 3 review UI. Keep the policy callable without network.  
**Exit:** clean, drifted, and verifier-error fixtures pass the end-to-end acceptance command.

### W1-P5 — Live sprint extension
**Build:** choose one only: sequence-state propagation or bounded repair with immutable child nodes and re-verification. Do not build both if either threatens the demo freeze.  
**Exit:** live commit hash, trace, failure path, and rollback proof are recorded.

### W1-P6 — Release hardening
**Build:** packaging allowlist, lockfile audit, dependency health, clean-clone script, and offline fallback.  
**Exit:** Worker 3 completes release gate twice from a clean state.

## Loop Engineering Protocol (Work → Test → Update → Work → Finalized)

Every platform and runtime capability must be delivered via this five-stage engineering cycle:
1. **Work:** Scaffold or implement domain contracts, adapters, NDJSON streaming, CLI commands, or runtime runners.
2. **Test:** Run contract schema tests, offline fixture replay, timeout boundaries, and deterministic clock checks.
3. **Update:** Remediate malformed JSON handling, redact sensitive paths/secrets, patch adapter boundaries, and fix serialization flaws.
4. **Work (Re-verify):** Re-run the full integration suite, verify idempotent outputs, and guarantee zero network dependency in offline mode.
5. **Finalized:** Commit verified code, record cryptographic hashes, generate reproducible receipts, and issue formal handoff to Worker 2 and Worker 3.

## Definition of done

Worker 1 is done only when runtime evidence can be replayed from a commit/config/corpus tuple and live failures resolve to explicit non-pass states.
