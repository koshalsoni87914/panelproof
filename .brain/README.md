# PANELPROOF — Hackathon Project Brain

**Status:** DESIGN FROZEN / PRODUCTION PLAN READY / MVP IMPLEMENTATION REQUIRED. This `.brain` directory is the source of truth for PanelProof, a Track 04 Visual Art & Design Assist project.

## Product

PanelProof is a fail-closed continuity and hallucination gate for controllable, iterative sequential-art workflows. It checks whether a panel has sufficient configured evidence to continue, flag, block, or mark the result unverified against an artist-declared continuity manifest.

> **phantomdeps guards what an AI coding agent claims. PanelProof guards what an AI image workflow draws.**

## Read order

1. `.ORG_research/00_research_synthesis.md` for verified event constraints, technical evidence, product boundaries, risk, and open decisions.
2. `.research/research_synthesis.md` for the initial decision rationale.
3. `PRODUCTION_OPERATING_SYSTEM.md` for execution rules and state vocabulary.
4. `.work/00_master_plan.md` and `.work/production_roadmap.md` for scope, phases, and the hackathon/live-build split.
5. `.work/team_execution_model.md` and `.work/workstreams/` for the three workers, ownership boundaries, and handoffs.
6. `.work/shared/` for contracts, acceptance criteria, decisions, claims, capability status, threats, and dependencies.
7. `.work/runbooks/` for integration, security, test/release, and demo freeze gates.
8. `.demo/demo_scope.md` for the stage-safe story and fallback.
9. `.testdata/v1/` for replayable fixtures and starter contracts.
10. `.report/` for phase-gate reports.

## State vocabulary

Use `DESIGNED`, `PLANNED`, `IMPLEMENTED`, `TESTED`, `MEASURED`, `RELEASED`, `BLOCKED`, `UNSUPPORTED`, `UNKNOWN`, and `DEPRECATED`. A file existing in the repository is not proof that the capability works.

## Non-negotiable principles

- The artist declares the canon; model inference may suggest but cannot silently promote an inferred trait to blocking policy.
- Generation and approval are separate paths. The generator cannot approve its own output.
- The gate is deterministic and fail-closed. Missing, ambiguous, unsupported, malformed, or timed-out evidence is never an implicit pass.
- Every decision has evidence, reason codes, thresholds, versions, hashes, and a reproducible receipt.
- AI repair is bounded, reversible, and never edits locked pixels.
- The core demo works offline with fixtures; live model calls are optional enrichment.
- Public claims must match the capability ledger and the actual commit history.

## Naming decision

The project name is **PanelProof**. Do not use InkLock in new code, documentation, screenshots, or the submission form.
