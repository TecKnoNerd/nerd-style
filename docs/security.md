# Security defaults

---

## Non-negotiables

1. **No secrets in git** — use SSM Parameter Store, Secrets Manager, or CI OIDC roles.
2. **No secrets in frontend bundles** — only public client IDs / API base URLs.
3. **Tenant isolation** — every multi-tenant read/write validates tenant context.
4. **TLS everywhere** public.
5. **Encrypt at rest** — KMS or AWS-managed SSE for data stores.

---

## Auth

- Prefer short-lived access tokens + refresh.
- Rotate webhook/SCIM secrets; show plaintext **once**.
- Store secrets hashed or encrypted (HMAC secrets may need reversible storage — restrict IAM).

---

## Input handling

- Validate types and ranges at the edge.
- Sanitize values that land in headers (e.g. `Content-Disposition` filenames — strip CR/LF).
- Prefer constant-time compare for HMAC/token equality (`timingSafeEqual`).

---

## IAM

- Least privilege; prefer resource ARNs over `*`.
- Deploy roles may be broader for OpenTofu **create** — document and tighten over time.
- Prefer GitHub OIDC over long-lived access keys for CI.

---

## PII & compliance

- Minimize PII in logs.
- Soft-delete / redact patterns for DSAR-style flows.
- Sealed / immutable records: document what cannot be rewritten.

---

## Dependency hygiene

- `pnpm audit --audit-level=high` (or host equivalent) in CI.
- Python: `pip-audit` / uv audit where applicable.
- Pin major tooling; review Dependabot carefully for monorepos.

---

## Public surface

- Explicit public routes only.
- Rate-limit abuse-prone endpoints (signup, guest token minting) when traffic appears.
