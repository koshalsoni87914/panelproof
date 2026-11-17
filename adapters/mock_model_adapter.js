'use strict';

const { BaseAdapter } = require('./base');
const { VERDICTS } = require('../packages/contracts/src/verdict');

class MockModelAdapter extends BaseAdapter {
  constructor(options = {}) {
    super(options.name || 'mock-vision/v1', ['identity', 'attribute', 'composition']);
    this.simulatedLatencyMs = options.simulatedLatencyMs || 50;
    this.costPerCall = options.costPerCall || 0.0004;
    this.simulateError = options.simulateError || null;
  }

  async _runEvaluation(panelData, claim, context) {
    if (this.simulateError === 'TIMEOUT') {
      const err = new Error('vision service unreachable after 2 retries (ETIMEDOUT)');
      err.code = 'ERR_VERIFIER_TIMEOUT';
      throw err;
    }

    if (this.simulateError) {
      throw new Error(`Simulated model error: ${this.simulateError}`);
    }

    const minConfidence = claim.expect?.minConfidence || 0.75;

    return {
      verdict: VERDICTS.ACCEPT,
      confidence: 0.91,
      threshold: minConfidence,
      observed: `Model identified valid trait for claim '${claim.id}'`,
      evidence: {
        crop: `nodes/${panelData.nodeId || 'p01'}/crop.jpg`,
        bbox: [100, 100, 200, 200]
      },
      latencyMs: this.simulatedLatencyMs,
      costUsd: this.costPerCall,
      status: 'OK'
    };
  }
}

module.exports = {
  MockModelAdapter
};
