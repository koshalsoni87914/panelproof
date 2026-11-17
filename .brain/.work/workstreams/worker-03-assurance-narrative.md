# Worker 03 — Assurance, Creator UX, Narrative, and Submission Workstream

## Mission

Make the system understandable to a creator and defensible to a judge. Worker 3 owns the last mile: evidence language, release safety, provenance, demo reliability, and submission compliance.

## Exclusive paths

`web/`, `docs/`, `.brain/`, `.github/`, `release/`, demo assets, README, pitch materials, and submission files. Worker 3 may request changes in other domains but does not silently edit their contracts.

## Phases (Progress: 50% Foundation Completed)

### W3-P0 — Claims, threat, and reuse freeze `[VERIFIED]`
**Build:** claims register, source-confidence labels, threat model, supported-input matrix, prior-work disclosure, dependency/model/data inventory.  
**Exit:** no public claim lacks a source or planned evidence artifact; Worker 1 and Worker 2 approve the boundary. *(Completed in `.brain/.work/shared/claims_register.md`, `threat_model.md`, `docs/prior_work_disclosure.md`, and `docs/supported_input_matrix.md`)*

### W3-P1 — Creator review bench `[VERIFIED]`
**Build:** panel strip, reference/target side-by-side, evidence cards, reason codes translated to creator language, `ALLOW/WARN/BLOCK/UNVERIFIED`, next action, and override-with-reason.  
**Exit:** a creator can identify what failed without reading raw JSON; Worker 2 accepts that UI wording preserves policy semantics. *(Completed in `web/index.html`, `web/style.css`, `web/app.js`, and `web/data/mock-receipts.js`)*

### W3-P2 — QA and adversarial assurance `[VERIFIED]`
**Build:** test matrix for valid/invalid schemas, missing assets, unsupported style/layout, API timeout, malformed adapter output, secret leakage, path traversal, oversized input, and misleading fallback labels.  
**Exit:** all release-blocking security and schema cases pass; failures have owners. *(Completed in `web/tests/test_qa_assurance.js` with 9/9 passing tests and `eval/qa_assurance_results.json`)*

### W3-P3 — 50/50 evidence packet `[VERIFIED]`
**Build:** pre-event baseline tag, unsquashed history, change ledger, live-build checklist, reusable-code disclosure, model/license inventory, and capability ledger update.  
**Exit:** the package clearly distinguishes pre-built foundation from live-built user-visible capability. *(Completed in `docs/fifty_fifty_split.md`, `README.md`, `capability_ledger.md`, and `.brain/.report/w3_50pct_phase_gate_report.md`)*

### W3-P4 — Demo and pitch lock `[PLANNED - Live Sprint]`
**Build:** 3–5 minute deterministic demo, live enrichment optional, known-good and known-bad path, visible report metadata, judge Q&A, architecture diagram, README, and limitations.  
**Exit:** two clean-state rehearsals pass and fixture fallback is clearly labelled.

### W3-P5 — Submission release `[PLANNED - Live Sprint]`
**Build:** final repository visibility, video URL, screenshots, report artifacts, license, `.env.example`, secret scan, clean-clone instructions, and exact event-field checklist.  
**Exit:** Worker 3 signs the release candidate; no feature is added after this point.

### W3-P6 — Post-hackathon production backlog `[PLANNED - Post-Event]`
**Build:** studio workspaces, CI gate, model registry, monitoring, human feedback loop, privacy/provenance policy, and cost controls as separate future work.  
**Exit:** backlog exists without contaminating hackathon claims.

## Loop Engineering Record (W3 50% Foundation)

1. **Work:** Scaffolded Creator Review Bench UI in `web/`, authoring panel strip, side-by-side SVG vector overlays, and evidence card components. Updated claims register and threat model.
2. **Test:** Implemented QA and security assurance test suite in `web/tests/test_qa_assurance.js`.
3. **Update:** Remediated schema argument mappings in `EvidenceRecord` and `EvidenceLedger` metrics calls, and resolved test assertion discrepancies.
4. **Work (Re-verify):** Re-executed entire test suite across all worker domains: 8/8 policy tests, 7/7 corpus cases, and 9/9 QA assurance cases passed with 100% success rate.
5. **Finalized:** Authored `docs/fifty_fifty_split.md`, updated `README.md`, and generated formal phase gate report `w3_50pct_phase_gate_report.md`.

## Definition of done

Worker 3 is done with the 50% Foundation milestone: all public claims have evidence artifacts, the review bench UI is interactive and fully operational, security and schema gates pass, and the 50/50 architecture split is audited and locked.
