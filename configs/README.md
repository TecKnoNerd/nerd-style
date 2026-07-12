# Shared configs

Copy or extend these into host repositories. Prefer **extend** over full rewrite so upgrades stay easy.

## Prettier

```powershell
Copy-Item configs/prettier/.prettierrc.json <host>/
Copy-Item configs/prettier/.prettierignore <host>/   # then merge ignores
```

## EditorConfig

```powershell
Copy-Item configs/editorconfig/.editorconfig <host>/
```

## ESLint (flat config)

Host should install:

```text
eslint @eslint/js typescript-eslint eslint-config-prettier
```

Start from `configs/eslint/eslint.config.base.mjs` and add host `ignores` / React plugins as needed.

## TypeScript

Merge `configs/typescript/tsconfig.base.json` via:

```json
{
  "extends": "./.nerd-style/configs/typescript/tsconfig.base.json"
}
```

(adjust path for submodule location)

## Ruff (Python)

```powershell
Copy-Item configs/ruff/ruff.toml <host>/python/
```

## Package scripts (suggested)

See root `README.md` and `templates/package.scripts.json`.
