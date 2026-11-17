# PanelProof Continuity Boundary Specification (W2-P0)

## Overview

The continuity boundary defines what PanelProof responsibly checks, what counts as intentional variance, how ambiguity is handled, and what conditions are explicitly unsupported.

## 1. Anchor Types

PanelProof evaluates four distinct visual continuity anchors:

| Anchor | Description | Evaluator | Severity |
|---|---|---|---|
| **Identity Anchor** | Facial landmark structure, bone proportions, eye placement. | Facial embedding cosine similarity | `BLOCK` (Artist-declared) |
| **Trait Anchor** | Scars, piercings, distinctive hair streaks, laterality (left vs right jaw). | Localized attribute VLM check | `BLOCK` (Artist-declared) |
| **Costume Anchor** | Garments, armor, insignia, button arrangements. | Semantic attribute VLM check | `WARN` / `BLOCK` |
| **Palette Anchor** | Lighting atmosphere, skin tone balance, house color plate fidelity. | CIELAB $\Delta E$ color difference | `WARN` / `BLOCK` |

## 2. Intentional Changes vs. Hallucinatory Drift

A comic character's appearance changes throughout a story (injuries, wardrobe changes, night scenes).
PanelProof distinguishes deliberate narrative progression from AI hallucination:
* **Artist Canon:** If a change is declared in the panel script (e.g. "Karan takes off his coat in scene 2"), the policy marks this as `ACCEPT_INTENTIONAL_CHANGE`.
* **Undeclared Variance:** If a trait unexpectedly shifts without declared script rationale (e.g., a facial scar jumps from the left jaw to the right jaw), the policy flags `DRIFT_TRAIT_MISMATCH` and triggers `BLOCK`.

## 3. Ambiguity & Fail-Closed Semantics

Vision models frequently struggle with extreme angles, heavy occlusions, or dramatic shadow.
* **No False Precision:** PanelProof never converts uncertainty into a high-confidence guess.
* If a verifier reports occlusion, extreme perspective, or low resolution, the check evaluates to `UNVERIFIED` with `UNVERIFIED_AMBIGUOUS_VIEW`.
* In fail-closed mode (`abstentionFailsGate: true`), an unverified panel cannot be exported without an explicit artist override.

## 4. Model-Inferred Claims Boundary

To protect artists from model hallucination:
* Any claim flagged as `source: "model-inferred"` (e.g. automatically tagged by an intake model) is restricted to `severity: "warn"`.
* If a model-inferred claim fails, the policy strictly forbids blocking: the verdict is downgraded to `WARN` with `WARN_INFERRED_CLAIM_FAILED`.
