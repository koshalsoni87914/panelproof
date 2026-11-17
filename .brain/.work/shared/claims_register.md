# PanelProof Claims Register

| ID | Public Claim | Source & Confidence | Required Evidence | Release Status |
|---|---|---|---|---|
| **CL-01** | PanelProof audits a comic/webtoon panel against an artist-declared character canon. | **HIGH** (Deterministic policy against declared claims) | Claim JSON schema validation, evidence ledger receipt, passing evaluation fixture `C-001`. | `VERIFIED` (50% Pre-built) |
| **CL-02** | PanelProof identifies deliberately corrupted or drifted character traits (e.g. wrong-side scar, inverted hair). | **HIGH** (Local trait verifier bounded thresholds) | Drifted test fixture `D-001`, `TRAIT_SCAR_WRONG_SIDE` reason code, non-zero evidence distance crop. | `VERIFIED` (50% Pre-built) |
| **CL-03** | PanelProof fails closed to `UNVERIFIED` when an adapter or verifier is unavailable or times out. | **HIGH** (Conservative `worstAction` policy gate) | Offline fixture `E-001`, timeout simulation unit test, reason `VERIFIER_TIMEOUT` yielding `UNVERIFIED` verdict. | `VERIFIED` (50% Pre-built) |
| **CL-04** | Locked canvas regions remain strictly bit-identical across generation and editing passes. | **HIGH** (Server-side pixel hash / invariant checker) | Fixture `L-001`, `PIXEL_LOCK_BREACH` reason code, invariant test in `policy/engine.js`. | `VERIFIED` (50% Pre-built) |
| **CL-05** | PanelProof automatically executes a bounded repair loop for localized trait drift. | **MEDIUM** (Post-MVP Roadmap) | Two-attempt live repair trace, before-and-after re-score delta, fallback to artist notification on failure. | `PLANNED` |
| **CL-06** | PanelProof aggregates continuity checks across a multi-panel sequence or strip. | **MEDIUM** (Post-MVP Roadmap) | Sequence receipt schema, batch evaluation over multi-panel fixture sequence. | `PLANNED` |
| **CL-07** | Continuity score predicts narrative or artistic aesthetic quality. | **ZERO** (Unsupported / Prohibited) | None. | **PROHIBITED CLAIM** |
| **CL-08** | Automated verifiers are infallible and replace creator judgment. | **ZERO** (Unsupported / Prohibited) | None. | **PROHIBITED CLAIM** |
| **CL-09** | PanelProof guarantees 100% detection of semantic drift on unseen 3D camera angles. | **ZERO** (Unsupported / Prohibited) | None. Marked as `UNVERIFIED` abstention boundary. | **PROHIBITED CLAIM** |
| **CL-10** | PanelProof executes real multimodal VLM visual verification via Gemini 2.5 Flash with fallback to offline fixtures when unconfigured. | **HIGH** (Multimodal VLM Adapter + Fail-closed gate) | Live Gemini adapter `adapters/gemini_vlm_adapter.js`, `/api/verify-live`, and committed evidence receipt `eval/live_gemini_verification_receipt.json`. | `VERIFIED` (Live MVP) |
| **CL-11** | PanelProof generates a downloadable tamper-evident audit manifest with SHA-256 integrity hashes of input assets and decisions. | **HIGH** (Canonical server export endpoint) | `/api/export-manifest` returning typed audit report schema with Merkle hash. | `VERIFIED` (Live MVP) |

---

## Controlled Vocabulary & Language Rules

1. **Approved Phrasing:**
   - *"audits panels against artist-declared canon"*
   - *"records auditable evidence in a tamper-evident ledger"*
   - *"flags localized trait drift with calibrated reason codes"*
   - *"fails closed to `UNVERIFIED` upon uncertainty or timeout"*
   - *"preserves locked background/prop pixel invariants"*
   - *"provides live multimodal VLM verification via Gemini 2.5 Flash with offline fallback"*

2. **Prohibited Phrasing:**
   - *"guarantees character consistency"*
   - *"understands comic art perfectly"*
   - *"eliminates AI hallucinations"*
   - *"judges aesthetic beauty or narrative quality"*
   - *"cryptographically signed ledger" (use "tamper-evident audit manifest" unless asymmetric key signing is enabled)*
   - *"AI replaces the visual artist"*
