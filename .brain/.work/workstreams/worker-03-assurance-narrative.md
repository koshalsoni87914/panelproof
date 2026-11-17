# Worker 03 — Assurance, Creator UX, Narrative, and Submission Workstream

## Mission

Make the system understandable to a creator and defensible to a judge. Worker 3 owns the last mile: evidence language, release safety, provenance, demo reliability, and submission compliance.

## Exclusive paths

`web/`, `docs/`, `.brain/`, `.github/`, `release/`, demo assets, README, pitch materials, and submission files. Worker 3 may request changes in other domains but does not silently edit their contracts.

## Phases

### W3-P0 — Claims, threat, and reuse freeze
**Build:** claims register, source-confidence labels, threat model, supported-input matrix, prior-work disclosure, dependency/model/data inventory.  
**Exit:** no public claim lacks a source or planned evidence artifact; Worker 1 and Worker 2 approve the boundary.

### W3-P1 — Creator review bench
**Build:** panel strip, reference/target side-by-side, evidence cards, reason codes translated to creator language, `ALLOW/WARN/BLOCK/UNVERIFIED`, next action, and override-with-reason.  
**Exit:** a creator can identify what failed without reading raw JSON; Worker 2 accepts that UI wording preserves policy semantics.

### W3-P2 — QA and adversarial assurance
**Build:** test matrix for valid/invalid schemas, missing assets, unsupported style/layout, API timeout, malformed adapter output, secret leakage, path traversal, oversized input, and misleading fallback labels.  
**Exit:** all release-blocking security and schema cases pass; failures have owners.

### W3-P3 — 50/50 evidence packet
**Build:** pre-event baseline tag, unsquashed history, change ledger, live-build checklist, reusable-code disclosure, model/license inventory, and capability ledger update.  
**Exit:** the package clearly distinguishes pre-built foundation from live-built user-visible capability.

### W3-P4 — Demo and pitch lock
**Build:** 3–5 minute deterministic demo, live enrichment optional, known-good and known-bad path, visible report metadata, judge Q&A, architecture diagram, README, and limitations.  
**Exit:** two clean-state rehearsals pass and fixture fallback is clearly labelled.

### W3-P5 — Submission release
**Build:** final repository visibility, video URL, screenshots, report artifacts, license, `.env.example`, secret scan, clean-clone instructions, and exact event-field checklist.  
**Exit:** Worker 3 signs the release candidate; no feature is added after this point.

### W3-P6 — Post-hackathon production backlog
**Build:** studio workspaces, CI gate, model registry, monitoring, human feedback loop, privacy/provenance policy, and cost controls as separate future work.  
**Exit:** backlog exists without contaminating hackathon claims.

## Loop Engineering Protocol (Work → Test → Update → Work → Finalized)

Every assurance, UI, and narrative deliverable must cycle through:
1. **Work:** Build review bench UI components, evidence cards, claims register entries, and demo scripts.
2. **Test:** Test against raw policy receipts, mock corrupted/unverified inputs, run security & secret scanners, and rehearse demo timing.
3. **Update:** Simplify creator-facing microcopy, clarify reason explanations, plug edge-case UX states, and align README claims with actual repo capabilities.
4. **Work (Re-verify):** Re-rehearse clean-clone installation twice, verify end-to-end screen recording walkthrough, and re-check all public claim links.
5. **Finalized:** Tag pre-built/live release candidate, freeze submission packet, and lock final release assets.

## Definition of done

Worker 3 is done only when a judge can understand the problem and proof in one pass, and every claim survives comparison with the actual repository and evidence packet.
