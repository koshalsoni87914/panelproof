'use strict';

const path = require('path');

const SECRET_PATTERNS = [
  /AIza[0-9A-Za-z-_]{35}/g,                     // Google API keys
  /sk-[a-zA-Z0-9]{32,}/g,                       // OpenAI style keys
  /ghp_[a-zA-Z0-9]{36}/g,                       // GitHub personal access tokens
  /Bearer\s+[a-zA-Z0-9._-]+/gi,                 // Bearer tokens
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g // Email addresses in error logs
];

/**
 * Redacts secrets and local absolute paths from strings, objects, or arrays.
 * @param {any} input 
 * @param {string} [workspaceRoot]
 * @returns {any} sanitized output
 */
function redact(input, workspaceRoot = process.cwd()) {
  if (input === null || input === undefined) return input;

  if (typeof input === 'string') {
    let sanitized = input;

    // Redact absolute paths
    const normalizedRoot = workspaceRoot.replace(/\\/g, '/');
    const normalizedInput = sanitized.replace(/\\/g, '/');

    if (normalizedInput.includes(normalizedRoot)) {
      sanitized = normalizedInput.split(normalizedRoot).join('<workspace>');
    }

    // Generic home/user dir redaction
    sanitized = sanitized.replace(/([a-zA-Z]:)?\/Users\/[^\/]+/gi, '<user-dir>');
    sanitized = sanitized.replace(/\/home\/[^\/]+/gi, '<user-dir>');

    // Redact secrets
    for (const pattern of SECRET_PATTERNS) {
      sanitized = sanitized.replace(pattern, '[REDACTED_SECRET]');
    }

    return sanitized;
  }

  if (Array.isArray(input)) {
    return input.map(item => redact(item, workspaceRoot));
  }

  if (typeof input === 'object') {
    const output = {};
    for (const [key, value] of Object.entries(input)) {
      // Direct key-based secret redaction
      if (/password|secret|token|apikey|authorization|credential/i.test(key)) {
        output[key] = '[REDACTED_CREDENTIAL]';
      } else {
        output[key] = redact(value, workspaceRoot);
      }
    }
    return output;
  }

  return input;
}

class StructuredLogger {
  constructor(options = {}) {
    this.runId = options.runId || 'unassigned';
    this.clock = options.clock || { toISOString: () => new Date().toISOString() };
    this.workspaceRoot = options.workspaceRoot || process.cwd();
    this.logs = [];
    this.silent = options.silent || false;
  }

  log(level, event, payload = {}) {
    const entry = {
      ts: this.clock.toISOString(),
      runId: this.runId,
      level: level.toUpperCase(),
      event,
      payload: redact(payload, this.workspaceRoot)
    };

    this.logs.push(entry);

    if (!this.silent) {
      const line = JSON.stringify(entry);
      if (level === 'error') {
        console.error(line);
      } else {
        console.log(line);
      }
    }

    return entry;
  }

  info(event, payload) { return this.log('INFO', event, payload); }
  warn(event, payload) { return this.log('WARN', event, payload); }
  error(event, payload) { return this.log('ERROR', event, payload); }
  debug(event, payload) { return this.log('DEBUG', event, payload); }

  getEntries() {
    return [...this.logs];
  }

  toNDJSON() {
    return this.logs.map(e => JSON.stringify(e)).join('\n');
  }
}

module.exports = {
  redact,
  StructuredLogger
};
