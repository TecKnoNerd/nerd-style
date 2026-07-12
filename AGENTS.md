# Agent instructions — nerd-style (shared)

Drop-in / importable instructions for coding agents (Grok, Claude, Copilot, Cursor, etc.) on **any** TecKnoNerd project that adopts [nerd-style](https://github.com/TecKnoNerd/nerd-style).

Product-specific rules (SPECs, stack, cost deferrals) live in the **host repo**. This file is the **shared culture**.

---

## Always do

1. **Read host `AGENTS.md` + constitution/SPECs first** (product wins on domain conflicts).
2. **Apply nerd-style docs** when host is silent:
   - Style: `docs/style-guide.md`
   - Architecture: `docs/architecture.md`
   - API: `docs/api-design.md`
   - Security: `docs/security.md`
   - Testing: `docs/testing.md`
   - Naming: `docs/naming.md`
3. **Prefer existing patterns** in the host monorepo over inventing parallel ones.
4. **Last step before every commit / push (mandatory)**

   ```powershell
   pnpm format
   pnpm lint
   # Prefer full gate when practical:
   pnpm check
   ```

   Do **not** push if `format:check` or `lint` fails.  
   If host uses different package manager, use the host’s equivalent scripts.

### Do not

- Commit secrets, `.env`, private keys, or live credentials
- Introduce always-on / high idle-cost infra without explicit user approval
- Bypass tenant isolation, auth, or audit requirements
- Leave TODOs for “format later” or “lint later”
- Invent public API shapes without updating OpenAPI/contracts when the host has them

---

## Architecture defaults (unless host overrides)

| Preference | Default |
| ---------- | ------- |
| Compute | Serverless (Lambda / equivalent) |
| API | HTTP REST, JSON, explicit error shape |
| Data | On-demand DynamoDB / pay-per-use stores |
| Auth | JWT (Cognito or equivalent) on private routes |
| Frontend | TypeScript; static export when possible |
| IaC | OpenTofu / Terraform modules, tagged resources |
| Logging | Structured; **WARN** default in prod |

Details: `docs/architecture.md`.

---

## Code quality bar

| Area | Rule |
| ---- | ---- |
| TypeScript | `strict`; prefer type imports; no unused vars (`_` prefix ok) |
| Handlers | Thin — validation + auth + service call + response |
| Errors | Stable `error` codes + human `message` + optional `details` |
| Tests | Unit for domain; integration for lifecycle when env available |
| Commits | Conventional, imperative subject; small diffs |

---

## Pre-push ritual (print this on your pocket protector)

```text
[ ] Implementation complete
[ ] Host SPECs/docs updated if behavior changed
[ ] pnpm format
[ ] pnpm lint
[ ] pnpm check (when feasible)
[ ] git status clean of secrets
[ ] commit + push
```

---

## Host integration

Product repos SHOULD:

1. Submodule or vendor this repo as `.nerd-style/`
2. Extend (not fork blindly) ESLint/Prettier configs from `configs/`
3. Link from host `AGENTS.md` and `docs/coding-standards.md`

See `templates/` for starter files.
