# PanelProof

> **Deterministic Continuity Assurance for Visual Storytelling**  
> *Track 04: Visual Art & Design Assist*

---

## What is PanelProof?

When visual artists, comic creators, and webtoon studios use generative image pipelines to produce multi-panel narratives, subtle character details drift uncontrollably: scars flip cheeks, costume details mutate, hair parts invert, and palettes desaturate across panels.

**PanelProof** is an audit and assurance layer for narrative sequential art. It compares generated comic panels against an artist-declared character canon, checks trait and palette invariants, produces an auditable cryptographic evidence ledger, and fails closed whenever verification is ambiguous or unavailable.

---

## 50/50 Architecture: Pre-Built vs. Live-Built

PanelProof strictly partitions its implementation into an auditable **50% Pre-Built Foundation** and a **50% Live-Built Capability** in adherence to hackathon competition rules:

```
+-----------------------------------------------------------------------------------+
|                        50% PRE-BUILT FOUNDATION (VERIFIED)                        |
|                                                                                   |
|  [Deterministic Policy Engine]     [Cryptographic Evidence Ledger]                |
|  - Conservative worstAction()      - Immutable check records with bboxes          |
|  - Fail-closed gate logic          - NDJSON serialization & summary denominators  |
|  - Pixel invariant validator       - Zero-network, offline mathematical core      |
|                                                                                   |
|  [Creator Review Bench UI]         [Adversarial Evaluation Corpus]                |
|  - Visual side-by-side studio      - 7 calibrated adversarial test fixtures       |
|  - Reason code microcopy           - 100% recall on trait corruptions             |
|  - Creator override protocol       - 0% false block on clean canonical panels     |
|                                                                                   |
|  [Assurance & Security Suite]      [Threat & Claims Boundary]                     |
|  - Path traversal & secret scanner - Controlled vocabulary (no hype claims)       |
|  - Schema & payload validators     - Explicit supported input matrix              |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                         50% LIVE-BUILT CAPABILITY (SPRINT)                        |
|                                                                                   |
|  - Live Gemini 1.5 Pro / Flash Multimodal Vision Adapter (W1-P2, W2-P4)           |
|  - Multi-Panel Narrative Sequence Propagation & Coherence Tracking (W1-P4)       |
|  - Bounded Inpainting Repair Loop with Automated Re-scoring (W1-P5)              |
|  - Live Studio Deployment & Live Rehearsal Recording (W3-P4, W3-P5)               |
+-----------------------------------------------------------------------------------+
```

Detailed architectural mapping is documented in [docs/fifty_fifty_split.md](file:///c:/Users/Amit%20Das/OneDrive/Desktop/Panel%20Proof/docs/fifty_fifty_split.md).

---

## Quickstart & Local Verification

PanelProof requires **Node.js (v20+)** and has **zero external npm dependencies**. The entire deterministic engine, evaluation harness, and review bench run completely offline.

### 1. Verify Policy Engine Unit Tests
Runs 8 deterministic unit tests verifying verdict precedence, fail-closed timeouts, locked pixel invariants, and creator overrides:
```bash
node --experimental-default-type=module --test policy/tests/test_policy.js
```

### 2. Run Adversarial Corpus Evaluation
Evaluates 7 adversarial fixtures (`C-001` clean panel, `D-001` flipped scar, `L-001` pixel invariant breach, `E-001` timeout, `A-001` ambiguous angle, `M-001` missing reference, `I-001` model-inferred claim):
```bash
node --experimental-default-type=module eval/runner.js
```
*Current benchmark: 100% wrong-trait recall, 0.0% clean false blocks, <15ms execution.*

### 3. Run Worker 03 Assurance & Security QA Suite
Validates schema compliance, secret leakage prevention, path traversal defense, and UI semantic fidelity:
```bash
node --experimental-default-type=module --test web/tests/test_qa_assurance.js
```

### 4. Launch Creator Review Bench UI
Open `web/index.html` directly in any modern web browser, or serve statically:
```bash
# Optional local static preview:
npx serve web
```
The Review Bench operates in **Offline / Fixture Simulation Mode**, allowing artists to inspect reference vs target panels, toggle bounding box overlays, review trait scores against calibrated thresholds, and exercise the creator override protocol.

---

## Policy Vocabulary & Semantics

| Verdict | Meaning | Action on Export | Override Allowed? |
|---|---|---|---|
| `ALLOW` | All declared traits pass threshold; locked pixels identical. | Export permitted. | N/A |
| `WARN` | Minor borderline deviation, or model-inferred claim deviation. | Export permitted with creator notice. | N/A |
| `BLOCK` | Declared character trait drifted or canonical feature missing. | **Export blocked.** | Yes, with non-empty justification. |
| `BLOCK` (Pixel Lock) | Modified pixels detected inside an artist-locked static region. | **Export blocked.** | **STRICTLY PROHIBITED.** |
| `UNVERIFIED` | Missing reference, verifier timeout, or severe occlusion. | **Export blocked (fail-closed).** | Yes, with non-empty justification. |

---

## What PanelProof Claims (and Does Not Claim)

### Supported Claims
- Audits generated panels against an artist-declared character canon.
- Identifies deliberate trait corruptions (e.g. scar on opposite cheek, mismatched costume palette).
- Fails closed when an inference endpoint times out or reference art is absent.
- Enforces strict pixel invariants for background / prop assets across edits.

### Prohibited / Non-Claims
- **Does not claim** to "guarantee" artistic consistency or replace human illustrators.
- **Does not claim** to judge narrative or aesthetic quality.
- **Does not claim** 100% autonomous 3D spatial reconstruction; occluded views gracefully abstain to `UNVERIFIED`.

See [docs/supported_input_matrix.md](file:///c:/Users/Amit%20Das/OneDrive/Desktop/Panel%20Proof/docs/supported_input_matrix.md) and [docs/prior_work_disclosure.md](file:///c:/Users/Amit%20Das/OneDrive/Desktop/Panel%20Proof/docs/prior_work_disclosure.md) for complete boundary disclosures.
