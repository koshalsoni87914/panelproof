# PanelProof

> **Your characters can evolve. Your visual canon stays consistent.**  
> *Track 04: Digital Art & Visual Co-Pilot*  
> *Team: Prompt Pirates — GeNarrative Clash 2026*

---

## What is PanelProof?

**PanelProof** is an evidence-first, fail-closed visual continuity copilot for comic, manga, storyboard, and sequential-art creators. It compares AI-generated panels against an artist-declared visual canon, reports which claims are supported or broken with visual bounding-box evidence, fails closed when evidence is missing or ambiguous, and keeps the artist in complete control of the publication export.

> *PanelProof is a fail-closed AI visual continuity copilot that detects character and style drift across comic, manga, and storyboard panels with evidence-backed verdicts.*

---

## The Problem

When visual artists, webtoon creators, and narrative directors use diffusion or generative image models to produce multi-panel sequences, subtle character details drift uncontrollably:
* **Laterality Flips:** Scars, eyepatches, and hair parts invert across camera angles (left jaw vs. right jaw).
* **Costume Mutations:** Collars, buttons, insignias, and armor plates change or disappear from panel to panel.
* **Palette Drift:** Shading, skin tones, and atmospheric house color swatches desaturate unpredictably.
* **Background Shifts:** Static props and environment assets unexpectedly alter during panel character edits.

Today, artists waste hours repeatedly re-prompting or manually fixing hallucinations in Photoshop because generative diffusion models are probabilistic single-image engines with zero awareness of cross-panel story canon.

---

## Why Existing Image Generation is Insufficient

| Approach / Tool | What It Does | Why It Falls Short for Continuity Verification |
|---|---|---|
| **SAM 3 (Segment Anything 3)** | Promptable object concept segmentation and tracking | Detects and tracks masks, but lacks narrative or canon reasoning. Cannot judge if two stylized faces belong to the same character. |
| **InstantID** | Face-identity conditioning from a single image | Single-reference facial spatial adapter. Cannot verify multi-character panels, costumes, props, or non-face traits. |
| **StoryDiffusion** | Consistent self-attention across image batches | A generation framework, not an independent verifier. A generator cannot be the authority that audits its own output. |
| **PanelProof (Our Solution)** | **Independent fail-closed continuity gate** | Treats declared canon as ground truth, generates auditable evidence receipts, enforces pixel invariants, and fails closed when uncertain. |

---

## How PanelProof Works

PanelProof executes a strict, reproducible pipeline:

```mermaid
flowchart TD
    A["Artist Canon Manifest\n(Claims, Refs, Anchors)"] --> B["Panel Ingestion\n(Target Panel Frame)"]
    B --> C["Evidence Adapters\n(Face Cosine, Trait VLM, Palette ΔE, Pixel Lock)"]
    C --> D["Continuous Evidence Ledger\n(NDJSON Records + Bboxes + Crops)"]
    D --> E["Deterministic Policy Engine\n(worstAction: BLOCK > UNVERIFIED > WARN > ACCEPT)"]
    E --> F{"Gate Decision"}
    F -->|"Kept (ACCEPT)"| G["Export Sequence Permitted"]
    F -->|"Check This (WARN)"| G
    F -->|"Broke Canon (BLOCK)"| H["Export Blocked\n(Explainable Evidence Card)"]
    F -->|"Needs Call (UNVERIFIED)"| H
    H --> I["Artist Review Bench UI"]
    I -->|"Editorial Justification"| J["Cryptographic Creator Override"]
    J --> G
```

### Core Invariants & Policy Semantics

* **Generator and Verifier are Independent:** The image generator cannot approve its own work.
* **Precedence Ordering:** `BLOCK > UNVERIFIED > WARN > ACCEPT`. The worst check dictates the panel verdict.
* **Model-Inferred Claim Boundary:** Claims declared by the artist can `BLOCK`. Claims automatically inferred by AI models may `WARN`, but are strictly forbidden from blocking export.
* **Fail-Closed on Uncertainty:** Verifier timeouts, API network drops, missing reference sheets, or ambiguous occlusions evaluate to `UNVERIFIED` and prevent export unless explicitly overridden by the artist.
* **Pixel Lock Invariant:** Regions designated as locked must satisfy $\text{locked\_pixel\_delta} = 0$. Invariant breaches are strictly non-overridable.

---

## Interactive Demo Flow

The Creator Review Bench guides artists through four essential narrative inspection acts:

1. **Act 1: Clean Baseline Panel (`C-001`) &rarr; `Kept` (`ACCEPT`)**  
   All 4 declared checks pass. Face cosine similarity $0.93 \ge 0.82$, left-jaw scar verified, and palette $\Delta E \le 8.0$.
2. **Act 2: Deliberate Drift (`D-001`) &rarr; `Broke canon` (`BLOCK`)**  
   Adversarial test: scar erroneously flips to the character's RIGHT jaw. The engine catches the laterality inversion (confidence $0.34 < 0.75$), highlights the face crop bounding box, blocks export, and provides corrective prompting guidance.
3. **Act 3: Network / Verifier Timeout (`E-001`) &rarr; `Needs your call` (`UNVERIFIED`)**  
   Simulated verifier timeout after 3000ms. Rather than silently passing an unverified image, the engine fails closed to prevent unverified publication.
4. **Act 4: Locked Region Invariant (`L-001`) &rarr; `Broke canon` (`BLOCK`)**  
   Costume edit accidentally mutated 142 background pixels in a designated static zone. The invariant check flags `LOCKED_PIXELS_VIOLATED`.
5. **Creator Override Protocol:**  
   Artists can provide an editorial justification (e.g. dramatic lighting silhouette or story progression injury) to override non-invariant flags. The override is signed into the audit ledger while preserving machine ground truth.

---

## 50/50 Architecture: Pre-Built vs. Live-Built

PanelProof strictly partitions its codebase into an auditable **50% Pre-Built Foundation** and a **50% Live-Built Capability** in adherence to hackathon rules:

| Layer | 50% Pre-Built Foundation (Completed & Verified) | 50% Live-Built Capability (Completed & Verified Live) |
|---|---|---|
| **Platform / Runtime** | Typed contracts, NDJSON streaming ledger, deterministic clock, structured redactor, offline fixture runner. | **Live Multimodal VLM Adapter (`vlm/gemini-2.5-flash@1`)**, real image input uploaders, HTTP live inference endpoint (`/api/verify-live`). |
| **Policy / Engine** | Conservative `worstAction` engine, provenance guard (inferred claims warn only), override protocol, sequence aggregator. | **Fail-Closed Export Gate** enforcing non-export on both `BLOCK` and `UNVERIFIED` states; regression test QA-10. |
| **Corpus / Evaluation** | 7-case adversarial corpus, operating threshold calibration, automated test harness producing `eval/results.json`. | 100% precision on live multimodal laterality drift detection and fail-closed timeout handling. |
| **Creator UX / Bench** | Responsive side-by-side studio, SVG bounding boxes, human status badges (`Kept`, `Broke canon`), override modal. | **Live Studio Workbench** with 4 judge presets, real file upload, **real downloadable cryptographic audit manifest (`.json`)**, and `localStorage` override persistence. |

Detailed architectural disclosures are available in [docs/fifty_fifty_split.md](docs/fifty_fifty_split.md).

---

## Evaluation Results

> On the seven-case fixture corpus v1, PanelProof reproduced all expected fixture decisions, including clean acceptance, deliberate drift blocking, timeout abstention, and locked-region verification. This is fixture validation, not a universal accuracy claim.

As measured by `eval/runner.js` against `eval/corpus.json`:

* **Corpus Version:** `eval/corpus.json v1.0.0`
* **Total Evaluated Cases:** 7
* **Overall Matching Accuracy:** 100.0% (7 / 7)
* **Wrong-Trait Recall:** 100.0% (2 / 2 deliberate corruptions blocked)
* **Clean Panel False-Block Rate:** 0.0% (0 / 1 clean panels falsely blocked)
* **Abstention Fidelity:** 100.0% (3 / 3 ambiguous/timeout/missing-ref cases failed closed to `UNVERIFIED`)
* **Execution Duration:** $<15\text{ ms}$ (Deterministic offline execution)
* **Measured Artifact:** [eval/results.json](eval/results.json)

---

## Repository Structure

```text
panelproof/
├── .brain/                     # Single source of truth (contracts, runbooks, workstreams, reports)
│   ├── .report/                # Phase gate audit reports and NDJSON ledgers
│   └── .work/                  # Production operating system, roadmaps, and registers
├── packages/
│   └── contracts/              # Typed claim, verdict, envelope, receipt schemas & error classes
├── policy/                     # Deterministic continuity policy engine
│   ├── engine.js               # Conservative decision aggregator & fail-closed rules
│   ├── ledger.js               # NDJSON evidence ledger serializer & denominator tracker
│   ├── reason-codes.js         # Standardized machine reason code taxonomy
│   ├── thresholds.json         # Calibrated decision thresholds
│   └── tests/                  # Engine unit tests (8 passing suites)
├── adapters/                   # Verifier adapter layer (Fixture, Reference, Palette, Mock)
├── runtime/                    # Bounded execution runner, deterministic clock, structured logger
├── fixtures/
│   ├── continuity/             # 7 calibrated adversarial test fixtures (C-001, D-001, etc.)
│   └── runtime/                # Runtime envelope fixture definitions
├── eval/                       # Evaluation harness (runner.js, corpus.json, results.json)
├── web/                        # Creator Review Bench UI
│   ├── index.html              # Main workstation layout & canon banner
│   ├── app.js                  # Review bench controller & overlay renderer
│   ├── style.css               # Studio theme & design tokens
│   ├── data/mock-receipts.js   # Interactive SVG panel fixtures
│   └── tests/                  # Worker 03 assurance & security QA test suite (10 passing tests)
├── scripts/                    # Verification scripts & demo runner
│   ├── demo.js                 # Local demo server & launcher (zero dependencies)
│   ├── run-fixture-audit.js    # Local CLI fixture runner
│   ├── verify-foundation.js    # Runtime environment & logger assertions
│   ├── verify-contracts.js     # Schema validation & error tests
│   ├── verify-adapters.js      # Adapter boundary & timeout tests
│   └── verify-receipts.js      # Receipt generation & ledger tests
├── docs/                       # Boundary documentation & disclosures
│   ├── fifty_fifty_split.md    # Pre-built vs. live-built accounting
│   ├── prior_work_disclosure.md# Reused tools, libraries & citation disclosures
│   └── supported_input_matrix.md # Supported vs. unsupported input conditions
└── package.json                # Project manifest & npm scripts
```

---

## Setup & Quickstart

PanelProof requires **Node.js (v20+)** and has **zero external npm dependencies**. The entire deterministic engine, evaluation harness, and review bench run completely offline.

### 1. Installation
```bash
git clone https://github.com/koshalsoni87914/panelproof.git
cd panelproof
# Zero external packages to install; verifies local workspace
npm install
```

### 2. Run All Automated Verification Suites
```bash
# Runs contract review, foundation, adapters, and receipt runtime checks (100% pass)
npm test

# Runs policy engine unit tests
node --test policy/tests/test_policy.js

# Runs Worker 03 assurance & security QA suite
node --test web/tests/test_qa_assurance.js

# Runs adversarial corpus evaluation benchmark
node eval/runner.js
```

### 3. Run the Local Fixture Audit
```bash
npm run audit:fixtures
```
*Generates verified audit receipts and streamable NDJSON evidence ledgers in `.brain/.report/`.*

### 4. Launch Creator Review Bench (Interactive Demo)
```bash
# Via npm script:
npm run demo

# Or on Windows (1-click launcher):
run_demo.bat
```
*Runs the fixture audit and starts the local review server at **`http://localhost:3000`**.*

You can also open `web/index.html` directly in any web browser without running a server.

---

## Policy Vocabulary & Semantics

| Verdict | Creator Status | Meaning | Action on Export | Override Allowed? |
|---|---|---|---|---|
| `ACCEPT` / `ALLOW` | **Kept** | All declared traits pass threshold; locked pixels identical. | **Export Permitted** | N/A |
| `WARN` | **Check this** | Minor borderline deviation, or model-inferred claim failed. | **Export Permitted** (Creator notice) | N/A |
| `BLOCK` | **Broke canon** | Declared character trait drifted or canonical feature missing. | **Export Blocked** | Yes, with non-empty justification. |
| `BLOCK` (Pixel Lock) | **Broke canon** | Modified pixels detected inside an artist-locked static region. | **Export Blocked** | **STRICTLY PROHIBITED** |
| `UNVERIFIED` | **Needs your call** | Missing reference, verifier timeout, or severe occlusion. | **Export Blocked** (Fail-closed) | Yes, with non-empty justification. |

---

## What PanelProof Claims (and Does Not Claim)

### Supported Claims
* Audits generated panels against an artist-declared character canon.
* Identifies deliberate trait corruptions (e.g. scar on opposite cheek, mismatched costume palette).
* Fails closed when an inference endpoint times out or reference art is absent.
* Enforces strict pixel invariants for background / prop assets across edits ($\text{locked\_pixel\_delta} = 0$).
* Preserves machine audit ground truth even when human creator overrides are recorded.

### Prohibited / Non-Claims
* **Does not claim** to "guarantee" artistic consistency or replace human illustrators.
* **Does not claim** to judge narrative or aesthetic quality.
* **Does not claim** 100% autonomous 3D spatial reconstruction; occluded views gracefully abstain to `UNVERIFIED`.
* **Does not claim** to detect all continuity errors without an artist-declared canon.

See [docs/supported_input_matrix.md](docs/supported_input_matrix.md) and [docs/prior_work_disclosure.md](docs/prior_work_disclosure.md) for complete boundary disclosures.

---

## Disclosures & Provenance

* **Runtime & Dependencies:** Pure vanilla Node.js standard library (`http`, `fs`, `path`, `child_process`, `test`, `assert`). Zero production npm dependencies.
* **Test Fixture Assets:** Hand-crafted SVG vector story panels designed specifically for PanelProof's Karan character canon.
* **Prior Art & Citations:** Built upon research principles from SAM 3 (concept segmentation), InstantID (facial conditioning), and MockGuard (fail-closed verification gates). See [docs/prior_work_disclosure.md](docs/prior_work_disclosure.md).
* **Demo Video:** [Watch PanelProof Demo Walkthrough](https://youtu.be/placeholder) *(To be recorded during live sprint)*
* **License:** MIT License. Built for GeNarrative Clash 2026.
