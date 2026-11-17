# PanelProof Claims Register

| ID | Public claim | Evidence required | Status |
|---|---|---|---|
| CL-01 | PanelProof audits a panel against an artist-declared canon. | Claim JSON, audit output, receipt. | Designed; implement MVP |
| CL-02 | PanelProof can identify a deliberately corrupted trait. | Drifted fixture, verdict, evidence crop. | Designed; implement MVP |
| CL-03 | PanelProof fails closed when verification is unavailable. | API-down fixture and `UNVERIFIED` receipt. | Designed; implement MVP |
| CL-04 | Locked regions remain unchanged after an edit. | Parent/child images and `locked_pixel_delta=0`. | Designed; implement MVP |
| CL-05 | PanelProof automatically repairs a failed region. | Live repair trace and before/after re-score. | Finale target; do not claim now |
| CL-06 | PanelProof works across a full sequence. | Multi-panel plan, batch audit, sequence receipt. | Finale target; do not claim now |
| CL-07 | Continuity score predicts artistic quality. | Not supported. | Prohibited claim |
| CL-08 | The verifier is always correct. | Not supported. | Prohibited claim |

## Language rules

Say “checks declared claims,” “reports evidence,” “flags drift,” and “fails closed.” Do not say “guarantees consistency,” “understands art perfectly,” or “eliminates hallucinations.”
