CYBERCUBE API Design & Versioning Standard (v1)

Glossary

This glossary defines key terms used throughout the CYBERCUBE API Design & Versioning
Standard.

All definitions are normative unless stated otherwise.

A

API (Application Programming Interface)

A contract defining how software components communicate.

CYBERCUBE API types:
- REST API (primary)
- GraphQL API (optional, specific use cases)
- Webhooks (event delivery)
- Internal RPC (service-to-service)

API Key

A credential identifying a client application.

Properties:
- Public identifier (API-*) — safe to log
- Secret key — never logged, transmitted securely
- Scoped to tenant and permissions
- Rotatable without service interruption

See also: Authentication & Identity Standard

B

Base URL

The root URL for all API endpoints.

CYBERCUBE pattern:
```
https://api.cybercube.software
```

Environment variants:
- Production: `https://api.cybercube.software`
- Staging: `https://api.staging.cybercube.software`
- Development: `https://api.dev.cybercube.software`

Breaking Change

A modification that requires client updates to maintain functionality.

Examples:
- Removing an endpoint
- Removing a required field
- Changing field type
- Changing URL structure
- Changing authentication method

Breaking changes require major version increment.

C

Collection

A group of resources of the same type.

URL pattern: `/{resource-plural}`

Examples:
- `/projects` — collection of projects
- `/users` — collection of users

CRUD

Create, Read, Update, Delete — the four basic operations on resources.

| Operation | HTTP Method | Success Code |
|-----------|-------------|--------------|
| Create | POST | 201 Created |
| Read | GET | 200 OK |
| Update | PUT/PATCH | 200 OK |
| Delete | DELETE | 204 No Content |

Cursor

An opaque token representing a position in a paginated result set.

Properties:
- Opaque to clients (implementation detail)
- Encodes position, not page number
- Stable across data changes
- URL-safe encoding

See also: Pagination

D

Deprecation

The process of marking API elements as obsolete before removal.

Rules:
- Minimum 6-month deprecation period
- Deprecation header in responses
- Documentation update
- Migration guide provided

E

Endpoint

A specific URL path that accepts requests.

Format: `{method} {path}`

Example: `GET /api/v1/projects/{id}`

Envelope

A wrapper structure around response data.

CYBERCUBE uses envelopes for:
- Consistent structure
- Metadata (pagination, timing)
- Error information

See also: Response Envelope

Error

An unsuccessful API response.

CYBERCUBE error format:
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Project not found",
    "details": {...}
  }
}
```

F

Field

A named attribute within a request or response body.

Naming convention: `snake_case`

Examples:
- `created_at`
- `user_id`
- `is_active`

Filter

A query parameter that restricts results.

Pattern: `?filter[field]=value`

Examples:
- `?filter[status]=active`
- `?filter[created_at][gte]=2026-01-01`

G

GraphQL

A query language for APIs with a single endpoint.

CYBERCUBE GraphQL policy:
- Optional, not primary
- Used for complex nested queries
- Requires specific approval
- Rate limited by complexity

H

HATEOAS

Hypermedia As The Engine Of Application State.

CYBERCUBE implements limited HATEOAS:
- Pagination links (next, prev, first, last)
- Self links
- Related resource links (optional)

I

Idempotency

The property where multiple identical requests produce the same result.

Idempotent methods:
- GET (always)
- PUT (always)
- DELETE (always)
- POST (with idempotency key)

Idempotency Key

A client-generated unique identifier ensuring a request is processed only once.

Header: `Idempotency-Key: <uuid>`

Properties:
- Client-generated (UUIDv4 recommended)
- Valid for 24 hours
- Scoped to endpoint + method
- Stored server-side with response

L

Limit

The maximum number of items to return in a paginated response.

Default: 20
Maximum: 100
Parameter: `?limit=50`

M

Method

HTTP verb indicating the action to perform.

| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| GET | Read | Yes | Yes |
| POST | Create | No* | No |
| PUT | Replace | Yes | No |
| PATCH | Update | Yes | No |
| DELETE | Remove | Yes | No |

*POST is idempotent with Idempotency-Key

N

Nested Resource

A resource that exists within the context of a parent resource.

URL pattern: `/{parent}/{parent-id}/{child}`

Example: `/projects/PRJ-X2M8KD-7/tasks`

O

Offset

The number of items to skip in pagination (cursor-based preferred).

Parameter: `?offset=20`

Note: Offset pagination has performance issues at scale.

P

Pagination

The process of dividing results into discrete pages.

CYBERCUBE supports:
- Cursor-based (preferred)
- Offset-based (legacy support)

Page Size

Number of items per page.

Synonym for "limit" in pagination context.

Partial Response

Returning only requested fields.

Parameter: `?fields=id,name,status`

Path Parameter

A variable segment in the URL path.

Format: `/{resource}/{id}`

Example: `/projects/PRJ-X2M8KD-7`

Q

Query Parameter

A key-value pair appended to the URL.

Format: `?key=value`

Types:
- Filtering: `?filter[status]=active`
- Sorting: `?sort=-created_at`
- Pagination: `?cursor=abc123`
- Field selection: `?fields=id,name`

R

Rate Limiting

Restricting the number of requests within a time window.

Headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1737100000
```

Request

A client message to the API.

Components:
- Method (GET, POST, etc.)
- URL (path + query)
- Headers
- Body (optional)

Resource

An entity or object exposed via the API.

Identified by:
- Type (collection name)
- ID (CC-PID)

Response

A server message answering a request.

Components:
- Status code
- Headers
- Body (JSON)

Response Envelope

Standard wrapper for all API responses.

Success:
```json
{
  "data": {...},
  "meta": {...}
}
```

Error:
```json
{
  "error": {...}
}
```

S

Safe Method

An HTTP method that does not modify server state.

Safe methods: GET, HEAD, OPTIONS

Slug

A URL-friendly identifier.

CYBERCUBE uses CC-PIDs instead of slugs for resource identification.

Sort

Ordering of results.

Parameter: `?sort=field` or `?sort=-field` (descending)

Multiple: `?sort=-created_at,name`

Status Code

HTTP response code indicating result.

| Range | Meaning |
|-------|---------|
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client error |
| 5xx | Server error |

V

Versioning

Managing API changes over time.

CYBERCUBE strategy: URL path versioning

Pattern: `/api/v1/...`, `/api/v2/...`

W

Webhook

Server-to-server notification when events occur.

Components:
- Event type
- Payload
- Signature (for verification)
- Retry logic

---

CYBERCUBE API Design & Versioning Standard (v1)

**Standard ID:** STD-ENG-002  
**Status:** Active  
**Effective:** 2026-01-17  
**Classification:** INTERNAL  
**Owner:** Engineering  
**Applies to:** All CYBERCUBE public and internal APIs

0. Purpose & Design Principles

This standard defines how APIs are designed, versioned, and documented across CYBERCUBE
systems. It establishes conventions for consistency, predictability, and maintainability.

Industry alignment:
- Google API Design Guide
- Microsoft REST API Guidelines
- JSON:API Specification
- OpenAPI 3.0

Design principles:

1. **Consistency** — Same patterns everywhere
2. **Predictability** — Clients know what to expect
3. **Simplicity** — Easy to understand and use
4. **Evolvability** — Can change without breaking clients
5. **Security** — Secure by default
6. **Performance** — Efficient data transfer

This document does NOT define:
- Authentication mechanisms — see CYBERCUBE Authentication & Identity Standard (STD-SEC-003)
- Authorization rules — see CYBERCUBE Authorization & Access Control Standard (STD-SEC-004)
- Public Entity IDs — see CYBERCUBE Naming & Identifier Standard (STD-ENG-001)
- Data encryption — see CYBERCUBE Cryptography & Key Management Standard (STD-SEC-005)

1. API Types & Selection

CYBERCUBE supports multiple API types. Selection depends on use case and requirements.

1.1 API Type Matrix

| Type | Primary Use | When to Use |
|------|-------------|-------------|
| REST | External APIs, CRUD | Default choice |
| GraphQL | Complex nested queries | Mobile apps, dashboards |
| Webhooks | Event notifications | Async integrations |
| gRPC | Internal services | High-performance, typed |

1.2 REST API (Primary)

REST is the default API style for CYBERCUBE.

Characteristics:
- Resource-oriented
- HTTP methods for operations
- JSON request/response bodies
- Stateless
- Cacheable

Use REST when:
- Building public APIs
- CRUD operations dominate
- Cacheability is important
- Wide client compatibility needed

1.3 GraphQL API (Secondary)

GraphQL is available for specific use cases requiring approval.

Characteristics:
- Single endpoint
- Client-specified queries
- Strongly typed schema
- Introspection

Use GraphQL when:
- Complex nested data retrieval
- Mobile apps with bandwidth constraints
- Dashboard/reporting applications
- Client needs fine-grained field control

GraphQL requirements:
- Complexity limits (max depth: 10, max fields: 100)
- Rate limiting by query cost
- Persisted queries (production)
- Separate approval process

1.4 Webhooks

Webhooks deliver event notifications to client systems.

See: Webhook Standard (Section 9)

1.5 Internal APIs (gRPC)

Service-to-service communication may use gRPC for performance.

Requirements:
- Protocol Buffers schema
- Internal network only
- mTLS required
- Not exposed externally

2. URL Structure & Conventions

URLs follow a consistent structure for predictability.

2.1 Base URL Structure

```
https://api.cybercube.software/api/v{version}/{resource}
```

Components:
- Protocol: `https://` (always)
- Host: `api.cybercube.software`
- Path prefix: `/api`
- Version: `/v1`, `/v2`, etc.
- Resource: `/{resource-plural}`

2.2 URL Path Conventions

| Pattern | Example | Description |
|---------|---------|-------------|
| Collection | `/projects` | List/create resources |
| Resource | `/projects/{id}` | Single resource |
| Nested | `/projects/{id}/tasks` | Child collection |
| Action | `/projects/{id}/archive` | Non-CRUD operation |

2.3 Resource Naming Rules

**Collections** (plural nouns):
```
✓ /projects
✓ /users
✓ /invoices
✗ /project
✗ /getUsers
✗ /user-list
```

**Identifiers** (CC-PID):
```
✓ /projects/PRJ-X2M8KD-7
✓ /users/USR-4Q7T9P-K
✗ /projects/123
✗ /projects/my-project
```

**Nested resources**:
```
✓ /projects/PRJ-X2M8KD-7/tasks
✓ /projects/PRJ-X2M8KD-7/tasks/TSK-9F4K7Q-M
✗ /project-tasks
✗ /tasks?project_id=PRJ-X2M8KD-7 (for nested context)
```

**Actions** (verbs, POST only):
```
✓ POST /projects/PRJ-X2M8KD-7/archive
✓ POST /invoices/INV-4Q7T9P-K/send
✗ GET /projects/PRJ-X2M8KD-7/archive
✗ /archiveProject/PRJ-X2M8KD-7
```

2.4 URL Casing

- Path segments: `kebab-case` or `lowercase`
- Query parameters: `snake_case`
- Headers: `Title-Case`

```
✓ /api/v1/project-settings?include_archived=true
✗ /api/v1/projectSettings?includeArchived=true
```

2.5 Query Parameters

| Purpose | Pattern | Example |
|---------|---------|---------|
| Filtering | `filter[field]=value` | `?filter[status]=active` |
| Sorting | `sort=field,-field` | `?sort=-created_at,name` |
| Pagination | `cursor=token` | `?cursor=eyJpZCI6MTIz` |
| Limit | `limit=n` | `?limit=50` |
| Fields | `fields=a,b,c` | `?fields=id,name,status` |
| Include | `include=relation` | `?include=owner,tasks` |
| Search | `q=term` | `?q=dashboard` |

2.6 URL Examples

```
# List projects
GET /api/v1/projects

# List projects with filters
GET /api/v1/projects?filter[status]=active&sort=-created_at&limit=20

# Get single project
GET /api/v1/projects/PRJ-X2M8KD-7

# Get project with related data
GET /api/v1/projects/PRJ-X2M8KD-7?include=tasks,milestones

# List project tasks
GET /api/v1/projects/PRJ-X2M8KD-7/tasks

# Create task in project
POST /api/v1/projects/PRJ-X2M8KD-7/tasks

# Update task
PATCH /api/v1/tasks/TSK-9F4K7Q-M

# Archive project (action)
POST /api/v1/projects/PRJ-X2M8KD-7/archive

# Search across resources
GET /api/v1/search?q=dashboard&type=project,task
```

3. HTTP Methods & Operations

HTTP methods map to CRUD operations with consistent semantics.

3.1 Method Mapping

| Method | Operation | Request Body | Response Body | Idempotent |
|--------|-----------|--------------|---------------|------------|
| GET | Read | No | Yes | Yes |
| POST | Create | Yes | Yes | No* |
| PUT | Replace | Yes | Yes | Yes |
| PATCH | Update | Yes | Yes | Yes |
| DELETE | Remove | No | No | Yes |
| HEAD | Metadata | No | No | Yes |
| OPTIONS | Capabilities | No | Yes | Yes |

*POST is idempotent with `Idempotency-Key` header

3.2 GET (Read)

Retrieve a resource or collection.

```
GET /api/v1/projects/PRJ-X2M8KD-7
```

Response: `200 OK`
```json
{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "name": "Customer Portal",
      "status": "active",
      "created_at": "2026-01-15T10:00:00Z"
    }
  }
}
```

Rules:
- Never modify state
- Cacheable (with appropriate headers)
- Filterable, sortable, paginated (collections)
- Support field selection

3.3 POST (Create)

Create a new resource.

```
POST /api/v1/projects
Content-Type: application/json
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000

{
  "name": "New Project",
  "description": "Project description"
}
```

Response: `201 Created`
```json
{
  "data": {
    "id": "PRJ-7H3K6P-2",
    "type": "project",
    "attributes": {
      "name": "New Project",
      "description": "Project description",
      "status": "active",
      "created_at": "2026-01-17T12:00:00Z"
    }
  }
}
```

Headers:
```
Location: /api/v1/projects/PRJ-7H3K6P-2
```

Rules:
- Return `201 Created` on success
- Include `Location` header with resource URL
- Return created resource in body
- Support idempotency keys

3.4 PUT (Replace)

Replace entire resource (full update).

```
PUT /api/v1/projects/PRJ-X2M8KD-7
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "status": "active"
}
```

Response: `200 OK`

Rules:
- Replace entire resource
- All fields required (or use PATCH)
- Return updated resource
- Idempotent

3.5 PATCH (Update)

Partial update of resource.

```
PATCH /api/v1/projects/PRJ-X2M8KD-7
Content-Type: application/json

{
  "status": "archived"
}
```

Response: `200 OK`

Rules:
- Update only provided fields
- Null values clear fields (if allowed)
- Return updated resource
- Idempotent

3.6 DELETE (Remove)

Remove a resource.

```
DELETE /api/v1/projects/PRJ-X2M8KD-7
```

Response: `204 No Content`

Rules:
- Return `204 No Content` (no body)
- Idempotent (second delete returns 204 or 404)
- Soft delete preferred (when applicable)

3.7 Non-CRUD Actions

For operations that don't map to CRUD, use POST with action endpoints.

```
POST /api/v1/projects/PRJ-X2M8KD-7/archive
POST /api/v1/invoices/INV-4Q7T9P-K/send
POST /api/v1/tasks/TSK-9F4K7Q-M/assign

{
  "assignee_id": "USR-7H3K6P-2"
}
```

Rules:
- Always POST
- Action as last path segment
- Return affected resource or action result
- Document clearly

4. Request Format

Requests follow consistent structure for headers, body, and parameters.

4.1 Required Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes* | Bearer token or API key |
| `Content-Type` | Yes (POST/PUT/PATCH) | `application/json` |
| `Accept` | Recommended | `application/json` |
| `Idempotency-Key` | POST only | UUIDv4 for safe retries |
| `X-Request-ID` | Recommended | Client-generated trace ID |

*Public endpoints may not require authorization

**Tenant Context:**

CYBERCUBE is multi-tenant. Tenant context (`tenant_id`) is derived from the
authenticated session or token — NEVER from client-supplied headers, query
parameters, or request body. All API responses are scoped to the authenticated
tenant. See CYBERCUBE Customer Data Isolation & Multi-Tenancy Standard (STD-DAT-004).

4.2 Request Body Format

JSON only, with consistent field naming.

```json
{
  "name": "Project Name",
  "description": "Optional description",
  "config": {
    "enable_notifications": true,
    "default_assignee_id": "USR-X2M8KD-7"
  },
  "tags": ["frontend", "priority"]
}
```

Field naming:
- `snake_case` for all fields
- Boolean fields: `is_*`, `has_*`, `enable_*`
- Date fields: `*_at` suffix
- ID fields: `*_id` suffix

4.3 Request Validation

All requests are validated. Invalid requests return `400 Bad Request`.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "fields": {
        "name": ["Name is required", "Name must be at least 3 characters"],
        "email": ["Invalid email format"]
      }
    }
  }
}
```

4.4 Content Negotiation

Default: `application/json`

Request:
```
Accept: application/json
Content-Type: application/json
```

Unsupported media type returns `415 Unsupported Media Type`.

5. Response Format

All responses use a consistent envelope structure.

5.1 Response Envelope

**Success (single resource):**
```json
{
  "data": {
    "id": "PRJ-X2M8KD-7",
    "type": "project",
    "attributes": {
      "name": "Customer Portal",
      "status": "active",
      "created_at": "2026-01-15T10:00:00Z",
      "updated_at": "2026-01-17T08:30:00Z"
    },
    "relationships": {
      "owner": {
        "data": { "id": "USR-4Q7T9P-K", "type": "user" }
      }
    },
    "links": {
      "self": "/api/v1/projects/PRJ-X2M8KD-7"
    }
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-01-17T12:00:00Z"
  }
}
```

**Success (collection):**
```json
{
  "data": [
    {
      "id": "PRJ-X2M8KD-7",
      "type": "project",
      "attributes": {...}
    },
    {
      "id": "PRJ-9F4K7Q-M",
      "type": "project",
      "attributes": {...}
    }
  ],
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-01-17T12:00:00Z",
    "pagination": {
      "page_size": 20,
      "has_next": true,
      "has_prev": false
    }
  },
  "links": {
    "self": "/api/v1/projects?limit=20",
    "next": "/api/v1/projects?cursor=eyJpZCI6MjB9&limit=20",
    "first": "/api/v1/projects?limit=20"
  }
}
```

**Error:**
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Project not found",
    "details": {
      "resource_type": "project",
      "resource_id": "PRJ-INVALID-X"
    },
    "request_id": "req_abc123",
    "timestamp": "2026-01-17T12:00:00Z",
    "documentation_url": "https://docs.cybercube.software/errors/RESOURCE_NOT_FOUND"
  }
}
```

5.2 Response Fields

**Data object fields:**
| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | CC-PID identifier |
| `type` | Yes | Resource type (singular) |
| `attributes` | Yes | Resource data |
| `relationships` | No | Related resources |
| `links` | No | Related URLs |

**Attribute naming:**
- `snake_case` for all fields
- Dates: ISO 8601 format (`2026-01-17T12:00:00Z`)
- IDs: CC-PID format (`PRJ-X2M8KD-7`)
- Booleans: `is_*`, `has_*` prefix

5.3 HTTP Status Codes

**Success codes:**
| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 OK | Success | GET, PUT, PATCH |
| 201 Created | Resource created | POST |
| 202 Accepted | Async processing started | Long operations |
| 204 No Content | Success, no body | DELETE |

**Client error codes:**
| Code | Meaning | When to Use |
|------|---------|-------------|
| 400 Bad Request | Invalid request | Validation errors |
| 401 Unauthorized | Not authenticated | Missing/invalid token |
| 403 Forbidden | Not authorized | Insufficient permissions |
| 404 Not Found | Resource not found | Invalid ID |
| 405 Method Not Allowed | Wrong method | POST to read-only |
| 409 Conflict | State conflict | Duplicate, version mismatch |
| 410 Gone | Permanently deleted | Retired resource |
| 415 Unsupported Media Type | Wrong content type | Not JSON |
| 422 Unprocessable Entity | Semantic error | Business rule violation |
| 429 Too Many Requests | Rate limited | Throttled |

**Server error codes:**
| Code | Meaning | When to Use |
|------|---------|-------------|
| 500 Internal Server Error | Server error | Unexpected failure |
| 502 Bad Gateway | Upstream error | Dependency failure |
| 503 Service Unavailable | Temporarily down | Maintenance |
| 504 Gateway Timeout | Upstream timeout | Slow dependency |

5.4 Response Headers

**Standard headers:**
```
Content-Type: application/json; charset=utf-8
X-Request-ID: req_abc123
X-Response-Time: 45ms
```

**Rate limiting headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 998
X-RateLimit-Reset: 1737100000
Retry-After: 60 (when rate limited)
```

**Caching headers:**
```
Cache-Control: private, max-age=60
ETag: "abc123"
Last-Modified: Sat, 17 Jan 2026 12:00:00 GMT
```

**Deprecation headers:**
```
Deprecation: true
Sunset: Sat, 01 Jul 2026 00:00:00 GMT
Link: </api/v2/projects>; rel="successor-version"
```

6. Error Handling

Errors follow a consistent schema with actionable information.

6.1 Error Response Schema

```typescript
interface ErrorResponse {
  error: {
    code: string;           // Machine-readable code
    message: string;        // Human-readable message
    details?: {             // Additional context
      field?: string;       // Field that caused error
      fields?: Record<string, string[]>; // Multiple field errors
      reason?: string;      // Detailed reason
      resource_type?: string;
      resource_id?: string;
      [key: string]: any;
    };
    request_id: string;     // For support reference
    timestamp: string;      // ISO 8601
    documentation_url?: string; // Help link
  };
}
```

6.2 Error Code Registry

**Authentication errors (AUTH_*):**
| Code | Status | Description |
|------|--------|-------------|
| AUTH_TOKEN_MISSING | 401 | No authorization token |
| AUTH_TOKEN_INVALID | 401 | Invalid or expired token |
| AUTH_TOKEN_EXPIRED | 401 | Token has expired |
| AUTH_INSUFFICIENT_SCOPE | 403 | Token lacks required scope |

**Authorization errors (AUTHZ_*):**
| Code | Status | Description |
|------|--------|-------------|
| AUTHZ_ACCESS_DENIED | 403 | Access denied |
| AUTHZ_INSUFFICIENT_PERMISSIONS | 403 | Missing permission |
| AUTHZ_CROSS_TENANT_DENIED | 403 | Cross-tenant access |

**Resource errors (RESOURCE_*):**
| Code | Status | Description |
|------|--------|-------------|
| RESOURCE_NOT_FOUND | 404 | Resource does not exist |
| RESOURCE_ALREADY_EXISTS | 409 | Duplicate resource |
| RESOURCE_CONFLICT | 409 | State conflict |
| RESOURCE_GONE | 410 | Permanently deleted |
| RESOURCE_LOCKED | 423 | Resource is locked |

**Validation errors (VALIDATION_*):**
| Code | Status | Description |
|------|--------|-------------|
| VALIDATION_ERROR | 400 | Request validation failed |
| VALIDATION_REQUIRED_FIELD | 400 | Required field missing |
| VALIDATION_INVALID_FORMAT | 400 | Invalid field format |
| VALIDATION_INVALID_VALUE | 400 | Invalid field value |

**Rate limiting errors (RATE_*):**
| Code | Status | Description |
|------|--------|-------------|
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| RATE_LIMIT_QUOTA_EXCEEDED | 429 | Quota exhausted |

**Server errors (SERVER_*):**
| Code | Status | Description |
|------|--------|-------------|
| SERVER_ERROR | 500 | Internal server error |
| SERVER_UNAVAILABLE | 503 | Service unavailable |
| SERVER_TIMEOUT | 504 | Request timeout |

6.3 Error Examples

**Validation error:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "fields": {
        "name": ["Name is required"],
        "email": ["Invalid email format"],
        "start_date": ["Start date must be in the future"]
      }
    },
    "request_id": "req_abc123",
    "timestamp": "2026-01-17T12:00:00Z"
  }
}
```

**Resource not found:**
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Project not found",
    "details": {
      "resource_type": "project",
      "resource_id": "PRJ-INVALID-X"
    },
    "request_id": "req_abc123",
    "timestamp": "2026-01-17T12:00:00Z",
    "documentation_url": "https://docs.cybercube.software/errors/RESOURCE_NOT_FOUND"
  }
}
```

**Rate limited:**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please retry after 60 seconds.",
    "details": {
      "limit": 1000,
      "window": "1 hour",
      "retry_after": 60
    },
    "request_id": "req_abc123",
    "timestamp": "2026-01-17T12:00:00Z"
  }
}
```

6.4 Error Handling Guidelines

**DO:**
- Return consistent error structure
- Include machine-readable code
- Include human-readable message
- Include request ID for support
- Log full error server-side
- Return appropriate status code

**DON'T:**
- Expose internal implementation details
- Include stack traces in production
- Return different structures for same error type
- Use generic "error occurred" messages
- Expose sensitive data in errors

7. Pagination

Pagination enables efficient handling of large collections.

7.1 Pagination Strategies

| Strategy | Use Case | Pros | Cons |
|----------|----------|------|------|
| Cursor-based | Real-time data, large sets | Stable, performant | Complex to implement |
| Offset-based | Small sets, simple needs | Simple | Poor performance at scale |

**CYBERCUBE default: Cursor-based pagination**

7.2 Cursor-Based Pagination (Preferred)

Request:
```
GET /api/v1/projects?limit=20
GET /api/v1/projects?cursor=eyJpZCI6MjAsImNyZWF0ZWRfYXQiOiIyMDI2LTAxLTE1In0&limit=20
```

Response:
```json
{
  "data": [...],
  "meta": {
    "pagination": {
      "page_size": 20,
      "has_next": true,
      "has_prev": true
    }
  },
  "links": {
    "self": "/api/v1/projects?cursor=abc&limit=20",
    "next": "/api/v1/projects?cursor=xyz&limit=20",
    "prev": "/api/v1/projects?cursor=def&limit=20&direction=prev",
    "first": "/api/v1/projects?limit=20"
  }
}
```

Cursor format:
- Opaque to client (base64 encoded)
- Contains: last item ID, sort values
- URL-safe
- Expires after 24 hours (optional)

7.3 Offset-Based Pagination (Legacy)

Request:
```
GET /api/v1/projects?offset=0&limit=20
GET /api/v1/projects?offset=20&limit=20
```

Response:
```json
{
  "data": [...],
  "meta": {
    "pagination": {
      "total_count": 150,
      "offset": 20,
      "limit": 20,
      "has_next": true,
      "has_prev": true
    }
  },
  "links": {
    "self": "/api/v1/projects?offset=20&limit=20",
    "next": "/api/v1/projects?offset=40&limit=20",
    "prev": "/api/v1/projects?offset=0&limit=20",
    "first": "/api/v1/projects?offset=0&limit=20",
    "last": "/api/v1/projects?offset=140&limit=20"
  }
}
```

7.4 Pagination Parameters

| Parameter | Default | Maximum | Description |
|-----------|---------|---------|-------------|
| `limit` | 20 | 100 | Items per page |
| `cursor` | - | - | Position token |
| `offset` | 0 | 10000 | Skip count (legacy) |
| `direction` | `next` | - | `next` or `prev` |

7.5 Pagination Response Fields

```typescript
interface PaginationMeta {
  total_count?: number;    // Total items (expensive, optional)
  page_size: number;       // Items in current page
  has_next: boolean;       // More items available
  has_prev: boolean;       // Previous items available
}

interface PaginationLinks {
  self: string;            // Current page URL
  next?: string;           // Next page URL
  prev?: string;           // Previous page URL
  first?: string;          // First page URL
  last?: string;           // Last page URL (offset only)
}
```

7.6 Pagination Best Practices

**DO:**
- Default to cursor-based pagination
- Include `has_next` / `has_prev` flags
- Return consistent page sizes
- Support reasonable limits (max 100)
- Include links for navigation

**DON'T:**
- Return total_count by default (expensive)
- Allow unlimited page sizes
- Use offset for large datasets
- Change sort during pagination

8. Idempotency

Idempotency ensures safe retries without duplicate side effects.

8.1 Idempotency Key

Header: `Idempotency-Key: <client-generated-uuid>`

```
POST /api/v1/projects
Content-Type: application/json
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000

{
  "name": "New Project"
}
```

8.2 Idempotency Rules

| Aspect | Specification |
|--------|---------------|
| Format | UUIDv4 recommended |
| Scope | Per endpoint + method |
| TTL | 24 hours |
| Storage | Server-side with response |
| Replay | Return stored response |

8.3 Idempotency Behavior

**First request:**
1. Receive request with idempotency key
2. Check if key exists in store
3. If not: process request, store key + response
4. Return response

**Duplicate request (same key):**
1. Receive request with idempotency key
2. Check if key exists in store
3. If exists: return stored response
4. Do not reprocess

**Conflicting request (same key, different body):**
1. Receive request with idempotency key
2. Check if key exists with different body hash
3. Return `409 Conflict` error

8.4 Idempotency Response Headers

```
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
Idempotency-Replay: true (if replayed)
```

8.5 Methods Requiring Idempotency Keys

| Method | Idempotency Key |
|--------|-----------------|
| GET | Not needed (inherently idempotent) |
| POST | REQUIRED |
| PUT | Not needed (inherently idempotent) |
| PATCH | Not needed (inherently idempotent) |
| DELETE | Not needed (inherently idempotent) |

8.6 Idempotency Implementation

```typescript
interface IdempotencyRecord {
  key: string;              // Idempotency key
  endpoint: string;         // Request path
  method: string;           // HTTP method
  body_hash: string;        // SHA-256 of request body
  response_status: number;  // Stored response status
  response_body: string;    // Stored response body
  response_headers: Record<string, string>;
  created_at: Date;
  expires_at: Date;         // TTL
}

// Middleware pseudocode
async function idempotencyMiddleware(req, res, next) {
  const key = req.headers['idempotency-key'];
  
  if (!key && req.method === 'POST') {
    return res.status(400).json({
      error: { code: 'IDEMPOTENCY_KEY_REQUIRED' }
    });
  }
  
  if (key) {
    const existing = await getIdempotencyRecord(key, req.path, req.method);
    
    if (existing) {
      // Check for conflicting body
      const bodyHash = hash(req.body);
      if (existing.body_hash !== bodyHash) {
        return res.status(409).json({
          error: { code: 'IDEMPOTENCY_KEY_CONFLICT' }
        });
      }
      
      // Replay stored response
      res.set('Idempotency-Replay', 'true');
      return res.status(existing.response_status).json(
        JSON.parse(existing.response_body)
      );
    }
  }
  
  // Continue processing, store response after
  next();
}
```

9. Versioning Strategy

API versioning manages evolution while maintaining backward compatibility.

9.1 Versioning Approach

**CYBERCUBE uses URL path versioning:**

```
/api/v1/projects
/api/v2/projects
```

Rationale:
- Explicit and visible
- Easy to route
- Cache-friendly
- Client-obvious

9.2 Version Format

| Component | Format | Example |
|-----------|--------|---------|
| Major version | `v{n}` | `v1`, `v2` |
| Full version | Header | `X-API-Version: 2026-01-17` |

URL contains major version only. Minor/patch changes within version.

9.3 Version Lifecycle

```
Development → Beta → Stable → Deprecated → Sunset
```

| Stage | Duration | Description |
|-------|----------|-------------|
| Development | Variable | Internal only |
| Beta | 3-6 months | External opt-in, may change |
| Stable | 2+ years | Fully supported |
| Deprecated | 6-12 months | Supported, migration encouraged |
| Sunset | - | No longer available |

9.4 Breaking vs Non-Breaking Changes

**Non-breaking (same version):**
- Adding new endpoints
- Adding optional fields
- Adding new response fields
- Adding new query parameters
- Increasing rate limits
- Bug fixes

**Breaking (new version):**
- Removing endpoints
- Removing fields
- Changing field types
- Changing URL structure
- Changing authentication
- Reducing rate limits
- Changing error codes

9.5 Deprecation Process

1. **Announce deprecation** (6+ months before sunset)
   - Update documentation
   - Add `Deprecation` header
   - Notify API users

2. **Provide migration path**
   - Document changes
   - Provide migration guide
   - Offer parallel access

3. **Monitor usage**
   - Track deprecated endpoint usage
   - Contact active users
   - Extend if needed

4. **Sunset**
   - Remove endpoint
   - Return `410 Gone`

9.6 Deprecation Headers

```
Deprecation: true
Sunset: Sat, 01 Jul 2026 00:00:00 GMT
Link: </api/v2/projects>; rel="successor-version"
```

9.7 Version Support Policy

| Version | Support Status | End of Life |
|---------|---------------|-------------|
| v1 | Stable | TBD (2+ years minimum) |
| v2 | When released | v1 EOL + 1 year |

10. Webhooks

Webhooks deliver event notifications to client systems.

10.1 Webhook Structure

```json
{
  "id": "WEB-X2M8KD-7",
  "type": "project.created",
  "created_at": "2026-01-17T12:00:00Z",
  "data": {
    "id": "PRJ-9F4K7Q-M",
    "type": "project",
    "attributes": {
      "name": "New Project",
      "created_at": "2026-01-17T12:00:00Z"
    }
  },
  "metadata": {
    "account_id": "ACC-4Q7T9P-K",
    "user_id": "USR-7H3K6P-2",
    "request_id": "req_abc123"
  }
}
```

10.2 Event Types

Format: `{resource}.{action}`

| Event | Description |
|-------|-------------|
| `project.created` | Project created |
| `project.updated` | Project updated |
| `project.deleted` | Project deleted |
| `project.archived` | Project archived |
| `task.created` | Task created |
| `task.completed` | Task completed |
| `invoice.sent` | Invoice sent |
| `invoice.paid` | Invoice paid |
| `user.invited` | User invited |
| `user.activated` | User activated |

10.3 Webhook Security

**Signature verification:**
```
X-Webhook-Signature: sha256=abc123...
X-Webhook-Timestamp: 1737100000
```

Signature algorithm:
```
signature = HMAC-SHA256(
  key: webhook_secret,
  message: timestamp + "." + body
)
```

Verification:
```typescript
function verifyWebhook(req, secret) {
  const signature = req.headers['x-webhook-signature'];
  const timestamp = req.headers['x-webhook-timestamp'];
  const body = req.rawBody;
  
  // Check timestamp (prevent replay)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) {
    throw new Error('Timestamp too old');
  }
  
  // Verify signature
  const expected = 'sha256=' + hmacSha256(secret, timestamp + '.' + body);
  if (!timingSafeEqual(signature, expected)) {
    throw new Error('Invalid signature');
  }
}
```

10.4 Webhook Delivery

| Aspect | Specification |
|--------|---------------|
| Timeout | 30 seconds |
| Retries | 5 attempts |
| Backoff | Exponential (1, 2, 4, 8, 16 minutes) |
| Success | 2xx response |
| Failure action | Disable after 5 consecutive failures |

10.5 Webhook Registration

```
POST /api/v1/webhooks
{
  "url": "https://example.com/webhooks/cybercube",
  "events": ["project.created", "project.updated"],
  "secret": "auto" // or provide custom
}
```

Response:
```json
{
  "data": {
    "id": "WEB-X2M8KD-7",
    "url": "https://example.com/webhooks/cybercube",
    "events": ["project.created", "project.updated"],
    "secret": "whsec_abc123...",
    "status": "active"
  }
}
```

11. Rate Limiting

Rate limiting protects the API from abuse and ensures fair usage.

11.1 Rate Limit Tiers

| Tier | Requests/Hour | Burst | Use Case |
|------|---------------|-------|----------|
| Free | 100 | 10/min | Trial, testing |
| Standard | 1,000 | 100/min | Normal usage |
| Professional | 10,000 | 500/min | High volume |
| Enterprise | Custom | Custom | Negotiated |

11.2 Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 998
X-RateLimit-Reset: 1737100000
```

When exceeded:
```
HTTP/1.1 429 Too Many Requests
Retry-After: 60

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": {
      "limit": 1000,
      "window": "1 hour",
      "retry_after": 60
    }
  }
}
```

11.3 Rate Limit Scopes

| Scope | Applied To | Notes |
|-------|------------|-------|
| Global | Per API key | Overall limit |
| Per-endpoint | Specific endpoint | Sensitive endpoints |
| Per-resource | Specific resource | Write protection |

11.4 Rate Limit Best Practices

**For clients:**
- Check `X-RateLimit-Remaining` header
- Implement exponential backoff
- Cache responses where possible
- Use webhooks instead of polling

**For server:**
- Return informative headers
- Provide burst allowance
- Differentiate by endpoint criticality
- Log rate limit events

12. Implementation Guidelines

12.1 OpenAPI Specification

All APIs MUST be documented with OpenAPI 3.0+.

```yaml
openapi: 3.0.3
info:
  title: CYBERCUBE API
  version: 1.0.0
  description: CYBERCUBE Platform API
servers:
  - url: https://api.cybercube.software/api/v1
paths:
  /projects:
    get:
      summary: List projects
      operationId: listProjects
      tags: [Projects]
      parameters:
        - $ref: '#/components/parameters/limitParam'
        - $ref: '#/components/parameters/cursorParam'
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProjectListResponse'
```

12.2 Reference Implementation

```typescript
// api-response.ts - Response helpers

export interface ApiResponse<T> {
  data: T;
  meta?: ResponseMeta;
  links?: ResponseLinks;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    request_id: string;
    timestamp: string;
    documentation_url?: string;
  };
}

export interface ResponseMeta {
  request_id: string;
  timestamp: string;
  pagination?: PaginationMeta;
}

export interface ResponseLinks {
  self: string;
  next?: string;
  prev?: string;
  first?: string;
  last?: string;
}

export interface PaginationMeta {
  total_count?: number;
  page_size: number;
  has_next: boolean;
  has_prev: boolean;
}

/**
 * Create success response
 */
export function success<T>(
  data: T,
  meta?: Partial<ResponseMeta>,
  links?: ResponseLinks
): ApiResponse<T> {
  return {
    data,
    meta: {
      request_id: generateRequestId(),
      timestamp: new Date().toISOString(),
      ...meta,
    },
    links,
  };
}

/**
 * Create error response
 */
export function error(
  code: string,
  message: string,
  status: number,
  details?: Record<string, any>
): { status: number; body: ApiError } {
  return {
    status,
    body: {
      error: {
        code,
        message,
        details,
        request_id: generateRequestId(),
        timestamp: new Date().toISOString(),
        documentation_url: `https://docs.cybercube.software/errors/${code}`,
      },
    },
  };
}

/**
 * Create paginated response
 */
export function paginated<T>(
  data: T[],
  pagination: PaginationMeta,
  links: ResponseLinks
): ApiResponse<T[]> {
  return {
    data,
    meta: {
      request_id: generateRequestId(),
      timestamp: new Date().toISOString(),
      pagination,
    },
    links,
  };
}

// Common error helpers
export const errors = {
  notFound: (type: string, id: string) =>
    error('RESOURCE_NOT_FOUND', `${type} not found`, 404, {
      resource_type: type,
      resource_id: id,
    }),

  unauthorized: () =>
    error('AUTH_TOKEN_INVALID', 'Invalid or missing authentication', 401),

  forbidden: (permission?: string) =>
    error('AUTHZ_ACCESS_DENIED', 'Access denied', 403, { permission }),

  validation: (fields: Record<string, string[]>) =>
    error('VALIDATION_ERROR', 'Request validation failed', 400, { fields }),

  rateLimited: (retryAfter: number) =>
    error('RATE_LIMIT_EXCEEDED', 'Too many requests', 429, {
      retry_after: retryAfter,
    }),
};
```

12.3 Request Validation

```typescript
// validation.ts - Request validation

import { z } from 'zod';

// Common field schemas
export const ccPidSchema = z.string().regex(
  /^[A-Z]{3}-[A-HJ-NP-Z2-9]{6}-[A-HJ-NP-Z2-9]$/,
  'Invalid CC-PID format'
);

export const paginationSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
  offset: z.coerce.number().min(0).max(10000).optional(),
});

export const sortSchema = z.string().regex(
  /^-?[a-z_]+(?:,-?[a-z_]+)*$/,
  'Invalid sort format'
);

// Example endpoint schema
export const createProjectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  visibility: z.enum(['public', 'team', 'private']).default('team'),
  team_id: ccPidSchema.optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

// Validation middleware
export function validate<T>(schema: z.ZodSchema<T>) {
  return async (req, res, next) => {
    try {
      req.validated = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fields: Record<string, string[]> = {};
        for (const issue of err.issues) {
          const path = issue.path.join('.');
          fields[path] = fields[path] || [];
          fields[path].push(issue.message);
        }
        return res.status(400).json(errors.validation(fields).body);
      }
      next(err);
    }
  };
}
```

12.4 Cursor Pagination Implementation

```typescript
// pagination.ts - Cursor-based pagination

interface CursorData {
  id: string;
  sort_values: Record<string, any>;
}

/**
 * Encode cursor for client
 */
export function encodeCursor(data: CursorData): string {
  return Buffer.from(JSON.stringify(data)).toString('base64url');
}

/**
 * Decode cursor from client
 */
export function decodeCursor(cursor: string): CursorData | null {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64url').toString());
  } catch {
    return null;
  }
}

/**
 * Build cursor-based query
 */
export function buildCursorQuery(
  cursor: string | undefined,
  sortField: string,
  sortDirection: 'asc' | 'desc'
) {
  if (!cursor) {
    return { where: {}, order: { [sortField]: sortDirection } };
  }

  const data = decodeCursor(cursor);
  if (!data) {
    throw new Error('Invalid cursor');
  }

  const operator = sortDirection === 'asc' ? '>' : '<';
  return {
    where: {
      [sortField]: { [operator]: data.sort_values[sortField] },
    },
    order: { [sortField]: sortDirection },
  };
}

/**
 * Build pagination response
 */
export function buildPaginationResponse<T extends { id: string }>(
  items: T[],
  limit: number,
  baseUrl: string,
  sortField: string = 'created_at'
): { meta: { pagination: PaginationMeta }; links: ResponseLinks } {
  const hasNext = items.length > limit;
  const data = hasNext ? items.slice(0, limit) : items;
  
  const lastItem = data[data.length - 1];
  const firstItem = data[0];
  
  const links: ResponseLinks = {
    self: `${baseUrl}?limit=${limit}`,
    first: `${baseUrl}?limit=${limit}`,
  };
  
  if (hasNext && lastItem) {
    const nextCursor = encodeCursor({
      id: lastItem.id,
      sort_values: { [sortField]: lastItem[sortField] },
    });
    links.next = `${baseUrl}?cursor=${nextCursor}&limit=${limit}`;
  }
  
  return {
    meta: {
      pagination: {
        page_size: data.length,
        has_next: hasNext,
        has_prev: false, // Simplified; track in cursor for full support
      },
    },
    links,
  };
}
```

---

CYBERCUBE API Design — Developer Cheat Sheet

Print it. Pin it. Reference it.

🔹 API Type Selection

```
REST (default) → CRUD, public APIs
GraphQL        → Complex queries, mobile
Webhooks       → Event notifications
gRPC           → Internal services
```

🔹 URL Structure

```
https://api.cybercube.software/api/v1/{resource}

Examples:
GET    /api/v1/projects                 # List
GET    /api/v1/projects/PRJ-X2M8KD-7    # Read
POST   /api/v1/projects                 # Create
PATCH  /api/v1/projects/PRJ-X2M8KD-7    # Update
DELETE /api/v1/projects/PRJ-X2M8KD-7    # Delete
POST   /api/v1/projects/PRJ-X2M8KD-7/archive  # Action
```

🔹 HTTP Methods

| Method | Use | Idempotent | Body |
|--------|-----|------------|------|
| GET | Read | Yes | No |
| POST | Create | No* | Yes |
| PUT | Replace | Yes | Yes |
| PATCH | Update | Yes | Yes |
| DELETE | Remove | Yes | No |

*With Idempotency-Key

🔹 Status Codes

```
200 OK          → GET, PUT, PATCH success
201 Created     → POST success
204 No Content  → DELETE success
400 Bad Request → Validation error
401 Unauthorized → Auth error
403 Forbidden   → Permission error
404 Not Found   → Resource not found
409 Conflict    → State conflict
429 Too Many    → Rate limited
500 Server Error → Bug
```

🔹 Response Envelope

```json
// Success
{
  "data": {...},
  "meta": { "request_id": "..." },
  "links": { "self": "..." }
}

// Error
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human message",
    "details": {...}
  }
}
```

🔹 Query Parameters

```
Filtering:  ?filter[status]=active
Sorting:    ?sort=-created_at,name
Pagination: ?cursor=abc123&limit=20
Fields:     ?fields=id,name,status
Include:    ?include=owner,tasks
Search:     ?q=dashboard
```

🔹 Pagination (Cursor-Based)

```json
{
  "data": [...],
  "meta": {
    "pagination": {
      "page_size": 20,
      "has_next": true,
      "has_prev": false
    }
  },
  "links": {
    "self": "/api/v1/projects?limit=20",
    "next": "/api/v1/projects?cursor=xyz&limit=20"
  }
}
```

🔹 Idempotency Keys

```
POST /api/v1/projects
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000

# Same key = same response (no duplicate)
# TTL: 24 hours
```

🔹 Required Headers

```
Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json
Idempotency-Key: <uuid>  # POST only
X-Request-ID: <uuid>     # Tracing
```

🔹 Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 998
X-RateLimit-Reset: 1737100000
Retry-After: 60  # When 429
```

🔹 Error Codes

```
AUTH_*       → Authentication errors
AUTHZ_*      → Authorization errors
RESOURCE_*   → Resource errors
VALIDATION_* → Validation errors
RATE_*       → Rate limiting errors
SERVER_*     → Server errors
```

🔹 Versioning

```
URL path versioning: /api/v1/, /api/v2/

Breaking changes → New version
Non-breaking     → Same version

Deprecation: 6+ months notice
Sunset header when deprecated
```

🔹 Naming Conventions

```
URLs:      kebab-case or lowercase
Fields:    snake_case
Headers:   Title-Case
Resources: plural nouns (/projects)
IDs:       CC-PID format (PRJ-X2M8KD-7)
```

🔹 What You MUST Do

✅ Use CC-PIDs for resource IDs
✅ Return consistent response envelope
✅ Include request_id in all responses
✅ Use appropriate status codes
✅ Validate all inputs
✅ Support pagination for lists
✅ Document with OpenAPI

🔹 What You MUST NOT Do

❌ Expose internal IDs (UUIDs)
❌ Return inconsistent error formats
❌ Use verbs in URLs (except actions)
❌ Break backwards compatibility
❌ Skip idempotency for POST
❌ Return stack traces in production
❌ Use query params for sensitive data

🔹 Mental Model

```
Resource   → noun, plural (/projects)
Action     → HTTP method (GET, POST...)
ID         → CC-PID (PRJ-X2M8KD-7)
Response   → envelope (data + meta)
Error      → code + message + details
```

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Response Envelope | PARTIAL | Needs standardization |
| Error Codes | PARTIAL | Needs registry |
| Cursor Pagination | PENDING | Offset exists |
| Idempotency Keys | PENDING | Not implemented |
| Rate Limiting | PARTIAL | Basic exists |
| OpenAPI Docs | PARTIAL | Needs completion |
| Versioning | ACTIVE | v1 in production |
| Webhooks | PARTIAL | Basic support |

### Migration Path

1. **Phase 1**: Response envelope standardization
2. **Phase 2**: Error code registry
3. **Phase 3**: Cursor pagination
4. **Phase 4**: Idempotency key support
5. **Phase 5**: Rate limiting enhancements
6. **Phase 6**: OpenAPI documentation complete

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| CYBERCUBE Naming & Identifier Standard (STD-ENG-001) | CC-PID format for resource IDs |
| CYBERCUBE Authentication & Identity Standard (STD-SEC-003) | API authentication mechanisms |
| CYBERCUBE Authorization & Access Control Standard (STD-SEC-004) | API authorization, tenant isolation |
| CYBERCUBE Cryptography & Key Management Standard (STD-SEC-005) | TLS, encryption standards |
| CYBERCUBE Customer Data Isolation & Multi-Tenancy Standard (STD-DAT-004) | Tenant scoping in API requests |
| CYBERCUBE Observability & Telemetry Standard (STD-OPS-005) | API metrics, tracing, logging |

---

Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |
