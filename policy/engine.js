/**
 * PanelProof Deterministic Continuity Policy Engine
 * Fully offline, zero-network, fail-closed policy evaluation.
 */

import { REASON_CODES, REASON_DESCRIPTIONS } from './reason-codes.js';
import { EvidenceRecord, EvidenceLedger } from './ledger.js';

export const VERDICT_PRECEDENCE = {
  BLOCK: 4,
  UNVERIFIED: 3,
  UNSUPPORTED: 3,
  WARN: 2,
  ACCEPT: 1
};

export const VERDICT_ORDER = ['BLOCK', 'UNVERIFIED', 'WARN', 'ACCEPT'];

export class ContinuityPolicyEngine {
  /**
   * @param {Object} [config] Custom threshold and policy configuration
   */
  constructor(config = {}) {
    this.version = config.version || '1.0.0';
    this.thresholds = {
      identityMinCosine: config.thresholds?.identity?.minCosine ?? 0.82,
      attributeMinConfidence: config.thresholds?.attribute?.minConfidence ?? 0.75,
      paletteDeltaEMax: config.thresholds?.palette?.deltaEMax ?? 8.0,
      ...config.thresholds
    };
    this.policy = {
      onVerifierError: config.policy?.onVerifierError || 'UNVERIFIED',
      abstentionFailsGate: config.policy?.abstentionFailsGate ?? true,
      inferredClaimsMayBlock: config.policy?.inferredClaimsMayBlock ?? false,
      overrideRequiresReason: config.policy?.overrideRequiresReason ?? true,
      exportRequires: {
        noBlock: true,
        noUnverified: true,
        ...config.policy?.exportRequires
      },
      maxRepairAttempts: config.policy?.maxRepairAttempts ?? 2,
      ...config.policy
    };
  }

  /**
   * Determine worst action among a list of check verdicts
   * @param {string[]} verdicts
   * @returns {"BLOCK"|"UNVERIFIED"|"WARN"|"ACCEPT"}
   */
  worstAction(verdicts) {
    if (!verdicts || verdicts.length === 0) return 'ACCEPT';

    let maxScore = -1;
    let worst = 'ACCEPT';

    for (const v of verdicts) {
      const score = VERDICT_PRECEDENCE[v] ?? 0;
      if (score > maxScore) {
        maxScore = score;
        worst = v === 'UNSUPPORTED' ? 'UNVERIFIED' : v;
      }
    }
    return worst;
  }

  /**
   * Evaluate a single raw claim check observation and produce an EvidenceRecord
   * Enforces model-inferred claims may never block.
   * @param {Object} claim Spec from artist claims manifest
   * @param {Object} observation Verifier output
   * @param {Object} context Panel metadata
   * @returns {EvidenceRecord}
   */
  evaluateClaim(claim, observation, context = {}) {
    const { panel = 'p01', nodeId = 'p01_v1' } = context;
    const severity = claim.severity || 'block';
    const source = claim.source || 'artist-declared';
    const verifier = observation.verifier || claim.verifier || 'unknown-verifier';

    // 1. Handle verifier error, timeout, or missing observation
    if (observation.error || observation.timedOut || observation.status === 'ERROR') {
      return new EvidenceRecord({
        panel,
        nodeId,
        claim: claim.id,
        claimLabel: claim.label || claim.id,
        severity,
        source,
        verdict: 'UNVERIFIED',
        reasonCode: observation.timedOut ? REASON_CODES.UNVERIFIED_TIMEOUT : REASON_CODES.UNVERIFIED_ADAPTER_ERROR,
        verifier,
        confidence: null,
        threshold: null,
        observed: observation.error || 'Verifier failed to produce a valid result',
        latencyMs: observation.latencyMs || 0,
        costUsd: observation.costUsd || 0
      });
    }

    // 2. Handle missing reference or ambiguous state
    if (observation.status === 'MISSING_REFERENCE') {
      return new EvidenceRecord({
        panel,
        nodeId,
        claim: claim.id,
        claimLabel: claim.label || claim.id,
        severity,
        source,
        verdict: 'UNVERIFIED',
        reasonCode: REASON_CODES.UNVERIFIED_MISSING_REFERENCE,
        verifier,
        confidence: null,
        threshold: null,
        observed: 'Required reference image or style plate was not provided',
        latencyMs: observation.latencyMs || 0,
        costUsd: observation.costUsd || 0
      });
    }

    if (observation.status === 'AMBIGUOUS') {
      return new EvidenceRecord({
        panel,
        nodeId,
        claim: claim.id,
        claimLabel: claim.label || claim.id,
        severity,
        source,
        verdict: 'UNVERIFIED',
        reasonCode: REASON_CODES.UNVERIFIED_AMBIGUOUS_VIEW,
        verifier,
        confidence: observation.confidence ?? null,
        threshold: null,
        observed: observation.observed || 'Subject occluded or ambiguous view prevents measurement',
        latencyMs: observation.latencyMs || 0,
        costUsd: observation.costUsd || 0
      });
    }

    if (observation.status === 'UNSUPPORTED') {
      return new EvidenceRecord({
        panel,
        nodeId,
        claim: claim.id,
        claimLabel: claim.label || claim.id,
        severity,
        source,
        verdict: 'UNSUPPORTED',
        reasonCode: REASON_CODES.UNSUPPORTED_LAYOUT,
        verifier,
        confidence: null,
        threshold: null,
        observed: observation.observed || 'Layout or condition unsupported by verifier',
        latencyMs: observation.latencyMs || 0,
        costUsd: observation.costUsd || 0
      });
    }

    // 3. Evaluate quantitative criteria
    let rawVerdict = 'ACCEPT';
    let reasonCode = REASON_CODES.ACCEPT_PASSED;
    const confidence = observation.confidence !== undefined ? observation.confidence : null;
    let threshold = null;

    if (claim.kind === 'identity') {
      threshold = claim.expect?.minCosine ?? this.thresholds.identityMinCosine;
      if (confidence === null || confidence < threshold) {
        rawVerdict = severity === 'block' ? 'BLOCK' : 'WARN';
        reasonCode = REASON_CODES.DRIFT_IDENTITY_MISMATCH;
      }
    } else if (claim.kind === 'attribute') {
      threshold = claim.expect?.minConfidence ?? this.thresholds.attributeMinConfidence;
      if (confidence === null || confidence < threshold) {
        rawVerdict = severity === 'block' ? 'BLOCK' : 'WARN';
        reasonCode = REASON_CODES.DRIFT_TRAIT_MISMATCH;
      }
    } else if (claim.kind === 'palette') {
      threshold = claim.expect?.deltaEMax ?? this.thresholds.paletteDeltaEMax;
      // For deltaE, lower is better
      if (confidence !== null && confidence > threshold) {
        rawVerdict = severity === 'block' ? 'BLOCK' : 'WARN';
        reasonCode = REASON_CODES.DRIFT_PALETTE_MISMATCH;
      }
    }

    // 4. RULE: Model-inferred claims may NEVER block
    if (source === 'model-inferred' && rawVerdict === 'BLOCK' && !this.policy.inferredClaimsMayBlock) {
      rawVerdict = 'WARN';
      reasonCode = REASON_CODES.WARN_INFERRED_CLAIM_FAILED;
    }

    return new EvidenceRecord({
      panel,
      nodeId,
      claim: claim.id,
      claimLabel: claim.label || claim.id,
      severity,
      source,
      verdict: rawVerdict,
      reasonCode,
      verifier,
      confidence,
      threshold,
      observed: observation.observed || `Observed value ${confidence}`,
      evidence: observation.evidence || null,
      latencyMs: observation.latencyMs || 0,
      costUsd: observation.costUsd || 0
    });
  }

  /**
   * Evaluate a full panel against its claims and observations
   * @param {Object} params
   * @param {string} params.panelId
   * @param {string} params.nodeId
   * @param {Array<Object>} params.claims
   * @param {Object} params.observations Map of claim.id -> observation
   * @param {number} [params.lockedPixelDelta] Delta in locked coordinates
   * @returns {Object} Panel evaluation receipt
   */
  evaluatePanel({ panelId, nodeId, claims, observations, lockedPixelDelta = 0 }) {
    const ledger = new EvidenceLedger();
    const verdicts = [];

    // Check pixel invariant first
    let lockedPixelViolation = false;
    if (lockedPixelDelta > 0) {
      lockedPixelViolation = true;
      verdicts.push('BLOCK');
    }

    for (const claim of claims) {
      const obs = observations[claim.id] || { status: 'MISSING_REFERENCE' };
      const record = this.evaluateClaim(claim, obs, { panel: panelId, nodeId });
      ledger.addRecord(record);
      verdicts.push(record.verdict);
    }

    const machineDecision = lockedPixelViolation ? 'BLOCK' : this.worstAction(verdicts);
    const blockingClaims = ledger.records.filter(r => r.verdict === 'BLOCK').map(r => r.claim);
    const unverifiedClaims = ledger.records.filter(r => r.verdict === 'UNVERIFIED' || r.verdict === 'UNSUPPORTED').map(r => r.claim);
    const warningClaims = ledger.records.filter(r => r.verdict === 'WARN').map(r => r.claim);

    // Compute continuity ratio
    const evaluatedRecords = ledger.records.filter(r => r.verdict !== 'UNVERIFIED' && r.verdict !== 'UNSUPPORTED');
    const passedCount = evaluatedRecords.filter(r => r.verdict === 'ACCEPT' || r.verdict === 'WARN').length;
    const continuityScore = evaluatedRecords.length > 0 ? Math.round((passedCount / evaluatedRecords.length) * 100) / 100 : 0.0;

    const canExport = machineDecision !== 'BLOCK' && (machineDecision !== 'UNVERIFIED' || !this.policy.exportRequires.noUnverified);

    return {
      schema: 'panelproof/panel-receipt@1',
      panel: panelId,
      nodeId,
      machineDecision,
      effectiveDecision: machineDecision,
      worstOf: verdicts,
      canExport,
      failClosed: machineDecision === 'BLOCK' || machineDecision === 'UNVERIFIED',
      blockingClaims,
      warningClaims,
      unverifiedClaims,
      continuityScore,
      lockedPixelDelta,
      ledger: ledger.records.map(r => r.toJSON()),
      metrics: ledger.getSummaryMetrics(),
      ts: new Date().toISOString()
    };
  }

  /**
   * Apply creator human override with reason
   * @param {Object} panelReceipt Output from evaluatePanel
   * @param {string} overrideReason Rationale explaining why override is granted
   * @param {string} creatorName Identifier of the reviewer
   * @returns {Object} Updated receipt with recorded override
   */
  applyOverride(panelReceipt, overrideReason, creatorName = 'creator') {
    if (!overrideReason || typeof overrideReason !== 'string' || overrideReason.trim().length === 0) {
      return {
        ...panelReceipt,
        overrideStatus: 'REJECTED',
        overrideReasonError: 'Override requires a non-empty human justification.'
      };
    }

    return {
      ...panelReceipt,
      effectiveDecision: 'ALLOW',
      canExport: true,
      override: {
        status: 'ACCEPTED',
        reasonCode: REASON_CODES.OVERRIDE_HUMAN_RECORDED,
        reason: overrideReason.trim(),
        creator: creatorName,
        previousDecision: panelReceipt.machineDecision,
        ts: new Date().toISOString()
      }
    };
  }

  /**
   * Aggregate multi-panel sequence decisions
   * @param {Array<Object>} panelReceipts
   * @returns {Object} Sequence-level receipt
   */
  evaluateSequence(panelReceipts) {
    if (!panelReceipts || panelReceipts.length === 0) {
      return {
        sequenceDecision: 'ACCEPT',
        canExportSequence: true,
        panelCount: 0,
        panelDecisions: []
      };
    }

    const panelDecisions = panelReceipts.map(p => p.effectiveDecision || p.machineDecision);
    const worstSequenceDecision = this.worstAction(panelDecisions);
    const canExportSequence = panelReceipts.every(p => p.canExport);

    return {
      schema: 'panelproof/sequence-receipt@1',
      sequenceDecision: worstSequenceDecision,
      canExportSequence,
      panelCount: panelReceipts.length,
      panelDecisions: panelReceipts.map(p => ({
        panel: p.panel,
        nodeId: p.nodeId,
        effectiveDecision: p.effectiveDecision || p.machineDecision,
        machineDecision: p.machineDecision
      })),
      blockingPanels: panelReceipts.filter(p => (p.effectiveDecision || p.machineDecision) === 'BLOCK').map(p => p.panel),
      unverifiedPanels: panelReceipts.filter(p => (p.effectiveDecision || p.machineDecision) === 'UNVERIFIED').map(p => p.panel),
      ts: new Date().toISOString()
    };
  }
}
