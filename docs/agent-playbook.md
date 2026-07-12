# Agent playbook

How coding agents should work on TecKnoNerd repos that adopt **nerd-style**.

---

## Startup

1. Read host `AGENTS.md`, constitution, and relevant SPECs.
2. Read this repo’s `AGENTS.md` + relevant `docs/*` when host defers.
3. For UI work: `docs/ui-style-guide.md` + `docs/ui-patterns.md` (Sign Vault is the reference look).
4. Inspect git status / branch before editing.
5. Prefer small, reversible local changes; ask before destructive or shared-remote actions.

---

## Implementation loop

```text
plan → implement → test → format → lint → commit → push
                              ▲__________________|
                         (fix issues here, not after push)
```

---

## Mandatory last step before push

```powershell
pnpm format
pnpm lint
```

Then commit (if needed) and push.  
If only docs changed, still format markdown via Prettier.

---

## When you find new work

- **In scope:** do it.
- **Out of scope but important:** add to host `TODO.md` / issue; do not expand forever.
- **Manual / env-only:** document under a **Human TODO** section with steps.

---

## Secrets & safety

- Never print secrets into commits or PR bodies.
- Prefer OIDC deploy over long-lived keys.
- Do not disable security checks (`--no-verify`) to “make it green”.

---

## Communication

- Summaries: what changed, how to verify, residual risk.
- Prefer tables for multi-item outcomes.
- Cite files with paths, not vague “updated stuff”.
