# PanelProof: Creator workflow, differentiation, and responsible product claims

**Research date:** 2026-11-17  
**Scope:** One domain only—creator workflow, differentiation, and responsible claims for PanelProof, a Track 04 Visual Art & Design Assist hackathon MVP described by the project brief as a fail-closed continuity gate for AI-generated sequential art.

## Main conclusion

The strongest precedent is not “AI makes better art.” It is a narrow, inspectable safety gate between generation and continuation. MockGuard and PhantomDeps both frame an AI-specific failure mode, run a deterministic check before the next consequential action, produce evidence, and preserve human review for remediation. PanelProof should carry over that workflow pattern while making a materially different claim: it verifies continuity evidence across a sequential-art set, not artistic quality, authorship, or semantic truth.

The repositories support a conservative product story: **PanelProof can block continuation when required continuity evidence is missing, contradictory, or unverified; it should not claim to prove that a character is objectively the same, that an image is “good,” or that an AI output is copyright-safe.** The latter are recommendations, not facts established by the supplied sources.

## Key findings

### 1. The reusable product pattern is a pre-action gate, not a post-hoc score

MockGuard starts from the false-green problem: a passing AI-generated test can assert only on mocks rather than real behavior. Its workflow requires a baseline pass, then static AST analysis, controlled mutations, and attribution of surviving mutants to weak tests. Its CLI has explicit `baseline`, `verify`, and `compare` paths, plus terminal and JSON outputs [1] [2]. PhantomDeps uses the analogous position in the developer workflow: it intercepts an AI-generated install command before package installation, checks package identity and claimed symbols, then returns `ALLOW`, `WARN`, `BLOCK`, or `UNVERIFIED` with evidence and a repair path [3] [4].

**Evidence type:** official repository facts and technical descriptions. The direct PanelProof implication is a recommendation: put the continuity gate immediately before a creator commits to the next panel, page, or batch, rather than producing only a retrospective “consistency score.”

### 2. Fail-closed behavior is meaningful only when “unknown” is explicit

PhantomDeps’ frozen product contract is unusually clear about claim boundaries. It states that `UNVERIFIED` is never silently converted to `ALLOW`; missing context preserves ambiguity; remediation is patch-suggestion only; and several capabilities are fixture-only or explicit non-goals. The same contract distinguishes implemented behavior from fixture-only behavior and names the supported command scope [4]. MockGuard’s security policy likewise describes a local, trusted execution boundary and states that it is not a multi-tenant sandbox for hostile arbitrary code [5].

**Evidence type:** official contract/security documentation. For PanelProof, “fail closed” should mean a defined `BLOCK` or `UNVERIFIED` state when required continuity inputs are absent, unreadable, contradictory, or outside the MVP’s supported image/layout conditions. The UI should explain which evidence was missing and offer a human override or edit path, rather than implying that the image itself is invalid.

### 3. Evidence cards and machine-readable decisions make the gate usable in a creator workflow

PhantomDeps explicitly emits terminal evidence cards, JSON, and a hash-chained NDJSON decision log; its remediation is a cited, reviewable patch suggestion requiring human approval [3] [4]. MockGuard exports terminal or JSON reports with redacted secrets and links surviving mutants to weak test blocks [1] [2]. These are not merely diagnostics: they make a gate legible to the person deciding whether to proceed.

**Evidence type:** official README, product contract, and repository implementation descriptions. PanelProof should show a compact continuity evidence card for each blocked continuation: reference panel(s), checked attributes, observed conflict or missing signal, confidence/coverage label, and the exact next action available. A project-local JSON record or simple run log is a sensible MVP recommendation; cryptographic tamper evidence is not established as necessary by the supplied sources and should not be advertised unless implemented.

### 4. Differentiation comes from the claim being checked and the creator moment being protected

MockGuard checks whether tests protect production behavior. PhantomDeps checks whether an AI-generated package/API claim corresponds to a real package artifact before install. Their differentiation is therefore not “uses AI,” but a precise claim domain, a gate location, and a proof artifact [1] [3]. PanelProof’s differentiated claim should be similarly narrow: **before extending a sequential-art sequence, it checks whether the new panel has sufficient continuity evidence against the creator’s selected references and blocks continuation when the evidence is insufficient.**

**Evidence type:** synthesis from official project descriptions; the PanelProof wording is a recommendation. Avoid competing on generic image generation, aesthetic judgment, or a universal “character identity” guarantee. Those claims are not supported by the supplied evidence.

### 5. Team precedent favors explicit boundaries, reproducible demos, and role-separated delivery

MockGuard documents four exclusive worker domains, a mandatory “Ask Twice” boundary-crossing gate, and a “Pull Before Push” synchronization policy [6]. PhantomDeps lists a four-person roster with product/architecture, implementation/testing, validation/security/IBM Bob workflow, and demo/documentation roles [3] [7]. MockGuard also describes a self-contained offline three-act demo that first exposes a weak test and then shows the stronger version [2].

**Evidence type:** official repository governance and README material. For PanelProof, the actionable precedent is to build the MVP around one repeatable visual demo: establish a reference sheet and baseline panel, introduce a controlled continuity break, show the gate blocking continuation with an evidence card, then repair/approve and proceed. This recommendation does not infer any event judging rule or submission requirement.

## Direct implications for PanelProof

1. **Define the creator workflow as a gate loop:** reference setup → generate or import next panel → continuity checks → `ALLOW`, `WARN`, `BLOCK`, or `UNVERIFIED` → creator reviews evidence → revise or explicitly override → continue. Keep the gate before sequence extension, because that is where the precedent products create value.

2. **Make the MVP contract narrow and testable:** state exactly which continuity dimensions PanelProof checks (for example, selected character design anchors, costume/color anchors, panel order, and declared scene metadata) and what counts as missing evidence. Do not claim comprehensive visual identity, artistic quality, factual accuracy, or provenance unless separately implemented and validated.

3. **Treat `UNVERIFIED` as a first-class result:** no usable reference, ambiguous panel ordering, unsupported image format, or low/uncertain evidence should not become an implicit pass. The creator should see why the gate could not decide and be offered a human-review route. This is a direct adaptation of PhantomDeps’ explicit contract discipline.

4. **Differentiate with evidence, not model branding:** the key output should be a continuity evidence card and an auditable decision record, not only a similarity percentage. For the hackathon demo, show a controlled failure and the exact continuity anchor that caused the block. Any visual similarity metric should be described as a signal, not proof of identity.

5. **Use responsible language in the pitch:** say “PanelProof flags or blocks continuation when configured continuity evidence is missing or inconsistent.” Do not say “PanelProof guarantees character consistency,” “proves the same character,” “detects all continuity errors,” “prevents copyright infringement,” or “certifies human authorship.” Those stronger claims are not supported by the supplied sources and would overstate an MVP.

## Creator workflow proposal (recommendation)

A creator starts a sequence by selecting a reference sheet and declaring the continuity anchors that matter for the scene. PanelProof records the reference set and sequence position. After a new panel is generated or imported, the gate checks only the declared, supported anchors and the sequence metadata available to the MVP. It then returns a small decision card:

- **ALLOW:** required evidence is present and no configured contradiction was detected.
- **WARN:** a risk signal is present but the creator may review and proceed.
- **BLOCK:** a configured continuity requirement failed with an explainable mismatch or missing anchor.
- **UNVERIFIED:** PanelProof cannot safely determine the claim from the available inputs.

The creator can inspect the relevant reference crop, observed candidate feature, and reason code, then revise the panel, change the declared reference, or explicitly override where the product permits. The system should preserve the decision and the human action in a local project record. This workflow is a design recommendation modeled on the supplied repositories’ gate-and-evidence patterns, not an official PanelProof capability already demonstrated in the sources.

## Responsible product claims

**Safe claim for an MVP pitch:** “PanelProof is a fail-closed continuity gate for AI-generated sequential art. It checks configured continuity evidence before a sequence continues and explains when it blocks or cannot verify.”

**Claims to avoid unless proven by dedicated evaluation:** “understands the story,” “guarantees the same character,” “catches every continuity error,” “objective art-quality score,” “copyright-safe,” “provenance-certified,” “bias-free,” or “works for every art style and panel layout.” The supplied repositories demonstrate disciplined claim scoping, but they do not provide evidence for any of these PanelProof-specific capabilities.

**Human agency:** follow the PhantomDeps precedent that remediation is reviewable and human-approved rather than silently changing creator work [4]. An override should be visible and should not be relabeled as a verified pass.

**Security/privacy:** MockGuard’s local-by-default and sanitized-output posture is a useful precedent [1] [5], but it is not evidence that PanelProof is local-only. PanelProof should claim local processing, retention, or telemetry behavior only if the MVP actually implements and tests it.

## Evidence limits

- The supplied sources are two GitHub repositories and selected repository-controlled documents, plus the official USENIX Security ’25 conference page. They are primary project artifacts, but repository READMEs and badges are project-authored claims, not independent validation.
- The PhantomDeps product contract explicitly says some v1 behavior is fixture-only and lists live tarball inspection, multi-package parsing, dependency-graph analysis, automatic code application, and continuous monitoring as non-goals [4]. Its README’s broader architecture narrative must therefore be read alongside that frozen contract; this is a precedent for cautious claims, not evidence that every diagrammed path is fully live.
- The USENIX URL confirms the existence and venue of USENIX Security ’25, but the conference landing page alone does not independently verify the README’s quoted 19.7% statistic or its exact methodology [3] [8]. That statistic is not needed for the PanelProof recommendations and is not used as a foundation here.
- No source supplied or followed here establishes PanelProof’s image-model accuracy, continuity benchmark, false-positive/false-negative rates, creator UX testing, copyright/provenance performance, or event rules. Those remain unknown and should be measured or omitted from claims.
- “Track 04 Visual Art & Design Assist hackathon MVP” and “fail-closed continuity gate” are treated as the project brief supplied for this research, not as independently verified event documentation. No event rules are inferred.

## Sources

[1]: https://github.com/adishxm/mockguard "MockGuard official repository"
[2]: https://raw.githubusercontent.com/adishxm/mockguard/main/README.md "MockGuard README"
[3]: https://github.com/adishxm/phantomdeps "PhantomDeps official repository"
[4]: https://raw.githubusercontent.com/adishxm/phantomdeps/main/docs/product-contract.md "PhantomDeps v1 Product Contract"
[5]: https://raw.githubusercontent.com/adishxm/mockguard/main/SECURITY.md "MockGuard Security Policy"
[6]: https://raw.githubusercontent.com/adishxm/mockguard/main/AGENTS.md "MockGuard Agent and Worker Operating Rules"
[7]: https://raw.githubusercontent.com/adishxm/phantomdeps/main/package.json "PhantomDeps package metadata and scripts"
[8]: https://www.usenix.org/conference/usenixsecurity25 "USENIX Security '25 official conference page"
