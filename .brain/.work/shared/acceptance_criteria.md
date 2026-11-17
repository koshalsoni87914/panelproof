# PanelProof Acceptance Criteria

## AC-01 — Clean panel acceptance

Given a clean fixture and matching artist-declared canon, the audit returns `ACCEPT` or documented `WARN`, includes component scores, and writes a valid receipt.

## AC-02 — Drift detection

Given a fixture with the scar moved to the wrong jaw, the audit returns `BLOCK`, identifies `trait.scar.side`, reports the observed side, and references an evidence crop.

## AC-03 — Fail-closed verifier error

Given an unavailable or ambiguous verifier, the audit returns `UNVERIFIED`, keeps `failClosed=true`, and prevents export unless the artist supplies an override reason.

## AC-04 — Evidence completeness

Every non-accept verdict includes verifier name, confidence, threshold, observed result, timestamp, node ID, and evidence location or an explicit evidence-unavailable reason.

## AC-05 — Locked pixels

Given a parent image and an edit request, locked pixels in the child equal the parent at every locked coordinate. The report contains `locked_pixel_delta: 0`.

## AC-06 — Bounded repair

A repair loop never exceeds two attempts, creates a new node for every attempt, supports revert, and re-verifies after editing.

## AC-07 — Deterministic policy

Decision aggregation makes no network calls and passes unit tests for all verdict combinations, source provenance, overrides, and verifier failures.

## Evaluation metrics

- Wrong-trait recall on deliberately corrupted panels.
- False-block rate on clean and adversarial-but-valid panels.
- Abstention rate for ambiguous or unavailable evidence.
- Median and p95 audit latency.
- Cost per panel when live model calls are enabled.
- Locked-pixel invariant pass rate.
