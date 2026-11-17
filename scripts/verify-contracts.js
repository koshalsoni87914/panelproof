'use strict';

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const {
  validateClaims,
  validateRunEnvelope,
  createRunEnvelope,
  computeHash,
  worstAction,
  VERDICTS,
  createDecisionReceipt,
  validateDecisionReceipt,
  SchemaVersionMismatchError,
  MalformedInputError
} = require('../packages/contracts/src');

console.log('=== [W1-P0] Verifying Runtime Contracts & Schemas ===');

// 1. Claims Contract Validation
console.log('1. Testing baseline claims validation...');
const baselineClaims = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../.brain/.testdata/v1/claims.karan.example.json'), 'utf8')
);
const validatedClaims = validateClaims(baselineClaims);
assert.strictEqual(validatedClaims.schema, 'panelproof/claims@1');
assert.strictEqual(validatedClaims.claims.length, 6);
console.log('  ✓ Baseline claims manifest validated successfully');

// 2. Schema Version Mismatch Rejection
console.log('2. Testing schema version mismatch rejection...');
assert.throws(
  () => validateClaims({ ...baselineClaims, schema: 'panelproof/claims@999' }),
  err => err instanceof SchemaVersionMismatchError && err.code === 'ERR_SCHEMA_VERSION_MISMATCH',
  'Should reject incompatible schema versions'
);
console.log('  ✓ Incompatible schema version rejected with typed SchemaVersionMismatchError');

// 3. Malformed Input Rejection
console.log('3. Testing malformed input rejection...');
assert.throws(
  () => validateClaims({ schema: 'panelproof/claims@1', subject: null, claims: [] }),
  err => err instanceof MalformedInputError && err.code === 'ERR_MALFORMED_INPUT',
  'Should reject missing subject and empty claims'
);
console.log('  ✓ Malformed claims payload rejected with typed MalformedInputError');

// 4. Non-negotiable Principle: Model-inferred claims may never block
console.log('4. Testing model-inferred claim block rejection...');
const illegalClaims = JSON.parse(JSON.stringify(baselineClaims));
illegalClaims.claims[5].severity = 'block'; // claim[5] has source: 'model-inferred'
assert.throws(
  () => validateClaims(illegalClaims),
  err => err instanceof MalformedInputError && err.message.includes('cannot have severity \'block\''),
  'Should reject model-inferred claims with severity block'
);
console.log('  ✓ Model-inferred claim with block severity correctly rejected');

// 5. Verdict Precedence: worstAction ordering
console.log('5. Testing verdict precedence (worstAction)...');
assert.strictEqual(worstAction(['ACCEPT', 'ACCEPT', 'ACCEPT']), VERDICTS.ACCEPT);
assert.strictEqual(worstAction(['ACCEPT', 'WARN', 'ACCEPT']), VERDICTS.WARN);
assert.strictEqual(worstAction(['ACCEPT', 'UNVERIFIED', 'WARN']), VERDICTS.UNVERIFIED);
assert.strictEqual(worstAction(['ACCEPT', 'BLOCK', 'UNVERIFIED', 'WARN']), VERDICTS.BLOCK);
assert.strictEqual(worstAction([]), VERDICTS.UNVERIFIED); // empty list fails closed
console.log('  ✓ worstAction precedence (BLOCK > UNVERIFIED > WARN > ACCEPT) verified');

// 6. Run Envelope Round-Trip & Hash Stability
console.log('6. Testing run envelope serialization & hash stability...');
const envelope = createRunEnvelope({
  runId: 'run_test_001',
  timestamp: '2026-11-17T18:00:00.000Z',
  config: { threshold: 0.82 }
});
const validatedEnvelope = validateRunEnvelope(envelope);
assert.strictEqual(validatedEnvelope.schema, 'panelproof/run-envelope@1');
assert.strictEqual(validatedEnvelope.runId, 'run_test_001');
const hash1 = computeHash({ a: 1, b: 2 });
const hash2 = computeHash({ a: 1, b: 2 });
assert.strictEqual(hash1, hash2, 'Hashes must be strictly deterministic');
console.log('  ✓ Run envelope serialization, validation, and hash determinism verified');

// 7. Decision Receipt & Override Enforcement
console.log('7. Testing decision receipts & override validation...');
const cleanRecords = [
  { panel: 'p03', claim: 'face.identity', severity: 'block', verdict: VERDICTS.ACCEPT, verifier: 'v1', latencyMs: 10, costUsd: 0 },
  { panel: 'p03', claim: 'outfit.coat', severity: 'warn', verdict: VERDICTS.ACCEPT, verifier: 'v1', latencyMs: 10, costUsd: 0 }
];
const cleanReceipt = createDecisionReceipt({ panel: 'p03', claimRecords: cleanRecords });
assert.strictEqual(cleanReceipt.decision, VERDICTS.ACCEPT);
assert.strictEqual(cleanReceipt.continuity, 1.0);
assert.strictEqual(cleanReceipt.failClosed, true);

// Override without reason MUST fail
assert.throws(
  () => createDecisionReceipt({
    panel: 'p03',
    claimRecords: cleanRecords,
    override: { verdict: 'ACCEPT', reason: '' }
  }),
  err => err instanceof MalformedInputError && err.message.includes('requires a non-empty reason')
);
console.log('  ✓ Decision receipts and override-requires-reason constraint verified');

console.log('=== [W1-P0] All Contract Tests PASSED ===\n');
