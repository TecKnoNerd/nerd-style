# API design

Shared HTTP/API conventions.

---

## Style

- **REST** over HTTPS, JSON bodies (`application/json` unless SCIM or multipart).
- Resource nouns, plural collections: `/envelopes`, `/webhooks`.
- Nested only when ownership is clear: `/envelopes/{id}/audit`.
- Prefer query params for filters: `?status=sent&limit=50`.

---

## Auth

| Route class | Mechanism |
| ----------- | --------- |
| Private | `Authorization: Bearer <JWT>` |
| Guest / one-shot | Opaque token in path or header |
| Machine provisioning (e.g. SCIM) | Bearer service token, hashed at rest |

---

## Success responses

- `200` OK with body  
- `201` Created with body  
- `204` No Content (empty body)  
- Prefer consistent envelope for lists: `{ "items": [...], "count": N }` or domain-specific `{ "envelopes": [...] }` — **pick one per product and stick to it**.

---

## Errors

```json
{
  "error": "bad_request",
  "message": "Human-readable explanation",
  "details": {}
}
```

| HTTP | Typical `error` |
| ---- | --------------- |
| 400 | `bad_request` |
| 401 | `unauthorized` |
| 403 | `forbidden` / product codes (`enterprise_required`, `tenant_suspended`) |
| 404 | `not_found` |
| 409 | `conflict` |
| 429 | `limit_exceeded` (+ `Retry-After` when applicable) |
| 500 | `internal_error` |

Stable machine codes; messages may improve without breaking codes.

---

## Versioning

- Prefer additive JSON fields.
- Breaking changes: new path prefix (`/v2`) or coordinated major with changelog.
- Document in hosted docs + OpenAPI when present.

---

## Idempotency

- Document idempotency for payment-like and send operations.
- Prefer client-supplied `Idempotency-Key` header when retries are expected.

---

## Pagination

- Prefer cursor or keyset over deep offsets on large tables.
- Always cap `limit` server-side (e.g. max 100).

---

## Webhooks (outbound)

- JSON body with event `type`, `id`, `createdAt`, `data`.
- HMAC signature header (product-defined).
- Delivery log + redeliver for integrators.
