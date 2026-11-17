'use strict';

const crypto = require('crypto');
const { SchemaVersionMismatchError, MalformedInputError } = require('./errors');

const CURRENT_ENVELOPE_SCHEMA = 'panelproof/run-envelope@1';

/**
 * Calculates deterministic SHA-256 hash for any serializable payload.
 * @param {any} data 
 * @returns {string} hex hash
 */
function computeHash(data) {
  const serialized = typeof data === 'string' ? data : JSON.stringify(data);
  return crypto.createHash('sha256').update(serialized).digest('hex');
}

/**
 * Creates a structured run envelope for auditing.
 * @param {object} params
 * @param {string} params.runId
 * @param {string} params.timestamp
 * @param {string} params.corpusVersion
 * @param {string} params.thresholdVersion
 * @param {object} params.config
 * @param {object} [params.metadata]
 * @returns {object} run envelope
 */
function createRunEnvelope({ runId, timestamp, corpusVersion, thresholdVersion, config, metadata = {} }) {
  if (!runId || typeof runId !== 'string') {
    throw new MalformedInputError('runId is required for run envelope');
  }
  if (!timestamp || typeof timestamp !== 'string') {
    throw new MalformedInputError('timestamp is required for run envelope');
  }

  const envelope = {
    schema: CURRENT_ENVELOPE_SCHEMA,
    runId,
    timestamp,
    corpusVersion: corpusVersion || 'v1',
    thresholdVersion: thresholdVersion || 'v1',
    configHash: computeHash(config || {}),
    metadata: {
      ...metadata,
      nodeVersion: process.version,
      platform: process.platform
    }
  };

  return envelope;
}

/**
 * Validates a run envelope payload.
 * @param {object} envelope 
 * @returns {object}
 */
function validateRunEnvelope(envelope) {
  if (!envelope || typeof envelope !== 'object') {
    throw new MalformedInputError('Envelope must be an object');
  }

  if (envelope.schema !== CURRENT_ENVELOPE_SCHEMA) {
    throw new SchemaVersionMismatchError(CURRENT_ENVELOPE_SCHEMA, envelope.schema, 'run-envelope');
  }

  if (!envelope.runId || typeof envelope.runId !== 'string') {
    throw new MalformedInputError('runId is missing or not a string');
  }

  if (!envelope.configHash || typeof envelope.configHash !== 'string') {
    throw new MalformedInputError('configHash is missing');
  }

  return envelope;
}

module.exports = {
  CURRENT_ENVELOPE_SCHEMA,
  computeHash,
  createRunEnvelope,
  validateRunEnvelope
};
