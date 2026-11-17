# PanelProof Organizational Research Dossier

**Document status:** Research synthesis and decision dossier  
**Project:** PanelProof  
**Prepared from:** Six supplied research reports (`01-event` through `06-product`)  
**Evidence posture:** Facts are separated from recommendations, hypotheses, and unknowns. No unimplemented PanelProof capability is presented as live.

## 1. Executive synthesis

PanelProof should be positioned as a **fail-closed continuity and hallucination gate for controllable, iterative sequential-art workflows**. It is not a generic image-quality checker, a universal artistic-judgment system, or a generator that guarantees identity and narrative consistency. Its core product decision is made immediately before a consequential workflow step: continue with a panel, flag it for review, block it, or mark it unverified because the configured evidence is insufficient.

The strongest product pattern from the supplied precedents is operational rather than model-specific: define a narrow contract, keep generation separate from approval, make uncertainty explicit, emit explainable evidence, preserve human review for remediation or override, and make the offline demo deterministic. PanelProof’s evidence packet should connect a continuity manifest and reference pack to panel-level checks, reason codes, scores/signals, thresholds, model and configuration identifiers, hashes, and a final decision.

The event is a strong thematic fit. Its official brief targets Digital Illustration & 3D / Visual Art & Design Assist and describes reducing uncontrollable random image hallucinations through controllable iterative workflows. The public operating model is a 50% pre-build / 50% live-build split, followed by a six-hour final sprint for shortlisted teams. Because the public material does not define how the 50% is measured and does not guarantee live model/API availability, PanelProof should preserve Git history, tag a baseline, maintain a change ledger, disclose reuse, and make live generation optional to the core demo.

The recommended MVP is a **continuity evidence gate** over supplied panels plus a manifest. It should support only explicitly configured anchors and transformations, show `ALLOW`, `WARN`, `BLOCK`, and `UNVERIFIED`/`INSUFFICIENT_EVIDENCE` states as applicable, and fail closed when required evidence is missing, ambiguous, unsupported, malformed, timed out, or below a calibrated threshold. Any model adapters, segmentation, retrieval, or identity signals that are not implemented and tested must remain labeled planned, fixture-only, or unsupported.

## 2. Verified event constraints

### 2.1 High-confidence constraints directly supported by the supplied official-source research

- The relevant official challenge area is **Digital Illustration & 3D — Visual Art & Design Assist**.
- The stated problem includes uncontrollable random image hallucinations and the need for controllable, iterative workflows.
- The event is framed as an open creative-artist opportunity / creative-assist track.
- The published venue is Techno India University, and the listed event date is November 21, 2026.
- The Devfolio listing states no registration fee and a team size of 2–4.
- Teams may use any programming language, framework, API, or LLM. The organizer site lists multimodal models, orchestration, ControlNet, IP-Adapters, diffusion inpainting, SVG generation, and WebGPU as examples, not mandatory technologies.
- The process is described as 50% pre-build and 50% live build, with a six-hour final sprint for shortlisted teams.
- Online submissions include a GitHub repository, README, and live demo URL.
- Online MVP review considers innovation, technical complexity, GenAI usage, repository structure, and demo execution.
- Git commit history is expected to be verifiable for the pre-build/live-build split.
- The Devfolio schedule places the live hackathon on November 21, 2026 from 12:00 PM to 5:45 PM IST.
- The public sources do not provide a formula for measuring 50%, and do not guarantee model/API uptime, quotas, network quality, or sponsor-service access.
- The Code of Conduct requires disclosure of reused code or previously submitted work and permits award disqualification for undisclosed reuse.

### 2.2 Event facts that remain conditional or must be rechecked

The supplied reports establish the above as reported facts, but the event pages, schedule, rules, submission form, and code of conduct should be rechecked immediately before submission. In particular, confirm date/time/time zone, venue, team-size and fee wording, required deliverables, current evaluation dimensions, Git-history enforcement, reuse-disclosure language, and whether any sponsor/API constraints or updated live-build instructions have been added.

## 3. Product decision boundary

### 3.1 In scope for PanelProof’s defensible MVP

PanelProof evaluates whether a supplied panel or proposed continuation has **sufficient configured evidence** for declared continuity anchors. The manifest should explicitly define, where applicable:

- panel/page order and adjacency;
- reference availability and reference-pack identity;
- character/entity presence and count;
- rough position, region, or mask overlap;
- declared costume, prop, palette, scene, and pose anchors;
- style or line-treatment constraints only where a tested signal exists;
- intentional changes that are allowed between panels;
- unsupported conditions and required evidence.

The output is an auditable decision, not an artistic truth claim. A decision record should include the checked anchors, evidence locations, signals and scores, thresholds, reason codes, uncertainty, next action, and whether a human override occurred.

### 3.2 Explicitly out of scope unless separately implemented and validated

PanelProof must not claim universal visual consistency, objective character identity, semantic perfection, human-level artistic judgment, guaranteed narrative correctness, copyright safety, provenance, or detection of every continuity error. It should not claim live SAM 3, InstantID, DINOv2, image-generation, or other model capability unless the relevant adapter is implemented, tested, packaged, and reflected in the claims register.

SAM 3 is relevant as a possible evidence source for open-vocabulary detection, segmentation, count, position, and tracking, but its documented streaming limitations include false positives and duplicate tracks. InstantID is face-centric and single-reference oriented; the reviewed workflow does not support multi-person use as a general identity oracle. DINOv2 can provide global and patch-level similarity or retrieval signals, but its benchmarks do not establish sequential-art continuity thresholds. These are architecture options and research precedents, not validated PanelProof guarantees.

### 3.3 Decision vocabulary

Use a stable, machine-readable vocabulary and preserve distinctions:

- **ALLOW:** configured required evidence passes the current policy.
- **WARN:** evidence passes or is near threshold, but a declared non-blocking concern should be reviewed.
- **BLOCK/REJECT:** configured evidence contradicts a required anchor or a fail-closed execution condition prevents safe continuation.
- **UNVERIFIED / INSUFFICIENT_EVIDENCE:** required evidence is absent, ambiguous, unsupported, unavailable, or below the policy’s evidentiary floor; this is not an implicit pass.
- **BASELINE_FAILED:** a prerequisite fixture, reference, or baseline could not be established.
- **TIMEOUT / COMPILE_ERROR / UNSUPPORTED:** preserve operational failure causes rather than collapsing them into a generic rejection.

## 4. Three-member operating model

The team should use three clear ownership lanes with receiving-party acceptance checks. One person may hold multiple lanes, but the responsibilities and handoffs should remain explicit.

### Member 1 — Platform and runtime owner

Owns schemas, manifest/reference ingestion, run metadata, adapters, deterministic execution, packaging, environment lock, CLI/API/UI integration, and the offline demo path. Acceptance means a clean run can load the same fixture set, validate schemas, execute bounded checks, and emit a complete machine-readable evidence packet.

### Member 2 — Continuity analysis and policy owner

Owns continuity anchors, allowed intentional changes, signal composition, thresholds, reason codes, panel comparison/local evidence, mutation/adversarial fixtures, and calibration. Acceptance means the policy can distinguish known-good, intentional-change, known-bad, ambiguous, unsupported, and missing-reference cases without silently passing uncertainty.

### Member 3 — Assurance, narrative, and submission owner

Owns the claims register, threat/risk register, source-confidence labels, QA and release gates, 50/50 evidence packet, README, demo script, limitations, reuse disclosure, visual explanation, and final submission package. Acceptance means every public claim points to a source or generated artifact, known limitations are visible, Git history and timestamps are preserved, and the demo can be rehearsed from a clean state.

### Operating rules

- Begin each phase with a contract review and end it with evidence, limitations, and a handoff note.
- The receiving owner performs acceptance; the author’s assertion alone is not sufficient.
- Keep generator and verifier paths independent where practical.
- Freeze schemas, claims, supported scope, and demo fixtures before the final rehearsal.
- No last-minute features after demo freeze; defect fixes must be recorded and re-tested.
- Maintain a single source of truth for state: designed, planned, implemented, tested, measured, released, blocked, or unknown.

## 5. Architecture implications

### 5.1 Proposed evidence pipeline

1. **Reference and contract setup:** ingest a versioned continuity manifest, reference pack, panel order, declared intentional changes, supported input conditions, and policy version.
2. **Panel intake:** load or generate/import a panel; record file hash, dimensions, preprocessing, source, and run identifier.
3. **Independent evidence extraction:** use deterministic checks and, only where implemented, model-backed signals such as entity masks, counts, rough positions, patch similarity, or retrieval neighbors.
4. **Evidence ledger:** store one record per entity/attribute/check with evidence location, confidence, model/checkpoint ID, inference mode, exclusions, and status.
5. **Policy evaluation:** combine configured signals and deterministic conditions using versioned thresholds and explicit fail-closed rules.
6. **Decision record:** emit `ALLOW`, `WARN`, `BLOCK`, or `UNVERIFIED` plus reason codes and next actions.
7. **Human review or revision:** permit a reviewer to inspect evidence, revise the panel, or explicitly override where the product contract allows; preserve the original decision and override rationale.
8. **Reproducible report:** persist hashes, commit/asset-set IDs, model/tool versions, prompt/config/reference hashes, threshold version, ordered panel IDs, and output report schema version.

### 5.2 Layered verification design

Use separate signals rather than one unexplained score:

- deterministic manifest/schema/order/reference checks;
- global visual similarity where applicable;
- patch/local evidence for declared regions or entities;
- segmentation/count/position evidence where an implemented adapter supports it;
- optional identity evidence only under the supported face/reference conditions;
- semantic, text, or narrative checks only when separately implemented and labeled.

Thresholds must be calibrated on a labeled PanelProof continuity set. Published ImageNet, Oxford-H, or other upstream benchmark values are not product thresholds. Every score should retain preprocessing parameters, model/checkpoint identifier, threshold version, and failure reason.

### 5.3 Reliability and packaging

The core demo should run offline against pinned fixtures and a locked environment. Live model generation is optional enrichment, not a prerequisite for proving the gate. Timeouts, malformed responses, missing inputs, unavailable references, unsupported inputs, and model failures must resolve to an explicit non-pass state. A fixture-only fallback must be clearly labeled and must not imply live capability.

## 6. Evaluation plan

### 6.1 Evaluation corpus

Create a versioned, labeled corpus containing:

- known-good sequential panels;
- intentional changes that the manifest permits;
- known-bad identity, costume, prop, pose, palette, scene-anchor, and order breaks;
- ambiguous or borderline cases;
- missing-reference cases;
- unsupported styles/layouts/occlusions;
- malformed input, timeout, baseline-failed, and adapter-failure cases.

Record fixture IDs, labels, exclusions, panel order, reference conditions, and whether a result is model-backed or fixture-backed.

### 6.2 Metrics and acceptance questions

Measure, by check and by corpus slice:

- false accepts on known-bad continuity breaks;
- false rejects on known-good and intentional-change cases;
- abstention/`UNVERIFIED` rate on ambiguous, unsupported, and missing-evidence cases;
- coverage: proportion of configured checks with sufficient evidence;
- decision reproducibility across repeated clean runs;
- reason-code and report-schema validity;
- latency, timeout behavior, and resource bounds;
- calibration of pass/borderline/fail thresholds on the PanelProof set.

Do not report a single accuracy number without denominators, exclusions, corpus version, threshold version, and model/configuration identifiers. There is currently no supplied evidence for an PanelProof benchmark, false-accept rate, or production accuracy.

### 6.3 Test sequence

Use a staged sequence: contract/schema tests; deterministic unit tests; fixture baseline; static and type checks; mutation/adversarial tests; evidence correlation and report validation; corpus evaluation; clean-clone rehearsal; then demo freeze and release-candidate validation. Repeat the full demo at least twice from a clean state and retain logs.

## 7. Threat and risk register

| Risk | Failure mode / impact | Control | Residual status |
|---|---|---|---|
| Hallucinated continuity | A panel looks plausible but violates identity, prop, costume, pose, or scene constraints | Manifest-driven anchors, layered evidence, known-bad fixtures, fail-closed policy | Must be measured on PanelProof corpus |
| False accept | A real continuity break is allowed | Calibrated thresholds, adversarial mutation set, separate verifier, explicit evidence minimum | Unknown until evaluation |
| False reject | Valid art or intentional change is blocked | Declare allowed transformations; include intentional-change fixtures; support human review | Unknown until calibration |
| Insufficient evidence hidden as pass | Missing reference, ambiguous identity, unsupported layout, or low confidence becomes success | First-class `UNVERIFIED`/`INSUFFICIENT_EVIDENCE`; no implicit pass | Required design control |
| Model-specific error | Segmentation duplicate tracks, false positives, face-only identity bias, or embedding bias misleads policy | Record model/inference mode; use model signals as evidence, not truth; abstain on unsupported cases | Depends on implemented adapter |
| Generator self-approval | The same model that creates an image validates it | Independent verifier path and evidence ledger | Required architecture principle |
| Live service outage | API quota, latency, network, or model access failure breaks demo | Offline deterministic fixtures; bounded execution; optional live enrichment | Event service availability unverified |
| Reproducibility failure | Results cannot be reproduced after a change | Pinned environment, hashes, commit IDs, config/reference/model versions, clean-clone test | Must be release-gated |
| 50/50 non-compliance | Pre-built work or reused code is not disclosed or live contribution is unclear | Tagged baseline, unsquashed history, change ledger, reuse disclosure, live-build log | Measurement method remains event-ambiguous |
| Overclaiming | Judges/users infer universal accuracy, artistic judgment, or copyright/provenance guarantees | Claims register, source-confidence labels, visible limitations, no unsupported live claims | Ongoing governance risk |
| Data/provenance ambiguity | Reference images or generated assets lack documented origin/permission | Record source and reuse status; disclose prior work; define provenance as out of scope unless implemented | Needs policy decision |
| Security/secret leakage | Tokens, private paths, or unsafe inputs enter the repository/demo | Secret/path hygiene, allowlist, bounded execution, pre-release scan | Must be release-gated |
| Demo confusion | A fixture fallback is mistaken for live model capability | Label fixture-only behavior; show input, decision, reason, and report; narrate limitations | Must be rehearsed |

## 8. Demo strategy

The demo should tell one short, auditable story:

1. Load a reference pack and continuity manifest for a small sequential-art sequence.
2. Show a known-good panel passing the configured checks.
3. Introduce or select an intentional continuity break, such as a missing prop, changed costume anchor, or inconsistent character placement.
4. Show the violating panel, the machine-readable rejection reasons, the evidence card/localization, and the `BLOCK` or `UNVERIFIED` result.
5. Show a corrected or regenerated panel only if that path is actually implemented; otherwise show a human-reviewed replacement fixture and label it as such.
6. Re-run the gate and show the revised decision plus reproducible report metadata.
7. Briefly show the repository structure, schema, test corpus, logs, and the pre-built/live change ledger.

The primary path must be deterministic and offline. A live model call may enrich the story only when it is bounded, optional, and clearly identified. Never let a timeout or malformed live response silently become `ALLOW`. Use visible failure states as part of the product demonstration rather than hiding them.

## 9. 50/50 compliance controls

Because the public rule is qualitative and does not specify whether 50% is measured by lines of code, files, features, effort-hours, commits, prompts, or user-visible capability, PanelProof should maintain evidence rather than claim an exact formula.

### Before the event / pre-build baseline

- Tag and archive the pre-event commit and timestamp.
- Preserve unsquashed Git history.
- Pre-build only the declared baseline: repository structure, typed schemas, UI shell, fixture corpus, panel viewer, labeled/mock adapter, report skeleton, and documentation needed to begin the live sprint.
- Record dependencies, templates, model checkpoints, datasets, prompts, and prior work.
- Maintain a pre-built capability list with states such as implemented, fixture-only, planned, and non-goal.

### During the live sprint

- Reserve meaningful user-visible work for the live period: continuity policy engine, evidence aggregation, report/decision path, model/image adapter if used, and end-to-end integration.
- Record commit timestamps, changed files, feature descriptions, prompts/configuration changes, and demo-visible outcomes.
- Maintain a dated change ledger mapping each shipped capability to pre-build or live-build evidence.
- Do not rewrite history to obscure timing; retain branches/tags and logs.
- Make any reused code, templates, models, datasets, or prior submissions explicit in the README and submission disclosure.

### Submission gate

The assurance owner verifies the baseline tag, history, change ledger, reuse disclosure, repository cleanliness, README, live-demo URL, and a clean-clone reproduction. If the organizer publishes a more precise interpretation, update the ledger and claims before submission.

## 10. Source-confidence labels

### High confidence — directly documented or independently corroborated

- Event theme, creative-assist framing, schedule/date/venue details as reported by the official organizer and Devfolio pages.
- Broad technology permissiveness and published submission/evaluation dimensions.
- The 50/50 wording and six-hour live-sprint model as published.
- MockGuard and PhantomDeps repository contracts, evidence controls, explicit unknown states, phase gates, reproducibility practices, and claims discipline.
- SAM 3’s documented detection/segmentation/tracking capabilities and stated streaming limitations.
- InstantID’s face-centric, single-reference identity-preserving design and reviewed workflow limitations.
- DINOv2’s visual feature/retrieval capabilities and benchmark/deployment limitations.

### Medium confidence — strategic synthesis or application recommendation

- PanelProof’s proposed positioning, layered architecture, three-member operating model, evidence-card UX, thresholding strategy, and live-demo sequencing.
- The recommendation that offline deterministic execution is the safest event demo path.
- The analogy from MockGuard/PhantomDeps to a continuity gate, because the product domains differ.
- The interpretation that source confidence should govern public claims rather than model reputation.

### Low confidence or unknown — do not present as established fact

- Any prior PanelProof implementation, team precedent, accuracy, benchmark result, calibrated threshold, false-accept rate, or deployment validation.
- Any official numeric interpretation of the event’s 50% split.
- Guaranteed sponsor/API/model availability, quotas, latency, or network quality.
- Universal identity, narrative, style, copyright, provenance, or artistic-quality guarantees.
- Commercial/deployment suitability of every model checkpoint or a complete visual identity gate.
- Claims derived from the reported MockGuard test-count discrepancy; counts must be scoped and dated.

## 11. Facts that must be rechecked before submission

1. Confirm the current official event date, venue, local time zone, live-sprint start/end, and any schedule revisions.
2. Confirm current team-size, registration-fee, eligibility, and submission requirements.
3. Re-read the organizer brief and Devfolio page for changed challenge wording, evaluation criteria, judging process, or required demo behavior.
4. Confirm exactly how organizers will interpret and verify the 50% pre-build/live-build rule, if they have published clarification.
5. Confirm current Git-history requirements, whether commit timestamps are the sole evidence, and whether tags/branches or a change ledger are accepted.
6. Recheck the Code of Conduct and submission policy for reuse, prior work, open-source dependencies, model checkpoints, datasets, and disclosure wording.
7. Confirm the live-demo URL, repository visibility, README contents, and any required online-MVP fields.
8. Verify all PanelProof claims against the actual repository state: implemented, tested, measured, released, blocked, or unknown.
9. Re-run the clean-clone installation, schema validation, fixture baseline, test suite, report validation, and deterministic demo from a clean environment.
10. Reconfirm model/checkpoint licenses, download availability, hardware/runtime requirements, and whether any adapter is genuinely packaged and tested.
11. Re-measure all reported evaluation results with corpus version, denominators, exclusions, thresholds, and commit/configuration identifiers.
12. Resolve and document any test-count discrepancy or other conflicting repository evidence before citing counts publicly.
13. Verify that fixture-only fallback behavior is visibly labeled and cannot be mistaken for live generation or live model inference.
14. Scan the final repository and demo package for secrets, private paths, undeclared reused assets, unsupported claims, and stale planned-feature language.
15. Confirm that every public statement about identity, continuity, generation, provenance, copyright, or reliability is bounded by observed evidence and the current claims register.

## 12. Open decisions for the team

- Which continuity anchors are mandatory for the MVP, and which are explicitly deferred?
- Will the MVP use only deterministic/mock evidence, or will one model adapter be implemented and validated end to end?
- What is the minimum evidence required for `ALLOW`, and what conditions force `UNVERIFIED` rather than `BLOCK`?
- Which human override actions are allowed, and how will override rationale be persisted?
- What corpus size and label protocol are sufficient for threshold calibration before demo freeze?
- Which artifacts are pre-built versus reserved for the live sprint under the organizer’s interpretation?
- What is the final supported input boundary for styles, layouts, occlusions, number of characters, and reference conditions?
