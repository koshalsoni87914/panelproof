/**
 * PanelProof Creator Review Bench — Fixture Dataset
 * Maps directly to evaluation fixtures in fixtures/continuity/
 */

export const FIXTURE_PANELS = [
  {
    id: "C-001",
    panelNumber: 1,
    title: "Panel 1: Karan Confrontation (Baseline)",
    subject: "Karan",
    description: "Baseline panel with all canonical attributes and palette matching reference sheet.",
    status: "ALLOW",
    reasonCode: "ACCEPT_PASSED",
    summary: "All 4 declared checks passed. Face cosine 0.93 meets threshold. Palette and scar placement verified.",
    nextAction: "Safe for publication export. No continuity drift detected.",
    lockedPixelDelta: 0,
    referenceImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231e293b'/><circle cx='200' cy='180' r='90' fill='%23fbcfe8'/><path d='M160 210 Q150 230 145 240' stroke='%23dc2626' stroke-width='4' fill='none'/><rect x='130' y='270' width='140' height='130' fill='%231e3a8a'/><text x='200' y='50' fill='%2394a3b8' font-size='18' text-anchor='middle' font-family='sans-serif'>Canonical Reference (Karan)</text><text x='130' y='225' fill='%23ef4444' font-size='12' font-family='sans-serif'>Scar: Left Jaw</text></svg>",
    targetImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%230f172a'/><circle cx='200' cy='180' r='90' fill='%23fbcfe8'/><path d='M160 210 Q150 230 145 240' stroke='%23dc2626' stroke-width='4' fill='none'/><rect x='130' y='270' width='140' height='130' fill='%231e3a8a'/><text x='200' y='50' fill='%2334d399' font-size='18' text-anchor='middle' font-family='sans-serif'>Target Panel 1 (Clean)</text></svg>",
    claims: [
      {
        id: "face.identity",
        label: "Character Facial Identity",
        kind: "identity",
        severity: "block",
        source: "artist-declared",
        status: "PASS",
        observedScore: 0.93,
        threshold: 0.82,
        metric: "Cosine Similarity",
        verifier: "insightface/buffalo_l",
        observedText: "cosine 0.93 vs refs/karan_01.png",
        latencyMs: 96,
        costUsd: 0.0,
        bbox: [110, 90, 270, 270]
      },
      {
        id: "trait.scar.side",
        label: "Facial Scar Laterality",
        kind: "attribute",
        severity: "block",
        source: "artist-declared",
        status: "PASS",
        observedScore: 0.91,
        threshold: 0.75,
        metric: "Keypoint Confidence",
        verifier: "gemini-3-flash/vision",
        observedText: "scar clearly present on canonical left jaw",
        latencyMs: 742,
        costUsd: 0.00038,
        bbox: [140, 205, 170, 245]
      },
      {
        id: "outfit.coat",
        label: "Costume - Navy Overcoat",
        kind: "attribute",
        severity: "warn",
        source: "artist-declared",
        status: "PASS",
        observedScore: 0.84,
        threshold: 0.70,
        metric: "Attribute Confidence",
        verifier: "gemini-3-flash/vision",
        observedText: "navy coat with visible collar and buttons",
        latencyMs: 680,
        costUsd: 0.00038,
        bbox: [130, 270, 270, 400]
      },
      {
        id: "palette.house",
        label: "Studio Color Palette",
        kind: "palette",
        severity: "warn",
        source: "artist-declared",
        status: "PASS",
        observedScore: 4.2,
        threshold: 8.0,
        metric: "DeltaE Color Distance",
        verifier: "panelproof/deltae_histogram",
        observedText: "deltaE 4.2 vs palette swatch (max allowed 8.0)",
        latencyMs: 14,
        costUsd: 0.0,
        bbox: [0, 0, 400, 400]
      }
    ]
  },
  {
    id: "D-001",
    panelNumber: 2,
    title: "Panel 2: Alley Close-up (Corrupted Trait)",
    subject: "Karan",
    description: "Adversarial drift: scar erroneously rendered on right jaw instead of left jaw.",
    status: "BLOCK",
    reasonCode: "DRIFT_TRAIT_MISMATCH",
    summary: "Continuity Breach: Trait laterality inverted. Scar detected on right cheek (confidence 0.34 vs required 0.75).",
    nextAction: "Export Blocked. Inpaint or regenerate character face with prompt tag: 'vertical scar on character left jaw'.",
    lockedPixelDelta: 0,
    referenceImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231e293b'/><circle cx='200' cy='180' r='90' fill='%23fbcfe8'/><path d='M160 210 Q150 230 145 240' stroke='%23dc2626' stroke-width='4' fill='none'/><rect x='130' y='270' width='140' height='130' fill='%231e3a8a'/><text x='200' y='50' fill='%2394a3b8' font-size='18' text-anchor='middle' font-family='sans-serif'>Canonical Reference (Karan)</text><text x='130' y='225' fill='%23ef4444' font-size='12' font-family='sans-serif'>Scar: Left Jaw</text></svg>",
    targetImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%230f172a'/><circle cx='200' cy='180' r='90' fill='%23fbcfe8'/><path d='M240 210 Q250 230 255 240' stroke='%23dc2626' stroke-width='4' fill='none'/><rect x='130' y='270' width='140' height='130' fill='%231e3a8a'/><text x='200' y='50' fill='%23f43f5e' font-size='18' text-anchor='middle' font-family='sans-serif'>Target Panel 2 (DRIFT DETECTED)</text><text x='245' y='200' fill='%23f43f5e' font-size='12' font-family='sans-serif'>WRONG SIDE</text></svg>",
    claims: [
      {
        id: "face.identity",
        label: "Character Facial Identity",
        kind: "identity",
        severity: "block",
        source: "artist-declared",
        status: "PASS",
        observedScore: 0.91,
        threshold: 0.82,
        metric: "Cosine Similarity",
        verifier: "insightface/buffalo_l",
        observedText: "cosine 0.91 vs refs/karan_01.png",
        latencyMs: 92,
        costUsd: 0.0,
        bbox: [110, 90, 270, 270]
      },
      {
        id: "trait.scar.side",
        label: "Facial Scar Laterality",
        kind: "attribute",
        severity: "block",
        source: "artist-declared",
        status: "BLOCK",
        observedScore: 0.34,
        threshold: 0.75,
        metric: "Keypoint Confidence",
        verifier: "gemini-3-flash/vision",
        observedText: "scar appears on the character's RIGHT jaw (laterality inverted)",
        latencyMs: 806,
        costUsd: 0.00041,
        bbox: [230, 205, 260, 245]
      }
    ]
  },
  {
    id: "L-001",
    panelNumber: 3,
    title: "Panel 3: Background Invariant Breach",
    subject: "Karan",
    description: "Pixel-level breach: 142 pixels were mutated inside an artist-locked static background box.",
    status: "BLOCK",
    reasonCode: "LOCKED_PIXELS_VIOLATED",
    summary: "Critical Invariant Breach: 142 pixels modified inside locked canvas coordinate bounds. Pixel locks are non-overridable.",
    nextAction: "Export Strictly Prohibited. Restore background mask from parent frame before continuing.",
    lockedPixelDelta: 142,
    referenceImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231e293b'/><rect x='20' y='20' width='120' height='120' fill='%23047857' stroke='%2334d399' stroke-width='2'/><text x='80' y='85' fill='%23ffffff' font-size='14' text-anchor='middle' font-family='sans-serif'>Locked Neon</text></svg>",
    targetImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%230f172a'/><rect x='20' y='20' width='120' height='120' fill='%23b91c1c' stroke='%23f87171' stroke-width='2'/><text x='80' y='85' fill='%23ffffff' font-size='14' text-anchor='middle' font-family='sans-serif'>Mutated</text><text x='200' y='200' fill='%23f43f5e' font-size='16' text-anchor='middle' font-family='sans-serif'>142 Pixels Changed</text></svg>",
    claims: [
      {
        id: "invariant.pixel_lock",
        label: "Locked Background Region Invariant",
        kind: "pixel_lock",
        severity: "block",
        source: "artist-declared",
        status: "BLOCK",
        observedScore: 142,
        threshold: 0,
        metric: "Mutated Pixels (Max 0)",
        verifier: "panelproof/pixel_comparator",
        observedText: "142 pixels modified in locked region [20, 20, 140, 140]",
        latencyMs: 8,
        costUsd: 0.0,
        bbox: [20, 20, 140, 140]
      }
    ]
  },
  {
    id: "E-001",
    panelNumber: 4,
    title: "Panel 4: Network Verifier Timeout",
    subject: "Karan",
    description: "Fail-closed check: remote VLM endpoint timed out after 3000ms. Policy engine failed closed.",
    status: "UNVERIFIED",
    reasonCode: "UNVERIFIED_TIMEOUT",
    summary: "Fail-Closed State: Trait verifier timed out. Policy conservatively flags UNVERIFIED to avoid silent failure.",
    nextAction: "Review manually or retry verification with local offline adapter fallback.",
    lockedPixelDelta: 0,
    referenceImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231e293b'/><circle cx='200' cy='180' r='90' fill='%23fbcfe8'/></svg>",
    targetImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%230f172a'/><circle cx='200' cy='180' r='90' fill='%23fbcfe8'/><text x='200' y='200' fill='%2338bdf8' font-size='20' text-anchor='middle' font-family='sans-serif'>Verifier Timed Out</text></svg>",
    claims: [
      {
        id: "trait.scar.side",
        label: "Facial Scar Laterality",
        kind: "attribute",
        severity: "block",
        source: "artist-declared",
        status: "UNVERIFIED",
        observedScore: 0.0,
        threshold: 0.75,
        metric: "Incomplete",
        verifier: "gemini-3-flash/vision",
        observedText: "request timed out after 3000ms without response",
        latencyMs: 3001,
        costUsd: 0.0,
        bbox: [140, 205, 170, 245]
      }
    ]
  },
  {
    id: "A-001",
    panelNumber: 5,
    title: "Panel 5: Extreme Occluded Camera Angle",
    subject: "Karan",
    description: "Abstention boundary: character shown in 80% shadow profile view. Verifier abstains from blocking.",
    status: "UNVERIFIED",
    reasonCode: "UNVERIFIED_AMBIGUOUS_VIEW",
    summary: "Abstention Boundary: High occlusion (>75%). Policy abstains to prevent false blockage of creative lighting.",
    nextAction: "Creator visual review recommended. Policy does not block publishing for creative angles.",
    lockedPixelDelta: 0,
    referenceImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231e293b'/><circle cx='200' cy='180' r='90' fill='%23fbcfe8'/></svg>",
    targetImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23090d16'/><path d='M180 120 Q220 180 190 260' stroke='%2338bdf8' stroke-width='4' fill='none'/><text x='200' y='200' fill='%2394a3b8' font-size='16' text-anchor='middle' font-family='sans-serif'>80% Silhouette Profile</text></svg>",
    claims: [
      {
        id: "face.identity",
        label: "Character Facial Identity",
        kind: "identity",
        severity: "block",
        source: "artist-declared",
        status: "UNVERIFIED",
        observedScore: 0.48,
        threshold: 0.82,
        metric: "Cosine Similarity",
        verifier: "insightface/buffalo_l",
        observedText: "face pitch > 45 deg, confidence below reliable verification threshold",
        latencyMs: 84,
        costUsd: 0.0,
        bbox: [150, 100, 250, 270]
      }
    ]
  },
  {
    id: "I-001",
    panelNumber: 6,
    title: "Panel 6: Model-Inferred Trait Warning",
    subject: "Karan",
    description: "Provenance constraint test: an automated model inferred a ring was missing. Capped at WARN.",
    status: "WARN",
    reasonCode: "WARN_INFERRED_CLAIM_FAILED",
    summary: "Advisory Warning: AI heuristic inferred missing accessory. Per policy rule, inferred claims never block export.",
    nextAction: "Review accessory canon at creator discretion. Export is permitted.",
    lockedPixelDelta: 0,
    referenceImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231e293b'/><circle cx='200' cy='200' r='50' fill='%23fbbf24'/></svg>",
    targetImg: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%230f172a'/><text x='200' y='200' fill='%23fbbf24' font-size='16' text-anchor='middle' font-family='sans-serif'>Ring Trait Absent</text></svg>",
    claims: [
      {
        id: "prop.ring",
        label: "Silver Signet Ring (AI Inferred)",
        kind: "attribute",
        severity: "warn",
        source: "model-inferred",
        status: "WARN",
        observedScore: 0.22,
        threshold: 0.70,
        metric: "Model Inferred Confidence",
        verifier: "gemini-3-flash/vision",
        observedText: "signet ring not detected on character hand",
        latencyMs: 610,
        costUsd: 0.00038,
        bbox: [160, 160, 240, 240]
      }
    ]
  }
];
