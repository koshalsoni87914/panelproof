/**
 * PanelProof Evidence Ledger
 * Schema: panelproof/evidence-ledger@1
 * Retains granular per-check evidence, coordinates, and verifier provenance.
 */

export class EvidenceRecord {
  /**
   * @param {Object} params
   * @param {string} params.panel Panel identifier (e.g. "p01")
   * @param {string} params.nodeId Canvas node identifier (e.g. "p01_v1")
   * @param {string} params.claim Claim ID (e.g. "face.identity")
   * @param {string} params.claimLabel Human-readable label
   * @param {"block"|"warn"} params.severity Severity declared by canon
   * @param {"artist-declared"|"model-inferred"} params.source Provenance source
   * @param {"ACCEPT"|"WARN"|"BLOCK"|"UNVERIFIED"|"UNSUPPORTED"} params.verdict Check-level verdict
   * @param {string} params.reasonCode Reason code from REASON_CODES
   * @param {string} params.verifier Verifier identifier (e.g. "insightface/buffalo_l")
   * @param {number|null} params.confidence Observed confidence score
   * @param {number|null} params.threshold Configured decision threshold
   * @param {string} params.observed Descriptive string of what was observed
   * @param {Object|null} [params.evidence] Supporting visual evidence crop & bounding box
   * @param {number} [params.latencyMs] Verifier execution time
   * @param {number} [params.costUsd] Financial cost of verification
   * @param {string} [params.ts] ISO timestamp
   */
  constructor({
    panel,
    nodeId,
    claim,
    claimLabel,
    severity = 'block',
    source = 'artist-declared',
    verdict,
    reasonCode,
    verifier,
    confidence = null,
    threshold = null,
    observed = '',
    evidence = null,
    latencyMs = 0,
    costUsd = 0.0,
    ts = new Date().toISOString()
  }) {
    if (!panel || !nodeId || !claim || !verdict) {
      throw new Error(`Invalid EvidenceRecord: panel, nodeId, claim, and verdict are required.`);
    }

    this.panel = panel;
    this.nodeId = nodeId;
    this.claim = claim;
    this.claimLabel = claimLabel || claim;
    this.severity = severity;
    this.source = source;
    this.verdict = verdict;
    this.reasonCode = reasonCode;
    this.verifier = verifier;
    this.confidence = confidence !== null && confidence !== undefined ? Number(confidence) : null;
    this.threshold = threshold !== null && threshold !== undefined ? Number(threshold) : null;
    this.observed = observed;
    this.evidence = evidence ? this._normalizeEvidence(evidence) : null;
    this.latencyMs = latencyMs;
    this.costUsd = costUsd;
    this.ts = ts;
  }

  _normalizeEvidence(evidence) {
    return {
      crop: evidence.crop || null,
      bbox: Array.isArray(evidence.bbox) ? evidence.bbox : null,
      mask: evidence.mask || null,
      details: evidence.details || {}
    };
  }

  toJSON() {
    return {
      panel: this.panel,
      nodeId: this.nodeId,
      claim: this.claim,
      claimLabel: this.claimLabel,
      severity: this.severity,
      source: this.source,
      verdict: this.verdict,
      reasonCode: this.reasonCode,
      verifier: this.verifier,
      confidence: this.confidence,
      threshold: this.threshold,
      observed: this.observed,
      evidence: this.evidence,
      latencyMs: this.latencyMs,
      costUsd: this.costUsd,
      ts: this.ts
    };
  }

  toNDJSON() {
    return JSON.stringify(this.toJSON());
  }
}

export class EvidenceLedger {
  constructor() {
    /** @type {EvidenceRecord[]} */
    this.records = [];
  }

  /**
   * Add a single evidence record
   * @param {EvidenceRecord|Object} record
   */
  addRecord(record) {
    if (record instanceof EvidenceRecord) {
      this.records.push(record);
    } else {
      this.records.push(new EvidenceRecord(record));
    }
  }

  /**
   * Get all records for a specific panel
   * @param {string} panelId
   * @returns {EvidenceRecord[]}
   */
  getPanelRecords(panelId) {
    return this.records.filter(r => r.panel === panelId);
  }

  /**
   * Serialize entire ledger to NDJSON string
   * @returns {string}
   */
  toNDJSON() {
    return this.records.map(r => r.toNDJSON()).join('\n');
  }

  /**
   * Parse NDJSON into an EvidenceLedger instance
   * @param {string} ndjsonContent
   * @returns {EvidenceLedger}
   */
  static fromNDJSON(ndjsonContent) {
    const ledger = new EvidenceLedger();
    const lines = ndjsonContent.split('\n').filter(line => line.trim().length > 0);
    for (const line of lines) {
      const data = JSON.parse(line);
      ledger.addRecord(new EvidenceRecord(data));
    }
    return ledger;
  }

  /**
   * Calculate summary metrics across the ledger
   */
  getSummaryMetrics() {
    const totalChecks = this.records.length;
    const acceptCount = this.records.filter(r => r.verdict === 'ACCEPT').length;
    const warnCount = this.records.filter(r => r.verdict === 'WARN').length;
    const blockCount = this.records.filter(r => r.verdict === 'BLOCK').length;
    const unverifiedCount = this.records.filter(r => r.verdict === 'UNVERIFIED').length;
    const unsupportedCount = this.records.filter(r => r.verdict === 'UNSUPPORTED').length;

    const totalCostUsd = this.records.reduce((acc, r) => acc + (r.costUsd || 0), 0);
    const totalLatencyMs = this.records.reduce((acc, r) => acc + (r.latencyMs || 0), 0);

    return {
      totalChecks,
      acceptCount,
      warnCount,
      blockCount,
      unverifiedCount,
      unsupportedCount,
      totalCostUsd: Math.round(totalCostUsd * 100000) / 100000,
      totalLatencyMs,
      abstentionRate: totalChecks > 0 ? (unverifiedCount + unsupportedCount) / totalChecks : 0
    };
  }
}
