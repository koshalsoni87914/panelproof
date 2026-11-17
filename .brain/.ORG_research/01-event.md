# Official GeNarrative Clash Brief for PanelProof

**Research date:** 2026-11-17  
**Scope:** GeNarrative Clash 2026, using the supplied official project site and Devfolio listing.  
**Purpose:** Assess the event’s fit for PanelProof, a fail-closed continuity gate for AI-generated sequential art.

## Concise conclusion

GeNarrative Clash is an unusually direct fit for PanelProof. Its official brief places the project in the **Digital Illustration & 3D — Visual Art & Design Assist** track, describes the problem as uncontrolled hallucination in generative image workflows, and explicitly names non-destructive, iterative workflows as the desired direction [1]. The Devfolio listing independently frames the event as an open creative-artist track and permits any language, framework, API, or LLM [2].

PanelProof should therefore be presented as a narrow, demonstrable reliability layer for sequential visual storytelling: it checks whether a newly generated panel remains consistent with declared character, prop, setting, style, and story-state constraints, and blocks or routes failures for correction. The event pages establish the opportunity and constraints, not that PanelProof’s proposed gate already exists or that the judges will reward any specific implementation. Those product claims remain recommendations for PanelProof, not official event facts.

## Key findings

### 1. Official track fit is explicit

The project site lists four core tracks plus Open Innovation. The relevant track is **Digital Illustration & 3D — Visual Art & Design Assist** [1]. Its stated challenge is that generative image models can produce “uncontrollable random hallucinations” instead of controllable iterative layer workflows needed by artists [1]. PanelProof’s continuity-gate concept addresses that problem directly, especially for multi-panel or episodic art where a single bad generation can break story continuity.

The Devfolio page corroborates the broader positioning: GeNarrative Clash is an open track for real-world tools that “assist, elevate, and support creative artists,” including digital-art and visual co-pilot workflows [2].

### 2. The event rewards a working GenAI build, not only a concept

The official project site describes a two-phase submission and sprint model: teams submit a 50% MVP online, then shortlisted teams complete the remaining 50% in a six-hour live campus sprint [1]. The site says the online submission includes a GitHub repository link, README, and live video demo URL [1]. It also states that online MVPs are reviewed for innovation, technical complexity, GenAI usage, repository structure, and demo execution [1].

Devfolio independently confirms the 50/50 pre-build rule and the six-hour live sprint [2]. This creates a practical requirement for PanelProof: the pre-built portion should establish a stable end-to-end demo, while the live portion should add a visible, technically meaningful capability rather than merely polishing the interface.

### 3. The official technical surface is permissive and multimodal

The project site states that there are no technology-stack restrictions and names programming languages, frameworks, APIs, and LLM providers as open choices [1]. It explicitly permits OpenAI, Gemini, Anthropic, and open-source models, and mentions prompt chaining, multimodal models, multi-agent frameworks, tool calling, realtime APIs, edge AI, ControlNet, IP-Adapters, diffusion inpainting, SVG path generation, and WebGPU shaders as possible technologies or directions [1].

These are **officially listed freedoms and examples**, not evidence that the event requires any one of them or that the organizers have validated PanelProof’s architecture. Devfolio confirms the no-stack-restriction position but does not add a required technical stack [2].

### 4. Continuity and hallucination resistance are legible judging narratives

The project site’s Narrative & Screenplay track calls out lore consistency, dialogue voice fidelity, and branching continuity, while the Visual Art & Design Assist track calls out random image hallucinations and the need for controllable iterative workflows [1]. Together, these statements make “continuity under generation” a credible cross-track narrative for PanelProof: it is visual-first, but it can be explained as enforcing declared story and asset constraints across sequential outputs.

This is an interpretation for PanelProof, not a published scoring rubric. The site does list innovation, technical complexity, GenAI usage, repository structure, and demo execution as evaluation factors [1].

### 5. Team and precedent evidence is limited

Devfolio states an allowed team size of **2–4** and names the organizer as the GeeksforGeeks Student Chapter at Techno India University [2]. The supplied pages identify organizers, partners, mentors, and judges, but they do not expose a public PanelProof repository, a prior PanelProof team, or a verifiable prior winning implementation. No team precedent should be claimed from these pages.

The project site names domains associated with listed mentors and judges, including multimodal GenAI, generative visuals, LLM orchestration, and audio AI [1]. That is evidence about the event’s stated evaluation context, not proof of individual endorsement or a guarantee of judging preference.

## Direct implications for PanelProof

1. **Position the product in the official visual-art problem language.** Lead with “a continuity and hallucination gate for controllable iterative visual workflows,” explicitly tying the demo to sequential art rather than presenting a generic image-quality checker. This recommendation follows the event’s own Visual Art & Design Assist framing [1].

2. **Make the fail-closed behavior the visible hero moment.** The demo should show a baseline panel that violates a declared constraint, a machine-readable reason for rejection, and a corrected or regenerated panel that passes. A pass/fail gate is easier to evaluate in a short pitch than an invisible orchestration layer. This is PanelProof design advice, not an event rule.

3. **Use the 50/50 structure deliberately.** Before the event, prepare the constraint schema, reference-asset ingestion, baseline generation path, evaluator, and a small sequential-art test set. Reserve the live sprint for one meaningful extension, such as multi-panel state propagation, a stronger visual embedding check, or an audit trail that explains why a panel was blocked. The event’s published 50/50 rule and Git-history verification make this division strategically relevant [1] [2].

4. **Optimize for a reproducible technical demo and repository.** Because the project site explicitly lists GenAI usage, technical complexity, repository structure, and demo execution among evaluation considerations, PanelProof should ship with a concise README, deterministic sample prompts/assets, visible logs, and a one-command or one-click path from input to gate decision [1]. These are recommendations based on the stated criteria, not guarantees of scoring outcomes.

5. **Avoid overclaiming visual truth.** PanelProof should define what it can verify—declared identities, reference similarity, object presence, scene/state continuity, and policy thresholds—and fail closed when evidence is insufficient. It should not claim semantic perfection or human-level artistic judgment unless demonstrated. This recommendation is consistent with the event’s stated concern about hallucination, but the product boundary is PanelProof’s own design choice.

## Official facts vs. evidence vs. recommendations

- **Official facts:** The event date and Kolkata venue; the open creative-artist framing; the Digital Illustration & 3D — Visual Art & Design Assist track; no technology-stack restrictions; the 50/50 pre-build/live-build rule; the six-hour final sprint; stated submission materials; the published evaluation dimensions; and the Devfolio team size of 2–4 [1] [2].
- **Technical evidence:** The official site explicitly names the problem of random image hallucinations and lists ControlNet, IP-Adapters, diffusion inpainting, SVG path generation, WebGPU shaders, multimodal models, and orchestration as relevant technologies or examples [1]. This demonstrates thematic and technical alignment, not a validated PanelProof implementation.
- **Team precedent:** The pages identify the organizer, partners, mentors, judges, and team-size information, but provide no public PanelProof codebase or prior PanelProof result. No precedent is asserted.
- **Recommendation:** Build PanelProof as a demonstrable, fail-closed sequential-art gate with an auditable rejection path, reproducible samples, and a live-sprint extension. This is strategic advice for PanelProof, not an official rule.

## Sources

[1] Official GeNarrative Clash 2026 project site: https://genarrative-clash-2026.web.app/  
[2] Official Devfolio listing for GeNarrative Clash: https://genarrative-clash.devfolio.co/  
[3] Devfolio Code of Conduct linked from the official listing: https://devfolio.co/code-of-conduct

## Evidence limits

The supplied official project page and Devfolio listing are the primary evidence used here. The project page contains extensive promotional and planning copy, including technical examples and evaluation language, but it does not itself prove that every named technology, mentor affiliation, infrastructure claim, prize detail, or venue service was independently verified. The Devfolio page corroborates the event identity, date, venue, open creative track, no-stack-restriction statement, 50/50 rule, and team size, but its FAQ answers are partly collapsed in the extracted page text.

No public source in the supplied pages exposes an PanelProof-specific submission, repository, benchmark, winner history, or organizer statement about continuity gates. Accordingly, this report does not claim that PanelProof is accepted, selected, endorsed, or technically validated by GeNarrative Clash. Dates and deadlines are reported as displayed on the pages at the research time; event details can change, so the live official pages should be checked before submission.
