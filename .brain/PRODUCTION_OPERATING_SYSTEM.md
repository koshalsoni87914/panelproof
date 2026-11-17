# PanelProof Production Operating System

## Purpose

This document turns the project brain into a lightweight production-control system for a three-member hackathon team. It is production-grade in discipline, but deliberately constrained in scope so the team can finish a credible MVP and a meaningful live-sprint extension.

## Operating rules

1. **Evidence before claims.** Every public statement points to a source, committed fixture, test result, screenshot, or generated report.
2. **Contract before implementation.** Any change to schemas, verdict vocabulary, thresholds, or public capability status requires a decision-log entry and an updated acceptance test.
3. **Generator and verifier are independent.** A generation model may create a panel; it cannot be the authority that approves continuity.
4. **Unknown is a result.** Missing reference, ambiguous match, unsupported layout, timeout, malformed adapter response, and unavailable model remain visible states.
5. **Bounded execution.** Every live adapter has a timeout, retry limit, output-size limit, cost guard, and cancellation path.
6. **Reproducible runs.** Record commit, fixture/corpus version, asset hashes, model/checkpoint ID, configuration hash, prompt/reference hash, gate version, thresholds, command, and timestamp.
7. **Receiving-party acceptance.** The person who consumes a handoff runs the acceptance command; the author’s assertion alone does not close a phase.
8. **Freeze together.** Code, fixtures, reports, README, video, claims, and capability ledger freeze as one release candidate.
9. **No silent scope expansion.** A new feature requires an owner, acceptance criterion, risk note, and explicit trade-off against the six-hour live sprint.
10. **Reuse disclosure.** Record prior code, templates, libraries, checkpoints, datasets, prompts, and generated assets. Do not present reused work as live-built work.

## State transitions

`DESIGNED → PLANNED → IMPLEMENTED → TESTED → MEASURED → RELEASED`. A phase may enter `BLOCKED`, `UNKNOWN`, `UNSUPPORTED`, or `DEPRECATED`; it may not jump from a document to `RELEASED`.

## Source-of-truth locations

- Research and source confidence: `.ORG_research/`, `.research/`
- Decisions and product claims: `.work/shared/`
- Phase ownership and handoffs: `.work/workstreams/`
- Test, security, and release controls: `.work/runbooks/`, `.testdata/`
- Demo and pitch proof: `.demo/`
- Measured phase evidence: `.report/`

## Hackathon constraint

Production discipline does not mean production scope. The event’s public materials describe a qualitative 50% pre-build / 50% live-build model, not a code-count formula. Preserve Git history, tag the baseline, maintain a dated change ledger, and reserve a meaningful user-visible continuity-gate capability for the live sprint. Recheck official rules immediately before submission.
