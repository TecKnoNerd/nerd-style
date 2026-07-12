# UI patterns

Interaction and layout patterns for TecKnoNerd product portals.  
Visual tokens: [`ui-style-guide.md`](./ui-style-guide.md).  
Reference: [sign-vault](https://github.com/TecKnoNerd/sign-vault) frontend.

---

## Shells

### 1. Authenticated portal

```text
┌──────────────────────────────────────────────────────────┐
│ brand │        search (optional)        │ tenant │ user  │  topbar sticky
├──────────┬───────────────────────────────────────────────┤
│ PORTAL   │  page-header (title + primary action)         │
│ nav…     │  content (cards / tables / grids)             │
│          │                                               │
│ [secure] │                                               │
└──────────┴───────────────────────────────────────────────┘
```

| Region | Rules |
| ------ | ----- |
| Topbar | Brand left; optional global search center; tenant switcher + user chip right |
| Sidebar | Section label (`PORTAL`); nav items with optional count badge; trust pill at bottom |
| Main | `2rem` padding; page-header flex row (title block + actions) |
| Active nav | Soft primary background; primary text; weight 600 |

**Nav item:** icon + label; optional trailing badge. Active state from path prefix (exact match for home).

### 2. Login

- No sidebar; no global search.
- Full-height shell with soft radial indigo wash on `--bg`.
- Frosted topbar (white ~85% + blur) with brand only.
- Centered column max ~26rem: hero (mark + “Sign in” + subcopy) → form card → legal foot note.

### 3. Guest / public action (e.g. signing link)

- No portal chrome; `main-narrow` content.
- Show brand + context subtitle (“Guest signing”).
- Single primary task; secondary destructive/decline as secondary or danger button.
- Link expiry and status always visible.

---

## Page header

Every authenticated list/detail page:

```text
[ H1 + page-sub ]                    [ primary CTA ]
```

- `h1`: Space Grotesk, task name (“Envelopes”, “Usage”).
- `page-sub`: one muted sentence of context — not a paragraph.
- Primary CTA right-aligned (e.g. “+ New envelope”); wrap on small widths.

---

## Dashboard

1. **Metric cards** in responsive grid (`auto-fit`, min ~160px): metric-label + large tabular stat + optional deep link.
2. **Shortcut cards** (`.card-link`): metric-label + display title + one-line muted description.
3. **Quick start** card: numbered steps for first-run; secondary button to the main workflow.

Loading: show `—` or muted “Loading.” — never invent zeros that look like real metering.

---

## Lists & master–detail

Sign Vault envelopes pattern:

| Piece | Behavior |
| ----- | -------- |
| Filter row | Status pills (`all`, domain statuses); active pill = primary |
| Local search | Filters title / ids / people client-side or via query param |
| Data table | Clickable rows; selected row highlighted |
| Detail pane / actions | Send, void, delete, export — gated by status |
| Empty | Centered empty-icon + short message + optional CTA |
| Errors | `.error-text` or `.alert.danger` above the table |

**Destructive actions:** confirm (`confirm()` or modal) with entity name; void/delete language must say irreversible when true.

---

## Create / multi-step wizard

Modal overlay pattern:

```text
┌─ wizard header (title + close) ─────────────┐
│  (1)──(2)──(3)──(4)   step dots + lines     │
│  step body (scrollable)                     │
│  [ Back ]                    [ Continue ]   │
└─────────────────────────────────────────────┘
```

| Rule | Detail |
| ---- | ------ |
| Overlay | Dim slate + blur; click outside optional close |
| Modal | max-width ~48rem; radius `--radius-lg`; max height viewport − 2rem |
| Steps | Dots: idle gray, active primary, done soft indigo |
| Footer | Back left; primary Continue / finish right |
| Finish | Label reflects outcome (“Save draft” vs “Create & send”) |
| Busy | Disable controls; button text “Working…” |

Prefer wizard for multi-entity create (files + recipients + options). Single-field edits stay on-page.

---

## Forms

- Stack labels above fields (`.field` + full-width control).
- Group related fields; avoid multi-column until desktop width is comfortable (`grid-2` with `minmax(20rem, 1fr)`).
- Inline validation: `.error-text` under the control or form.
- Submit buttons: full-width on login; auto-width in portal footers.
- Checkbox rows: horizontal align; don’t stretch checkbox to 100% width.
- Secrets / tokens: monospace `.mono` or dashed secret block; never log to console in production UI.

---

## Feedback

| Pattern | When |
| ------- | ---- |
| Inline error text | Field or form failure |
| Alert banner | Page-level success / failure after mutation |
| Toast (optional) | Transient non-blocking notice (prototype); keep subtle |
| Busy buttons | Disable + progressive label (“Signing…”) |
| Empty state | No rows / no session / not configured |

**Env not configured:** show a card with the exact operator command (`pnpm frontend:env`) — agents and humans both benefit.

---

## Auth & session chrome

| State | UI |
| ----- | -- |
| Loading session | Muted “Loading session.” — no flash of login form if session resolves quickly |
| Signed out (portal) | Secondary “Sign in” in topbar |
| Signed in | Email + role micro-line (ok green) + initials avatar + Sign out |
| Tenant | Switcher near user chip; never allow cross-tenant data bleed in lists |

Initials avatar: two letters from email/name; indigo-100 background; soft-square radius.

---

## Usage / metering

- Progress tracks for quotas: primary gradient; switch to warn/danger fills near limits.
- Day bars: short indigo bars; hover primary.
- Overage: badge using semantic success/danger, not only color on a number.

---

## Copy (UI)

| Do | Don’t |
| -- | ----- |
| Short labels (“Sign in”, “Void envelope”) | Clever jokes on primary buttons |
| System-owned errors (“Failed to load envelopes”) | “You broke it” |
| Explicit irreversibility | Soft-pedal destructive actions |
| Empty: what + next action | Blank white void |
| Guest success: “Already signed — thank you” | Raw status enums only |

Align with prose rules in [`style-guide.md`](./style-guide.md).

---

## Responsive behavior

| Breakpoint intent | Behavior |
| ----------------- | -------- |
| Wide (≥ shell max) | Centered 96rem shell; sidebar visible |
| Medium | Keep sidebar if possible; wrap page-header |
| Narrow | Prefer stacking; guest/login already single-column |

MVP may defer a collapsible mobile nav; if deferred, document in host TODO. Do not ship horizontal overflow on tables without a scroll container.

---

## Frontend engineering conventions

| Topic | Default |
| ----- | ------- |
| Framework | Next.js App Router, TypeScript |
| Components | `"use client"` only when state/hooks needed |
| Shell | One `AppShell` (or equivalent) branching by path |
| Styling | Global tokens + semantic class names (`.card`, `.badge`, …) |
| Config | Public API/Cognito IDs via `NEXT_PUBLIC_*` from SSM at build/env time |
| Hosting | Static export → S3 + CloudFront when cost-sensitive |

Handlers stay thin on the backend; the UI stays thin too: **fetch → map domain → render**. Domain rules (who can void, limits) live in the API.

---

## Checklist for a new portal screen

```text
[ ] Correct shell (portal / login / guest)
[ ] page-header with title, sub, and primary action if any
[ ] Tokens only — no one-off hex for primary/status
[ ] Loading, empty, and error states
[ ] Destructive confirms named with the entity
[ ] Focusable controls; badges have text
[ ] No secrets in client bundle
[ ] Matches Sign Vault density (cards, radius, slate bg)
```

---

## Anti-patterns

- Rebuilding marketing landing pages inside the authenticated shell.
- Mixing a third design system (e.g. default shadcn theme) without remapping tokens to this guide.
- Sidebar links that 404 or open dead search fields without `disabled` + title.
- Using `confirm()` for multi-step data loss without naming the object (acceptable for MVP; prefer modal when copy is long).
