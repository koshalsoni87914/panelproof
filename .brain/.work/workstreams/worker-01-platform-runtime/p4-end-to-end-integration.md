# Worker 01 — Platform, Runtime, and Integration

## P4 — End-to-End Integration

**Status:** `VERIFIED`  
**Primary owner:** Worker 01  
**Track:** 04 — Visual Art & Design Assist  
**Hackathon role:** Critical MVP

## Objective

Connect intake, evidence adapters, Worker 2 policy, report writing, and Worker 3 review UI into one narrow vertical slice.

## Entry gate

Clean, drifted, and verifier-error fixtures exist; policy API is callable offline.

## Scope and tasks

Wire the command/API; add run status; expose evidence packets to UI; add error mapping; add demo-safe replay; preserve original failed runs; wire live multimodal VLM adapter via Gemini 2.5 Flash with deterministic offline fallback.

## Receiving-party review

Worker 3 executes the creator flow; Worker 2 verifies that UI decisions match policy receipts exactly.

## Acceptance evidence

Clean fixture produces `ALLOW`; drift fixture produces `BLOCK`; verifier-error fixture produces `UNVERIFIED`; fail-closed export gate strictly enforced for `BLOCK` and `UNVERIFIED`; real tamper-evident manifest downloadable. All 10/10 QA tests pass.

## Risks and non-goals

- Real Gemini mode requires `GOOGLE_API_KEY`. Without a key, the demo uses deterministic offline fallback fixtures. Both modes are honestly labelled in UI.
- Generative bounded repair loop and extended 20-panel propagation remain post-MVP roadmap goals.

## Required phase-close record

- **Changed paths:** `adapters/gemini_vlm_adapter.js`, `scripts/demo.js`, `web/index.html`, `web/app.js`, `web/style.css`, `web/tests/test_qa_assurance.js`.
- **Command used for acceptance:** `node --test web/tests/test_qa_assurance.js && node scripts/demo.js --check`
- **Evidence file:** `eval/live_gemini_verification_receipt.json`, `eval/qa_assurance_results.json`
- **Known limitations:** Live Gemini inference requires internet connectivity and valid `GOOGLE_API_KEY`; offline fallback activates automatically when key is missing.
- **Updated capability status:** `Live VLM Multimodal Adapter` -> `VERIFIED`; `Tamper-Evident Manifest Export` -> `VERIFIED`.
- **Receiving reviewer decision:** `PASS`
