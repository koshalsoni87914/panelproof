# PanelProof — Build Now

The uploaded ZIP contains the product design package but no runnable application source. Start implementation with the smallest proof, not another planning pass.

## First executable milestone

Create a local fixture runner that:

1. Loads `claims.karan.json`.
2. Loads one clean, one drifted, and one verifier-error fixture.
3. Runs deterministic verdict aggregation.
4. Writes NDJSON receipts.
5. Prints a creator-friendly summary.

## Then add

- Evidence crop metadata and a minimal review screen.
- Region Lock compositing and the pixel-delta assertion.
- Tests for `BLOCK > UNVERIFIED > WARN > ACCEPT`.
- An offline demo command.
- Only after those pass: live vision adapters, repair, and sequence mode.

## Definition of done for the first commit

A clean clone can run one command and visibly demonstrate `ACCEPT`, `BLOCK`, `UNVERIFIED`, and `locked_pixel_delta = 0` without an external API.
