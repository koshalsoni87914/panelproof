# PanelProof Release Freeze Runbook

1. Confirm the repository name, README, UI, and video all say **PanelProof** and **Track 04**.
2. Run the clean fixture, drifted fixture, verifier-error fixture, and locked-region fixture from a clean checkout.
3. Confirm no API key or private image is committed. Keep `.env.example` free of secrets.
4. Verify every public feature claim against `.work/shared/capability_ledger.md`.
5. Commit `drift_report.json`, example receipts, architecture diagram, and one evidence screenshot.
6. Record a demo using fixture replay first; use live models only where they are reliable and clearly labelled.
7. Show the red flag and fail-closed case. Do not hide uncertainty or silently convert errors to success.
8. Preserve commit history by capability. Do not make one giant final commit.
9. Run the README setup instructions from a clean environment.
10. Freeze the demo only after the fallback path has been rehearsed.
