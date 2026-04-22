# M-03 — Authorization Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.3 (lines 819–870)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.3 Authorization Module (M-03) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IAuthorizationService                                                   │
│  MODULE: M-03 Authorization                                                         │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Permission Checking                                                             │
│  check(subject: Subject, action: Action, resource: Resource) → Result<Decision>    │
│  checkBatch(requests: List<AuthzRequest>) → Result<List<Decision>>                 │
│  canAccess(userId: UserId, resourceId: ResourceId, permission: Permission) → Bool  │
│                                                                                     │
│  // Role Management                                                                 │
│  assignRole(userId: UserId, role: Role, scope: Scope) → Result<void, Error>        │
│  removeRole(userId: UserId, role: Role, scope: Scope) → Result<void, Error>        │
│  getRoles(userId: UserId) → Result<List<RoleAssignment>, Error>                    │
│  getUsersWithRole(role: Role, scope: Scope) → Result<List<UserId>, Error>          │
│                                                                                     │
│  // Permission Management                                                           │
│  grantPermission(subject: Subject, permission: Permission, resource: Resource)     │
│  revokePermission(subject: Subject, permission: Permission, resource: Resource)    │
│  getPermissions(subject: Subject) → Result<List<Permission>, Error>                │
│                                                                                     │
│  // Policy Management                                                               │
│  createPolicy(policy: Policy) → Result<PolicyId, Error>                            │
│  updatePolicy(policyId: PolicyId, policy: Policy) → Result<void, Error>            │
│  deletePolicy(policyId: PolicyId) → Result<void, Error>                            │
│  evaluatePolicy(context: PolicyContext) → Result<PolicyDecision, Error>            │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DECISION RESPONSE FORMAT:                                                          │
│  {                                                                                  │
│    allowed: Boolean,                                                                │
│    reason: String?,           // "ROLE_ADMIN" | "POLICY_DENY" | etc.               │
│    obligations: List<String>? // Additional requirements (e.g., "REQUIRE_MFA")      │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS EMITTED (→ M-09 Audit):                                                     │
│  • AUTHZ_DECISION { subject, action, resource, decision, reason, timestamp }        │
│  • ROLE_ASSIGNED { userId, role, scope, assignedBy, timestamp }                     │
│  • ROLE_REMOVED { userId, role, scope, removedBy, timestamp }                       │
│  • PERMISSION_GRANTED { subject, permission, resource, grantedBy, timestamp }       │
│  • POLICY_CREATED { policyId, createdBy, timestamp }                                │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
