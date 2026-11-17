# PanelProof Production Definition of Done

PanelProof is **hackathon release-ready** when the team can prove a complete, narrow, offline-safe vertical slice: a versioned continuity manifest and reference pack are accepted; a known-good fixture produces `ALLOW` or `WARN`; a known-bad fixture produces `BLOCK` with evidence and reason codes; missing or ambiguous evidence produces `UNVERIFIED`; receipts are replayable; the creator UI explains the result; secrets and unsafe paths are absent; and the exact README demo passes twice from a clean clone.

PanelProof is **live-sprint complete** when one meaningful new capability—sequence-level propagation or bounded repair—is implemented in dated commits, connected to the evidence ledger and policy, tested on at least one known-good and one known-bad case, and demonstrated with a failure path.

PanelProof is **post-hackathon production-ready** only after separate work validates privacy, provenance, model licensing, multi-user isolation, observability, cost controls, data retention, and a broader benchmark. Those claims must not be implied by the hackathon MVP.
