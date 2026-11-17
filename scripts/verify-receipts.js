'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { ReportRuntime, CURRENT_REPORT_SCHEMA } = require('../runtime/report');
const { FixedClock } = require('../runtime/clock');
const { createDecisionReceipt, CURRENT_RECEIPT_SCHEMA } = require('../packages/contracts/src/receipt');
const { VERDICTS } = require('../packages/contracts/src/verdict');

console.log('=== [W1-P3] Verifying Receipt & Report Runtime ===');

const fixedClock = new FixedClock('2026-11-17T18:30:00.000Z');
const reportRuntime = new ReportRuntime({
  outputDir: path.resolve(__dirname, '../.brain/.report'),
  clock: fixedClock
});

// 1. Ingest Evidence Records
console.log('1. Streaming evidence records to runtime...');
const records = [
  {
    panel: 'p03',
    nodeId: 'p03_v1',
    claim: 'face.identity',
    severity: 'block',
    verdict: VERDICTS.ACCEPT,
    verifier: 'insightface/buffalo_l',
    confidence: 0.93,
    threshold: 0.82,
    observed: 'cosine 0.93 vs karan_01',
    evidence: { crop: 'nodes/p03_v1/crop_face.jpg', bbox: [388, 164, 572, 340] },
    latencyMs: 96,
    costUsd: 0.0,
    ts: fixedClock.toISOString()
  },
  {
    panel: 'p04',
    nodeId: 'p04_v1',
    claim: 'trait.scar.side',
    severity: 'block',
    verdict: VERDICTS.BLOCK,
    verifier: 'gemini-3-flash/vision',
    confidence: 0.34,
    threshold: 0.75,
    observed: 'scar appears on the character\'s RIGHT jaw',
    evidence: { crop: 'nodes/p04_v1/crop_face.jpg', bbox: [412, 180, 596, 352] },
    latencyMs: 806,
    costUsd: 0.00041,
    ts: fixedClock.toISOString()
  },
  {
    panel: 'p05',
    nodeId: 'p05_v1',
    claim: 'face.identity',
    severity: 'block',
    verdict: VERDICTS.UNVERIFIED,
    verifier: 'insightface/buffalo_l',
    confidence: null,
    threshold: 0.82,
    observed: 'vision service unreachable after 2 retries (ETIMEDOUT)',
    evidence: null,
    latencyMs: 10240,
    costUsd: 0.0,
    ts: fixedClock.toISOString()
  }
];

for (const r of records) {
  reportRuntime.appendEvidence(r);
}
assert.strictEqual(reportRuntime.ledgerRecords.length, 3);
console.log('  ✓ 3 evidence records appended');

// 2. Generate and Append Panel Receipts
console.log('2. Generating panel receipts...');
const receiptP03 = createDecisionReceipt({
  panel: 'p03',
  nodeId: 'p03_v1',
  claimRecords: [records[0]]
});
assert.strictEqual(receiptP03.decision, VERDICTS.ACCEPT);
reportRuntime.appendReceipt(receiptP03);

const receiptP04 = createDecisionReceipt({
  panel: 'p04',
  nodeId: 'p04_v1',
  claimRecords: [records[1]]
});
assert.strictEqual(receiptP04.decision, VERDICTS.BLOCK);
assert.deepStrictEqual(receiptP04.blockingClaims, ['trait.scar.side']);
reportRuntime.appendReceipt(receiptP04);

const receiptP05 = createDecisionReceipt({
  panel: 'p05',
  nodeId: 'p05_v1',
  claimRecords: [records[2]]
});
assert.strictEqual(receiptP05.decision, VERDICTS.UNVERIFIED);
reportRuntime.appendReceipt(receiptP05);
console.log('  ✓ Receipts generated for clean (ACCEPT), drifted (BLOCK), and error (UNVERIFIED) panels');

// 3. Compile and Validate Audit Report
console.log('3. Compiling audit report...');
const compiledReport = reportRuntime.compileReport({
  corpusVersion: 'v1',
  thresholdVersion: 'v1',
  config: { onVerifierError: 'UNVERIFIED', abstentionFailsGate: true }
});

assert.strictEqual(compiledReport.schema, CURRENT_REPORT_SCHEMA);
assert.strictEqual(compiledReport.summary.totalPanels, 3);
assert.strictEqual(compiledReport.summary.decisions.ACCEPT, 1);
assert.strictEqual(compiledReport.summary.decisions.BLOCK, 1);
assert.strictEqual(compiledReport.summary.decisions.UNVERIFIED, 1);
assert.strictEqual(compiledReport.summary.failClosedEnforced, true);
assert.ok(compiledReport.metadata.sourceHash, 'sourceHash must be present');
console.log('  ✓ Report compiled and validated against schema');

// 4. Persist to Disk and Verify File Integrity
console.log('4. Persisting NDJSON evidence ledger and report to disk...');
const { ndjsonPath, reportPath } = reportRuntime.persist('verify_w1_p3', compiledReport);

assert.ok(fs.existsSync(ndjsonPath), 'NDJSON file must exist on disk');
assert.ok(fs.existsSync(reportPath), 'Report JSON file must exist on disk');

const ndjsonLines = fs.readFileSync(ndjsonPath, 'utf8').trim().split('\n');
assert.strictEqual(ndjsonLines.length, 3);
for (const line of ndjsonLines) {
  const parsed = JSON.parse(line);
  assert.ok(parsed.panel);
  assert.ok(parsed.claim);
}

const savedReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
assert.strictEqual(savedReport.schema, CURRENT_REPORT_SCHEMA);
assert.strictEqual(savedReport.receipts.length, 3);

console.log(`  ✓ NDJSON evidence ledger written: ${path.basename(ndjsonPath)}`);
console.log(`  ✓ Complete audit report written: ${path.basename(reportPath)}`);

console.log('=== [W1-P3] All Receipt & Report Runtime Tests PASSED ===\n');
