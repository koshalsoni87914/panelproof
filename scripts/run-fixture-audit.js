'use strict';

const fs = require('fs');
const path = require('path');

const { validateClaims } = require('../packages/contracts/src/claim');
const { createDecisionReceipt } = require('../packages/contracts/src/receipt');
const { VERDICTS } = require('../packages/contracts/src/verdict');
const { FixtureLoader } = require('../runtime/fixtures');
const { FixtureAdapter } = require('../adapters/fixture_adapter');
const { ReportRuntime } = require('../runtime/report');
const { FixedClock } = require('../runtime/clock');

async function runFixtureAudit() {
  console.log('╔═══════════════════════════════════════════════════════════════════════╗');
  console.log('║                   PANELPROOF LOCAL FIXTURE RUNNER                    ║');
  console.log('║               Fail-Closed Continuity & Hallucination Gate             ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════╝\n');

  // 1. Load Claims Manifest
  const claimsFile = path.resolve(__dirname, '../.brain/.testdata/v1/claims.karan.example.json');
  const claimsRaw = JSON.parse(fs.readFileSync(claimsFile, 'utf8'));
  const validatedClaims = validateClaims(claimsRaw);
  console.log(`[Claims] Loaded manifest for character: ${validatedClaims.subject.displayName} (${validatedClaims.claims.length} claims declared)`);

  // 2. Load Fixtures
  const loader = new FixtureLoader();
  const allFixtures = loader.loadAll();
  console.log(`[Fixtures] Discovered ${allFixtures.length} runtime fixtures\n`);

  // 3. Initialize Adapter & Report Runtime
  const clock = new FixedClock('2026-11-17T18:00:00.000Z');
  const adapter = new FixtureAdapter(allFixtures);
  const reportRuntime = new ReportRuntime({ clock });

  // 4. Audit each fixture panel
  for (const fixture of allFixtures) {
    console.log(`-------------------------------------------------------------------------`);
    console.log(`Auditing Panel: ${fixture.panel} (${fixture.id} — ${fixture.name})`);
    console.log(`Description:   ${fixture.description}`);

    const claimRecords = [];

    // Evaluate declared claims
    for (const claim of validatedClaims.claims) {
      const evaluation = await adapter.evaluate(
        { panel: fixture.panel, nodeId: fixture.nodeId, id: fixture.id },
        claim,
        { clock }
      );
      claimRecords.push(evaluation);
      reportRuntime.appendEvidence(evaluation);

      const statusIcon = evaluation.verdict === VERDICTS.ACCEPT ? '✓' : (evaluation.verdict === VERDICTS.WARN ? '▲' : '✗');
      const confStr = evaluation.confidence !== null ? `(conf: ${evaluation.confidence})` : '(unverified)';
      console.log(`  ${statusIcon} [${evaluation.verdict.padEnd(10)}] ${claim.id.padEnd(18)} : ${evaluation.observed} ${confStr}`);
    }

    // Aggregate into panel decision receipt
    const receipt = createDecisionReceipt({
      panel: fixture.panel,
      nodeId: fixture.nodeId,
      claimRecords
    });
    reportRuntime.appendReceipt(receipt);

    console.log(`\n  >> PANEL VERDICT: [${receipt.decision}] | Continuity Score: ${receipt.continuity}`);
    if (receipt.blockingClaims.length > 0) {
      console.log(`  >> BLOCKING CLAIMS: ${receipt.blockingClaims.join(', ')}`);
    }
  }

  // 5. Compile and Persist Audit Report & NDJSON Receipts
  console.log(`\n=========================================================================`);
  const report = reportRuntime.compileReport({
    subject: validatedClaims.subject.displayName,
    corpusVersion: 'v1'
  });
  const { ndjsonPath, reportPath } = reportRuntime.persist('fixture_run', report);

  console.log('AUDIT SUMMARY:');
  console.log(`  Total Panels Evaluated: ${report.summary.totalPanels}`);
  console.log(`  Decisions Breakdown:    ACCEPT: ${report.summary.decisions.ACCEPT} | BLOCK: ${report.summary.decisions.BLOCK} | UNVERIFIED: ${report.summary.decisions.UNVERIFIED}`);
  console.log(`  Fail-Closed Invariant:  ${report.summary.failClosedEnforced ? 'ENFORCED' : 'FAILED'}`);
  console.log(`\nArtifacts Generated:`);
  console.log(`  Ledger (NDJSON): ${ndjsonPath}`);
  console.log(`  Report (JSON):   ${reportPath}`);
  console.log(`=========================================================================\n`);
}

runFixtureAudit().catch(err => {
  console.error('Fixture audit failed:', err);
  process.exit(1);
});
