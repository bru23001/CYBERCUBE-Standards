CYBERCUBE Release & Deployment Standard (v1)

Glossary

This glossary defines key terms used throughout the CYBERCUBE Release & Deployment
Standard.

All definitions are normative unless stated otherwise.

A

Artifact

A versioned, immutable build output ready for deployment.

Types:
- Container images
- Compiled binaries
- Static assets
- Configuration bundles

Format: `{service}:{version}`

Example: `api-service:v2.3.1`

Approval

Explicit authorization to proceed with a change.

Types:
- Code review approval
- Release approval
- Emergency approval

B

Blue-Green Deployment

A deployment strategy using two identical environments.

Process:
1. Blue runs current version
2. Deploy to Green
3. Switch traffic to Green
4. Blue becomes standby

Benefit: Instant rollback via traffic switch.

Branch

A line of development in version control.

CYBERCUBE branches (trunk-based):
- `main` — production code
- `feature/*` — new features
- `hotfix/*` — production fixes
- `release/*` — release preparation

Build

The process of creating deployable artifacts from source code.

Requirements:
- Reproducible
- Versioned
- Immutable output

C

Canary Deployment

A deployment strategy gradually rolling out to users.

Process:
1. Deploy to small subset (1-5%)
2. Monitor metrics
3. Increase traffic if healthy
4. Full rollout or rollback

Benefit: Catch issues with minimal impact.

Change

Any modification to production systems.

Types:
- Standard (pre-approved)
- Normal (requires approval)
- Emergency (expedited)

Change Advisory Board (CAB)

A group reviewing and approving changes.

CYBERCUBE: Engineering leads + Product + Ops

Change Freeze

A period when changes are restricted.

Reasons:
- Holiday periods
- Major events
- Stability periods

Change Request

A formal proposal for a production change.

Components:
- Description
- Impact assessment
- Rollback plan
- Approvals

CI/CD

Continuous Integration / Continuous Deployment.

CI: Automated build and test on every commit.
CD: Automated deployment to environments.

Configuration

Settings that modify application behavior without code changes.

Types:
- Environment variables
- Config files
- Feature flags
- Secrets

Container

A lightweight, portable unit packaging application and dependencies.

Runtime: Docker, containerd

D

Deployment

The process of releasing code to an environment.

Stages:
1. Build artifact
2. Deploy to environment
3. Verify health
4. Enable traffic

Deployment Pipeline

Automated workflow from commit to production.

Stages:
1. Build
2. Test
3. Security scan
4. Deploy staging
5. Integration tests
6. Deploy production

Deployment Window

A scheduled time period for production deployments.

Purpose: Ensure support availability.

Drift

Untracked differences between actual and desired state.

Cause: Manual changes, failed deployments

Prevention: GitOps, Infrastructure as Code

E

Environment

An isolated instance of the application stack.

CYBERCUBE environments:
- Development (dev)
- Staging (stg)
- Production (prd)

Environment Variable

A configuration value set in the runtime environment.

Naming: `CYBERCUBE_{CATEGORY}_{NAME}`

Example: `CYBERCUBE_DB_HOST`

F

Feature Flag

A mechanism to enable/disable features without deployment.

Types:
- Release toggle (temporary)
- Ops toggle (kill switch)
- Experiment toggle (A/B test)
- Permission toggle (entitlement)

Lifecycle:
1. Create flag (disabled)
2. Deploy code with flag
3. Enable flag progressively
4. Remove flag when stable

Forward Fix

Fixing a production issue by deploying new code (vs. rollback).

Use when:
- Fix is simple and quick
- Rollback is complex
- Data migration involved

G

GitOps

Operations managed through Git as single source of truth.

Principles:
- Declarative desired state
- Version controlled
- Automated reconciliation
- Pull-based deployment

H

Health Check

An endpoint or probe verifying service health.

Types:
- Liveness (is it running?)
- Readiness (can it serve traffic?)
- Startup (is it initialized?)

Hotfix

An urgent fix deployed outside normal release cycle.

Process:
1. Branch from production tag
2. Fix and test
3. Emergency approval
4. Deploy to production
5. Merge back to main

I

Immutable Infrastructure

Infrastructure that is replaced rather than modified.

Principle: Never modify running systems; deploy new ones.

Infrastructure as Code (IaC)

Managing infrastructure through version-controlled code.

Tools: Terraform, Pulumi, CloudFormation

K

Kill Switch

An emergency mechanism to disable a feature instantly.

Implementation: Feature flag set to `false`

L

Liveness Probe

A health check determining if a service should be restarted.

Failure action: Container restart

M

Migration

A versioned change to database schema or data.

Requirements:
- Reversible when possible
- Backward compatible
- Tested independently

O

Observability

The ability to understand system state from external outputs.

Pillars: Logs, Metrics, Traces

P

Pipeline

See Deployment Pipeline.

Post-Deployment Verification

Automated checks after deployment.

Checks:
- Health endpoints
- Key metrics
- Smoke tests
- Error rates

Production

The live environment serving customers.

Highest stability requirements.

Progressive Delivery

Gradually releasing changes to users.

Techniques:
- Canary deployments
- Feature flags
- A/B testing
- Ring-based rollout

Promotion

Moving an artifact from one environment to the next.

Path: dev → staging → production

R

Readiness Probe

A health check determining if a service can receive traffic.

Failure action: Remove from load balancer

Release

A versioned package of changes ready for deployment.

Components:
- Version number
- Changelog
- Artifacts
- Migration scripts

Release Branch

A branch for stabilizing a release.

Pattern: `release/v{major}.{minor}`

Release Candidate (RC)

A release version for final testing before production.

Pattern: `v1.2.0-rc.1`

Release Notes

Documentation of changes in a release.

Contents:
- New features
- Bug fixes
- Breaking changes
- Upgrade instructions

Rollback

Reverting to a previous version after a failed deployment.

Methods:
- Redeploy previous artifact
- Database restore (if needed)
- Feature flag disable

Rollout

The process of deploying a release to users.

Strategies:
- All-at-once
- Blue-green
- Canary
- Rolling

Rolling Deployment

A deployment strategy updating instances incrementally.

Process:
1. Update subset of instances
2. Verify health
3. Continue until complete

Benefit: Zero downtime, gradual rollout

Runbook

Documented procedures for operational tasks.

Components:
- Prerequisites
- Steps
- Verification
- Rollback

S

Semantic Versioning

A versioning scheme: `MAJOR.MINOR.PATCH`

Rules:
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

Staging

A pre-production environment mirroring production.

Purpose: Final testing before production.

Standard Change

A pre-approved, low-risk change type.

Examples:
- Routine deployments
- Config updates
- Certificate renewal

T

Tag

A named reference to a specific commit.

Format: `v{major}.{minor}.{patch}`

Example: `v2.3.1`

Traffic Shifting

Gradually moving traffic between versions.

Percentages: 1% → 5% → 25% → 50% → 100%

Trunk-Based Development

A branching strategy with short-lived feature branches.

Main branch: Always deployable

V

Version

A unique identifier for a release.

See Semantic Versioning.

W

Warmup

Preparing a service to handle traffic before receiving it.

Activities:
- Load caches
- Initialize connections
- JIT compilation

---

CYBERCUBE Release & Deployment Standard (v1)

Standard ID: STD-ENG-006
Status: Active
Effective: 2026-01-17
Applies to: All CYBERCUBE production deployments

0. Purpose & Design Principles

This standard defines how CYBERCUBE manages releases, deployments, and production
changes. It ensures safe, controlled, and traceable modifications to production
systems while enabling rapid iteration.

Industry alignment:
- ITIL Change Management
- GitOps Principles
- The Twelve-Factor App
- Google SRE Release Engineering

Design principles:

1. **Safety First** — Protect production at all costs
2. **Automation** — Automate everything possible
3. **Immutability** — Build once, deploy anywhere
4. **Traceability** — Every change is tracked
5. **Reversibility** — Every deployment can be rolled back
6. **Progressive** — Roll out gradually, not all at once

This document does NOT define:
- Incident response — see Incident Response Standard
- Security scanning — see Security Standard
- Secrets management — see Security Standard
- Test requirements — see Testing Standard

Target deployment cadence: Weekly releases minimum; daily for patches.

1. Environments

CYBERCUBE maintains distinct environments for development, testing, and production.

1.1 Environment Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ENVIRONMENT HIERARCHY                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐            │
│  │ DEVELOPMENT │───▶│   STAGING   │───▶│ PRODUCTION  │            │
│  │    (dev)    │    │    (stg)    │    │    (prd)    │            │
│  └─────────────┘    └─────────────┘    └─────────────┘            │
│        │                  │                  │                     │
│        ▼                  ▼                  ▼                     │
│   • Feature dev      • Integration      • Customer traffic        │
│   • Unit tests       • E2E tests        • Real data               │
│   • Fast iteration   • Performance      • Highest stability       │
│   • Shared/local     • Prod-like        • Single-region (multi-AZ)│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

1.2 Environment Specifications

| Attribute | Development | Staging | Production |
|-----------|-------------|---------|------------|
| Purpose | Feature development | Pre-prod testing | Customer traffic |
| Data | Synthetic/seeded | Anonymized copy | Real customer data |
| Scale | Minimal | Production-like | Full scale |
| Uptime SLO | Best effort | 99% | 99.9%+ |
| Access | All engineers | All engineers | Restricted |
| Deployment | On commit | On PR merge | Approved releases |
| Monitoring | Basic | Full | Full + alerting |

1.3 Environment Naming

| Environment | Code | URL Pattern |
|-------------|------|-------------|
| Development | `dev` | `*.dev.cybercube.software` |
| Staging | `stg` | `*.staging.cybercube.software` |
| Production | `prd` | `*.cybercube.software` |

Environment variables:
```bash
# Environment identifier
CYBERCUBE_ENV=dev|stg|prd

# Service URLs follow pattern
CYBERCUBE_API_URL=https://api.{env}.cybercube.software
CYBERCUBE_APP_URL=https://app.{env}.cybercube.software
```

1.4 Environment Isolation

| Isolation | Requirement |
|-----------|-------------|
| Network | Separate VPCs/networks |
| Database | Separate instances |
| Secrets | Separate key stores |
| IAM | Separate roles/permissions |
| Monitoring | Separate dashboards |
| Logs | Environment-tagged |

```yaml
# Environment configuration structure
environments/
  dev/
    config.yaml
    secrets.yaml.enc
  stg/
    config.yaml
    secrets.yaml.enc
  prd/
    config.yaml
    secrets.yaml.enc
```

1.5 Environment Parity

Staging must mirror production:

| Component | Parity Requirement |
|-----------|-------------------|
| Services | Same versions |
| Infrastructure | Same architecture |
| Configuration | Same structure |
| Dependencies | Same versions |
| Network topology | Same design |
| Security controls | Same rules |

Allowed differences:
- Scale (fewer replicas)
- Data (anonymized)
- External integrations (sandbox mode)

2. Version Control & Branching

Git is the source of truth for all code and configuration.

2.1 Branching Strategy

CYBERCUBE uses trunk-based development with short-lived branches:

```
main (production)
  │
  ├── feature/user-auth ──────────┐
  │                               │ (merge via PR)
  ├── feature/billing-v2 ─────┐  │
  │                           │  │
  ├───────────────────────────┴──┴── main
  │
  ├── hotfix/fix-login ───────────┐
  │                               │ (emergency merge)
  └───────────────────────────────┴── main
```

2.2 Branch Types

| Type | Pattern | Purpose | Lifetime |
|------|---------|---------|----------|
| Main | `main` | Production code | Permanent |
| Feature | `feature/{ticket}-{desc}` | New features | < 1 week |
| Hotfix | `hotfix/{ticket}-{desc}` | Emergency fixes | < 1 day |
| Release | `release/v{version}` | Release stabilization | < 1 week |

Examples:
```
feature/CC-1234-user-authentication
feature/CC-5678-billing-dashboard
hotfix/CC-9999-fix-login-error
release/v2.3.0
```

2.3 Commit Standards

Commit message format:
```
{type}({scope}): {description}

[optional body]

[optional footer]
```

Types:
| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code restructure |
| `perf` | Performance |
| `test` | Tests |
| `chore` | Maintenance |

Examples:
```
feat(auth): add OAuth2 support for Google login

Implements Google OAuth2 flow with PKCE.
- Add GoogleAuthProvider
- Add OAuth callback handler
- Store refresh tokens securely

Closes CC-1234
```

```
fix(billing): correct tax calculation for EU customers

Tax was being calculated on discounted amount instead of
original amount.

Fixes CC-5678
```

2.4 Pull Request Requirements

PR checklist:
- [ ] Title follows commit convention
- [ ] Description explains changes
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No secrets in code
- [ ] Migrations are reversible
- [ ] Feature flag for risky changes

Required approvals:
| Change Type | Approvers Required |
|-------------|-------------------|
| Standard code | 1 engineer |
| Security-related | 1 engineer + security |
| Database migration | 1 engineer + DBA |
| Infrastructure | 1 engineer + ops |
| Breaking change | 2 engineers |

2.5 Protected Branches

| Branch | Protection Rules |
|--------|------------------|
| `main` | No direct push, require PR, require approvals, require CI pass |
| `release/*` | No direct push, require PR, require approvals |

```yaml
# GitHub branch protection
branches:
  - name: main
    protection:
      required_pull_request_reviews:
        required_approving_review_count: 1
        dismiss_stale_reviews: true
        require_code_owner_reviews: true
      required_status_checks:
        strict: true
        contexts:
          - "ci/test"
          - "ci/lint"
          - "ci/security"
      enforce_admins: true
      restrictions: null
```

3. Build & Artifact Management

Builds produce immutable, versioned artifacts.

3.1 Build Principles

1. **Reproducible** — Same commit produces same artifact
2. **Immutable** — Artifacts never modified after creation
3. **Versioned** — Every artifact has unique version
4. **Signed** (RECOMMENDED) — Artifacts are cryptographically signed (Phase 2)
5. **Scanned** — Security scanning before storage

3.2 Version Numbering

Semantic versioning: `MAJOR.MINOR.PATCH`

```
v2.3.1
│ │ │
│ │ └── PATCH: Bug fixes (backward compatible)
│ └──── MINOR: New features (backward compatible)
└────── MAJOR: Breaking changes
```

Pre-release versions:
```
v2.3.0-alpha.1    # Alpha release
v2.3.0-beta.2     # Beta release
v2.3.0-rc.1       # Release candidate
```

Build metadata:
```
v2.3.1+build.12345.sha.a1b2c3d
```

3.3 Artifact Naming

Format: `{service}-{version}`

Examples:
```
api-service:v2.3.1
web-app:v2.3.1
billing-worker:v2.3.1
```

Container images:
```
registry.cybercube.software/api-service:v2.3.1
registry.cybercube.software/api-service:v2.3.1-sha-a1b2c3d
registry.cybercube.software/api-service:latest  # Only for dev
```

3.4 Build Pipeline

```yaml
# .github/workflows/build.yml
name: Build

on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:
    branches: [main]

env:
  REGISTRY: registry.cybercube.software
  SERVICE: api-service  # Override per service

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set version
        id: version
        run: |
          if [[ $GITHUB_REF == refs/tags/v* ]]; then
            echo "version=${GITHUB_REF#refs/tags/}" >> $GITHUB_OUTPUT
          else
            echo "version=sha-${GITHUB_SHA::8}" >> $GITHUB_OUTPUT
          fi
      
      - name: Build
        run: |
          docker build \
            --build-arg VERSION=${{ steps.version.outputs.version }} \
            --build-arg BUILD_TIME=$(date -u +%Y-%m-%dT%H:%M:%SZ) \
            --build-arg GIT_SHA=${{ github.sha }} \
            -t ${{ env.REGISTRY }}/${{ env.SERVICE }}:${{ steps.version.outputs.version }} \
            .
      
      - name: Security scan
        uses: aquasecurity/trivy-action@0.28.0
        with:
          image-ref: '${{ env.REGISTRY }}/${{ env.SERVICE }}:${{ steps.version.outputs.version }}'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'
      
      # RECOMMENDED (Phase 2): Artifact signing
      # - name: Sign artifact
      #   run: |
      #     cosign sign --key env://COSIGN_KEY \
      #       ${{ env.REGISTRY }}/${{ env.SERVICE }}:${{ steps.version.outputs.version }}
      
      - name: Push
        run: |
          docker push ${{ env.REGISTRY }}/${{ env.SERVICE }}:${{ steps.version.outputs.version }}
```

3.5 Artifact Storage

| Artifact Type | Storage | Retention |
|---------------|---------|-----------|
| Container images | Container registry | 90 days (dev), 1 year (prod) |
| Static assets | CDN/S3 | 1 year |
| Build logs | CI system | 30 days |
| Source archives | Git tags | Permanent |

3.6 Build Metadata

Every artifact includes metadata:

```json
{
  "version": "v2.3.1",
  "git_sha": "a1b2c3d4e5f6",
  "git_ref": "refs/tags/v2.3.1",
  "build_time": "2026-01-17T12:00:00Z",
  "build_number": "12345",
  "builder": "github-actions",
  "dependencies": {
    "node": "20.10.0",
    "npm": "10.2.0"
  }
}
```

Exposed at runtime:
```
GET /health
{
  "status": "healthy",
  "version": "v2.3.1",
  "git_sha": "a1b2c3d"
}
```

4. Deployment Pipeline

Automated pipelines deploy code through environments.

4.1 Pipeline Stages

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT PIPELINE                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐       │
│  │ BUILD │──▶│ TEST  │──▶│ SCAN  │──▶│  STG  │──▶│  PRD  │       │
│  └───────┘   └───────┘   └───────┘   └───────┘   └───────┘       │
│      │           │           │           │           │             │
│      ▼           ▼           ▼           ▼           ▼             │
│   Compile    Unit tests   Security   Deploy to   Deploy to        │
│   Package    Int tests    SAST       staging    production        │
│   Version    Coverage     Deps scan  E2E tests  Monitoring        │
│                                      Approval   Verification      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

4.2 Stage Requirements

| Stage | Requirements | Failure Action |
|-------|--------------|----------------|
| Build | Compiles successfully | Block pipeline |
| Test | All tests pass, coverage met | Block pipeline |
| Scan | No critical/high vulnerabilities | Block pipeline |
| Staging | Deploys successfully, E2E pass | Block pipeline |
| Production | Approved, healthy deployment | Rollback |

4.3 Deployment Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| Rolling | Update instances incrementally | Default |
| Blue-Green | Switch traffic between environments | Zero-downtime |
| Canary | Gradual traffic shift | High-risk changes |
| Recreate | Stop old, start new | Development |

4.4 Rolling Deployment

```yaml
# Kubernetes rolling deployment
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max extra pods during update
      maxUnavailable: 0  # Always maintain capacity
  template:
    spec:
      containers:
        - name: api
          image: registry.cybercube.software/api:v2.3.1
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /health/live
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 10
```

4.5 Canary Deployment (Advanced — not required for baseline)

When risk warrants it, use canary deployments with automated analysis.
This requires Argo Rollouts or equivalent; adopt in Phase 3+.

```yaml
# Progressive canary rollout (requires Argo Rollouts)
apiVersion: argoproj.io/v1alpha1
kind: Rollout
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 5      # 5% traffic
        - pause: { duration: 5m }
        - analysis:
            templates:
              - templateName: success-rate
            args:
              - name: service
                value: api-service
        - setWeight: 25     # 25% traffic
        - pause: { duration: 10m }
        - analysis:
            templates:
              - templateName: success-rate
        - setWeight: 50     # 50% traffic
        - pause: { duration: 15m }
        - setWeight: 100    # Full rollout
      analysis:
        successfulRunHistoryLimit: 3
        unsuccessfulRunHistoryLimit: 3
```

4.6 Health Checks

Every service implements health endpoints:

```typescript
// Health check endpoints
export const healthRoutes = {
  // Liveness: Is the process running?
  '/health/live': async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }),
  
  // Readiness: Can it serve traffic?
  '/health/ready': async () => {
    const checks = await Promise.all([
      checkDatabase(),
      checkCache(),
      checkDependencies(),
    ]);
    
    const healthy = checks.every(c => c.status === 'ok');
    
    return {
      status: healthy ? 'ok' : 'degraded',
      checks: checks,
      timestamp: new Date().toISOString(),
    };
  },
  
  // Detailed health for debugging
  // IMPORTANT: Restrict /health to internal network only.
  // Do NOT expose to public internet — it leaks runtime internals.
  '/health': async () => ({
    status: 'ok',
    version: process.env.VERSION,
    git_sha: process.env.GIT_SHA,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }),
};
```

4.7 Post-Deployment Verification

Automated checks after deployment:

```typescript
// Post-deployment verification
async function verifyDeployment(service: string, version: string): Promise<boolean> {
  const checks = [
    // Health check
    async () => {
      const health = await fetch(`${service}/health`);
      return health.ok && (await health.json()).version === version;
    },
    
    // Key endpoint check
    async () => {
      const response = await fetch(`${service}/api/v1/health`);
      return response.ok;
    },
    
    // Error rate check
    async () => {
      const errorRate = await getMetric(`${service}_error_rate_5m`);
      return errorRate < 0.01; // < 1% errors
    },
    
    // Latency check
    async () => {
      const p99 = await getMetric(`${service}_latency_p99_5m`);
      return p99 < 500; // < 500ms p99
    },
  ];
  
  const results = await Promise.all(checks.map(c => c().catch(() => false)));
  return results.every(Boolean);
}
```

5. Release Management

Releases are versioned, documented packages of changes.

5.1 Release Types

| Type | Description | Approval | Examples |
|------|-------------|----------|----------|
| Major | Breaking changes | CAB + Product | v2.0.0 |
| Minor | New features | Tech Lead | v1.3.0 |
| Patch | Bug fixes | Engineer | v1.2.3 |
| Hotfix | Emergency fixes | On-call + Lead | v1.2.4 |

5.2 Release Process

```
┌─────────────────────────────────────────────────────────────────────┐
│                       RELEASE PROCESS                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. PREPARE          2. APPROVE         3. DEPLOY                  │
│  ┌──────────────┐    ┌──────────────┐   ┌──────────────┐          │
│  │ Create branch│    │ Review changes│   │ Deploy STG   │          │
│  │ Update version│   │ Risk assess  │   │ Verify       │          │
│  │ Write changelog│  │ Get approvals│   │ Deploy PRD   │          │
│  │ Run tests    │    │ Schedule     │   │ Monitor      │          │
│  └──────────────┘    └──────────────┘   └──────────────┘          │
│                                                                     │
│  4. VERIFY           5. COMMUNICATE                                │
│  ┌──────────────┐    ┌──────────────┐                              │
│  │ Health checks│    │ Release notes│                              │
│  │ Smoke tests  │    │ Announce     │                              │
│  │ Monitor metrics│  │ Update docs  │                              │
│  └──────────────┘    └──────────────┘                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

5.3 Release Checklist

```markdown
# Release Checklist: v{version}

## Pre-Release
- [ ] All planned tickets completed
- [ ] All tests passing
- [ ] No critical/high security issues
- [ ] Documentation updated
- [ ] Migration scripts tested
- [ ] Rollback plan documented
- [ ] On-call engineer notified

## Approval
- [ ] Changelog reviewed
- [ ] Risk assessment complete
- [ ] Required approvals obtained
- [ ] Deployment window scheduled

## Deployment
- [ ] Staging deployment successful
- [ ] E2E tests passing
- [ ] Production deployment initiated
- [ ] Health checks passing
- [ ] Metrics within bounds

## Post-Release
- [ ] Release notes published
- [ ] Team notified
- [ ] Monitoring for 30 minutes
- [ ] Feature flags enabled (if applicable)
- [ ] Cleanup tasks scheduled
```

5.4 Changelog Format

```markdown
# Changelog

All notable changes to this project are documented in this file.

## [2.3.1] - 2026-01-17

### Fixed
- Correct tax calculation for EU customers (CC-5678)
- Fix timeout on large file uploads (CC-5679)

## [2.3.0] - 2026-01-15

### Added
- OAuth2 support for Google login (CC-1234)
- Bulk export for project data (CC-1235)
- Webhook retry configuration (CC-1236)

### Changed
- Improved dashboard loading performance (CC-1237)
- Updated payment processing flow (CC-1238)

### Deprecated
- Legacy authentication endpoint `/auth/login` (use `/v1/auth/login`)

### Security
- Updated dependencies to address CVE-2026-1234

## [2.2.0] - 2026-01-10
...
```

5.5 Release Notes Template

```markdown
# Release Notes: v2.3.0

**Release Date:** 2026-01-15
**Type:** Minor Release

## Highlights

This release introduces Google OAuth2 authentication and bulk data export,
along with significant performance improvements to the dashboard.

## New Features

### Google OAuth2 Authentication
Users can now sign in using their Google accounts. This provides:
- One-click sign-in experience
- Automatic account linking for existing users
- Enhanced security with Google's authentication

### Bulk Data Export
Export all your project data in one click:
- Export to CSV or JSON formats
- Include all related entities
- Schedule recurring exports

## Improvements

- **Dashboard Performance**: 50% faster initial load time
- **Webhook Reliability**: Configurable retry policies

## Breaking Changes

None in this release.

## Deprecations

- `/auth/login` endpoint is deprecated. Use `/v1/auth/login` instead.
  Removal planned for v3.0.0.

## Upgrade Instructions

1. No database migrations required
2. Update environment variables (see below)
3. Deploy new version
4. Enable Google OAuth (optional)

### New Environment Variables

```bash
# Optional: Enable Google OAuth
CYBERCUBE_OAUTH_GOOGLE_CLIENT_ID=your-client-id
CYBERCUBE_OAUTH_GOOGLE_CLIENT_SECRET=your-client-secret
```

## Known Issues

- Large exports (>10GB) may timeout. Use scheduled exports for large datasets.

## Security Notes

- Updated `lodash` to address CVE-2026-1234 (low severity)
```

5.6 Release Approval Matrix

| Risk Level | Criteria | Approvers |
|------------|----------|-----------|
| Low | Patch, no DB changes | 1 engineer |
| Medium | Minor release, config changes | Tech lead |
| High | Major release, DB migrations | Tech lead + Product |
| Critical | Breaking changes, data migration | CAB |

Risk assessment:
```
□ Database schema changes?
□ Breaking API changes?
□ Infrastructure changes?
□ Third-party integration changes?
□ Security-related changes?
□ Performance-sensitive changes?
□ Customer-visible changes?
```

6. Change Management

All production changes follow a controlled process.

6.1 Change Types

| Type | Description | Approval | Lead Time |
|------|-------------|----------|-----------|
| Standard | Pre-approved, routine | None | Immediate |
| Normal | Typical changes | As per matrix | 1+ day |
| Emergency | Urgent fixes | Expedited | Immediate |

6.2 Standard Changes

Pre-approved changes requiring no additional approval:

| Change | Conditions |
|--------|------------|
| Routine deployment | All tests pass, no DB changes |
| Config update | Non-security, feature flags |
| Scale up/down | Within approved bounds |
| Certificate renewal | Standard process |
| Log level change | Temporary, documented |

6.3 Normal Changes

Process for normal changes:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NORMAL CHANGE PROCESS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. REQUEST          2. REVIEW           3. APPROVE                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │ Create CR    │───▶│ Tech review  │───▶│ Approver     │         │
│  │ Impact assess│    │ Risk assess  │    │ signs off    │         │
│  │ Rollback plan│    │ Schedule     │    │              │         │
│  └──────────────┘    └──────────────┘    └──────────────┘         │
│                                                 │                   │
│  4. IMPLEMENT        5. VERIFY                  │                   │
│  ┌──────────────┐    ┌──────────────┐          │                   │
│  │ Execute change│◀──│ Health check │◀─────────┘                   │
│  │ Monitor      │    │ Smoke test   │                              │
│  │ Document     │    │ Close CR     │                              │
│  └──────────────┘    └──────────────┘                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

6.4 Emergency Changes

Process for urgent production fixes:

```markdown
# Emergency Change Process

## Criteria for Emergency
- Production down or severely degraded
- Security incident in progress
- Data loss or corruption risk
- SLA breach imminent

## Process
1. **Notify**: Alert on-call lead immediately
2. **Assess**: Confirm emergency status
3. **Approve**: Get verbal approval from on-call lead
4. **Implement**: Deploy fix with monitoring
5. **Verify**: Confirm resolution
6. **Document**: Create retrospective change record

## Approvers (any one)
- On-call lead
- Engineering manager
- VP Engineering
- CTO

## Post-Emergency
- [ ] Create formal change record within 24 hours
- [ ] Document what happened
- [ ] Identify prevention measures
- [ ] Schedule postmortem if SEV-1/2
```

6.5 Change Freeze Periods

Changes are restricted during:

| Period | Restrictions | Exceptions |
|--------|--------------|------------|
| Holiday freeze | No deployments | Emergency only |
| Major event | No risky changes | Standard only |
| End of quarter | No DB migrations | Emergency only |

Freeze calendar maintained in shared calendar.

6.6 Change Record

```yaml
# Change Request Template
change_id: CR-2026-0117-001
title: "Deploy billing-service v2.3.1"
type: normal
status: approved

requester:
  name: Alice Engineer
  email: alice@cybercube.software
  date: 2026-01-17T10:00:00Z

change:
  description: |
    Deploy billing-service v2.3.1 which includes:
    - Fix for EU tax calculation (CC-5678)
    - Performance improvements
  
  services_affected:
    - billing-service
  
  environments:
    - staging
    - production
  
  scheduled_time: 2026-01-17T14:00:00Z
  estimated_duration: 30m

risk_assessment:
  level: low
  factors:
    - No database changes
    - No API changes
    - Rollback tested
  
impact:
  customers: none
  downtime: none
  data: none

rollback_plan: |
  1. Revert to billing-service:v2.3.0
  2. Verify health checks
  3. Monitor error rates

approvals:
  - name: Bob Lead
    role: Tech Lead
    date: 2026-01-17T11:00:00Z
    decision: approved

implementation:
  started: null
  completed: null
  implementer: null
  notes: null
```

7. Feature Flags

Feature flags control feature rollout without deployment.

7.1 Feature Flag Types

| Type | Purpose | Lifetime | Example |
|------|---------|----------|---------|
| Release | Control feature rollout | Temporary | `new_dashboard` |
| Ops | Enable kill switches | Permanent | `enable_caching` |
| Experiment | A/B testing | Temporary | `checkout_v2` |
| Permission | Entitlements | Permanent | `premium_features` |

7.2 Flag Naming Convention

Format: `{type}_{feature}_{variant}`

```
release_new_dashboard
release_billing_v2
ops_cache_enabled
ops_rate_limit_strict
experiment_checkout_flow_v2
permission_advanced_analytics
```

7.3 Flag Structure

```typescript
interface FeatureFlag {
  key: string;                    // Unique identifier
  name: string;                   // Human-readable name
  description: string;            // What this flag controls
  type: 'release' | 'ops' | 'experiment' | 'permission';
  
  // Default state
  defaultValue: boolean | string | number;
  
  // Targeting rules
  rules: TargetingRule[];
  
  // Rollout percentage (0-100)
  rolloutPercentage: number;
  
  // Metadata
  owner: string;                  // Team/person responsible
  createdAt: Date;
  expiresAt?: Date;               // For temporary flags
  tags: string[];
}

interface TargetingRule {
  attribute: string;              // user.id, tenant.id, etc.
  operator: 'eq' | 'in' | 'contains' | 'percentage';
  value: any;
  result: boolean | string | number;
}
```

7.4 Flag Implementation

```typescript
// Feature flag service
export class FeatureFlagService {
  private flags: Map<string, FeatureFlag>;
  private provider: FlagProvider;
  
  async isEnabled(
    key: string,
    context: EvaluationContext
  ): Promise<boolean> {
    const flag = await this.getFlag(key);
    
    if (!flag) {
      console.warn(`Unknown feature flag: ${key}`);
      return false;
    }
    
    // Evaluate targeting rules
    for (const rule of flag.rules) {
      if (this.matchesRule(rule, context)) {
        return rule.result as boolean;
      }
    }
    
    // Evaluate percentage rollout
    if (flag.rolloutPercentage < 100) {
      const hash = this.hashContext(key, context);
      return (hash % 100) < flag.rolloutPercentage;
    }
    
    return flag.defaultValue as boolean;
  }
  
  async getValue<T>(
    key: string,
    context: EvaluationContext,
    defaultValue: T
  ): Promise<T> {
    const flag = await this.getFlag(key);
    
    if (!flag) {
      return defaultValue;
    }
    
    // Similar evaluation logic...
    return flag.defaultValue as T ?? defaultValue;
  }
}

// Usage in application code
async function renderDashboard(user: User) {
  const flags = getFeatureFlags();
  
  if (await flags.isEnabled('release_new_dashboard', { user })) {
    return renderNewDashboard(user);
  }
  
  return renderLegacyDashboard(user);
}
```

7.5 Flag Lifecycle

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FEATURE FLAG LIFECYCLE                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. CREATE           2. DEPLOY           3. ENABLE                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │ Define flag  │───▶│ Deploy code  │───▶│ Enable for   │         │
│  │ Default: off │    │ with flag    │    │ % of users   │         │
│  └──────────────┘    └──────────────┘    └──────────────┘         │
│                                                 │                   │
│  4. VALIDATE         5. FULL ROLLOUT     6. CLEANUP               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │ Monitor      │───▶│ Enable 100%  │───▶│ Remove flag  │         │
│  │ Iterate      │    │              │    │ Remove code  │         │
│  └──────────────┘    └──────────────┘    └──────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

7.6 Flag Cleanup

Release flags must be removed after full rollout:

```typescript
// Flag with expiration
const flag: FeatureFlag = {
  key: 'release_new_checkout',
  type: 'release',
  expiresAt: new Date('2026-02-17'),  // 30 days from creation
  // ...
};

// Automated cleanup check
async function checkExpiredFlags(): Promise<void> {
  const flags = await getAllFlags();
  const now = new Date();
  
  for (const flag of flags) {
    if (flag.type === 'release' && flag.expiresAt && flag.expiresAt < now) {
      await notifyFlagOwner(flag, 'Flag has expired, please clean up');
    }
  }
}
```

Flag cleanup checklist:
- [ ] Flag enabled at 100% for 2+ weeks
- [ ] No issues reported
- [ ] Remove flag checks from code
- [ ] Remove flag from configuration
- [ ] Update documentation

8. Rollback Procedures

Every deployment must be reversible.

8.1 Rollback Triggers

Initiate rollback when:
- Error rate exceeds threshold (> 5%)
- Latency exceeds threshold (> 2x baseline)
- Health checks failing
- Critical functionality broken
- Customer-reported issues

8.2 Rollback Methods

| Method | Speed | Use Case |
|--------|-------|----------|
| Feature flag | Instant | Flag-controlled features |
| Traffic shift | Seconds | Blue-green deployments |
| Redeploy | Minutes | Container rollback |
| Database restore | Hours | Data corruption |

8.3 Application Rollback

```yaml
# Kubernetes rollback
kubectl rollout undo deployment/api-service

# Rollback to specific revision
kubectl rollout undo deployment/api-service --to-revision=3

# Check rollout history
kubectl rollout history deployment/api-service
```

```bash
#!/bin/bash
# rollback.sh - Automated rollback script

SERVICE=$1
TARGET_VERSION=$2

echo "Rolling back ${SERVICE} to ${TARGET_VERSION}"

# Update deployment
kubectl set image deployment/${SERVICE} \
  ${SERVICE}=registry.cybercube.software/${SERVICE}:${TARGET_VERSION}

# Wait for rollout
kubectl rollout status deployment/${SERVICE} --timeout=5m

# Verify health
if ! curl -sf "http://${SERVICE}/health" > /dev/null; then
  echo "CRITICAL: Rollback failed health check"
  exit 1
fi

echo "Rollback complete"
```

8.4 Database Rollback

For migrations with data changes:

```sql
-- Migration: 20260117_add_tax_rate.sql
-- Up
ALTER TABLE products ADD COLUMN tax_rate DECIMAL(5,4);
UPDATE products SET tax_rate = 0.1000 WHERE tax_rate IS NULL;

-- Down (rollback)
ALTER TABLE products DROP COLUMN tax_rate;
```

```typescript
// Safe migration pattern
export async function up(db: Database): Promise<void> {
  // 1. Add column (nullable)
  await db.query(`ALTER TABLE products ADD COLUMN tax_rate DECIMAL(5,4)`);
  
  // 2. Backfill data
  await db.query(`UPDATE products SET tax_rate = 0.1000 WHERE tax_rate IS NULL`);
  
  // 3. Add constraint (separate deployment)
  // await db.query(`ALTER TABLE products ALTER COLUMN tax_rate SET NOT NULL`);
}

export async function down(db: Database): Promise<void> {
  await db.query(`ALTER TABLE products DROP COLUMN tax_rate`);
}
```

8.5 Rollback Decision Matrix

| Scenario | Action | Owner |
|----------|--------|-------|
| Error rate > 5% | Auto-rollback | System |
| Error rate > 1% | Alert, manual decision | On-call |
| P99 latency > 2x | Alert, investigate | On-call |
| Customer reports | Investigate, manual rollback | On-call |
| Data corruption | Stop traffic, restore backup | Incident Commander |

8.6 Rollback Communication

```markdown
# Rollback Notification

**Service:** api-service
**Rolled back from:** v2.3.1
**Rolled back to:** v2.3.0
**Time:** 2026-01-17T14:30:00Z
**Duration:** ~15 minutes at degraded state

## Reason
Error rate exceeded 5% threshold after deployment of v2.3.1.
Investigation ongoing.

## Customer Impact
- API errors during 14:15-14:30 UTC
- ~2% of requests affected
- No data loss

## Next Steps
- Root cause investigation
- Fix and re-test
- Schedule new deployment

## Contact
On-call: Alice (alice@cybercube.software)
```

9. Database Migrations

Database changes require special handling.

9.1 Migration Principles

1. **Backward Compatible** — Old code works with new schema
2. **Reversible** — Can rollback without data loss
3. **Incremental** — Small changes, not big-bang
4. **Tested** — Run against production-like data
5. **Monitored** — Track migration progress

9.2 Migration Naming

Format: `{timestamp}_{description}.sql`

```
20260117120000_add_tax_rate_to_products.sql
20260117130000_create_audit_log_table.sql
20260117140000_add_index_users_email.sql
```

9.3 Safe Migration Patterns

**Adding a column:**
```sql
-- Phase 1: Add nullable column (deploy)
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Phase 2: Backfill (background job)
UPDATE users SET phone = '' WHERE phone IS NULL;

-- Phase 3: Add constraint (deploy after backfill complete)
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

**Renaming a column:**
```sql
-- Phase 1: Add new column
ALTER TABLE users ADD COLUMN full_name VARCHAR(100);

-- Phase 2: Copy data (background)
UPDATE users SET full_name = name WHERE full_name IS NULL;

-- Phase 3: Update application to use new column

-- Phase 4: Drop old column (after application deployed)
ALTER TABLE users DROP COLUMN name;
```

**Adding an index:**
```sql
-- Use CONCURRENTLY to avoid locking
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

9.4 Migration Checklist

```markdown
# Migration Checklist

## Before Migration
- [ ] Migration tested on staging with production-like data
- [ ] Rollback script prepared and tested
- [ ] Estimated duration calculated
- [ ] Lock impact assessed
- [ ] Backup verified
- [ ] Deployment window scheduled
- [ ] On-call notified

## During Migration
- [ ] Monitor database metrics
- [ ] Monitor application errors
- [ ] Ready to abort if issues

## After Migration
- [ ] Verify schema changes applied
- [ ] Verify application functioning
- [ ] Monitor for 30 minutes
- [ ] Document any issues
```

9.5 Migration Execution

```bash
#!/bin/bash
# migrate.sh - Database migration script

set -e

MIGRATION_DIR=$1
TARGET=$2

echo "Starting migration to ${TARGET}"
echo "Time: $(date -u)"

# Backup first
echo "Creating backup..."
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Run migrations
echo "Running migrations..."
for file in ${MIGRATION_DIR}/*.sql; do
  version=$(basename $file .sql | cut -d'_' -f1)
  
  if [ "$version" -le "$TARGET" ]; then
    echo "Applying: $file"
    psql $DATABASE_URL < $file
  fi
done

echo "Migration complete"
```

---

CYBERCUBE Release & Deployment — Quick Reference Card

Print it. Keep it handy.

🔹 Environments

| Env | Code | Purpose |
|-----|------|---------|
| Development | `dev` | Feature dev |
| Staging | `stg` | Pre-prod test |
| Production | `prd` | Live traffic |

🔹 Version Format

```
v{MAJOR}.{MINOR}.{PATCH}
v2.3.1
```

🔹 Branch Strategy

```
main ← feature/{ticket}-{desc}
main ← hotfix/{ticket}-{desc}
```

🔹 Commit Format

```
{type}({scope}): {description}

feat(auth): add Google OAuth
fix(billing): correct tax calc
```

🔹 Deployment Pipeline

```
BUILD → TEST → SCAN → STG → PRD
```

🔹 Deployment Methods

| Method | Use Case |
|--------|----------|
| Rolling | Default |
| Blue-Green | Zero downtime |
| Canary | High risk |

🔹 Release Approvals

| Risk | Approvers |
|------|-----------|
| Low | 1 engineer |
| Medium | Tech lead |
| High | Lead + Product |
| Critical | CAB |

🔹 Feature Flag Types

| Type | Lifetime |
|------|----------|
| Release | Temporary |
| Ops | Permanent |
| Experiment | Temporary |
| Permission | Permanent |

🔹 Rollback Triggers

- Error rate > 5%
- P99 latency > 2x baseline
- Health checks failing
- Customer reports

🔹 Rollback Commands

```bash
# Kubernetes
kubectl rollout undo deployment/api

# Feature flag
flags.disable('release_feature')
```

🔹 Change Types

| Type | Lead Time |
|------|-----------|
| Standard | Immediate |
| Normal | 1+ day |
| Emergency | Immediate |

🔹 Migration Safety

```
1. Add column (nullable)
2. Backfill data
3. Add constraint
```

🔹 Health Endpoints

```
/health/live   → Liveness
/health/ready  → Readiness
/health        → Detailed
```

🔹 Don't Forget

✅ Every deployment can roll back
✅ Feature flags for risky changes
✅ Test migrations on staging
✅ Monitor after deployment
✅ Document all changes
✅ Communicate releases

---

## Implementation Status

**Last Updated:** 2026-01-17
**Standard Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Environment separation | PARTIAL | Needs network isolation |
| Version control (Git) | COMPLETE | GitHub in use |
| Branch protection | PARTIAL | Add CODEOWNERS |
| Release branch workflow | PENDING | Adopt release/* branches |
| CI pipeline | PARTIAL | Needs security scan |
| Artifact signing (cosign) | PENDING | Phase 2 — recommended, not required |
| Artifact registry | PENDING | Select provider |
| Staging environment | PARTIAL | Needs parity check |
| Health endpoints | PARTIAL | Standardize format |
| Feature flag system | PENDING | Select provider |
| Rollback automation | PENDING | Document procedures |
| Change management | PENDING | Define process |
| Database migrations | PARTIAL | Add safety checks |
| Release documentation | PENDING | Create templates |

### Migration Path

1. **Phase 1**: Complete CI pipeline + branch protection
2. **Phase 2**: Artifact registry + signing
3. **Phase 3**: Feature flag system
4. **Phase 4**: Staging parity + health endpoints
5. **Phase 5**: Change management process
6. **Phase 6**: Migration safety tooling

---

Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-01-17 | Initial release |
