import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ContinuityPolicyEngine,
  REASON_CODES,
  EvidenceLedger,
  EvidenceRecord
} from '../index.js';

test('1. Verdict Ordering — conservative worstAction precedence', () => {
  const engine = new ContinuityPolicyEngine();

  assert.strictEqual(engine.worstAction(['ACCEPT', 'ACCEPT']), 'ACCEPT');
  assert.strictEqual(engine.worstAction(['ACCEPT', 'WARN']), 'WARN');
  assert.strictEqual(engine.worstAction(['ACCEPT', 'WARN', 'UNVERIFIED']), 'UNVERIFIED');
  assert.strictEqual(engine.worstAction(['ACCEPT', 'BLOCK', 'WARN']), 'BLOCK');
  assert.strictEqual(engine.worstAction(['UNVERIFIED', 'BLOCK']), 'BLOCK');
  assert.strictEqual(engine.worstAction([]), 'ACCEPT');
});

test('2. Provenance Boundary — model-inferred claims may never block', () => {
  const engine = new ContinuityPolicyEngine();

  const artistClaim = {
    id: 'trait.scar.side',
    kind: 'attribute',
    severity: 'block',
    source: 'artist-declared',
    expect: { minConfidence: 0.75 }
  };

  const inferredClaim = {
    id: 'trait.eye.colour',
    kind: 'attribute',
    severity: 'block', // Even if declared block, inferred source prevents blocking
    source: 'model-inferred',
    expect: { minConfidence: 0.75 }
  };

  // Failing observation
  const failingObs = { confidence: 0.35, observed: 'trait not observed' };

  // Artist claim MUST block
  const artistRecord = engine.evaluateClaim(artistClaim, failingObs);
  assert.strictEqual(artistRecord.verdict, 'BLOCK');
  assert.strictEqual(artistRecord.reasonCode, REASON_CODES.DRIFT_TRAIT_MISMATCH);

  // Inferred claim MUST downgrade to WARN
  const inferredRecord = engine.evaluateClaim(inferredClaim, failingObs);
  assert.strictEqual(inferredRecord.verdict, 'WARN');
  assert.strictEqual(inferredRecord.reasonCode, REASON_CODES.WARN_INFERRED_CLAIM_FAILED);
});

test('3. Fail-Closed Verifier Failures — timeouts and missing refs yield UNVERIFIED', () => {
  const engine = new ContinuityPolicyEngine();

  const claim = {
    id: 'face.identity',
    kind: 'identity',
    severity: 'block',
    source: 'artist-declared'
  };

  // Timeout observation
  const timeoutObs = { timedOut: true, latencyMs: 5100 };
  const timeoutRecord = engine.evaluateClaim(claim, timeoutObs);
  assert.strictEqual(timeoutRecord.verdict, 'UNVERIFIED');
  assert.strictEqual(timeoutRecord.reasonCode, REASON_CODES.UNVERIFIED_TIMEOUT);

  // Missing reference
  const missingRefObs = { status: 'MISSING_REFERENCE' };
  const missingRecord = engine.evaluateClaim(claim, missingRefObs);
  assert.strictEqual(missingRecord.verdict, 'UNVERIFIED');
  assert.strictEqual(missingRecord.reasonCode, REASON_CODES.UNVERIFIED_MISSING_REFERENCE);

  // Ambiguous angle
  const ambiguousObs = { status: 'AMBIGUOUS', observed: 'Profile angle obscures jaw' };
  const ambiguousRecord = engine.evaluateClaim(claim, ambiguousObs);
  assert.strictEqual(ambiguousRecord.verdict, 'UNVERIFIED');
  assert.strictEqual(ambiguousRecord.reasonCode, REASON_CODES.UNVERIFIED_AMBIGUOUS_VIEW);
});

test('4. Panel Evaluation & Fail-Closed Gate', () => {
  const engine = new ContinuityPolicyEngine();

  const claims = [
    { id: 'face.identity', kind: 'identity', severity: 'block', expect: { minCosine: 0.82 } },
    { id: 'trait.scar', kind: 'attribute', severity: 'block', expect: { minConfidence: 0.75 } },
    { id: 'outfit.coat', kind: 'attribute', severity: 'warn', expect: { minConfidence: 0.70 } }
  ];

  // Clean panel
  const cleanReceipt = engine.evaluatePanel({
    panelId: 'p01',
    nodeId: 'p01_v1',
    claims,
    observations: {
      'face.identity': { confidence: 0.92, observed: 'Match cosine 0.92' },
      'trait.scar': { confidence: 0.88, observed: 'Scar present on left jaw' },
      'outfit.coat': { confidence: 0.74, observed: 'Navy coat detected' }
    }
  });

  assert.strictEqual(cleanReceipt.machineDecision, 'ACCEPT');
  assert.strictEqual(cleanReceipt.canExport, true);
  assert.strictEqual(cleanReceipt.blockingClaims.length, 0);

  // Drifted panel
  const driftedReceipt = engine.evaluatePanel({
    panelId: 'p02',
    nodeId: 'p02_v1',
    claims,
    observations: {
      'face.identity': { confidence: 0.91, observed: 'Match cosine 0.91' },
      'trait.scar': { confidence: 0.32, observed: 'Scar on right jaw' }, // FAILS
      'outfit.coat': { confidence: 0.75, observed: 'Navy coat detected' }
    }
  });

  assert.strictEqual(driftedReceipt.machineDecision, 'BLOCK');
  assert.strictEqual(driftedReceipt.canExport, false);
  assert.deepStrictEqual(driftedReceipt.blockingClaims, ['trait.scar']);
  assert.strictEqual(driftedReceipt.failClosed, true);
});

test('5. Locked Pixels Invariant', () => {
  const engine = new ContinuityPolicyEngine();

  const claims = [
    { id: 'face.identity', kind: 'identity', severity: 'block', expect: { minCosine: 0.82 } }
  ];

  const receipt = engine.evaluatePanel({
    panelId: 'p01',
    nodeId: 'p01_v2',
    claims,
    observations: {
      'face.identity': { confidence: 0.95 }
    },
    lockedPixelDelta: 14 // Violated!
  });

  assert.strictEqual(receipt.machineDecision, 'BLOCK');
  assert.strictEqual(receipt.canExport, false);
});

test('6. Creator Override Protocol', () => {
  const engine = new ContinuityPolicyEngine();

  const claims = [
    { id: 'trait.scar', kind: 'attribute', severity: 'block', expect: { minConfidence: 0.75 } }
  ];

  const receipt = engine.evaluatePanel({
    panelId: 'p01',
    nodeId: 'p01_v1',
    claims,
    observations: {
      'trait.scar': { confidence: 0.30 }
    }
  });

  assert.strictEqual(receipt.machineDecision, 'BLOCK');

  // Empty reason rejected
  const emptyOverride = engine.applyOverride(receipt, '   ');
  assert.strictEqual(emptyOverride.overrideStatus, 'REJECTED');
  assert.strictEqual(emptyOverride.canExport, false);

  // Valid reason accepted
  const validOverride = engine.applyOverride(
    receipt,
    'Scar is obscured by smoke in panel 1 dramatic lighting',
    'lead_artist'
  );

  assert.strictEqual(validOverride.effectiveDecision, 'ALLOW');
  assert.strictEqual(validOverride.canExport, true);
  assert.strictEqual(validOverride.override.status, 'ACCEPTED');
  assert.strictEqual(validOverride.machineDecision, 'BLOCK'); // Preserves machine truth
});

test('7. Evidence Ledger Serialization & Parsing', () => {
  const ledger = new EvidenceLedger();

  ledger.addRecord(new EvidenceRecord({
    panel: 'p01',
    nodeId: 'p01_v1',
    claim: 'face.identity',
    severity: 'block',
    verdict: 'ACCEPT',
    reasonCode: REASON_CODES.ACCEPT_PASSED,
    verifier: 'insightface/buffalo_l',
    confidence: 0.94,
    threshold: 0.82,
    observed: 'Face verified',
    evidence: { crop: 'nodes/p01/crop.png', bbox: [100, 200, 300, 400] }
  }));

  const ndjson = ledger.toNDJSON();
  assert.ok(ndjson.includes('insightface/buffalo_l'));

  const parsed = EvidenceLedger.fromNDJSON(ndjson);
  assert.strictEqual(parsed.records.length, 1);
  assert.strictEqual(parsed.records[0].claim, 'face.identity');
  assert.strictEqual(parsed.records[0].confidence, 0.94);
});

test('8. Sequence Aggregation', () => {
  const engine = new ContinuityPolicyEngine();

  const receipts = [
    { panel: 'p01', nodeId: 'p01_v1', effectiveDecision: 'ACCEPT', canExport: true },
    { panel: 'p02', nodeId: 'p02_v1', effectiveDecision: 'WARN', canExport: true },
    { panel: 'p03', nodeId: 'p03_v1', effectiveDecision: 'BLOCK', canExport: false }
  ];

  const seq = engine.evaluateSequence(receipts);
  assert.strictEqual(seq.sequenceDecision, 'BLOCK');
  assert.strictEqual(seq.canExportSequence, false);
  assert.deepStrictEqual(seq.blockingPanels, ['p03']);
});
