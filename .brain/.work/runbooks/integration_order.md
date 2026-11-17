# PanelProof Integration Order Runbook

Run this order. If a stage fails, stop and fix it rather than layering UI or model complexity on top.

1. Verify runtime versions, lockfiles, environment template, and clean working tree.
2. Validate all JSON/NDJSON contracts and fixture labels.
3. Run deterministic policy unit tests without network access.
4. Run fixture baseline: clean, intentional-change, drifted, missing-reference, unsupported, timeout, and malformed cases.
5. Run adapter contract tests with fixture adapters; live adapters are optional.
6. Validate evidence packets and receipt schema, including hashes and versions.
7. Run adversarial/security matrix and confirm secrets, paths, sizes, and fallback labels.
8. Start the review bench against the same fixture run; check creator-facing wording against policy output.
9. Run corpus evaluation with denominators, exclusions, threshold version, and reproducibility metadata.
10. Run the exact README demo command from a clean clone twice.
11. Freeze the report, screenshots, video, capability ledger, claims register, and change ledger.

No stage may silently convert timeout, unsupported, malformed, or missing evidence into `ALLOW`.
