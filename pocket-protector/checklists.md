# Pocket checklists

Printable-grade checklists. Tick in PRs or keep mental.

---

## Pre-push (every time)

```text
[ ] No secrets in diff
[ ] SPEC/docs updated if behavior changed
[ ] pnpm format
[ ] pnpm lint
[ ] pnpm check (when practical)
[ ] Branch name sensible
[ ] Commit message conventional
```

---

## New HTTP endpoint

```text
[ ] Auth model decided (JWT / public / bearer)
[ ] Error codes stable
[ ] OpenAPI / public docs updated
[ ] Handler thin; logic in service
[ ] Unit test
[ ] IAM least privilege for new AWS calls
```

---

## New AWS resource

```text
[ ] Idle cost noted
[ ] Name matches {project}-{env}-{purpose}
[ ] Tags applied
[ ] Encryption on
[ ] Not in deferred-costly list without approval
```

---

## Multi-tenant feature

```text
[ ] tenantId on every item
[ ] Membership / claim check
[ ] No cross-tenant list without filter
[ ] Audit sensitive mutations
```

---

## Frontend change

```text
[ ] No secrets in NEXT_PUBLIC_*
[ ] Loading + empty + error states
[ ] Auth redirect paths correct
[ ] Links match routing scheme (/vault vs /)
```
