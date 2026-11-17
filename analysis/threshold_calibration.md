# PanelProof Threshold Calibration & Operating Point Analysis (W2-P3)

## Objective

Calibrate decision thresholds on the adversarial corpus (`eval/corpus.json`) to maximize wrong-trait recall on deliberate corruptions while maintaining a 0% false-block rate on clean panels.

## 1. Operating Point Selection

| Signal | Metric | Swept Range | Chosen Operating Point | Rationale |
|---|---|---|---|---|
| **Face Identity** | Cosine Similarity | `[0.70, 0.76, 0.82, 0.86, 0.90]` | **`0.82`** | 0.82 cleanly separates cross-angle reference matches ($>0.90$) from lookalike characters ($<0.75$). |
| **Attribute / Trait** | VLM Confidence | `[0.60, 0.70, 0.75, 0.85]` | **`0.75`** | Laterality (left vs right) produces high confidence ($>0.85$) on correct side and low ($<0.40$) on inverted side. 0.75 avoids false blocks under minor shading. |
| **Palette Drift** | CIELAB $\Delta E$ | `[4.0, 6.0, 8.0, 10.0, 12.0]` | **`8.0`** | Standard print threshold for acceptable perceptual color shift under varying lighting. |

## 2. Evaluation Results on Corpus v1

As measured by `eval/runner.js` against `eval/corpus.json`:

* **Total Test Cases:** 7
* **Overall Accuracy:** 100.0%
* **Wrong-Trait Recall:** 100.0% (Corruptions caught: 2 / 2)
* **Clean Panel False-Block Rate:** 0.0% (0 / 1)
* **Abstention Fidelity:** 100.0% (3 / 3 ambiguous/timeout/missing-ref cases correctly failed closed)
* **Execution Duration:** $<15\text{ ms}$ (Deterministic offline execution)
