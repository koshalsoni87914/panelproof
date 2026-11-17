# PanelProof Interface Contracts

## Claim

```json
{
  "schema": "panelproof/claims@1",
  "subject": {"id": "karan", "displayName": "Karan", "refs": ["refs/karan-01.png"]},
  "claims": [
    {"id":"face.identity","kind":"identity","severity":"block","expect":{"minCosine":0.82},"source":"artist-declared"},
    {"id":"trait.scar.side","kind":"attribute","severity":"block","expect":{"question":"Is the scar on the character's left jaw?","minConfidence":0.75},"source":"artist-declared"},
    {"id":"outfit.coat","kind":"attribute","severity":"warn","expect":{"question":"Navy coat with brass buttons?","minConfidence":0.70},"source":"artist-declared"}
  ]
}
```

`source` is `artist-declared` or `model-inferred`. Model-inferred claims may warn but may not block.

## Verdict

```json
{"panel":"p04","claim":"trait.scar.side","verdict":"BLOCK","verifier":"fixture/v1","confidence":0.34,"threshold":0.75,"observed":"scar appears on RIGHT jaw","evidence":{"crop":"evidence/p04-face.png","bbox":[412,180,596,352]},"latencyMs":12,"costUsd":0,"nodeId":"p04_v1","ts":"2026-11-17T00:00:00Z"}
```

## Receipt

```json
{"panel":"p04","decision":"BLOCK","worstOf":["ACCEPT","ACCEPT","BLOCK","WARN"],"blockingClaims":["trait.scar.side"],"continuity":0.71,"repair":{"attempted":0,"maxAttempts":2},"failClosed":true}
```

## Aggregation

`worstAction()` ordering is `BLOCK > UNVERIFIED > WARN > ACCEPT`. Sequence status is the worst panel status. An override requires a non-empty reason and is stored separately from the machine verdict.

## Region lock invariant

After any edit, the server composites locked pixels from the parent node and asserts `locked_pixel_delta == 0`. A failed assertion rejects the edit result rather than silently exporting it.
