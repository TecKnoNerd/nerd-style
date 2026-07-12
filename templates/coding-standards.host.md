# Coding standards — {{PROJECT_NAME}}

Shared baseline: [nerd-style](https://github.com/TecKnoNerd/nerd-style).  
This file records **product-specific** standards only.

## Language strategy

| Area | Language | Notes |
| ---- | -------- | ----- |
| Backend | TypeScript | |
| Aux | Python | Only when needed |
| Frontend | TypeScript / React | |
| IaC | OpenTofu | |

## Pre-push (mandatory)

```powershell
pnpm format
pnpm lint
```

See nerd-style `docs/git-workflow.md`.

## Product exceptions

- {{EXCEPTIONS}}
