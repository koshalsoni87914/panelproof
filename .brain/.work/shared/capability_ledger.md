# PanelProof Capability Ledger

| Capability | Status | Verified Evidence & Proof | Owner |
|---|---|---|---|
| **Claim schema and validation** | `VERIFIED` | 10/10 assertions passing in `web/tests/test_qa_assurance.js` (QA-01 schema check). | Worker 3 |
| **`worstAction()` deterministic policy** | `VERIFIED` | 8/8 tests passing in `policy/tests/test_policy.js`. | Worker 2 |
| **Identity verifier baseline** | `VERIFIED` | Fixture `C-001` vs `A-001` in `eval/runner.js`. | Worker 2 |
| **Palette/style verifier baseline** | `VERIFIED` | DeltaE assertion in `fixtures/continuity/C-001-clean-panel.json`. | Worker 2 |
| **Trait VLM verifier baseline** | `VERIFIED` | Adversarial flipped-scar fixture `D-001` in `eval/runner.js`. | Worker 2 |
| **Evidence receipt & ledger writer** | `VERIFIED` | Serializer and summary metrics passing in `policy/ledger.js`. | Worker 2 |
| **Creator Review Bench UI** | `VERIFIED` | Interactive workstation in `web/` with live studio, 4 judge presets, dual modes, and override protocol. | Worker 3 |
| **Region Pixel Lock** | `VERIFIED` | Strict non-zero delta assertion (`L-001`) in `policy/engine.js`. | Worker 2 |
| **Security & Threat Boundary** | `VERIFIED` | Secret scan, path traversal, payload size, and fail-closed gate regression in `web/tests/test_qa_assurance.js` (10/10 pass). | Worker 3 |
| **Evaluation Harness & Corpus** | `VERIFIED` | 7/7 corpus cases passing with 100% recall in `eval/results.json`. | Worker 2 |
| **50/50 Architecture Boundary** | `VERIFIED` | Audited split and disclosure in `docs/fifty_fifty_split.md`. | Worker 3 |
| **Live VLM Multimodal Adapter** | `VERIFIED` | Live Gemini 2.5 Flash multimodal adapter in `adapters/gemini_vlm_adapter.js`, verified with real API receipt in `eval/live_gemini_verification_receipt.json`. | Worker 1 |
| **Fail-Closed Gate Enforcement** | `VERIFIED` | UI blocks export for both `BLOCK` and `UNVERIFIED`; regression test QA-10 passing in `web/tests/test_qa_assurance.js`. | Worker 2 |
| **Tamper-Evident Manifest Export** | `VERIFIED` | Server-canonical `/api/export-manifest` produces SHA-256 tamper-evident JSON audit download. | Worker 1 |
| **Bounded repair loop** | `PLANNED` | Two-attempt live inpainting trace with re-score delta (Post-MVP roadmap). | Worker 1 |
| **Live sequence propagation** | `PLANNED` | Multi-panel batch evaluation over extended 12+ panel chapters (Post-MVP roadmap). | Worker 1 |

*Updated: 2026-11-17 following completion of Live Multimodal VLM Adapter, Fail-Closed Export Gate, and Tamper-Evident Manifest Export milestones.*
