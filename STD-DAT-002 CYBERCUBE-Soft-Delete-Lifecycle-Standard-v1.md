CYBERCUBE Soft-Delete & Lifecycle Management Standard (v1)

## Glossary

> **Note:** This glossary is provided as a quick reference for terms used throughout the standard that follows.

This glossary defines key terms used throughout the CYBERCUBE Soft-Delete & Lifecycle
Management Standard.

All definitions are normative unless stated otherwise.

A

Active State

The normal operational state of a resource.

Properties:
- Fully accessible
- Modifiable
- Visible in listings
- Subject to billing (if applicable)

Archive

Long-term storage state for inactive but retained resources.

Properties:
- Read-only
- Hidden from default listings
- Lower storage tier
- Restorable

Archived State

A resource moved to archive storage.

Transition:
- From: ACTIVE (manual) or SUSPENDED (automatic)
- To: ACTIVE (restore) or DELETED (expiry)

B

Bulk Operation

An operation affecting multiple resources simultaneously.

Rules:
- Same lifecycle rules apply per resource
- Transactional where possible
- Partial failures reported individually

C

Cascade Delete

Automatic deletion of child resources when parent is deleted.

Behavior:
- Children inherit parent's lifecycle transition
- Same grace periods apply
- Independent restoration not possible

D

Deleted State

A resource marked for removal but not yet purged.

Properties:
- Not accessible via normal APIs
- Returns 410 Gone
- Restorable within grace period
- Hidden from all listings

Deletion

The process of removing a resource from active use.

Types:
- Soft delete: Marks as deleted, retains data
- Hard delete: Permanently removes data

E

Expiry

Automatic transition triggered by time.

Types:
- Grace period expiry → hard delete
- Archive expiry → hard delete
- Suspension expiry → archive or delete

G

Gone (HTTP 410)

HTTP status indicating a resource was deliberately removed.

Usage:
- Resource existed but was deleted
- CC-PID is recognized
- Distinguished from 404 (never existed)

Grace Period

A window during which a deleted resource can be restored.

Default: 30 days

Purpose:
- Prevent accidental data loss
- Allow recovery from mistakes
- Comply with data subject requests

H

Hard Delete

Permanent removal of data from all systems.

Properties:
- Irreversible
- Data destroyed
- CC-PID retired (never reused)
- Audit log retained

I

Immutable

A resource state that cannot be modified.

Applies to:
- Archived resources (content)
- Deleted resources (all)
- CC-PIDs (always)

L

Lifecycle

The complete set of states a resource can exist in and transitions between them.

CYBERCUBE lifecycle:
```
ACTIVE ↔ SUSPENDED ↔ ARCHIVED → DELETED → PURGED
```

Lifecycle Event

A transition between lifecycle states.

Logged fields:
- Resource ID
- Previous state
- New state
- Trigger (user/system)
- Timestamp
- Actor

Lifecycle Hook

A callback triggered by lifecycle transitions.

Use cases:
- Cascade to children
- Notify owners
- Trigger cleanup
- External sync

Lifecycle Policy

Rules governing automatic state transitions.

Examples:
- Suspend after 90 days inactive
- Archive after 1 year suspended
- Delete after 30 days archived (tenant data)

M

Manual Transition

A state change initiated by a user action.

Examples:
- User deletes project
- Admin suspends account
- User archives completed work

P

Pending Delete

Synonym for soft-deleted state during grace period.

Purge

The final removal of data from all storage, including backups.

Properties:
- Occurs after grace period
- Includes backup cleanup
- Irreversible
- Generates deletion certificate (RESTRICTED data)

Purged State

The terminal state after hard delete.

Properties:
- No data remains
- CC-PID reserved forever
- Returns 410 Gone
- Audit trail only

R

Recovery

Synonym for restoration.

Resource

Any entity with a CC-PID that follows lifecycle rules.

Examples:
- Projects (PRJ)
- Tasks (TSK)
- Users (USR)
- Invoices (INV)

Restoration

Returning a deleted or archived resource to active state.

Requirements:
- Within grace period (deleted)
- Appropriate permissions
- Parent must be active
- Logged as lifecycle event

Retention

The period data is kept before purging.

See: Data Classification & Retention Standard

S

Soft Delete

Marking a resource as deleted without removing data.

Properties:
- Reversible (within grace period)
- Data retained
- Hidden from listings
- Returns 410 Gone via API

State

The current lifecycle position of a resource.

CYBERCUBE states:
- ACTIVE
- SUSPENDED
- ARCHIVED
- DELETED
- PURGED

State Machine

The formal definition of valid states and transitions.

Properties:
- Deterministic
- No invalid transitions
- Auditable
- Enforced at data layer

Suspended State

A temporary inactive state.

Properties:
- Read-only access
- Visible in listings (marked)
- Billing may continue or pause
- Restorable to active

Suspension

Temporary deactivation of a resource.

Triggers:
- Manual (admin action)
- Automatic (policy violation)
- Billing (payment failure)

T

Terminal State

A state with no outgoing transitions.

CYBERCUBE terminal state: PURGED

Tombstone

A minimal record retained after deletion.

Contents:
- CC-PID
- Entity type
- Deletion timestamp
- Deleted by
- Original creation date

Purpose:
- Return 410 vs 404
- Prevent CC-PID reuse
- Audit trail

Transition

A change from one lifecycle state to another.

Components:
- Source state
- Target state
- Trigger
- Conditions
- Side effects

U

Undo

Reverting a delete operation during grace period.

Synonym: Restore, Undelete

W

Window

A time period during which an action is allowed.

Types:
- Grace period (restore window)
- Archive window
- Retention window

---

# CYBERCUBE Soft-Delete & Lifecycle Management Standard (v1)

**Standard ID:** STD-DAT-002  
**Parent Document:** 2.1 CYBERCUBE Security Policy (STD-SEC-001)  
**Status:** Active  
**Effective:** 2026-01-17  
**Classification:** INTERNAL  
**Owner:** Engineering Leadership  
**Applies to:** All CYBERCUBE resources with CC-PIDs

## 0. Purpose and Design Principles

This standard defines how resources transition through lifecycle states, with emphasis on
deletion behavior, data preservation, and recovery capabilities.

Industry alignment:
- Stripe Resource Lifecycle
- Google Cloud Resource States
- AWS Resource Lifecycle
- Salesforce Recycle Bin

Design principles:

1. **Reversibility** — Deletions are recoverable by default
2. **Predictability** — Consistent behavior across all resources
3. **Transparency** — Clear status via API responses
4. **Safety** — Prevent accidental data loss
5. **Compliance** — Support retention requirements
6. **Auditability** — Full lifecycle history

This document does NOT define:
- Retention periods — see Data Classification & Retention Standard
- Data classification — see Data Classification & Retention Standard
- Authorization — see Authorization & Access Control Standard
- CC-PID format — see Naming & Identifier Standard

## 1. Lifecycle States

All resources with CC-PIDs follow a defined lifecycle with explicit states.

1.1 State Definitions

| State | Code | Description | API Behavior |
|-------|------|-------------|--------------|
| ACTIVE | A | Normal operation | 200 OK |
| SUSPENDED | S | Temporarily inactive | 200 OK (read-only) |
| ARCHIVED | R | Long-term storage | 200 OK (read-only) |
| DELETED | D | Soft-deleted, in grace period | 410 Gone |
| PURGED | P | Permanently removed | 410 Gone |

1.2 State Diagram

```
                    ┌──────────────────────────────────────────────┐
                    │                                              │
                    ▼                                              │
┌────────┐     ┌─────────┐     ┌──────────┐     ┌─────────┐     ┌────────┐
│ CREATE │────▶│ ACTIVE  │────▶│SUSPENDED │────▶│ARCHIVED │────▶│DELETED │
└────────┘     └─────────┘     └──────────┘     └──────────┘     └────────┘
                    │               │                │                │
                    │               │                │                │
                    │               ▼                │                ▼
                    │          ┌─────────┐           │          ┌────────┐
                    └─────────▶│ DELETED │◀──────────┘          │ PURGED │
                               └─────────┘                      └────────┘
                                    │                                ▲
                                    │         (grace period)         │
                                    └────────────────────────────────┘
```

1.3 State Properties

| State | Readable | Writable | Listed | Billable | Restorable |
|-------|----------|----------|--------|----------|------------|
| ACTIVE | ✓ | ✓ | ✓ | ✓ | N/A |
| SUSPENDED | ✓ | ✗ | ✓ (marked) | Varies | ✓ |
| ARCHIVED | ✓ | ✗ | ✗ (unless requested) | ✗ | ✓ |
| DELETED | ✗ | ✗ | ✗ | ✗ | ✓ (grace period) |
| PURGED | ✗ | ✗ | ✗ | ✗ | ✗ |

1.4 State Storage

```sql
-- Every resource table includes lifecycle columns
ALTER TABLE projects ADD COLUMN lifecycle_state VARCHAR(1) NOT NULL DEFAULT 'A';
ALTER TABLE projects ADD COLUMN lifecycle_changed_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN lifecycle_changed_by UUID;
ALTER TABLE projects ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN purge_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN suspended_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN archived_at TIMESTAMPTZ;
ALTER TABLE projects ADD COLUMN suspension_reason VARCHAR(50);

-- State constraint
ALTER TABLE projects ADD CONSTRAINT valid_lifecycle_state 
  CHECK (lifecycle_state IN ('A', 'S', 'R', 'D', 'P'));

-- Index for cleanup jobs
CREATE INDEX idx_projects_purge ON projects (purge_at) 
  WHERE lifecycle_state = 'D';
```

## 2. State Transitions

Transitions between states follow strict rules.

2.1 Transition Matrix

| From \ To | ACTIVE | SUSPENDED | ARCHIVED | DELETED | PURGED |
|-----------|--------|-----------|----------|---------|--------|
| ACTIVE | — | ✓ | ✓ | ✓ | ✗ |
| SUSPENDED | ✓ | — | ✓ | ✓ | ✗ |
| ARCHIVED | ✓ | ✗ | — | ✓ | ✗ |
| DELETED | ✓* | ✗ | ✗ | — | ✓** |
| PURGED | ✗ | ✗ | ✗ | ✗ | — |

*\* Within grace period only*
*\*\* Automatic after grace period*

2.2 Transition Triggers

| Transition | Trigger Type | Description |
|------------|--------------|-------------|
| ACTIVE → SUSPENDED | Manual | Admin suspension |
| ACTIVE → SUSPENDED | Automatic | Policy violation, billing |
| ACTIVE → ARCHIVED | Manual | User archives |
| ACTIVE → ARCHIVED | Automatic | Inactivity policy |
| ACTIVE → DELETED | Manual | User deletes |
| SUSPENDED → ACTIVE | Manual | Admin reactivates |
| SUSPENDED → ACTIVE | Automatic | Billing resolved |
| SUSPENDED → ARCHIVED | Automatic | Suspension timeout |
| SUSPENDED → DELETED | Manual | Admin deletes |
| ARCHIVED → ACTIVE | Manual | User restores |
| ARCHIVED → DELETED | Manual | User deletes |
| ARCHIVED → DELETED | Automatic | Archive retention expiry |
| DELETED → ACTIVE | Manual | User restores (grace) |
| DELETED → PURGED | Automatic | Grace period expiry |

2.3 Transition Events

Every transition generates an event:

```typescript
interface LifecycleEvent {
  id: string;                    // Event ID
  resource_type: string;         // "project", "task", etc.
  resource_id: string;           // CC-PID
  previous_state: LifecycleState;
  new_state: LifecycleState;
  trigger: TransitionTrigger;
  triggered_by: string;          // USR-* or "system"
  reason?: string;               // Suspension reason, etc.
  metadata?: Record<string, any>;
  created_at: string;            // ISO 8601
}

type LifecycleState = 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED' | 'DELETED' | 'PURGED';
type TransitionTrigger = 'manual' | 'automatic' | 'policy' | 'billing' | 'cascade';
```

2.4 Transition Validation

Before any transition:

```typescript
async function validateTransition(
  resource: Resource,
  targetState: LifecycleState,
  actor: string
): Promise<ValidationResult> {
  const currentState = resource.lifecycle_state;
  
  // 1. Check transition is allowed
  if (!ALLOWED_TRANSITIONS[currentState].includes(targetState)) {
    return { valid: false, error: 'INVALID_STATE_TRANSITION' };
  }
  
  // 2. Check legal holds (for DELETED transitions)
  if (targetState === 'DELETED' || targetState === 'PURGED') {
    if (await hasLegalHold(resource)) {
      return { valid: false, error: 'LEGAL_HOLD_ACTIVE' };
    }
  }
  
  // 3. Check grace period (for DELETED → ACTIVE)
  if (currentState === 'DELETED' && targetState === 'ACTIVE') {
    if (resource.purge_at && new Date() > resource.purge_at) {
      return { valid: false, error: 'GRACE_PERIOD_EXPIRED' };
    }
  }
  
  // 4. Check parent state (child cannot be more "alive" than parent)
  if (resource.parent_id && targetState === 'ACTIVE') {
    const parent = await getResource(resource.parent_id);
    if (parent.lifecycle_state !== 'ACTIVE') {
      return { valid: false, error: 'PARENT_NOT_ACTIVE' };
    }
  }
  
  // 5. Check permissions
  if (!await canTransition(actor, resource, targetState)) {
    return { valid: false, error: 'INSUFFICIENT_PERMISSIONS' };
  }
  
  return { valid: true };
}
```

## 3. Soft Delete Behavior

Soft delete is the default deletion behavior for all resources.

3.1 Soft Delete Process

```
User requests DELETE /api/v1/projects/PRJ-X2M8KD-7
      ↓
Validate permissions
      ↓
Check legal holds → if held: 403 Forbidden
      ↓
Transition: ACTIVE → DELETED
      ↓
Set deleted_at = NOW()
Set purge_at = NOW() + grace_period
      ↓
Cascade to children (same transition)
      ↓
Emit lifecycle event
      ↓
Return 200 OK (with deleted resource)
```

3.2 Soft Delete Response

```http
DELETE /api/v1/projects/PRJ-X2M8KD-7
Authorization: Bearer {token}

HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "name": "Customer Portal",
      "lifecycle_state": "DELETED",
      "deleted_at": "2026-01-17T12:00:00Z",
      "purge_at": "2026-02-16T12:00:00Z",
      "restorable_until": "2026-02-16T12:00:00Z"
    }
  },
  "meta": {
    "message": "Project deleted. Can be restored until 2026-02-16."
  }
}
```

3.3 Accessing Deleted Resources

Normal access returns 410 Gone:

```http
GET /api/v1/projects/PRJ-X2M8KD-7
Authorization: Bearer {token}

HTTP/1.1 410 Gone
Content-Type: application/json

{
  "error": {
    "code": "RESOURCE_DELETED",
    "message": "This project has been deleted",
    "details": {
      "resource_type": "project",
      "resource_id": "PRJ-X2M8KD-7",
      "deleted_at": "2026-01-17T12:00:00Z",
      "restorable": true,
      "restorable_until": "2026-02-16T12:00:00Z"
    },
    "actions": {
      "restore": "POST /api/v1/projects/PRJ-X2M8KD-7/restore"
    }
  }
}
```

3.4 Listing Behavior

Deleted resources are excluded from listings by default:

```http
GET /api/v1/projects
→ Returns only ACTIVE projects

GET /api/v1/projects?include_deleted=true
→ Returns ACTIVE + DELETED projects

GET /api/v1/projects?lifecycle_state=DELETED
→ Returns only DELETED projects
```

3.5 Grace Periods by Resource Type

| Resource Type | Grace Period | Rationale |
|---------------|--------------|-----------|
| User account | 30 days | GDPR compliance |
| Project | 30 days | Data recovery |
| Task | 14 days | Lower criticality |
| Comment | 7 days | Lower criticality |
| Invoice | N/A | Legal retention, archive instead |
| Document | 30 days | Data recovery |
| API Key | 0 days (immediate) | Security |
| Session | 0 days (immediate) | Security |

3.6 Soft Delete SQL Implementation

```sql
-- Soft delete function
CREATE OR REPLACE FUNCTION soft_delete_resource(
  p_table_name TEXT,
  p_resource_id TEXT,
  p_deleted_by UUID,
  p_grace_days INTEGER DEFAULT 30
) RETURNS VOID AS $$
BEGIN
  EXECUTE format('
    UPDATE %I SET
      lifecycle_state = ''D'',
      lifecycle_changed_at = NOW(),
      lifecycle_changed_by = $1,
      deleted_at = NOW(),
      purge_at = NOW() + INTERVAL ''%s days''
    WHERE public_id = $2
      AND lifecycle_state != ''D''
      AND lifecycle_state != ''P''
  ', p_table_name, p_grace_days)
  USING p_deleted_by, p_resource_id;
END;
$$ LANGUAGE plpgsql;

-- View excluding deleted resources (default)
CREATE VIEW projects_active AS
SELECT * FROM projects
WHERE lifecycle_state IN ('A', 'S', 'R');

-- View including deleted resources
CREATE VIEW projects_all AS
SELECT * FROM projects
WHERE lifecycle_state != 'P';
```

## 4. Hard Delete and Purge

Hard delete permanently removes data after grace period expiry.

4.1 Purge Process

```
Scheduled job runs (hourly)
      ↓
Find resources: lifecycle_state = 'D' AND purge_at < NOW()
      ↓
For each resource:
      ↓
  Check legal holds → if held: skip
      ↓
  Cascade check: all children must be purgeable
      ↓
  Create tombstone record
      ↓
  Delete from primary storage
      ↓
  Queue backup cleanup
      ↓
  Transition: DELETED → PURGED
      ↓
  Emit lifecycle event
      ↓
  Generate deletion certificate (if RESTRICTED)
```

4.2 Tombstone Record

After purge, only a tombstone remains:

```typescript
interface Tombstone {
  public_id: string;           // CC-PID (preserved forever)
  entity_type: string;         // "project", "task", etc.
  entity_code: string;         // "PRJ", "TSK", etc.
  created_at: string;          // Original creation date
  deleted_at: string;          // Soft delete date
  purged_at: string;           // Hard delete date
  deleted_by: string;          // USR-* who initiated delete
  tenant_id: string;           // ACC-* for tenant context
  metadata?: {                 // Minimal audit info
    name_hash?: string;        // For audit lookup
    deletion_reason?: string;
  };
}
```

4.3 Tombstone Storage

```sql
-- Tombstone table (permanent)
CREATE TABLE tombstones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id VARCHAR(16) NOT NULL UNIQUE,
  entity_type VARCHAR(50) NOT NULL,
  entity_code CHAR(3) NOT NULL,
  tenant_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ NOT NULL,
  purged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_by UUID,
  metadata JSONB,
  
);

CREATE INDEX idx_tombstones_tenant ON tombstones (tenant_id);
CREATE INDEX idx_tombstones_type ON tombstones (entity_type);
CREATE INDEX idx_tombstones_purged ON tombstones (purged_at);

-- Tombstones are never deleted (CC-PID reservation)
```

4.4 Accessing Purged Resources

Purged resources also return 410 Gone:

```http
GET /api/v1/projects/PRJ-X2M8KD-7

HTTP/1.1 410 Gone
Content-Type: application/json

{
  "error": {
    "code": "RESOURCE_PERMANENTLY_DELETED",
    "message": "This project has been permanently deleted",
    "details": {
      "resource_type": "project",
      "resource_id": "PRJ-X2M8KD-7",
      "purged_at": "2026-02-16T12:00:00Z",
      "restorable": false
    }
  }
}
```

4.5 Immediate Hard Delete

Some resources skip soft delete:

| Resource | Reason | Behavior |
|----------|--------|----------|
| Session | Security | Immediate purge |
| API Key | Security | Immediate purge on revoke |
| Password reset token | Security | Immediate after use |
| MFA recovery code | Security | Immediate after use |
| Cached data | Performance | Immediate purge |

## 5. HTTP Status Codes

Consistent status codes communicate resource state.

5.1 Status Code Matrix

| Scenario | Status | Description |
|----------|--------|-------------|
| Resource exists, ACTIVE | 200 OK | Normal response |
| Resource exists, SUSPENDED | 200 OK | Include state indicator |
| Resource exists, ARCHIVED | 200 OK | Include state indicator |
| Resource exists, DELETED | 410 Gone | Soft deleted |
| Resource exists, PURGED | 410 Gone | Hard deleted |
| Resource never existed | 404 Not Found | Invalid CC-PID |
| Invalid CC-PID format | 400 Bad Request | Malformed identifier |
| No permission | 403 Forbidden | Access denied |

5.2 410 Gone vs 404 Not Found

| Response | Meaning | When to Use |
|----------|---------|-------------|
| 410 Gone | Resource existed but was removed | CC-PID recognized, state is DELETED or PURGED |
| 404 Not Found | Resource does not exist | CC-PID not recognized, never existed |

Implementation:

```typescript
async function getResource(id: string): Promise<Response> {
  // 1. Validate CC-PID format
  const validation = validateCCPID(id);
  if (!validation.valid) {
    return { status: 400, error: 'INVALID_ID_FORMAT' };
  }
  
  // 2. Check tombstones (purged resources)
  const tombstone = await getTombstone(id);
  if (tombstone) {
    return {
      status: 410,
      error: {
        code: 'RESOURCE_PERMANENTLY_DELETED',
        details: {
          purged_at: tombstone.purged_at,
          restorable: false
        }
      }
    };
  }
  
  // 3. Check main table
  const resource = await getResourceFromTable(id);
  if (!resource) {
    return { status: 404, error: 'RESOURCE_NOT_FOUND' };
  }
  
  // 4. Check lifecycle state
  if (resource.lifecycle_state === 'D') {
    return {
      status: 410,
      error: {
        code: 'RESOURCE_DELETED',
        details: {
          deleted_at: resource.deleted_at,
          restorable: true,
          restorable_until: resource.purge_at
        }
      }
    };
  }
  
  // 5. Return resource
  return { status: 200, data: resource };
}
```

5.3 Response Headers

Include lifecycle information in headers:

**Active, Suspended, or Archived resources (200 OK):**
```http
HTTP/1.1 200 OK
X-Resource-State: ACTIVE
```

**Deleted resources (410 Gone, restorable):**
```http
HTTP/1.1 410 Gone
X-Resource-State: DELETED
X-Resource-Restorable: true
X-Resource-Restorable-Until: 2026-02-16T12:00:00Z
```

**Purged resources (410 Gone, not restorable):**
```http
HTTP/1.1 410 Gone
X-Resource-State: PURGED
X-Resource-Restorable: false
```

## 6. Suspension

Suspension temporarily disables a resource without deletion.

6.1 Suspension Reasons

| Reason Code | Description | Auto-Resolve |
|-------------|-------------|--------------|
| `BILLING_OVERDUE` | Payment past due | On payment |
| `POLICY_VIOLATION` | Terms violation | Manual |
| `SECURITY_CONCERN` | Security issue | Manual |
| `ABUSE_DETECTED` | Abuse/spam | Manual |
| `ADMIN_ACTION` | Admin decision | Manual |
| `INACTIVITY` | Extended inactivity | Manual |
| `MAINTENANCE` | System maintenance | Automatic |

6.2 Suspension Behavior

```http
POST /api/v1/projects/PRJ-X2M8KD-7/suspend
Authorization: Bearer {token}

{
  "reason": "BILLING_OVERDUE",
  "message": "Payment overdue for 30 days"
}

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "lifecycle_state": "SUSPENDED",
      "suspended_at": "2026-01-17T12:00:00Z",
      "suspension_reason": "BILLING_OVERDUE"
    }
  }
}
```

6.3 Suspended Resource Access

```http
GET /api/v1/projects/PRJ-X2M8KD-7

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "name": "Customer Portal",
      "lifecycle_state": "SUSPENDED",
      "suspended_at": "2026-01-17T12:00:00Z",
      "suspension_reason": "BILLING_OVERDUE"
    }
  },
  "meta": {
    "warnings": [
      {
        "code": "RESOURCE_SUSPENDED",
        "message": "This project is suspended and read-only"
      }
    ]
  }
}
```

Write operations fail:

```http
PATCH /api/v1/projects/PRJ-X2M8KD-7

HTTP/1.1 403 Forbidden

{
  "error": {
    "code": "RESOURCE_SUSPENDED",
    "message": "Cannot modify suspended resource",
    "details": {
      "suspension_reason": "BILLING_OVERDUE",
      "suspended_at": "2026-01-17T12:00:00Z"
    }
  }
}
```

6.4 Reactivation

```http
POST /api/v1/projects/PRJ-X2M8KD-7/reactivate
Authorization: Bearer {token}

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "lifecycle_state": "ACTIVE",
      "reactivated_at": "2026-01-17T14:00:00Z"
    }
  }
}
```

## 7. Archival

Archival moves inactive resources to long-term storage.

7.1 Archive Behavior

```http
POST /api/v1/projects/PRJ-X2M8KD-7/archive
Authorization: Bearer {token}

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "lifecycle_state": "ARCHIVED",
      "archived_at": "2026-01-17T12:00:00Z"
    }
  }
}
```

7.2 Archived Resource Access

Read-only access:

```http
GET /api/v1/projects/PRJ-X2M8KD-7

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "name": "Customer Portal",
      "lifecycle_state": "ARCHIVED",
      "archived_at": "2026-01-17T12:00:00Z"
    }
  },
  "meta": {
    "warnings": [
      {
        "code": "RESOURCE_ARCHIVED",
        "message": "This project is archived and read-only"
      }
    ]
  }
}
```

7.3 Archive Listing

Archived resources hidden by default:

```http
GET /api/v1/projects
→ Returns only ACTIVE projects

GET /api/v1/projects?include_archived=true
→ Returns ACTIVE + ARCHIVED projects

GET /api/v1/projects?lifecycle_state=ARCHIVED
→ Returns only ARCHIVED projects
```

7.4 Restoration from Archive

```http
POST /api/v1/projects/PRJ-X2M8KD-7/restore
Authorization: Bearer {token}

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "lifecycle_state": "ACTIVE",
      "restored_at": "2026-01-17T14:00:00Z"
    }
  }
}
```

7.5 Auto-Archive Policy

Resources can be archived automatically:

```typescript
interface ArchivePolicy {
  resource_type: string;
  inactivity_days: number;      // Days since last activity
  archive_after: number;        // Days in SUSPENDED before archive
  delete_after_archive?: number;// Days in ARCHIVED before delete
  exclude_conditions?: string[]; // Don't archive if condition met
}

const ARCHIVE_POLICIES: ArchivePolicy[] = [
  {
    resource_type: 'project',
    inactivity_days: 365,
    archive_after: 90,
    delete_after_archive: 2555, // 7 years
  },
  {
    resource_type: 'task',
    inactivity_days: 180,
    archive_after: 30,
  },
];
```

## 8. Restoration

Restoration returns deleted resources to active state.

8.1 Restoration Endpoint

```http
POST /api/v1/projects/PRJ-X2M8KD-7/restore
Authorization: Bearer {token}

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "lifecycle_state": "ACTIVE",
      "restored_at": "2026-01-17T14:00:00Z",
      "restored_by": "USR-4Q7T9P-K"
    }
  },
  "meta": {
    "message": "Project successfully restored"
  }
}
```

8.2 Restoration Rules

| Rule | Description |
|------|-------------|
| Grace period | Must be within grace period |
| Parent state | Parent must be ACTIVE |
| Permissions | Requires delete permission |
| Cascade | Children restored with parent |
| Audit | Logged as lifecycle event |

8.3 Restoration Failures

**Grace period expired:**
```http
POST /api/v1/projects/PRJ-X2M8KD-7/restore

HTTP/1.1 410 Gone

{
  "error": {
    "code": "GRACE_PERIOD_EXPIRED",
    "message": "Cannot restore. Grace period expired on 2026-02-16.",
    "details": {
      "deleted_at": "2026-01-17T12:00:00Z",
      "purge_at": "2026-02-16T12:00:00Z"
    }
  }
}
```

**Parent not active:**
```http
POST /api/v1/tasks/TSK-9F4K7Q-M/restore

HTTP/1.1 409 Conflict

{
  "error": {
    "code": "PARENT_NOT_ACTIVE",
    "message": "Cannot restore. Parent project is deleted.",
    "details": {
      "parent_id": "PRJ-X2M8KD-7",
      "parent_state": "DELETED"
    },
    "actions": {
      "restore_parent": "POST /api/v1/projects/PRJ-X2M8KD-7/restore"
    }
  }
}
```

8.4 Cascade Restoration

When restoring a parent, children can optionally be restored:

```http
POST /api/v1/projects/PRJ-X2M8KD-7/restore
Content-Type: application/json

{
  "restore_children": true,
  "child_types": ["task", "milestone"]  // Optional filter
}

HTTP/1.1 200 OK

{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "lifecycle_state": "ACTIVE"
  },
  "meta": {
    "restored_children": {
      "task": 15,
      "milestone": 3
    }
  }
}
```

## 9. Cascade Behavior

Parent lifecycle transitions cascade to children.

9.1 Cascade Matrix

| Parent Transition | Child Behavior |
|-------------------|----------------|
| ACTIVE → SUSPENDED | Children suspended |
| ACTIVE → DELETED | Children deleted |
| SUSPENDED → ACTIVE | Children activated (if were suspended) |
| SUSPENDED → DELETED | Children deleted |
| DELETED → ACTIVE | Children may restore (optional) |
| DELETED → PURGED | Children purged |

9.2 Cascade Rules

```typescript
interface CascadeRule {
  parent_type: string;
  child_type: string;
  on_delete: 'cascade' | 'restrict' | 'set_null';
  on_suspend: 'cascade' | 'ignore';
  on_archive: 'cascade' | 'ignore';
  on_restore: 'cascade' | 'ignore' | 'optional';
}

const CASCADE_RULES: CascadeRule[] = [
  {
    parent_type: 'project',
    child_type: 'task',
    on_delete: 'cascade',
    on_suspend: 'cascade',
    on_archive: 'cascade',
    on_restore: 'optional'
  },
  {
    parent_type: 'project',
    child_type: 'invoice',
    on_delete: 'restrict',  // Cannot delete project with unpaid invoices
    on_suspend: 'ignore',
    on_archive: 'ignore',
    on_restore: 'ignore'
  },
  {
    parent_type: 'account',
    child_type: 'project',
    on_delete: 'cascade',
    on_suspend: 'cascade',
    on_archive: 'ignore',
    on_restore: 'cascade'
  }
];
```

9.3 Cascade Prevention

Some transitions blocked by children:

```http
DELETE /api/v1/projects/PRJ-X2M8KD-7

HTTP/1.1 409 Conflict

{
  "error": {
    "code": "CASCADE_BLOCKED",
    "message": "Cannot delete project with unpaid invoices",
    "details": {
      "blocking_resources": [
        {
          "type": "invoice",
          "id": "INV-4Q7T9P-K",
          "reason": "UNPAID"
        }
      ]
    },
    "actions": {
      "view_blockers": "GET /api/v1/projects/PRJ-X2M8KD-7/invoices?status=unpaid"
    }
  }
}
```

## 10. Implementation Reference

10.1 Lifecycle Service

```typescript
// lifecycle-service.ts

import { EventEmitter } from 'events';

type LifecycleState = 'ACTIVE' | 'SUSPENDED' | 'ARCHIVED' | 'DELETED' | 'PURGED';

interface TransitionOptions {
  reason?: string;
  cascade?: boolean;
  notify?: boolean;
}

interface TransitionResult {
  success: boolean;
  resource: Resource;
  cascaded?: { type: string; count: number }[];
  error?: string;
}

export class LifecycleService extends EventEmitter {
  
  private static ALLOWED_TRANSITIONS: Record<LifecycleState, LifecycleState[]> = {
    'ACTIVE': ['SUSPENDED', 'ARCHIVED', 'DELETED'],
    'SUSPENDED': ['ACTIVE', 'ARCHIVED', 'DELETED'],
    'ARCHIVED': ['ACTIVE', 'DELETED'],
    'DELETED': ['ACTIVE', 'PURGED'],
    'PURGED': []
  };
  
  private static GRACE_PERIODS: Record<string, number> = {
    'user': 30,
    'project': 30,
    'task': 14,
    'comment': 7,
    'api_key': 0,
    'session': 0
  };
  
  /**
   * Transition a resource to a new state
   */
  async transition(
    resource: Resource,
    targetState: LifecycleState,
    actor: string,
    options: TransitionOptions = {}
  ): Promise<TransitionResult> {
    const currentState = resource.lifecycle_state as LifecycleState;
    
    // Validate transition
    if (!this.isAllowedTransition(currentState, targetState)) {
      return {
        success: false,
        resource,
        error: `Invalid transition: ${currentState} → ${targetState}`
      };
    }
    
    // Check legal holds for deletion
    if (targetState === 'DELETED' || targetState === 'PURGED') {
      if (await this.hasLegalHold(resource)) {
        return {
          success: false,
          resource,
          error: 'Resource is under legal hold'
        };
      }
    }
    
    // Check grace period for restoration
    if (currentState === 'DELETED' && targetState === 'ACTIVE') {
      if (resource.purge_at && new Date() > new Date(resource.purge_at)) {
        return {
          success: false,
          resource,
          error: 'Grace period expired'
        };
      }
    }
    
    // Check parent state
    if (targetState === 'ACTIVE' && resource.parent_id) {
      const parent = await this.getResource(resource.parent_id);
      if (parent.lifecycle_state !== 'ACTIVE') {
        return {
          success: false,
          resource,
          error: 'Parent resource is not active'
        };
      }
    }
    
    // Perform transition
    const updated = await this.performTransition(resource, targetState, actor, options);
    
    // Handle cascade
    let cascaded: { type: string; count: number }[] = [];
    if (options.cascade !== false) {
      cascaded = await this.cascadeTransition(resource, targetState, actor, options);
    }
    
    // Emit event
    this.emit('transition', {
      resource_id: resource.public_id,
      resource_type: resource.type,
      from: currentState,
      to: targetState,
      actor,
      cascaded
    });
    
    return { success: true, resource: updated, cascaded };
  }
  
  /**
   * Soft delete a resource
   */
  async softDelete(
    resource: Resource,
    actor: string,
    options: TransitionOptions = {}
  ): Promise<TransitionResult> {
    const gracePeriod = LifecycleService.GRACE_PERIODS[resource.type] ?? 30;
    
    const result = await this.transition(resource, 'DELETED', actor, {
      ...options,
      cascade: options.cascade ?? true
    });
    
    if (result.success) {
      // Set purge date
      await this.setPurgeDate(resource, gracePeriod);
    }
    
    return result;
  }
  
  /**
   * Restore a deleted resource
   */
  async restore(
    resource: Resource,
    actor: string,
    options: TransitionOptions & { restore_children?: boolean } = {}
  ): Promise<TransitionResult> {
    const result = await this.transition(resource, 'ACTIVE', actor, options);
    
    if (result.success) {
      // Clear deletion metadata
      await this.clearDeletionMetadata(resource);
      
      // Optionally restore children
      if (options.restore_children) {
        await this.restoreChildren(resource, actor);
      }
    }
    
    return result;
  }
  
  /**
   * Purge expired deleted resources
   */
  async purgeExpired(): Promise<{ purged: number; errors: string[] }> {
    const expired = await this.getExpiredResources();
    let purged = 0;
    const errors: string[] = [];
    
    for (const resource of expired) {
      try {
        // Final legal hold check
        if (await this.hasLegalHold(resource)) {
          continue;
        }
        
        // Create tombstone
        await this.createTombstone(resource);
        
        // Hard delete
        await this.hardDelete(resource);
        
        purged++;
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        errors.push(`${resource.public_id}: ${msg}`);
      }
    }
    
    return { purged, errors };
  }
  
  // Helper methods
  
  private isAllowedTransition(from: LifecycleState, to: LifecycleState): boolean {
    return LifecycleService.ALLOWED_TRANSITIONS[from].includes(to);
  }
  
  private async performTransition(
    resource: Resource,
    targetState: LifecycleState,
    actor: string,
    options: TransitionOptions
  ): Promise<Resource> {
    const updates: Partial<Resource> = {
      lifecycle_state: targetState,
      lifecycle_changed_at: new Date().toISOString(),
      lifecycle_changed_by: actor
    };
    
    // State-specific fields
    switch (targetState) {
      case 'DELETED':
        updates.deleted_at = new Date().toISOString();
        break;
      case 'SUSPENDED':
        updates.suspended_at = new Date().toISOString();
        updates.suspension_reason = options.reason;
        break;
      case 'ARCHIVED':
        updates.archived_at = new Date().toISOString();
        break;
      case 'ACTIVE':
        // Clear state-specific fields
        updates.deleted_at = null;
        updates.suspended_at = null;
        updates.archived_at = null;
        updates.purge_at = null;
        updates.suspension_reason = null;
        break;
    }
    
    return await this.updateResource(resource.public_id, updates);
  }
  
  private async cascadeTransition(
    resource: Resource,
    targetState: LifecycleState,
    actor: string,
    options: TransitionOptions
  ): Promise<{ type: string; count: number }[]> {
    const results: { type: string; count: number }[] = [];
    const children = await this.getChildren(resource);
    
    for (const [type, childResources] of Object.entries(children)) {
      let count = 0;
      for (const child of childResources) {
        await this.transition(child, targetState, actor, {
          ...options,
          cascade: true
        });
        count++;
      }
      results.push({ type, count });
    }
    
    return results;
  }
  
  private async createTombstone(resource: Resource): Promise<void> {
    await db.query(`
      INSERT INTO tombstones (
        public_id, entity_type, entity_code, tenant_id,
        created_at, deleted_at, deleted_by, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      resource.public_id,
      resource.type,
      resource.public_id.split('-')[0],
      resource.tenant_id,
      resource.created_at,
      resource.deleted_at,
      resource.lifecycle_changed_by,
      { name_hash: hash(resource.name) }
    ]);
  }
}
```

10.2 Database Schema

```sql
-- Lifecycle columns (add to all resource tables)
CREATE TYPE lifecycle_state AS ENUM ('A', 'S', 'R', 'D', 'P');

-- Template for resource tables
CREATE TABLE resources_template (
  -- Primary identity
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id VARCHAR(16) NOT NULL UNIQUE,
  tenant_id UUID NOT NULL,
  
  -- Resource data
  name VARCHAR(200) NOT NULL,
  -- ... other columns
  
  -- Lifecycle management
  lifecycle_state lifecycle_state NOT NULL DEFAULT 'A',
  lifecycle_changed_at TIMESTAMPTZ,
  lifecycle_changed_by UUID,
  
  -- State-specific timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  purge_at TIMESTAMPTZ,
  suspended_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  
  -- State-specific data
  suspension_reason VARCHAR(50),
  
);

CREATE INDEX idx_lifecycle_state ON resources_template (lifecycle_state);
CREATE INDEX idx_purge_at ON resources_template (purge_at) WHERE lifecycle_state = 'D';
CREATE INDEX idx_tenant_active ON resources_template (tenant_id) WHERE lifecycle_state = 'A';

-- Tombstones (permanent) — see section 4.3 for canonical schema
-- Repeated here for consolidated reference
CREATE TABLE tombstones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id VARCHAR(16) NOT NULL UNIQUE,
  entity_type VARCHAR(50) NOT NULL,
  entity_code CHAR(3) NOT NULL,
  tenant_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ NOT NULL,
  purged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_by UUID,
  metadata JSONB
);

CREATE INDEX idx_tombstones_tenant ON tombstones (tenant_id);
CREATE INDEX idx_tombstones_type ON tombstones (entity_type);
CREATE INDEX idx_tombstones_purged ON tombstones (purged_at);

-- Lifecycle events (audit)
CREATE TABLE lifecycle_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(16) NOT NULL,
  previous_state lifecycle_state,
  new_state lifecycle_state NOT NULL,
  trigger VARCHAR(20) NOT NULL,
  triggered_by UUID,
  reason TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
);

CREATE INDEX idx_lifecycle_events_resource ON lifecycle_events (resource_id);
CREATE INDEX idx_lifecycle_events_time ON lifecycle_events (created_at);

-- Purge job (scheduled)
CREATE OR REPLACE FUNCTION purge_expired_resources() RETURNS void AS $$
DECLARE
  r RECORD;
BEGIN
  -- Find expired resources across all tables
  FOR r IN 
    SELECT 'projects' as table_name, id, public_id, tenant_id, 
           name, created_at, deleted_at, lifecycle_changed_by
    FROM projects 
    WHERE lifecycle_state = 'D' AND purge_at < NOW()
    
    UNION ALL
    
    SELECT 'tasks' as table_name, id, public_id, tenant_id,
           name, created_at, deleted_at, lifecycle_changed_by
    FROM tasks
    WHERE lifecycle_state = 'D' AND purge_at < NOW()
    
    -- Add other tables...
  LOOP
    -- Check legal holds (resource-specific and type-wide)
    IF NOT EXISTS (
      SELECT 1 FROM legal_holds lh
      JOIN legal_hold_scope lhs ON lh.id = lhs.hold_id
      WHERE lh.status = 'active'
        AND lhs.data_type = r.table_name
        AND (lhs.resource_id IS NULL OR lhs.resource_id = r.public_id)
    ) THEN
      -- Create tombstone
      INSERT INTO tombstones (public_id, entity_type, entity_code, tenant_id,
                              created_at, deleted_at, deleted_by)
      VALUES (r.public_id, r.table_name, SPLIT_PART(r.public_id, '-', 1),
              r.tenant_id, r.created_at, r.deleted_at, r.lifecycle_changed_by);
      
      -- Hard delete
      EXECUTE format('DELETE FROM %I WHERE id = $1', r.table_name) USING r.id;
      
      -- Log event
      INSERT INTO lifecycle_events (resource_type, resource_id, previous_state,
                                    new_state, trigger, triggered_by)
      VALUES (r.table_name, r.public_id, 'D', 'P', 'automatic', NULL);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Schedule purge job (hourly)
-- SELECT cron.schedule('purge-expired', '0 * * * *', 'SELECT purge_expired_resources()');
```

10.3 Error Codes

| Code | HTTP | Description |
|------|------|-------------|
| RESOURCE_DELETED | 410 | Resource is soft-deleted |
| RESOURCE_PERMANENTLY_DELETED | 410 | Resource is purged |
| RESOURCE_SUSPENDED | 403 | Write operation on suspended resource |
| RESOURCE_ARCHIVED | 403 | Write operation on archived resource |
| INVALID_STATE_TRANSITION | 400 | Transition not allowed |
| GRACE_PERIOD_EXPIRED | 410 | Cannot restore, past purge date |
| PARENT_NOT_ACTIVE | 409 | Parent must be active first |
| CASCADE_BLOCKED | 409 | Children prevent transition |
| LEGAL_HOLD_ACTIVE | 403 | Resource under legal hold |

---

## Appendix A: Developer Cheat Sheet

Print it. Pin it. Reference it.

### Lifecycle States

| State | Code | API Response | Writable |
|-------|------|--------------|----------|
| ACTIVE | A | 200 OK | ✓ |
| SUSPENDED | S | 200 OK (read-only) | ✗ |
| ARCHIVED | R | 200 OK (read-only) | ✗ |
| DELETED | D | 410 Gone | ✗ |
| PURGED | P | 410 Gone | ✗ |

### State Transitions

```
ACTIVE → SUSPENDED ✓
ACTIVE → ARCHIVED  ✓
ACTIVE → DELETED   ✓

SUSPENDED → ACTIVE   ✓
SUSPENDED → ARCHIVED ✓
SUSPENDED → DELETED  ✓

ARCHIVED → ACTIVE  ✓
ARCHIVED → DELETED ✓

DELETED → ACTIVE   ✓ (grace period)
DELETED → PURGED   ✓ (auto)

PURGED → (terminal state)
```

### Grace Periods

| Resource | Grace Period |
|----------|--------------|
| User | 30 days |
| Project | 30 days |
| Task | 14 days |
| Comment | 7 days |
| API Key | Immediate |
| Session | Immediate |

### HTTP Status Codes

```
200 OK          → ACTIVE, SUSPENDED, ARCHIVED
410 Gone        → DELETED, PURGED
404 Not Found   → Never existed
403 Forbidden   → Write to read-only state
409 Conflict    → Cascade blocked
```

### 410 vs 404

```
410 Gone:
  - CC-PID recognized
  - Resource was deleted
  - May include restore info

404 Not Found:
  - CC-PID not recognized
  - Never existed
```

### Soft Delete Flow

```
1. Validate permissions
2. Check legal holds
3. Set lifecycle_state = 'D'
4. Set deleted_at = NOW()
5. Set purge_at = NOW() + grace
6. Cascade to children
7. Emit event
8. Return 200 OK
```

### Restore Flow

```
1. Check grace period
2. Check parent is ACTIVE
3. Set lifecycle_state = 'A'
4. Clear deletion fields
5. Optionally restore children
6. Emit event
7. Return 200 OK
```

### Tombstone Fields

```typescript
{
  public_id: "PRJ-X2M8KD-7",
  entity_type: "project",
  created_at: "2025-01-01",
  deleted_at: "2026-01-17",
  purged_at: "2026-02-16"
}
```

### API Endpoints

```
DELETE /resource/{id}         → Soft delete
POST   /resource/{id}/restore → Restore
POST   /resource/{id}/suspend → Suspend
POST   /resource/{id}/reactivate → Reactivate
POST   /resource/{id}/archive → Archive
```

### Query Parameters

```
?include_deleted=true    → Include DELETED
?include_archived=true   → Include ARCHIVED
?lifecycle_state=DELETED → Filter by state
```

### Response Headers

```
X-Resource-State: ACTIVE|SUSPENDED|ARCHIVED|DELETED|PURGED
X-Resource-Restorable: true|false
X-Resource-Restorable-Until: ISO-8601
```

### Cascade Rules

```
Parent deleted → Children deleted
Parent suspended → Children suspended
Parent restored → Children optionally restored
Child cannot be "more alive" than parent
```

### What You MUST Do

- **ALWAYS:** Soft delete by default
- **ALWAYS:** Return 410 for deleted resources
- **ALWAYS:** Return 404 for unknown IDs
- **ALWAYS:** Check legal holds before delete
- **ALWAYS:** Create tombstones on purge
- **ALWAYS:** Log all lifecycle events
- **ALWAYS:** Cascade to children

### What You MUST NOT Do

- **NEVER:** Hard delete without grace period
- **NEVER:** Reuse CC-PIDs (ever)
- **NEVER:** Return 404 for deleted resources
- **NEVER:** Allow writes to suspended/archived
- **NEVER:** Skip legal hold checks
- **NEVER:** Delete without cascade check

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Lifecycle States | PARTIAL | Basic soft delete exists |
| 410 Gone Response | PARTIAL | Added to some endpoints |
| Tombstone Table | PENDING | Design complete |
| Grace Periods | PARTIAL | Fixed 30 days |
| Cascade Delete | PARTIAL | Basic cascade |
| Suspension | PENDING | Not implemented |
| Archival | PENDING | Not implemented |
| Restore API | PARTIAL | Basic restore |
| Purge Job | PENDING | Manual only |
| Lifecycle Events | PENDING | Not logged |

### Migration Path

1. **Phase 1**: Add lifecycle columns to all tables
2. **Phase 2**: Implement tombstone table
3. **Phase 3**: Standardize 410 responses
4. **Phase 4**: Implement purge job
5. **Phase 5**: Add suspension/archival
6. **Phase 6**: Lifecycle event logging

---

## 11. Related Documents

| Document | Relationship |
|----------|-------------|
| 2.1 CYBERCUBE Security Policy (STD-SEC-001) | Parent policy |
| 3.3 Data Classification and Retention Standard | Peer — retention periods and classification levels |
| 3.7 Legal Hold and eDiscovery Standard | Peer — legal hold enforcement referenced in purge logic |
| 2.4 Authorization and Access Control Standard | Peer — permission checks on lifecycle transitions |
| 5.1 Naming and Identifier Standard | Peer — CC-PID format and tombstone reservation |
| 5.2 API Design Standard | Peer — HTTP status codes and response conventions |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |
