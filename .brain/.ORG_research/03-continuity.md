# PanelProof: AI Sequential-Art Continuity Problem and Prior Art

**Research date:** 2026-11-17  
**Scope:** The continuity problem for AI-generated sequential art, with the provided SAM 3 and InstantID sources as the starting point. The report distinguishes official source facts, technical evidence, research precedent, and recommendations for PanelProof. It does not infer unverified hackathon rules or product capabilities.

## Concise conclusion

AI image generators can be made more consistent, but generation-time consistency is not the same as verification. The most defensible MVP position for PanelProof is therefore a **fail-closed continuity gate**: treat each panel as an evidence-bearing artifact, measure whether required entities and attributes persist across panels, and block export when required checks are missing or below threshold. SAM 3 is relevant as a perception primitive for segmenting/tracking prompted objects; InstantID is relevant as a single-reference face-identity conditioning primitive. Neither source demonstrates a complete sequential-art continuity checker, and neither should be presented as one.

## Key findings

### 1. SAM 3 provides object-level evidence, not semantic story continuity

**Official fact.** Meta describes SAM 3 as a unified promptable model that detects, segments, and tracks matching objects in images and videos using short text phrases, image exemplars, or visual prompts. Its research paper defines Promptable Concept Segmentation (PCS) as returning masks and unique identities for matching object instances; the paper describes an image-level detector and memory-based video tracker sharing a backbone. [1](https://ai.meta.com/research/sam3/) [2](https://arxiv.org/abs/2511.16719)

**Technical implication.** For a comic, this can support measurements such as “the red coat is present,” approximate panel location, mask overlap, object count, and whether a prompted instance is trackable across a supplied sequence. It does not, by itself, prove that two differently drawn faces are the same character, that a prop has the correct state, or that a panel obeys the story specification. SAM 3’s official descriptions are about segmentation/tracking, not narrative reasoning or acceptance gating.

**Important quality caveat.** The Hugging Face model card warns that streaming video inference disables hotstart heuristics that use future frames, which can produce more false positives and duplicate tracks than pre-loaded video inference. A panel-by-panel gate should therefore record the inference mode and treat tracking output as evidence with uncertainty, not ground truth. [3](https://huggingface.co/facebook/sam3)

### 2. InstantID addresses identity-preserving generation, but its evidence is face-centric and bounded

**Official fact.** The InstantID repository presents a tuning-free method for identity-preserving generation from a single reference image. The authors describe a face encoder, an image-prompt adapter with decoupled cross-attention, and an IdentityNet that adds weak spatial control through facial landmarks. The implementation is built around an SDXL pipeline and face embeddings. [4](https://github.com/InstantID/InstantID)

**Technical evidence.** The technical report states that InstantID uses one reference identity image, keeps the pretrained diffusion model frozen, and trains only added adapter/IdentityNet modules. It reports experiments focused on single-person images and uses a face model to extract identity embeddings. The report also explains that the method deliberately uses coarse five-point facial landmarks to balance spatial constraint against editability. [5](https://arxiv.org/html/2401.07519v1)

**Boundary.** The repository explicitly says multi-person support is not supported in the supplied usage guidance and that the largest face is used as the reference facial landmark source. Thus InstantID is useful as a generator-side identity aid or as a candidate face-similarity signal for single prominent characters, but it is not evidence that all characters, costumes, props, silhouettes, or non-face attributes remain continuous across panels.

### 3. Sequential-image consistency is a recognized research problem, not a solved product capability

**Research precedent.** StoryDiffusion (NeurIPS 2024) frames consistency across a series of generated images as a significant challenge. Its Consistent Self-Attention augments pretrained text-to-image models in a zero-shot manner, and its paper describes a separate semantic motion predictor for longer video transitions. The project site shows comics and multiple-character examples, but these are demonstrations of a generation framework, not a fail-closed verifier. [6](https://proceedings.neurips.cc/paper_files/paper/2024/hash/c7138635035501eb71b0adf6ddc319d6-Abstract-Conference.html) [7](https://storydiffusion.github.io/)

**Research precedent.** The Chosen One defines consistent-character generation as a practical user problem in story visualization, game development, asset design, and advertising. Its method iteratively identifies a coherent set of images and extracts a more consistent identity from that set; the paper reports quantitative analysis and a user study. This is stronger precedent for the problem's importance than evidence that a generic image generator can certify continuity. [8](https://dl.acm.org/doi/abs/10.1145/3641519.3657430)

### 4. Continuity is multi-attribute and should be decomposed into checkable claims

**Synthesis from the sources.** The reviewed systems cover different layers: SAM 3 supplies masks, instance identities, and tracking; InstantID supplies face-identity conditioning; StoryDiffusion and The Chosen One supply generation strategies for coherent sequences. A sequential-art continuity decision still needs a contract for each panel: which characters and props must exist, required attributes, permitted changes, spatial/temporal relations, and the evidence needed to pass.

For an MVP, the most auditable checks are presence/count, approximate location, coarse appearance attributes, face identity when a usable face is visible, and cross-panel entity linking. Pose, occlusion, stylization, extreme camera changes, profile views, tiny panels, and non-human characters should be treated as lower-confidence cases rather than silently passed.

### 5. The provided sources do not establish hackathon rules, team precedent, or PanelProof product capabilities

No provided or followed source was an official Track 04 rules page, judging rubric, or PanelProof product specification. The papers and repositories establish technical precedent only. Any claim about event requirements, permitted models, judging criteria, team history, or an existing PanelProof implementation would require separate first-party evidence and is intentionally omitted here.

## Direct implications for PanelProof

1. **Make the product a gate, not a generator.** PanelProof should accept panel images plus an explicit continuity manifest, then emit `PASS`, `FAIL`, or `INSUFFICIENT_EVIDENCE`. It should not claim that SAM 3 or InstantID guarantees continuity.

2. **Represent continuity as an evidence ledger.** For each required entity and attribute, store the panel index, detector/segmenter output, reference or prior-panel evidence, confidence, and reason for any failure. A missing mask, ambiguous face, duplicate track, or unsupported multi-person case should be able to fail closed.

3. **Use SAM 3 selectively for measurable visual facts.** Prompted masks/tracks can support presence, count, rough position, overlap, and persistence checks. Prefer pre-loaded sequence inference where applicable, record the mode, and expose duplicate/false-positive uncertainty rather than hiding it.

4. **Use InstantID only as an optional identity aid.** For a single prominent human character with a valid face reference, use face embeddings or generation conditioning as supporting evidence. Do not use it as the sole gate for multi-character pages, costume continuity, props, silhouettes, or obscured/profile faces.

5. **Define abstention as a feature.** The MVP's differentiator can be a visible “cannot verify” state with an actionable reason, instead of a plausible-looking green check. This is the clearest way to convert imperfect prior art into a trustworthy sequential-art workflow.

## Official facts vs. technical evidence vs. precedent vs. recommendation

- **Official facts:** Meta's SAM 3 page and paper describe promptable image/video detection, segmentation, tracking, masks, and unique instance identities. The InstantID repository and paper describe single-image, face-identity-preserving generation with IdentityNet and adapter components. [1](https://ai.meta.com/research/sam3/) [2](https://arxiv.org/abs/2511.16719) [4](https://github.com/InstantID/InstantID) [5](https://arxiv.org/html/2401.07519v1)
- **Technical evidence:** The primary papers report architectures, datasets/evaluation claims, and usage boundaries. Those claims support using the systems as signals, not as an independently validated continuity gate. [2](https://arxiv.org/abs/2511.16719) [5](https://arxiv.org/html/2401.07519v1) [6](https://proceedings.neurips.cc/paper_files/paper/2024/hash/c7138635035501eb71b0adf6ddc319d6-Abstract-Conference.html)
- **Research/team precedent:** StoryDiffusion and The Chosen One are research precedents for coherent stories and character consistency. They are not evidence of a specific hackathon team's work, PanelProof's implementation, or event rules. [7](https://storydiffusion.github.io/) [8](https://dl.acm.org/doi/abs/10.1145/3641519.3657430)
- **Recommendation:** The proposed fail-closed manifest, evidence ledger, confidence handling, and abstention behavior are PanelProof design recommendations derived from the evidence above; they are not capabilities claimed by the cited projects.

## Evidence limits

- The official SAM 3 page and Hugging Face card describe broad capabilities, but they do not provide a comic-panel continuity benchmark or a pass/fail specification.
- SAM 3 benchmark claims are reported by the authors; this report does not independently reproduce the SA-Co results or establish performance on stylized comics, manga, tiny panels, heavy occlusion, or adversarial edits.
- InstantID's evidence is primarily about human-face identity preservation. The source explicitly narrows the supplied workflow to the largest face and says multi-person support is not supported; it should not be generalized to full-page character and prop continuity.
- StoryDiffusion and The Chosen One demonstrate or evaluate consistency-oriented generation, but generation examples and identity metrics do not equal a calibrated verifier with a known false-accept rate.
- The ACM page exposes the author-written abstract and metadata but not the entire article in the fetched view; detailed method claims beyond the abstract were not used.
- No source reviewed here verifies Track 04 event rules, judging criteria, team precedent, deployment permissions, or the current legal/commercial suitability of every model checkpoint. The SAM 3 Hugging Face page labels the license as “other” and requires accepting access conditions; PanelProof must verify the exact checkpoint terms before distribution or hosted use. [3](https://huggingface.co/facebook/sam3)

## Sources

1. [Meta AI — Introducing Meta Segment Anything Model 3](https://ai.meta.com/research/sam3/)
2. [Carion et al. — SAM 3: Segment Anything with Concepts, arXiv](https://arxiv.org/abs/2511.16719)
3. [Hugging Face — facebook/sam3 model card](https://huggingface.co/facebook/sam3)
4. [InstantX Research — InstantID GitHub repository](https://github.com/InstantID/InstantID)
5. [Wang et al. — InstantID: Zero-shot Identity-Preserving Generation in Seconds, arXiv HTML](https://arxiv.org/html/2401.07519v1)
6. [Zhou et al. — StoryDiffusion, NeurIPS 2024](https://proceedings.neurips.cc/paper_files/paper/2024/hash/c7138635035501eb71b0adf6ddc319d6-Abstract-Conference.html)
7. [StoryDiffusion official project page](https://storydiffusion.github.io/)
8. [Avrahami et al. — The Chosen One, ACM SIGGRAPH 2024](https://dl.acm.org/doi/abs/10.1145/3641519.3657430)
