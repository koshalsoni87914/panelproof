# PanelProof Threat Model

## Assets

Reference images, generated panels, manifests, evidence crops, model/API credentials, run metadata, claims, receipts, override reasons, source code, fixture labels, and submission provenance.

## Threats and controls

| Threat | Impact | Control | Release evidence |
|---|---|---|---|
| Generator self-approves output | False acceptance | Separate adapter and policy paths | Architecture test |
| Missing reference becomes pass | Silent continuity failure | `UNVERIFIED` and fail-closed policy | API-down fixture |
| Ambiguous face/occlusion | False confidence | Abstention boundary and evidence minimum | Ambiguous fixture |
| Model adapter timeout | Demo or export failure | Timeout, cancellation, bounded retry, fixture fallback | Timeout test |
| Malformed adapter output | Policy corruption | Schema validation before policy | Invalid-response test |
| Prompt/model drift | Non-reproducible result | Config/model/reference hashes | Report metadata |
| Secret leakage | Credential compromise | `.env.example`, redaction, secret scan, no keys in logs | Release scan |
| Unsafe file/path input | Data exposure or overwrite | Allowlist, size/type checks, safe paths | Security tests |
| Copyright/provenance ambiguity | Submission or user risk | Asset source inventory and disclosure; no unsupported legal claims | Provenance manifest |
| False block | Artist friction | Allowed-change manifest, calibration, human review | Intentional-change fixture |
| False accept | Bad panel exported | Adversarial corpus, thresholds, independent verifier | False-accept report |
| Fixture mistaken for live AI | Misleading demo | Visible fixture-only labels and narration | Demo review |
| Reuse not disclosed | Award ineligibility | Change ledger and reuse section | Submission checklist |

## Security boundary

The hackathon MVP is not an OS sandbox, content-moderation system, copyright oracle, or secure multi-tenant service. These limitations must remain visible in the claims register.
