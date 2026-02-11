# CYBERCUBE Testing & Quality Assurance Standard (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Testing & Quality Assurance Standard.

All definitions are normative unless stated otherwise.

### A

**Acceptance Test**

A test verifying software meets business requirements.

Types:
- User Acceptance Testing (UAT)
- Contract testing
- Regulatory compliance testing

**Arrange-Act-Assert (AAA)**

A test structure pattern.

Sections:
1. Arrange — Set up test conditions
2. Act — Execute the behavior under test
3. Assert — Verify expected outcomes

**Assertion**

A statement that verifies an expected condition.

Example: `expect(result).toBe(42)`

### B

**Black Box Testing**

Testing without knowledge of internal implementation.

Focus: Input/output behavior only.

**Boundary Testing**

Testing at the edges of valid input ranges.

Example: Testing 0, 1, max-1, max for a list size.

**Branch Coverage**

Percentage of code branches executed by tests.

Target: 80%+

### C

**Code Coverage**

Measurement of code executed during testing.

Types:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

**Component Test**

A test verifying a single component in isolation.

Scope: Larger than unit, smaller than integration.

**Contract Test**

A test verifying API contracts between services.

Tools: Pact, Spring Cloud Contract

**Continuous Integration (CI)**

Automated build and test on every commit.

Quality gates enforced automatically.

**Coverage Threshold**

Minimum code coverage required to pass.

CYBERCUBE thresholds:
- Critical services: 80%
- Standard services: 70%
- Utilities: 60%

### D

**Data Builder**

A pattern for creating test data.

Benefits:
- Readable test setup
- Reusable across tests
- Handles defaults intelligently

**Dependency Injection**

A technique enabling testability by injecting dependencies.

Essential for unit testing.

**Deterministic Test**

A test that produces the same result every run.

Required: All tests must be deterministic.

### E

**End-to-End Test (E2E)**

A test verifying complete user workflows.

Scope: Full system, browser to database.

Tools: Playwright, Cypress, Selenium

**Equivalence Partitioning**

Dividing inputs into groups that should behave identically.

Test one value from each partition.

### F

**Factory**

A function or class that creates test objects.

Example: `createTestUser()`, `UserFactory.build()`

**Fake**

A working implementation with shortcuts for testing.

Example: In-memory database, fake email service.

**Fixture**

Reusable test setup data or state.

Types:
- Static fixtures (JSON files)
- Dynamic fixtures (factories)
- Database fixtures (seeds)

**Flaky Test**

A test that sometimes passes and sometimes fails.

Policy: Must be fixed or quarantined immediately.

**Functional Test**

A test verifying functional requirements.

Focus: What the system does.

### G

**Given-When-Then**

A test structure pattern from BDD.

Sections:
1. Given — Initial context
2. When — Action performed
3. Then — Expected outcome

**Golden File**

A reference file containing expected output.

Used for: Snapshot testing, visual regression.

### H

**Happy Path**

The standard successful execution flow.

Test first, then edge cases.

### I

**Integration Test**

A test verifying multiple components work together.

Scope: Service boundaries, database, external APIs.

**Isolation**

Tests run independently without shared state.

Required: All tests must be isolated.

### L

**Line Coverage**

Percentage of code lines executed by tests.

Most common coverage metric.

**Load Test**

A test verifying system behavior under expected load.

Tools: k6, Locust, JMeter

### M

**Mock**

An object that records interactions for verification.

Example: `jest.fn()`, `sinon.mock()`

**Mutation Testing**

Testing tests by introducing code mutations.

Tools: Stryker, PITest

If tests don't catch mutations, coverage is misleading.

### N

**Non-Functional Test**

A test verifying non-functional requirements.

Types:
- Performance tests
- Security tests
- Accessibility tests
- Usability tests

### P

**Performance Test**

A test measuring system speed and resource usage.

Types:
- Load test (expected traffic)
- Stress test (beyond capacity)
- Soak test (sustained load)
- Spike test (sudden increase)

**Property-Based Test**

A test using generated inputs to verify properties.

Tools: fast-check, Hypothesis, QuickCheck

### R

**Regression Test**

A test ensuring existing functionality still works.

Automated: Run on every build.

### S

**Seam**

A point where behavior can be altered for testing.

Types: Object seam, link seam, preprocessor seam.

**Security Test**

A test verifying security requirements.

Types:
- SAST (static analysis)
- DAST (dynamic analysis)
- Penetration testing
- Dependency scanning

**Smoke Test**

A quick test verifying basic functionality.

Purpose: Catch obvious failures fast.

**Snapshot Test**

A test comparing output against a stored reference.

Tools: Jest snapshots, Percy (visual)

**Spy**

A wrapper that records calls to a real object.

Less intrusive than mocks.

**Stub**

A minimal implementation returning predetermined values.

Simpler than fakes.

**System Test**

A test verifying the complete system.

Scope: Full application, production-like environment.

### T

**Test Data**

Data used to exercise tests.

Categories:
- Valid data (happy path)
- Invalid data (error handling)
- Edge case data (boundaries)
- Production-like data (realistic)

**Test Double**

Generic term for any test replacement.

Types: Mock, stub, fake, spy, dummy.

**Test Environment**

An isolated environment for running tests.

Types: Local, CI, staging.

**Test Fixture**

See Fixture.

**Test Harness**

Framework and infrastructure for running tests.

Components: Runner, reporter, assertion library.

**Test Isolation**

See Isolation.

**Test Pyramid**

A model for balancing test types.

```
      /\
     /  \
    / E2E \     (Few, slow, expensive)
   /--------\
  /Integration\ (Some, medium)
 /--------------\
/     Unit       \ (Many, fast, cheap)
------------------
```

**Test Suite**

A collection of related tests.

Organization: By feature, module, or behavior.

### U

**Unit Test**

A test verifying a single unit of code in isolation.

Scope: Function, method, or class.

Characteristics: Fast, isolated, deterministic.

### V

**Visual Regression Test**

A test comparing UI screenshots.

Tools: Percy, Chromatic, BackstopJS

### W

**White Box Testing**

Testing with knowledge of internal implementation.

Focus: Code paths and internal logic.

---

# CYBERCUBE Testing & Quality Assurance Standard (v1)

**Standard ID:** STD-ENG-005  
**Status:** Active  
**Effective:** 2026-01-17  
**Classification:** INTERNAL  
**Applies to:** All CYBERCUBE software projects

---

## 0. Purpose & Design Principles

This standard defines testing requirements, quality gates, and best practices for CYBERCUBE software development. It ensures consistent quality across all projects while enabling team autonomy in implementation details.

**Industry Alignment:**
- Google Testing Pyramid
- ISO/IEC 25010 (Software Quality)
- ISTQB Testing Standards
- Microsoft Testing Guidelines

**Design Principles:**

1. **Shift Left** — Test early, test often
2. **Automation First** — Manual testing is the exception
3. **Fast Feedback** — Tests run quickly to enable iteration
4. **Deterministic** — Same inputs produce same results
5. **Maintainable** — Tests are code, treat them as such
6. **Purposeful** — Every test has clear intent

**This Document Does NOT Define:**
- Specific tooling (team choice within guidelines)
- Manual QA procedures
- Production monitoring — see 4.5 Observability & Telemetry Standard
- Security scanning details — see 2.2 Secure Coding Standard and 2.6 Vulnerability Management Standard

## 1. Test Types & Pyramid

Tests are categorized by scope and purpose following the testing pyramid.

### 1.1 Testing Pyramid

```
                    ┌───────────┐
                    │    E2E    │  5-10%
                    │  Tests    │  (Critical paths only)
                    └─────┬─────┘
                          │
                ┌─────────┴─────────┐
                │   Integration     │  15-25%
                │      Tests        │  (Service boundaries)
                └─────────┬─────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │           Unit Tests              │  70-80%
        │    (Fast, isolated, numerous)     │
        └───────────────────────────────────┘
```

Distribution guidance:
| Test Type | Percentage | Characteristics |
|-----------|------------|-----------------|
| Unit | 70-80% | Fast (<10ms), isolated, deterministic |
| Integration | 15-25% | Medium speed, real dependencies |
| E2E | 5-10% | Slow, full stack, critical paths |

### 1.2 Unit Tests

**Definition:** Tests verifying a single unit of code in isolation.

Scope:
- Single function or method
- Single class
- Single module

Characteristics:
- **Fast:** < 10ms per test
- **Isolated:** No external dependencies
- **Deterministic:** Same result every time
- **Independent:** Run in any order

Dependencies:
- All external dependencies mocked/stubbed
- No database, network, or filesystem
- No shared state between tests

```typescript
// ✅ Good: Isolated unit test
describe('calculateTax', () => {
  it('should calculate 10% tax for standard items', () => {
    // Arrange
    const price = 100;
    const taxRate = 0.10;
    
    // Act
    const result = calculateTax(price, taxRate);
    
    // Assert
    expect(result).toBe(10);
  });
  
  it('should return 0 for tax-exempt items', () => {
    const result = calculateTax(100, 0);
    expect(result).toBe(0);
  });
  
  it('should handle decimal prices', () => {
    const result = calculateTax(99.99, 0.10);
    expect(result).toBeCloseTo(10.00, 2);
  });
});

// ❌ Bad: Not isolated (hits database)
describe('calculateTax', () => {
  it('should calculate tax', async () => {
    const product = await db.products.findById('prod_123'); // NO!
    const result = calculateTax(product.price, product.taxRate);
    expect(result).toBe(10);
  });
});
```

### 1.3 Integration Tests

**Definition:** Tests verifying multiple components work together correctly.

Scope:
- Service layer with database
- API endpoints
- External service integrations
- Message queue handlers

Characteristics:
- **Real dependencies:** Actual database, cache
- **Isolated environment:** Test database, containers
- **Slower:** 100ms - 5s per test
- **Transactional:** Cleanup between tests

```typescript
// ✅ Good: Integration test with real database
describe('UserService Integration', () => {
  let db: TestDatabase;
  let userService: UserService;
  
  beforeAll(async () => {
    db = await TestDatabase.create();
    userService = new UserService(db);
  });
  
  afterAll(async () => {
    await db.destroy();
  });
  
  beforeEach(async () => {
    await db.truncate(['users', 'user_roles']);
  });
  
  describe('createUser', () => {
    it('should create user and assign default role', async () => {
      // Arrange
      const input = {
        email: 'test@example.com',
        name: 'Test User',
      };
      
      // Act
      const user = await userService.createUser(input);
      
      // Assert
      expect(user.id).toMatch(/^usr_/);
      expect(user.email).toBe(input.email);
      
      // Verify database state
      const dbUser = await db.users.findById(user.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.roles).toContain('user');
    });
    
    it('should reject duplicate email', async () => {
      // Arrange
      await userService.createUser({ email: 'test@example.com', name: 'First' });
      
      // Act & Assert
      await expect(
        userService.createUser({ email: 'test@example.com', name: 'Second' })
      ).rejects.toThrow('Email already exists');
    });
  });
});
```

### 1.4 End-to-End Tests (E2E)

**Definition:** Tests verifying complete user workflows through the full stack.

Scope:
- Critical user journeys
- Cross-service workflows
- Browser interactions
- API-to-database flows

Characteristics:
- **Full stack:** Browser to database
- **Production-like:** Real services, real data
- **Slow:** 10s - 60s per test
- **Selective:** Only critical paths

```typescript
// ✅ Good: E2E test for critical path
describe('User Registration Flow', () => {
  let page: Page;
  
  beforeAll(async () => {
    page = await browser.newPage();
  });
  
  afterAll(async () => {
    await page.close();
  });
  
  it('should complete full registration flow', async () => {
    // Navigate to registration
    await page.goto('/register');
    
    // Fill form
    await page.fill('[data-testid="email-input"]', 'new@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.fill('[data-testid="name-input"]', 'New User');
    
    // Submit
    await page.click('[data-testid="submit-button"]');
    
    // Verify redirect to verification page
    await expect(page).toHaveURL('/verify-email');
    await expect(page.locator('h1')).toHaveText('Check Your Email');
    
    // Simulate email verification (test helper)
    const verificationToken = await getVerificationToken('new@example.com');
    await page.goto(`/verify?token=${verificationToken}`);
    
    // Verify success
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="welcome-message"]'))
      .toContainText('Welcome, New User');
  });
});
```

E2E test selection criteria:
| Include | Exclude |
|---------|---------|
| Login/logout | Admin-only features |
| Registration | Edge cases |
| Core transactions | Error states (use unit) |
| Payment flows | Visual variations |
| Critical integrations | Performance |

### 1.5 Contract Tests

**Definition:** Tests verifying API contracts between services.

Purpose:
- Catch breaking changes
- Enable independent deployment
- Document service interfaces

```typescript
// Consumer contract test (frontend)
describe('User API Contract', () => {
  it('should match user response contract', async () => {
    const response = await api.get('/v1/users/usr_123');
    
    expect(response).toMatchContract({
      id: expect.stringMatching(/^usr_/),
      email: expect.any(String),
      name: expect.any(String),
      created_at: expect.iso8601(),
      meta: {
        request_id: expect.stringMatching(/^req_/),
      },
    });
  });
});

// Provider contract verification
describe('User API Provider', () => {
  it('should fulfill consumer contracts', async () => {
    await verifyContracts({
      provider: 'user-service',
      consumers: ['web-app', 'mobile-app'],
    });
  });
});
```

### 1.6 Performance Tests

**Definition:** Tests measuring system behavior under load.

Types:
| Type | Purpose | Duration |
|------|---------|----------|
| Load | Normal traffic | 10-30 min |
| Stress | Beyond capacity | 10-20 min |
| Soak | Sustained load | 1-8 hours |
| Spike | Sudden increase | 5-10 min |

```javascript
// k6 load test example
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% under 500ms
    http_req_failed: ['rate<0.01'],    // <1% errors
  },
};

export default function () {
  const response = http.get('https://api.cybercube.software/v1/health');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  
  sleep(1);
}
```

**Performance test pass/fail targets (aligned with 4.4 SRE Standard SLOs):**

| Metric | Tier 1 (Critical) | Tier 2 (High) | Tier 3 (Standard) |
|--------|-------------------|---------------|-------------------|
| **Latency (p95)** | < 200ms | < 500ms | < 2000ms |
| **Latency (p99)** | < 500ms | < 1000ms | < 5000ms |
| **Error Rate** | < 0.05% | < 0.1% | < 0.5% |
| **Throughput** | Per service baseline | Per service baseline | Per service baseline |

Performance tests MUST be run before major releases and at minimum quarterly for Tier 1 services.

## 2. Coverage Requirements

Code coverage measures test effectiveness and identifies untested code.

### 2.1 Coverage Thresholds

| Service Category | Line | Branch | Function |
|------------------|------|--------|----------|
| Critical (auth, billing, data) | 80% | 75% | 85% |
| Standard (features, API) | 70% | 65% | 75% |
| Utilities (helpers, tools) | 60% | 55% | 70% |
| Generated code | Exempt | Exempt | Exempt |

### 2.2 Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__mocks__/**',
    '!src/generated/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 70,
      statements: 70,
    },
    // Critical paths have higher thresholds
    './src/services/auth/**/*.ts': {
      branches: 80,
      functions: 85,
      lines: 80,
      statements: 80,
    },
    './src/services/billing/**/*.ts': {
      branches: 80,
      functions: 85,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};
```

### 2.3 Coverage Exemptions

Some code may be exempted from coverage requirements:

| Exemption | Reason | Marking |
|-----------|--------|---------|
| Generated code | Auto-generated, not maintained | `src/generated/` |
| Type definitions | No runtime code | `*.d.ts` |
| Test utilities | Testing infrastructure | `__mocks__/`, `*.test.ts` |
| Impossible branches | TypeScript exhaustiveness | `/* istanbul ignore next */` |
| Framework code | Entry points, config | `index.ts`, `config.ts` |

```typescript
// Legitimate exemption: TypeScript exhaustiveness check
function handleStatus(status: Status): string {
  switch (status) {
    case Status.Active:
      return 'Active';
    case Status.Inactive:
      return 'Inactive';
    case Status.Pending:
      return 'Pending';
    /* istanbul ignore next */
    default:
      // TypeScript ensures this is unreachable
      const _exhaustive: never = status;
      throw new Error(`Unknown status: ${_exhaustive}`);
  }
}
```

### 2.4 Coverage Quality

Coverage percentage alone is insufficient. Quality matters:

**Good coverage:**
- Tests meaningful behavior
- Covers edge cases
- Verifies error handling
- Tests integration points

**Bad coverage:**
- Tests only happy path
- No assertions (just execution)
- Ignores error cases
- Trivial tests for metrics

```typescript
// ❌ Bad: High coverage, low value
it('should create user', () => {
  const user = createUser({ name: 'Test' });
  expect(user).toBeDefined(); // Weak assertion
});

// ✅ Good: Meaningful assertions
it('should create user with generated ID and timestamps', () => {
  const input = { name: 'Test', email: 'test@example.com' };
  const user = createUser(input);
  
  expect(user.id).toMatch(/^usr_[A-Za-z0-9]{20}$/);
  expect(user.name).toBe(input.name);
  expect(user.email).toBe(input.email);
  expect(user.created_at).toBeInstanceOf(Date);
  expect(user.updated_at).toBeInstanceOf(Date);
  expect(user.created_at).toEqual(user.updated_at);
});
```

## 3. Test Naming Conventions

Consistent naming improves readability and maintenance.

### 3.1 Test File Naming

| Pattern | Example | Use Case |
|---------|---------|----------|
| `*.test.ts` | `user.test.ts` | Unit tests |
| `*.spec.ts` | `user.spec.ts` | Alternative (pick one) |
| `*.integration.test.ts` | `user.integration.test.ts` | Integration tests |
| `*.e2e.test.ts` | `registration.e2e.test.ts` | E2E tests |

File location:
```
src/
  services/
    user/
      user.service.ts
      user.service.test.ts        # Co-located unit test
      user.repository.ts
      user.repository.test.ts
  
e2e/
  registration.e2e.test.ts        # E2E tests separate
  
integration/
  user-service.integration.test.ts # Integration tests separate
```

### 3.2 Test Suite Naming

Use `describe` blocks to organize tests by subject:

```typescript
// ✅ Good: Clear hierarchy
describe('UserService', () => {
  describe('createUser', () => {
    describe('with valid input', () => {
      it('should create user with generated ID', () => {});
      it('should assign default role', () => {});
      it('should send verification email', () => {});
    });
    
    describe('with invalid input', () => {
      it('should reject empty email', () => {});
      it('should reject invalid email format', () => {});
      it('should reject duplicate email', () => {});
    });
  });
  
  describe('updateUser', () => {
    it('should update allowed fields', () => {});
    it('should reject protected field changes', () => {});
  });
});
```

### 3.3 Test Case Naming

Format: `should {expected behavior} [when {condition}]`

```typescript
// ✅ Good: Descriptive names
it('should return user by ID', () => {});
it('should throw NotFoundError when user does not exist', () => {});
it('should hash password before storing', () => {});
it('should reject passwords shorter than 8 characters', () => {});
it('should send welcome email after verification', () => {});

// ❌ Bad: Vague or technical names
it('works', () => {});
it('test createUser', () => {});
it('handles error', () => {});
it('returns correct value', () => {});
```

### 3.4 Given-When-Then Alternative

For behavior-driven tests:

```typescript
describe('User Registration', () => {
  describe('given a new user with valid credentials', () => {
    describe('when they submit the registration form', () => {
      it('then they should receive a verification email', () => {});
      it('then their account should be created as unverified', () => {});
    });
  });
  
  describe('given an email that is already registered', () => {
    describe('when they attempt to register', () => {
      it('then they should see an error message', () => {});
      it('then no duplicate account should be created', () => {});
    });
  });
});
```

### 3.5 Test ID Attributes

For E2E tests, use `data-testid` attributes:

```html
<!-- ✅ Good: Stable test selectors -->
<button data-testid="submit-button">Submit</button>
<input data-testid="email-input" type="email" />
<div data-testid="error-message">{error}</div>

<!-- ❌ Bad: Brittle selectors -->
<button class="btn btn-primary">Submit</button>  <!-- Class may change -->
<button id="submit">Submit</button>              <!-- ID may conflict -->
```

Naming convention for test IDs:
```
{component}-{element}[-{variant}]

Examples:
- login-form
- login-email-input
- login-submit-button
- login-error-message
- user-card
- user-card-delete-button
```

## 4. Test Data Management

Proper test data handling ensures reliable, maintainable tests.

### 4.1 Test Data Principles

1. **Isolated:** Tests don't share mutable data
2. **Minimal:** Only data needed for the test
3. **Realistic:** Representative of production
4. **Safe:** No real PII or secrets
5. **Reproducible:** Same data every run

### 4.2 Test Data Factories

Use factories to create test objects:

```typescript
// factories/user.factory.ts
import { faker } from '@faker-js/faker';

interface UserOverrides {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  status?: string;
}

export function createTestUser(overrides: UserOverrides = {}): User {
  return {
    id: overrides.id ?? `usr_${faker.string.alphanumeric(20)}`,
    email: overrides.email ?? faker.internet.email(),
    name: overrides.name ?? faker.person.fullName(),
    role: overrides.role ?? 'user',
    status: overrides.status ?? 'active',
    created_at: new Date(),
    updated_at: new Date(),
  };
}

// Usage in tests
describe('UserService', () => {
  it('should deactivate user', async () => {
    const user = createTestUser({ status: 'active' });
    await userRepository.save(user);
    
    await userService.deactivate(user.id);
    
    const updated = await userRepository.findById(user.id);
    expect(updated.status).toBe('inactive');
  });
});
```

### 4.3 Builder Pattern

For complex objects with many variations:

```typescript
// builders/user.builder.ts
export class UserBuilder {
  private user: Partial<User> = {};
  
  withId(id: string): this {
    this.user.id = id;
    return this;
  }
  
  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }
  
  withRole(role: string): this {
    this.user.role = role;
    return this;
  }
  
  asAdmin(): this {
    this.user.role = 'admin';
    return this;
  }
  
  asVerified(): this {
    this.user.email_verified = true;
    this.user.verified_at = new Date();
    return this;
  }
  
  asSuspended(): this {
    this.user.status = 'suspended';
    this.user.suspended_at = new Date();
    return this;
  }
  
  build(): User {
    return createTestUser(this.user);
  }
}

// Usage
const adminUser = new UserBuilder().asAdmin().asVerified().build();
const suspendedUser = new UserBuilder().asSuspended().build();
```

### 4.4 Fixtures

For static reference data:

```typescript
// fixtures/users.fixture.ts
export const testUsers = {
  admin: {
    id: 'usr_test_admin_001',
    email: 'admin@test.cybercube.software',
    name: 'Test Admin',
    role: 'admin',
  },
  customer: {
    id: 'usr_test_customer_001',
    email: 'customer@test.cybercube.software',
    name: 'Test Customer',
    role: 'customer',
  },
  unverified: {
    id: 'usr_test_unverified_001',
    email: 'unverified@test.cybercube.software',
    name: 'Unverified User',
    email_verified: false,
  },
} as const;

// fixtures/projects.fixture.ts
export const testProjects = {
  active: {
    id: 'prj_test_active_001',
    name: 'Active Project',
    status: 'active',
    owner_id: testUsers.customer.id,
  },
  completed: {
    id: 'prj_test_completed_001',
    name: 'Completed Project',
    status: 'completed',
    owner_id: testUsers.customer.id,
  },
} as const;
```

### 4.5 Database Seeding

For integration tests requiring database state:

```typescript
// seeds/test-seed.ts
export async function seedTestDatabase(db: Database): Promise<void> {
  // Clear existing data
  await db.truncate(['users', 'projects', 'tasks']);
  
  // Seed in dependency order
  await db.users.insertMany([
    testUsers.admin,
    testUsers.customer,
    testUsers.unverified,
  ]);
  
  await db.projects.insertMany([
    testProjects.active,
    testProjects.completed,
  ]);
}

// Usage in test setup
beforeAll(async () => {
  await seedTestDatabase(testDb);
});

afterEach(async () => {
  // Reset to seed state
  await seedTestDatabase(testDb);
});
```

### 4.6 Sensitive Data Rules

**NEVER use in tests:**
- Real customer data
- Production database copies
- Real email addresses (except @test.cybercube.software)
- Real API keys or secrets
- Real credit card numbers

**Safe test data:**
| Data Type | Test Value |
|-----------|------------|
| Email | `*@test.cybercube.software` |
| Phone | `+1-555-*` (reserved) |
| Credit Card | Stripe test cards |
| API Key | `test_*` prefix |
| Address | Faker-generated |

```typescript
// ✅ Good: Safe test data
const testData = {
  email: 'user@test.cybercube.software',
  phone: '+1-555-123-4567',
  card: '4242424242424242', // Stripe test card
  apiKey: 'test_sk_123456789',
};

// ❌ Bad: Never do this
const testData = {
  email: 'real.customer@gmail.com',  // NO!
  card: '4111111111111111',          // Real card pattern
  apiKey: 'sk_live_xxx',             // Production key
};
```

## 5. Test Structure & Organization

Well-organized tests are maintainable and readable.

### 5.1 Arrange-Act-Assert (AAA)

Every test follows this structure:

```typescript
it('should calculate total with discount', () => {
  // Arrange - Set up test conditions
  const cart = createTestCart({
    items: [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ],
    discount: { type: 'percentage', value: 10 },
  });
  
  // Act - Execute the behavior
  const total = calculateTotal(cart);
  
  // Assert - Verify the result
  expect(total).toBe(225); // (200 + 50) * 0.9
});
```

### 5.2 One Assertion Per Concept

Group related assertions, but test one concept:

```typescript
// ✅ Good: One concept, multiple assertions
it('should create user with correct properties', () => {
  const user = createUser({ name: 'Test', email: 'test@example.com' });
  
  // All assertions verify the "created user" concept
  expect(user.id).toMatch(/^usr_/);
  expect(user.name).toBe('Test');
  expect(user.email).toBe('test@example.com');
  expect(user.created_at).toBeInstanceOf(Date);
});

// ❌ Bad: Multiple concepts in one test
it('should create and update user', () => {
  const user = createUser({ name: 'Test' });
  expect(user.name).toBe('Test');
  
  const updated = updateUser(user.id, { name: 'Updated' });
  expect(updated.name).toBe('Updated'); // Different concept!
});
```

### 5.3 Test Isolation

Tests must not depend on each other:

```typescript
// ❌ Bad: Tests share state
let user: User;

it('should create user', () => {
  user = createUser({ name: 'Test' });
  expect(user).toBeDefined();
});

it('should update user', () => {
  // Depends on previous test!
  updateUser(user.id, { name: 'Updated' });
});

// ✅ Good: Each test is independent
describe('UserService', () => {
  let user: User;
  
  beforeEach(() => {
    user = createTestUser();
  });
  
  it('should update user name', () => {
    const updated = updateUser(user.id, { name: 'Updated' });
    expect(updated.name).toBe('Updated');
  });
  
  it('should update user email', () => {
    const updated = updateUser(user.id, { email: 'new@example.com' });
    expect(updated.email).toBe('new@example.com');
  });
});
```

### 5.4 Setup and Teardown

Use lifecycle hooks appropriately:

```typescript
describe('DatabaseService', () => {
  // Once for entire suite
  beforeAll(async () => {
    await database.connect();
  });
  
  afterAll(async () => {
    await database.disconnect();
  });
  
  // Before/after each test
  beforeEach(async () => {
    await database.beginTransaction();
  });
  
  afterEach(async () => {
    await database.rollbackTransaction();
  });
  
  it('should insert record', async () => {
    await database.insert('users', { name: 'Test' });
    const users = await database.query('SELECT * FROM users');
    expect(users).toHaveLength(1);
  });
});
```

### 5.5 Shared Setup

Extract common setup without creating dependencies:

```typescript
// test-utils/setup.ts
export function setupUserTests() {
  let userService: UserService;
  let mockEmailService: jest.Mocked<EmailService>;
  
  beforeEach(() => {
    mockEmailService = createMockEmailService();
    userService = new UserService({
      emailService: mockEmailService,
      repository: new InMemoryUserRepository(),
    });
  });
  
  return {
    getUserService: () => userService,
    getEmailService: () => mockEmailService,
  };
}

// Usage
describe('UserService', () => {
  const { getUserService, getEmailService } = setupUserTests();
  
  it('should send welcome email', async () => {
    await getUserService().createUser({ email: 'test@example.com' });
    expect(getEmailService().sendWelcome).toHaveBeenCalled();
  });
});
```

## 6. Mocking & Test Doubles

Proper use of test doubles enables isolated testing.

### 6.1 Test Double Types

| Type | Purpose | Example |
|------|---------|---------|
| Stub | Return predetermined values | `jest.fn().mockReturnValue(42)` |
| Mock | Verify interactions | `expect(mock).toHaveBeenCalledWith(...)` |
| Fake | Working implementation | In-memory database |
| Spy | Track calls to real object | `jest.spyOn(obj, 'method')` |
| Dummy | Fill parameter requirements | `null`, `undefined`, `{}` |

### 6.2 Mocking Guidelines

**DO mock:**
- External services (APIs, databases)
- Time-dependent code
- Random generators
- File system operations
- Network requests

**DON'T mock:**
- The system under test
- Simple value objects
- Pure functions
- Types/interfaces

```typescript
// ✅ Good: Mock external dependency
describe('PaymentService', () => {
  let stripeClient: jest.Mocked<StripeClient>;
  let paymentService: PaymentService;
  
  beforeEach(() => {
    stripeClient = {
      createCharge: jest.fn(),
      refund: jest.fn(),
    };
    paymentService = new PaymentService(stripeClient);
  });
  
  it('should process payment through Stripe', async () => {
    stripeClient.createCharge.mockResolvedValue({
      id: 'ch_123',
      status: 'succeeded',
    });
    
    const result = await paymentService.processPayment({
      amount: 1000,
      currency: 'usd',
    });
    
    expect(result.status).toBe('succeeded');
    expect(stripeClient.createCharge).toHaveBeenCalledWith({
      amount: 1000,
      currency: 'usd',
    });
  });
});

// ❌ Bad: Mock the system under test
it('should process payment', () => {
  const paymentService = new PaymentService();
  jest.spyOn(paymentService, 'processPayment').mockResolvedValue({ status: 'succeeded' });
  // This tests nothing!
});
```

### 6.3 Mock Factories

Create reusable mock factories:

```typescript
// mocks/email-service.mock.ts
export function createMockEmailService(): jest.Mocked<EmailService> {
  return {
    sendWelcome: jest.fn().mockResolvedValue(undefined),
    sendPasswordReset: jest.fn().mockResolvedValue(undefined),
    sendVerification: jest.fn().mockResolvedValue(undefined),
  };
}

// mocks/user-repository.mock.ts
export function createMockUserRepository(
  initialUsers: User[] = []
): jest.Mocked<UserRepository> {
  const users = new Map(initialUsers.map(u => [u.id, u]));
  
  return {
    findById: jest.fn().mockImplementation(id => 
      Promise.resolve(users.get(id) ?? null)
    ),
    findByEmail: jest.fn().mockImplementation(email =>
      Promise.resolve([...users.values()].find(u => u.email === email) ?? null)
    ),
    save: jest.fn().mockImplementation(user => {
      users.set(user.id, user);
      return Promise.resolve(user);
    }),
    delete: jest.fn().mockImplementation(id => {
      users.delete(id);
      return Promise.resolve();
    }),
  };
}
```

### 6.4 Time Mocking

Control time in tests:

```typescript
describe('TokenService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-17T12:00:00Z'));
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  it('should expire token after TTL', () => {
    const token = createToken({ ttl: 3600 }); // 1 hour
    
    expect(token.isExpired()).toBe(false);
    
    // Advance time by 2 hours
    jest.advanceTimersByTime(2 * 60 * 60 * 1000);
    
    expect(token.isExpired()).toBe(true);
  });
});
```

### 6.5 API Mocking

Mock HTTP requests:

```typescript
// Using MSW (Mock Service Worker) v2
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Test User',
      email: 'test@example.com',
    });
  }),
  
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: 'usr_new_123', ...body },
      { status: 201 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserClient', () => {
  it('should fetch user', async () => {
    const user = await userClient.getUser('usr_123');
    expect(user.name).toBe('Test User');
  });
  
  it('should handle not found', async () => {
    server.use(
      http.get('/api/users/:id', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    
    await expect(userClient.getUser('usr_nonexistent'))
      .rejects.toThrow('User not found');
  });
});
```

## 7. Quality Gates

Automated quality gates enforce standards in CI/CD.

### 7.1 Pre-Commit Hooks

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Lint staged files
npx lint-staged

# Run affected tests
npm run test:affected
```

```javascript
// lint-staged.config.js
module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,md}': [
    'prettier --write',
  ],
};
```

### 7.2 Pull Request Checks

Required checks before merge:

| Check | Requirement | Blocking |
|-------|-------------|----------|
| Unit Tests | Pass | Yes |
| Integration Tests | Pass | Yes |
| Coverage | Meet threshold | Yes |
| Lint | No errors | Yes |
| Type Check | No errors | Yes |
| Security Scan | No high/critical | Yes |
| E2E Tests | Pass (critical paths) | Yes |

### 7.3 CI Pipeline Configuration

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
  
  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test
  
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
  
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
```

### 7.4 Coverage Enforcement

```yaml
# codecov.yml
coverage:
  precision: 2
  round: down
  range: "60...80"
  
  status:
    project:
      default:
        target: 70%
        threshold: 2%
    
    patch:
      default:
        target: 80%
        threshold: 5%

comment:
  layout: "reach,diff,flags,files"
  behavior: default
  require_changes: true
```

### 7.5 Quality Metrics Dashboard

Track quality metrics over time:

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Coverage (overall) | > 70% | < 65% |
| Coverage (new code) | > 80% | < 70% |
| Test pass rate | 100% | < 98% |
| Flaky test rate | < 1% | > 5% |
| Test execution time | < 10 min | > 15 min |
| Open test debt | < 20 items | > 50 items |

### 7.6 Test Execution Time Budgets

Total CI test pipeline MUST complete within 15 minutes. Per-type budgets:

| Test Type | Time Budget | Action if Exceeded |
|-----------|-------------|-------------------|
| **Unit tests** | < 2 minutes | Investigate slow tests, add parallelism |
| **Integration tests** | < 5 minutes | Optimize setup/teardown, parallelize |
| **E2E tests** | < 10 minutes | Reduce scope, parallelize browsers |
| **Lint + Type check** | < 2 minutes | Incremental checking, cache configs |
| **Total pipeline** | < 15 minutes | Mandatory optimization sprint |

Tests exceeding time budgets SHOULD be profiled and optimized. Slow tests that cannot be optimized SHOULD be moved to a separate pipeline stage that does not block merges.

### 7.7 Flaky Test Management

Flaky tests erode confidence in the test suite and MUST be managed actively.

**Definition:** A flaky test is any test that produces different results (pass/fail) on the same code without changes.

**Quarantine process:**

| Step | Action | Timeline |
|------|--------|----------|
| 1 | Detect flaky test (CI reports inconsistent results) | Automatic |
| 2 | Move test to quarantine suite (runs separately, non-blocking) | Within 24 hours |
| 3 | Create tracking ticket with `flaky-test` label | Within 24 hours |
| 4 | Investigate and fix root cause | Within 48 hours (critical path) / 1 week (other) |
| 5 | Return fixed test to main suite | After 3 consecutive clean runs |

**Common causes and fixes:**

| Cause | Symptom | Fix |
|-------|---------|-----|
| Shared state | Order-dependent failures | Isolate test data, use `beforeEach` cleanup |
| Timing | Intermittent async failures | Use explicit waits, avoid `setTimeout` |
| External dependencies | Network-dependent failures | Mock external calls, use test containers |
| Date/time | Fails at month/year boundaries | Mock time in tests |
| Race conditions | Random assertion failures | Await all promises, use proper synchronization |

**Targets:**
- Flaky test rate: < 1% of total test suite
- Quarantine queue: < 10 tests at any time
- Resolution SLA: 48 hours for critical paths, 1 week for all others
- If flaky rate exceeds 5%, a dedicated fix sprint is REQUIRED

### 7.8 Security Testing Integration

Security scanning is REQUIRED as part of the CI quality gates. For detailed security testing practices, see 2.2 Secure Coding Standard and 2.6 Vulnerability Management Standard.

**Minimum security testing in CI:**

| Check | Tool Category | Frequency | Blocking |
|-------|--------------|-----------|----------|
| **Dependency scanning** | npm audit, Snyk, Dependabot | Every build | Yes (high/critical) |
| **SAST** | ESLint security rules, Semgrep | Every build | Yes (high/critical) |
| **Secret detection** | gitleaks, truffleHog | Every build | Yes |
| **License compliance** | license-checker | Weekly / PR | No (warning) |
| **DAST** | OWASP ZAP (baseline scan) | Pre-release | Yes (high/critical) |

**Security test requirements per tier:**

| Requirement | Tier 1 (Critical) | Tier 2 (High) | Tier 3 (Standard) |
|-------------|-------------------|---------------|-------------------|
| Dependency scanning | REQUIRED | REQUIRED | REQUIRED |
| SAST in CI | REQUIRED | REQUIRED | RECOMMENDED |
| Secret detection | REQUIRED | REQUIRED | REQUIRED |
| DAST pre-release | REQUIRED | RECOMMENDED | OPTIONAL |
| Penetration testing | Annual | Annual | On request |

## 8. Async & Error Testing

Testing asynchronous code and error conditions requires specific patterns.

### 8.1 Async Testing

```typescript
// ✅ Good: Proper async testing
describe('AsyncService', () => {
  // Using async/await
  it('should fetch data', async () => {
    const result = await asyncService.fetchData();
    expect(result).toBeDefined();
  });
  
  // Testing rejected promises
  it('should throw on invalid input', async () => {
    await expect(asyncService.fetchData(null))
      .rejects.toThrow('Invalid input');
  });
  
  // Testing specific error type
  it('should throw NotFoundError', async () => {
    await expect(asyncService.getById('nonexistent'))
      .rejects.toBeInstanceOf(NotFoundError);
  });
});

// ❌ Bad: Missing await
it('should fetch data', () => {
  // Test passes before promise resolves!
  asyncService.fetchData().then(result => {
    expect(result).toBeDefined();
  });
});
```

### 8.2 Error Testing

```typescript
describe('Error Handling', () => {
  // Synchronous errors
  it('should throw on invalid input', () => {
    expect(() => validateEmail('invalid'))
      .toThrow('Invalid email format');
  });
  
  it('should throw specific error type', () => {
    expect(() => validateEmail('invalid'))
      .toThrow(ValidationError);
  });
  
  it('should include error details', () => {
    try {
      validateEmail('invalid');
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.code).toBe('INVALID_EMAIL');
      expect(error.field).toBe('email');
    }
  });
  
  // Async errors
  it('should reject with NotFoundError', async () => {
    await expect(userService.getById('usr_nonexistent'))
      .rejects.toMatchObject({
        code: 'USER_NOT_FOUND',
        message: expect.stringContaining('usr_nonexistent'),
      });
  });
});
```

### 8.3 Timeout Testing

```typescript
describe('Timeout Handling', () => {
  it('should timeout after 5 seconds', async () => {
    jest.useFakeTimers();
    
    const promise = slowService.fetchWithTimeout();
    
    jest.advanceTimersByTime(5000);
    
    await expect(promise).rejects.toThrow('Operation timed out');
    
    jest.useRealTimers();
  });
  
  it('should succeed within timeout', async () => {
    jest.useFakeTimers();
    
    const promise = slowService.fetchWithTimeout();
    
    // Fast-forward less than timeout
    jest.advanceTimersByTime(1000);
    
    // Resolve the underlying operation
    await jest.runAllTimersAsync();
    
    const result = await promise;
    expect(result).toBeDefined();
    
    jest.useRealTimers();
  });
});
```

### 8.4 Event Testing

```typescript
describe('EventEmitter', () => {
  it('should emit event on action', (done) => {
    const emitter = new MyEmitter();
    
    emitter.on('data', (data) => {
      expect(data).toEqual({ id: 1 });
      done();
    });
    
    emitter.triggerAction();
  });
  
  // Better: Using async
  it('should emit event on action', async () => {
    const emitter = new MyEmitter();
    
    const eventPromise = new Promise((resolve) => {
      emitter.on('data', resolve);
    });
    
    emitter.triggerAction();
    
    const data = await eventPromise;
    expect(data).toEqual({ id: 1 });
  });
});
```

## 9. Special Testing Scenarios

### 9.1 Database Testing

```typescript
describe('Database Integration', () => {
  let db: TestDatabase;
  
  beforeAll(async () => {
    db = await TestDatabase.create();
    await db.migrate();
  });
  
  afterAll(async () => {
    await db.destroy();
  });
  
  beforeEach(async () => {
    await db.beginTransaction();
  });
  
  afterEach(async () => {
    await db.rollbackTransaction();
  });
  
  it('should enforce unique constraint', async () => {
    await db.users.insert({ email: 'test@example.com' });
    
    await expect(db.users.insert({ email: 'test@example.com' }))
      .rejects.toThrow(/unique constraint/i);
  });
  
  it('should cascade delete', async () => {
    const user = await db.users.insert({ email: 'test@example.com' });
    await db.posts.insert({ user_id: user.id, title: 'Test' });
    
    await db.users.delete(user.id);
    
    const posts = await db.posts.findByUserId(user.id);
    expect(posts).toHaveLength(0);
  });
});
```

### 9.2 Authentication Testing

```typescript
describe('Authenticated Endpoints', () => {
  let authToken: string;
  
  beforeAll(async () => {
    authToken = await getTestAuthToken({ role: 'user' });
  });
  
  it('should require authentication', async () => {
    const response = await request(app).get('/api/profile');
    expect(response.status).toBe(401);
  });
  
  it('should return profile for authenticated user', async () => {
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body.data.email).toBeDefined();
  });
  
  it('should reject invalid token', async () => {
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer invalid_token');
    
    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_TOKEN');
  });
});
```

### 9.3 File Upload Testing

```typescript
describe('File Upload', () => {
  it('should upload valid image', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from('fake-image-data'), {
        filename: 'test.png',
        contentType: 'image/png',
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.url).toMatch(/^https:\/\//);
  });
  
  it('should reject oversized file', async () => {
    const largeBuffer = Buffer.alloc(11 * 1024 * 1024); // 11MB
    
    const response = await request(app)
      .post('/api/upload')
      .attach('file', largeBuffer, 'large.png');
    
    expect(response.status).toBe(413);
    expect(response.body.error.code).toBe('FILE_TOO_LARGE');
  });
  
  it('should reject invalid file type', async () => {
    const response = await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from('data'), {
        filename: 'test.exe',
        contentType: 'application/octet-stream',
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_FILE_TYPE');
  });
});
```

### 9.4 Webhook Testing

```typescript
describe('Webhook Handler', () => {
  const webhookSecret = 'whsec_test123';
  
  function signPayload(payload: object): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const body = JSON.stringify(payload);
    const signature = crypto
      .createHmac('sha256', webhookSecret)
      .update(`${timestamp}.${body}`)
      .digest('hex');
    return `t=${timestamp},v1=${signature}`;
  }
  
  it('should process valid webhook', async () => {
    const payload = {
      id: 'evt_123',
      type: 'payment.completed',
      data: { amount: 1000 },
    };
    
    const response = await request(app)
      .post('/webhooks/stripe')
      .set('Stripe-Signature', signPayload(payload))
      .send(payload);
    
    expect(response.status).toBe(200);
  });
  
  it('should reject invalid signature', async () => {
    const response = await request(app)
      .post('/webhooks/stripe')
      .set('Stripe-Signature', 'invalid')
      .send({ id: 'evt_123' });
    
    expect(response.status).toBe(401);
  });
});
```

---

## 10. Prohibited Practices

The following practices are PROHIBITED:

| Practice | Reason | Alternative |
|----------|--------|-------------|
| Testing with real customer data | Privacy violation, compliance risk | Use factories, fakers, `@test.cybercube.software` |
| Committing test secrets/API keys | Security exposure | Use environment variables, test-only keys with `test_` prefix |
| Skipping tests to meet deadlines | Hidden defects, false confidence | Fix or quarantine; never `skip` without a tracking ticket |
| Tests that depend on execution order | Fragile, unmaintainable suite | Isolate each test with own setup/teardown |
| Ignoring flaky tests | Erodes trust in test suite | Quarantine within 24h, fix within SLA |
| Test-only code in production bundles | Bloat, attack surface | Separate test utilities; use build-time stripping |
| Mocking the system under test | Tests prove nothing | Mock dependencies, not the code being tested |
| Coverage gaming (assertion-free tests) | Misleading quality metrics | Enforce meaningful assertions; review in PR |
| Sharing mutable state between tests | Non-deterministic results | Create fresh state in `beforeEach` |
| Hardcoding environment-specific values | Tests fail across environments | Use configuration, environment variables |

---

## CYBERCUBE Testing & Quality — Quick Reference Card

Print it. Keep it handy.

🔹 Test Pyramid

```
      /\
     /E2E\     5-10% (critical paths)
    /------\
   /Integr. \  15-25% (boundaries)
  /----------\
 /   Unit     \ 70-80% (fast, isolated)
----------------
```

🔹 Coverage Thresholds

| Service | Line | Branch |
|---------|------|--------|
| Critical | 80% | 75% |
| Standard | 70% | 65% |
| Utilities | 60% | 55% |

🔹 Test Structure (AAA)

```typescript
it('should do something', () => {
  // Arrange - Setup
  const input = createTestInput();
  
  // Act - Execute
  const result = doSomething(input);
  
  // Assert - Verify
  expect(result).toBe(expected);
});
```

🔹 Test Naming

```
File:  *.test.ts, *.integration.test.ts
Suite: describe('ClassName/Feature')
Case:  it('should {behavior} [when {condition}]')
```

🔹 Test Data Rules

✅ Use factories and builders
✅ Use `@test.cybercube.software` emails
✅ Use `+1-555-*` phone numbers
✅ Use Stripe test cards
❌ Never use real PII
❌ Never use production data

🔹 Mocking Rules

✅ Mock external services
✅ Mock time/random
✅ Mock network/filesystem
❌ Don't mock system under test
❌ Don't mock pure functions

🔹 Quality Gates

| Check | Required |
|-------|----------|
| Unit tests pass | Yes |
| Integration tests pass | Yes |
| Coverage threshold | Yes |
| Lint clean | Yes |
| Type check | Yes |

🔹 File Structure

```
src/
  feature/
    feature.ts
    feature.test.ts     # Unit
integration/
  feature.integration.test.ts
e2e/
  journey.e2e.test.ts
```

🔹 Async Testing

```typescript
// Resolved promise
const result = await asyncFn();
expect(result).toBe(value);

// Rejected promise
await expect(asyncFn())
  .rejects.toThrow('error');
```

🔹 E2E Selectors

```html
<button data-testid="submit-button">
```

```typescript
await page.click('[data-testid="submit-button"]');
```

🔹 Factory Pattern

```typescript
const user = createTestUser({
  role: 'admin',  // Override
});
```

🔹 Don't Forget

✅ Tests are code — maintain them
✅ One concept per test
✅ Deterministic (no flaky tests)
✅ Isolated (no shared state)
✅ Fast feedback (< 10 min CI)
✅ Readable assertions

---

## Implementation Status

**Last Updated:** 2026-02-07  
**Standard Version:** v1.1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Test pyramid structure | PARTIAL | Unit heavy |
| Coverage thresholds | PENDING | Define per-service |
| Test naming conventions | PARTIAL | Inconsistent |
| Test data factories | PENDING | Create factories |
| CI quality gates | PARTIAL | Basic setup |
| Pre-commit hooks | PENDING | Add lint-staged |
| Integration test environment | PARTIAL | Manual setup |
| E2E test suite | PARTIAL | Few critical paths |
| Flaky test monitoring | PENDING | Track failures + quarantine process |
| Coverage dashboard | PENDING | Codecov setup |
| Security scanning in CI | PARTIAL | Dependency scanning only |
| Performance testing | PENDING | Define baselines per service tier |
| Test execution time budgets | PENDING | Measure current state |

### Migration Path

1. **Phase 1**: Establish naming conventions + factories
2. **Phase 2**: Configure coverage thresholds + execution time budgets
3. **Phase 3**: CI quality gates + pre-commit + security scanning
4. **Phase 4**: Integration test infrastructure + flaky test quarantine process
5. **Phase 5**: E2E critical path coverage
6. **Phase 6**: Performance test baselines for Tier 1 services
7. **Phase 7**: Dashboard + monitoring + flaky test tracking

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |
| v1.1 | 2026-02-07 | Fixed markdown formatting throughout. Added: performance test targets (1.6), test execution time budgets (7.6), flaky test management (7.7), security testing integration (7.8), prohibited practices (10). Added Related Documents. Updated MSW examples to v2 |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| 4.4 CYBERCUBE-Platform-Reliability-SRE-Standard-v1 | SLO targets for performance test pass/fail |
| 4.5 CYBERCUBE-Observability-Telemetry-Standard-v1 | Production monitoring, test vs. observability boundary |
| 5.6 CYBERCUBE-Release-Deployment-Standard-v1 | Quality gates in release pipeline |
| 2.2 CYBERCUBE-Secure-Coding-Standard-v1 | Security testing practices, SAST rules |
| 2.6 CYBERCUBE-Vulnerability-Management-Standard-v1 | Dependency scanning, DAST requirements |
| 5.2 CYBERCUBE-API-Design-Standard-v1 | Contract testing alignment |
| 5.3 CYBERCUBE-Webhooks-Integrations-Standard-v1 | Webhook testing patterns |
| 1.2 CYBERCUBE-Standards-Governance-Policy-v1 | Compliance, reviews |
