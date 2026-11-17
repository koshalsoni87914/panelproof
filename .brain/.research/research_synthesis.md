# PanelProof Research Synthesis

## Decision

PanelProof belongs in **Track 04 — Visual Art & Design Assist**, not Track 03. The product addresses a visual-creation bottleneck: identity and style drift across AI-generated panels. Its value is verification, diagnosis, and controlled repair rather than another generic generator.

## User problem

Comic, manga, webtoon, storyboard, and illustration creators can generate attractive individual images but struggle to know which panel broke a recurring character and which specific trait changed. Manual review is slow, while blind regeneration may destroy good composition or alter artist-approved regions.

## Product boundary

PanelProof turns an artist-declared character canon into machine-checkable claims. Each claim has a verifier, threshold, severity, provenance, and evidence. The gate produces one of four outcomes: `ACCEPT`, `WARN`, `UNVERIFIED`, or `BLOCK`.

## Why this matches the team

The supplied `mockguard` and `phantomdeps` work show an existing engineering pattern: define a claim, verify it independently, produce structured evidence, aggregate conservatively, and fail closed. PanelProof ports that pattern from code artifacts to visual artifacts.

## Evidence limits

PanelProof does not prove artistic quality or semantic truth. It provides a useful, explainable ranking and policy decision for declared claims. Similarity thresholds require calibration on the project corpus. VLM observations can be ambiguous and must be allowed to abstain. Model-generated images and repairs are optional dependencies; the gate itself must remain testable with fixtures.

## Competitive distinction

Do not compete as a canvas editor or one-click comic generator. The narrow differentiator is a sequence-level continuity gate with receipts, evidence crops, abstention, repair bounds, and locked-pixel invariants.

## Source notes

- Team precedent: https://github.com/adishxm/mockguard
- Team profile and related projects: https://github.com/adishxm
- Event material and uploaded project research: retained in the parent workspace documents; external event claims must be rechecked before publication.
