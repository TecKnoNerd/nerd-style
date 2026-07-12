# Testing standards

---

## Pyramid

```text
        /\
       /e2e\        few, against real stack when available
      /------\
     / integ  \     API client tests, webhook sinks
    /----------\
   /    unit     \  domain + services + handlers (mocked I/O)
  /----------------\
```

---

## Unit

- **TypeScript:** Jest (or host standard) with ESM support as needed.
- **Python:** pytest.
- Prefer testing pure domain logic without AWS when possible.
- Mock AWS SDK at the boundary; do not mock your own business rules.

### Coverage

- Aim **≥80%** on primary domain/services over time.
- Gate critical modules higher (auth helpers, signing crypto).
- Don’t chase 100% on thin AWS glue.

---

## Integration / e2e

- Call the system as an external client (JWT, public routes).
- Prefer SSM-loaded config over hardcoded endpoints.
- Webhook tests: inbox sink → queue → assert HMAC + payload.

---

## What to test when behavior changes

| Change | Add/update |
| ------ | ---------- |
| New error code | unit + contract docs |
| New REST route | unit handler + e2e if lifecycle |
| Crypto / signature | unit with vectors |
| UI only | smoke manually or Playwright later |

---

## CI expectations

- PR CI: lint, format check, unit tests, typecheck.
- Deploy pipelines: build artifacts, apply IaC, smoke health.
- Security: dependency audit; optional ZAP baseline on public paths.
