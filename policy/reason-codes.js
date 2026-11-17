/**
 * PanelProof Continuity Policy Reason Codes
 * Schema: panelproof/reason-codes@1
 */

export const REASON_CODES = {
  // Positive / Pass
  ACCEPT_PASSED: 'ACCEPT_PASSED',
  ACCEPT_INTENTIONAL_CHANGE: 'ACCEPT_INTENTIONAL_CHANGE',

  // Drift / Blocking Failures (Artist-declared claims)
  DRIFT_IDENTITY_MISMATCH: 'DRIFT_IDENTITY_MISMATCH',
  DRIFT_TRAIT_MISMATCH: 'DRIFT_TRAIT_MISMATCH',
  DRIFT_PALETTE_MISMATCH: 'DRIFT_PALETTE_MISMATCH',
  DRIFT_COSTUME_MISMATCH: 'DRIFT_COSTUME_MISMATCH',
  DRIFT_ORDER_VIOLATION: 'DRIFT_ORDER_VIOLATION',

  // Non-blocking Warnings
  WARN_MARGINAL_CONFIDENCE: 'WARN_MARGINAL_CONFIDENCE',
  WARN_INFERRED_CLAIM_FAILED: 'WARN_INFERRED_CLAIM_FAILED',
  WARN_PALETTE_BORDERLINE: 'WARN_PALETTE_BORDERLINE',

  // Fail-Closed Unverified States
  UNVERIFIED_TIMEOUT: 'UNVERIFIED_TIMEOUT',
  UNVERIFIED_MISSING_REFERENCE: 'UNVERIFIED_MISSING_REFERENCE',
  UNVERIFIED_AMBIGUOUS_VIEW: 'UNVERIFIED_AMBIGUOUS_VIEW',
  UNVERIFIED_ADAPTER_ERROR: 'UNVERIFIED_ADAPTER_ERROR',
  UNVERIFIED_MALFORMED_OUTPUT: 'UNVERIFIED_MALFORMED_OUTPUT',

  // Unsupported Conditions
  UNSUPPORTED_LAYOUT: 'UNSUPPORTED_LAYOUT',
  UNSUPPORTED_ENTITY_TYPE: 'UNSUPPORTED_ENTITY_TYPE',

  // Override & Invariants
  OVERRIDE_HUMAN_RECORDED: 'OVERRIDE_HUMAN_RECORDED',
  OVERRIDE_REJECTED_EMPTY_REASON: 'OVERRIDE_REJECTED_EMPTY_REASON',
  LOCKED_PIXELS_VIOLATED: 'LOCKED_PIXELS_VIOLATED'
};

export const REASON_DESCRIPTIONS = {
  [REASON_CODES.ACCEPT_PASSED]: 'Evidence meets or exceeds artist-declared threshold.',
  [REASON_CODES.ACCEPT_INTENTIONAL_CHANGE]: 'Variation matches an artist-declared intentional change.',
  [REASON_CODES.DRIFT_IDENTITY_MISMATCH]: 'Character face identity cosine similarity is below threshold.',
  [REASON_CODES.DRIFT_TRAIT_MISMATCH]: 'Character trait or feature does not match canon description.',
  [REASON_CODES.DRIFT_PALETTE_MISMATCH]: 'Color difference deltaE exceeds acceptable threshold.',
  [REASON_CODES.DRIFT_COSTUME_MISMATCH]: 'Character outfit or accessory conflicts with canon declaration.',
  [REASON_CODES.DRIFT_ORDER_VIOLATION]: 'Panel narrative sequence or temporal order violated.',
  [REASON_CODES.WARN_MARGINAL_CONFIDENCE]: 'Evidence passes but is near the decision threshold boundary.',
  [REASON_CODES.WARN_INFERRED_CLAIM_FAILED]: 'Model-inferred claim failed. Per policy, inferred claims never block.',
  [REASON_CODES.WARN_PALETTE_BORDERLINE]: 'Palette variation detected within allowable warning range.',
  [REASON_CODES.UNVERIFIED_TIMEOUT]: 'Verification timed out before conclusive evidence was returned.',
  [REASON_CODES.UNVERIFIED_MISSING_REFERENCE]: 'Required artist reference sheet or style plate is absent.',
  [REASON_CODES.UNVERIFIED_AMBIGUOUS_VIEW]: 'Subject angle, occlusion, or resolution prevents reliable verification.',
  [REASON_CODES.UNVERIFIED_ADAPTER_ERROR]: 'Verification service or model adapter returned an unhandled error.',
  [REASON_CODES.UNVERIFIED_MALFORMED_OUTPUT]: 'Adapter response could not be parsed into valid evidence schema.',
  [REASON_CODES.UNSUPPORTED_LAYOUT]: 'Panel composition or framing is outside MVP verifier capabilities.',
  [REASON_CODES.UNSUPPORTED_ENTITY_TYPE]: 'Entity type is not currently supported for automated verification.',
  [REASON_CODES.OVERRIDE_HUMAN_RECORDED]: 'Creator verified and explicitly overrode the automated verdict.',
  [REASON_CODES.OVERRIDE_REJECTED_EMPTY_REASON]: 'Override rejected because no valid rationale was provided.',
  [REASON_CODES.LOCKED_PIXELS_VIOLATED]: 'Child panel modified pixels in a designated locked region.'
};
