# PanelProof Test and Release Gate

A release candidate is ready only when all applicable checks pass and every exception is recorded with an owner and decision.

## Required checks

- Clean install and runtime version check.
- Schema and report validation.
- Unit tests for verdict ordering, provenance, override, and fail-closed behavior.
- Fixture baseline with known-good, known-bad, intentional-change, ambiguous, unsupported, missing-reference, timeout, and malformed cases.
- Adapter contract tests and bounded execution tests.
- Corpus evaluation with corpus version, denominators, exclusions, threshold version, and model/config IDs.
- UI review of evidence cards, creator language, override reason, and fixture-only labeling.
- Secret/path/asset scan and dependency/license inventory.
- Clean-clone setup and exact README demo command, twice.
- Pre-built/live change ledger, reuse disclosure, and capability ledger review.

## Blocking failures

Any hidden failure state, unvalidated report, unbounded retry, missing evidence, secret, undisclosed reuse, misleading fixture label, or public claim unsupported by the repository blocks release.

## Exception protocol

An exception must name the failed check, impact, owner, mitigation, whether it affects the public claim, and the explicit decision: fix before release, narrow the claim, or remove the feature.
