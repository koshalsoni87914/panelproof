'use strict';

class PanelProofError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: this.name,
      code: this.code,
      message: this.message,
      details: this.details
    };
  }
}

class SchemaVersionMismatchError extends PanelProofError {
  constructor(expected, actual, entityName = 'payload') {
    super(
      `Schema version mismatch for ${entityName}: expected '${expected}', got '${actual}'`,
      'ERR_SCHEMA_VERSION_MISMATCH',
      { expected, actual, entityName }
    );
  }
}

class MalformedInputError extends PanelProofError {
  constructor(message, validationErrors = []) {
    super(message, 'ERR_MALFORMED_INPUT', { validationErrors });
  }
}

class VerifierTimeoutError extends PanelProofError {
  constructor(verifier, timeoutMs) {
    super(
      `Verifier '${verifier}' timed out after ${timeoutMs}ms`,
      'ERR_VERIFIER_TIMEOUT',
      { verifier, timeoutMs }
    );
  }
}

class AdapterUnsupportedError extends PanelProofError {
  constructor(adapterName, claimKind) {
    super(
      `Adapter '${adapterName}' does not support claim kind '${claimKind}'`,
      'ERR_ADAPTER_UNSUPPORTED',
      { adapterName, claimKind }
    );
  }
}

class InvariantViolationError extends PanelProofError {
  constructor(invariantName, message, details = {}) {
    super(
      `Invariant violation [${invariantName}]: ${message}`,
      'ERR_INVARIANT_VIOLATION',
      { invariantName, ...details }
    );
  }
}

module.exports = {
  PanelProofError,
  SchemaVersionMismatchError,
  MalformedInputError,
  VerifierTimeoutError,
  AdapterUnsupportedError,
  InvariantViolationError
};
