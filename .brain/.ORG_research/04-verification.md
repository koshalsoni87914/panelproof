# PanelProof research: visual verification and evidence architecture

**Scope.** This report examines the two requested official projects as evidence for a Track 04 Visual Art & Design Assist MVP: a fail-closed continuity gate for AI-generated sequential art. It distinguishes official repository facts, technical evidence from papers/model cards, team precedent, and recommendations for PanelProof. Facts were checked on 2026-11-17.

## Concise conclusion

DINOv2 is the directly relevant technical foundation. Its official model card says the models return a class token and patch tokens, support image retrieval with nearest neighbors, and provide multi-purpose visual features without fine-tuning. The repository also reports benchmark results for classification, depth, segmentation, and retrieval. This supports a continuity gate based on reference-to-candidate embedding similarity plus localized patch evidence, but it does **not** establish that DINOv2 alone can verify identity, pose, costume, hand details, text, or narrative continuity.

Amphion is not a visual verification system. The official repository and its v0.2 technical report describe an open-source toolkit for audio, music, and speech generation, with evaluation metrics and reproducibility-oriented tooling. Its value to PanelProof is team/process precedent: expose measurable checks, preserve reproducible inputs and outputs, and make model scope explicit. It is not evidence that an audio toolkit can validate sequential-art images.

## Key findings

### 1. DINOv2 supplies reusable visual representations, not a finished continuity classifier

**Official fact.** The DINOv2 README describes pretrained Vision Transformer backbones whose features can be used by simple classifiers across computer-vision tasks, with no fine-tuning required. The model card specifies that an input image yields a class token and patch tokens, with optional register tokens, and that larger images are accepted when dimensions are multiples of the 14-pixel patch size; otherwise the model crops to the closest smaller multiple. [1] [2]

**Technical evidence.** The DINOv2 paper describes self-supervised pretraining on a curated, diverse image dataset and reports all-purpose visual features that transfer across image distributions and tasks. The model card reports ImageNet classification, depth, segmentation, classification, and Oxford-H retrieval results. It also explicitly lists image retrieval using nearest neighbors as a direct use. [2] [3]

**Boundary.** None of those sources claims that a raw embedding distance is a reliable identity-preservation or comic-panel continuity score. Similarity is therefore evidence to combine with other checks, not a semantic verdict.

### 2. Patch-level outputs are the most useful bridge to explainable visual evidence

**Official fact.** DINOv2 returns patch tokens as well as the global class token. For a 224×224 input, the model card describes 256 patch tokens, with the exact token geometry determined by the 14-pixel patching scheme. [2]

**Recommendation.** PanelProof should retain the candidate image, normalized/preprocessed image, global embedding, patch embeddings, model identifier, preprocessing parameters, and reference-image identifiers. A panel can then show both a global similarity result and a localized “where evidence agrees/disagrees” overlay. This is an PanelProof design recommendation, not a capability claimed by DINOv2’s authors.

### 3. DINOv2’s public evaluation does not equal sequential-art validation

**Official fact.** The published evaluation covers ImageNet classification, NYU-Depth v2 and SUN-RGBD depth, ADE20K segmentation, iNaturalist classification, and Oxford-H retrieval. The model card reports, for example, ViT-B/14 without registers at 84.5% ImageNet linear accuracy and 49.5 Oxford-H nearest-neighbor retrieval mAP; larger variants report different values. [2]

**Implication.** These metrics demonstrate transferable visual representations and retrieval usefulness, but they do not measure character consistency across panels, costume continuity, facial identity, panel layout, speech balloons, or story state. PanelProof must create a small domain-specific acceptance set and calibrate thresholds against human labels rather than importing DINOv2 benchmark numbers as gate thresholds.

### 4. Model-card limitations require conservative use and explicit uncertainty

**Official fact.** The DINOv2 model card records a bias toward rich households from Western countries and warns that fine-tuning can increase bias. It presents the models as vision backbones for downstream use, not as safety or authenticity adjudicators. [2]

**Recommendation.** The gate should expose “insufficient evidence” when the image is out of distribution, heavily stylized, low-resolution, cropped, or structurally unlike the reference. It should avoid a binary claim such as “the character is identical.” A fail-closed result should mean “the candidate does not meet the configured evidence requirements,” not “the image is objectively wrong.”

### 5. Amphion is a useful reproducibility/evaluation precedent, but it is out of domain

**Official fact.** Amphion’s README describes it as an open-source toolkit for Audio, Music, and Speech Generation. It supports tasks such as text-to-speech, singing-voice synthesis, voice conversion, accent conversion, singing-voice conversion, and text-to-audio, and it includes vocoders, evaluation metrics, visualizations, and data-preparation infrastructure. The repository is MIT-licensed. [4]

**Technical evidence.** The v0.2 technical report characterizes Amphion as a framework for audio, music, and speech generation, with a large multilingual dataset, a data preparation pipeline, and models for speech/audio tasks. The repository’s `evaluation/` directory contains `features/` and `metrics/`, confirming an explicit evaluation surface. [5] [6]

**Boundary.** Amphion provides no evidence for image embeddings, comic continuity, or visual identity verification. Its relevance is “team precedent”: a toolkit can make research reproducible by packaging models, preprocessing, evaluation, tutorials, and artifacts. That precedent supports PanelProof’s evidence ledger and metric surface, not a reuse of Amphion’s models for visual gating.

## Direct implications for PanelProof

1. **Use a layered gate, not one score.** Combine DINOv2 global similarity with patch-level similarity and deterministic image checks such as dimensions, crop consistency, panel count/layout where available, and reference/candidate pairing. Keep each result separately auditable.

2. **Calibrate on an PanelProof continuity set.** Build a small labeled set of pass, borderline, and fail transitions across characters, costumes, props, pose, lighting, art style, and panel composition. Select thresholds from that set. Do not reuse ImageNet or Oxford-H metrics as product acceptance thresholds.

3. **Make fail-closed behavior explicit.** If preprocessing fails, dimensions are invalid, a model checkpoint is unavailable, evidence fields are missing, or scores fall in an uncertain band, block export and show the missing evidence. Preserve the original and normalized assets so the decision can be reproduced.

4. **Produce an evidence packet for every decision.** Include hashes of reference/candidate files, model and checkpoint identifiers, preprocessing parameters, global and patch-level scores, threshold version, failure reasons, and a compact visual diff/attention view. This follows Amphion’s reproducibility/evaluation precedent while remaining an PanelProof-specific recommendation.

5. **Separate visual continuity from semantic and textual checks.** DINOv2 evidence can support visual resemblance/retrieval, but identity attributes, story state, dialogue text, and exact object counts require additional specialized checks or human review. If those checks are not implemented, the UI should say so rather than implying complete continuity verification.

## Evidence classification

- **Official facts:** Repository descriptions, model/task lists, licenses, token outputs, supported direct uses, model-card limitations, evaluation datasets/metrics, and Amphion’s `evaluation/` directory are directly stated in the cited repositories or linked papers. [1] [2] [4] [6]
- **Technical evidence:** DINOv2’s self-supervised method, curated pretraining data claim, transfer benchmarks, and retrieval evaluation come from the paper/model card. Amphion’s toolkit scope and release contents come from its technical report. [2] [3] [5]
- **Team precedent:** Amphion’s packaging of generation tasks, preprocessing, evaluation, tutorials, and artifacts is treated as a precedent for reproducible research tooling. This is an interpretation of the cited project structure, not a claim about an PanelProof team member or event rule.
- **PanelProof recommendations:** The layered gate, calibration set, evidence packet, uncertainty band, fail-closed export behavior, and separation of modality-specific checks are recommendations made here. They are not claimed features of DINOv2 or Amphion.

## Evidence limits

The supplied sources do not provide a validated sequential-art continuity benchmark, a character-identity threshold, a comic-panel dataset, or evidence that DINOv2 is robust to every art style and generation artifact. They also do not establish any hackathon judging rule, required product capability, or event constraint. DINOv2’s reported metrics are task- and dataset-specific, and embedding similarity can be affected by composition, background, style, crop, resolution, and other factors. The model-card bias statement means deployment should include representative validation and human escalation. Amphion’s presence of evaluation code demonstrates a software-organization pattern, not visual-verification performance. Any PanelProof claim stronger than “this candidate met our configured evidence checks” would require new domain-specific experiments.

## Sources

[1]: https://github.com/facebookresearch/dinov2 "Official DINOv2 repository"

[2]: https://github.com/facebookresearch/dinov2/blob/main/MODEL_CARD.md "DINOv2 model card"

[3]: https://arxiv.org/abs/2304.07193 "DINOv2: Learning Robust Visual Features without Supervision"

[4]: https://github.com/open-mmlab/Amphion "Official Amphion repository"

[5]: https://arxiv.org/abs/2501.15442 "Overview of the Amphion Toolkit (v0.2)"

[6]: https://github.com/open-mmlab/Amphion/tree/main/evaluation "Amphion evaluation directory"
