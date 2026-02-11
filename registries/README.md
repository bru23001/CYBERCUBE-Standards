# CYBERCUBE Registry System

Machine-readable source of truth for all CYBERCUBE identifiers. JSON files are authoritative; the markdown Name Registry is a generated view.

**Standard:** 5.1 Naming & Identifier Standard v1.2 + 1.5 PRCS v1

---

## Files

| File | Namespace | Contents |
|------|-----------|----------|
| `entity-codes.json` | B (CC-PID) | 52 public entity codes with status and DB table |
| `modules.json` | G/M | 28 module records (MOD-001 to MOD-028) |
| `products.json` | G | Product records (PRD-XXX) — populate as you register |
| `projects.json` | — | Project records (PRJ CC-PIDs) — populate as you create |
| `standards.json` | G | 41 standards/policy/plan/template/framework records |
| `schema/*.schema.json` | — | JSON Schema definitions for all registry types |
| `new-entry.mjs` | — | Interactive decision tree for registering new items |
| `validate-registry.mjs` | — | Validates all JSON against schemas + cross-refs |
| `render-registry.mjs` | — | Regenerates markdown Name Registry from JSON |

---

## Quick Start

### Interactive (recommended)

```bash
node registries/new-entry.mjs
```

Walks you through a decision tree: asks what you're registering, classifies it, writes to the correct JSON file, validates, and renders the markdown. Covers all four types (entity code, module, product, project).

### Validate

```bash
node registries/validate-registry.mjs
```

Checks: JSON syntax, schema compliance, unique IDs, sequential ordering, cross-references.

### Render

```bash
node registries/render-registry.mjs
```

Regenerates auto-generated sections in `CYBERCUBE-Name-Registry.md` (sections between `<!-- BEGIN:* -->` and `<!-- END:* -->` markers).

---

## Workflows

### Register a new product

1. Open `products.json`
2. Add an entry with the next sequential `PRD-NNN`:

```json
{
  "id": "PRD-001",
  "name": "My Product",
  "pcl": "PCL-1.1.3.2",
  "domainTags": ["Project Management", "Collaboration"],
  "functionDescriptors": ["task tracking", "team boards"],
  "owner": "Engineering",
  "status": "Active",
  "createdAt": "2026-02-10"
}
```

3. Run validate + render:

```bash
node registries/validate-registry.mjs && node registries/render-registry.mjs
```

4. Commit both `products.json` and `CYBERCUBE-Name-Registry.md`

### Register a new project

1. Get the CC-PID from `PublicIdService.generate("PRJ")` or note it from the app
2. Open `projects.json` and add:

```json
{
  "ccpid": "PRJ-X2M8KD-F",
  "name": "Client Portal Redesign",
  "productId": "PRD-001",
  "domainCode": "WA-SS",
  "classification": "Product",
  "woePrefix": "WA-SS",
  "tracker": "GitHub",
  "status": "Active",
  "createdAt": "2026-02-10"
}
```

3. Validate + render + commit

### Register a new module

1. Open `modules.json` and add with next sequential `MOD-NNN`:

```json
{
  "id": "MOD-029",
  "slug": "search",
  "name": "Search Module",
  "scope": "Domain",
  "reusability": "Global",
  "stability": "Experimental",
  "owner": "Engineering",
  "sourceStandard": "5.2",
  "dependencies": ["MOD-018"],
  "usedByProducts": [],
  "createdAt": "2026-02-10"
}
```

2. Validate + render + commit

### Add a new entity code

1. Add to `entity-codes.json`:

```json
{
  "code": "NEW",
  "name": "New Entity",
  "category": "System & Integration",
  "description": "Description of the entity",
  "dbTable": "new_entities",
  "status": "ACTIVE",
  "ccpidStatus": "PENDING",
  "createdAt": "2026-02-10"
}
```

2. Also update `api/shared/entity-codes.ts` (the runtime code)
3. Validate + render + commit

---

## Rules

- **JSON is the source of truth.** Never edit the markdown tables between `BEGIN`/`END` markers directly -- they will be overwritten.
- **IDs are immutable.** Once assigned, `PRD-NNN`, `MOD-NNN`, and entity codes are never changed or reused.
- **Sequential, no gaps.** Product and module IDs must be sequential (PRD-001, PRD-002, ...). The validator enforces this.
- **Slugs are immutable.** Module slugs cannot change once assigned.
- **Always validate before committing.** Run `validate-registry.mjs` to catch errors.
- **Always render after changing JSON.** Run `render-registry.mjs` to keep the markdown in sync.

---

## Requirements

- Node.js >= 18
- Zero external dependencies

---

## Future: Migration to DB

When infrastructure exists, these JSON files become seed data:

1. JSON files -> DB seed migration
2. `render-registry.mjs` -> read-only API endpoint
3. `validate-registry.mjs` -> DB constraints + API validation
4. Git history preserved as audit trail for all changes
