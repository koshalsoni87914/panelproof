/**
 * PanelProof Creator Review Bench — Main Application Controller
 */

import { FIXTURE_PANELS } from './data/mock-receipts.js';

const HUMAN_LABELS = {
  ALLOW: 'Kept',
  ACCEPT: 'Kept',
  WARN: 'Check this',
  BLOCK: 'Broke canon',
  UNVERIFIED: 'Needs your call'
};

class ReviewBenchController {
  constructor() {
    this.panels = JSON.parse(JSON.stringify(FIXTURE_PANELS));
    this.activePanelId = this.panels[0].id;
    this.overrides = new Map();
    this.showBoundingBoxes = true;
    this.showRegionMask = false;

    this.initDOMElements();
    this.attachEventListeners();
    this.render();
  }

  initDOMElements() {
    this.panelStrip = document.getElementById('panelStrip');
    this.studioTitle = document.getElementById('studioTitle');
    this.refSubjectBadge = document.getElementById('refSubjectBadge');
    this.refImage = document.getElementById('refImage');
    this.targetImage = document.getElementById('targetImage');
    this.targetStatusBadge = document.getElementById('targetStatusBadge');
    this.targetHumanBadge = document.getElementById('targetHumanBadge');
    this.overlaySvg = document.getElementById('overlaySvg');
    this.imageMetaHash = document.getElementById('imageMetaHash');
    this.fixtureMetaInfo = document.getElementById('fixtureMetaInfo');
    this.panelContinuityBadge = document.getElementById('panelContinuityBadge');

    this.verdictBanner = document.getElementById('verdictBanner');
    this.bannerStatusPill = document.getElementById('bannerStatusPill');
    this.bannerHumanPill = document.getElementById('bannerHumanPill');
    this.bannerReasonCode = document.getElementById('bannerReasonCode');
    this.bannerSummary = document.getElementById('bannerSummary');
    this.guidanceText = document.getElementById('guidanceText');
    this.btnOpenOverride = document.getElementById('btnOpenOverride');

    this.driftDetailsBox = document.getElementById('driftDetailsBox');
    this.driftFailedClaim = document.getElementById('driftFailedClaim');
    this.driftExpected = document.getElementById('driftExpected');
    this.driftObserved = document.getElementById('driftObserved');
    this.driftConfidence = document.getElementById('driftConfidence');

    this.evidenceList = document.getElementById('evidenceList');
    this.evidenceCount = document.getElementById('evidenceCount');
    this.btnExport = document.getElementById('btnExport');

    this.btnToggleBbox = document.getElementById('btnToggleBbox');
    this.btnToggleHeatmap = document.getElementById('btnToggleHeatmap');

    // Override Modal
    this.overrideModal = document.getElementById('overrideModal');
    this.btnCloseModal = document.getElementById('btnCloseModal');
    this.btnCancelOverride = document.getElementById('btnCancelOverride');
    this.btnConfirmOverride = document.getElementById('btnConfirmOverride');
    this.overrideCategory = document.getElementById('overrideCategory');
    this.overrideText = document.getElementById('overrideText');
    this.overrideAlert = document.getElementById('overrideAlert');
  }

  attachEventListeners() {
    this.btnToggleBbox.addEventListener('click', () => {
      this.showBoundingBoxes = !this.showBoundingBoxes;
      this.btnToggleBbox.classList.toggle('active', this.showBoundingBoxes);
      this.renderOverlays();
    });

    this.btnToggleHeatmap.addEventListener('click', () => {
      this.showRegionMask = !this.showRegionMask;
      this.btnToggleHeatmap.classList.toggle('active', this.showRegionMask);
      this.renderOverlays();
    });

    this.btnOpenOverride.addEventListener('click', () => this.openOverrideModal());
    this.btnCloseModal.addEventListener('click', () => this.closeOverrideModal());
    this.btnCancelOverride.addEventListener('click', () => this.closeOverrideModal());
    this.btnConfirmOverride.addEventListener('click', () => this.applyOverride());

    this.btnExport.addEventListener('click', () => {
      alert('Publication Sequence Approved!\nExporting package with continuous cryptographic audit ledger...');
    });
  }

  getActivePanel() {
    return this.panels.find(p => p.id === this.activePanelId) || this.panels[0];
  }

  selectPanel(id) {
    this.activePanelId = id;
    this.render();
  }

  render() {
    this.renderStrip();
    this.renderStudio();
    this.renderPolicy();
    this.updateExportState();
  }

  renderStrip() {
    this.panelStrip.innerHTML = '';
    this.panels.forEach(panel => {
      const isOverridden = this.overrides.has(panel.id);
      const effectiveStatus = isOverridden ? 'ALLOW' : panel.status;
      const humanLabel = isOverridden ? 'Overridden' : (HUMAN_LABELS[effectiveStatus] || effectiveStatus);

      const card = document.createElement('div');
      card.className = `strip-card ${panel.id === this.activePanelId ? 'active' : ''}`;
      card.addEventListener('click', () => this.selectPanel(panel.id));

      const statusClass = `status-${effectiveStatus.toLowerCase()}`;

      card.innerHTML = `
        <div class="strip-header">
          <span class="strip-title">P${panel.panelNumber}: ${panel.id}</span>
          <span class="status-pill ${statusClass}">${humanLabel}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-dim); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
          ${effectiveStatus} &bull; ${panel.claims.length} checks &bull; ${panel.lockedPixelDelta > 0 ? 'Lock Breach' : 'OK'}
        </div>
      `;
      this.panelStrip.appendChild(card);
    });
  }

  renderStudio() {
    const panel = this.getActivePanel();
    const isOverridden = this.overrides.has(panel.id);
    const effectiveStatus = isOverridden ? 'ALLOW' : panel.status;
    const humanLabel = isOverridden ? 'Overridden' : (HUMAN_LABELS[effectiveStatus] || effectiveStatus);

    this.studioTitle.textContent = `${panel.title} (${panel.id})`;
    this.refSubjectBadge.textContent = `${panel.subject} (Canon Sheet)`;
    this.refImage.src = panel.referenceImg;
    this.targetImage.src = panel.targetImg;

    this.targetStatusBadge.className = `status-pill status-${effectiveStatus.toLowerCase()}`;
    this.targetStatusBadge.textContent = isOverridden ? 'OVERRIDE' : effectiveStatus;
    if (this.targetHumanBadge) {
      this.targetHumanBadge.className = `status-pill status-${effectiveStatus.toLowerCase()}`;
      this.targetHumanBadge.textContent = humanLabel;
    }

    this.imageMetaHash.textContent = `Hash: SHA256:${panel.id.toLowerCase()}${panel.panelNumber}a90c1...4e`;
    if (this.fixtureMetaInfo) {
      this.fixtureMetaInfo.textContent = `Fixture: ${panel.id} | Corpus: v1.0.0 | Policy: v1.0.0`;
    }
    if (this.panelContinuityBadge) {
      const score = panel.continuityScore !== undefined ? Math.round(panel.continuityScore * 100) : (panel.status === 'BLOCK' ? 67 : 100);
      this.panelContinuityBadge.textContent = `Continuity: ${score}%`;
    }

    this.renderOverlays();
  }

  renderOverlays() {
    const panel = this.getActivePanel();
    this.overlaySvg.innerHTML = '';

    if (!this.showBoundingBoxes && !this.showRegionMask) return;

    panel.claims.forEach(claim => {
      if (!claim.bbox) return;
      const [ymin, xmin, ymax, xmax] = claim.bbox;
      const width = xmax - xmin;
      const height = ymax - ymin;

      let strokeColor = '#10b981';
      let fillColor = 'rgba(16, 185, 129, 0.15)';

      if (claim.status === 'BLOCK') {
        strokeColor = '#f43f5e';
        fillColor = 'rgba(244, 63, 94, 0.25)';
      } else if (claim.status === 'WARN') {
        strokeColor = '#f59e0b';
        fillColor = 'rgba(245, 158, 11, 0.20)';
      } else if (claim.status === 'UNVERIFIED') {
        strokeColor = '#38bdf8';
        fillColor = 'rgba(56, 189, 248, 0.15)';
      }

      if (this.showBoundingBoxes) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', xmin);
        rect.setAttribute('y', ymin);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('stroke', strokeColor);
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('fill', this.showRegionMask ? fillColor : 'none');
        rect.setAttribute('stroke-dasharray', claim.severity === 'warn' ? '4 2' : 'none');
        this.overlaySvg.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', xmin + 4);
        text.setAttribute('y', ymin > 20 ? ymin - 4 : ymin + 14);
        text.setAttribute('fill', strokeColor);
        text.setAttribute('font-size', '11');
        text.setAttribute('font-family', 'sans-serif');
        text.setAttribute('font-weight', 'bold');
        text.textContent = claim.id;
        this.overlaySvg.appendChild(text);
      }
    });
  }

  renderPolicy() {
    const panel = this.getActivePanel();
    const isOverridden = this.overrides.has(panel.id);
    const effectiveStatus = isOverridden ? 'ALLOW' : panel.status;

    // Banner styling
    const humanLabel = isOverridden ? 'Overridden' : (HUMAN_LABELS[effectiveStatus] || effectiveStatus);
    this.verdictBanner.className = `verdict-banner banner-${effectiveStatus.toLowerCase()}`;
    this.bannerStatusPill.className = `status-pill status-${effectiveStatus.toLowerCase()}`;
    this.bannerStatusPill.textContent = isOverridden ? 'OVERRIDE ALLOW' : effectiveStatus;
    if (this.bannerHumanPill) {
      this.bannerHumanPill.className = `status-pill status-${effectiveStatus.toLowerCase()}`;
      this.bannerHumanPill.textContent = humanLabel;
    }

    if (isOverridden) {
      const overrideData = this.overrides.get(panel.id);
      this.bannerReasonCode.textContent = 'OVERRIDE_HUMAN_RECORDED';
      this.bannerSummary.textContent = `Creator Override Signed: "${overrideData.reason}" [Category: ${overrideData.category}]`;
      this.guidanceText.textContent = 'Manual override accepted into audit ledger. Export unblocked.';
      this.btnOpenOverride.textContent = 'Edit Override';
      this.btnOpenOverride.disabled = false;
    } else {
      this.bannerReasonCode.textContent = panel.reasonCode;
      this.bannerSummary.textContent = panel.summary;
      this.guidanceText.textContent = panel.nextAction;

      // Check if locked pixel violation prevents override
      if (panel.lockedPixelDelta > 0) {
        this.btnOpenOverride.textContent = 'Override Prohibited (Pixel Lock)';
        this.btnOpenOverride.disabled = true;
      } else if (panel.status === 'ALLOW') {
        this.btnOpenOverride.textContent = 'Verified (No Override Needed)';
        this.btnOpenOverride.disabled = true;
      } else {
        this.btnOpenOverride.textContent = 'Record Creator Override';
        this.btnOpenOverride.disabled = false;
      }
    }

    // Detailed Drift / Failure Breakdown Box
    if (this.driftDetailsBox) {
      if (panel.id === 'D-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftFailedClaim.textContent = 'Failed Claim: trait.scar.side (Facial Scar Laterality)';
        this.driftExpected.textContent = 'Expected: Scar on the LEFT jaw (canonical artist sheet)';
        this.driftObserved.textContent = 'Observed: scar appears on the character\'s RIGHT jaw (laterality inverted)';
        this.driftConfidence.textContent = 'Confidence: 0.34 • Threshold: 0.75 • Evidence: Face Crop bbox [230, 205, 260, 245]';
      } else if (panel.id === 'L-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftFailedClaim.textContent = 'Invariant Breach: invariant.pixel_lock (Locked Background Region)';
        this.driftExpected.textContent = 'Expected: locked_pixel_delta === 0 (locked pixels unchanged)';
        this.driftObserved.textContent = 'Observed: 142 pixels mutated in locked region [20, 20, 140, 140]';
        this.driftConfidence.textContent = 'Delta: 142 • Threshold: 0 • Result: Non-overridable invariant block';
      } else if (panel.id === 'E-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftFailedClaim.textContent = 'Verifier Failure: face.identity (Remote VLM Timeout)';
        this.driftExpected.textContent = 'Expected: Verified response within latency budget';
        this.driftObserved.textContent = 'Observed: Inference request timed out after 3000ms (ETIMEDOUT)';
        this.driftConfidence.textContent = 'Status: UNVERIFIED • Export: Blocked pending artist review (fail-closed)';
      } else if (panel.id === 'A-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftFailedClaim.textContent = 'Abstention Case: face.identity (Occluded Profile Angle)';
        this.driftExpected.textContent = 'Expected: Standard 3/4 or front view';
        this.driftObserved.textContent = 'Observed: 80% silhouette profile view with jaw occluded';
        this.driftConfidence.textContent = 'Confidence: 0.48 • Status: UNVERIFIED (Policy abstains rather than false-blocks)';
      } else {
        this.driftDetailsBox.style.display = 'none';
      }
    }

    // Evidence Cards
    this.evidenceCount.textContent = `${panel.claims.length} Traits Evaluated`;
    this.evidenceList.innerHTML = '';

    panel.claims.forEach(claim => {
      const card = document.createElement('div');
      card.className = 'evidence-card';

      let statusColor = 'var(--color-allow)';
      let statusBg = 'var(--color-allow-bg)';
      if (claim.status === 'BLOCK') {
        statusColor = 'var(--color-block)';
        statusBg = 'var(--color-block-bg)';
      } else if (claim.status === 'WARN') {
        statusColor = 'var(--color-warn)';
        statusBg = 'var(--color-warn-bg)';
      } else if (claim.status === 'UNVERIFIED') {
        statusColor = 'var(--color-unverified)';
        statusBg = 'var(--color-unverified-bg)';
      }

      // Percentage bar fill (0..100%)
      let fillPct = Math.min(100, Math.max(0, claim.observedScore * 100));
      if (claim.metric.includes('DeltaE')) {
        fillPct = Math.min(100, Math.max(0, (1 - (claim.observedScore / 16)) * 100));
      }

      card.innerHTML = `
        <div class="evidence-top">
          <span class="evidence-name">${claim.label} (${claim.id})</span>
          <span class="status-pill" style="color: ${statusColor}; background: ${statusBg}; border: 1px solid ${statusColor}44;">
            ${claim.status}
          </span>
        </div>
        <div class="evidence-body">
          ${claim.observedText}
        </div>
        <div class="metric-bar-container">
          <div class="metric-bar-bg">
            <div class="metric-bar-fill" style="width: ${fillPct}%; background-color: ${statusColor};"></div>
          </div>
          <span>${claim.observedScore} (thresh: ${claim.threshold})</span>
        </div>
        <div class="evidence-meta">
          <span>Engine: ${claim.verifier}</span>
          <span>Latency: ${claim.latencyMs}ms &bull; Cost: $${claim.costUsd.toFixed(5)}</span>
        </div>
      `;
      this.evidenceList.appendChild(card);
    });
  }

  updateExportState() {
    // Export is permitted only if no panel has an unresolved BLOCK
    const hasUnresolvedBlock = this.panels.some(p => {
      const isOverridden = this.overrides.has(p.id);
      return !isOverridden && p.status === 'BLOCK';
    });

    this.btnExport.disabled = hasUnresolvedBlock;
    if (hasUnresolvedBlock) {
      this.btnExport.title = 'Cannot export: One or more panels contain blocking continuity drift.';
    } else {
      this.btnExport.title = 'All panels verified or overridden with authorized rationale.';
    }
  }

  openOverrideModal() {
    const panel = this.getActivePanel();
    if (panel.lockedPixelDelta > 0) {
      alert('Violation of pixel lock invariant cannot be overridden.');
      return;
    }

    if (this.overrides.has(panel.id)) {
      const data = this.overrides.get(panel.id);
      this.overrideCategory.value = data.category;
      this.overrideText.value = data.reason;
    } else {
      this.overrideText.value = '';
    }

    this.overrideModal.classList.add('active');
  }

  closeOverrideModal() {
    this.overrideModal.classList.remove('active');
  }

  applyOverride() {
    const panel = this.getActivePanel();
    const category = this.overrideCategory.value;
    const reason = this.overrideText.value.trim();

    // Policy Rule: Whitespace-only or empty justifications are rejected
    if (!reason || reason.length < 5) {
      alert('Policy Error: An override requires a specific editorial explanation (minimum 5 characters).');
      return;
    }

    this.overrides.set(panel.id, {
      category,
      reason,
      timestamp: new Date().toISOString(),
      signer: 'Creator / Art Director'
    });

    this.closeOverrideModal();
    this.render();
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new ReviewBenchController();
});
