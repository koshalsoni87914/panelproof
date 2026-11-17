'use strict';

const { MalformedInputError } = require('./errors');

const VERDICTS = {
  ACCEPT: 'ACCEPT',
  WARN: 'WARN',
  UNVERIFIED: 'UNVERIFIED',
  BLOCK: 'BLOCK'
};

const VERDICT_PRIORITY = {
  [VERDICTS.BLOCK]: 4,
  [VERDICTS.UNVERIFIED]: 3,
  [VERDICTS.WARN]: 2,
  [VERDICTS.ACCEPT]: 1
};

/**
 * Computes worst verdict according to fail-closed precedence:
 * BLOCK > UNVERIFIED > WARN > ACCEPT
 * @param {string[]} verdicts 
 * @returns {string} worst verdict
 */
function worstAction(verdicts) {
  if (!Array.isArray(verdicts) || verdicts.length === 0) {
    return VERDICTS.UNVERIFIED;
  }

  let highestPriority = 0;
  let worst = VERDICTS.ACCEPT;

  for (const v of verdicts) {
    const priority = VERDICT_PRIORITY[v] || VERDICT_PRIORITY[VERDICTS.UNVERIFIED];
    if (priority > highestPriority) {
      highestPriority = priority;
      worst = v in VERDICT_PRIORITY ? v : VERDICTS.UNVERIFIED;
    }
  }

  return worst;
}

/**
 * Validates a verdict record before streaming to receipts or LEDGER.
 * @param {object} record 
 * @returns {object} validated record
 */
function validateVerdictRecord(record) {
  if (!record || typeof record !== 'object') {
    throw new MalformedInputError('Verdict record must be a non-null object');
  }

  const errors = [];
  if (!record.panel || typeof record.panel !== 'string') errors.push('panel is required');
  if (!record.claim || typeof record.claim !== 'string') errors.push('claim is required');
  if (!record.verdict || !VERDICT_PRIORITY[record.verdict]) errors.push(`verdict '${record.verdict}' is invalid`);
  if (!record.verifier || typeof record.verifier !== 'string') errors.push('verifier identifier is required');
  if (typeof record.latencyMs !== 'number') errors.push('latencyMs must be a number');
  if (typeof record.costUsd !== 'number') errors.push('costUsd must be a number');

  if (errors.length > 0) {
    throw new MalformedInputError(`Invalid verdict record: ${errors.join('; ')}`, errors);
  }

  return record;
}

module.exports = {
  VERDICTS,
  VERDICT_PRIORITY,
  worstAction,
  validateVerdictRecord
};
