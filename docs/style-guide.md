# Style guide

Canonical writing and coding style for TecKnoNerd products.  
Host repos may add product-specific exceptions; they should not reverse these without reason.

---

## Voice & prose (docs, PRs, UI copy)

| Do | Don’t |
| -- | ----- |
| Precise, complete sentences | Filler (“leverage synergies”, “robust solutioning”) |
| Active voice, imperative commits | Vague “updates” / “fixes stuff” |
| Name the system under change | Assume the reader knows the monorepo |
| Prefer tables for enums & matrices | Walls of unstructured bullets |
| Light nerd humor when it clarifies | Sarcasm at the user’s expense |

**UI copy:** short labels, clear empty states, never blame the user for system errors.

---

## TypeScript / JavaScript

### Language

- Target **ES2022+**, Node **20/22** for backends.
- **Strict** TypeScript: `strict`, prefer `noUncheckedIndexedAccess` in libraries.
- Prefer **ESM** (`"type": "module"`, `NodeNext` / bundler resolution as host dictates).
- Explicit return types on **exported** functions and handlers.
- `import type` for type-only imports (ESLint enforced where config is adopted).

### Structure

```text
handlers/   → thin HTTP / event entrypoints
services/   → business logic
domain/     → types + pure domain errors
lib/        → shared infra helpers (auth, dynamo, response, logger)
```

### Anti-patterns

- Fat handlers with Dynamo queries inline
- `any` without a one-line justification
- `console.log` in production paths (allow `warn` / `error`)
- Silent catch blocks

### Formatting

- **Prettier** is law — no hand-formatted bikesheds.
- Use shared config: `configs/prettier/.prettierrc.json`.
- Run `pnpm format` before push.

---

## Python (auxiliaries only by default)

- Python **3.12+**, **uv** for env/lock.
- **Ruff** + **mypy strict** + **pytest**.
- Keep Python for specialized work (PDF, ML, heavy numeric) — not a second full API surface unless product requires it.

Config seed: `configs/ruff/ruff.toml`.

---

## React / Next (hosted UI)

- TypeScript only.
- Prefer **App Router**; static export when hosting is S3+CloudFront.
- Client components only where needed (`"use client"`).
- No secrets in `NEXT_PUBLIC_*` beyond non-sensitive public IDs.
- Portal vs marketing: separate URL paths or products; one CloudFront is fine for cost.

**Visual system:** follow [`ui-style-guide.md`](./ui-style-guide.md) and [`ui-patterns.md`](./ui-patterns.md)  
(reference product: [sign-vault](https://github.com/TecKnoNerd/sign-vault)). Token seed: `configs/ui/tokens.css`.

---

## Markdown

- Prefer GitHub-flavored markdown.
- Tables for options, matrices, status.
- Relative links within repos.
- Code fences with language tags.

---

## OpenTofu / Terraform

- Modules under `infra/modules/`; env roots thin.
- Tags: `Project`, `Environment`, `ManagedBy`, `CostCenter` (or host equivalent).
- Name resources with stable prefixes: `{project}-{env}-…`.
- Document idle cost for any new always-on resource.

---

## Comments

- Explain **why**, not **what** the next line does.
- Delete stale comments that contradict code (they are bugs).
- No commented-out dead code in mainline.

---

## See also

- [architecture.md](./architecture.md)
- [naming.md](./naming.md)
- [git-workflow.md](./git-workflow.md)
