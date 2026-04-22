## Glossary

> **Note:** This glossary is provided as a quick reference for terms used throughout the standard that follows.

This glossary defines key terms used throughout the CYBERCUBE Authorization & Access
Control Standard.

All definitions are normative unless stated otherwise.

A

Access Control Entry (ACE)

A single permission grant or denial binding a principal to an action on a resource.

Structure:

```
{principal, action, resource, effect, conditions}
```

An ACE is the atomic unit of access control evaluation.

Access Control List (ACL)

A collection of Access Control Entries attached to a resource, defining who can perform
what actions.

CYBERCUBE uses ACLs for:

- Resource-level permissions (explicit grants)
- Ownership inheritance

Note: ACLs supplement, not replace, RBAC policies.

Action

An operation that can be performed on a resource.

Format: `<domain>:<operation>`

Examples:

- `project:read`
- `project:update`
- `invoice:create`
- `user:delete`

Actions are hierarchical:

- `project:*` implies all project actions
- `*:*` implies all actions (superuser)

Attribute-Based Access Control (ABAC)

An access control model where permissions are evaluated based on attributes of:

- Principal (user attributes: department, clearance, location)
- Resource (sensitivity, owner, status)
- Environment (time, IP, device)
- Action (operation type)

CYBERCUBE uses ABAC for:

- Fine-grained conditional access
- Context-aware policies
- Cross-tenant rules

Authorization (AuthZ)

The process of determining whether an authenticated principal is permitted to perform
a specific action on a specific resource.

Authorization is SEPARATE from authentication.
Authorization is evaluated on EVERY request.

C

Condition

A constraint that must be satisfied for a policy to apply.

Types:

- Time-based (`time.hour >= 9 AND time.hour <= 17`)
- IP-based (`request.ip IN allowed_ranges`)
- Resource state (`resource.status != 'archived'`)
- Relationship (`principal.id == resource.owner_id`)

Conditions enable ABAC within RBAC frameworks.

Cross-Tenant Isolation

The security boundary preventing one tenant's data and operations from being
accessed by another tenant.

Rules:

- MUST be enforced at query layer
- MUST NOT rely solely on application logic
- MUST be auditable

D

Default Deny

The security principle where access is denied unless explicitly granted.

CYBERCUBE enforces default deny:

- No permission = deny
- Ambiguous policy = deny
- Evaluation error = deny

Delegation

The transfer of permissions from one principal to another, within defined limits.

Rules:

- Delegator cannot grant permissions they don't have
- Delegation chains have maximum depth (default: 2)
- Delegated permissions are revocable
- Delegation requires audit logging

E

Effect

The result of a policy evaluation: ALLOW or DENY.

Evaluation order:

1. Explicit DENY wins (if any deny matches)
2. Explicit ALLOW required (if no allow matches → deny)
3. Default DENY (no matching policy → deny)

Entitlement

A granted right to perform an action, derived from role membership or explicit grant.

Entitlements are computed, not stored:

```
user_entitlements = union(role_permissions) + explicit_grants - explicit_denials
```

G

Grant

An explicit permission assignment binding a principal to an action on a resource.

Types:

- Role grant (assign role to principal)
- Permission grant (assign permission directly)
- Resource grant (assign access to specific resource)

I

Inheritance

The mechanism by which permissions flow from parent to child in a hierarchy.

CYBERCUBE supports:

- Role inheritance (child role inherits parent permissions)
- Resource inheritance (child resource inherits parent ACL)
- Organizational inheritance (team inherits org permissions)

Inheritance can be blocked:

- `inherit: false` on resource ACL
- Explicit deny on child

L

Least Privilege

The security principle of granting only the minimum permissions required to perform a task.

Implementation:

- Start with no permissions
- Grant specific actions, not wildcards
- Prefer time-limited grants
- Regular access reviews

M

Multi-Tenancy

A system architecture where multiple tenants share infrastructure while maintaining
data and access isolation.

CYBERCUBE multi-tenancy model:

- Tenant = Account (ACC)
- Every resource belongs to exactly one tenant
- Cross-tenant access requires explicit federation

O

Ownership

The relationship between a principal and resources they created or are responsible for.

Ownership grants:

- Full control over owned resources (by default)
- Ability to grant access to others
- Responsibility for resource lifecycle

Ownership types:

- Creator ownership (automatic)
- Assigned ownership (transferred)
- Team ownership (shared)

P

Permission (PRM)

A specific right to perform an action on a resource type.

Entity Code: PRM (CC-PID format: `PRM-XXXXXX-X`)

Structure:

```
{
  code: "project:update",
  name: "Update Project",
  description: "Modify project details",
  resource_type: "project",
  action: "update"
}
```

Permissions are:

- Atomic (single action)
- Immutable once created
- Never deleted (only deprecated)

Policy (POL)

A rule that governs access decisions, combining conditions with effects.

Entity Code: POL (CC-PID format: `POL-XXXXXX-X`)

Structure:

```
{
  name: "allow-team-project-read",
  effect: "ALLOW",
  principals: ["role:team_member"],
  actions: ["project:read", "project:list"],
  resources: ["project:*"],
  conditions: {
    "resource.team_id": {"equals": "principal.team_id"}
  }
}
```

Policies are evaluated in order:

1. Explicit DENY policies
2. Explicit ALLOW policies
3. Default DENY

Principal

An entity that can be granted permissions and perform actions.

Types:

- User (USR)
- Service Account
- API Key
- Role (as principal in policy)
- Group/Team

Privilege Escalation

An attack where a principal gains permissions beyond their authorized level.

Prevention:

- Strict role hierarchy validation
- No self-assignment of roles
- Delegation limits
- Audit logging of permission changes

R

Resource

Any entity or object that can be accessed or manipulated.

Resources are identified by:

- Type (e.g., `project`, `invoice`, `user`)
- ID (CC-PID or internal UUID)
- Tenant (ACC)

Resource hierarchy example:

```
account (ACC)
  └── project (PRJ)
        ├── task (TSK)
        ├── milestone (MLN)
        └── deliverable (DLV)
```

Role (RLE)

A named collection of permissions that can be assigned to principals.

Entity Code: RLE (CC-PID format: `RLE-XXXXXX-X`)

Roles provide:

- Grouping of related permissions
- Simplified administration
- Consistent access patterns

Role types:

- System roles (predefined, immutable)
- Custom roles (tenant-defined)
- Scoped roles (resource-specific)

Role-Based Access Control (RBAC)

An access control model where permissions are assigned to roles, and roles are
assigned to principals.

Benefits:

- Simplified administration
- Audit-friendly
- Separation of duties
- Scalable

S

Scope

The boundary within which a permission or role applies.

Scope types:

- Global (entire system)
- Tenant (single account)
- Resource (specific resource or hierarchy)
- Temporal (time-limited)

Separation of Duties (SoD)

A control requiring multiple principals to complete sensitive operations.

Examples:

- Approval workflows (requester ≠ approver)
- Financial controls (creator ≠ reviewer)
- Admin actions (dual approval)

Service Account

A non-human principal used for system-to-system authentication and authorization.

Rules:

- Unique identity per service
- Minimal permissions (least privilege)
- No interactive login
- Key rotation required

T

Tenant

A logical isolation boundary representing a customer account.

In CYBERCUBE: Tenant = Account (ACC)

Tenant isolation rules:

- Data: tenant_id on all rows
- Queries: mandatory tenant filter
- APIs: tenant context validation
- Audit: tenant in all logs

Trust Boundary

A logical perimeter where security policies change.

CYBERCUBE trust boundaries:

- Tenant boundary (highest isolation)
- Service boundary (API contracts)
- Network boundary (TLS termination)

Z

Zanzibar Model

A relationship-based access control model (ReBAC) pioneered by Google.

Core concept: permissions derived from relationships between objects.

Example:

```
document:readme#viewer@user:alice
  ↓
"Alice is a viewer of document readme"
```

CYBERCUBE adopts Zanzibar concepts for:

- Ownership relationships
- Team membership
- Resource hierarchies

---

# CYBERCUBE Authorization & Access Control Standard (v1)

**Standard ID:** STD-SEC-004
**Parent Document:** 2.1 CYBERCUBE Security Policy (STD-SEC-001)
**Status:** Active
**Effective:** 2026-01-17
**Classification:** INTERNAL
**Owner:** Security Team
**Applies to:** All CYBERCUBE products, services, and APIs requiring access control

## 0. Purpose and Design Principles

This standard defines how authorization decisions are made across CYBERCUBE systems.
It establishes the access control model, policy structure, and enforcement requirements.

Industry alignment:

- AWS IAM (policy structure, evaluation logic)
- Google Zanzibar (relationship-based access)
- Open Policy Agent (policy language concepts)
- NIST RBAC (role hierarchy, separation of duties)

Design principles:

1. **Default Deny** — Access is denied unless explicitly granted
2. **Least Privilege** — Grant minimum permissions required
3. **Separation of Concerns** — AuthN ≠ AuthZ ≠ data access
4. **Defense in Depth** — Multiple enforcement points
5. **Auditability** — All decisions logged and traceable
6. **Tenant Isolation** — Cross-tenant access impossible by default

This document does NOT define:

- Authentication mechanisms — see Authentication & Identity Standard
- Public Entity IDs — see Naming & Identifier Standard
- API security patterns — see API Design & Versioning Standard
- Data encryption — see Data Classification & Retention Standard

## 1. Access Control Model

CYBERCUBE implements a hybrid access control model combining:

- **RBAC** (Role-Based Access Control) — primary model
- **ABAC** (Attribute-Based Access Control) — conditional refinement
- **ReBAC** (Relationship-Based Access Control) — ownership and hierarchy

1.1 Model Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                    POLICY LAYER                         │
│  (POL entities - conditions, effects, combinations)     │
├─────────────────────────────────────────────────────────┤
│                    ROLE LAYER (RBAC)                    │
│  (RLE entities - permission bundles, hierarchy)         │
├─────────────────────────────────────────────────────────┤
│                 PERMISSION LAYER                        │
│  (PRM entities - atomic action rights)                  │
├─────────────────────────────────────────────────────────┤
│                  RESOURCE LAYER                         │
│  (Entities with CC-PIDs - ownership, tenant)            │
└─────────────────────────────────────────────────────────┘
```

1.2 Authorization Flow

```
Request arrives
      ↓
Extract: principal, action, resource, context
      ↓
Validate: principal authenticated? resource exists?
      ↓
┌─────────────────────────────────────────────┐
│           POLICY EVALUATION ENGINE          │
│                                             │
│  1. Check explicit DENY policies            │
│     → If any match: DENY                    │
│                                             │
│  2. Check explicit ALLOW policies           │
│     → If none match: DENY                   │
│     → If match: continue                    │
│                                             │
│  3. Evaluate conditions (ABAC)              │
│     → If conditions fail: DENY              │
│                                             │
│  4. Check tenant isolation                  │
│     → Cross-tenant?: DENY                   │
│                                             │
│  5. All checks pass: ALLOW                  │
└─────────────────────────────────────────────┘
      ↓
Log decision + context
      ↓
Return ALLOW or DENY
```

1.3 Decision Precedence

| Priority | Rule                             | Result             |
| -------- | -------------------------------- | ------------------ |
| 1        | Explicit DENY matches            | DENY               |
| 2        | No policies match                | DENY (default)     |
| 3        | Explicit ALLOW + conditions pass | ALLOW              |
| 4        | Evaluation error                 | DENY (fail-secure) |

## 2. Roles (RBAC)

Roles group permissions for assignment to principals. CYBERCUBE defines system roles
(immutable) and allows custom roles (tenant-defined).

2.1 Role Structure

```typescript
interface Role {
  id: string;              // Internal UUID
  public_id: string;       // CC-PID: RLE-XXXXXX-X
  code: string;            // Unique identifier (e.g., "admin", "viewer")
  name: string;            // Display name
  description: string;
  type: 'SYSTEM' | 'CUSTOM';
  scope: 'GLOBAL' | 'TENANT' | 'RESOURCE';
  tenant_id?: string;      // For TENANT/RESOURCE scoped roles
  permissions: string[];   // Permission codes
  parent_role_id?: string; // For inheritance
  created_at: Date;
  updated_at: Date;
}
```

2.2 System Roles (Immutable)

| Role Code         | Scope    | Description             | Key Permissions                                                                                      |
| ----------------- | -------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| `super_admin`   | GLOBAL   | Full system access      | `*:*`                                                                                              |
| `tenant_admin`  | TENANT   | Full tenant access      | `<tenant>:*`                                                                                       |
| `project_admin` | RESOURCE | Full project access     | `project:*`                                                                                        |
| `team_lead`     | RESOURCE | Team management         | `team:*`, `project:read,update`                                                                  |
| `member`        | TENANT   | Standard user           | `project:read`, `task:*`                                                                         |
| `viewer`        | TENANT   | Read-only access        | `project:read`, `project:list`, `task:read`, `task:list`, `invoice:read`, `invoice:list` |
| `billing_admin` | TENANT   | Financial access        | `invoice:*`, `payment:*`                                                                         |
| `guest`         | RESOURCE | Limited external access | `project:read` (specific)                                                                          |

2.3 Role Hierarchy

Roles can inherit permissions from parent roles:

```
super_admin
    │
    └── tenant_admin
            │
            ├── project_admin
            │       │
            │       └── team_lead
            │               │
            │               └── member
            │
            └── billing_admin
```

Rules:

- Child roles inherit all parent permissions
- Child roles can add permissions, not remove
- Maximum hierarchy depth: 5 levels
- Circular inheritance is forbidden

2.4 Role Assignment

```typescript
interface RoleAssignment {
  id: string;
  principal_type: 'USER' | 'SERVICE_ACCOUNT' | 'GROUP';
  principal_id: string;       // USR-*, SVC-*, GRP-*
  role_id: string;            // RLE-*
  scope_type: 'GLOBAL' | 'TENANT' | 'RESOURCE';
  scope_id?: string;          // ACC-*, PRJ-*, etc.
  granted_by: string;         // USR-* who granted
  granted_at: Date;
  expires_at?: Date;          // Time-limited grants
  conditions?: PolicyCondition[];
}
```

Assignment rules:

- Users can only assign roles they possess (or lower)
- Tenant admins can assign any tenant-scoped role
- Resource-scoped roles require resource ownership or admin
- Time-limited grants auto-expire

2.5 Custom Roles

Tenants can create custom roles combining existing permissions:

```json
{
  "code": "project_reviewer",
  "name": "Project Reviewer",
  "type": "CUSTOM",
  "scope": "TENANT",
  "permissions": [
    "project:read",
    "project:list",
    "task:read",
    "task:list",
    "comment:create",
    "comment:read"
  ]
}
```

Custom role rules:

- Cannot exceed tenant_admin permissions
- Code must be unique within tenant
- Cannot modify after assignment (create new version)
- Maximum 50 custom roles per tenant

## 3. Permissions (PRM)

Permissions are atomic rights to perform specific actions on resource types.

3.1 Permission Structure

```typescript
interface Permission {
  id: string;              // Internal UUID
  public_id: string;       // CC-PID: PRM-XXXXXX-X
  code: string;            // Action code: "project:update"
  name: string;            // Display name
  description: string;
  resource_type: string;   // "project", "task", "invoice"
  action: string;          // "create", "read", "update", "delete", "list"
  is_sensitive: boolean;   // Requires additional audit
  created_at: Date;
}
```

3.2 Permission Naming Convention

Format: `<resource>:<action>`

| Resource     | Actions                                                                          |
| ------------ | -------------------------------------------------------------------------------- |
| `project`  | `create`, `read`, `update`, `delete`, `list`, `archive`              |
| `task`     | `create`, `read`, `update`, `delete`, `list`, `assign`, `complete` |
| `invoice`  | `create`, `read`, `update`, `delete`, `list`, `send`, `void`       |
| `user`     | `create`, `read`, `update`, `delete`, `list`, `suspend`, `invite`  |
| `role`     | `create`, `read`, `update`, `delete`, `list`, `assign`               |
| `settings` | `read`, `update`                                                             |

Wildcards:

- `project:*` — all actions on projects
- `*:read` — read action on all resources
- `*:*` — all actions on all resources (superuser)

3.3 Permission Categories

| Category   | Description         | Examples                             |
| ---------- | ------------------- | ------------------------------------ |
| Data       | CRUD operations     | `project:create`, `task:delete`  |
| Management | Admin operations    | `user:suspend`, `role:assign`    |
| Financial  | Billing/payment     | `invoice:void`, `payment:refund` |
| System     | Platform operations | `settings:update`, `audit:read`  |
| Sensitive  | Requires audit      | `user:delete`, `data:export`     |

3.4 Permission Registry

All permissions MUST be registered in the central registry:

```json
// permissions.json (reference)
{
  "permissions": [
    {
      "code": "project:create",
      "name": "Create Project",
      "resource_type": "project",
      "action": "create",
      "is_sensitive": false
    },
    {
      "code": "user:delete",
      "name": "Delete User",
      "resource_type": "user",
      "action": "delete",
      "is_sensitive": true
    }
  ]
}
```

## 4. Policies (POL)

Policies define rules that govern access decisions, combining principals, actions,
resources, conditions, and effects.

4.1 Policy Structure

```typescript
interface Policy {
  id: string;              // Internal UUID
  public_id: string;       // CC-PID: POL-XXXXXX-X
  name: string;            // Descriptive name
  description: string;
  effect: 'ALLOW' | 'DENY';
  principals: Principal[];  // Who this policy applies to
  actions: string[];        // What actions are covered
  resources: string[];      // What resources are covered
  conditions?: Condition[]; // When the policy applies
  priority: number;         // Evaluation order (lower = first)
  tenant_id?: string;       // Tenant scope (null = global)
  created_at: Date;
  updated_at: Date;
  created_by: string;
}

interface Principal {
  type: 'user' | 'role' | 'group' | 'service' | 'any';
  id?: string;             // Specific principal ID
  attribute?: string;      // Attribute match (ABAC)
}

interface Condition {
  attribute: string;       // e.g., "resource.owner_id"
  operator: ConditionOperator;
  value: any;
}

type ConditionOperator = 
  | 'equals' 
  | 'not_equals' 
  | 'in' 
  | 'not_in'
  | 'contains'
  | 'starts_with'
  | 'greater_than'
  | 'less_than'
  | 'exists'
  | 'is_owner'
  | 'is_team_member';
```

4.2 Policy Examples

**Allow team members to read their projects:**

```json
{
  "name": "team-project-read",
  "effect": "ALLOW",
  "principals": [{"type": "role", "id": "member"}],
  "actions": ["project:read", "project:list"],
  "resources": ["project:*"],
  "conditions": [
    {
      "attribute": "principal.team_id",
      "operator": "equals",
      "value": "resource.team_id"
    }
  ]
}
```

**Deny access outside business hours:**

```json
{
  "name": "deny-after-hours",
  "effect": "DENY",
  "principals": [{"type": "role", "id": "member"}],
  "actions": ["*:*"],
  "resources": ["*"],
  "conditions": [
    {
      "attribute": "context.hour",
      "operator": "not_in",
      "value": [9, 10, 11, 12, 13, 14, 15, 16, 17]
    }
  ]
}
```

**Allow owners full control:**

```json
{
  "name": "owner-full-access",
  "effect": "ALLOW",
  "principals": [{"type": "any"}],
  "actions": ["*:*"],
  "resources": ["*"],
  "conditions": [
    {
      "attribute": "principal.id",
      "operator": "is_owner",
      "value": "resource"
    }
  ]
}
```

4.3 Policy Evaluation Order

1. **Priority ordering**: Lower priority number evaluated first
2. **Effect ordering**: DENY policies evaluated before ALLOW
3. **Specificity**: More specific policies take precedence

```
Priority 0: System deny policies (immutable)
Priority 1-99: Tenant deny policies
Priority 100: Default deny (implicit)
Priority 101-199: Tenant allow policies
Priority 200+: Custom policies
```

4.4 Policy Attachment

Policies can be attached at different scopes:

| Scope     | Attachment Point | Example                  |
| --------- | ---------------- | ------------------------ |
| Global    | System           | "Deny deleted users"     |
| Tenant    | Account (ACC)    | "Team project access"    |
| Resource  | Specific entity  | "Project guest access"   |
| Principal | User/Role        | "User-specific override" |

## 5. Ownership Model

Ownership establishes the relationship between principals and the resources they control.

5.1 Ownership Types

| Type      | Description                    | Grants          |
| --------- | ------------------------------ | --------------- |
| Creator   | Principal who created resource | Full control    |
| Assigned  | Explicitly assigned owner      | Full control    |
| Team      | Team-level ownership           | Shared control  |
| Inherited | From parent resource           | Parent's grants |

5.2 Ownership Rules

```typescript
interface Ownership {
  resource_type: string;    // "project", "task"
  resource_id: string;      // CC-PID
  owner_type: 'USER' | 'TEAM' | 'SERVICE';
  owner_id: string;         // USR-*, TMB-*, SVC-*
  ownership_type: 'CREATOR' | 'ASSIGNED' | 'INHERITED';
  inherited_from?: string;  // Parent resource ID
  created_at: Date;
  transferred_at?: Date;
  transferred_by?: string;
}
```

5.3 Ownership Grants

By default, ownership grants:

| Permission | Creator | Assigned | Team              |
| ---------- | ------- | -------- | ----------------- |
| Read       | ✓      | ✓       | ✓                |
| Update     | ✓      | ✓       | ✓                |
| Delete     | ✓      | ✓       | Requires approval |
| Share      | ✓      | ✓       | Team lead only    |
| Transfer   | ✓      | ✓       | ✗                |

5.4 Ownership Transfer

```
Current owner initiates transfer
      ↓
Validate: new owner exists, is in same tenant
      ↓
Validate: current owner has transfer permission
      ↓
Create transfer record (audit)
      ↓
Update ownership
      ↓
Notify: new owner, previous owner
      ↓
Log: ownership_transferred event
```

Transfer rules:

- Owner must explicitly initiate
- New owner must be in same tenant (unless federated)
- Transfer is atomic (no partial)
- Previous owner loses all ownership grants
- Transfer is audited and irreversible

5.5 Ownership Hierarchy

Resources inherit ownership context from parents:

```
Account (ACC-XXXXXX-X)
   │ owner: tenant
   │
   └── Project (PRJ-XXXXXX-X)
          │ owner: user_a (creator)
          │
          ├── Task (TSK-XXXXXX-X)
          │      owner: user_a (inherited)
          │
          └── Task (TSK-YYYYYY-Y)
                 owner: user_b (assigned)
```

Inheritance rules:

- Child inherits parent owner by default
- Explicit assignment overrides inheritance
- Deleting parent cascades to children
- Moving resource updates inheritance

## 6. Resource-Based Access Control

Resources are the objects of access control decisions. Every resource has a type,
identity, tenant, and optional owner.

6.1 Resource Identification

```typescript
interface Resource {
  type: string;           // "project", "task", "invoice"
  id: string;             // CC-PID: PRJ-XXXXXX-X
  tenant_id: string;      // ACC-XXXXXX-X
  owner_id?: string;      // USR-XXXXXX-X
  parent_id?: string;     // Parent resource CC-PID
  created_at: Date;
  created_by: string;
  attributes: Record<string, any>; // ABAC attributes
}
```

6.2 Resource Hierarchy

```
Account (ACC)
    │
    ├── User (USR)
    │
    ├── Team (TMB)
    │      └── Team Member (USR)
    │
    ├── Project (PRJ)
    │      ├── Task (TSK)
    │      ├── Milestone (MLN)
    │      ├── Deliverable (DLV)
    │      └── Document (DOC)
    │
    ├── Invoice (INV)
    │      └── Payment (PAY)
    │
    └── Settings (tenant-level)
```

6.3 Resource Actions

Standard CRUD actions apply to all resources:

| Action     | HTTP Method      | Description          |
| ---------- | ---------------- | -------------------- |
| `create` | POST             | Create new resource  |
| `read`   | GET              | Read single resource |
| `update` | PUT/PATCH        | Modify resource      |
| `delete` | DELETE           | Remove resource      |
| `list`   | GET (collection) | List resources       |

Additional actions per resource type:

| Resource | Additional Actions                    |
| -------- | ------------------------------------- |
| Project  | `archive`, `restore`, `export`  |
| Task     | `assign`, `complete`, `reopen`  |
| Invoice  | `send`, `void`, `finalize`      |
| User     | `suspend`, `activate`, `invite` |

6.4 Resource Attributes (ABAC)

Resources carry attributes for fine-grained access control:

```typescript
// Project attributes
{
  type: "project",
  id: "PRJ-X2M8KD-7",
  tenant_id: "ACC-9F4K7Q-M",
  owner_id: "USR-7H3K6P-2",
  attributes: {
    status: "active",
    visibility: "team",
    team_id: "TMB-4Q7T9P-K",
    sensitivity: "internal",
    created_at: "2026-01-15T10:00:00Z",
    budget_amount: 50000,
    is_archived: false
  }
}
```

Common attributes:

- `status`: active, archived, deleted
- `visibility`: public, team, private
- `sensitivity`: public, internal, confidential, restricted
- `team_id`: owning team
- `created_at`, `updated_at`: timestamps

## 7. Cross-Tenant Isolation

Tenant isolation is the highest-priority security control. Data and operations MUST NOT
leak across tenant boundaries.

7.1 Tenant Model

```
┌─────────────────────────────────────────────────────────┐
│                    SYSTEM LAYER                         │
│  (Platform services, super_admin only)                  │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Tenant A   │  │  Tenant B   │  │  Tenant C   │     │
│  │  ACC-AAA... │  │  ACC-BBB... │  │  ACC-CCC... │     │
│  │             │  │             │  │             │     │
│  │  Users      │  │  Users      │  │  Users      │     │
│  │  Projects   │  │  Projects   │  │  Projects   │     │
│  │  Data       │  │  Data       │  │  Data       │     │
│  │             │  │             │  │             │     │
│  │ ─────────── │  │ ─────────── │  │ ─────────── │     │
│  │  ISOLATED   │  │  ISOLATED   │  │  ISOLATED   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

7.2 Isolation Rules (MANDATORY)

| Rule              | Enforcement            | Violation Response    |
| ----------------- | ---------------------- | --------------------- |
| Data isolation    | Database query layer   | Query rejected        |
| API isolation     | Request validation     | 403 Forbidden         |
| Session isolation | Session context        | Session terminated    |
| Audit isolation   | Separate audit streams | Alert + investigation |

7.3 Tenant Context

Every request MUST carry tenant context:

```typescript
interface TenantContext {
  tenant_id: string;        // ACC-XXXXXX-X
  extracted_from: 'session' | 'token' | 'header' | 'path';
  validated_at: Date;
}

// Middleware enforcement
function enforceTenantIsolation(req, res, next) {
  const tenantContext = extractTenantContext(req);
  const resourceTenant = getResourceTenant(req.params.resourceId);
  
  if (tenantContext.tenant_id !== resourceTenant) {
    // CRITICAL: Cross-tenant access attempt
    auditLog.critical('CROSS_TENANT_ACCESS_ATTEMPT', {
      principal: req.user.id,
      attempted_tenant: resourceTenant,
      actual_tenant: tenantContext.tenant_id
    });
    return res.status(403).json({ error: 'ACCESS_DENIED' });
  }
  
  next();
}
```

7.4 Query-Level Enforcement

All database queries MUST include tenant filter:

```sql
-- CORRECT: Tenant filter included
SELECT * FROM projects 
WHERE id = $1 AND tenant_id = $2;

-- FORBIDDEN: Missing tenant filter
SELECT * FROM projects WHERE id = $1;
```

Implementation patterns:

- Row-Level Security (RLS) in PostgreSQL
- Mandatory tenant_id in all WHERE clauses
- ORM middleware for automatic filtering
- Query audit logging

7.5 Cross-Tenant Federation (Optional)

For B2B scenarios, controlled cross-tenant access can be established:

```typescript
interface TenantFederation {
  id: string;
  source_tenant_id: string;    // ACC-* (sharing tenant)
  target_tenant_id: string;    // ACC-* (receiving tenant)
  resource_types: string[];    // What can be shared
  permissions: string[];       // What actions allowed
  expires_at?: Date;
  approved_by: string;         // source tenant admin
  accepted_by: string;         // target tenant admin
  created_at: Date;
}
```

Federation rules:

- Requires explicit approval from both tenants
- Limited to specific resource types
- Read-only by default
- Time-limited (max 1 year)
- Audited separately

## 8. Default Deny Model

CYBERCUBE implements strict default deny: access is denied unless explicitly granted.

8.1 Default Deny Rules

| Scenario                | Default Result |
| ----------------------- | -------------- |
| No matching policy      | DENY           |
| Policy evaluation error | DENY           |
| Missing permission      | DENY           |
| Ambiguous conditions    | DENY           |
| Cross-tenant request    | DENY           |
| Expired grant           | DENY           |
| Suspended principal     | DENY           |

8.2 Explicit Allow Requirements

For access to be granted, ALL conditions must be true:

1. ✓ Principal is authenticated
2. ✓ Principal is not suspended
3. ✓ Principal has required permission (via role or direct grant)
4. ✓ Resource is in principal's tenant (or federated)
5. ✓ Policy conditions are satisfied
6. ✓ No explicit DENY policy matches
7. ✓ Grant has not expired

8.3 Fail-Secure Behavior

```typescript
async function evaluateAccess(
  principal: Principal,
  action: string,
  resource: Resource
): Promise<AccessDecision> {
  try {
    // Evaluation logic
    const policies = await getPolicies(principal, action, resource);
  
    // Check explicit denies first
    for (const policy of policies.filter(p => p.effect === 'DENY')) {
      if (await evaluateConditions(policy, principal, resource)) {
        return { allowed: false, reason: 'EXPLICIT_DENY', policy: policy.id };
      }
    }
  
    // Check explicit allows
    for (const policy of policies.filter(p => p.effect === 'ALLOW')) {
      if (await evaluateConditions(policy, principal, resource)) {
        return { allowed: true, reason: 'EXPLICIT_ALLOW', policy: policy.id };
      }
    }
  
    // No matching allow = deny
    return { allowed: false, reason: 'NO_MATCHING_POLICY' };
  
  } catch (error) {
    // FAIL-SECURE: Any error results in denial
    auditLog.error('POLICY_EVALUATION_ERROR', { error, principal, action, resource });
    return { allowed: false, reason: 'EVALUATION_ERROR' };
  }
}
```

## 9. Implementation Guidelines

9.1 Reference Implementation

```typescript
// authorization-service.ts - Reference implementation

import { Policy, Permission, Role, Resource, Principal } from './types';

/**
 * CYBERCUBE Authorization Service
 * Reference implementation for v1 standard
 */
export class AuthorizationService {
  
  /**
   * Main authorization check
   * @returns AccessDecision with allowed boolean and reason
   */
  async checkAccess(
    principal: Principal,
    action: string,
    resource: Resource,
    context?: RequestContext
  ): Promise<AccessDecision> {
    const startTime = Date.now();
  
    try {
      // 1. Validate principal
      if (!principal || principal.status === 'SUSPENDED') {
        return this.deny('PRINCIPAL_INVALID');
      }
    
      // 2. Tenant isolation check (CRITICAL)
      if (!this.validateTenantAccess(principal, resource)) {
        await this.auditCrossTenantAttempt(principal, resource);
        return this.deny('CROSS_TENANT_DENIED');
      }
    
      // 3. Get applicable policies
      const policies = await this.getApplicablePolicies(principal, action, resource);
    
      // 4. Evaluate DENY policies first
      for (const policy of policies.filter(p => p.effect === 'DENY')) {
        if (await this.evaluatePolicy(policy, principal, resource, context)) {
          return this.deny('EXPLICIT_DENY', policy.id);
        }
      }
    
      // 5. Evaluate ALLOW policies
      for (const policy of policies.filter(p => p.effect === 'ALLOW')) {
        if (await this.evaluatePolicy(policy, principal, resource, context)) {
          return this.allow('EXPLICIT_ALLOW', policy.id);
        }
      }
    
      // 6. Default deny
      return this.deny('NO_MATCHING_POLICY');
    
    } catch (error) {
      // Fail-secure
      auditLog.error('AUTHORIZATION_EVALUATION_ERROR', { error, principal, action, resource });
      return this.deny('EVALUATION_ERROR');
    
    } finally {
      // Audit log
      await this.auditDecision(principal, action, resource, Date.now() - startTime);
    }
  }
  
  /**
   * Check if principal can access resource across tenant boundary
   */
  private validateTenantAccess(principal: Principal, resource: Resource): boolean {
    // Same tenant = OK
    if (principal.tenant_id === resource.tenant_id) {
      return true;
    }
  
    // Super admin = OK (global scope)
    if (principal.roles.includes('super_admin')) {
      return true;
    }
  
    // Check federation (if enabled)
    // return this.checkFederation(principal.tenant_id, resource.tenant_id);
  
    // Default: deny cross-tenant
    return false;
  }
  
  /**
   * Get all policies applicable to this access request
   */
  private async getApplicablePolicies(
    principal: Principal,
    action: string,
    resource: Resource
  ): Promise<Policy[]> {
    const policies: Policy[] = [];
  
    // 1. System policies (global)
    policies.push(...await this.getSystemPolicies());
  
    // 2. Tenant policies
    policies.push(...await this.getTenantPolicies(principal.tenant_id));
  
    // 3. Role-based policies
    for (const roleId of principal.roles) {
      policies.push(...await this.getRolePolicies(roleId));
    }
  
    // 4. Resource-specific policies
    policies.push(...await this.getResourcePolicies(resource.id));
  
    // 5. Direct grants to principal
    policies.push(...await this.getPrincipalPolicies(principal.id));
  
    // Filter to matching action and resource type
    return policies.filter(p => 
      this.matchesAction(p.actions, action) &&
      this.matchesResource(p.resources, resource)
    ).sort((a, b) => a.priority - b.priority);
  }
  
  /**
   * Evaluate policy conditions (ABAC)
   */
  private async evaluatePolicy(
    policy: Policy,
    principal: Principal,
    resource: Resource,
    context?: RequestContext
  ): Promise<boolean> {
    // No conditions = policy applies
    if (!policy.conditions || policy.conditions.length === 0) {
      return true;
    }
  
    // All conditions must pass (AND logic)
    for (const condition of policy.conditions) {
      if (!await this.evaluateCondition(condition, principal, resource, context)) {
        return false;
      }
    }
  
    return true;
  }
  
  /**
   * Evaluate single condition
   */
  private async evaluateCondition(
    condition: Condition,
    principal: Principal,
    resource: Resource,
    context?: RequestContext
  ): Promise<boolean> {
    const actualValue = this.resolveAttribute(
      condition.attribute, 
      principal, 
      resource, 
      context
    );
  
    const expectedValue = this.resolveValue(
      condition.value,
      principal,
      resource,
      context
    );
  
    switch (condition.operator) {
      case 'equals':
        return actualValue === expectedValue;
      case 'not_equals':
        return actualValue !== expectedValue;
      case 'in':
        return Array.isArray(expectedValue) && expectedValue.includes(actualValue);
      case 'not_in':
        return Array.isArray(expectedValue) && !expectedValue.includes(actualValue);
      case 'contains':
        return String(actualValue).includes(String(expectedValue));
      case 'starts_with':
        return String(actualValue).startsWith(String(expectedValue));
      case 'greater_than':
        return Number(actualValue) > Number(expectedValue);
      case 'less_than':
        return Number(actualValue) < Number(expectedValue);
      case 'exists':
        return actualValue !== undefined && actualValue !== null;
      case 'is_owner':
        return resource.owner_id === principal.id;
      case 'is_team_member':
        return principal.team_ids?.includes(resource.attributes?.team_id);
      default:
        return false;
    }
  }
  
  /**
   * Resolve attribute path to value
   */
  private resolveAttribute(
    path: string,
    principal: Principal,
    resource: Resource,
    context?: RequestContext
  ): any {
    const [scope, ...rest] = path.split('.');
    const attributePath = rest.join('.');
  
    switch (scope) {
      case 'principal':
        return this.getNestedValue(principal, attributePath);
      case 'resource':
        return this.getNestedValue(resource, attributePath) 
            || this.getNestedValue(resource.attributes, attributePath);
      case 'context':
        return this.getNestedValue(context, attributePath);
      default:
        return undefined;
    }
  }
  
  // Helper methods
  private deny(reason: string, policyId?: string): AccessDecision {
    return { allowed: false, reason, policyId };
  }
  
  private allow(reason: string, policyId?: string): AccessDecision {
    return { allowed: true, reason, policyId };
  }
  
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  }
  
  private matchesAction(patterns: string[], action: string): boolean {
    return patterns.some(p => 
      p === '*:*' || 
      p === action || 
      (p.endsWith(':*') && action.startsWith(p.slice(0, -1))) ||
      (p.startsWith('*:') && action.endsWith(p.slice(1)))
    );
  }
  
  private matchesResource(patterns: string[], resource: Resource): boolean {
    return patterns.some(p =>
      p === '*' ||
      p === `${resource.type}:*` ||
      p === `${resource.type}:${resource.id}`
    );
  }
}

// Types
interface AccessDecision {
  allowed: boolean;
  reason: string;
  policyId?: string;
}

interface RequestContext {
  ip_address?: string;
  user_agent?: string;
  timestamp?: Date;
  hour?: number;
  day_of_week?: number;
}

interface Condition {
  attribute: string;
  operator: string;
  value: any;
}
```

9.2 Database Schema (Reference)

```sql
-- CYBERCUBE Authorization Schema (PostgreSQL)
-- Reference implementation for v1 standard

-- Roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id VARCHAR(16) NOT NULL UNIQUE,  -- RLE-XXXXXX-X
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL DEFAULT 'CUSTOM',
    scope VARCHAR(20) NOT NULL DEFAULT 'TENANT',
    tenant_id UUID REFERENCES accounts(id),
    parent_role_id UUID REFERENCES roles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    CONSTRAINT valid_type CHECK (type IN ('SYSTEM', 'CUSTOM')),
    CONSTRAINT valid_scope CHECK (scope IN ('GLOBAL', 'TENANT', 'RESOURCE')),
    UNIQUE (tenant_id, code)
);

-- Permissions
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id VARCHAR(16) NOT NULL UNIQUE,  -- PRM-XXXXXX-X
    code VARCHAR(100) NOT NULL UNIQUE,      -- "project:update"
    name VARCHAR(100) NOT NULL,
    description TEXT,
    resource_type VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    is_sensitive BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Role-Permission mapping
CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    PRIMARY KEY (role_id, permission_id)
);

-- Policies
CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id VARCHAR(16) NOT NULL UNIQUE,  -- POL-XXXXXX-X
    name VARCHAR(100) NOT NULL,
    description TEXT,
    effect VARCHAR(10) NOT NULL,
    principals JSONB NOT NULL,              -- [{type, id, attribute}]
    actions TEXT[] NOT NULL,                -- ["project:read"]
    resources TEXT[] NOT NULL,              -- ["project:*"]
    conditions JSONB,                       -- [{attribute, operator, value}]
    priority INTEGER NOT NULL DEFAULT 100,
    tenant_id UUID REFERENCES accounts(id),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES users(id),
  
    CONSTRAINT valid_effect CHECK (effect IN ('ALLOW', 'DENY'))
);

-- Role assignments
CREATE TABLE role_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    principal_type VARCHAR(20) NOT NULL,    -- USER, SERVICE_ACCOUNT, GROUP
    principal_id UUID NOT NULL,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    scope_type VARCHAR(20) NOT NULL,        -- GLOBAL, TENANT, RESOURCE
    scope_id UUID,                          -- tenant or resource ID
    granted_by UUID NOT NULL REFERENCES users(id),
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    conditions JSONB,
  
    CONSTRAINT valid_principal_type CHECK (principal_type IN ('USER', 'SERVICE_ACCOUNT', 'GROUP')),
    CONSTRAINT valid_scope_type CHECK (scope_type IN ('GLOBAL', 'TENANT', 'RESOURCE'))
);

CREATE INDEX idx_role_assignments_principal ON role_assignments (principal_type, principal_id);
CREATE INDEX idx_role_assignments_role ON role_assignments (role_id);

-- Resource ownership
CREATE TABLE resource_ownership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(16) NOT NULL,       -- CC-PID
    owner_type VARCHAR(20) NOT NULL,        -- USER, TEAM, SERVICE
    owner_id UUID NOT NULL,
    ownership_type VARCHAR(20) NOT NULL,    -- CREATOR, ASSIGNED, INHERITED
    inherited_from VARCHAR(16),             -- Parent resource CC-PID
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    transferred_at TIMESTAMPTZ,
    transferred_by UUID REFERENCES users(id),
  
    CONSTRAINT valid_owner_type CHECK (owner_type IN ('USER', 'TEAM', 'SERVICE')),
    CONSTRAINT valid_ownership_type CHECK (ownership_type IN ('CREATOR', 'ASSIGNED', 'INHERITED')),
    UNIQUE (resource_type, resource_id)
);

CREATE INDEX idx_ownership_owner ON resource_ownership (owner_type, owner_id);

-- Tenant federation (optional)
CREATE TABLE tenant_federation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_tenant_id UUID NOT NULL REFERENCES accounts(id),
    target_tenant_id UUID NOT NULL REFERENCES accounts(id),
    resource_types TEXT[] NOT NULL,
    permissions TEXT[] NOT NULL,
    expires_at TIMESTAMPTZ,
    approved_by UUID NOT NULL REFERENCES users(id),
    accepted_by UUID REFERENCES users(id),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    CONSTRAINT valid_status CHECK (status IN ('PENDING', 'ACTIVE', 'REVOKED', 'EXPIRED')),
    CONSTRAINT different_tenants CHECK (source_tenant_id != target_tenant_id)
);

-- Authorization audit log
CREATE TABLE authorization_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    principal_type VARCHAR(20) NOT NULL,
    principal_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(16) NOT NULL,
    tenant_id UUID NOT NULL,
    decision VARCHAR(10) NOT NULL,          -- ALLOW, DENY
    reason VARCHAR(50) NOT NULL,
    policy_id UUID REFERENCES policies(id),
    ip_address INET,
    user_agent TEXT,
    evaluation_time_ms INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
    CONSTRAINT valid_decision CHECK (decision IN ('ALLOW', 'DENY'))
);

CREATE INDEX idx_auth_audit_principal ON authorization_audit_log (principal_id, created_at);
CREATE INDEX idx_auth_audit_resource ON authorization_audit_log (resource_type, resource_id, created_at);
CREATE INDEX idx_auth_audit_tenant ON authorization_audit_log (tenant_id, created_at);

-- Row-Level Security for tenant isolation
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_projects ON projects
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- Repeat for all tenant-scoped tables
```

9.3 Error Codes (Normative)

| Code                           | HTTP Status | Description                              |
| ------------------------------ | ----------- | ---------------------------------------- |
| AUTHZ_ACCESS_DENIED            | 403         | Access denied (generic)                  |
| AUTHZ_INSUFFICIENT_PERMISSIONS | 403         | Missing required permission              |
| AUTHZ_CROSS_TENANT_DENIED      | 403         | Cross-tenant access attempt              |
| AUTHZ_RESOURCE_NOT_FOUND       | 404         | Resource does not exist (or not visible) |
| AUTHZ_POLICY_CONFLICT          | 500         | Conflicting policies (internal error)    |
| AUTHZ_EVALUATION_ERROR         | 500         | Policy evaluation failed                 |
| AUTHZ_ROLE_NOT_ASSIGNABLE      | 400         | Cannot assign this role                  |
| AUTHZ_GRANT_EXPIRED            | 403         | Permission grant has expired             |
| AUTHZ_PRINCIPAL_SUSPENDED      | 403         | Principal account is suspended           |
| AUTHZ_DELEGATION_LIMIT         | 400         | Delegation chain too deep                |

Error response format:

```json
{
  "error": {
    "code": "AUTHZ_INSUFFICIENT_PERMISSIONS",
    "message": "You do not have permission to perform this action",
    "required_permission": "project:delete",
    "resource": "PRJ-X2M8KD-7",
    "timestamp": "2026-01-17T12:00:00Z"
  }
}
```

## 10. Compliance and Auditing

10.1 Audit Requirements

All authorization decisions MUST be logged:

| Event                 | Required Fields                                |
| --------------------- | ---------------------------------------------- |
| Access allowed        | principal, action, resource, policy, timestamp |
| Access denied         | principal, action, resource, reason, timestamp |
| Role assigned         | target, role, granted_by, scope, timestamp     |
| Role revoked          | target, role, revoked_by, reason, timestamp    |
| Policy created        | policy, created_by, tenant, timestamp          |
| Policy modified       | policy, modified_by, changes, timestamp        |
| Ownership transferred | resource, from, to, initiated_by, timestamp    |

Retention: 1 year minimum (configurable per compliance)

10.2 Separation of Duties

| Operation           | Required Approvers            | Notes                     |
| ------------------- | ----------------------------- | ------------------------- |
| Assign super_admin  | 2 existing super_admins       | Dual approval             |
| Create tenant_admin | super_admin or tenant_admin   | Self-assignment forbidden |
| Delete user         | Different from target         | Cannot delete self        |
| Void invoice        | billing_admin + project_admin | Dual approval             |
| Export data         | tenant_admin                  | Audit logged              |

10.3 Access Reviews

Required periodic reviews:

- Super admin access: quarterly
- Tenant admin access: semi-annually
- Privileged roles: annually
- Service accounts: annually

Review process:

1. Generate access report
2. Manager/owner review
3. Revoke unnecessary access
4. Document decisions
5. Audit trail

---

## Appendix A: Developer Cheat Sheet

Print it. Pin it. Reference it.

### Core Principle: Default Deny

```
No permission = DENY
No matching policy = DENY
Evaluation error = DENY
Cross-tenant = DENY
```

### Access Control Model

```
RBAC (primary)
  + ABAC (conditions)
  + ReBAC (ownership)
```

### Authorization Flow

```
1. Is principal authenticated? → if no: DENY
2. Is principal suspended? → if yes: DENY
3. Tenant isolation check → if cross-tenant: DENY
4. Any DENY policy match? → if yes: DENY
5. Any ALLOW policy match? → if no: DENY
6. Conditions satisfied? → if no: DENY
7. All checks pass: ALLOW
```

### Entity Codes

| Entity     | Code | Example      |
| ---------- | ---- | ------------ |
| Role       | RLE  | RLE-X2M8KD-7 |
| Permission | PRM  | PRM-4Q7T9P-K |
| Policy     | POL  | POL-9F4K7Q-M |

### Permission Format

```
<resource>:<action>

project:read
task:update
invoice:create
user:delete

Wildcards:
project:*    → all project actions
*:read       → read on all resources
*:*          → superuser (dangerous)
```

### System Roles

| Role          | Scope    | Powers             |
| ------------- | -------- | ------------------ |
| super_admin   | GLOBAL   | Everything         |
| tenant_admin  | TENANT   | Tenant everything  |
| project_admin | RESOURCE | Project everything |
| member        | TENANT   | Standard access    |
| viewer        | TENANT   | Read-only          |

### Policy Structure

```json
{
  "effect": "ALLOW | DENY",
  "principals": ["role:member"],
  "actions": ["project:read"],
  "resources": ["project:*"],
  "conditions": [{...}]
}
```

### Condition Operators

```
equals, not_equals
in, not_in
contains, starts_with
greater_than, less_than
exists
is_owner (special)
is_team_member (special)
```

### Ownership Grants

| Type     | Read | Update | Delete   | Share |
| -------- | ---- | ------ | -------- | ----- |
| Creator  | ✓   | ✓     | ✓       | ✓    |
| Assigned | ✓   | ✓     | ✓       | ✓    |
| Team     | ✓   | ✓     | Approval | Lead  |

### Tenant Isolation

```typescript
// ALWAYS include tenant_id
const project = await db.query(
  'SELECT * FROM projects WHERE id = $1 AND tenant_id = $2',
  [projectId, tenantId]
);

// NEVER do this
const project = await db.query(
  'SELECT * FROM projects WHERE id = $1',
  [projectId]
);
```

### What You MUST NOT Do

- **NEVER:** Trust client-provided tenant_id
- **NEVER:** Skip authorization checks
- **NEVER:** Allow self-role-escalation
- **NEVER:** Log without redaction
- **NEVER:** Cache authorization decisions long-term
- **NEVER:** Use wildcards in custom/tenant policies (system roles are exempt)
- **NEVER:** Allow cross-tenant by default

### What You MUST Do

- **ALWAYS:** Check authorization on every request
- **ALWAYS:** Enforce tenant isolation at query layer
- **ALWAYS:** Use RLS (Row-Level Security)
- **ALWAYS:** Log all authorization decisions
- **ALWAYS:** Fail-secure on errors
- **ALWAYS:** Review access quarterly

### Error Codes

```
AUTHZ_ACCESS_DENIED           → 403
AUTHZ_INSUFFICIENT_PERMISSIONS → 403
AUTHZ_CROSS_TENANT_DENIED     → 403
AUTHZ_RESOURCE_NOT_FOUND      → 404
AUTHZ_PRINCIPAL_SUSPENDED     → 403
```

### Mental Model

```
Role       → bundle of permissions
Permission → right to do ONE action
Policy     → rule with conditions
Ownership  → implicit full control
Tenant     → hard isolation boundary
```

### One-Line Rules

- Permissions: atomic, never deleted, only deprecated
- Roles: hierarchical, customizable per tenant
- Policies: explicit deny wins, default deny
- Ownership: creator gets full control
- Tenants: NEVER cross without federation

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component           | Status  | Notes                  |
| ------------------- | ------- | ---------------------- |
| Permission Registry | PENDING | Define all permissions |
| Role System         | PARTIAL | Basic roles exist      |
| Policy Engine       | PENDING | Design complete        |
| RBAC Evaluation     | PARTIAL | Simple role checks     |
| ABAC Conditions     | PENDING | Not implemented        |
| Ownership Model     | PARTIAL | Basic ownership        |
| Tenant Isolation    | PARTIAL | Query-level exists     |
| RLS (PostgreSQL)    | PENDING | Design complete        |
| Audit Logging       | PARTIAL | Extend coverage        |
| Access Reviews      | PENDING | Process needed         |

### Migration Path

1. **Phase 1**: Permission registry + system roles
2. **Phase 2**: Role assignment + inheritance
3. **Phase 3**: Policy engine implementation
4. **Phase 4**: ABAC conditions
5. **Phase 5**: RLS enforcement
6. **Phase 6**: Audit + reviews

### Entity Codes Status

| Code | Entity     | Registered | In Use  |
| ---- | ---------- | ---------- | ------- |
| RLE  | Role       | ✓         | Partial |
| PRM  | Permission | ✓         | Partial |
| POL  | Policy     | ✓         | Pending |

---

## 11. Related Documents

| Document                                               | Relationship                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------- |
| 2.1 CYBERCUBE Security Policy (STD-SEC-001)            | Parent policy — this standard implements its access control requirements |
| 2.3 Authentication and Identity Standard               | Peer — AuthN complements this standard's AuthZ                           |
| 2.2 Secure Coding Standard                             | Peer — secure implementation patterns                                    |
| 2.5 Cryptography and Key Management Standard           | Peer — token encryption and key handling                                 |
| 3.4 Customer Data Isolation and Multi-Tenancy Standard | Peer — tenant isolation requirements                                     |
| 5.1 Naming and Identifier Standard                     | Peer — CC-PID format for entity codes                                    |
| 5.2 API Design Standard                                | Peer — API security patterns                                             |

---

## Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| v1      | 2026-01-17 | Initial release |


```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CYBERCUBE AUTHORIZATION & ACCESS CONTROL — DIRECTIVE BLOCK                 │
│  Source: 2.4 | Owner: Security Team | Binding: MANDATORY                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AUTHORITY                                                                  │
│  STD-SEC-004 — Authorization & Access Control Standard v1                   │
│  Status: ACTIVE | Effective: 2026-01-17                                     │
│  Scope: All products, services, APIs, principals, resources, tenants        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  NON-NEGOTIABLE PRINCIPLES                                                  │
│    • Default DENY                                                           │
│    • Least Privilege                                                        │
│    • Authorization evaluated on EVERY request                               │
│    • Fail-secure on errors                                                  │
│    • Tenant isolation is absolute                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  ACCESS CONTROL MODEL                                                       │
│    • RBAC = primary                                                         │
│    • ABAC = conditional refinement                                          │
│    • ReBAC = ownership & hierarchy                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  DECISION ORDER (MANDATORY)                                                 │
│    1. Explicit DENY → DENY                                                  │
│    2. No matching ALLOW → DENY                                              │
│    3. Conditions fail → DENY                                                │
│    4. Cross-tenant → DENY                                                   │
│    5. Evaluation error → DENY                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ROLES                                                                      │
│    • Roles bundle permissions; system roles immutable                       │
│    • Inheritance allowed (max depth = 5)                                    │
│    • Self-escalation forbidden                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  PERMISSIONS                                                                │
│    • Atomic, action-based (<resource>:<action>)                             │
│    • Immutable once created; never deleted (deprecated only)                │
├─────────────────────────────────────────────────────────────────────────────┤
│  POLICIES                                                                   │
│    • Explicit ALLOW / DENY                                                  │
│    • Conditions evaluated conjunctively                                     │
│    • DENY always overrides ALLOW                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  OWNERSHIP                                                                  │
│    • Creator owns by default                                                │
│    • Ownership grants full control unless restricted                        │
│    • Transfers are atomic and audited                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  TENANT ISOLATION                                                           │
│    • tenant_id enforced at API + query layer                                │
│    • Cross-tenant access forbidden by default                               │
│    • Federation: explicit, time-limited, audited                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  ENFORCEMENT POINTS                                                         │
│    • API middleware                                                         │
│    • Policy evaluation engine                                               │
│    • Database query layer (RLS preferred)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  AUDIT & LOGGING                                                            │
│    • ALL authorization decisions logged                                     │
│    • Grants, revocations, transfers logged                                  │
│    • Retention >= 1 year                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  GOVERNANCE                                                                 │
│    • CI/CD enforcement required                                             │
│    • Periodic access reviews mandatory                                      │
│    • Non-compliance = audit finding                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  CYBERCUBE AUTHORIZATION — SCORABLE COMPLIANCE MATRIX (0–5)                 │
│  Dimensions: S1–S10 | Scale: 0–5 | Max: 50 points (10 x 5)                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SCORING SCALE                                                              │
│  0 = Not defined / unmanaged                                                │
│  1 = Defined only                                                           │
│  2 = Partially implemented                                                  │
│  3 = Implemented (baseline compliant)                                       │
│  4 = Enforced, measured                                                     │
│  5 = Institutionalized, audited                                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  S1 — AUTHORIZATION GOVERNANCE                                              │
│  Criteria:                                                                  │
│    • Standard approved and owned                                            │
│    • Clear separation from AuthN                                            │
│  0–1: No formal AuthZ authority                                             │
│  4–5: Enforced and audited                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  S2 — DEFAULT DENY ENFORCEMENT                                              │
│  Criteria:                                                                  │
│    • No implicit access                                                     │
│    • Errors resolve to DENY                                                 │
│  0–1: Allow-by-default                                                      │
│  4–5: Systematic default deny                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  S3 — ROLE-BASED ACCESS CONTROL                                             │
│  Criteria:                                                                  │
│    • Roles defined, scoped, inherited                                       │
│    • Self-assignment blocked                                                │
│  0–1: Ad-hoc roles                                                          │
│  4–5: Structured RBAC with reviews                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  S4 — PERMISSION MANAGEMENT                                                 │
│  Criteria:                                                                  │
│    • Atomic permissions                                                     │
│    • Central registry                                                       │
│  0–1: Coarse or implicit permissions                                        │
│  4–5: Fully registered and enforced                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  S5 — POLICY ENGINE & EVALUATION                                            │
│  Criteria:                                                                  │
│    • DENY precedence                                                        │
│    • Deterministic evaluation                                               │
│  0–1: Hard-coded logic                                                      │
│  4–5: Policy-driven, testable                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  S6 — OWNERSHIP & ReBAC                                                     │
│  Criteria:                                                                  │
│    • Ownership grants enforced                                              │
│    • Transfer audited                                                       │
│  0–1: Ownership implicit                                                    │
│  4–5: Explicit, auditable ownership                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  S7 — TENANT ISOLATION                                                      │
│  Criteria:                                                                  │
│    • tenant_id enforced everywhere                                          │
│    • Cross-tenant blocked                                                   │
│  0–1: App-only isolation                                                    │
│  4–5: Query-level + audited                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  S8 — ABAC CONDITIONS                                                       │
│  Criteria:                                                                  │
│    • Attribute-based conditions                                             │
│    • Context-aware enforcement                                              │
│  0–1: No conditional access                                                 │
│  4–5: Fine-grained ABAC                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  S9 — AUDIT LOGGING                                                         │
│  Criteria:                                                                  │
│    • All allow/deny decisions logged                                        │
│    • Forensic completeness                                                  │
│  0–1: Partial or unsafe logs                                                │
│  4–5: Audit-ready evidence                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  S10 — ACCESS REVIEWS & COMPLIANCE                                          │
│  Criteria:                                                                  │
│    • Periodic reviews                                                       │
│    • Evidence retained                                                      │
│  0–1: No reviews                                                            │
│  4–5: Reviewed, defensible                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  THRESHOLDS                                                                 │
│  >=45  → Authorization-Mature                                               │
│  36–44 → Managed with minor gaps                                            │
│  28–35 → Elevated access risk                                               │
│  <28   → Unacceptable posture                                               │
│                                                                             │
│  HARD FAIL CONDITIONS                                                       │
│  S2 < 3 → Default deny not enforced                                         │
│  S7 < 3 → Tenant isolation weak                                             │
│  S9 < 3 → No audit trail                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
