# Git workflow

---

## Branches

| Pattern | Use |
| ------- | --- |
| `main` | Production-ready / protected |
| `initial-rollout` / `develop` | Integration (product-specific) |
| `feature/<area>/<short-name>` | Feature work |
| `fix/<short-name>` | Bugfix |
| `chore/<short-name>` | Tooling, format, deps |

Prefer short-lived branches and small PRs.

---

## Commits

- **Conventional Commits** preferred:

  ```text
  feat(api): add envelope void endpoint
  fix(ui): always render login fields
  docs: mandate format before push
  chore: prettier format
  ```

- Imperative mood, ≤72 char subject when possible.
- Body explains **why** when non-obvious.
- No secrets in history — if leaked, rotate immediately.

---

## Pull requests

- Clear summary + test plan.
- Link SPEC / issue when relevant.
- Screenshots for UI.
- Do not merge red CI.

---

## Mandatory pre-push gate

**Last step after all implementation, before `git commit` and `git push`:**

```powershell
pnpm format
pnpm lint
```

Preferred full gate:

```powershell
pnpm check
```

| Status | Action |
| ------ | ------ |
| Format fails | `pnpm format`, re-stage, commit |
| Lint fails | fix or `pnpm lint:fix` if safe, re-run |
| Tests fail | fix before push |

Agents: this gate is **non-optional**. See `AGENTS.md` and `docs/agent-playbook.md`.

---

## Hooks (optional)

Host repos may add Husky / lefthook:

```text
pre-push: pnpm format:check && pnpm lint
```

Keep hooks fast; full test suite stays in CI if local is slow.
