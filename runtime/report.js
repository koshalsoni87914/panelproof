'use strict';

const fs = require('fs');
const path = require('path');
const { computeHash } = require('../packages/contracts/src/envelope');
const { redact } = require('./logger');
const { validateDecisionReceipt } = require('../packages/contracts/src/receipt');
const { MalformedInputError } = require('../packages/contracts/src/errors');

const CURRENT_REPORT_SCHEMA = 'panelproof/report@1';

class ReportRuntime {
  constructor(options = {}) {
    this.rootDir = options.rootDir || process.cwd();
    this.outputDir = options.outputDir || path.resolve(this.rootDir, '.brain/.report');
    this.clock = options.clock || { toISOString: () => new Date().toISOString() };
    this.ledgerRecords = [];
    this.receipts = [];
  }

  /**
   * Appends an evaluated verdict evidence record to the in-memory ledger.
   * @param {object} record 
   */
  appendEvidence(record) {
    if (!record || typeof record !== 'object') {
      throw new MalformedInputError('Evidence record must be an object');
    }
    const sanitized = redact(record, this.rootDir);
    this.ledgerRecords.push(sanitized);
    return sanitized;
  }

  /**
   * Appends a panel decision receipt.
   * @param {object} receipt 
   */
  appendReceipt(receipt) {
    validateDecisionReceipt(receipt);
    const sanitized = redact(receipt, this.rootDir);
    this.receipts.push(sanitized);
    return sanitized;
  }

  /**
   * Compiles and returns a complete audit report.
   * @param {object} metadata
   * @returns {object} complete report
   */
  compileReport(metadata = {}) {
    const totalPanels = this.receipts.length;
    const decisionsCount = {
      ACCEPT: 0,
      WARN: 0,
      BLOCK: 0,
      UNVERIFIED: 0
    };

    for (const r of this.receipts) {
      if (decisionsCount[r.decision] !== undefined) {
        decisionsCount[r.decision]++;
      }
    }

    const report = {
      schema: CURRENT_REPORT_SCHEMA,
      reportId: `rep_${Date.now()}`,
      generatedAt: this.clock.toISOString(),
      metadata: {
        corpusVersion: metadata.corpusVersion || 'v1',
        thresholdVersion: metadata.thresholdVersion || 'v1',
        sourceHash: computeHash(metadata.config || {}),
        nodeVersion: process.version,
        platform: process.platform,
        ...redact(metadata, this.rootDir)
      },
      summary: {
        totalPanels,
        decisions: decisionsCount,
        totalEvidenceRecords: this.ledgerRecords.length,
        failClosedEnforced: true
      },
      receipts: this.receipts,
      evidenceLedger: this.ledgerRecords
    };

    return report;
  }

  /**
   * Writes the NDJSON evidence ledger and JSON report to disk.
   * @param {string} runId 
   * @param {object} report 
   * @returns {object} { ndjsonPath, reportPath }
   */
  persist(runId, report) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const prefix = runId ? `${runId}_` : '';
    const ndjsonPath = path.resolve(this.outputDir, `${prefix}evidence_ledger.ndjson`);
    const reportPath = path.resolve(this.outputDir, `${prefix}audit_report.json`);

    const ndjsonContent = this.ledgerRecords.map(r => JSON.stringify(r)).join('\n');
    fs.writeFileSync(ndjsonPath, ndjsonContent, 'utf8');

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

    return {
      ndjsonPath,
      reportPath
    };
  }
}

module.exports = {
  CURRENT_REPORT_SCHEMA,
  ReportRuntime
};
