# Handoff Note — Subdirectory ESM Scoping Emergency Defect Fix

**Phase:** W3-P2 / W2-P2 Integration  
**Owner:** Worker 03 (Assurance Lead)  
**Receiving reviewer:** Worker 01 (Platform/Runtime) & Worker 02 (Continuity/Policy)  
**Changed paths:** `policy/package.json`, `eval/package.json`, `web/package.json`  
**Contract/version:** `node:modules@1`  
**Acceptance command:** `npm test && node --test policy/tests/test_policy.js && node eval/runner.js && node --test web/tests/test_qa_assurance.js`  
**Expected result:** All CommonJS scripts in Worker 1 (`scripts/`, `runtime/`) run under root `"type": "commonjs"`, while all ES modules in Worker 2 (`policy/`, `eval/`) and Worker 3 (`web/`) resolve correctly with zero syntax errors. All 38+ tests across all domains pass.  
**Known limitation:** Dual CJS/ESM module environment; root remains CommonJS for runtime fixtures, while policy and UI run native ESM.  
**Capability status:** `VERIFIED`  
