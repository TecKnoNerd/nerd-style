# Naming conventions

---

## Code

| Kind | Convention | Example |
| ---- | ---------- | ------- |
| Files (TS) | `camelCase` or `kebab` for multi-word docs | `envelopes.ts`, `webhook-sink.mjs` |
| React components | `PascalCase.tsx` | `AppShell.tsx` |
| Types / interfaces | `PascalCase` | `TenantRecord` |
| Functions / vars | `camelCase` | `createEnvelope` |
| Constants | `SCREAMING_SNAKE` sparingly | `DEFAULT_LIMITS` |
| Env vars | `SCREAMING_SNAKE` | `TENANTS_TABLE_NAME` |
| Next public env | `NEXT_PUBLIC_*` | `NEXT_PUBLIC_API_BASE` |

---

## IDs

Prefer **prefixed** opaque IDs for debuggability:

| Entity | Prefix | Example |
| ------ | ------ | ------- |
| Tenant | `tnt_` | `tnt_a1b2…` |
| Envelope | `env_` | `env_…` |
| Webhook | `wh_` | `wh_…` |
| SCIM token | `sct_` | `sct_…` |

Use UUID internals without dashes when compactness matters.

---

## AWS resources

```text
{project}-{environment}-{purpose}
```

Examples:

- `sign-vault-dev-envelopes` (DynamoDB)
- `sign-vault-dev-webhooks-dlq` (SQS)
- `sign-vault-dev-gha-deploy` (IAM role)

SSM paths:

```text
/sign-vault/{env}/config
/sign-vault/{env}/…
```

---

## HTTP paths

- Lowercase, hyphenate multi-word segments if needed: `/audit/export`.
- Prefer plural collections.
- Public test routes namespaced: `/e2e/…`.

---

## GitHub

- Repo: `kebab-case` (`nerd-style`, `sign-vault`).
- Packages: `@scope/name` when publishing.
