'use strict';

const { VerifierTimeoutError } = require('../packages/contracts/src/errors');

/**
 * Executes an async or sync function within strict execution and timeout boundaries.
 * @param {Function} taskFn 
 * @param {object} options
 * @param {number} [options.timeoutMs=5000]
 * @param {string} [options.name='task']
 * @returns {Promise<any>}
 */
async function runWithTimeout(taskFn, { timeoutMs = 5000, name = 'task' } = {}) {
  let timer;

  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new VerifierTimeoutError(name, timeoutMs));
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([
      Promise.resolve(taskFn()),
      timeoutPromise
    ]);
    return result;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Caps output length/size to prevent unbounded log or memory bloat.
 * @param {string} str 
 * @param {number} maxBytes 
 * @returns {string}
 */
function capOutput(str, maxBytes = 1048576) {
  if (typeof str !== 'string') return str;
  const buf = Buffer.from(str, 'utf8');
  if (buf.length <= maxBytes) return str;
  return buf.subarray(0, maxBytes).toString('utf8') + '\n[...OUTPUT_TRUNCATED]';
}

module.exports = {
  runWithTimeout,
  capOutput
};
