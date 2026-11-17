# PanelProof — Hackathon MVP, Demo Reliability, and 50/50 Build Compliance

**Research date:** 2026-11-17  
**Scope:** GeNarrative Clash 2026, with PanelProof positioned as a Track 04 Visual Art & Design Assist hackathon MVP: a fail-closed continuity gate for AI-generated sequential art.

## Bottom line

PanelProof is a strong fit for the event’s creative-art direction because the official event materials explicitly invite digital-art and visual co-pilot projects, and the organizer’s site describes a need for non-destructive workflows that reduce uncontrolled image-generation hallucinations. The public rules allow any stack and permit up to 50% pre-building, but require the remaining 50% to be built live during the six-hour sprint. [1] [2]

The safest compliance posture is therefore not to claim that PanelProof is exactly “50% code” before the event. The published rule does not define a code-counting formula. Instead, freeze and document a small pre-built foundation, preserve the full Git history, and make the continuity gate’s core enforcement path visibly new during the live sprint. Treat reliability as a deterministic demo contract: local fixtures and a mock path must always work, while live AI/image calls are optional and fail closed rather than silently accepting invalid continuity.

## Key findings

### 1. The event’s official public materials support PanelProof’s problem framing

The organizer’s website has a “Digital Illustration & 3D” section titled “Visual Art & Design Assist.” It frames the challenge as helping animators and artists avoid random generation hallucinations and names non-destructive workflows as the desired direction. It also lists ControlNet, IP-Adapters, diffusion inpainting, SVG path generation, and WebGPU shaders as example technologies. This is direct official evidence that a continuity-control product for sequential art is on-theme, although the site does not specifically mention PanelProof or continuity gates. [1]

Devfolio’s official event listing uses a broader “Open Track” formulation and lists “Digital Art & Visual Co-Pilots” among potential project directions. It says teams may solve any real-world problem in the artistic or creative domain. Thus, “Track 04” is supported by the organizer site’s navigation/content, while Devfolio’s canonical listing presents the same area as an open creative track rather than a separately enumerated Track 04. [2]

### 2. The published 50/50 rule is real, but it is qualitative rather than mathematically specified

Both the organizer site and Devfolio state that teams may pre-build up to 50% before event day and must build the remaining 50% live during the six-hour sprint. The organizer site gives examples of pre-build work such as UI templates, design systems, and authentication scaffolding, and live work such as prompt tuning, API orchestration, and inference hooks. It also says Git commit history will be verified during jury evaluation. [1] [2]

Neither public page defines how “50%” is calculated. There is no published formula based on lines of code, files, features, effort-hours, commits, or user-visible capability. Therefore, an exact numerical claim about PanelProof’s pre-built percentage would be an inference, not an official fact. The compliance objective should be auditable provenance and a credible live-build boundary, not an invented LOC ratio.

### 3. The event-day window is short enough that live AI dependencies are a demo risk

The official Devfolio schedule places the hackathon on November 21, 2026, from 12:00 PM to 5:45 PM IST, a five-hour-forty-five-minute calendar window. The organizer’s site describes this as a six-hour live sprint and gives the same day’s broader timetable, including a masterclass before the sprint and judging/pitches after it. [1] [3]

The public materials do not promise model availability, API quotas, network quality, latency, image-generation uptime, or sponsor-service access. The linked Adaption referral page currently exposes only an email sign-in prompt, so it is not evidence that a particular model, API, or quota will be available to PanelProof. [2] [5]

For a demo, this makes a deterministic local fixture path essential. A live model should enrich the demo, not be the only path to a valid result. If an upstream service times out, returns malformed metadata, or produces an image that fails the continuity checks, PanelProof should reject the panel or mark it as unresolved rather than accept it.

### 4. Devfolio’s general Code of Conduct adds a disclosure obligation for reused work

Devfolio’s Code of Conduct applies to hackathons and projects made at them. It says reused code or a resubmitted project must disclose the previous use and extent in the submission; undisclosed reuse can lead to requests for comparison and automatic loss of award eligibility. It also states that violations can lead to expulsion or access restrictions. [4]

This is not a replacement for the event-specific 50/50 rule. It is a separate platform-level constraint that makes a pre-event provenance manifest valuable. PanelProof should disclose any starter templates, libraries, prior continuity algorithms, datasets, or previously submitted components that materially carry into the submission.

### 5. Organizer communications support build-in-public and custom-AI positioning, but do not create additional rules

A public post from GFG Campusbody TIU identifies Adaption as the event’s official AI partner and describes the event as attracting applications and teams building generative-AI solutions. It promotes moving beyond wrapper applications toward custom AI solutions. This is useful team/organizer precedent for showing visible technical substance, but it is not an official statement that PanelProof must use Adaption, train a custom model, or satisfy a separate judging rule. [6]

Searches did not produce a public organizer document establishing a numeric commit threshold, a required GitHub workflow, or a prior enforcement decision for this event. The only event-specific enforcement language located is the organizer site’s statement that Git commit history will be verified.

## Direct implications for PanelProof

1. **Make the product visibly Track 04-native.** The MVP should demonstrate sequential-art continuity: ingest a reference panel and character/style constraints, evaluate the next panel, and fail closed with concrete reasons when identity, costume, pose, palette, line treatment, or declared scene constraints drift. This is a recommendation derived from the event’s visual-art brief, not an official product requirement.

2. **Pre-build the boring foundation; reserve the defensible gate for the sprint.** Before event day, prepare repository structure, UI shell, typed schemas, test fixtures, a simple panel viewer, and a clearly labeled mock adapter. During the live sprint, implement or materially extend the continuity policy engine, evidence report, image/metadata adapter, and end-to-end decision path. This maps to the organizer’s own examples of foundation work versus live prompt/API/inference work. [1]

3. **Use a fail-closed reliability contract.** The demo must have a deterministic “known-good” fixture and a deterministic “known-bad” fixture that run without network access. A live generation path may be shown as an enhancement. Any timeout, missing panel, invalid schema, or low-confidence comparison should yield `REJECT` or `UNRESOLVED`, never an implicit pass. This is PanelProof’s recommended architecture, not a published event requirement.

4. **Create a 50/50 evidence packet.** Keep the repository’s original history; do not squash away pre-event commits. Tag the pre-event baseline before the sprint, record the timestamp and commit hash, maintain a short change ledger, and capture a screen recording or signed log of the live implementation window. In the README, separate “pre-built foundation” from “live-built core.” This directly addresses the published statement that commit history will be verified, while acknowledging that the public rules do not define an exact percentage formula. [1]

5. **Disclose reuse and dependency boundaries.** List all reused code, templates, open-source packages, model APIs, generated assets, and prior work. State what PanelProof itself implemented during the sprint. This reduces the risk created by Devfolio’s reuse-disclosure policy and prevents the demo from implying that an unavailable sponsor service is a guaranteed dependency. [4]

## Suggested demo contract for a reliable MVP

The recommended five-minute path is: load a known-good three-panel sequence; show the continuity record and a green pass; change one character/style constraint or substitute a deliberately inconsistent panel; run the gate; show a red fail-closed decision with machine-readable reasons; then optionally invoke a live AI/image path and show that a timeout or malformed response becomes `UNRESOLVED` rather than a false pass.

The UI should make provenance visible. Each panel result should show the input asset hash or fixture ID, constraint version, gate version, timestamp, and decision. The live demo should include an exportable JSON/Markdown evidence report so judges can inspect what was checked. This recommendation improves both demo reliability and the credibility of the 50/50 story, but no source claims that judges require this exact interface.

## Evidence limits

The provided project website and Devfolio listing are the strongest available sources for event-specific facts. They agree on the creative scope, unrestricted technology choice, 50/50 pre-build/live-build rule, and November 21, 2026 event date, but the organizer site contains additional phase/submission details that are not reproduced on the public Devfolio page. Treat the organizer-site claims about the online 50% submission round, Git verification, Top 150, and submission artifacts as organizer-published claims, not independently verified Devfolio requirements. [1] [2]

The public rules do not define “50%” operationally. No authoritative source located specifies a percentage calculation method, required commit cadence, minimum number of live commits, mandatory screen recording, or whether prompt/model configuration counts as code. PanelProof can recommend an audit trail, but it must not present that trail as an official rule.

The public Adaption referral page is gated behind email sign-in and provides no usable technical specification in the unauthenticated view. No model/API availability, rate limit, or sponsor entitlement should be assumed from the event listing alone. [5]

The organizer’s LinkedIn post is a team/organizer communication and is useful as precedent only. Its application and team-count figures were not independently verified here and do not change the event rules. [6]

## Sources

[1]: https://genarrative-clash-2026.web.app/ "GeNarrative Clash 2026 organizer website"
[2]: https://genarrative-clash.devfolio.co/ "GeNarrative Clash 2026 official Devfolio listing"
[3]: https://genarrative-clash.devfolio.co/schedule "GeNarrative Clash 2026 official Devfolio schedule"
[4]: https://devfolio.co/code-of-conduct "Devfolio Code of Conduct"
[5]: https://adaptionlabs.ai/app/auth/referral?ref=c902663068828f4bf2e63348 "Adaption official referral/login page linked from Devfolio"
[6]: https://www.linkedin.com/posts/gfg-campusbody-tiu_genarrativeclash2026-adaptionai-geeksforgeeks-activity-7526553539733803008-BmmV "GFG Campusbody TIU organizer LinkedIn post"
