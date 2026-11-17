'use strict';

/**
 * PanelProof Local Demo Server & Review Experience Launcher
 * Runs the offline fixture audit and serves the Creator Review Bench UI.
 * Zero external dependencies.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ndjson': 'application/x-ndjson; charset=utf-8'
};

// 1. Verify Environment
const nodeVersion = process.versions.node;
const majorVersion = parseInt(nodeVersion.split('.')[0], 10);
if (majorVersion < 20) {
  console.error(`[PanelProof Error] Node.js 20.0.0 or higher is required. Found: v${nodeVersion}`);
  process.exit(1);
}

// 2. Run Deterministic Fixture Audit
console.log('==> [1/3] Running deterministic fixture audit...');
try {
  execSync('node scripts/run-fixture-audit.js', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
} catch (err) {
  console.error('[PanelProof Error] Fixture audit failed:', err.message);
  process.exit(1);
}

// 3. Prepare HTTP Server
const webDir = path.join(projectRoot, 'web');
const reportPath = path.join(projectRoot, '.brain', '.report', 'fixture_run_audit_report.json');

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // API Endpoint: latest audit report
  if (urlPath === '/api/audit-report') {
    if (fs.existsSync(reportPath)) {
      const content = fs.readFileSync(reportPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(content);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Audit report not generated yet' }));
    }
    return;
  }

  // Static File Serving
  let relativeFilePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
  const filePath = path.join(webDir, relativeFilePath);

  // Security: Prevent path traversal
  if (!filePath.startsWith(webDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const isCheckOnly = process.argv.includes('--check') || process.argv.includes('--dry-run');
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log('\n╔═══════════════════════════════════════════════════════════════════════╗');
  console.log('║                   PANELPROOF CREATOR REVIEW BENCH                     ║');
  console.log('║               Track 04 / Digital Art & Visual Co-Pilot                ║');
  console.log('║                     Team: Prompt Pirates                              ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════╝');
  console.log(`\n  Local Demo URL: ${url}`);
  console.log('  Mode: OFFLINE / FIXTURE EVALUATION MODE (50% Pre-Built Foundation)');
  console.log('  Interactive Panels Available:');
  console.log('    • C-001 (Panel 1): Clean Panel (Kept - ACCEPT)');
  console.log('    • D-001 (Panel 2): Drifted Scar Laterality (Broke canon - BLOCK)');
  console.log('    • L-001 (Panel 3): Locked Region Background Invariant (Broke canon - BLOCK)');
  console.log('    • E-001 (Panel 4): Verifier Timeout / Network Error (Needs your call - UNVERIFIED)');
  console.log('    • A-001 (Panel 5): Occluded Profile Angle (Needs your call - UNVERIFIED)');
  console.log('    • I-001 (Panel 6): Model-Inferred Accessory Deviation (Check this - WARN)');
  console.log('\n  Press Ctrl+C to terminate the local review server.\n');

  if (isCheckOnly) {
    console.log('==> [Dry-run] Server started and verified successfully. Exiting.');
    server.close(() => process.exit(0));
  }
});
