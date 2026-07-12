# Architecture rules

General system architecture rules for TecKnoNerd multi-project consistency.  
Product SPECs override specifics; these are the **defaults**.

---

## 1. Cost posture

| Preference | Rule |
| ---------- | ---- |
| Idle cost | Approach **$0** in dev/MVP unless approved otherwise |
| Compute | Lambda / Fargate Spot only when justified |
| Data | DynamoDB on-demand, S3, pay-per-use queues |
| Avoid by default | NAT Gateways, always-on EC2, multi-AZ idle, broad WAF without review |

Every new AWS service in a design needs a one-line **idle cost** note.

---

## 2. Tenancy

- Multi-tenant data is **partitioned by `tenantId`** (or equivalent).
- Authorization checks membership / JWT claims before access.
- Cross-tenant access requires explicit multi-tenant + membership proof.
- Soft-delete and audit trails preferred over silent hard-delete for compliance domains.

---

## 3. Boundaries

```text
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Clients    │────▶│  API edge    │────▶│  Handlers   │
│  UI / CLI   │     │  API GW/CF   │     │  (thin)     │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                 │
                                         ┌───────▼───────┐
                                         │   Services    │
                                         │  (domain I/O) │
                                         └───────┬───────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              ▼                  ▼                  ▼
                           DynamoDB             S3              Cognito / SNS
```

- **Handlers**: parse, auth, map errors, call one service flow.
- **Services**: orchestration, persistence, external APIs.
- **Domain**: pure types, invariants, error codes.

---

## 4. API edge

- Prefer **API Gateway HTTP API** + JWT authorizer for private routes.
- Public routes are **explicit allowlists** (health, guest tokens, webhooks inbound test sinks).
- CloudFront for static UI + docs; path-based multi-app is OK on one distribution (cost).

---

## 5. AuthN / AuthZ

| Concern | Default |
| ------- | ------- |
| Users | Cognito (or equivalent IdP) |
| Machine | JWT or signed service tokens |
| Guests | Opaque single-purpose tokens, not long-lived JWTs |
| Roles | Coarse roles first (`TenantAdmin`, `TenantMember`, …) |

Never trust client-supplied `tenantId` without membership check.

---

## 6. Async & integration

- Domain events via **SNS** (or EventBridge) when multiple consumers exist.
- Worker Lambdas with **limited retries** + **DLQ**.
- Webhooks: signed payloads (HMAC), delivery logs, redeliver for integrators.

---

## 7. Observability

- Structured logs (JSON); **WARN** default in production.
- Correlate with request id / envelope id / tenant id (not PII-heavy).
- Metrics/alarms on 5xx, DLQ depth, throttle — not vanity dashboards.

---

## 8. Evolution

- Spec-Driven Development for product behavior (`specs/`).
- Feature flags optional; prefer small PRs + deploy early.
- Multi-region only when product requires it (cost + complexity).

---

## Decision record template (lightweight)

When choosing against a default:

```markdown
### ADR-NNN: <title>
- Context:
- Decision:
- Idle cost impact:
- Alternatives considered:
- Status: accepted | superseded
```

Keep ADRs in host `docs/adr/` if the team uses them.
