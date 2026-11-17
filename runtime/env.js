'use strict';

const fs = require('fs');
const path = require('path');

const MIN_NODE_MAJOR = 20;
const REQUIRED_DIRS = [
  '.brain',
  '.brain/.testdata/v1',
  'packages/contracts',
  'runtime',
  'adapters'
];

/**
 * Validates the runtime environment according to W1-P1 requirements.
 * @param {string} [rootDir]
 * @returns {object} { ok: boolean, nodeVersion: string, checks: Array, errors: Array }
 */
function checkEnvironment(rootDir = process.cwd()) {
  const checks = [];
  const errors = [];

  // 1. Check Node.js version
  const currentVersion = process.version;
  const major = parseInt(currentVersion.replace(/^v/, '').split('.')[0], 10);
  if (major >= MIN_NODE_MAJOR) {
    checks.push({ name: 'Node.js Version', status: 'PASS', detail: `${currentVersion} (>= v${MIN_NODE_MAJOR}.0.0)` });
  } else {
    const msg = `Node.js version ${currentVersion} is below required minimum v${MIN_NODE_MAJOR}.0.0`;
    errors.push(msg);
    checks.push({ name: 'Node.js Version', status: 'FAIL', detail: msg });
  }

  // 2. Check Required Directories
  for (const relDir of REQUIRED_DIRS) {
    const fullPath = path.resolve(rootDir, relDir);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      checks.push({ name: `Directory: ${relDir}`, status: 'PASS' });
    } else {
      const msg = `Required directory missing: ${relDir}`;
      errors.push(msg);
      checks.push({ name: `Directory: ${relDir}`, status: 'FAIL', detail: msg });
    }
  }

  // 3. Check Baseline Claims Fixture
  const claimsPath = path.resolve(rootDir, '.brain/.testdata/v1/claims.karan.example.json');
  if (fs.existsSync(claimsPath)) {
    checks.push({ name: 'Baseline claims.karan.example.json', status: 'PASS' });
  } else {
    const msg = 'Missing baseline claims fixture (.brain/.testdata/v1/claims.karan.example.json)';
    errors.push(msg);
    checks.push({ name: 'Baseline claims fixture', status: 'FAIL', detail: msg });
  }

  return {
    ok: errors.length === 0,
    nodeVersion: currentVersion,
    checks,
    errors
  };
}

module.exports = {
  MIN_NODE_MAJOR,
  checkEnvironment
};
