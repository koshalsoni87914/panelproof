# PanelProof Stage-Safe Demo Scope

## Demo story

A generated panel looks attractive but the character's scar moved from the left jaw to the right jaw. PanelProof does not ask the artist to trust a vibe. It identifies the broken claim, shows evidence, fails the export gate, and preserves human control.

## 100-second sequence

1. **0:00–0:12 — Problem:** Show two panels and point out the changed scar.
2. **0:12–0:28 — Canon:** Load a character reference and show the structured claims card.
3. **0:28–0:48 — Audit:** Run the clean fixture and show accepted identity/palette scores.
4. **0:48–1:05 — Drift:** Run the corrupted fixture and show `BLOCK`, the observed wrong side, threshold, and evidence crop.
5. **1:05–1:18 — Fail closed:** Switch to verifier-error fixture and show `UNVERIFIED`; export remains closed.
6. **1:18–1:30 — Control:** Show the Region Lock result with `locked_pixel_delta = 0`.
7. **1:30–1:40 — Close:** State that repair and sequence mode are the next live-finale build, not pretend they already work.

## Fallback

If a live API fails, run fixture replay. The fallback must still show the real deterministic gate, receipts, evidence metadata, and fail-closed behavior. Never replace a failed live call with a fake “success” label.

## Judge questions

**Is this just an image-model wrapper?** No. Models are adapters. The product is the claim schema, independent verdict policy, evidence receipt, fail-closed behavior, and locked-region invariant.

**Is it genuinely agentic?** The finale version has Plan → Render → Critique → Repair → Re-score with a maximum attempt count and visible trace. The submitted MVP proves the gate first.

**Can the score be trusted?** It is not a claim of artistic truth. It is an explainable, calibrated ranking over declared traits, with abstention when evidence is weak.

**Why does the artist stay in control?** Claims are artist-declared, edits are reversible, overrides require a reason, and locked pixels are restored from the parent node.
