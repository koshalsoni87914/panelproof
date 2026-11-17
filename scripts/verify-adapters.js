'use strict';

const assert = require('assert');
const { AdapterRegistry } = require('../adapters/registry');
const { FixtureAdapter } = require('../adapters/fixture_adapter');
const { ReferenceAdapter } = require('../adapters/reference_adapter');
const { PaletteAdapter } = require('../adapters/palette_adapter');
const { MockModelAdapter } = require('../adapters/mock_model_adapter');
const { FixtureLoader } = require('../runtime/fixtures');
const { VERDICTS } = require('../packages/contracts/src/verdict');

console.log('=== [W1-P2] Verifying Evidence Adapter Layer ===');

(async () => {
  const loader = new FixtureLoader();
  const fixtures = loader.loadAll();

  // 1. Adapter Registry Check
  console.log('1. Testing adapter registry...');
  const registry = new AdapterRegistry();
  const fixtureAdapter = new FixtureAdapter(fixtures);
  const refAdapter = new ReferenceAdapter();
  const paletteAdapter = new PaletteAdapter();
  const modelAdapter = new MockModelAdapter();

  registry.register(fixtureAdapter);
  registry.register(refAdapter);
  registry.register(paletteAdapter);
  registry.register(modelAdapter);

  assert.strictEqual(registry.list().length, 4);
  assert.strictEqual(registry.has('fixture/v1'), true);
  console.log('  ✓ 4 core adapters registered successfully');

  // Helper function: asserts adapter output conforms to typed evidence packet and is never a bare boolean
  function assertTypedEvidencePacket(packet) {
    assert.strictEqual(typeof packet, 'object', 'Adapter must return an object');
    assert.notStrictEqual(typeof packet, 'boolean', 'Adapter MUST NEVER return a bare boolean');
    assert.ok(packet.panel, 'panel is required');
    assert.ok(packet.claim, 'claim is required');
    assert.ok(packet.verdict in VERDICTS, `verdict '${packet.verdict}' must be valid`);
    assert.strictEqual(typeof packet.latencyMs, 'number', 'latencyMs must be recorded');
    assert.strictEqual(typeof packet.costUsd, 'number', 'costUsd must be recorded');
    assert.ok(packet.status, 'status must be present');
  }

  // 2. Fixture Adapter Replay: Clean panel (C-001)
  console.log('2. Testing FixtureAdapter with clean fixture (C-001)...');
  const cleanResult = await fixtureAdapter.evaluate(
    { panel: 'p03', nodeId: 'p03_v1' },
    { id: 'face.identity', kind: 'identity', severity: 'block', expect: { minCosine: 0.82 } }
  );
  assertTypedEvidencePacket(cleanResult);
  assert.strictEqual(cleanResult.verdict, VERDICTS.ACCEPT);
  assert.strictEqual(cleanResult.confidence, 0.93);
  assert.ok(cleanResult.evidence.crop, 'Evidence crop must be provided');
  console.log('  ✓ Clean fixture evaluation produced ACCEPT with evidence crop');

  // 3. Fixture Adapter Replay: Drifted scar (D-001)
  console.log('3. Testing FixtureAdapter with drifted scar fixture (D-001)...');
  const driftedResult = await fixtureAdapter.evaluate(
    { panel: 'p04', nodeId: 'p04_v1' },
    { id: 'trait.scar.side', kind: 'attribute', severity: 'block', expect: { minConfidence: 0.75 } }
  );
  assertTypedEvidencePacket(driftedResult);
  assert.strictEqual(driftedResult.verdict, VERDICTS.BLOCK);
  assert.strictEqual(driftedResult.confidence, 0.34);
  assert.ok(driftedResult.observed.includes('RIGHT jaw'), 'Observed drift must describe wrong side');
  console.log('  ✓ Drifted fixture evaluation produced BLOCK with observed laterality failure');

  // 4. Fixture Adapter Replay: Error / Verifier Unavailable (E-001)
  console.log('4. Testing FixtureAdapter with verifier failure fixture (E-001)...');
  const errorResult = await fixtureAdapter.evaluate(
    { panel: 'p05', nodeId: 'p05_v1' },
    { id: 'face.identity', kind: 'identity', severity: 'block', expect: { minCosine: 0.82 } }
  );
  assertTypedEvidencePacket(errorResult);
  assert.strictEqual(errorResult.verdict, VERDICTS.UNVERIFIED);
  assert.strictEqual(errorResult.confidence, null);
  console.log('  ✓ Verifier failure correctly resulted in fail-closed UNVERIFIED verdict');

  // 5. Unsupported claim kind handling
  console.log('5. Testing unsupported claim kind handling...');
  const unsupportedResult = await refAdapter.evaluate(
    { panel: 'p03' },
    { id: 'some.palette.claim', kind: 'palette', severity: 'warn' } // refAdapter only supports 'identity'
  );
  assertTypedEvidencePacket(unsupportedResult);
  assert.strictEqual(unsupportedResult.verdict, VERDICTS.UNVERIFIED);
  assert.strictEqual(unsupportedResult.status, 'UNSUPPORTED');
  console.log('  ✓ Unsupported claim kind produced explicit UNSUPPORTED non-pass state');

  // 6. Model Adapter Timeout handling
  console.log('6. Testing model adapter timeout handling...');
  const timeoutAdapter = new MockModelAdapter({ name: 'mock-timeout', simulateError: 'TIMEOUT' });
  const timeoutResult = await timeoutAdapter.evaluate(
    { panel: 'p01' },
    { id: 'face.identity', kind: 'identity', severity: 'block' }
  );
  assertTypedEvidencePacket(timeoutResult);
  assert.strictEqual(timeoutResult.verdict, VERDICTS.UNVERIFIED);
  assert.strictEqual(timeoutResult.status, 'TIMEOUT');
  console.log('  ✓ Simulated network timeout yielded explicit TIMEOUT non-pass state');

  console.log('=== [W1-P2] All Adapter Tests PASSED ===\n');
})();
