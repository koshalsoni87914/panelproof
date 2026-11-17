'use strict';

const { SchemaVersionMismatchError, MalformedInputError } = require('./errors');

const CURRENT_CLAIMS_SCHEMA = 'panelproof/claims@1';
const VALID_KINDS = new Set(['identity', 'attribute', 'palette', 'composition']);
const VALID_SEVERITIES = new Set(['block', 'warn']);
const VALID_SOURCES = new Set(['artist-declared', 'model-inferred']);

/**
 * Validates a claims declaration payload against panelproof/claims@1 contract.
 * @param {object} payload 
 * @returns {object} validated and sanitized claims payload
 */
function validateClaims(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new MalformedInputError('Claims payload must be a non-null object');
  }

  if (payload.schema !== CURRENT_CLAIMS_SCHEMA) {
    throw new SchemaVersionMismatchError(CURRENT_CLAIMS_SCHEMA, payload.schema, 'claims');
  }

  const errors = [];

  if (!payload.subject || typeof payload.subject !== 'object') {
    errors.push('subject is required and must be an object');
  } else {
    if (!payload.subject.id || typeof payload.subject.id !== 'string') {
      errors.push('subject.id is required and must be a string');
    }
    if (!payload.subject.displayName || typeof payload.subject.displayName !== 'string') {
      errors.push('subject.displayName is required and must be a string');
    }
    if (!Array.isArray(payload.subject.refs) || payload.subject.refs.length === 0) {
      errors.push('subject.refs must be a non-empty array of reference strings');
    }
  }

  if (!Array.isArray(payload.claims) || payload.claims.length === 0) {
    errors.push('claims must be a non-empty array');
  } else {
    payload.claims.forEach((claim, index) => {
      const prefix = `claims[${index}]`;
      if (!claim || typeof claim !== 'object') {
        errors.push(`${prefix} must be an object`);
        return;
      }
      if (!claim.id || typeof claim.id !== 'string') {
        errors.push(`${prefix}.id is required and must be a string`);
      }
      if (!VALID_KINDS.has(claim.kind)) {
        errors.push(`${prefix}.kind '${claim.kind}' is invalid; must be one of: ${[...VALID_KINDS].join(', ')}`);
      }
      if (!VALID_SEVERITIES.has(claim.severity)) {
        errors.push(`${prefix}.severity '${claim.severity}' is invalid; must be 'block' or 'warn'`);
      }
      if (!VALID_SOURCES.has(claim.source)) {
        errors.push(`${prefix}.source '${claim.source}' is invalid; must be 'artist-declared' or 'model-inferred'`);
      }
      // Non-negotiable invariant: Inferred claims cannot silently promote to blocking policy
      if (claim.source === 'model-inferred' && claim.severity === 'block') {
        errors.push(`${prefix} violates policy: model-inferred claim '${claim.id}' cannot have severity 'block'`);
      }
      if (!claim.expect || typeof claim.expect !== 'object') {
        errors.push(`${prefix}.expect must be an object defining expected criteria`);
      }
    });
  }

  if (errors.length > 0) {
    throw new MalformedInputError(`Invalid claims manifest: ${errors.join('; ')}`, errors);
  }

  return payload;
}

module.exports = {
  CURRENT_CLAIMS_SCHEMA,
  validateClaims
};
