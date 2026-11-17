# PanelProof Capability Ledger

| Capability | Status | Verified Evidence & Proof | Owner |
|---|---|---|---|
| **Claim schema and validation** | `VERIFIED` | 9/9 assertions passing in `web/tests/test_qa_assurance.js` (QA-01 schema check). | Worker 3 |
| **`worstAction()` deterministic policy** | `VERIFIED` | 8/8 tests passing in `policy/tests/test_policy.js`. | Worker 2 |
| **Identity verifier baseline** | `VERIFIED` | Fixture `C-001` vs `A-001` in `eval/runner.js`. | Worker 2 |
| **Palette/style verifier baseline** | `VERIFIED` | DeltaE assertion in `fixtures/continuity/C-001-clean-panel.json`. | Worker 2 |
| **Trait VLM verifier baseline** | `VERIFIED` | Adversarial flipped-scar fixture `D-001` in `eval/runner.js`. | Worker 2 |
| **Evidence receipt & ledger writer** | `VERIFIED` | Serializer and summary metrics passing in `policy/ledger.js`. | Worker 2 |
| **Creator Review Bench UI** | `VERIFIED` | Interactive workstation in `web/` with panel strip, side-by-side SVG overlays, and override protocol. | Worker 3 |
| **Region Pixel Lock** | `VERIFIED` | Strict non-zero delta assertion (`L-001`) in `policy/engine.js`. | Worker 2 |
| **Security & Threat Boundary** | `VERIFIED` | Secret scan, path traversal, payload size in `web/tests/test_qa_assurance.js`. | Worker 3 |
| **Evaluation Harness & Corpus** | `VERIFIED` | 7/7 corpus cases passing with 100% recall in `eval/results.json`. | Worker 2 |
| **50/50 Architecture Boundary** | `VERIFIED` | Audited split and disclosure in `docs/fifty_fifty_split.md`. | Worker 3 |
| **Bounded repair loop** | `PLANNED` | Two-attempt live inpainting trace with re-score delta (Live Sprint). | Worker 1 |
| **Live sequence propagation** | `PLANNED` | Multi-panel batch evaluation over live generated assets (Live Sprint). | Worker 1 |
| **Live VLM adapter integration** | `PLANNED` | Live Gemini 1.5 Pro / Flash vision adapter pipeline (Live Sprint). | Worker 1 |

*Updated: 2026-11-17 following completion of Worker 2 and Worker 3 50% Foundation milestones.*
