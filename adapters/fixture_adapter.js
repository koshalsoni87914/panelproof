'use strict';

const { BaseAdapter } = require('./base');
const { VERDICTS } = require('../packages/contracts/src/verdict');

class FixtureAdapter extends BaseAdapter {
  constructor(fixtures = []) {
    super('fixture/v1', ['identity', 'attribute', 'palette', 'composition']);
    this._fixtureMap = new Map();
    for (const f of fixtures) {
      this._fixtureMap.set(f.panel, f);
      if (f.id) this._fixtureMap.set(f.id, f);
    }
  }

  async _runEvaluation(panelData, claim, context) {
    const fixture = this._fixtureMap.get(panelData.panel) || this._fixtureMap.get(panelData.id);

    if (!fixture) {
      return {
        verdict: VERDICTS.UNVERIFIED,
        confidence: null,
        observed: `No fixture recorded for panel '${panelData.panel}'`,
        status: 'UNVERIFIED'
      };
    }

    const matchedClaim = (fixture.claims || []).find(c => c.claim === claim.id);

    if (!matchedClaim) {
      return {
        verdict: VERDICTS.UNVERIFIED,
        confidence: null,
        observed: `Fixture '${fixture.id}' contains no claim data for '${claim.id}'`,
        status: 'UNVERIFIED'
      };
    }

    if (matchedClaim.error) {
      throw new Error(matchedClaim.error);
    }

    const threshold = claim.expect?.minConfidence || claim.expect?.minCosine || 0.75;
    const verdict = matchedClaim.expectedVerdict || VERDICTS.ACCEPT;

    return {
      verdict,
      confidence: matchedClaim.confidence,
      threshold,
      observed: matchedClaim.observed || `Observed via fixture ${fixture.id}`,
      evidence: matchedClaim.crop ? {
        crop: matchedClaim.crop,
        bbox: matchedClaim.bbox || [0, 0, 100, 100]
      } : null,
      status: 'OK'
    };
  }
}

module.exports = {
  FixtureAdapter
};
