'use strict';

const { MalformedInputError, SchemaVersionMismatchError } = require('./errors');
const { VERDICTS, worstAction } = require('./verdict');

const CURRENT_RECEIPT_SCHEMA = 'panelproof/receipt@1';

/**
 * Aggregates a set of evaluated claim records into a final panel decision receipt.
 * @param {object} params
 * @param {string} params.panel
 * @param {string} params.nodeId
 * @param {Array<object>} params.claimRecords
 * @param {object} [params.override] Optional creator override { verdict, reason, user }
 * @param {object} [params.repair] Optional repair details { attempted, maxAttempts }
 * @returns {object} decision receipt
 */
function createDecisionReceipt({
  panel,
  nodeId,
  claimRecords = [],
  override = null,
  repair = { attempted: 0, maxAttempts: 2 }
}) {
  if (!panel || typeof panel !== 'string') {
    throw new MalformedInputError('panel identifier is required');
  }

  const verdicts = claimRecords.map(r => r.verdict);
  const blockingClaims = claimRecords
    .filter(r => r.severity === 'block' && (r.verdict === VERDICTS.BLOCK || r.verdict === VERDICTS.UNVERIFIED))
    .map(r => r.claim);

  const machineDecision = worstAction(verdicts);
  let finalDecision = machineDecision;

  if (override) {
    if (!override.reason || typeof override.reason !== 'string' || override.reason.trim() === '') {
      throw new MalformedInputError('An override requires a non-empty reason');
    }
    if (!override.verdict || !VERDICTS[override.verdict]) {
      throw new MalformedInputError(`Invalid override verdict '${override.verdict}'`);
    }
    finalDecision = override.verdict;
  }

  const totalClaims = claimRecords.length;
  const acceptedClaims = claimRecords.filter(r => r.verdict === VERDICTS.ACCEPT).length;
  const continuityScore = totalClaims > 0 ? parseFloat((acceptedClaims / totalClaims).toFixed(2)) : 0.0;

  const receipt = {
    schema: CURRENT_RECEIPT_SCHEMA,
    panel,
    nodeId: nodeId || `${panel}_v1`,
    decision: finalDecision,
    machineDecision,
    worstOf: verdicts,
    blockingClaims,
    continuity: continuityScore,
    totalClaims,
    override: override ? {
      originalVerdict: machineDecision,
      overrideVerdict: override.verdict,
      reason: override.reason.trim(),
      user: override.user || 'creator',
      ts: new Date().toISOString()
    } : null,
    repair: {
      attempted: repair.attempted || 0,
      maxAttempts: repair.maxAttempts || 2
    },
    failClosed: true
  };

  return receipt;
}

/**
 * Validates a decision receipt object.
 * @param {object} receipt 
 * @returns {object} validated receipt
 */
function validateDecisionReceipt(receipt) {
  if (!receipt || typeof receipt !== 'object') {
    throw new MalformedInputError('Receipt must be an object');
  }

  if (receipt.schema && receipt.schema !== CURRENT_RECEIPT_SCHEMA) {
    throw new SchemaVersionMismatchError(CURRENT_RECEIPT_SCHEMA, receipt.schema, 'receipt');
  }

  if (!receipt.panel) throw new MalformedInputError('Receipt missing panel');
  if (!receipt.decision || !VERDICTS[receipt.decision]) throw new MalformedInputError('Receipt missing or invalid decision');
  if (!Array.isArray(receipt.worstOf)) throw new MalformedInputError('Receipt worstOf must be an array');
  if (!Array.isArray(receipt.blockingClaims)) throw new MalformedInputError('Receipt blockingClaims must be an array');
  if (receipt.failClosed !== true) throw new MalformedInputError('Receipt failClosed must be true');

  return receipt;
}

module.exports = {
  CURRENT_RECEIPT_SCHEMA,
  createDecisionReceipt,
  validateDecisionReceipt
};
