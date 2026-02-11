# CYBERCUBE Secure Coding Standard (v1)

**Standard ID:** STD-SEC-002
**Status:** Active
**Effective:** 2026-01-17
**Classification:** INTERNAL
**Owner:** Security Team
**Applies to:** All CYBERCUBE application code

---

## 0. Purpose & Design Principles

This standard establishes secure coding practices for all CYBERCUBE software
development. It provides language-specific guidance for preventing common
vulnerabilities aligned with OWASP Top 10 and industry best practices.

**Industry Alignment:**

- OWASP Top 10 (2021)
- OWASP Application Security Verification Standard (ASVS) 4.0
- OWASP Secure Coding Practices
- CWE/SANS Top 25
- NIST Secure Software Development Framework
- SEI CERT Coding Standards

**Design Principles:**

1. **Secure by Default** — Safe configurations out of the box
2. **Defense in Depth** — Multiple layers of protection
3. **Least Privilege** — Minimal necessary permissions
4. **Fail Securely** — Safe behavior on errors
5. **Trust No Input** — Validate everything from external sources
6. **Keep It Simple** — Complexity breeds vulnerabilities

**This standard does NOT define:**

- Authentication — see Authentication & Identity Standard
- Authorization — see Authorization & Access Control Standard
- Cryptography — see Cryptography & Key Management Standard
- API design — see API Design & Versioning Standard

---

## 1. OWASP Top 10 Alignment

### 1.1 OWASP Top 10 (2021) Coverage

| #   | Category                  | This Standard Section                         |
| --- | ------------------------- | --------------------------------------------- |
| A01 | Broken Access Control     | §5 (Authorization)                           |
| A02 | Cryptographic Failures    | Cryptography Standard                         |
| A03 | Injection                 | §2 (Input Validation), §3 (Output Encoding) |
| A04 | Insecure Design           | Architecture Governance                       |
| A05 | Security Misconfiguration | §8 (Configuration)                           |
| A06 | Vulnerable Components     | §6 (Dependency Management)                   |
| A07 | Authentication Failures   | Authentication Standard                       |
| A08 | Software/Data Integrity   | §6 (Dependencies), §9 (Integrity)           |
| A09 | Logging Failures          | Observability Standard                        |
| A10 | SSRF                      | §2.7 (SSRF Prevention)                       |

### 1.2 Vulnerability Prevention Matrix

| Vulnerability            | Primary Defense                 | Secondary Defense     |
| ------------------------ | ------------------------------- | --------------------- |
| SQL Injection            | Parameterized queries           | Input validation      |
| XSS                      | Output encoding                 | CSP, input validation |
| CSRF                     | CSRF tokens                     | SameSite cookies      |
| Command Injection        | Avoid shell execution           | Input validation      |
| Path Traversal           | Canonicalization                | Allowlists            |
| SSRF                     | URL allowlists                  | Network segmentation  |
| XXE                      | Disable external entities       | Input validation      |
| Insecure Deserialization | Avoid untrusted deserialization | Input validation      |

---

## 2. Input Validation

### 2.1 Core Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      INPUT VALIDATION PRINCIPLES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. VALIDATE ALL INPUT                                                     │
│     • User input (forms, APIs)                                             │
│     • URL parameters and paths                                             │
│     • Headers and cookies                                                  │
│     • File uploads                                                         │
│     • External system data                                                 │
│                                                                             │
│  2. ALLOWLIST OVER BLOCKLIST                                               │
│     ✅ Define what IS allowed                                              │
│     ❌ Don't try to block "bad" patterns                                   │
│                                                                             │
│  3. VALIDATE ON SERVER SIDE                                                │
│     • Client-side validation is UX only                                    │
│     • Server validation is security                                        │
│                                                                             │
│  4. VALIDATE AT TRUST BOUNDARIES                                           │
│     • Every point where data enters your system                            │
│     • Between services                                                     │
│     • Before database operations                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Validation Types

| Type                     | Description              | Example                 |
| ------------------------ | ------------------------ | ----------------------- |
| **Type**           | Correct data type        | String, number, boolean |
| **Length**         | Within acceptable bounds | 1-255 characters        |
| **Range**          | Within acceptable values | 1-100, dates in past    |
| **Format**         | Matches expected pattern | Email, UUID, phone      |
| **Allowlist**      | In set of allowed values | Enum values             |
| **Business rules** | Meets domain constraints | Valid state transitions |

### 2.3 TypeScript/JavaScript Validation

#### 2.3.1 Schema Validation with Zod

```typescript
import { z } from 'zod';

// ✅ Good: Strict schema validation
const UserInputSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email too long')
    .toLowerCase()
    .trim(),
  
  name: z.string()
    .min(1, 'Name required')
    .max(100, 'Name too long')
    .regex(/^[\p{L}\p{M}\s'-]+$/u, 'Invalid characters in name')
    .trim(),
  
  age: z.number()
    .int('Age must be integer')
    .min(0, 'Age cannot be negative')
    .max(150, 'Invalid age'),
  
  role: z.enum(['user', 'admin', 'viewer'], {
    errorMap: () => ({ message: 'Invalid role' }),
  }),
  
  preferences: z.object({
    theme: z.enum(['light', 'dark']).default('light'),
    notifications: z.boolean().default(true),
  }).optional(),
});

type UserInput = z.infer<typeof UserInputSchema>;

// Usage in API handler
async function createUser(req: Request): Promise<Response> {
  // Parse and validate - throws on invalid input
  const result = UserInputSchema.safeParse(req.body);
  
  if (!result.success) {
    return errorResponse(400, {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input',
      details: result.error.flatten(),
    });
  }
  
  // result.data is fully typed and validated
  const user = await userService.create(result.data);
  return successResponse(user);
}
```

#### 2.3.2 Common Validation Patterns

```typescript
// Email validation
const emailSchema = z.string()
  .email()
  .max(255)
  .toLowerCase()
  .trim();

// UUID validation (CC-PID format)
const ccPidSchema = z.string()
  .regex(/^[A-Z]{3}-[A-Z0-9]{6}-[0-9]$/, 'Invalid CC-PID format')
  .toUpperCase();

// URL validation (for user-provided URLs)
const urlSchema = z.string()
  .url()
  .max(2048)
  .refine(
    (url) => {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    },
    'Only HTTP(S) URLs allowed'
  );

// Date validation
const dateSchema = z.string()
  .datetime()
  .or(z.date())
  .transform((val) => new Date(val));

// Pagination validation
const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['asc', 'desc']).default('desc'),
});

// File upload validation
const fileUploadSchema = z.object({
  filename: z.string()
    .max(255)
    .regex(/^[\w\-. ]+$/, 'Invalid filename characters'),
  mimetype: z.enum([
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
  ]),
  size: z.number().max(10 * 1024 * 1024), // 10MB max
});
```

#### 2.3.3 Sanitization

```typescript
import DOMPurify from 'isomorphic-dompurify';

// ✅ HTML sanitization (when HTML is intentionally allowed)
function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
  });
}

// ✅ Strip all HTML (when HTML is not allowed)
function stripHtml(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
}

// ✅ Filename sanitization
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .substring(0, 255);
}
```

### 2.4 Python Validation

#### 2.4.1 Pydantic Validation

```python
from pydantic import BaseModel, ConfigDict, Field, EmailStr, field_validator
from typing import Optional, Literal, Annotated
from datetime import datetime
import re

class UserInput(BaseModel):
    """Validated user input model."""
  
    # Forbid extra fields (mass assignment protection)
    model_config = ConfigDict(extra='forbid', str_strip_whitespace=True)
  
    email: EmailStr = Field(..., max_length=255)
    name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=0, le=150)
    role: Literal['user', 'admin', 'viewer']
  
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not re.match(r'^[\w\s\'-]+$', v, re.UNICODE):
            raise ValueError('Invalid characters in name')
        return v
  
    @field_validator('email')
    @classmethod
    def normalize_email(cls, v: str) -> str:
        return v.lower()


# CC-PID validation (Pydantic v2 — Annotated pattern)
from pydantic import AfterValidator

def validate_cc_pid(v: str) -> str:
    """CC-PID format validator."""
    v = v.upper()
    if not re.match(r'^[A-Z]{3}-[A-Z0-9]{6}-[0-9]$', v):
        raise ValueError('Invalid CC-PID format')
    return v

CCPIDField = Annotated[str, AfterValidator(validate_cc_pid)]


# Usage in FastAPI
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.post('/users')
async def create_user(user: UserInput):
    # Input is already validated by Pydantic
    return await user_service.create(user.model_dump())
```

#### 2.4.2 Common Python Validators

```python
from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Optional, List, Literal
from datetime import datetime, date
import re

# Pagination
class PaginationParams(BaseModel):
    page: int = Field(1, ge=1)
    limit: int = Field(20, ge=1, le=100)
    sort: Literal['asc', 'desc'] = 'desc'


# Date range validation
class DateRangeParams(BaseModel):
    start_date: date
    end_date: date
  
    @model_validator(mode='after')
    def validate_date_range(self) -> 'DateRangeParams':
        if self.start_date and self.end_date and self.start_date > self.end_date:
            raise ValueError('start_date must be before end_date')
        return self


# File upload validation
class FileUpload(BaseModel):
    filename: str = Field(..., max_length=255)
    content_type: Literal[
        'image/jpeg',
        'image/png', 
        'image/gif',
        'application/pdf'
    ]
    size: int = Field(..., le=10 * 1024 * 1024)  # 10MB
  
    @field_validator('filename')
    @classmethod
    def validate_filename(cls, v: str) -> str:
        # Sanitize filename
        sanitized = re.sub(r'[^\w\-. ]', '_', v)
        if sanitized != v:
            raise ValueError('Invalid filename characters')
        return sanitized
```

### 2.5 SQL Injection Prevention

#### 2.5.1 Parameterized Queries (Required)

```typescript
// ❌ NEVER: String concatenation
const query = `SELECT * FROM users WHERE id = '${userId}'`;

// ✅ ALWAYS: Parameterized queries
// With pg (node-postgres)
const result = await pool.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);

// With Prisma ORM
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// With Knex
const user = await knex('users')
  .where('id', userId)
  .first();

// Dynamic column names (allowlist required)
const ALLOWED_SORT_COLUMNS = ['created_at', 'name', 'email'] as const;
type SortColumn = typeof ALLOWED_SORT_COLUMNS[number];

function buildQuery(sortBy: string): string {
  // Validate against allowlist
  if (!ALLOWED_SORT_COLUMNS.includes(sortBy as SortColumn)) {
    throw new Error('Invalid sort column');
  }
  // Safe to use after validation
  return `SELECT * FROM users ORDER BY ${sortBy}`;
}
```

```python
# ❌ NEVER: String formatting
query = f"SELECT * FROM users WHERE id = '{user_id}'"

# ✅ ALWAYS: Parameterized queries
# With psycopg2
cursor.execute(
    "SELECT * FROM users WHERE id = %s",
    (user_id,)
)

# With SQLAlchemy
from sqlalchemy import text
result = session.execute(
    text("SELECT * FROM users WHERE id = :id"),
    {"id": user_id}
)

# With SQLAlchemy ORM
user = session.query(User).filter(User.id == user_id).first()
```

### 2.6 Command Injection Prevention

```typescript
// ❌ NEVER: Shell execution with user input
import { exec } from 'child_process';
exec(`convert ${userFilename} output.png`); // DANGEROUS

// ✅ BETTER: Use execFile with arguments array
import { execFile } from 'child_process';
execFile('convert', [userFilename, 'output.png'], (err, stdout) => {
  // Arguments are passed safely
});

// ✅ BEST: Use libraries instead of shell commands
import sharp from 'sharp';
await sharp(userFilename)
  .resize(800, 600)
  .toFile('output.png');
```

```python
# ❌ NEVER: Shell=True with user input
import subprocess
subprocess.run(f"convert {user_filename} output.png", shell=True)  # DANGEROUS

# ✅ BETTER: Use argument list
subprocess.run(['convert', user_filename, 'output.png'], check=True)

# ✅ BEST: Use libraries instead of shell commands
from PIL import Image
img = Image.open(user_filename)
img.thumbnail((800, 600))
img.save('output.png')
```

### 2.7 SSRF Prevention

```typescript
import { URL } from 'url';
import dns from 'dns/promises';
import { isPrivateIP } from './security-utils';

// SSRF-safe URL fetching
async function safeFetch(userUrl: string): Promise<Response> {
  // 1. Parse and validate URL
  let parsed: URL;
  try {
    parsed = new URL(userUrl);
  } catch {
    throw new Error('Invalid URL');
  }
  
  // 2. Protocol allowlist
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP(S) allowed');
  }
  
  // 3. Domain allowlist (if applicable)
  const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com'];
  if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
    throw new Error('Domain not allowed');
  }
  
  // 4. Resolve DNS and check for private IPs
  const addresses = await dns.resolve4(parsed.hostname);
  for (const ip of addresses) {
    if (isPrivateIP(ip)) {
      throw new Error('Private IP not allowed');
    }
  }
  
  // 5. Fetch with timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  
  try {
    return await fetch(userUrl, {
      signal: controller.signal,
      redirect: 'error', // Don't follow redirects
    });
  } finally {
    clearTimeout(timeout);
  }
}

// Private/reserved IP detection (IPv4 + IPv6)
function isPrivateIP(ip: string): boolean {
  // IPv6 loopback and link-local
  if (ip === '::1' || ip.startsWith('fe80:') || ip.startsWith('fc00:') || ip.startsWith('fd00:')) {
    return true;
  }

  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p))) return false;

  return (
    parts[0] === 10 ||                                          // 10.0.0.0/8 (RFC 1918)
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||  // 172.16.0.0/12 (RFC 1918)
    (parts[0] === 192 && parts[1] === 168) ||                   // 192.168.0.0/16 (RFC 1918)
    parts[0] === 127 ||                                          // 127.0.0.0/8 (loopback)
    parts[0] === 0 ||                                            // 0.0.0.0/8 (this network)
    (parts[0] === 169 && parts[1] === 254) ||                   // 169.254.0.0/16 (link-local)
    (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) || // 100.64.0.0/10 (CGNAT, RFC 6598)
    (parts[0] === 198 && parts[1] >= 18 && parts[1] <= 19) ||  // 198.18.0.0/15 (benchmarking)
    (parts[0] === 192 && parts[1] === 0 && parts[2] === 2) ||  // 192.0.2.0/24 (TEST-NET-1)
    parts[0] >= 224                                              // 224.0.0.0+ (multicast/reserved)
  );
}
```

### 2.8 File Upload Validation

```typescript
import { createHash } from 'crypto';
import path from 'path';
import { fileTypeFromBuffer } from 'file-type';

interface FileUploadConfig {
  maxSize: number;
  allowedTypes: string[];
  uploadDir: string;
}

const config: FileUploadConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  uploadDir: '/var/uploads',
};

async function validateAndSaveUpload(
  file: Buffer,
  originalName: string
): Promise<string> {
  // 1. Size check
  if (file.length > config.maxSize) {
    throw new Error('File too large');
  }
  
  // 2. Magic byte validation (don't trust Content-Type)
  const detected = await fileTypeFromBuffer(file);
  if (!detected || !config.allowedTypes.includes(detected.mime)) {
    throw new Error('File type not allowed');
  }
  
  // 3. Generate safe filename (never use user-provided name directly)
  const hash = createHash('sha256').update(file).digest('hex').slice(0, 16);
  const ext = detected.ext;
  const safeFilename = `${hash}.${ext}`;
  
  // 4. Ensure path stays within upload directory
  const fullPath = path.join(config.uploadDir, safeFilename);
  const resolved = path.resolve(fullPath);
  if (!resolved.startsWith(path.resolve(config.uploadDir))) {
    throw new Error('Invalid path');
  }
  
  // 5. Save file
  await fs.promises.writeFile(resolved, file);
  
  return safeFilename;
}
```

---

## 3. Output Encoding

### 3.1 Context-Specific Encoding

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      OUTPUT ENCODING BY CONTEXT                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Context              Encoding              Characters Escaped              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  HTML Body            HTML Entity           < > & " '                       │
│  HTML Attribute       HTML Entity + Quotes  < > & " ' `                     │
│  JavaScript           JS Encoding           \ ' " < > &                     │
│  URL Parameter        URL Encoding          All non-alphanumeric           │
│  CSS                  CSS Encoding          All non-alphanumeric           │
│  JSON                 JSON.stringify        Control chars, quotes          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 HTML Output Encoding

```typescript
// ✅ Use framework auto-escaping (React, Vue, Angular)

// React - automatically escaped
function UserGreeting({ name }: { name: string }) {
  return <div>Hello, {name}</div>; // Safe - auto-escaped
}

// ❌ DANGEROUS: dangerouslySetInnerHTML
function UnsafeContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />; // XSS risk!
}

// ✅ If HTML is needed, sanitize first
import DOMPurify from 'dompurify';

function SafeHtmlContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

```typescript
// Server-side HTML encoding (non-framework)
function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": ''',
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
}

// Usage in template
const html = `<div>Hello, ${escapeHtml(userName)}</div>`;
```

### 3.3 JavaScript Context Encoding

```typescript
// ❌ DANGEROUS: Embedding user data in scripts
const script = `<script>var user = "${userName}";</script>`; // XSS!

// ✅ SAFE: Use data attributes + JSON
const safeData = JSON.stringify({ name: userName });
const html = `
  <div id="app" data-config='${escapeHtml(safeData)}'></div>
  <script>
    const config = JSON.parse(
      document.getElementById('app').dataset.config
    );
  </script>
`;

// ✅ BETTER: API call for dynamic data
// Don't embed user data in HTML at all
```

### 3.4 URL Encoding

```typescript
// ✅ URL parameter encoding
const searchUrl = `/search?q=${encodeURIComponent(userQuery)}`;

// ✅ Building URLs safely
const url = new URL('/api/users', 'https://api.example.com');
url.searchParams.set('name', userName);
url.searchParams.set('page', String(page));
const safeUrl = url.toString();

// ❌ DANGEROUS: String concatenation
const dangerousUrl = `/api/users?name=${userName}`; // Injection risk!
```

### 3.5 JSON Response Encoding

```typescript
// API responses - use proper JSON serialization
function sendJsonResponse(res: Response, data: unknown): void {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.send(JSON.stringify(data)); // Properly serialized
}

// ❌ DANGEROUS: Manual JSON construction
const json = `{"name": "${userName}"}`; // Injection risk!

// ✅ SAFE: Use JSON.stringify
const json = JSON.stringify({ name: userName });
```

### 3.6 Content Security Policy (CSP)

```typescript
// Express middleware for CSP
import helmet from 'helmet';

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'strict-dynamic'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Consider nonces
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.cybercube.software'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// With nonces for inline scripts and styles
import crypto from 'crypto';

app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Apply nonce to CSP via middleware (helmet does not support callbacks in directives)
app.use((req, res, next) => {
  const nonce = res.locals.nonce;
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", `'nonce-${nonce}'`],
      styleSrc: ["'self'", `'nonce-${nonce}'`],  // Replaces 'unsafe-inline'
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.cybercube.software'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })(req, res, next);
});

// In template — apply nonce to every inline script and style tag
<script nonce="<%= nonce %>">
  // Inline script allowed by nonce
</script>
<style nonce="<%= nonce %>">
  /* Inline style allowed by nonce */
</style>
```

---

## 4. Error Handling

### 4.1 Secure Error Handling Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SECURE ERROR HANDLING PRINCIPLES                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. NEVER EXPOSE INTERNAL DETAILS TO USERS                                 │
│     ❌ Stack traces                                                         │
│     ❌ SQL queries                                                          │
│     ❌ Internal paths                                                       │
│     ❌ Server configuration                                                 │
│                                                                             │
│  2. LOG DETAILED ERRORS INTERNALLY                                         │
│     ✅ Full stack traces                                                    │
│     ✅ Request context                                                      │
│     ✅ User identifiers (not PII)                                          │
│     ✅ Correlation IDs                                                      │
│                                                                             │
│  3. RETURN GENERIC MESSAGES TO USERS                                       │
│     ✅ "An error occurred"                                                  │
│     ✅ Error reference ID                                                   │
│     ✅ Support contact                                                      │
│                                                                             │
│  4. FAIL SECURELY                                                          │
│     ✅ Deny access on error                                                 │
│     ✅ Don't continue on validation failure                                │
│     ✅ Close connections cleanly                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Error Response Pattern

```typescript
// Error types
class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, details);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor() {
    super('UNAUTHORIZED', 'Authentication required', 401);
  }
}

class ForbiddenError extends AppError {
  constructor() {
    super('FORBIDDEN', 'Access denied', 403);
  }
}

// Error handler middleware
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Generate error reference ID
  const errorId = generateErrorId();
  
  // Log detailed error internally
  logger.error({
    errorId,
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.id,
    requestId: req.headers['x-request-id'],
  });
  
  // Return safe response to client
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        reference: errorId,
        ...(process.env.NODE_ENV === 'development' && {
          details: err.details,
        }),
      },
    });
  } else {
    // Unknown error - don't expose details
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
        reference: errorId,
      },
    });
  }
}
```

### 4.3 Sensitive Data in Errors

```typescript
// ❌ NEVER: Expose sensitive data
throw new Error(`Invalid password for user ${email}`);
throw new Error(`Database connection failed: ${connectionString}`);
throw new Error(`JWT secret: ${process.env.JWT_SECRET}`);

// ✅ ALWAYS: Generic messages, log separately
logger.warn('Invalid password attempt', { email, ip: req.ip });
throw new UnauthorizedError();

logger.error('Database connection failed', { 
  host: config.db.host,
  error: err.message,
});
throw new AppError('SERVICE_UNAVAILABLE', 'Service temporarily unavailable', 503);
```

---

## 5. Authorization in Code

### 5.1 Authorization Checks

```typescript
// ✅ Authorization check before every operation
async function getProject(projectId: string, userId: string): Promise<Project> {
  const project = await db.project.findUnique({
    where: { id: projectId },
  });
  
  if (!project) {
    throw new NotFoundError('Project');
  }
  
  // Check authorization
  if (!await canAccessProject(userId, project)) {
    throw new ForbiddenError();
  }
  
  return project;
}

// ✅ Row-level security in queries
async function getUserProjects(userId: string): Promise<Project[]> {
  return db.project.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } },
      ],
    },
  });
}

// ❌ DANGEROUS: Fetching then filtering
async function insecureGetProjects(userId: string): Promise<Project[]> {
  const allProjects = await db.project.findMany(); // Gets ALL projects!
  return allProjects.filter(p => p.ownerId === userId); // Too late!
}
```

### 5.2 IDOR Prevention (Insecure Direct Object Reference)

```typescript
// ❌ VULNERABLE: No ownership check
app.get('/api/documents/:id', async (req, res) => {
  const doc = await db.document.findUnique({
    where: { id: req.params.id },
  });
  res.json(doc); // Anyone can access any document!
});

// ✅ SECURE: Verify ownership/access
app.get('/api/documents/:id', async (req, res) => {
  const doc = await db.document.findFirst({
    where: {
      id: req.params.id,
      // Include authorization in query
      OR: [
        { ownerId: req.user.id },
        { sharedWith: { some: { userId: req.user.id } } },
      ],
    },
  });
  
  if (!doc) {
    throw new NotFoundError('Document'); // Same response whether not found or not authorized
  }
  
  res.json(doc);
});
```

### 5.3 Mass Assignment Protection

```typescript
// ❌ VULNERABLE: Accepting all fields
app.put('/api/users/:id', async (req, res) => {
  await db.user.update({
    where: { id: req.params.id },
    data: req.body, // User could set role: 'admin'!
  });
});

// ✅ SECURE: Explicit allowlist
const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  // role is NOT included - cannot be set via API
});

app.put('/api/users/:id', async (req, res) => {
  const data = UpdateUserSchema.parse(req.body);
  
  await db.user.update({
    where: { id: req.params.id },
    data: data, // Only allowed fields
  });
});
```

---

## 6. Dependency Management

### 6.1 Dependency Security Policy

| Requirement          | Implementation                          |
| -------------------- | --------------------------------------- |
| Audit on install     | `npm audit` / `pip-audit` in CI     |
| Lock files committed | `package-lock.json` / `poetry.lock` |
| Automated updates    | Dependabot / Renovate                   |
| Vulnerability SLAs   | Critical: 24h, High: 7d, Medium: 30d    |
| Direct deps only     | Minimize transitive dependencies        |
| License compliance   | Scan for incompatible licenses          |

### 6.2 npm/Node.js Dependencies

```json
// package.json security configuration
{
  "scripts": {
    "audit": "npm audit --audit-level=high",
    "audit:fix": "npm audit fix",
    "preinstall": "npx npm-force-resolutions",
    "prepare": "husky install"
  },
  "overrides": {
    // Force patched versions of vulnerable transitive deps
    "vulnerable-package": "^2.0.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 6 * * *'  # Daily

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
    
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
    
      - name: Install dependencies
        run: npm ci
    
      - name: Security audit
        run: npm audit --audit-level=high
    
      - name: License check
        run: npx license-checker --failOn 'GPL'
```

### 6.3 Python Dependencies

```toml
# pyproject.toml
[tool.poetry]
name = "cybercube-api"
version = "1.0.0"

[tool.poetry.dependencies]
python = "^3.11"
# Pin major.minor, allow patch updates
fastapi = "^0.109.0"
pydantic = "^2.5.0"

[tool.safety]
# Safety configuration for vulnerability scanning
ignore = []
```

```yaml
# CI security scanning
- name: Security audit
  run: |
    pip install safety pip-audit
    safety check
    pip-audit
```

### 6.4 Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    groups:
      development:
        dependency-type: "development"
      production:
        dependency-type: "production"
    labels:
      - "dependencies"
      - "security"

  - package-ecosystem: "pip"
    directory: "/api"
    schedule:
      interval: "weekly"
  
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

### 6.5 Supply Chain Security

```typescript
// Lockfile integrity check in CI
// package-lock.json must be committed and match

// Pre-commit hook
// .husky/pre-commit
#!/bin/sh
npm ci --ignore-scripts
npm audit --audit-level=high
```

```bash
# Verify package integrity
npm ci --ignore-scripts  # Don't run lifecycle scripts from untrusted packages

# Use specific registries
npm config set registry https://registry.npmjs.org/

# Enable package-lock verification
npm config set package-lock true
```

---

## 7. Secrets Management

### 7.1 Secrets in Code

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SECRETS MANAGEMENT RULES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❌ NEVER commit secrets to version control                                │
│  ❌ NEVER log secrets (even partially)                                     │
│  ❌ NEVER expose secrets in error messages                                 │
│  ❌ NEVER hardcode secrets in source code                                  │
│  ❌ NEVER pass secrets in URLs                                             │
│  ❌ NEVER store secrets in client-side code                                │
│                                                                             │
│  ✅ DO use environment variables                                           │
│  ✅ DO use secrets management (GCP Secret Manager, AWS Secrets Manager)   │
│  ✅ DO rotate secrets regularly                                            │
│  ✅ DO use separate secrets per environment                                │
│  ✅ DO limit secret access to necessary services                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Environment Variables

```typescript
// ✅ Load from environment
const config = {
  database: {
    url: process.env.DATABASE_URL,
    // Never log this
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    // Never log this
  },
  api: {
    key: process.env.API_KEY,
    // Never log this
  },
};

// ✅ Validate required secrets at startup
function validateConfig(): void {
  const required = ['DATABASE_URL', 'JWT_SECRET', 'API_KEY'];
  const missing = required.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    // Don't reveal which secrets exist
    throw new Error('Missing required configuration');
  }
}

// ❌ NEVER log config with secrets
logger.info('Config loaded', config); // DANGEROUS!

// ✅ Log sanitized config
logger.info('Config loaded', {
  database: { host: config.database.host }, // No URL
  environment: process.env.NODE_ENV,
});
```

### 7.3 Pre-commit Secret Detection

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks

  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

```bash
# .gitleaks.toml
[allowlist]
description = "Allowlist for false positives"
paths = [
  '''\.secrets\.baseline$''',
  '''package-lock\.json$''',
]

[[rules]]
description = "AWS Access Key"
regex = '''AKIA[0-9A-Z]{16}'''
tags = ["key", "AWS"]

[[rules]]
description = "Generic API Key"
regex = '''(?i)(api[_-]?key|apikey)\s*[:=]\s*['\"][0-9a-zA-Z]{16,}['\"]'''
tags = ["key", "generic"]
```

---

## 8. Security Configuration

### 8.1 HTTP Security Headers

```typescript
import helmet from 'helmet';

// Apply security headers
app.use(helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      // ⚠️ 'unsafe-inline' is a known risk — migrate to nonce-based styles.
      // See §3.6 for nonce implementation pattern.
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  
  // Prevent clickjacking
  frameguard: { action: 'deny' },
  
  // Prevent MIME sniffing
  noSniff: true,
  
  // XSS filter (legacy browsers)
  xssFilter: true,
  
  // HTTPS only
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  
  // Referrer policy
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  
  // Permissions policy
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
}));

// Additional headers
app.use((req, res, next) => {
  // Prevent caching of sensitive data
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  
  next();
});
```

### 8.2 CORS Configuration

```typescript
import cors from 'cors';

// ❌ DANGEROUS: Allow all origins
app.use(cors()); // Never in production!

// ✅ SECURE: Explicit origin allowlist
const allowedOrigins = [
  'https://cybercube.software',
  'https://app.cybercube.software',
  ...(process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000'] 
    : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // ⚠️ SECURITY NOTE: Requests with no Origin header (server-to-server,
    // curl, mobile apps) bypass CORS. If your API serves browser clients
    // exclusively, reject !origin requests. Only allow if you explicitly
    // need non-browser access (e.g., native mobile, internal services).
    if (!origin) return callback(null, true);
  
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  exposedHeaders: ['X-Request-ID'],
  maxAge: 86400, // 24 hours
}));
```

### 8.3 Cookie Security

```typescript
// Secure cookie configuration
const cookieOptions: CookieOptions = {
  httpOnly: true,      // Not accessible via JavaScript
  secure: true,        // HTTPS only
  sameSite: 'strict',  // CSRF protection
  maxAge: 3600000,     // 1 hour
  path: '/',
  domain: '.cybercube.software',
};

// Setting cookies
res.cookie('session', sessionToken, cookieOptions);

// Session cookie (shorter lived)
res.cookie('session', token, {
  ...cookieOptions,
  maxAge: 1800000, // 30 minutes
});

// Remember me cookie (longer lived)
res.cookie('remember', rememberToken, {
  ...cookieOptions,
  maxAge: 30 * 24 * 3600000, // 30 days
});
```

---

## 9. Language-Specific Rules

### 9.1 TypeScript/JavaScript

| Rule                          | Rationale                   |
| ----------------------------- | --------------------------- |
| Use `===` not `==`        | Avoid type coercion bugs    |
| Enable `strict` mode        | Catch type errors           |
| No `any` type               | Defeats type safety         |
| No `eval()`                 | Code injection risk         |
| No `Function()` constructor | Code injection risk         |
| No `innerHTML`              | XSS risk                    |
| Use `parseInt(x, 10)`       | Explicit radix              |
| Validate array indices        | Prevent prototype pollution |

```typescript
// tsconfig.json - strict settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

```typescript
// ESLint security rules
// .eslintrc.js
module.exports = {
  plugins: ['security', '@typescript-eslint'],
  extends: [
    'plugin:security/recommended',
    'plugin:@typescript-eslint/strict',
  ],
  rules: {
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'warn',
    'security/detect-unsafe-regex': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
  },
};
```

### 9.2 Python

| Rule                              | Rationale                |
| --------------------------------- | ------------------------ |
| No `eval()` / `exec()`        | Code injection           |
| No `pickle` with untrusted data | Deserialization attacks  |
| Use `subprocess` with list args | Command injection        |
| No `shell=True`                 | Command injection        |
| Use parameterized SQL             | SQL injection            |
| Validate file paths               | Path traversal           |
| Use `secrets` module            | Cryptographic randomness |

```python
# Ruff/flake8 security configuration
# pyproject.toml
[tool.ruff]
select = [
    "E",    # pycodestyle errors
    "W",    # pycodestyle warnings
    "F",    # pyflakes
    "S",    # flake8-bandit (security)
    "B",    # flake8-bugbear
]

[tool.ruff.per-file-ignores]
"tests/*" = ["S101"]  # Allow assert in tests

[tool.bandit]
exclude_dirs = ["tests", "venv"]
skips = []
```

```python
# Secure Python patterns

# ❌ DANGEROUS
import pickle
data = pickle.loads(untrusted_data)  # Arbitrary code execution!

# ✅ SAFE
import json
data = json.loads(untrusted_data)  # Only data, no code

# ❌ DANGEROUS
import subprocess
subprocess.run(f"process {user_input}", shell=True)

# ✅ SAFE
subprocess.run(["process", user_input], check=True)

# ❌ DANGEROUS
import random
token = ''.join(random.choices('abc123', k=32))

# ✅ SAFE
import secrets
token = secrets.token_urlsafe(32)
```

### 9.3 SQL

| Rule                         | Rationale              |
| ---------------------------- | ---------------------- |
| Always parameterize          | SQL injection          |
| Least privilege DB users     | Limit blast radius     |
| No `SELECT *`              | Information disclosure |
| Validate dynamic identifiers | SQL injection          |
| Use ORM when possible        | Built-in protection    |

```sql
-- ❌ DANGEROUS (in application code)
-- query = f"SELECT * FROM users WHERE id = {user_id}"

-- ✅ SAFE: Parameterized
-- Python: cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
-- Node: pool.query("SELECT * FROM users WHERE id = $1", [userId])

-- For dynamic table/column names, use allowlists in application code
-- Never interpolate user input directly into identifiers
```

### 9.4 HTML/Templates

| Rule                    | Rationale                                  |
| ----------------------- | ------------------------------------------ |
| Auto-escape by default  | XSS prevention                             |
| Context-aware encoding  | Different contexts need different encoding |
| No raw HTML from users  | XSS                                        |
| CSP headers             | Defense in depth                           |
| Sanitize if HTML needed | Controlled HTML subset                     |

```html
<!-- Jinja2 example -->
<!-- ✅ SAFE: Auto-escaped -->
<div>{{ user_name }}</div>

<!-- ❌ DANGEROUS: Disabled auto-escape -->
<div>{{ user_html | safe }}</div>

<!-- ✅ If HTML needed, sanitize in Python first -->
<div>{{ sanitized_html | safe }}</div>
```

---

## 10. Security Testing

### 10.1 SAST (Static Analysis)

```yaml
# CI pipeline security scanning
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
  
    # CodeQL for semantic analysis
    - name: CodeQL Analysis
      uses: github/codeql-action/analyze@v3
      with:
        languages: javascript, typescript, python
  
    # Semgrep for pattern matching
    - name: Semgrep
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/security-audit
          p/owasp-top-ten
          p/typescript
```

### 10.2 Dependency Scanning

```yaml
# Snyk integration
- name: Snyk Security Scan
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  with:
    args: --severity-threshold=high
```

### 10.3 Security Unit Tests

```typescript
describe('Security: Input Validation', () => {
  it('rejects SQL injection attempts', async () => {
    const malicious = "'; DROP TABLE users; --";
  
    const response = await request(app)
      .get(`/api/users?search=${encodeURIComponent(malicious)}`);
  
    // Should not error (injection neutralized)
    expect(response.status).toBe(200);
  
    // Table should still exist
    const count = await db.user.count();
    expect(count).toBeGreaterThan(0);
  });
  
  it('rejects XSS in user input', async () => {
    const xss = '<script>alert("xss")</script>';
  
    const user = await createUser({ name: xss });
  
    // Should be escaped or sanitized
    expect(user.name).not.toContain('<script>');
  });
  
  it('prevents path traversal', async () => {
    const traversal = '../../../etc/passwd';
  
    const response = await request(app)
      .get(`/api/files/${encodeURIComponent(traversal)}`);
  
    expect(response.status).toBe(400);
  });
});

describe('Security: Authorization', () => {
  it('prevents IDOR', async () => {
    const user1 = await createUser();
    const user2 = await createUser();
    const doc = await createDocument({ ownerId: user1.id });
  
    // User2 should not access User1's document
    const response = await request(app)
      .get(`/api/documents/${doc.id}`)
      .set('Authorization', `Bearer ${user2.token}`);
  
    expect(response.status).toBe(404); // Not 403 (don't reveal existence)
  });
});
```

---

## Quick Reference Card

Print it. Keep it handy.

### Input Validation

```
✅ Validate all input (server-side)
✅ Allowlist over blocklist
✅ Use schema validation (Zod, Pydantic)
✅ Validate at trust boundaries
❌ Trust client-side validation
❌ Use blocklists for security
```

### SQL Injection

```
✅ Parameterized queries ALWAYS
✅ Use ORM methods
❌ String concatenation
❌ f-strings / template literals in queries
```

### XSS Prevention

```
✅ Output encoding (context-specific)
✅ Use framework auto-escaping
✅ Content Security Policy
✅ Sanitize if HTML required
❌ innerHTML with user data
❌ dangerouslySetInnerHTML
```

### Secrets

```
✅ Environment variables
✅ Secrets manager
✅ Pre-commit detection
❌ Hardcoded in code
❌ Logged (even partially)
❌ In URLs
```

### Dependencies

```
✅ npm audit / pip-audit
✅ Lock files committed
✅ Dependabot enabled
✅ Vulnerability SLAs
❌ Outdated dependencies
❌ Unaudited installs
```

### Error Handling

```
✅ Generic user messages
✅ Detailed internal logs
✅ Error reference IDs
❌ Stack traces to users
❌ Internal details exposed
```

### Authorization

```
✅ Check every operation
✅ Include auth in queries
✅ Same response for not-found/forbidden
❌ Fetch-then-filter
❌ Accept all fields (mass assignment)
```

### OWASP Top 10 Quick Reference

| #   | Vulnerability         | Primary Defense     |
| --- | --------------------- | ------------------- |
| A01 | Broken Access Control | AuthZ checks        |
| A02 | Crypto Failures       | Strong algorithms   |
| A03 | Injection             | Parameterization    |
| A04 | Insecure Design       | Threat modeling     |
| A05 | Misconfig             | Secure defaults     |
| A06 | Vuln Components       | Dependency scanning |
| A07 | Auth Failures         | MFA, strong auth    |
| A08 | Integrity             | Signatures, SRI     |
| A09 | Logging               | Security logging    |
| A10 | SSRF                  | URL allowlists      |

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component                 | Status   | Notes                |
| ------------------------- | -------- | -------------------- |
| Input validation patterns | COMPLETE | Zod schemas          |
| Output encoding           | COMPLETE | React auto-escape    |
| SQL injection prevention  | COMPLETE | Prisma ORM           |
| Dependency scanning       | COMPLETE | npm audit + Snyk     |
| Secret detection          | PARTIAL  | Add pre-commit hooks |
| Security headers          | COMPLETE | Helmet middleware    |
| SAST integration          | PARTIAL  | Add CodeQL           |
| Security tests            | PARTIAL  | Expand coverage      |
| ESLint security rules     | PENDING  | Configure            |
| Developer training        | PENDING  | Create materials     |

---

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Secure Coding
Standard.

All definitions are normative unless stated otherwise.

### A

**Attack Surface**

The sum of potential entry points for unauthorized access.

Reduced by: Input validation, minimal exposure, defense in depth

**Authentication**

Verifying the identity of a user, system, or process.

See: Authentication & Identity Standard

**Authorization**

Determining what an authenticated entity can access or do.

See: Authorization & Access Control Standard

### B

**Broken Access Control**

Failure to enforce proper access restrictions.

OWASP: #1 (2021)

**Buffer Overflow**

Writing data beyond allocated memory boundaries.

Prevention: Memory-safe languages, bounds checking

### C

**CORS (Cross-Origin Resource Sharing)**

Mechanism allowing controlled cross-origin requests.

Configuration: Whitelist specific origins, avoid wildcards

**CSRF (Cross-Site Request Forgery)**

Attack forcing authenticated users to submit unwanted requests.

Prevention: CSRF tokens, SameSite cookies

**CVE (Common Vulnerabilities and Exposures)**

Standardized identifier for security vulnerabilities.

Format: CVE-YYYY-NNNNN

### D

**Defense in Depth**

Multiple layers of security controls.

Principle: No single point of failure

**Dependency**

External code library used by an application.

Risk: Inherited vulnerabilities, supply chain attacks

**DOM-based XSS**

XSS where payload executes in DOM without server involvement.

Prevention: Avoid innerHTML, use textContent

### E

**Encoding**

Converting data to safe representation for output context.

Types: HTML, URL, JavaScript, CSS, SQL

**Escape**

Making special characters safe for a specific context.

Context-specific: Different escaping per output

### H

**Hardcoded Credentials**

Secrets embedded directly in source code.

Prevention: Environment variables, secrets management

**HTML Injection**

Inserting malicious HTML into web pages.

Prevention: Output encoding, CSP

### I

**Injection**

Inserting malicious data that gets executed.

Types: SQL, NoSQL, Command, LDAP, XPath

**Input Validation**

Verifying input meets expected format and constraints.

Approach: Allowlist over blocklist

### L

**Least Privilege**

Granting minimum permissions necessary.

Principle: Reduce blast radius

### M

**Mass Assignment**

Automatically binding request data to objects unsafely.

Prevention: Explicit allowlists, DTOs

### N

**NoSQL Injection**

Injection attacks against NoSQL databases.

Prevention: Parameterized queries, input validation

### O

**OWASP**

Open Web Application Security Project.

Resources: Top 10, ASVS, Cheat Sheets

**Output Encoding**

Encoding data for safe display in specific context.

Contexts: HTML, JavaScript, URL, CSS

### P

**Parameterized Query**

Query with placeholders for user input, not concatenation.

AKA: Prepared statement

**Path Traversal**

Accessing files outside intended directory.

Prevention: Canonicalization, allowlists

**Prototype Pollution**

Modifying JavaScript object prototypes maliciously.

Prevention: Object.freeze, input validation

### R

**Race Condition**

Vulnerability from timing-dependent code execution.

Prevention: Atomic operations, proper locking

**ReDoS (Regular Expression DoS)**

Crafted input causing regex backtracking.

Prevention: Safe regex patterns, timeouts

### S

**SQL Injection**

Inserting SQL commands through user input.

Prevention: Parameterized queries, ORMs

**SSRF (Server-Side Request Forgery)**

Forcing server to make requests to unintended destinations.

Prevention: URL allowlists, network segmentation

**Sanitization**

Removing or neutralizing dangerous content from input.

Approach: Context-specific, prefer encoding

### T

**TOCTOU (Time of Check to Time of Use)**

Race condition between validation and use.

Prevention: Atomic operations, re-validation

**Trust Boundary**

Point where data crosses security domains.

Action: Validate at every boundary

### V

**Validation**

Checking data meets expected format and constraints.

Types: Syntactic (format), semantic (meaning)

### X

**XSS (Cross-Site Scripting)**

Injecting malicious scripts into web pages.

Types: Reflected, Stored, DOM-based

**XXE (XML External Entity)**

Processing external entities in XML input.

Prevention: Disable external entities

---

## Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| v1      | 2026-01-17 | Initial release |



---

## Quick Reference Card — STD-SEC-002 Secure Coding Directive

**Authority**: CYBERCUBE Secure Coding Standard v1 | Owner: Security Team | Effective: 2026-01-17

**Scope**: All CYBERCUBE application source code · All languages, frameworks, runtimes · Excludes: AuthN, AuthZ, Crypto (covered by dedicated standards)

### Design Principles (MANDATORY)

- Secure by Default
- Defense in Depth
- Least Privilege
- Fail Securely
- Trust No Input
- Simplicity over complexity

### Core Control Domains

**Input Validation**: Validate ALL external input · Allowlist > blocklist · Schema-based validation at trust boundaries

**Output Encoding**: Context-specific encoding required · Framework auto-escaping preferred · Raw HTML injection prohibited

**Injection Prevention**: Parameterized queries ONLY · No string concatenation in queries

**File & Path Safety**: Magic-byte validation · Canonicalized paths · Upload directory confinement

**Dependency Security**: Lock files mandatory · Automated vulnerability scanning · Known-vulnerable versions prohibited

**Secrets Handling**: Env vars / secrets manager only · No secrets in code, logs, or URLs

**Error Handling**: Generic user-facing errors · Detailed internal logs only · No stack traces exposed

**Authorization (Code-Level)**: Check on EVERY operation · No fetch-then-filter · Same response for 403 / 404

**Testing & Verification**: Security tests mandatory · IDOR, traversal, injection tests required

### Governance

- OWASP Top-10 aligned
- Enforced via CI gates
- Non-compliance = audit finding

**Status**: ACTIVE / ENFORCED

---

## Scorable Compliance Matrix — Secure Coding (S1–S10)

**Dimensions**: S1–S10 | **Scale**: 0–5 | **Max**: 50 points (10 × 5)

### Scoring Scale

| Score | Meaning |
|-------|---------|
| 0 | Not defined / unmanaged |
| 1 | Defined only |
| 2 | Partially implemented |
| 3 | Implemented (baseline compliant) |
| 4 | Enforced, measured |
| 5 | Institutionalized, audited |

### Dimensions

| ID | Dimension | Criteria | 0–1 | 4–5 |
|----|-----------|----------|-----|-----|
| S1 | Security Governance & Ownership | Standard approved/owned · Applicability defined · SDLC gate enforcement | No formal secure coding authority | Standard enforced, owned, audited |
| S2 | Access Control (Code-Level) | AuthZ per operation · No fetch-then-filter · Privileged paths guarded | Inconsistent/implicit access checks | Least-privilege enforced and tested |
| S3 | Data Handling & Input Validation | All external input validated · Allowlist-based · Trust boundaries defined | Input trusted by default | Systematic validation with tests |
| S4 | Output Encoding & Injection Defense | Context-aware encoding · Parameterized queries · No raw concat | Injection risks unmanaged | Injection classes eliminated |
| S5 | Application Security Practices | Secure-by-default · Dependency governed · Unsafe APIs prohibited | Security left to developers | Security embedded in standards |
| S6 | Error Handling & Logging | Fail-secure · No sensitive data in errors/logs · Forensic-ready logs | Verbose/unsafe error output | Controlled, security-aware logging |
| S7 | Security Testing & Verification | Mandatory test cases · Common attack coverage · Findings tracked | No security testing | Automated, repeatable, enforced |
| S8 | Dependency & Supply Chain Security | Version pinning · Vuln scanning · Known-vulnerable deps blocked | Blind dependency usage | Continuous dependency governance |
| S9 | Developer Training & Awareness | Secure coding training · OWASP-aligned · Dev-time guidance | No secure coding education | Training measured and reinforced |
| S10 | Compliance & Auditability | Controls traceable · Evidence on demand · CI/CD artifacts | Non-auditable secure coding | Audit-ready with objective evidence |

### Thresholds

| Range | Rating |
|-------|--------|
| >=45 | Secure Coding Maturity |
| 36–44 | Managed with minor gaps |
| 28–35 | Elevated application risk |
| <28 | Unacceptable security posture |

### Hard Fail Conditions

- **S1 < 3** → No enforceable standard
- **S3 < 3** → Unsafe input handling
- **S7 < 3** → No security verification
