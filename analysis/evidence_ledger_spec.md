# PanelProof Evidence Ledger Specification (W2-P1)

## Overview

The Evidence Ledger records granular, check-level receipts for every continuity evaluation. It guarantees that verdicts are verifiable, auditable, and replayable from commit/config/corpus tuples without collapsing multiple distinct visual signals into a single opaque similarity score.

## Record Schema

Each check produces an `EvidenceRecord`:

```json
{
  "panel": "p04",
  "nodeId": "p04_v1",
  "claim": "trait.scar.side",
  "claimLabel": "Scar on the LEFT jaw",
  "severity": "block",
  "source": "artist-declared",
  "verdict": "BLOCK",
  "reasonCode": "DRIFT_TRAIT_MISMATCH",
  "verifier": "gemini-3-flash/vision",
  "confidence": 0.34,
  "threshold": 0.75,
  "observed": "scar appears on the character's RIGHT jaw",
  "evidence": {
    "crop": "nodes/p04_v1/crop_face.jpg",
    "bbox": [412, 180, 596, 352]
  },
  "latencyMs": 806,
  "costUsd": 0.00041,
  "ts": "2026-11-17T20:41:19+05:30"
}
```

## Ledger Serialization & Preservation

* **Line-Delimited JSON (NDJSON):** Streamable, append-only, and easily parsed by downstream runtimes and review UIs.
* **Preservation of Uncertainty:** Missing references, timeouts, and unverified states retain their exact error payloads rather than empty booleans.
* **Separation of Global & Local Signals:** Global palette metrics ($\Delta E$) are stored distinctly from local landmark crops (face identity cosine and trait crops).
