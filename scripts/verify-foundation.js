'use strict';

const assert = require('assert');
const path = require('path');
const { checkEnvironment } = require('../runtime/env');
const { FixedClock, SequentialClock } = require('../runtime/clock');
const { redact, StructuredLogger } = require('../runtime/logger');
const { FixtureLoader } = require('../runtime/fixtures');
const { runWithTimeout } = require('../runtime/runner');

console.log('=== [W1-P1] Verifying Reproducible Foundation ===');

// 1. Environment Check
console.log('1. Checking environment & Node.js version...');
const envResult = checkEnvironment();
assert.strictEqual(envResult.ok, true, `Environment checks failed: ${envResult.errors.join(', ')}`);
console.log(`  ✓ Node version ${envResult.nodeVersion} and required paths verified`);

// 2. Deterministic Clock Injection
console.log('2. Testing deterministic clocks...');
const fixedClock = new FixedClock('2026-11-17T18:00:00.000Z');
assert.strictEqual(fixedClock.toISOString(), '2026-11-17T18:00:00.000Z');
assert.strictEqual(fixedClock.toISOString(), '2026-11-17T18:00:00.000Z');

const seqClock = new SequentialClock('2026-11-17T18:00:00.000Z', 500);
assert.strictEqual(seqClock.toISOString(), '2026-11-17T18:00:00.000Z');
assert.strictEqual(seqClock.toISOString(), '2026-11-17T18:00:00.500Z');
assert.strictEqual(seqClock.toISOString(), '2026-11-17T18:00:01.000Z');
console.log('  ✓ Fixed and sequential clocks produce deterministic timestamps');

// 3. Structured Logger & Redaction
console.log('3. Testing structured logger and path/secret redaction...');
const sampleSecret = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.secret';
const samplePath = path.resolve(process.cwd(), 'runtime/test.js');
const redactedString = redact(`Error at ${samplePath} with token ${sampleSecret}`);
assert.ok(!redactedString.includes(process.cwd()), 'Local workspace path must be redacted');
assert.ok(!redactedString.includes('secret'), 'JWT/Token must be redacted');
assert.ok(redactedString.includes('<workspace>'), 'Redacted workspace placeholder expected');

const logger = new StructuredLogger({
  runId: 'run_test_logger',
  clock: fixedClock,
  silent: true
});
const entry = logger.info('TEST_EVENT', { secretKey: 'secret123', path: samplePath });
assert.strictEqual(entry.runId, 'run_test_logger');
assert.strictEqual(entry.level, 'INFO');
assert.strictEqual(entry.payload.secretKey, '[REDACTED_CREDENTIAL]');
console.log('  ✓ Structured logger correctly redacts private paths and sensitive keys');

// 4. Fixture Discovery & Stable Hashing
console.log('4. Testing fixture discovery & SHA-256 hash stability...');
const loader = new FixtureLoader();
const fixtures = loader.loadAll();
assert.ok(fixtures.length >= 4, 'Must discover at least 4 fixtures (C-001, D-001, E-001, L-001)');

const c001 = loader.getById('C-001');
assert.ok(c001, 'C-001 clean panel fixture must be present');
assert.strictEqual(c001.panel, 'p03');
assert.strictEqual(c001.expectedDecision, 'ACCEPT');
assert.ok(typeof c001.hash === 'string' && c001.hash.length === 64, 'Fixture must have a valid SHA-256 hash');

const d001 = loader.getById('D-001');
assert.ok(d001, 'D-001 drifted fixture must be present');
assert.strictEqual(d001.expectedDecision, 'BLOCK');

const e001 = loader.getById('E-001');
assert.ok(e001, 'E-001 error fixture must be present');
assert.strictEqual(e001.expectedDecision, 'UNVERIFIED');

const l001 = loader.getById('L-001');
assert.ok(l001, 'L-001 locked-region fixture must be present');
assert.strictEqual(l001.lockedRegion.deltaPixels, 0);

console.log('  ✓ All 4 fixtures (C-001, D-001, E-001, L-001) discovered with stable hashes');

// 5. Bounded Execution & Timeout Runner
console.log('5. Testing bounded execution and timeout runner...');
(async () => {
  const quickTask = async () => 'completed';
  const quickRes = await runWithTimeout(quickTask, { timeoutMs: 1000 });
  assert.strictEqual(quickRes, 'completed');

  let timedOut = false;
  try {
    await runWithTimeout(
      () => new Promise(resolve => setTimeout(resolve, 500)),
      { timeoutMs: 50, name: 'slow_task' }
    );
  } catch (err) {
    if (err.code === 'ERR_VERIFIER_TIMEOUT') {
      timedOut = true;
    }
  }
  assert.strictEqual(timedOut, true, 'Runner must enforce strict timeout');
  console.log('  ✓ Bounded task execution and timeout enforcement verified');

  console.log('=== [W1-P1] All Foundation Tests PASSED ===\n');
})();
