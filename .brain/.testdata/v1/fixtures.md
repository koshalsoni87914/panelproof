# PanelProof Fixture Set v1

## Fixture C-001 — clean-panel

- Subject: Karan
- Expected claims: identity `ACCEPT`, scar-side `ACCEPT`, coat `WARN` or `ACCEPT`, palette `ACCEPT`
- Expected panel decision: not `BLOCK`

## Fixture D-001 — drifted-scar

- Subject: Karan
- Corruption: scar moved from left jaw to right jaw
- Expected claim: `trait.scar.side` → `BLOCK`
- Required evidence: face crop, observed side, confidence below threshold
- Expected panel decision: `BLOCK`

## Fixture E-001 — verifier-unavailable

- Subject: Karan
- Corruption: verifier adapter returns timeout/ambiguous response
- Expected claim: `UNVERIFIED`
- Expected panel decision: `UNVERIFIED`
- Export: blocked unless a human override reason is supplied

## Fixture L-001 — locked-face-edit

- Parent image: clean-panel
- Edit: costume/background change with face region locked
- Expected invariant: `locked_pixel_delta == 0`
- Expected result: child node exists; parent remains unchanged

## Fixture rules

Fixtures are teaching and evaluation data, not proof that a live image model is correct. Each fixture must contain expected verdicts, not only input images, so a clean clone can run the policy offline.
