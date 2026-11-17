'use strict';

const { VERDICTS } = require('../packages/contracts/src/verdict');
const { AdapterUnsupportedError } = require('../packages/contracts/src/errors');

/**
 * Base class for all evidence adapters.
 * Ensures consistent output schema: never returns a bare boolean.
 */
class BaseAdapter {
  constructor(name, supportedKinds = ['identity', 'attribute', 'palette']) {
    this.name = name;
    this.supportedKinds = new Set(supportedKinds);
  }

  supports(claimKind) {
    return this.supportedKinds.has(claimKind);
  }

  /**
   * Main evaluation entry point.
   * @param {object} panelData { panel, nodeId, imagePath, ... }
   * @param {object} claim { id, kind, severity, expect, ... }
   * @param {object} context { clock, thresholds, ... }
   * @returns {Promise<object>} Typed verdict evidence record
   */
  async evaluate(panelData, claim, context = {}) {
    const startTime = Date.now();

    if (!this.supports(claim.kind)) {
      return this._formatResult({
        panel: panelData.panel,
        nodeId: panelData.nodeId,
        claim: claim.id,
        claimLabel: claim.label || claim.id,
        severity: claim.severity,
        verdict: VERDICTS.UNVERIFIED,
        confidence: null,
        threshold: claim.expect?.minConfidence || null,
        observed: `Claim kind '${claim.kind}' is not supported by adapter '${this.name}'`,
        evidence: null,
        latencyMs: Date.now() - startTime,
        costUsd: 0.0,
        status: 'UNSUPPORTED'
      });
    }

    try {
      const res = await this._runEvaluation(panelData, claim, context);
      const latencyMs = Date.now() - startTime;
      return this._formatResult({
        panel: panelData.panel,
        nodeId: panelData.nodeId,
        claim: claim.id,
        claimLabel: claim.label || claim.id,
        severity: claim.severity,
        latencyMs: res.latencyMs || latencyMs,
        costUsd: res.costUsd || 0.0,
        ...res
      });
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      const isTimeout = err.code === 'ERR_VERIFIER_TIMEOUT' || err.message?.includes('ETIMEDOUT');
      return this._formatResult({
        panel: panelData.panel,
        nodeId: panelData.nodeId,
        claim: claim.id,
        claimLabel: claim.label || claim.id,
        severity: claim.severity,
        verdict: VERDICTS.UNVERIFIED,
        confidence: null,
        threshold: claim.expect?.minConfidence || null,
        observed: `Adapter failure: ${err.message}`,
        evidence: null,
        latencyMs,
        costUsd: 0.0,
        status: isTimeout ? 'TIMEOUT' : 'ERROR',
        error: err.code || err.message
      });
    }
  }

  /**
   * Internal execution method to be overridden by subclasses.
   * @protected
   */
  async _runEvaluation(panelData, claim, context) {
    throw new Error(`_runEvaluation must be implemented by adapter ${this.name}`);
  }

  /**
   * Enforces typed evidence schema.
   * @private
   */
  _formatResult(data) {
    return {
      panel: data.panel,
      nodeId: data.nodeId || `${data.panel}_v1`,
      claim: data.claim,
      claimLabel: data.claimLabel || data.claim,
      severity: data.severity || 'block',
      verdict: data.verdict,
      verifier: this.name,
      confidence: typeof data.confidence === 'number' ? data.confidence : null,
      threshold: typeof data.threshold === 'number' ? data.threshold : null,
      observed: data.observed || '',
      evidence: data.evidence || null,
      latencyMs: data.latencyMs || 0,
      costUsd: data.costUsd || 0.0,
      status: data.status || 'OK',
      error: data.error || null,
      ts: (context => context?.clock ? context.clock.toISOString() : new Date().toISOString())()
    };
  }
}

module.exports = {
  BaseAdapter
};
