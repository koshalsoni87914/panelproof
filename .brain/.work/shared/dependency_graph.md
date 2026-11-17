# PanelProof Dependency Graph

```text
W3-P0 claims/threat freeze
   ├──> W1-P0 runtime contracts
   └──> W2-P0 continuity manifest
W1-P1 reproducible foundation
   ├──> W1-P2 adapters
   └──> W3-P1 review bench shell
W2-P1 evidence ledger
   ├──> W1-P3 receipt/report runtime
   └──> W3-P1 evidence cards
W2-P2 policy engine <── W1-P2 evidence adapters
   ├──> W3-P2 QA matrix
   └──> W1-P4 end-to-end integration
W2-P3 corpus/calibration
   └──> W3-P3 claims and capability wording
W1-P4 vertical slice + W3-P1 UI + W2-P2 policy
   └──> W3-P4 demo lock
W1-P5 live extension + W2-P5 policy extension
   └──> W3-P5 release submission
```

## Critical path

Contracts → fixture runner → policy semantics → one evidence adapter → end-to-end report → creator UI → adversarial corpus → demo freeze. Do not start multi-model generation or sequence mode before the critical path is green.

## Integration rule

A dependency is “ready” only when its owner supplies the version, changed paths, acceptance command, expected output, failure behavior, and known limitation. The receiving worker must run that command and record the result.
