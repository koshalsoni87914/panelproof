# PanelProof Security Gate

## Before any live adapter

- Validate file type, size, dimensions, path, and project ownership boundary.
- Use a secret-free environment template; never persist raw API keys in receipts or logs.
- Set request timeout, retry maximum, output-size limit, and cancellation behavior.
- Validate adapter response against a schema before policy evaluation.
- Record only the minimum evidence needed for the demo; avoid unnecessary reference retention.

## During analysis

- No arbitrary shell commands from model output.
- No automatic repository edits from an AI suggestion.
- No network call required for deterministic policy or fixture replay.
- Redact tokens, private paths, and authorization headers from reports.
- Preserve unsupported, timeout, and ambiguous states.

## Before release

- Scan the repository and demo artifacts for keys, private paths, undeclared images, and stale claims.
- Review model/checkpoint licenses and source of every reference or generated asset.
- Verify that fixture fallback is labeled and cannot be confused with live inference.
- Confirm the MVP is not described as a secure multi-tenant or copyright-verification service.
