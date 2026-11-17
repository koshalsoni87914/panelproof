/**
 * PanelProof Corpus Evaluation Runner
 * Executes the deterministic policy engine across adversarial fixtures and generates eval/results.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ContinuityPolicyEngine } from '../policy/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export function runCorpusEvaluation(corpusRelativePath = 'eval/corpus.json') {
  const corpusPath = path.join(projectRoot, corpusRelativePath);
  const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'));
  const engine = new ContinuityPolicyEngine();

  const results = [];
  let matches = 0;
  let deliberateCorruptionsTotal = 0;
  let deliberateCorruptionsBlocked = 0;
  let cleanCasesTotal = 0;
  let cleanCasesFalseBlocked = 0;
  let abstentionTotal = 0;
  let abstentionCorrect = 0;

  const startTime = Date.now();

  for (const item of corpus.cases) {
    const fixtureFullPath = path.join(projectRoot, item.fixturePath);
    const fixture = JSON.parse(fs.readFileSync(fixtureFullPath, 'utf8'));

    const receipt = engine.evaluatePanel({
      panelId: fixture.id,
      nodeId: `${fixture.id}_v1`,
      claims: fixture.claims,
      observations: fixture.observations,
      lockedPixelDelta: fixture.lockedPixelDelta || 0
    });

    const isMatch = receipt.machineDecision === item.expectedDecision;
    if (isMatch) matches++;

    if (item.category === 'drift' || item.category === 'invariant') {
      deliberateCorruptionsTotal++;
      if (receipt.machineDecision === 'BLOCK') {
        deliberateCorruptionsBlocked++;
      }
    }

    if (item.category === 'clean') {
      cleanCasesTotal++;
      if (receipt.machineDecision === 'BLOCK') {
        cleanCasesFalseBlocked++;
      }
    }

    if (item.category === 'fail-closed' || item.category === 'ambiguity' || item.category === 'missing-ref') {
      abstentionTotal++;
      if (receipt.machineDecision === 'UNVERIFIED') {
        abstentionCorrect++;
      }
    }

    results.push({
      id: item.id,
      fixturePath: item.fixturePath,
      category: item.category,
      expected: item.expectedDecision,
      actual: receipt.machineDecision,
      match: isMatch,
      blockingClaims: receipt.blockingClaims,
      unverifiedClaims: receipt.unverifiedClaims,
      failClosed: receipt.failClosed,
      canExport: receipt.canExport,
      continuityScore: receipt.continuityScore
    });
  }

  const durationMs = Date.now() - startTime;

  const metrics = {
    schema: 'panelproof/eval-results@1',
    evaluatedAt: new Date().toISOString(),
    corpusVersion: corpus.version,
    totalCases: corpus.cases.length,
    matchingCases: matches,
    accuracy: matches / corpus.cases.length,
    wrongTraitRecall: deliberateCorruptionsTotal > 0 ? deliberateCorruptionsBlocked / deliberateCorruptionsTotal : 1.0,
    cleanPanelFalseBlockRate: cleanCasesTotal > 0 ? cleanCasesFalseBlocked / cleanCasesTotal : 0.0,
    abstentionFidelity: abstentionTotal > 0 ? abstentionCorrect / abstentionTotal : 1.0,
    durationMs,
    results
  };

  const outputPath = path.join(projectRoot, 'eval', 'results.json');
  fs.writeFileSync(outputPath, JSON.stringify(metrics, null, 2), 'utf8');

  return metrics;
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const summary = runCorpusEvaluation();
  console.log('==> PanelProof Corpus Evaluation Complete');
  console.log(`Cases: ${summary.matchingCases}/${summary.totalCases} passed (Accuracy: ${(summary.accuracy * 100).toFixed(1)}%)`);
  console.log(`Wrong-Trait Recall: ${(summary.wrongTraitRecall * 100).toFixed(1)}%`);
  console.log(`Clean False-Block Rate: ${(summary.cleanPanelFalseBlockRate * 100).toFixed(1)}%`);
  console.log(`Abstention Fidelity: ${(summary.abstentionFidelity * 100).toFixed(1)}%`);
  console.log(`Report written to eval/results.json`);
}
