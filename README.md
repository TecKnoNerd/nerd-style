# nerd-style

**Shared style, architecture, and agent conventions for TecKnoNerd projects.**  
*100% pocket-protector. Zero cargo-cult. Measure twice, `pnpm format` once.*

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](./LICENSE)

This repository is the **single source of shareable engineering culture** used across products (e.g. Sign Vault, future services). Copy configs, link docs, or point coding agents at `AGENTS.md`.

---

## What’s inside

| Path | Purpose |
| ---- | ------- |
| [`docs/style-guide.md`](./docs/style-guide.md) | Language, naming, formatting, prose |
| [`docs/architecture.md`](./docs/architecture.md) | System design rules (serverless, multi-tenant, cost) |
| [`docs/api-design.md`](./docs/api-design.md) | HTTP/API contracts & error shapes |
| [`docs/security.md`](./docs/security.md) | Auth, secrets, isolation, threat defaults |
| [`docs/testing.md`](./docs/testing.md) | Unit, integration, coverage gates |
| [`docs/git-workflow.md`](./docs/git-workflow.md) | Commits, PRs, **mandatory pre-push format+lint** |
| [`docs/naming.md`](./docs/naming.md) | Files, IDs, env vars, AWS resources |
| [`docs/agent-playbook.md`](./docs/agent-playbook.md) | How coding agents must operate |
| [`AGENTS.md`](./AGENTS.md) | Drop-in agent instructions (import into product repos) |
| [`configs/`](./configs/) | Prettier, ESLint, EditorConfig, TS base, Ruff |
| [`templates/`](./templates/) | Boilerplate for new repos |
| [`pocket-protector/`](./pocket-protector/) | Manifesto, checklists, glossary |

---

## Quick adopt (new or existing repo)

### 1. Submodule (recommended for living updates)

```powershell
git submodule add https://github.com/TecKnoNerd/nerd-style.git .nerd-style
git submodule update --init --recursive
```

Symlink or copy configs (Windows-friendly copy):

```powershell
Copy-Item .nerd-style/configs/prettier/.prettierrc.json .
Copy-Item .nerd-style/configs/prettier/.prettierignore .
Copy-Item .nerd-style/configs/editorconfig/.editorconfig .
# Merge eslint / tsconfig as needed — see configs/README.md
```

### 2. Point agents at shared rules

In product `AGENTS.md`:

```markdown
## Shared style (nerd-style)

Follow https://github.com/TecKnoNerd/nerd-style (or local `.nerd-style/`).
Mandatory pre-push: `pnpm format` && `pnpm lint` (or project equivalent).
```

### 3. Scripts (pnpm monorepo example)

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "check": "pnpm lint && pnpm format:check && pnpm typecheck && pnpm test"
  }
}
```

---

## Principles (pocket edition)

1. **Specs before sprawl** — behavior changes update SPECs or docs in the same PR.
2. **Pay-per-use by default** — idle cost near zero; no always-on toys without approval.
3. **Tenant isolation is non-negotiable** — every multi-tenant query keys by tenant.
4. **Thin handlers, thick services** — validate → authorize → domain → respond.
5. **Format + lint before every push** — no exceptions for “tiny” commits.
6. **Tests are the executable contract** — unit always; e2e when the stack exists.
7. **No secrets in git or frontend** — SSM/Secrets Manager only.

Full manifesto: [`pocket-protector/manifesto.md`](./pocket-protector/manifesto.md).

---

## Versioning

- Semantic versioning via git tags (`v1.0.0`).
- Breaking style rules → major.
- New optional configs → minor.
- Typos/docs → patch.

Consumers should pin a tag or submodule commit in CI.

---

## Contributing

1. Edit docs/configs in a PR.
2. Run nothing heavy — this repo is mostly markdown + static configs.
3. Keep tone: precise, usable, lightly nerdy — not corporate filler.

---

## License

MIT — use freely across TecKnoNerd and personal projects that want the pocket-protector energy.
