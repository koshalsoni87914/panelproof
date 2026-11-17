# PanelProof Demo Freeze Runbook

## Freeze package

Freeze the exact commit, lockfile, fixture corpus, manifest, thresholds, report, screenshots, architecture diagram, README commands, and video script. Tag the pre-event baseline and the final release candidate separately.

## Primary demo

Load a reference pack and manifest, show a known-good panel, select a known-bad panel with one intentional continuity break, show the evidence card and fail-closed decision, then show the report metadata and a corrected fixture only if correction is genuinely implemented. End with the live-built extension and the capability ledger.

## Rehearsal

Run twice from a clean state. Measure time. Confirm no loading state obscures the key proof. Verify the same fixture produces the same decision. Kill or disable the network once and rehearse the fallback.

## Failure behavior

A live model timeout is shown as `TIMEOUT` or `UNVERIFIED`, not a fake pass. If the UI fails, run the exact CLI/fixture fallback and say that it is fixture replay. If a live repair is not implemented, show the designed trace or a committed fixture and label it clearly.

## No-change rule

After demo freeze, only defect fixes that preserve the contracts may merge. Any change requires a new rehearsal and updated evidence. Do not add a new model, screen, or feature because it looks impressive at the last minute.
