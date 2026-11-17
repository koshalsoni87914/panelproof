# MockGuard `.brain` production operating model

**Research subject:** MockGuard, repository `adishxm/mockguard`  
**Scope:** The project’s production operating model as evidenced by its repository, `.brain` directory, operating-system document, work plans, runbooks, and assurance artifacts.  
**Checked:** 2026-11-17 against the `main` branch shown by GitHub.

## Concise conclusion

MockGuard treats `.brain` as a project source of truth and turns it into a lightweight production-control system. The operating model is not merely a task list: it combines evidence-backed claims, versioned contracts, explicit ownership boundaries, bounded execution, reproducible reports, visible uncertainty, and release/demo freezes. The central fail-closed pattern is that baseline failure, timeout, unsupported content, and unknown states are not silently converted into a positive verdict.

For PanelProof, the most transferable precedent is to make continuity verification a gated evidence pipeline rather than a single similarity score. Define the artifact contract and failure vocabulary first; separate generation from approval; require reproducible manifests and fixture cases; and keep “not verified” distinct from “verified.” These are recommendations for PanelProof, not capabilities documented as already present in PanelProof.

## Key findings

### 1. `.brain` is an operational system of record, not a notes folder

The `.brain` README explicitly calls the directory the project “source of truth” and gives a read order spanning research synthesis, master plan, contracts, workstreams, testers, demo scope, fixtures, and report templates [1]. The production operating-system document then assigns system-of-record locations for decisions, contracts, threats/controls, SRE, QA, workstreams, pitch evidence, and original research [2].

The model also defines a state vocabulary—`DESIGNED`, `PLANNED`, `IMPLEMENTED`, `TESTED`, `MEASURED`, `RELEASED`, `DEPRECATED`, `BLOCKED`, and `UNKNOWN`—and explicitly warns that a file existing in the repository is not proof that its capability is implemented [2]. This is a strong evidence-discipline precedent: artifact presence and verified capability are different states.

### 2. The production rules are evidence-first and independent of the generator

MockGuard’s operating principles require every public claim to point to a source or generated artifact; require independent verification so the model/generator that creates a test is not the authority approving it; require bounded execution; require schema-first collaboration; require reports to contain commit, tool versions, configuration hash, corpus version, and command; preserve unknown/unsupported/timed-out/baseline-failed states; and freeze package, workflow, documentation, and claims together [2].

This principle is reinforced by the research synthesis: static analysis finds candidates, but dynamic mutation evidence should support high-confidence conclusions; scores need denominators, exclusions, commands, versions, and committed fixtures/corpus; and the tool should abstain when parser or framework semantics are unclear [5]. The claims register prohibits stronger claims such as proving code correctness, universal language/framework coverage, or production-grade sandboxing without new evidence [8].

### 3. Work is organized as owned phases with a receiving-party review

The four-person model assigns three builders to platform/runtime, analysis/mutation, and assurance, while a fourth member owns pitch, demo narrative, judge Q&A, evidence ledger, and submission lock [3]. The cadence calls for contract/dependency review at phase start, short handoff notes at integration boundaries, a mid-phase acceptance command run by the receiving worker, an evidence artifact plus known limitations and updated claims at phase close, and no last-minute feature addition after demo freeze [3].

The roadmap sequences P0 contract/threat freeze; P1 reproducible foundation; P2 static inspection; P3 mutation proof; P4 evidence product; P5 hardening; P6 evaluation; P7 integration freeze; P8 release candidate; and P9 post-hackathon production [4]. The phase register records owner, reviewer, artifact, and status for each phase [6]. It also shows an important distinction between a declared phase and an actually passed phase: several later phases remain `PLANNED` even though the repository contains plans for them [6].

Worker boundaries are explicit. The public agent rules assign exclusive file/task domains and require a two-stage “Ask Twice” confirmation before crossing into another worker’s domain [9]. This is team precedent, not a universal engineering requirement; its value for PanelProof is reducing conflicting edits and making handoffs deliberate.

### 4. Integration and release are deterministic, staged, and fail-closed

The integration runbook orders validation from environment/version checks and locked dependency installation through unit tests, fixture baseline, static analysis, mutation analysis, correlation, JSON-report validation, corpus evaluation, and exact-command demo rehearsal [10]. The test/release gate refuses to call an archive ready until lint/typecheck/tests/fixtures/corpus evaluation pass, report schema validation passes, weak/strong mutation contrast is reproducible, generated output is free of secrets and inappropriate absolute paths, package files are allowlisted, and README commands work from a clean clone [11].

The security gate requires no package installation during analysis, an explicit bounded test command, capped/redacted output, no tools for an optional LLM, abstention on unsupported content, no arbitrary repository edits by default, and honest disclosure when execution is not sandboxed [12]. The demo-freeze runbook freezes the exact fixture, commands, lockfile, report, and screenshots; runs twice from a clean state; and uses a committed fixture-only fallback if the live repository path fails [13].

### 5. Technical evidence is deliberately narrower than the product narrative

The capability ledger labels specific capabilities as `IMPLEMENTED & VERIFIED`, including CLI scaffolding, Jest discovery, baseline runner, AST analysis, deterministic mutation adapters, correlation/attribution, JSON reports, process supervision, and provenance artifacts. It separately labels sandbox isolation as “CONTAINED (NOT OS SANDBOX)” [7]. The acceptance criteria require that baseline failure block interpretation of mutation score, timeout/compile-error/unsupported states remain distinct, reports be replayable from captured command/config metadata, and no automatic edit occur unless explicitly enabled [14].

The public README describes the product as a TypeScript/Jest local-first CLI that combines AST mock-pattern analysis with controlled mutation testing, and documents timeouts, safe environment handling, secret redaction, zero telemetry by default, and a 40-test CI suite [15]. Those are repository claims; they should be treated as current-main claims rather than independently re-run measurements in this research pass.

## Direct implications for PanelProof

1. **Create an PanelProof `.brain` contract before building the continuity score.** Establish a source-of-truth read order, versioned schemas, artifact locations, state vocabulary, and a claims register. At minimum, distinguish `VERIFIED`, `BLOCKED`, `UNKNOWN`, `UNSUPPORTED`, `TIMEOUT`, and `BASELINE_FAILED`; do not let a missing reference, parse failure, or low-confidence match become “continuous.” This is a recommendation derived from MockGuard’s operating principles and acceptance criteria, not a documented PanelProof feature.

2. **Use an independent, fail-closed continuity gate.** The image/story generator should not approve its own continuity. Require an independently computed check over page/shot manifests, character identity features, panel ordering, scene/location anchors, and style constraints. Report both the decision and the evidence/denominator, with explicit exclusions and abstentions. This adapts MockGuard’s generator-versus-verifier separation and static-candidate/dynamic-proof distinction to sequential art.

3. **Make reproducibility a first-class deliverable.** Every PanelProof run should capture source commit or asset-set ID, model/tool versions, prompt/config hash, reference pack version, ordered frame/page IDs, gate version, thresholds, command or run recipe, and machine-readable results. Keep a small committed fixture corpus containing positive continuity, intentional change, ambiguous/unsupported, missing-reference, and failure cases. This is an PanelProof recommendation based on MockGuard’s reproducible-report and corpus precedent.

4. **Adopt phase gates and a controlled demo fallback.** Sequence PanelProof through contract/threat freeze, baseline fixture validation, continuity analysis, adversarial/edge-case evaluation, hardening, benchmark/calibration, demo freeze, and release candidate. Freeze the exact fixture, commands, model/config versions, report, and screenshots before the hackathon demo; rehearse twice from a clean state; retain a clearly labeled fixture-only fallback. Do not add features after freeze.

5. **Be precise about MVP boundaries.** State which art styles, page layouts, character/reference conditions, and transformations are supported. Keep “not enough evidence to verify” separate from “verified,” and avoid claiming universal visual consistency or correctness. MockGuard’s own claims register and explicit non-sandbox disclosure show how to preserve credibility by refusing unsupported claims.

## Evidence limits

This report is based primarily on the two user-provided GitHub URLs and authoritative files linked from that repository on the `main` branch. It verifies the documented operating model and the repository’s stated implementation/evidence posture; it does not independently execute MockGuard, inspect every file in the repository, reproduce the reported test suite, or validate the project’s hackathon event rules. GitHub directory pages and Markdown files can describe intended or claimed status, so statements such as “implemented and verified” are attributed to the project’s own capability ledger unless corroborated by an executed artifact.

The source set is internally inconsistent in one small but material way: the `.brain` README says 101 automated tests and a 100% green CI matrix [1], while the public README states 40 passing tests across Node 18/20/22 [15]. This report does not resolve that discrepancy or use either number as a quantified performance claim. The safest interpretation is that the repository contains different test-count snapshots or scopes; PanelProof should similarly name the test scope and date beside any count.

The report does not infer that MockGuard’s team model is optimal for all teams, nor does it claim that every listed phase is complete. The phase register marks several phases `PLANNED`, and the production operating system explicitly says repository files are not implementation evidence by themselves [2] [6]. Recommendations for PanelProof are clearly marked as recommendations and do not assert capabilities, event rules, or requirements that were not found in the sources.

## Sources

[1] [MockGuard `.brain` README](https://github.com/adishxm/mockguard/tree/main/.brain) — source-of-truth role, read order, freeze decisions, workspace status, and execution structure.

[2] [MockGuard Production Operating System](https://github.com/adishxm/mockguard/blob/main/.brain/PRODUCTION_OPERATING_SYSTEM.md) — operating principles, system of record, state vocabulary, and evidence warning.

[3] [MockGuard Team Execution Model](https://github.com/adishxm/mockguard/blob/main/.brain/.work/team_execution_model.md) — roles, cadence, RACI, handoffs, boundaries, and work-in-progress limits.

[4] [MockGuard Production Roadmap](https://github.com/adishxm/mockguard/blob/main/.brain/.work/production_roadmap.md) — phase sequence, exit gates, ownership, and production definition.

[5] [MockGuard Research Synthesis](https://github.com/adishxm/mockguard/blob/main/.brain/.research/research_synthesis.md) — decision boundary, evidence-backed principles, product decisions, and unresolved unknowns.

[6] [MockGuard Phase Register](https://github.com/adishxm/mockguard/blob/main/.brain/.work/phase_register.csv) — phase entry/exit gates, owners, reviewers, artifacts, and statuses.

[7] [MockGuard Capability Ledger](https://github.com/adishxm/mockguard/blob/main/.brain/.work/shared/capability_ledger.md) — capability states and implementation evidence.

[8] [MockGuard Claims Register](https://github.com/adishxm/mockguard/blob/main/.brain/.work/shared/claims_register.md) — approved, conditional, and prohibited claims.

[9] [MockGuard AGENTS.md](https://github.com/adishxm/mockguard/blob/main/AGENTS.md) — exclusive worker domains, double-confirmation boundary gate, and synchronization policy.

[10] [MockGuard Integration Order Runbook](https://github.com/adishxm/mockguard/blob/main/.brain/.work/runbooks/integration_order.md) — deterministic integration sequence.

[11] [MockGuard Test and Release Gate](https://github.com/adishxm/mockguard/blob/main/.brain/.work/runbooks/test_release_gate.md) — release readiness checks.

[12] [MockGuard Security Gate](https://github.com/adishxm/mockguard/blob/main/.brain/.work/runbooks/security_gate.md) — bounded execution, abstention, and no-edit-by-default controls.

[13] [MockGuard Demo Freeze](https://github.com/adishxm/mockguard/blob/main/.brain/.work/runbooks/demo_freeze.md) — freeze, clean-state rehearsal, and fallback procedure.

[14] [MockGuard Acceptance Criteria](https://github.com/adishxm/mockguard/blob/main/.brain/.work/shared/acceptance_criteria.md) — required behavior and quality targets.

[15] [MockGuard repository README](https://github.com/adishxm/mockguard) — public product description, workflow, security posture, test claim, and team execution summary.
