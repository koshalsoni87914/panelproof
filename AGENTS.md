# PanelProof Worker Rules

## Shared rules

The `.brain` directory is the project source of truth. Read the relevant contract, phase register, claims register, capability ledger, and threat model before changing implementation. Every change must state the phase, owner, acceptance command, evidence path, and capability status.

Do not rewrite history to obscure the pre-built/live-built split. Preserve commit timestamps and disclose reused code, templates, models, datasets, prompts, and assets. No worker may declare a capability `RELEASED` without an executable artifact or reproducible fixture proof.

**Pull before push:** Every worker must synchronize with the remote (`git pull --rebase origin main`) and run local verification before pushing any commit. Out-of-order pushes and merge race conditions are strictly prohibited.

## Exclusive domains

**Worker 1 — Platform/runtime:** `apps/`, `packages/contracts/`, `runtime/`, `adapters/`, `scripts/`, runtime fixtures, manifests/lockfiles, and integration plumbing.

**Worker 2 — Continuity/policy:** `policy/`, `analysis/`, `corpus/`, continuity fixtures, evaluation, thresholds, reason codes, and policy documentation.

**Worker 3 — Assurance/narrative:** `web/`, `docs/`, `.brain/`, `.github/`, release assets, README, demo, pitch, and submission materials.

## Boundary gate

Before editing another worker’s exclusive domain, write a handoff note naming the exact paths, reason, expected change, and receiving reviewer. The owner must acknowledge before the edit. Emergency defect fixes still require a follow-up handoff and test result.

## Handoff format

```md
Phase:
Owner:
Receiving reviewer:
Changed paths:
Contract/version:
Acceptance command:
Expected result:
Known limitation:
Capability status:
```

## Freeze rule

After demo freeze, only contract-preserving defect fixes are allowed. A new feature requires a new decision-log entry, risk note, acceptance test, and complete demo rehearsal.
