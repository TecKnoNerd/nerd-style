# UI configs

Design tokens extracted from [sign-vault](https://github.com/TecKnoNerd/sign-vault) for reuse across TecKnoNerd portals.

| File | Purpose |
| ---- | ------- |
| [`tokens.css`](./tokens.css) | CSS variables + font import + small helpers |

## Adopt

```css
/* frontend/src/app/globals.css */
@import "../../../.nerd-style/configs/ui/tokens.css";
/* then product layout / component classes */
```

Or copy `:root { … }` into the host stylesheet and extend.

Full guidance:

- [`docs/ui-style-guide.md`](../../docs/ui-style-guide.md) — color, type, components
- [`docs/ui-patterns.md`](../../docs/ui-patterns.md) — shells, wizards, lists, copy
