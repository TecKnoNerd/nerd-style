# Consuming nerd-style in {{PROJECT_NAME}}

## Install as submodule

```powershell
git submodule add https://github.com/TecKnoNerd/nerd-style.git .nerd-style
```

## Wire agents

In root `AGENTS.md`, include:

```markdown
Shared style: see `.nerd-style/AGENTS.md` and `.nerd-style/docs/`.
Pre-push: `pnpm format` && `pnpm lint`.
```

## Copy configs

```powershell
Copy-Item .nerd-style/configs/prettier/.prettierrc.json .
Copy-Item .nerd-style/configs/editorconfig/.editorconfig .
```

Extend ESLint from `.nerd-style/configs/eslint/eslint.config.base.mjs`.

## Upgrade

```powershell
cd .nerd-style
git fetch
git checkout v1.0.0   # pin a tag
cd ..
git add .nerd-style
git commit -m "chore: bump nerd-style"
```
