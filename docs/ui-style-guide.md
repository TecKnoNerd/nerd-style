# UI style guide

Canonical **visual design system** for TecKnoNerd product UIs.  
Reference implementation: [sign-vault](https://github.com/TecKnoNerd/sign-vault) (`frontend/src/app/globals.css`, `AppShell`, portal pages).

Host products may rebrand names/logos; they should **not** invent a second token set without reason. Prefer overriding CSS variables.

Patterns (shells, wizards, empty states): [`ui-patterns.md`](./ui-patterns.md).  
Portable seed CSS: [`configs/ui/tokens.css`](../configs/ui/tokens.css).

---

## Design intent

| Principle | Practice |
| --------- | -------- |
| Enterprise calm | Slate neutrals, indigo primary, soft shadows — not neon SaaS clutter |
| Readable density | Comfortable padding; tables with uppercase micro-headers |
| Trust cues | Secure pill, status badges, clear destructive actions |
| Portable tokens | Everything themeable via `:root` CSS variables |
| Light-first | `color-scheme: light` default; dark mode is opt-in later |

**Stack default:** TypeScript + Next.js App Router; static export when hosting is S3 + CloudFront. Plain CSS (or CSS modules) with design tokens is preferred over a heavy component library for MVP portals.

---

## Typography

| Role | Family | Weight | Notes |
| ---- | ------ | ------ | ----- |
| UI body | **Inter**, system-ui, sans-serif | 400–600 | Default `body`; line-height ~1.5 |
| Display / brand / H1 | **Space Grotesk**, Inter | 600–700 | Tight tracking (`-0.025em` to `-0.03em`) |
| Code / mono | ui-monospace, SF Mono, Menlo, Consolas | 400 | Secrets, IDs, API snippets |

### Scale (portal)

| Element | Size | Weight | Extra |
| ------- | ---- | ------ | ----- |
| Brand name | ~1.35rem | 600 | Space Grotesk; tracking `-0.03em` |
| Brand sub | ~0.62rem | 600 | Uppercase; letter-spacing ~0.16em; muted |
| `h1` | ~1.75rem | 600 | Space Grotesk |
| `h2` | ~1.1rem | 600 | Inter ok |
| Body / controls | 0.875–0.9rem | 500–600 | Buttons 0.875rem / 600 |
| Page sub | ~0.925rem | 400 | Muted |
| Metric label | ~0.8rem | 500 | Muted |
| Stat number | ~1.65rem | 700 | `font-variant-numeric: tabular-nums` |
| Table header | ~0.7rem | 700 | Uppercase; letter-spacing `0.05em` |
| Badge | ~0.72rem | 700 | Lowercase status text |
| Sidebar section label | ~0.62rem | 700 | Uppercase; wide tracking |

Load fonts once (Google Fonts or self-host):

```text
Inter: 400, 500, 600, 700
Space Grotesk: 500, 600, 700
```

Use class `.font-display` for non-heading display emphasis.

---

## Color tokens

Copy these as CSS custom properties. Hex values match Sign Vault production portal.

### Brand & accent

| Token | Value | Use |
| ----- | ----- | --- |
| `--primary` | `#4f46e5` | Buttons, links, active nav, progress start |
| `--primary-hover` | `#4338ca` | Primary button hover |
| `--primary-soft` | `#f1e7ff` | Active nav background |
| `--primary-soft-2` | `#eef2ff` | Code chips, soft fills |
| `--cyan` | `#22d3ee` | Brand gradient end, progress accent |
| `--cyan-deep` | `#0891b2` | Mark / deep accent |

**Brand mark gradient** (rounded tile behind logo):

```css
background: linear-gradient(135deg, #4f46e5 0%, #6366f1 55%, #22d3ee 100%);
```

**Progress bar gradient:**

```css
background: linear-gradient(90deg, #4f46e5, #22d3ee);
```

### Surfaces & text

| Token | Value | Use |
| ----- | ----- | --- |
| `--bg` | `#f8fafc` | App background (slate-50) |
| `--surface` | `#ffffff` | Cards, topbar, sidebar |
| `--text` | `#0f172a` | Primary text (slate-900) |
| `--muted` | `#64748b` | Secondary text (slate-500) |
| `--border` | `#e2e8f0` | Default borders |
| `--border-strong` | `#cbd5e1` | Secondary buttons, stronger edges |

### Semantic status

| Token | Value | Background token | Value |
| ----- | ----- | ---------------- | ----- |
| `--ok` | `#059669` | `--ok-bg` | `#d1fae5` |
| `--warn` | `#d97706` | `--warn-bg` | `#fef3c7` |
| `--danger` | `#e11d48` | `--danger-bg` | `#ffe4e6` |
| `--info` | `#2563eb` | `--info-bg` | `#dbeafe` |

### Status badge mapping (workflow UIs)

| Status class | Background | Text |
| ------------ | ---------- | ---- |
| default | `#e2e8f0` | `#475569` |
| `draft` | `#e0e7ff` | `#4338ca` |
| `sent` / `partial` | `--info-bg` | `--info` |
| `completed` / `sealed` / success | `--ok-bg` | `--ok` |
| `voided` / `declined` / error | `--danger-bg` | `--danger` |

Host products map domain statuses into this palette; do not invent neon greens.

### Elevation

```css
--shadow: 0 10px 15px -3px rgb(15 23 42 / 0.08), 0 4px 6px -4px rgb(15 23 42 / 0.08);
```

Cards use a lighter rest shadow: `0 1px 2px rgb(15 23 42 / 0.04)`.  
Modals / wizards: stronger slate shadow, e.g. `0 25px 50px -12px rgb(15 23 42 / 0.25)`.  
Overlays: `rgb(15 23 42 / 0.55)` + light `backdrop-filter: blur(4px)`.

---

## Shape & spacing

| Token | Value | Use |
| ----- | ----- | --- |
| `--radius` | `1rem` | Default control radius family |
| `--radius-lg` | `1.5rem` | Cards, modals, large surfaces |
| Control radius | ~0.85–1rem | Inputs, buttons |
| Pills | `999px` | Badges, filter pills, search field |
| Brand mark | ~0.85rem radius on 2.25rem tile | Logo container |
| Avatar | ~0.85rem radius (soft square) | Initials chip — not perfect circle |

| Layout | Value |
| ------ | ----- |
| `--topbar-h` | `4rem` |
| `--sidebar-w` | `15rem` |
| Content max width | `96rem` (topbar + shell) |
| Main padding | `2rem` |
| Card padding | `1.25rem 1.35rem` |
| Narrow / guest content | max `42rem`, centered |

**Motion:** short and utilitarian — ~0.1–0.12s ease for hovers; avoid decorative bounce in production (prototype HTML may use springier curves).

---

## Brand block

Structure used in Sign Vault topbar / login:

```text
[ mark tile + glyph ]  Product Name
                       SUBTITLE (uppercase micro)
```

| Piece | Spec |
| ----- | ---- |
| Mark tile | 2.25rem; indigo→cyan gradient; inset highlight |
| Glyph | ~1.35rem; high-contrast on gradient (white or cyan stroke SVG) |
| Name | Space Grotesk; product name only |
| Subtitle | “Enterprise”, “Secure signatures”, “Guest signing” — context-dependent |

Do not put long taglines in the topbar. Keep subtitle ≤ ~20 characters.

---

## Iconography

- Prefer simple glyphs or a single icon set (Sign Vault prototype used Font Awesome; production portal often uses compact emoji / SVG for zero dependency).
- Nav icons: fixed ~1.25rem width, slightly muted (`opacity: 0.85`).
- Empty states: soft circular `#f1f5f9` disc behind a single icon.
- Avoid dense icon rows without labels.

---

## Component recipes (visual)

### Buttons

| Variant | Look |
| ------- | ---- |
| Primary | `--primary` fill, white text, soft indigo shadow, radius ~1rem |
| Secondary | White fill, `--border-strong` border, slate text |
| Ghost | Transparent; hover `#f1f5f9` |
| Danger | `--danger` fill (destructive confirm) |
| Disabled | `opacity: 0.55`; `cursor: not-allowed` |

Padding ~`0.6rem 1.1rem`; font 0.875rem / 600; inline-flex with gap.

### Inputs

- Full width in forms; padding ~`0.65rem 0.85rem`; radius ~0.85rem.
- Border `--border`; focus: indigo-tinted outline + `#a5b4fc` border.
- Labels: `.field` — 0.8rem / 600 / `#475569`.
- Top search: pill (`999px`), slate-100 fill, icon inset left.

### Cards

- White surface, 1px `--border`, `--radius-lg`, light shadow.
- `.card-link`: hover indigo border + soft purple shadow; no underline.
- `.card-flush`: no padding; for tables that need edge-to-edge headers.

### Badges & filter pills

- Badges: pill, lowercase status, high weight, tight padding.
- Filter pills: uppercase micro labels; inactive white + border; active = primary fill + white text.

### Tables

- Header row: muted uppercase micro type; background `#fafbfc`.
- Row hover: `#f8fafc`; selected: `#f5f3ff`.
- Progress: thin track `#e2e8f0` + indigo→cyan fill.

### Alerts

| Kind | Style |
| ---- | ----- |
| `.alert.ok` | ok-bg / green text / green border |
| `.alert.danger` | danger-bg / rose text / rose border |
| Upgrade / soft warn banner | Amber border + cream gradient fill |

---

## App chrome (portal)

Three shell modes (see patterns doc):

1. **Authenticated portal** — sticky topbar + left sidebar + main.
2. **Login** — brand topbar only; radial indigo wash background; centered card ≤26rem.
3. **Guest / public action** — narrow main; minimal chrome; product brand still visible.

Topbar: white, bottom border, sticky, z-index 50.  
Sidebar: white, right border; active nav = primary-soft bg + primary text.  
Sidebar foot: “Enterprise Secure” trust pill (ok-colored heading + muted compliance line).

---

## Accessibility baselines

- Visible focus rings (indigo mix outline) on interactive controls — do not remove outlines without replacement.
- Prefer real `<button>` / `<a>` over clickable `div`s.
- Status not by color alone — keep text labels on badges.
- `aria-label` on icon-only controls and search.
- Guest and login flows must work without sidebar navigation.
- Contrast: body text on `--bg` / `--surface` meets WCAG AA for normal text; muted text is secondary only.

---

## Anti-patterns

| Don’t | Do instead |
| ----- | ---------- |
| Random primary blues per page | Use `--primary` / token overrides |
| Perfect-circle avatars + heavy glassmorphism | Soft-square avatar; light blur only on login topbar |
| All-caps body copy | Caps only for micro labels (nav sections, table headers, filters) |
| Blameful errors (“You failed…”) | Neutral system message + recovery action |
| Secrets / long tokens in plain cards | Monospace in dashed/soft boxes; mask when possible |
| Client-only env secrets | `NEXT_PUBLIC_*` for non-sensitive IDs only |

---

## Product rebrand checklist

When forking this system into a new product:

1. Swap brand name, subtitle, and mark SVG.
2. Optionally retune `--primary` / cyan gradient — keep neutrals and semantic colors.
3. Keep shell structure and control radii consistent.
4. Document product-specific status → badge class map in the host repo.
5. Link host `AGENTS.md` / coding standards to this guide + `ui-patterns.md`.

---

## Source of truth in Sign Vault

| Asset | Path |
| ----- | ---- |
| Tokens & components | `frontend/src/app/globals.css` |
| Shell | `frontend/src/components/AppShell.tsx` |
| Prototype / dense CRUD mock | `docs/samples/uisample.html` |
| Brand mark | `frontend/public/brand/mark.svg` |

When nerd-style and a host diverge, **host SPECs win for product behavior**; prefer reconciling tokens back here so other products stay consistent.
