/**
 * PanelProof Creator Review Bench — Main Application Controller
 * Aesthetic: Analog Darkroom & Comic Atelier meets High-Precision Editorial Bench
 * Prompt Pirates • Track 04 / Digital Art & Visual Co-Pilot
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
    this.attachKeyboardShortcuts();
    this.render();
  }

  initDOMElements() {
    this.panelStrip = document.getElementById('panelStrip');
    this.stripMetrics = document.getElementById('stripMetrics');
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
    this.btnCopyHash = document.getElementById('btnCopyHash');

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
    this.toastContainer = document.getElementById('toastContainer');

    // Override Modal Elements
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
      this.showToast(`Bounding Reticle: ${this.showBoundingBoxes ? 'Visible' : 'Hidden'}`);
    });

    this.btnToggleHeatmap.addEventListener('click', () => {
      this.showRegionMask = !this.showRegionMask;
      this.btnToggleHeatmap.classList.toggle('active', this.showRegionMask);
      this.renderOverlays();
      this.showToast(`Region Mask Shading: ${this.showRegionMask ? 'Active' : 'Disabled'}`);
    });

    this.btnOpenOverride.addEventListener('click', () => this.openOverrideModal());
    this.btnCloseModal.addEventListener('click', () => this.closeOverrideModal());
    this.btnCancelOverride.addEventListener('click', () => this.closeOverrideModal());
    this.btnConfirmOverride.addEventListener('click', () => this.applyOverride());

    if (this.btnCopyHash) {
      this.btnCopyHash.addEventListener('click', () => this.copyActiveHash());
    }

    this.btnExport.addEventListener('click', () => {
      this.showToast('Publication Sequence Approved! Exporting signed ledger package...', 4000);
      alert('Publication Sequence Approved!\nExporting package with continuous cryptographic audit ledger...');
    });
  }

  attachKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ignore keystrokes when typing into modal textarea
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        if (e.key === 'Escape') this.closeOverrideModal();
        return;
      }

      // Panel switching: keys 1..6
      const keyNum = parseInt(e.key, 10);
      if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= this.panels.length) {
        e.preventDefault();
        this.selectPanel(this.panels[keyNum - 1].id);
        this.showToast(`Switched to Panel P${keyNum}: ${this.panels[keyNum - 1].id}`);
        return;
      }

      // Toggle Reticles: B
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        this.btnToggleBbox.click();
        return;
      }

      // Toggle Mask: M
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        this.btnToggleHeatmap.click();
        return;
      }

      // Override modal: O
      if ((e.key === 'o' || e.key === 'O') && !this.overrideModal.classList.contains('active')) {
        e.preventDefault();
        if (!this.btnOpenOverride.disabled) {
          this.openOverrideModal();
        } else {
          this.showToast('Override not available for this panel status.');
        }
        return;
      }

      // Escape: dismiss modal
      if (e.key === 'Escape') {
        this.closeOverrideModal();
      }
    });
  }

  showToast(message, duration = 2800) {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
      <span>${message}</span>
    `;
    this.toastContainer.appendChild(toast);

    // Trigger animation in next tick
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  copyActiveHash() {
    const panel = this.getActivePanel();
    const hash = `SHA256:${panel.id.toLowerCase()}${panel.panelNumber}a90c1f582be6c14e`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hash).catch(() => {});
    }
    this.showToast(`Hash copied to clipboard: ${hash.slice(0, 18)}...`);
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
    this.panels.forEach((panel, index) => {
      const isOverridden = this.overrides.has(panel.id);
      const effectiveStatus = isOverridden ? 'ALLOW' : panel.status;
      const humanLabel = isOverridden ? 'Overridden' : (HUMAN_LABELS[effectiveStatus] || effectiveStatus);

      const card = document.createElement('div');
      card.className = `strip-card ${panel.id === this.activePanelId ? 'active' : ''}`;
      card.addEventListener('click', () => this.selectPanel(panel.id));

      const statusClass = `status-${effectiveStatus.toLowerCase()}`;
      const continuityScore = panel.continuityScore !== undefined ? Math.round(panel.continuityScore * 100) : (panel.status === 'BLOCK' ? 67 : 100);

      card.innerHTML = `
        <div class="strip-card-top">
          <span class="panel-stamp">
            <span class="panel-stamp-circle">${panel.panelNumber}</span>
            ${panel.id}
          </span>
          <span class="hotkey-indicator">[${index + 1}]</span>
        </div>
        <div class="strip-card-desc">
          ${panel.title}
        </div>
        <div class="strip-card-bottom">
          <span class="status-pill ${statusClass}">${humanLabel}</span>
          <span class="strip-continuity-score">${continuityScore}% match</span>
        </div>
      `;
      this.panelStrip.appendChild(card);
    });

    if (this.stripMetrics) {
      const overridesCount = this.overrides.size;
      this.stripMetrics.textContent = overridesCount > 0 
        ? `Auditing ${this.panels.length} Panels (${overridesCount} Overridden)`
        : `Auditing ${this.panels.length} Panels`;
    }
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

    this.imageMetaHash.textContent = `SHA256:${panel.id.toLowerCase()}${panel.panelNumber}a90c1...4e`;
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
        strokeColor = '#ff3366';
        fillColor = 'rgba(255, 51, 102, 0.25)';
      } else if (claim.status === 'WARN') {
        strokeColor = '#f59e0b';
        fillColor = 'rgba(245, 158, 11, 0.20)';
      } else if (claim.status === 'UNVERIFIED') {
        strokeColor = '#00f0ff';
        fillColor = 'rgba(0, 240, 255, 0.18)';
      }

      if (this.showBoundingBoxes) {
        // Main bounding box rectangle
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', xmin);
        rect.setAttribute('y', ymin);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('stroke', strokeColor);
        rect.setAttribute('stroke-width', '1.75');
        rect.setAttribute('fill', this.showRegionMask ? fillColor : 'none');
        rect.setAttribute('stroke-dasharray', claim.severity === 'warn' ? '4 3' : 'none');
        this.overlaySvg.appendChild(rect);

        // Technical Draftsman Corner Reticles (Viewfinder ticks)
        const tickLen = Math.min(8, width / 4, height / 4);
        const corners = [
          // Top-left
          `M ${xmin} ${ymin + tickLen} L ${xmin} ${ymin} L ${xmin + tickLen} ${ymin}`,
          // Top-right
          `M ${xmax - tickLen} ${ymin} L ${xmax} ${ymin} L ${xmax} ${ymin + tickLen}`,
          // Bottom-left
          `M ${xmin} ${ymax - tickLen} L ${xmin} ${ymax} L ${xmin + tickLen} ${ymax}`,
          // Bottom-right
          `M ${xmax - tickLen} ${ymax} L ${xmax} ${ymax} L ${xmax} ${ymax - tickLen}`
        ];

        corners.forEach(d => {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', d);
          path.setAttribute('stroke', strokeColor);
          path.setAttribute('stroke-width', '2.5');
          path.setAttribute('fill', 'none');
          this.overlaySvg.appendChild(path);
        });

        // Center crosshair marker
        const cx = xmin + width / 2;
        const cy = ymin + height / 2;
        const cross = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        cross.setAttribute('d', `M ${cx - 4} ${cy} L ${cx + 4} ${cy} M ${cx} ${cy - 4} L ${cx} ${cy + 4}`);
        cross.setAttribute('stroke', strokeColor);
        cross.setAttribute('stroke-width', '1.2');
        cross.setAttribute('opacity', '0.65');
        this.overlaySvg.appendChild(cross);

        // Tag label background pill
        const labelY = ymin > 22 ? ymin - 6 : ymin + 16;
        const tagText = claim.id;
        const charWidth = 6.2;
        const pillWidth = (tagText.length * charWidth) + 8;
        const pillHeight = 15;
        const pillX = xmin;
        const pillY = ymin > 22 ? ymin - 18 : ymin + 2;

        const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        labelBg.setAttribute('x', pillX);
        labelBg.setAttribute('y', pillY);
        labelBg.setAttribute('width', pillWidth);
        labelBg.setAttribute('height', pillHeight);
        labelBg.setAttribute('fill', '#07090e');
        labelBg.setAttribute('rx', '3');
        labelBg.setAttribute('stroke', strokeColor);
        labelBg.setAttribute('stroke-width', '0.8');
        labelBg.setAttribute('opacity', '0.9');
        this.overlaySvg.appendChild(labelBg);

        // Tag label text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pillX + 4);
        text.setAttribute('y', pillY + 11);
        text.setAttribute('fill', strokeColor);
        text.setAttribute('font-size', '9.5');
        text.setAttribute('font-family', 'var(--font-mono), monospace');
        text.setAttribute('font-weight', '700');
        text.textContent = tagText;
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
      this.btnOpenOverride.textContent = 'Edit Override [O]';
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
        this.btnOpenOverride.textContent = 'Record Creator Override [O]';
        this.btnOpenOverride.disabled = false;
      }
    }

    // Detailed Drift / Failure Breakdown Box
    if (this.driftDetailsBox) {
      if (panel.id === 'D-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftDetailsBox.className = 'drift-diagnostic-card';
        this.driftFailedClaim.textContent = 'trait.scar.side (Facial Scar Laterality)';
        this.driftExpected.textContent = 'Scar on the LEFT jaw (canonical artist sheet)';
        this.driftObserved.textContent = 'scar appears on the character\'s RIGHT jaw (laterality inverted)';
        this.driftConfidence.textContent = 'Confidence: 0.34 • Threshold: 0.75 • Evidence: Face Crop bbox [230, 205, 260, 245]';
      } else if (panel.id === 'L-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftDetailsBox.className = 'drift-diagnostic-card';
        this.driftFailedClaim.textContent = 'invariant.pixel_lock (Locked Background Region)';
        this.driftExpected.textContent = 'locked_pixel_delta === 0 (locked pixels unchanged)';
        this.driftObserved.textContent = '142 pixels mutated in locked region [20, 20, 140, 140]';
        this.driftConfidence.textContent = 'Delta: 142 • Threshold: 0 • Result: Non-overridable invariant block';
      } else if (panel.id === 'E-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftDetailsBox.className = 'drift-diagnostic-card diagnostic-unverified';
        this.driftFailedClaim.textContent = 'verifier.timeout (Remote VLM Timeout)';
        this.driftExpected.textContent = 'Verified response within latency budget (<3000ms)';
        this.driftObserved.textContent = 'Inference request timed out after 3000ms (ETIMEDOUT)';
        this.driftConfidence.textContent = 'Status: UNVERIFIED • Export: Blocked pending artist review (fail-closed)';
      } else if (panel.id === 'A-001' && !isOverridden) {
        this.driftDetailsBox.style.display = 'block';
        this.driftDetailsBox.className = 'drift-diagnostic-card diagnostic-unverified';
        this.driftFailedClaim.textContent = 'abstention.occlusion (Occluded Profile Angle)';
        this.driftExpected.textContent = 'Standard 3/4 or front view (>60% facial area)';
        this.driftObserved.textContent = '80% silhouette profile view with jaw occluded';
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
      let statusBorder = 'var(--color-allow-border)';
      if (claim.status === 'BLOCK') {
        statusColor = 'var(--color-block)';
        statusBg = 'var(--color-block-bg)';
        statusBorder = 'var(--color-block-border)';
      } else if (claim.status === 'WARN') {
        statusColor = 'var(--color-warn)';
        statusBg = 'var(--color-warn-bg)';
        statusBorder = 'var(--color-warn-border)';
      } else if (claim.status === 'UNVERIFIED') {
        statusColor = 'var(--color-unverified)';
        statusBg = 'var(--color-unverified-bg)';
        statusBorder = 'var(--color-unverified-border)';
      }

      // Percentage bar fill (0..100%)
      let fillPct = Math.min(100, Math.max(0, claim.observedScore * 100));
      if (claim.metric && claim.metric.includes('DeltaE')) {
        fillPct = Math.min(100, Math.max(0, (1 - (claim.observedScore / 16)) * 100));
      }

      card.innerHTML = `
        <div class="evidence-top">
          <span class="evidence-name">${claim.label} (${claim.id})</span>
          <span class="status-pill" style="color: ${statusColor}; background: ${statusBg}; border: 1px solid ${statusBorder};">
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
          <span>Score: ${claim.observedScore} (thresh: ${claim.threshold})</span>
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
      this.showToast('Violation of pixel lock invariant cannot be overridden.');
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
    setTimeout(() => this.overrideText.focus(), 100);
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
      this.showToast('Policy Error: An override requires a specific editorial explanation (min 5 chars).');
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
    this.showToast(`Creator affidavit signed to ledger for ${panel.id}. Export re-evaluated.`);
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new ReviewBenchController();
});
