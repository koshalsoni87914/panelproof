# PanelProof Prior Work & Asset Disclosure

**Document Version:** 1.0.0  
**Owner:** Worker 03 (Assurance/Narrative)  
**Track:** 04 — Visual Art & Design Assist  
**Date:** 2026-11-17  

---

## 1. Hackathon Eligibility Statement

PanelProof adheres strictly to the pre-built vs. live-built foundation guidelines. We maintain a transparent 50/50 partition:
- **50% Pre-Built Foundation:** Formalized architecture, deterministic policy engine, evidence ledger, calibrated reason-code taxonomy, adversarial test corpus, creator review bench UI prototype, and threat boundaries.
- **50% Live-Built Capability:** Model adapter integration (live VLM / patch embeddings), live sequence propagation, automated repair suggestions, and live end-to-end demo execution.

We explicitly disclose all pre-existing libraries, templates, specifications, datasets, and prompts below.

---

## 2. Reused Software & Libraries

| Package / Tool | Version | License | Purpose in PanelProof | Modification Status |
|---|---|---|---|---|
| **Node.js Built-in Modules** (`node:test`, `node:assert`, `node:fs`, `node:path`, `node:crypto`) | v20+ | MIT | Zero-dependency test runner, ledger serialization, hash verification | Unmodified standard library |
| **Vanilla Web Standards** (HTML5, Modern CSS Grid/Flexbox, ES6 Modules) | Living Standard | W3C / WHATWG | Lightweight, dependency-free Creator Review Bench UI | Custom authored for PanelProof |
| **JSON Schema Standards** | Draft-07 | IETF | Format specification for claims, receipts, and ledgers | Spec utilized as reference |

> [!NOTE]
> PanelProof relies on zero heavy external npm dependencies for its deterministic policy and assurance foundation. This guarantees immediate reproducibility, offline execution in under 20ms, and total immunity from upstream dependency deprecation or network outages during live evaluation.

---

## 3. Dataset & Fixture Disclosures

| Asset / Fixture ID | Source / Provenance | License / Permitted Use | Description |
|---|---|---|---|
| **C-001 (Clean Panel)** | Authored for PanelProof evaluation suite | CC-BY 4.0 | Synthetic comic panel descriptor with valid face, costume, and palette canon |
| **D-001 (Drifted Scar)** | Authored for PanelProof evaluation suite | CC-BY 4.0 | Corrupted character panel with scar on left cheek instead of canonical right cheek |
| **A-001 (Ambiguous Angle)** | Authored for PanelProof evaluation suite | CC-BY 4.0 | Low-confidence profile view fixture testing model abstention boundaries |
| **E-001 (Verifier Unavailable)**| Authored for PanelProof evaluation suite | CC-BY 4.0 | Simulated network timeout and unreachable inference endpoint |
| **I-001 (Inferred Claim Fail)** | Authored for PanelProof evaluation suite | CC-BY 4.0 | Model-inferred claim attempting to block export (tests provenance non-block rule) |
| **L-001 (Locked Face)** | Authored for PanelProof evaluation suite | CC-BY 4.0 | Non-zero pixel mutation in an immutable artist-locked canvas region |
| **M-001 (Missing Reference)** | Authored for PanelProof evaluation suite | CC-BY 4.0 | Panel claiming trait verification where artist reference file is absent |

---

## 4. Model & Prompt Disclosures

| Component | Intended Provider / Architecture | Planned Phase | Provenance & Usage |
|---|---|---|---|
| **Deterministic Policy Engine** | Custom pure JS (`policy/engine.js`) | Pre-built (W2-P2) | 100% deterministic mathematical aggregation; no neural weights |
| **Local Region Invariant** | Hash & SHA-256 Pixel Comparator | Pre-built (W2-P2) | Deterministic buffer comparison |
| **VLM Trait Verifier** | Gemini 1.5 Pro / Flash or CLIP embedding adapter | Live-built (W1-P2, W2-P4) | Planned for live sprint; will use structured schema prompts |

---

## 5. Non-Obscuration Guarantee

1. All git commit timestamps reflect actual authoring time.
2. Commits are not squashed across major phase gates.
3. Every pre-built component is tagged and verifiable via automated offline tests.
