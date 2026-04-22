CYBERCUBE Observability & Telemetry Standard (v1)

Glossary

This glossary defines key terms used throughout the CYBERCUBE Observability & Telemetry
Standard.

All definitions are normative unless stated otherwise.

A

Alert

A notification triggered when a metric crosses a threshold or anomaly is detected.

Components:
- Condition (threshold, anomaly, absence)
- Severity (critical, warning, info)
- Channel (PagerDuty, Slack, email)
- Runbook link

Attribute

A key-value pair providing context to spans, logs, or metrics.

Naming: `snake_case`

Examples:
- `user_id`: `USR-X2M8KD-7`
- `tenant_id`: `ACC-9F4K7Q-M`
- `http_status_code`: `200`

B

Baggage

Context data propagated across service boundaries.

OpenTelemetry baggage:
- Key-value pairs
- Propagated via headers
- Used for correlation

C

Cardinality

The number of unique values for a metric label.

High cardinality:
- User IDs (millions)
- Request IDs (unbounded)
- Timestamps (continuous)

Low cardinality (preferred):
- HTTP methods (few)
- Status codes (bounded)
- Regions (finite)

Correlation ID

A unique identifier linking related events across services.

CYBERCUBE format: `req_{random}`

Propagation: `X-Request-ID` header

D

Dashboard

A visual display of metrics and logs.

Requirements:
- Clear purpose statement
- Consistent time ranges
- Actionable panels
- No PII in titles/labels

Dimension

A label or tag used to filter or group metrics.

Synonym: Label, Tag

Distributed Tracing

Tracking requests across multiple services.

Components:
- Trace ID (global)
- Span ID (local)
- Parent span ID (hierarchy)

E

Event

A discrete occurrence with timestamp and attributes.

Types:
- Log event
- Span event (annotation)
- Custom event

Exemplar

A link from an aggregated metric to a specific trace.

Purpose: Drill down from metric to trace

F

Field

A structured data element in a log entry.

Types:
- Required fields (timestamp, level, message)
- Standard fields (request_id, tenant_id)
- Custom fields (domain-specific)

G

Golden Signals

The four key metrics for monitoring (Google SRE):
- Latency
- Traffic
- Errors
- Saturation

H

Histogram

A metric type capturing value distributions.

Use for:
- Request latencies
- Payload sizes
- Queue depths

Buckets: Predefined value ranges

I

Instrumentation

Adding observability code to applications.

Types:
- Auto-instrumentation (libraries)
- Manual instrumentation (custom)

L

Label

A key-value pair attached to a metric for filtering.

Synonym: Tag, Dimension

Rules:
- Low cardinality only
- No PII
- Consistent naming

Log

A timestamped record of an event.

Components:
- Timestamp (ISO 8601, UTC)
- Level (severity)
- Message (description)
- Attributes (context)

Log Level

The severity classification of a log entry.

CYBERCUBE levels:
- FATAL
- ERROR
- WARN
- INFO
- DEBUG
- TRACE

M

Metric

A numeric measurement over time.

Types:
- Counter (cumulative)
- Gauge (point-in-time)
- Histogram (distribution)
- Summary (percentiles)

N

Namespace

A prefix grouping related metrics.

CYBERCUBE pattern: `cybercube.{service}.{domain}`

O

OpenTelemetry (OTel)

The industry standard for observability telemetry.

Components:
- Traces
- Metrics
- Logs
- Baggage

CYBERCUBE adopts OpenTelemetry semantics.

P

PII (Personally Identifiable Information)

Data that can identify a person.

PII MUST be redacted from:
- Log messages
- Metric labels
- Span attributes
- Error messages

Propagation

Passing context between services.

Headers:
- `traceparent` (W3C Trace Context)
- `X-Request-ID` (CYBERCUBE correlation)
- `X-Tenant-ID` (tenant context)

R

Redaction

Removing or masking sensitive data.

Strategies:
- Full removal (`[REDACTED]`)
- Partial masking (`j***@example.com`)
- Hashing (for correlation)
- Tokenization (for lookup)

Request ID

A unique identifier for each incoming request.

Format: `req_{base62_random}`

Propagation: `X-Request-ID` header

Retention

How long telemetry data is kept.

| Type | Retention |
|------|-----------|
| Metrics | 90 days |
| Logs (hot) | 14 days |
| Logs (archive) | 1 year |
| Traces | 14 days |

S

Sampling

Collecting a subset of traces to reduce volume.

Strategies:
- Head-based (decision at start)
- Tail-based (decision at end)
- Rate limiting
- Error sampling (always capture errors)

Scrubbing

Removing sensitive data from telemetry.

Synonym: Redaction, Sanitization

SLI (Service Level Indicator)

A metric measuring service performance.

Examples:
- Request latency p99
- Error rate percentage
- Availability percentage

SLO (Service Level Objective)

A target value for an SLI.

Examples:
- p99 latency < 200ms
- Error rate < 0.1%
- Availability > 99.9%

Span

A single operation within a trace.

Attributes:
- Name (operation)
- Start/end time
- Status (ok, error)
- Attributes (context)
- Events (annotations)

Structured Logging

Logging with machine-parseable fields.

Format: JSON

Required for CYBERCUBE logs.

T

Tag

A key-value pair for categorizing telemetry.

Synonym: Label, Dimension

Telemetry

Observable data about system behavior.

Types:
- Logs (events)
- Metrics (measurements)
- Traces (request flow)

Trace

A collection of spans representing an end-to-end request.

Components:
- Trace ID (global identifier)
- Root span (entry point)
- Child spans (nested operations)

Trace Context

Standard for propagating trace information.

W3C headers:
- `traceparent`: `{version}-{trace_id}-{span_id}-{flags}`
- `tracestate`: vendor-specific data

Trace ID

A unique identifier for an entire trace.

Format: 32 hex characters (128 bits)

Example: `463ac35c9f6413ad48485a3953bb6124`

U

Unit

The measurement unit for a metric.

Standard units:
- `ms` (milliseconds)
- `bytes`
- `requests`
- `connections`
- `percent` (0-100)

---

CYBERCUBE Observability & Telemetry Standard (v1)

**Standard ID:** STD-OPS-003  
**Status:** Active  
**Effective:** 2026-01-17  
**Classification:** INTERNAL  
**Owner:** Engineering / SRE  
**Applies to:** All CYBERCUBE services and applications

0. Purpose & Design Principles

This standard defines how telemetry data (logs, metrics, traces) is collected, structured,
and managed across CYBERCUBE systems while protecting sensitive data.

Industry alignment:
- OpenTelemetry Specification
- Google SRE Practices
- Prometheus Naming Conventions
- W3C Trace Context
- OWASP Logging Cheat Sheet

Design principles:

1. **Privacy by Default** — No PII in telemetry unless explicitly permitted
2. **Correlation** — Link related events across services
3. **Structured Data** — Machine-parseable formats
4. **Consistency** — Same patterns everywhere
5. **Actionability** — Data that enables action
6. **Efficiency** — Minimal overhead, appropriate sampling

This document does NOT define:
- Data classification — see Data Classification & Retention Standard
- Incident response — see Security Incident Standard
- Alerting rules — see Monitoring Playbooks

1. Logging

Logs capture discrete events for debugging, auditing, and analysis.

1.1 Log Format

All logs MUST be structured JSON:

```json
{
  "timestamp": "2026-01-17T12:00:00.123Z",
  "level": "INFO",
  "message": "Request completed",
  "service": "api-gateway",
  "version": "1.2.3",
  "environment": "production",
  "request_id": "req_7Hx9mPqR2vN5",
  "trace_id": "463ac35c9f6413ad48485a3953bb6124",
  "span_id": "0020000000000001",
  "tenant_id": "ACC-9F4K7Q-M",
  "user_id": "USR-X2M8KD-7",
  "http": {
    "method": "GET",
    "path": "/api/v1/projects",
    "status_code": 200,
    "duration_ms": 45
  },
  "extra": {}
}
```

1.2 Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `timestamp` | string | ISO 8601 UTC with milliseconds | `2026-01-17T12:00:00.123Z` |
| `level` | string | Log level | `INFO` |
| `message` | string | Human-readable description | `Request completed` |
| `service` | string | Service name | `api-gateway` |
| `version` | string | Service version | `1.2.3` |
| `environment` | string | Deployment environment | `production` |

1.3 Standard Fields

| Field | Type | When Required | Description |
|-------|------|---------------|-------------|
| `request_id` | string | HTTP requests | Correlation ID |
| `trace_id` | string | Traced requests | OpenTelemetry trace |
| `span_id` | string | Traced requests | Current span |
| `tenant_id` | string | Tenant context | Account CC-PID |
| `user_id` | string | Authenticated requests | User CC-PID |
| `error` | object | Error logs | Error details |

1.4 Log Levels

| Level | Code | When to Use | Examples |
|-------|------|-------------|----------|
| `FATAL` | 60 | System cannot continue | Database connection lost, out of memory |
| `ERROR` | 50 | Operation failed | Unhandled exception, external API failure |
| `WARN` | 40 | Unexpected but recoverable | Retry succeeded, deprecated API used |
| `INFO` | 30 | Significant events | Request completed, user logged in |
| `DEBUG` | 20 | Diagnostic information | Query executed, cache miss |
| `TRACE` | 10 | Detailed debugging | Function entry/exit, variable values |

Level guidelines:
- Production default: `INFO`
- Debug mode: `DEBUG`
- Never enable `TRACE` in production (performance)
- `FATAL` triggers immediate alerts

1.5 Error Logging

Error logs MUST include structured error details:

```json
{
  "timestamp": "2026-01-17T12:00:00.123Z",
  "level": "ERROR",
  "message": "Failed to process payment",
  "service": "billing-service",
  "request_id": "req_7Hx9mPqR2vN5",
  "error": {
    "type": "PaymentProcessingError",
    "code": "PAYMENT_DECLINED",
    "message": "Card was declined by issuer",
    "stack": "PaymentProcessingError: Card was declined...",
    "cause": {
      "type": "StripeError",
      "code": "card_declined"
    }
  },
  "context": {
    "invoice_id": "INV-4Q7T9P-K",
    "amount": 9900,
    "currency": "USD"
  }
}
```

Error fields:
- `type`: Exception class name
- `code`: Application error code
- `message`: Error message (scrubbed of PII)
- `stack`: Stack trace (production: truncated)
- `cause`: Nested error (if applicable)

1.6 HTTP Request Logging

Log HTTP requests with standard fields:

```json
{
  "timestamp": "2026-01-17T12:00:00.123Z",
  "level": "INFO",
  "message": "HTTP request completed",
  "http": {
    "method": "POST",
    "path": "/api/v1/projects",
    "route": "/api/v1/projects",
    "status_code": 201,
    "duration_ms": 127,
    "request_size_bytes": 256,
    "response_size_bytes": 512,
    "client_ip": "[REDACTED]",
    "user_agent": "Mozilla/5.0..."
  }
}
```

**Log request/response bodies only when:**
- Level is DEBUG or TRACE
- Bodies are scrubbed of PII
- Size is under 10KB
- Content is not binary

1.7 Database Query Logging

```json
{
  "timestamp": "2026-01-17T12:00:00.123Z",
  "level": "DEBUG",
  "message": "Query executed",
  "db": {
    "system": "postgresql",
    "name": "cybercube_production",
    "operation": "SELECT",
    "table": "projects",
    "duration_ms": 12,
    "rows_affected": 25
  },
  "query": {
    "text": "SELECT id, name FROM projects WHERE tenant_id = $1",
    "params": "[REDACTED]"
  }
}
```

**Never log:**
- Query parameters containing PII
- Full query with interpolated values
- Connection credentials

1.8 Audit Logging

Audit logs record security-relevant events:

```json
{
  "timestamp": "2026-01-17T12:00:00.123Z",
  "level": "INFO",
  "message": "User logged in",
  "type": "audit",
  "audit": {
    "action": "user.login",
    "actor_id": "USR-X2M8KD-7",
    "actor_type": "user",
    "resource_type": "session",
    "resource_id": "SES-7H3K6P-2",
    "outcome": "success",
    "ip_address": "[HASHED]",
    "user_agent": "Mozilla/5.0...",
    "changes": {}
  },
  "tenant_id": "ACC-9F4K7Q-M"
}
```

Audit events (see Authorization Standard):
- Authentication events
- Authorization decisions
- Data access
- Configuration changes
- Privilege changes

2. Redaction & PII Protection

All telemetry MUST be scrubbed of PII before storage.

2.1 Redaction Rules

| Data Type | Redaction Method | Example |
|-----------|------------------|---------|
| Email | Partial mask | `j***@example.com` |
| Phone | Partial mask | `+1-***-***-7890` |
| Name | Full redact | `[NAME]` |
| Address | Full redact | `[ADDRESS]` |
| SSN | Full redact | `[SSN]` |
| Credit card | Partial mask | `****-****-****-1234` |
| Password | Never log | — |
| API secret | Never log | — |
| Auth token | Never log | — |
| IP address | Hash or redact | `[IP]` or hash |
| Query params | Selective | Redact PII fields |

2.2 Field Classification

| Field | Log Level | Allowed In |
|-------|-----------|------------|
| CC-PID (USR-*) | INFO+ | Logs, traces, metrics (low cardinality) |
| CC-PID (other) | DEBUG+ | Logs, traces, spans |
| Email | Never | — |
| Name | Never | — |
| Phone | Never | — |
| IP Address | DEBUG (hashed) | Logs only |
| Request body | DEBUG (scrubbed) | Logs only |
| Response body | DEBUG (scrubbed) | Logs only |
| Stack trace | ERROR+ | Logs only |

2.3 Redaction Implementation

```typescript
// redaction-service.ts

interface RedactionConfig {
  fields: Record<string, RedactionStrategy>;
  patterns: PatternRedaction[];
}

type RedactionStrategy = 
  | 'full'           // Replace with [REDACTED]
  | 'partial_email'  // j***@example.com
  | 'partial_phone'  // +1-***-***-7890
  | 'partial_card'   // ****-****-****-1234
  | 'hash'           // SHA-256 (for correlation)
  | 'remove';        // Remove field entirely

const REDACTION_CONFIG: RedactionConfig = {
  fields: {
    'email': 'partial_email',
    'phone': 'partial_phone',
    'name': 'full',
    'first_name': 'full',
    'last_name': 'full',
    'address': 'full',
    'street': 'full',
    'city': 'full',
    'zip': 'full',
    'ssn': 'full',
    'social_security': 'full',
    'credit_card': 'partial_card',
    'card_number': 'partial_card',
    'cvv': 'remove',
    'password': 'remove',
    'secret': 'remove',
    'token': 'remove',
    'api_key': 'remove',
    'authorization': 'remove',
    'ip_address': 'hash',
    'client_ip': 'hash',
  },
  patterns: [
    { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, strategy: 'partial_email' },
    { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, strategy: 'full', label: '[SSN]' },
    { pattern: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, strategy: 'partial_card' },
    { pattern: /\b(?:\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}\b/g, strategy: 'partial_phone' },
  ]
};

export class RedactionService {
  /**
   * Redact sensitive data from an object
   */
  redact(obj: any, depth: number = 0): any {
    if (depth > 10) return '[MAX_DEPTH]';
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj === 'string') {
      return this.redactString(obj);
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.redact(item, depth + 1));
    }
    
    if (typeof obj === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const strategy = REDACTION_CONFIG.fields[key.toLowerCase()];
        if (strategy === 'remove') {
          continue; // Remove field entirely
        } else if (strategy) {
          result[key] = this.applyStrategy(value, strategy);
        } else {
          result[key] = this.redact(value, depth + 1);
        }
      }
      return result;
    }
    
    return obj;
  }
  
  /**
   * Redact patterns in string values
   */
  private redactString(str: string): string {
    let result = str;
    for (const { pattern, strategy, label } of REDACTION_CONFIG.patterns) {
      result = result.replace(pattern, (match) => {
        if (label) return label;
        return this.applyStrategy(match, strategy);
      });
    }
    return result;
  }
  
  /**
   * Apply specific redaction strategy
   */
  private applyStrategy(value: any, strategy: RedactionStrategy): any {
    const str = String(value);
    
    switch (strategy) {
      case 'full':
        return '[REDACTED]';
      
      case 'partial_email':
        const [local, domain] = str.split('@');
        if (!domain) return '[EMAIL]';
        return `${local[0]}***@${domain}`;
      
      case 'partial_phone':
        const digits = str.replace(/\D/g, '');
        if (digits.length < 4) return '[PHONE]';
        return `***-***-${digits.slice(-4)}`;
      
      case 'partial_card':
        const cardDigits = str.replace(/\D/g, '');
        if (cardDigits.length < 4) return '[CARD]';
        return `****-****-****-${cardDigits.slice(-4)}`;
      
      case 'hash':
        return crypto.createHash('sha256').update(str).digest('hex').slice(0, 16);
      
      case 'remove':
        return undefined;
      
      default:
        return '[REDACTED]';
    }
  }
}

// Logger middleware
const redactionService = new RedactionService();

function createSafeLogger(logger: Logger): Logger {
  return {
    log: (level, message, data) => {
      const safeData = redactionService.redact(data);
      const safeMessage = redactionService.redactString(message);
      logger.log(level, safeMessage, safeData);
    }
  };
}
```

2.4 Log Scrubbing Pipeline

```
Log Event Created
      ↓
Field-level redaction (known fields)
      ↓
Pattern-based redaction (strings)
      ↓
Size truncation (max 64KB per entry)
      ↓
Stack trace truncation (max 50 frames)
      ↓
Sensitive field removal
      ↓
Write to log transport
```

3. Correlation & Context Propagation

Correlation enables tracking requests across service boundaries.

3.1 Correlation IDs

| ID Type | Format | Scope | Header |
|---------|--------|-------|--------|
| Request ID | `req_{base62_22}` | Single request | `X-Request-ID` |
| Trace ID | 32 hex chars | Full trace | `traceparent` |
| Span ID | 16 hex chars | Single span | `traceparent` |
| Tenant ID | CC-PID | Business context | `X-Tenant-ID` |

3.2 Request ID Generation

```typescript
// correlation.ts

import crypto from 'crypto';

const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Generate request ID
 * Format: req_{22 base62 chars} ≈ 128 bits entropy
 */
export function generateRequestId(): string {
  const bytes = crypto.randomBytes(22);
  let result = 'req_';
  
  for (let i = 0; i < 22; i++) {
    result += BASE62[bytes[i] % 62];
  }
  
  return result;
}

/**
 * Validate request ID format
 */
export function isValidRequestId(id: string): boolean {
  return /^req_[0-9A-Za-z]{22}$/.test(id);
}
```

3.3 Context Propagation

```typescript
// context-propagation.ts

interface RequestContext {
  requestId: string;
  traceId?: string;
  spanId?: string;
  tenantId?: string;
  userId?: string;
  startTime: number;
}

// AsyncLocalStorage for context propagation
import { AsyncLocalStorage } from 'async_hooks';

const contextStorage = new AsyncLocalStorage<RequestContext>();

/**
 * Middleware to establish request context
 */
export function contextMiddleware(req, res, next) {
  // Extract or generate request ID
  const requestId = req.headers['x-request-id'] || generateRequestId();
  
  // Extract trace context (W3C format)
  const traceparent = req.headers['traceparent'];
  let traceId, spanId;
  if (traceparent) {
    const parts = traceparent.split('-');
    traceId = parts[1];
    spanId = parts[2];
  }
  
  // Extract tenant context
  const tenantId = req.headers['x-tenant-id'] || req.user?.tenantId;
  
  const context: RequestContext = {
    requestId,
    traceId,
    spanId,
    tenantId,
    userId: req.user?.id,
    startTime: Date.now(),
  };
  
  // Set response headers
  res.setHeader('X-Request-ID', requestId);
  
  // Run request in context
  contextStorage.run(context, () => {
    next();
  });
}

/**
 * Get current request context
 */
export function getContext(): RequestContext | undefined {
  return contextStorage.getStore();
}

/**
 * Create headers for downstream requests
 */
export function propagationHeaders(): Record<string, string> {
  const ctx = getContext();
  if (!ctx) return {};
  
  const headers: Record<string, string> = {
    'X-Request-ID': ctx.requestId,
  };
  
  if (ctx.traceId && ctx.spanId) {
    headers['traceparent'] = `00-${ctx.traceId}-${ctx.spanId}-01`;
  }
  
  if (ctx.tenantId) {
    headers['X-Tenant-ID'] = ctx.tenantId;
  }
  
  return headers;
}
```

3.4 Propagation Headers

| Header | Format | Purpose |
|--------|--------|---------|
| `X-Request-ID` | `req_{base62}` | CYBERCUBE correlation |
| `traceparent` | W3C Trace Context | OpenTelemetry |
| `tracestate` | Vendor-specific | Extended context |
| `X-Tenant-ID` | CC-PID | Tenant routing |
| `X-User-ID` | CC-PID | User context (internal only) |

3.5 Correlation in Logs

Every log entry MUST include correlation IDs when available:

```json
{
  "timestamp": "2026-01-17T12:00:00.123Z",
  "level": "INFO",
  "message": "Processing payment",
  "service": "billing-service",
  "request_id": "req_7Hx9mPqR2vN5hJ8wL4yB",
  "trace_id": "463ac35c9f6413ad48485a3953bb6124",
  "span_id": "0020000000000001",
  "parent_span_id": "0010000000000001",
  "tenant_id": "ACC-9F4K7Q-M"
}
```

4. Distributed Tracing

Traces track request flow across services.

4.1 Trace Structure

```
Trace (trace_id: 463ac35c9f6413ad48485a3953bb6124)
│
├── Span: api-gateway.handleRequest (root)
│   ├── http.method: POST
│   ├── http.route: /api/v1/projects
│   └── duration: 250ms
│
├── Span: auth-service.validateToken
│   ├── parent: api-gateway.handleRequest
│   └── duration: 15ms
│
├── Span: project-service.createProject
│   ├── parent: api-gateway.handleRequest
│   ├── duration: 180ms
│   │
│   ├── Span: database.insert
│   │   ├── db.system: postgresql
│   │   ├── db.operation: INSERT
│   │   └── duration: 45ms
│   │
│   └── Span: cache.invalidate
│       └── duration: 5ms
│
└── Span: audit-service.log
    ├── parent: api-gateway.handleRequest
    └── duration: 10ms
```

4.2 Span Naming

Format: `{service}.{operation}` or `{component}.{operation}`

Examples:
- `api-gateway.handleRequest`
- `project-service.createProject`
- `postgresql.query`
- `redis.get`
- `stripe.createPayment`

Naming rules:
- Use lowercase
- Use dot separators
- Be specific but not unique
- No PII in span names

4.3 Span Attributes

Required attributes:
```typescript
interface RequiredSpanAttributes {
  'service.name': string;
  'service.version': string;
  'deployment.environment': string;
}
```

HTTP spans:
```typescript
interface HttpSpanAttributes {
  'http.method': string;
  'http.route': string;
  'http.status_code': number;
  'http.request_content_length'?: number;
  'http.response_content_length'?: number;
  'user_agent.original'?: string;
}
```

Database spans:
```typescript
interface DbSpanAttributes {
  'db.system': string;       // postgresql, redis, etc.
  'db.name': string;
  'db.operation': string;    // SELECT, INSERT, etc.
  'db.statement'?: string;   // Parameterized query only
}
```

4.4 Sampling Strategy

**Approach:** Tail-based sampling via OpenTelemetry Collector. Applications export
all spans; the Collector evaluates completed spans (with status and duration known)
and applies the rules below before forwarding to the backend.

| Scenario | Sampling Rate | Rationale |
|----------|---------------|-----------|
| Errors | 100% | Always capture errors |
| Slow requests (>1s) | 100% | Performance investigation |
| Normal requests | 10% | Cost management |
| Health checks | 0% | Noise reduction |
| Internal batch jobs | 1% | Low priority |

```typescript
// sampling-config.ts

interface SamplingConfig {
  defaultRate: number;
  rules: SamplingRule[];
}

interface SamplingRule {
  name: string;
  condition: (span: Span) => boolean;
  rate: number;
}

const SAMPLING_CONFIG: SamplingConfig = {
  defaultRate: 0.1,  // 10%
  rules: [
    {
      name: 'always-sample-errors',
      condition: (span) => span.status.code === 'ERROR',
      rate: 1.0
    },
    {
      name: 'always-sample-slow',
      condition: (span) => span.duration > 1000,
      rate: 1.0
    },
    {
      name: 'never-sample-health',
      condition: (span) => span.attributes['http.route'] === '/health',
      rate: 0
    },
    {
      name: 'reduced-batch-jobs',
      condition: (span) => span.attributes['job.type'] !== undefined,
      rate: 0.01
    }
  ]
};
```

4.5 Trace Context Propagation

W3C Trace Context format:

```
traceparent: 00-{trace_id}-{span_id}-{flags}
             │   │          │        │
             │   │          │        └─ 2 hex: sampling flags
             │   │          └─ 16 hex: parent span ID
             │   └─ 32 hex: trace ID
             └─ 2 hex: version (00)

Example:
traceparent: 00-463ac35c9f6413ad48485a3953bb6124-0020000000000001-01
```

5. Metrics

Metrics measure system behavior over time.

5.1 Metric Types

| Type | Use Case | Example |
|------|----------|---------|
| Counter | Cumulative values | `requests_total` |
| Gauge | Point-in-time values | `active_connections` |
| Histogram | Distributions | `request_duration_ms` |
| Summary | Pre-computed percentiles | `request_latency_p99` |

5.2 Naming Convention

Format: `{namespace}_{subsystem}_{name}_{unit}`

Components:
- `namespace`: `cybercube`
- `subsystem`: Service or domain
- `name`: What is measured
- `unit`: Measurement unit (optional suffix)

Examples:
```
cybercube_api_requests_total
cybercube_api_request_duration_ms
cybercube_db_connections_active
cybercube_cache_hits_total
cybercube_queue_depth
cybercube_billing_revenue_usd
```

Rules:
- All lowercase
- Use underscores
- Use milliseconds (`_ms`) for durations and bytes for sizes (CYBERCUBE convention)
- Counters end in `_total`
- Gauges describe current state
- Include unit suffix when ambiguous

5.3 Standard Metrics

**HTTP Metrics (required):**
```
cybercube_http_requests_total{method, route, status_code, service}
cybercube_http_request_duration_ms{method, route, service}
cybercube_http_request_size_bytes{method, route, service}
cybercube_http_response_size_bytes{method, route, service}
```

**Database Metrics:**
```
cybercube_db_queries_total{operation, table, service}
cybercube_db_query_duration_ms{operation, service}
cybercube_db_connections_active{service}
cybercube_db_connections_idle{service}
cybercube_db_errors_total{operation, error_type, service}
```

**Cache Metrics:**
```
cybercube_cache_requests_total{operation, cache, service}
cybercube_cache_hits_total{cache, service}
cybercube_cache_misses_total{cache, service}
cybercube_cache_latency_ms{operation, cache, service}
```

**Queue Metrics:**
```
cybercube_queue_messages_total{queue, operation, service}
cybercube_queue_depth{queue, service}
cybercube_queue_processing_duration_ms{queue, service}
cybercube_queue_errors_total{queue, error_type, service}
```

**Business Metrics:**
```
cybercube_users_active{tenant_id}
cybercube_projects_total{status}
cybercube_invoices_total{status}
cybercube_revenue_usd{period}
```

5.4 Labels (Dimensions)

**Allowed labels (low cardinality):**
| Label | Values | Example |
|-------|--------|---------|
| `service` | Service names | `api-gateway` |
| `method` | HTTP methods | `GET`, `POST` |
| `status_code` | HTTP status codes | `200`, `404` |
| `route` | URL patterns | `/api/v1/projects` |
| `operation` | DB operations | `SELECT`, `INSERT` |
| `status` | Resource states | `active`, `pending` |
| `environment` | Environments | `production` |
| `region` | Cloud regions | `us-east-1` |

**Forbidden labels (high cardinality):**
- User IDs
- Request IDs
- Timestamps
- IP addresses
- Session IDs
- Unbounded strings

5.5 Histogram Buckets

Standard latency buckets (milliseconds):
```
[5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
```

Standard size buckets (bytes):
```
[100, 1000, 10000, 100000, 1000000, 10000000]
```

5.6 Golden Signals

| Signal | Metric | Target |
|--------|--------|--------|
| Latency | `request_duration_ms` p99 | < 200ms |
| Traffic | `requests_total` rate | — |
| Errors | `requests_total{status=5xx}` rate | < 0.1% |
| Saturation | `connections_active` / max | < 80% |

5.7 SLI/SLO Definitions

```yaml
# Example SLO definitions
slos:
  - name: api-availability
    description: "API requests succeed"
    sli:
      metric: "cybercube_http_requests_total"
      good: "status_code !~ '5..'"
      total: "*"
    objective: 99.9%
    window: 30d
    
  - name: api-latency
    description: "API requests are fast"
    sli:
      metric: "cybercube_http_request_duration_ms"
      good: "le='200'"  # 200ms bucket
      total: "*"
    objective: 99%
    window: 30d
```

6. Alerting

Alerts notify operators of issues requiring attention.

6.1 Alert Severity

| Severity | Response Time | Channel | Example |
|----------|---------------|---------|---------|
| CRITICAL | Immediate (5 min) | PagerDuty, Phone | Service down, data loss |
| HIGH | 30 minutes | PagerDuty, Slack | Error rate spike |
| MEDIUM | 4 hours | Slack | Degraded performance |
| LOW | Next business day | Email | Warning threshold |

6.2 Alert Structure

```yaml
# Example alert definition
alert: HighErrorRate
severity: HIGH
description: "Error rate exceeds 1% for 5 minutes"
expr: |
  rate(cybercube_http_requests_total{status_code=~"5.."}[5m])
  / rate(cybercube_http_requests_total[5m]) > 0.01
for: 5m
labels:
  service: "{{ $labels.service }}"
  severity: high
annotations:
  summary: "High error rate in {{ $labels.service }}"
  description: "Error rate is {{ $value | humanizePercentage }}"
  runbook: "https://runbooks.cybercube.software/alerts/high-error-rate"
  dashboard: "https://grafana.cybercube.software/d/service-overview"
```

6.3 Alert Rules

**Required alerts:**
| Alert | Condition | Severity |
|-------|-----------|----------|
| ServiceDown | No successful requests for 5m | CRITICAL |
| HighErrorRate | Error rate > 1% for 5m | HIGH |
| HighLatency | p99 latency > 1s for 5m | HIGH |
| DatabaseConnectionExhausted | Connections > 90% for 5m | CRITICAL |
| DiskSpaceLow | Disk usage > 85% | MEDIUM |
| CertificateExpiring | Expires in < 14 days | MEDIUM |

6.4 Alert Hygiene

DO:
- Link to runbook
- Include dashboard link
- Use clear descriptions
- Set appropriate severity
- Group related alerts

DON'T:
- Alert on non-actionable conditions
- Use high severity for low impact
- Create duplicate alerts
- Alert without documentation

7. Implementation Reference

7.1 Logger Implementation

```typescript
// logger.ts

import pino from 'pino';
import { getContext } from './context';
import { RedactionService } from './redaction';

const redaction = new RedactionService();

interface LoggerConfig {
  service: string;
  version: string;
  environment: string;
  level: string;
}

export function createLogger(config: LoggerConfig): pino.Logger {
  return pino({
    level: config.level,
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
      bindings: () => ({
        service: config.service,
        version: config.version,
        environment: config.environment,
      }),
    },
    hooks: {
      logMethod(inputArgs, method) {
        // Get request context
        const ctx = getContext();
        
        // Add correlation IDs
        if (ctx) {
          inputArgs[0] = {
            ...inputArgs[0],
            request_id: ctx.requestId,
            trace_id: ctx.traceId,
            span_id: ctx.spanId,
            tenant_id: ctx.tenantId,
            user_id: ctx.userId,
          };
        }
        
        // Redact sensitive data
        if (typeof inputArgs[0] === 'object') {
          inputArgs[0] = redaction.redact(inputArgs[0]);
        }
        if (typeof inputArgs[1] === 'string') {
          inputArgs[1] = redaction.redactString(inputArgs[1]);
        }
        
        return method.apply(this, inputArgs);
      },
    },
  });
}

// Usage
const logger = createLogger({
  service: 'api-gateway',
  version: '1.2.3',
  environment: process.env.NODE_ENV || 'development',
  level: process.env.LOG_LEVEL || 'info',
});

// Log with context
logger.info({ http: { method: 'GET', path: '/api/v1/projects' } }, 'Request received');

// Error logging
logger.error({
  error: {
    type: err.name,
    code: err.code,
    message: err.message,
    stack: err.stack,
  }
}, 'Request failed');
```

7.2 Metrics Implementation

```typescript
// metrics.ts

import { Registry, Counter, Histogram, Gauge } from 'prom-client';

const registry = new Registry();

// Standard metrics
export const httpRequestsTotal = new Counter({
  name: 'cybercube_http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'service'],
  registers: [registry],
});

export const httpRequestDuration = new Histogram({
  name: 'cybercube_http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'route', 'service'],
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  registers: [registry],
});

export const dbConnectionsActive = new Gauge({
  name: 'cybercube_db_connections_active',
  help: 'Number of active database connections',
  labelNames: ['service'],
  registers: [registry],
});

// Middleware for HTTP metrics
export function metricsMiddleware(req, res, next) {
  const start = Date.now();
  const route = req.route?.path || req.path;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode,
      service: process.env.SERVICE_NAME,
    };
    
    httpRequestsTotal.inc(labels);
    httpRequestDuration.observe(
      { method: req.method, route, service: process.env.SERVICE_NAME },
      duration
    );
  });
  
  next();
}

// Metrics endpoint
export async function metricsHandler(req, res) {
  res.set('Content-Type', registry.contentType);
  res.end(await registry.metrics());
}
```

7.3 Tracing Implementation

```typescript
// tracing.ts

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { AlwaysOnSampler } from '@opentelemetry/sdk-trace-base';

const exporter = new OTLPTraceExporter({
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
});

// NOTE: Head-based sampling captures all spans. Tail-based sampling
// (via OpenTelemetry Collector) applies the sampling rules from S4.4
// (100% errors, 100% slow, 10% normal, 0% health checks) AFTER
// span completion, when status and duration are known.
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
  }),
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
  sampler: new AlwaysOnSampler(), // Capture all; tail-based sampling at Collector
});

sdk.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

// Custom span creation
import { trace, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('cybercube-app');

export async function withSpan<T>(
  name: string,
  attributes: Record<string, string>,
  fn: () => Promise<T>
): Promise<T> {
  return tracer.startActiveSpan(name, { attributes }, async (span) => {
    try {
      const result = await fn();
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
}
```

7.4 Log Retention Configuration

```yaml
# log-retention.yaml

retention:
  hot_storage:
    provider: elasticsearch
    duration: 14d
    indexes:
      - pattern: "logs-*"
        rollover: daily
        
  archive_storage:
    provider: s3
    duration: 1y
    bucket: cybercube-logs-archive
    compression: gzip
    encryption: AES-256
    
  audit_logs:
    provider: elasticsearch
    duration: 2y
    immutable: true
    
cleanup:
  schedule: "0 2 * * *"  # 2 AM daily
  batch_size: 10000
```

---

CYBERCUBE Observability — Developer Cheat Sheet

Print it. Pin it. Reference it.

🔹 Log Levels

| Level | Code | Use For |
|-------|------|---------|
| FATAL | 60 | System cannot continue |
| ERROR | 50 | Operation failed |
| WARN | 40 | Unexpected but ok |
| INFO | 30 | Normal events |
| DEBUG | 20 | Diagnostics |
| TRACE | 10 | Detailed debug |

Production default: `INFO`

🔹 Log Format

```json
{
  "timestamp": "2026-01-17T12:00:00.123Z",
  "level": "INFO",
  "message": "Request completed",
  "service": "api-gateway",
  "request_id": "req_7Hx9mPqR2vN5",
  "trace_id": "463ac35c...",
  "tenant_id": "ACC-9F4K7Q-M"
}
```

🔹 Correlation IDs

| ID | Format | Header |
|----|--------|--------|
| Request ID | `req_{base62}` | `X-Request-ID` |
| Trace ID | 32 hex | `traceparent` |
| Tenant ID | CC-PID | `X-Tenant-ID` |

🔹 PII Redaction

| Data | Method |
|------|--------|
| Email | `j***@example.com` |
| Phone | `***-***-7890` |
| Card | `****-****-****-1234` |
| Name | `[REDACTED]` |
| Password | Never log |
| Token | Never log |

🔹 Metric Naming

```
{namespace}_{subsystem}_{name}_{unit}

Examples:
cybercube_http_requests_total
cybercube_http_request_duration_ms
cybercube_db_connections_active
```

🔹 Metric Labels

**Allowed (low cardinality):**
- `service`, `method`, `status_code`
- `route`, `operation`, `status`
- `environment`, `region`

**Forbidden (high cardinality):**
- User IDs, Request IDs
- Timestamps, IP addresses
- Unbounded strings

🔹 Golden Signals

```
Latency   → request_duration_ms p99
Traffic   → requests_total rate
Errors    → requests_total{5xx} rate
Saturation → connections / max
```

🔹 Histogram Buckets (ms)

```
[5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
```

🔹 Span Naming

```
{service}.{operation}

Examples:
api-gateway.handleRequest
project-service.createProject
postgresql.query
```

🔹 Sampling Rates

| Scenario | Rate |
|----------|------|
| Errors | 100% |
| Slow (>1s) | 100% |
| Normal | 10% |
| Health checks | 0% |

🔹 Alert Severities

| Severity | Response |
|----------|----------|
| CRITICAL | 5 min |
| HIGH | 30 min |
| MEDIUM | 4 hours |
| LOW | Next day |

🔹 What You MUST Log

✅ Request start/end
✅ Authentication events
✅ Authorization decisions
✅ Errors with context
✅ External service calls
✅ Database operations (DEBUG)

🔹 What You MUST NOT Log

❌ Passwords
❌ API secrets/tokens
❌ Credit card numbers
❌ Full SSN
❌ Health data
❌ Raw PII without redaction
❌ Request bodies with PII

🔹 Propagation Headers

```
X-Request-ID: req_7Hx9mPqR2vN5hJ8w
traceparent: 00-{trace_id}-{span_id}-01
X-Tenant-ID: ACC-9F4K7Q-M
```

🔹 Retention

| Type | Duration |
|------|----------|
| Metrics | 90 days |
| Logs (hot) | 14 days |
| Logs (archive) | 1 year |
| Traces | 14 days |
| Audit logs | 2 years |

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Structured Logging | PARTIAL | JSON format exists |
| Log Levels | PARTIAL | Needs standardization |
| PII Redaction | PARTIAL | Basic patterns |
| Correlation IDs | PARTIAL | Request ID exists |
| W3C Trace Context | PENDING | Not implemented |
| OpenTelemetry | PENDING | Not integrated |
| Metrics (Prometheus) | PARTIAL | Basic metrics |
| Standard Metrics | PENDING | Need full coverage |
| Alerting Rules | PENDING | Define alerts |
| Dashboards | PENDING | Create templates |

### Migration Path

1. **Phase 1**: Standardize log format
2. **Phase 2**: Implement redaction pipeline
3. **Phase 3**: Add correlation ID propagation
4. **Phase 4**: Integrate OpenTelemetry
5. **Phase 5**: Define standard metrics
6. **Phase 6**: Create alerting rules

---

Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |
