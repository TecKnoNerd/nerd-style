# Agent instructions — {{PROJECT_NAME}}

Product-specific agent rules. Shared culture: [nerd-style](https://github.com/TecKnoNerd/nerd-style)
(or local `.nerd-style/` submodule).

## Shared (nerd-style)

1. Follow `.nerd-style/AGENTS.md` and `.nerd-style/docs/*` when this file is silent.
2. **Last step before every push:**

   ```powershell
   pnpm format
   pnpm lint
   pnpm check   # preferred
   ```

## Product rules

1. Read `specs/` and constitution before large changes.
2. Maintain SPECs when behavior changes.
3. {{PRODUCT_SPECIFIC_RULES}}

## Stack

- {{STACK_SUMMARY}}

## Do not

- {{PRODUCT_FORBIDDEN}}
- Push without format + lint clean
