# PanelProof Architecture Decision Log

## ADR-001 — Final project name

**Decision:** Use PanelProof.  
**Reason:** It connects to the team's existing guard-and-evidence projects and clearly communicates a protective verification layer. Do not use InkLock in new material.

## ADR-002 — Track selection

**Decision:** Track 04 — Visual Art & Design Assist.  
**Reason:** The differentiating mechanism is visual continuity verification and controlled repair, not content scheduling or video repurposing.

## ADR-003 — Deterministic gate authority

**Decision:** Claim policy and verdict aggregation run without model calls.  
**Reason:** The system must independently judge model output and remain testable during network failure.

## ADR-004 — Fail closed on uncertainty

**Decision:** Verifier error or ambiguity becomes `UNVERIFIED`.  
**Reason:** An artist should never mistake unavailable evidence for approval.

## ADR-005 — Artist-declared claims outrank inferred claims

**Decision:** Only artist-declared claims can produce a blocking verdict.  
**Reason:** The artist remains in control and the system makes provenance visible.

## ADR-006 — Bounded repair

**Decision:** Maximum two repair attempts, each as an immutable node, followed by accept, revert, or human override.  
**Reason:** Prevents autonomous thrashing and makes the action auditable.

## ADR-007 — Offline-safe demo

**Decision:** Fixture replay is a first-class mode; live generation is optional.  
**Reason:** The core claim is verifiable policy, not availability of a particular image API.


## ADR-008 — Zero-Dependency Creator Review Bench UI

**Decision:** Author the Creator Review Bench (`web/`) in pure semantic HTML5, modern CSS Grid/Flexbox, and native ES6 Modules without external bundle tools or heavy front-end frameworks.  
**Reason:** Ensures the review bench can be audited and opened directly from any clean clone in under 1 second without network access or `npm install` failures, guaranteeing 100% offline demo resilience.

## ADR-009 — Mandatory Pre-built vs Live-built 50/50 Partition

**Decision:** Complete and lock all deterministic policy, evidence ledgers, adversarial test corpuses, security scanners, and review bench UIs as the 50% pre-built foundation before commencing live generative model adapters.  
**Reason:** Complies rigorously with hackathon rules, preserves unsquashed commit lineage, and prevents claims of unverified pre-built AI pipelines.
