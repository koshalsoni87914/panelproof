# PanelProof Supported Input Matrix

**Document Version:** 1.0.0  
**Owner:** Worker 03 (Assurance/Narrative)  
**Date:** 2026-11-17  

This matrix defines the exact boundaries of what inputs PanelProof actively supports, gracefully flags as unverified, or explicitly rejects.

---

## 1. Supported Input Formats & Dimensions

| Input Type | Supported Formats | Max File Size | Dimension Limits | Unsupported Handling |
|---|---|---|---|---|
| **Panel Image (Target)** | PNG, JPEG, WebP | 25 MB | Min: 512x512<br>Max: 8192x8192 | Reject with `INPUT_PAYLOAD_TOO_LARGE` or `UNSUPPORTED_IMAGE_FORMAT` |
| **Reference Model Sheet** | PNG, JPEG, WebP | 25 MB | Min: 256x256<br>Max: 8192x8192 | Reject if missing or unreadable (`REF_MISSING_CANON`) |
| **Claims Declaration** | JSON (Schema `panelproof/claims@1`) | 1 MB | Max 50 claims/panel | Reject with `SCHEMA_VALIDATION_ERROR` |
| **Region Locks** | Bounding boxes `[ymin, xmin, ymax, xmax]` normalized `0.0..1.0` | N/A | Must be valid non-inverted coordinates | Reject if coordinates out of bounds |

---

## 2. Trait & Continuity Verification Matrix

| Trait Category | Verification Method | Pass Condition (`ALLOW`) | Warning Condition (`WARN`) | Block Condition (`BLOCK`) | Abstention (`UNVERIFIED`) |
|---|---|---|---|---|---|
| **Facial Identity** | Embedding similarity against model sheet | Similarity $\ge 0.85$ | Similarity in range $[0.75, 0.85)$ | Similarity $< 0.75$ | Occlusion $> 60\%$ or confidence $< 0.60$ |
| **Facial Scars / Marks** | Keypoint location & presence check | Correct side & orientation | Minor scale/rotation drift | Missing or inverted side (e.g. left vs right) | Face not visible or turned away |
| **Costume / Outfit** | Region color histogram & palette distance | $\Delta E < 5.0$ and key items present | Minor shade deviation | Completely wrong garment or inverted color | Heavy shadow/lighting override |
| **Locked Regions** | Bit-for-bit SHA256 pixel buffer hash | 0 pixels modified ($\Delta = 0$) | Not applicable (binary invariant) | $\ge 1$ pixel modified ($\Delta > 0$) | Pre-generation mask not supplied |
| **Panel Reading Order** | Sequence index assertion | Continuous integer indexing | Gaps detected in ordering | Non-integer or cyclic indexing | Unordered moodboard |

---

## 3. Provenance & Authority Rules

1. **Artist-Declared Claims:**
   - Author: The visual artist or storyboard supervisor.
   - Severity Authority: Can trigger `ALLOW`, `WARN`, or `BLOCK`.
   - Override Authority: Can be overridden with typed justification (except for pixel lock breaches).

2. **Model-Inferred Claims:**
   - Author: Automated AI heuristics or exploratory prompt inference.
   - Severity Authority: **Strictly capped at `WARN`**. Can NEVER issue a `BLOCK`.
   - Rationale: Prevents autonomous models from hallucinating false blockers and freezing human artist workflows.
