# PanelProof Git Synchronization Runbook (Pull Before Push)

Every collaborator and agent must maintain branch synchronization before pushing to avoid non-fast-forward rejections, merge bubbles, or overwritten verification evidence.

## Rule Statement

No commit may be pushed to `main` (or any shared integration branch) without pulling the latest remote commits first:
```bash
git pull --rebase origin main
```

## Mandatory Setup

Run the following commands in the local clone to enforce rebase on pull and enable the pre-push safety hook:

```bash
# 1. Configure git pull to always rebase instead of creating merge commits
git config pull.rebase true

# 2. Point git hooks to the repository-tracked .githooks directory
git config core.hooksPath .githooks
```

## Automated Pre-Push Protection

A pre-push hook is installed at `.githooks/pre-push`. Every time `git push` is invoked:
1. It fetches remote references (`git fetch origin`).
2. It detects whether the local branch is behind the remote tracking branch.
3. If behind, it automatically runs `git pull --rebase origin <branch>`.
4. If rebasing brings in changes or conflicts, it halts the push and prompts you to verify tests before pushing.

## Conflict Resolution

If a conflict occurs during `git pull --rebase`:
1. Inspect the conflicting files with `git status`.
2. Resolve conflicts while preserving the evidence and contracts in `.brain`.
3. Continue rebase:
   ```bash
   git add <resolved-files>
   git rebase --continue
   ```
4. Re-run local verification tests before attempting `git push` again.
