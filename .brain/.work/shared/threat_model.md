# PanelProof Threat Model & Security Boundary

## Protected Assets

1. **Artist Canon & Reference Assets:** Base character model sheets, costume palettes, key pose references.
2. **Generated Panels:** High-resolution comic/manga/webtoon raster panels.
3. **Evidence Ledgers & Receipts:** Cryptographic/verifiable records of policy decisions, reason codes, and similarity metrics.
4. **Creator Justifications & Overrides:** Audit trail explaining why a creator bypassed a warning.
5. **Model & API Credentials:** API tokens for third-party VLMs and image generation models.
6. **Codebase Provenance:** Commit history and disclosures ensuring compliance with hackathon regulations.

---

## Threats, Mitigations, and Verification Evidence

| Threat ID | Threat Description | System Impact | Mitigation Control | Verification Evidence |
|---|---|---|---|---|
| **TH-01** | Generator self-approves corrupted output | Undetected character drift exported | Complete physical separation of generative adapter and policy engine | Architectural boundary in `policy/engine.js` |
| **TH-02** | Missing reference treated as passing | Silent failure of continuity audit | Fail-closed policy: missing reference triggers `UNVERIFIED` and flags export blockage | Corpus fixture `M-001-missing-reference.json` |
| **TH-03** | Severe 3D camera occlusion / extreme angle | False confidence / erroneous block | Abstention boundary: below minimum bounding confidence flags `UNVERIFIED` without blocking | Corpus fixture `A-001-ambiguous-angle.json` |
| **TH-04** | VLM / Adapter network timeout or outage | Pipeline freeze / hung process | Hard timeout ceiling, bounded retry, fail-closed `UNVERIFIED` status | Corpus fixture `E-001-verifier-unavailable.json` |
| **TH-05** | Malformed adapter response payload | Engine crash or unhandled exception | Strict schema parsing and rejection before ledger ingestion | Unit test in `web/tests/test_qa_assurance.js` |
| **TH-06** | Accidental credential or API key leakage | Compromise of production secrets | Automated pre-commit/QA secret scanner, `.env.example`, zero secrets in logs | Automated check in `web/tests/test_qa_assurance.js` |
| **TH-07** | Directory traversal via malicious asset path | Arbitrary file read/overwrite | Strict path normalization and path containment assertion | Security test in `web/tests/test_qa_assurance.js` |
| **TH-08** | Oversized raster payload DoS | Memory exhaustion / crash | Input dimension and byte size limits enforced at ingestion | Input test in `web/tests/test_qa_assurance.js` |
| **TH-09** | Misleading UI states (e.g. green check on unverified) | Artist misled into bad publish | UI strict semantic rendering: `UNVERIFIED` renders neutral amber/gray badge with explanation | Review Bench UI & QA semantic assertion |
| **TH-10** | Unjustified creator override | Abuse of override leading to untracked drift | Mandatory non-empty reason string; pixel lock breaches are strictly non-overridable | Unit test `6. Creator Override Protocol` |
| **TH-11** | Undisclosed code reuse or template obscuring | Disqualification / rule breach | 50/50 Evidence Packet, detailed prior-work inventory, unsquashed git history | `docs/fifty_fifty_split.md` & `docs/prior_work_disclosure.md` |

---

## Explicit Non-Goals & System Boundaries

- **Not an OS Sandbox:** PanelProof assumes trusted invocation within the developer/artist workspace.
- **Not a Content Moderation Platform:** PanelProof inspects character visual continuity, not content safety or policy moderation.
- **Not a Legal Copyright Oracle:** PanelProof verifies consistency with artist-supplied references; it does not perform external copyright clearance.
- **Not an Autonomous Art Generator:** PanelProof provides assurance, evidence, and assist tools to visual storytellers; human creators retain editorial supremacy.
