# PanelProof Claims Register

| ID | Public Claim | Source & Confidence | Required Evidence | Release Status |
|---|---|---|---|---|
| **CL-01** | PanelProof audits a comic/webtoon panel against an artist-declared character canon. | **HIGH** (Deterministic policy against declared claims) | Claim JSON schema validation, evidence ledger receipt, passing evaluation fixture `C-001`. | `VERIFIED` (50% Pre-built) |
| **CL-02** | PanelProof identifies deliberately corrupted or drifted character traits (e.g. wrong-side scar, inverted hair). | **HIGH** (Local trait verifier bounded thresholds) | Drifted test fixture `D-001`, `TRAIT_SCAR_WRONG_SIDE` reason code, non-zero evidence distance crop. | `VERIFIED` (50% Pre-built) |
| **CL-03** | PanelProof fails closed to `UNVERIFIED` when an adapter or verifier is unavailable or times out. | **HIGH** (Conservative `worstAction` policy gate) | Offline fixture `E-001`, timeout simulation unit test, reason `VERIFIER_TIMEOUT` yielding `UNVERIFIED` verdict. | `VERIFIED` (50% Pre-built) |
| **CL-04** | Locked canvas regions remain strictly bit-identical across generation and editing passes. | **HIGH** (Server-side pixel hash / invariant checker) | Fixture `L-001`, `PIXEL_LOCK_BREACH` reason code, invariant test in `policy/engine.js`. | `VERIFIED` (50% Pre-built) |
| **CL-05** | PanelProof automatically executes a bounded repair loop for localized trait drift. | **MEDIUM** (Live sprint target) | Two-attempt live repair trace, before-and-after re-score delta, fallback to artist notification on failure. | `PLANNED` (Live Sprint) |
| **CL-06** | PanelProof aggregates continuity checks across a multi-panel sequence or strip. | **MEDIUM** (Live sprint target) | Sequence receipt schema, batch evaluation over multi-panel fixture sequence. | `PLANNED` (Live Sprint) |
| **CL-07** | Continuity score predicts narrative or artistic aesthetic quality. | **ZERO** (Unsupported / Prohibited) | None. | **PROHIBITED CLAIM** |
| **CL-08** | Automated verifiers are infallible and replace creator judgment. | **ZERO** (Unsupported / Prohibited) | None. | **PROHIBITED CLAIM** |
| **CL-09** | PanelProof guarantees 100% detection of semantic drift on unseen 3D camera angles. | **ZERO** (Unsupported / Prohibited) | None. Marked as `UNVERIFIED` abstention boundary. | **PROHIBITED CLAIM** |

---

## Controlled Vocabulary & Language Rules

1. **Approved Phrasing:**
   - *"audits panels against artist-declared canon"*
   - *"records auditable evidence in a tamper-evident ledger"*
   - *"flags localized trait drift with calibrated reason codes"*
   - *"fails closed to `UNVERIFIED` upon uncertainty or timeout"*
   - *"preserves locked background/prop pixel invariants"*

2. **Prohibited Phrasing:**
   - *"guarantees character consistency"*
   - *"understands comic art perfectly"*
   - *"eliminates AI hallucinations"*
   - *"judges aesthetic beauty or narrative quality"*
   - *"AI replaces the visual artist"*
