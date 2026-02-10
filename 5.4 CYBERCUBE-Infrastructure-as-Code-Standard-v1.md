# CYBERCUBE Infrastructure as Code (IaC) Standard (v1)

## Glossary

This glossary defines key terms used throughout the CYBERCUBE Infrastructure as Code Standard.

All definitions are normative unless stated otherwise.

### A

**Apply**

The operation that executes planned infrastructure changes.

Process:
- Reads approved plan
- Creates, updates, or destroys resources
- Updates state file
- Logs all actions

**Artifact**

A versioned, immutable output from the IaC build process.

Examples:
- Terraform plan files
- Container images
- Configuration bundles

### B

**Backend**

The storage location for Terraform/OpenTofu state.

Requirements:
- Remote (not local)
- Encrypted at rest
- Access controlled
- Locking enabled

**Blast Radius**

The scope of potential impact from an infrastructure change.

Minimization:
- Small, focused changes
- Environment isolation
- Resource targeting

### C

**Click-Ops**

Manual infrastructure changes made through cloud console UI.

Status: PROHIBITED in production

Alternative: IaC-managed changes

**Configuration Drift**

Divergence between declared infrastructure state and actual state.

Detection:
- Scheduled plan runs
- Drift detection tools
- Reconciliation alerts

### D

**Declarative**

Describing the desired end state rather than steps to achieve it.

Contrast: Imperative (step-by-step commands)

CYBERCUBE approach: Declarative preferred

**Dependency**

A relationship where one resource requires another.

Types:
- Explicit (declared)
- Implicit (inferred)
- External (cross-stack)

**Destroy**

The operation that removes infrastructure resources.

Safeguards:
- Plan review required
- Explicit approval
- Backup verification
- Audit logging

### E

**Environment**

An isolated deployment context (dev, staging, production).

Isolation requirements:
- Separate state files
- Separate credentials
- Network isolation
- Independent deployment

### G

**GitOps**

Operational model using Git as the single source of truth.

Principles:
- Declarative configuration
- Version controlled
- Automatically applied
- Continuously reconciled

### I

**Idempotent**

Operations that produce the same result regardless of execution count.

Importance:
- Safe retries
- Predictable outcomes
- Convergent behavior

**Immutable Infrastructure**

Infrastructure that is replaced rather than modified.

Benefits:
- Consistency
- Reproducibility
- Rollback capability

**Import**

Bringing existing resources under IaC management.

Process:
- Identify resource
- Write configuration
- Import to state
- Verify plan shows no changes

### L

**Lock**

Mechanism preventing concurrent state modifications.

Purpose:
- Prevent race conditions
- Ensure consistency
- Avoid corruption

### M

**Module**

A reusable, encapsulated collection of IaC resources.

Requirements:
- Versioned
- Documented
- Tested
- Owned

**Mutation**

Any change to infrastructure resources.

Types:
- Create
- Update (in-place)
- Replace
- Destroy

### O

**OpenTofu**

Open-source Terraform fork maintained by the Linux Foundation.

Status: Approved alternative to Terraform

### P

**Plan**

The operation that previews infrastructure changes without applying.

Output includes:
- Resources to create
- Resources to update
- Resources to destroy
- No-op resources

**Provider**

Plugin enabling IaC tools to interact with specific platforms.

Examples:
- AWS provider
- GCP provider
- Kubernetes provider

**Pulumi**

IaC tool using general-purpose programming languages.

Status: Approved for specific projects

### R

**Refactoring**

Restructuring IaC code without changing infrastructure.

Techniques:
- State moves
- Module extraction
- Variable consolidation

**Remote State**

State stored in a shared, remote backend.

Contrast: Local state (stored on disk)

CYBERCUBE requirement: Remote state MANDATORY

**Resource**

A single infrastructure component managed by IaC.

Examples:
- VM instance
- Database
- Network
- IAM role

### S

**Secret**

Sensitive data (credentials, keys, tokens).

Handling:
- Never in IaC code
- Never in state (when possible)
- External secret manager
- Runtime injection

**Stack**

An isolated collection of IaC resources sharing state.

Naming: `{project}-{environment}-{component}`

**State**

The record of managed infrastructure and resource attributes.

Properties:
- Single source of truth
- Encrypted
- Versioned
- Backed up

**State Locking**

Preventing concurrent modifications to state.

Mechanisms:
- DynamoDB (AWS)
- GCS (GCP)
- Azure Blob lease

### T

**Terraform**

HashiCorp's infrastructure as code tool.

Status: Primary IaC tool at CYBERCUBE

**Taint**

Marking a resource for recreation on next apply.

Use case: Force replacement of corrupted resource

**Targeting**

Applying changes to specific resources only.

Syntax: `-target=resource.name`

Caution: Use sparingly, may cause drift

### V

**Variable**

Parameterized input to IaC configuration.

Types:
- Input variables
- Local variables
- Output values

**Version Constraint**

Specification limiting acceptable versions.

Syntax: `~> 1.0`, `>= 1.0, < 2.0`

Applies to: Providers, modules, tools

### W

**Workspace**

Isolated state instance within a configuration.

Use case: Environment separation (alternative to directories)

---

# CYBERCUBE Infrastructure as Code (IaC) Standard (v1)

**Standard ID:** STD-ENG-004  
**Status:** Active  
**Effective:** 2026-02-01  
**Classification:** INTERNAL  
**Owner:** SRE / Platform Engineering  
**Approver:** VP Engineering  
**Applies to:** All CYBERCUBE infrastructure, platforms, and engineering teams  
**Review Cycle:** Annual + after major tooling changes

---

## 0. Purpose & Design Principles

This standard defines CYBERCUBE's Infrastructure as Code (IaC) framework—declarative, version-controlled, and auditable infrastructure management for all environments and cloud resources. Infrastructure is treated as software: reviewed, tested, versioned, and deployed through controlled pipelines.

**Industry Alignment:**
- Infrastructure as Code (IaC) Principles
- GitOps Model (Git as source of truth)
- ISO/IEC 27001 (Configuration & Change Control)
- NIST SP 800-53 (CM, AC families)
- SOC 2 Type II (Change Management, Availability)
- CNCF Best Practices

**Design Principles:**

1. **Declarative Over Imperative** — Describe desired state, not steps
2. **Version Controlled** — All infrastructure in Git
3. **Reproducible** — Any environment recreatable from code
4. **Auditable** — Complete change history preserved
5. **Review-Driven** — No changes without peer review
6. **Environment Parity** — Consistent patterns across environments
7. **Least Privilege** — Minimal permissions for IaC operations

**This Document Defines:**
- IaC scope, tooling, and state management
- Change control workflow and safety mechanisms
- Environment isolation and secrets handling
- Governance, compliance, and lifecycle management

**This Document Does NOT Define:**
- Application deployment — see Release & Deployment Standard
- Security controls — see Security Policy
- Access management — see Authorization & Access Control Standard
- Incident response — see Incident Response Standard

---

## 1. IaC Scope, Tools & State Management

### 1.1 Scope of IaC-Managed Resources

All production infrastructure MUST be managed through IaC.

#### 1.1.1 Mandatory IaC Coverage

| Category | Resources | Priority |
|----------|-----------|----------|
| **Compute** | VMs, containers, serverless functions, auto-scaling groups | Required |
| **Networking** | VPCs, subnets, firewalls, load balancers, DNS, CDN | Required |
| **Storage** | Object storage, block storage, file systems | Required |
| **Databases** | Managed databases, replicas, backups | Required |
| **IAM** | Service accounts, roles, policies, groups | Required |
| **Security** | KMS keys, certificates, WAF rules, security groups | Required |
| **Messaging** | Queues, topics, event buses | Required |
| **Caching** | Redis, Memcached, CDN caching | Required |
| **Observability** | Monitoring dashboards, alerts, log sinks | Required |
| **Kubernetes** | Clusters, namespaces, RBAC, service mesh | Required |

#### 1.1.2 Exceptions (Documented)

| Resource Type | Reason | Requirement |
|---------------|--------|-------------|
| Emergency hotfixes | Time-critical response | Document + backport to IaC within 24h |
| Ephemeral dev resources | Short-lived testing | Auto-cleanup policies |
| Third-party managed | External control | Document integration points |

### 1.2 Approved Tooling

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         IaC TOOLING HIERARCHY                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRIMARY (Default)                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Terraform / OpenTofu                                               │   │
│  │  • All cloud infrastructure                                         │   │
│  │  • Cross-cloud resources                                            │   │
│  │  • Kubernetes cluster provisioning                                  │   │
│  │  • HCL syntax (declarative)                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  APPROVED (Specific Use Cases)                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Pulumi                                                             │   │
│  │  • Complex logic requirements                                       │   │
│  │  • TypeScript/Python infrastructure                                 │   │
│  │  • Requires approval for new projects                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  RESTRICTED (Legacy / Migration)                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Cloud-Native Templates                                             │   │
│  │  • CloudFormation (AWS) — migration to Terraform                    │   │
│  │  • Deployment Manager (GCP) — migration to Terraform                │   │
│  │  • ARM Templates (Azure) — migration to Terraform                   │   │
│  │  • New usage requires exception approval                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  KUBERNETES-SPECIFIC                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Helm                                                               │   │
│  │  • Application deployments on Kubernetes                            │   │
│  │  • Chart management                                                 │   │
│  │                                                                      │   │
│  │  Kustomize                                                          │   │
│  │  • Configuration overlays                                           │   │
│  │  • Environment-specific patches                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 1.2.1 Tool Selection Matrix

| Use Case | Primary Tool | Alternative | Notes |
|----------|--------------|-------------|-------|
| Cloud infrastructure | Terraform | OpenTofu | HCL-based |
| Complex conditionals | Pulumi | Terraform | Requires approval |
| Kubernetes clusters | Terraform | — | Cluster provisioning |
| K8s applications | Helm | Kustomize | In-cluster resources |
| Configuration mgmt | Ansible | — | Server configuration |
| Secrets management | External Secrets | Vault | Not in IaC state |

#### 1.2.2 Version Requirements

| Tool | Minimum Version | Constraint | Notes |
|------|-----------------|------------|-------|
| Terraform | 1.6.0 | `~> 1.6` | LTS version |
| OpenTofu | 1.6.0 | `~> 1.6` | Terraform compatible |
| Pulumi | 3.0.0 | `>= 3.0` | If approved |
| Helm | 3.12.0 | `>= 3.12` | K8s deployments |

#### 1.2.3 Provider Version Pinning

All Terraform providers MUST use version constraints. Unpinned providers auto-upgrade and can introduce breaking changes.

```hcl
# ✅ REQUIRED: Pin provider versions
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"    # Allow minor updates, block major
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.20, < 3.0"
    }
  }
}

# ❌ PROHIBITED: No version constraint
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"  # Will auto-upgrade — NEVER do this
    }
  }
}
```

- Use `.terraform.lock.hcl` — commit this file to Git to lock exact provider versions
- Run `terraform init -upgrade` deliberately when upgrading providers
- Test provider upgrades in dev/staging before production

### 1.3 State Management

State is the critical record of managed infrastructure. Proper state management is MANDATORY.

#### 1.3.1 State Backend Requirements

| Requirement | Implementation | Rationale |
|-------------|----------------|-----------|
| **Remote Storage** | Cloud object storage (S3, GCS, Azure Blob) | Shared access, durability |
| **Encryption at Rest** | KMS-managed encryption | Data protection |
| **Encryption in Transit** | TLS 1.2+ | Network security |
| **State Locking** | DynamoDB, GCS, Azure lease | Prevent corruption |
| **Versioning** | Object versioning enabled | Recovery, audit |
| **Access Control** | IAM policies, least privilege | Security |
| **Backup** | Cross-region replication | Disaster recovery |

#### 1.3.2 State Backend Configuration

**AWS (S3 + DynamoDB):**

```hcl
terraform {
  backend "s3" {
    bucket         = "cybercube-terraform-state-{region}"
    key            = "{project}/{environment}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    kms_key_id     = "alias/terraform-state-key"
    dynamodb_table = "cybercube-terraform-locks"
  }
}

# NOTE: S3 access logging is configured on the state bucket resource itself,
# not in the backend block. See the state bucket module for logging config:
#   target_bucket = "cybercube-access-logs"
#   target_prefix = "terraform-state/"
```

**GCP (GCS):**

```hcl
terraform {
  backend "gcs" {
    bucket  = "cybercube-terraform-state"
    prefix  = "{project}/{environment}"
    
    # Encryption via default KMS
  }
}
```

#### 1.3.3 State Organization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         STATE ORGANIZATION                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  State Bucket: cybercube-terraform-state                                    │
│  │                                                                          │
│  ├── platform/                                                              │
│  │   ├── production/                                                        │
│  │   │   ├── networking/terraform.tfstate                                   │
│  │   │   ├── compute/terraform.tfstate                                      │
│  │   │   ├── database/terraform.tfstate                                     │
│  │   │   └── security/terraform.tfstate                                     │
│  │   ├── staging/                                                           │
│  │   │   └── ...                                                            │
│  │   └── development/                                                       │
│  │       └── ...                                                            │
│  │                                                                          │
│  ├── shared/                                                                │
│  │   ├── iam/terraform.tfstate                                              │
│  │   ├── dns/terraform.tfstate                                              │
│  │   └── monitoring/terraform.tfstate                                       │
│  │                                                                          │
│  └── kubernetes/                                                            │
│      ├── production/terraform.tfstate                                       │
│      └── staging/terraform.tfstate                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 1.3.4 State Access Control

| Role | Permissions | Use Case |
|------|-------------|----------|
| **CI/CD Pipeline** | Read, Write, Lock | Automated deployments |
| **Platform Engineer** | Read, Write, Lock | Infrastructure changes |
| **Developer** | Read (plan only) | Review, debugging |
| **Security Auditor** | Read | Compliance review |
| **Emergency Access** | Read, Write, Lock | Break-glass (logged) |

**State access is audited.** All read/write operations logged to security monitoring.

#### 1.3.5 State Security

| Risk | Mitigation |
|------|------------|
| **Sensitive data in state** | Avoid storing secrets; use external secret managers |
| **State corruption** | Locking, versioning, backups |
| **Unauthorized access** | IAM, encryption, audit logging |
| **State drift** | Scheduled drift detection |
| **Accidental deletion** | Versioning, deletion protection, backups |

#### 1.3.6 State Recovery Procedure

State is the single most critical IaC artifact. If state is lost or corrupted, infrastructure continues running but becomes unmanageable.

| Scenario | Recovery Method | RTO |
|----------|-----------------|-----|
| **State corruption** | Restore previous version from S3/GCS object versioning | < 30 min |
| **State deletion** | Restore from cross-region backup replica | < 1 hour |
| **Lock stuck** | Investigate cause → `terraform force-unlock` (with approval) | < 15 min |
| **State lost (no backup)** | Re-import all resources from cloud reality | 4–8 hours |

Recovery steps (corruption or deletion):
1. **Stop** — Halt all IaC pipelines immediately to prevent further damage
2. **Assess** — Determine scope: which stacks are affected
3. **Restore** — Pull previous state version from object versioning or backup
4. **Verify** — Run `terraform plan` — expect zero diff against live infra
5. **Resume** — Re-enable pipelines, verify locking works
6. **Postmortem** — Document cause, update protections per Incident Response Standard (4.3)

For full disaster recovery of infrastructure itself (not just state), see Backup & Disaster Recovery Standard (4.2).

---

## 2. Change Control, Environments & Safety

### 2.1 Environment Isolation

Each environment MUST be fully isolated with separate:
- State files
- Cloud accounts or projects (preferred)
- Credentials and service accounts
- Network boundaries
- Resource naming

#### 2.1.1 Environment Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ENVIRONMENT HIERARCHY                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PRODUCTION (prd)                                                           │
│  ├── Highest change control                                                 │
│  ├── Approval required for all changes                                      │
│  ├── Limited access (Platform team + approved)                              │
│  ├── Change windows (if applicable)                                         │
│  └── Full monitoring and alerting                                           │
│                                                                             │
│  STAGING (stg)                                                              │
│  ├── Production-like configuration                                          │
│  ├── Pre-production validation                                              │
│  ├── Integration testing                                                    │
│  └── Approval required                                                      │
│                                                                             │
│  DEVELOPMENT (dev)                                                          │
│  ├── Rapid iteration                                                        │
│  ├── Team-level access                                                      │
│  ├── Automated cleanup policies                                             │
│  └── PR review required                                                     │
│                                                                             │
│  SANDBOX (sbx)                                                              │
│  ├── Experimentation                                                        │
│  ├── Individual developer access                                            │
│  ├── Auto-destroy after TTL                                                 │
│  └── No production data                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.1.2 Environment Configuration

| Aspect | Production | Staging | Development | Sandbox |
|--------|------------|---------|-------------|---------|
| **State isolation** | Dedicated bucket | Dedicated bucket | Shared bucket | Ephemeral |
| **Cloud account** | Dedicated | Dedicated | Shared | Shared |
| **Approval** | 2+ reviewers | 1+ reviewer | 1 reviewer | Self |
| **Change window** | Scheduled | Flexible | Anytime | Anytime |
| **Data** | Production | Sanitized copy | Synthetic | Synthetic |
| **Monitoring** | Full | Full | Basic | Minimal |
| **TTL** | Permanent | Permanent | Permanent | 24-72 hours |

#### 2.1.3 No Shared State

**PROHIBITED:** Sharing state files across environments.

```hcl
# ❌ WRONG: Shared state (no environment separation)
terraform {
  backend "s3" {
    key = "platform/terraform.tfstate"
  }
}

# ✅ CORRECT: Environment-specific state using -backend-config
# Variables cannot be used in backend blocks. Use partial configuration:
#   terraform init -backend-config="key=platform/production/terraform.tfstate"
# Or use separate backend.tf per environment directory (recommended):
terraform {
  backend "s3" {
    key = "platform/production/terraform.tfstate"  # Hardcoded per environment
  }
}
```

### 2.2 Change Workflow

All infrastructure changes MUST follow the standard workflow.

#### 2.2.1 Workflow Stages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         IaC CHANGE WORKFLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. CODE             2. COMMIT           3. PR                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Write IaC    │──▶│ Commit to    │──▶│ Open Pull    │                   │
│  │ changes      │   │ feature      │   │ Request      │                   │
│  │              │   │ branch       │   │              │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                                               ▼                            │
│  4. VALIDATE         5. PLAN            6. REVIEW                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ CI runs:     │──▶│ terraform    │──▶│ Peer review  │                   │
│  │ • fmt check  │   │ plan         │   │ of code +    │                   │
│  │ • validate   │   │ (output      │   │ plan output  │                   │
│  │ • lint       │   │ attached)    │   │              │                   │
│  │ • security   │   │              │   │              │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                               │                            │
│                                               ▼                            │
│  7. APPROVE          8. APPLY           9. VERIFY                         │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ Required     │──▶│ terraform    │──▶│ Post-apply   │                   │
│  │ approvals    │   │ apply        │   │ verification │                   │
│  │ obtained     │   │ (automated   │   │ & monitoring │                   │
│  │              │   │ or manual)   │   │              │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.2.2 CI Pipeline Requirements

| Stage | Tool/Action | Failure Behavior |
|-------|-------------|------------------|
| **Format** | `terraform fmt -check` | Block PR |
| **Validate** | `terraform validate` | Block PR |
| **Lint** | `tflint`, `checkov` | Block PR |
| **Security Scan** | `trivy` (IaC mode), `checkov` | Block PR (critical) |
| **Plan** | `terraform plan` | Attach output to PR |
| **Cost Estimate** | `infracost` | See thresholds below |
| **Policy Check** | OPA/Sentinel | Block PR (violations) |

**Cost estimation thresholds:**

| Monthly Cost Increase | Action |
|----------------------|--------|
| < $500 | Info comment on PR |
| $500 – $2,000 | Warning — requires reviewer acknowledgment |
| > $2,000 | Blocking — requires Platform Lead approval |

**Example CI configuration:**

```yaml
# .github/workflows/terraform.yml
name: Terraform

on:
  pull_request:
    paths:
      - 'infrastructure/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "~> 1.6.0"
      
      - name: Format Check
        run: terraform fmt -check -recursive
        working-directory: infrastructure
      
      - name: Init
        run: terraform init -backend=false
        working-directory: infrastructure
      
      - name: Validate
        run: terraform validate
        working-directory: infrastructure
      
      - name: TFLint
        uses: terraform-linters/setup-tflint@v4
      
      - name: Security Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'config'
          scan-ref: 'infrastructure'
          exit-code: '1'

  plan:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - name: Terraform Plan
        run: terraform plan -out=tfplan
        
      - name: Post Plan to PR
        uses: actions/github-script@v7
        with:
          script: |
            // Post plan output as PR comment
```

#### 2.2.3 Approval Requirements

| Environment | Reviewers Required | Additional Requirements |
|-------------|-------------------|------------------------|
| Production | 2 (including Platform team) | Security review for IAM |
| Staging | 1 (Platform or Senior) | — |
| Development | 1 (any engineer) | — |
| Sandbox | Self-approve | Auto-cleanup policy |

### 2.3 Safety Controls

#### 2.3.1 Plan Review Requirements

**All applies MUST be preceded by plan review.**

Plan review checklist:
- [ ] Resources to create are expected
- [ ] Resources to update are expected (check in-place vs replace)
- [ ] Resources to destroy are expected and approved
- [ ] No unexpected changes (drift indicates issue)
- [ ] Sensitive resources flagged and reviewed
- [ ] Cost impact assessed

#### 2.3.2 Destructive Change Protection

| Protection | Implementation | Scope |
|------------|----------------|-------|
| **Prevent destroy** | `lifecycle { prevent_destroy = true }` | Critical resources |
| **Explicit approval** | Separate approval workflow | Any destroy in prod |
| **Change window** | Scheduled destruction only | Production |
| **Backup verification** | Confirm backup before destroy | Databases, storage |
| **Staged destruction** | Drain → backup → destroy | Stateful services |

**Resources requiring destroy protection:**

```hcl
# Critical resources with destroy protection
resource "aws_rds_instance" "production" {
  # ... configuration ...
  
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket" "customer_data" {
  # ... configuration ...
  
  lifecycle {
    prevent_destroy = true
  }
}
```

#### 2.3.3 Drift Detection

Drift detection identifies unauthorized or untracked changes.

| Method | Frequency | Action |
|--------|-----------|--------|
| **Scheduled plan** | Daily | Alert on unexpected diff |
| **Pre-apply plan** | Every change | Review before apply |
| **Reconciliation** | Weekly | Compare state to reality |

**Drift response:**
1. **Investigate** — Determine cause of drift
2. **Document** — Record in incident tracking
3. **Remediate** — Either update IaC or revert manual change
4. **Prevent** — Address root cause (access, process)

#### 2.3.4 Rollback Procedures

| Scenario | Rollback Method | RTO Target |
|----------|-----------------|------------|
| **Bad apply** | Apply previous state version | < 15 min |
| **Partial apply** | Complete apply or revert | < 30 min |
| **State corruption** | Restore from backup | < 1 hour |
| **Resource failure** | Taint and recreate | < 30 min |

If a rollback is triggered by a production incident, follow the Incident Response Standard (4.3) in parallel. The IC coordinates rollback timing; the on-call engineer executes.

### 2.5 Emergency Change Procedure (Break-Glass)

When production is impacted and the standard IaC workflow is too slow or unavailable, a break-glass procedure is authorized.

#### 2.5.1 Break-Glass Criteria

Emergency changes are permitted ONLY when ALL of the following are true:
- A SEV-1 or SEV-2 incident is declared per Incident Response Standard (4.3)
- The standard IaC pipeline cannot complete within the incident RTO
- An Incident Commander or VP Engineering has authorized the change

#### 2.5.2 Emergency Change Process

| Step | Action | Owner |
|------|--------|-------|
| 1 | Declare incident and confirm break-glass criteria met | IC |
| 2 | Authorize emergency access (logged) | IC or VP Engineering |
| 3 | Make manual change in cloud console or CLI | On-call engineer |
| 4 | Document every action taken (timestamps, resources, values) | On-call engineer |
| 5 | Verify service restored | IC |
| 6 | **Backport to IaC within 24 hours** — PR with equivalent IaC change | On-call engineer |
| 7 | Run `terraform plan` to confirm IaC matches reality (zero diff) | Platform team |
| 8 | If import needed, follow §3.3.3 Import process | Platform team |
| 9 | Include in incident postmortem | IC |

#### 2.5.3 Emergency Access Controls

- Emergency credentials are separate from normal credentials
- All emergency access is logged and alerted to Security
- Emergency sessions are time-limited (max 4 hours)
- Post-incident: review access logs, revoke temporary permissions
- Failure to backport within 24h is escalated to Engineering Manager

### 2.6 Secrets Handling

**CRITICAL:** Secrets MUST NOT be stored in IaC code or state.

#### 2.6.1 Secrets Management Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SECRETS MANAGEMENT                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ❌ PROHIBITED                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Secrets in .tf files                                             │   │
│  │  • Secrets in terraform.tfvars                                      │   │
│  │  • Secrets in state files (when avoidable)                          │   │
│  │  • Secrets in Git (any branch, any commit)                          │   │
│  │  • Secrets in CI/CD logs                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ✅ APPROVED METHODS                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  1. External Secret Manager (Primary)                               │   │
│  │     • HashiCorp Vault                                               │   │
│  │     • AWS Secrets Manager                                           │   │
│  │     • GCP Secret Manager                                            │   │
│  │     • Azure Key Vault                                               │   │
│  │                                                                      │   │
│  │  2. Reference by ARN/ID (IaC references secret, not value)          │   │
│  │                                                                      │   │
│  │  3. Runtime Injection (secrets injected at deploy time)             │   │
│  │                                                                      │   │
│  │  4. External Secrets Operator (Kubernetes)                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.6.2 Secret Reference Pattern

```hcl
# ✅ CORRECT: Reference secret by ARN, not value
resource "aws_ecs_task_definition" "app" {
  # ...
  
  container_definitions = jsonencode([
    {
      name = "app"
      secrets = [
        {
          name      = "DATABASE_PASSWORD"
          valueFrom = aws_secretsmanager_secret.db_password.arn
        }
      ]
    }
  ])
}

# ❌ WRONG: Secret value in configuration
resource "aws_ecs_task_definition" "app" {
  # ...
  
  container_definitions = jsonencode([
    {
      name = "app"
      environment = [
        {
          name  = "DATABASE_PASSWORD"
          value = "super-secret-password"  # NEVER DO THIS
        }
      ]
    }
  ])
}
```

#### 2.6.3 Sensitive Output Handling

```hcl
# Mark sensitive outputs
output "database_password" {
  value     = aws_db_instance.main.password
  sensitive = true  # Prevents display in logs
}

# Prefer referencing secrets rather than outputting
output "database_secret_arn" {
  value       = aws_secretsmanager_secret.db_password.arn
  description = "ARN of database password secret"
}
```

---

## 3. Governance, Compliance & Lifecycle

### 3.1 Governance Rules

#### 3.1.1 Core Governance Requirements

| Rule | Requirement | Enforcement |
|------|-------------|-------------|
| **IaC-Only Changes** | All production changes via IaC | Console access restricted |
| **Version Control** | All IaC in Git | Repository policies |
| **Peer Review** | All changes reviewed | Branch protection |
| **Audit Trail** | All applies logged | CI/CD + cloud audit logs |
| **Module Versioning** | Modules pinned to versions | Terraform constraints |
| **Ownership** | Clear owner for each stack | CODEOWNERS file |

#### 3.1.2 Repository Structure

```
infrastructure/
├── README.md                    # Documentation
├── CODEOWNERS                   # Ownership definitions
├── .terraform-version           # Required Terraform version
├── .tflint.hcl                  # Linting configuration
│
├── modules/                     # Reusable modules
│   ├── networking/
│   │   ├── vpc/
│   │   ├── dns/
│   │   └── cdn/
│   ├── compute/
│   │   ├── ecs-service/
│   │   └── lambda/
│   ├── database/
│   │   ├── rds/
│   │   └── dynamodb/
│   └── security/
│       ├── iam-role/
│       └── security-group/
│
├── environments/                # Environment configurations
│   ├── production/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── backend.tf
│   │   └── terraform.tfvars
│   ├── staging/
│   │   └── ...
│   └── development/
│       └── ...
│
└── shared/                      # Cross-environment resources
    ├── iam/
    ├── dns/
    └── monitoring/
```

#### 3.1.3 CODEOWNERS Configuration

```
# CODEOWNERS
# Platform team owns all infrastructure

# Default owners
* @cybercube/platform-engineering

# Security-sensitive resources require security review
modules/security/ @cybercube/platform-engineering @cybercube/security
environments/*/iam.tf @cybercube/platform-engineering @cybercube/security

# Database changes require DBA review
modules/database/ @cybercube/platform-engineering @cybercube/dba

# Production requires senior approval
environments/production/ @cybercube/platform-leads
```

#### 3.1.4 Module Management

| Aspect | Requirement |
|--------|-------------|
| **Versioning** | Semantic versioning (MAJOR.MINOR.PATCH) |
| **Documentation** | README with inputs, outputs, examples |
| **Testing** | Unit tests (terratest) for critical modules |
| **Changelog** | Document breaking changes |
| **Ownership** | Clear owner in CODEOWNERS |
| **Registry** | Internal module registry or Git tags |

**Module versioning example:**

```hcl
# Pin modules to specific versions
module "vpc" {
  source  = "git::https://github.com/cybercube/terraform-modules.git//networking/vpc?ref=v1.2.3"
  # or
  source  = "app.terraform.io/cybercube/vpc/aws"
  version = "~> 1.2"
}
```

#### 3.1.5 Required Resource Tags

All IaC-managed cloud resources MUST include the following tags/labels. IaC is the enforcement point for consistent tagging.

| Tag Key | Required | Example | Purpose |
|---------|----------|---------|---------|
| `environment` | Yes | `production`, `staging`, `dev` | Environment identification |
| `project` | Yes | `platform`, `billing` | Project/service grouping |
| `owner` | Yes | `platform-engineering` | Team ownership |
| `managed-by` | Yes | `terraform` | IaC tool identification |
| `cost-center` | Yes (prod) | `eng-platform` | Cost allocation |
| `data-classification` | If applicable | `confidential`, `internal` | Per Data Classification Standard (3.3) |

Enforcement:
- Tags are validated in CI via OPA/Sentinel policies
- Missing required tags block the PR
- Tag naming follows Naming & Identifier Standard (5.1)

Example default tags:

```hcl
locals {
  default_tags = {
    environment        = var.environment
    project            = var.project
    owner              = var.team
    managed-by         = "terraform"
    cost-center        = var.cost_center
  }
}

provider "aws" {
  default_tags {
    tags = local.default_tags
  }
}
```

### 3.2 Compliance & Audit

#### 3.2.1 Change History Preservation

All changes MUST be traceable:

| Source | Retention | Purpose |
|--------|-----------|---------|
| **Git history** | Indefinite | Code changes, authorship |
| **PR records** | Indefinite | Review, approval, discussion |
| **Plan outputs** | 90 days | Change preview record |
| **Apply logs** | 1 year | Execution record |
| **State versions** | 90 days | State recovery |
| **Cloud audit logs** | 1 year | API-level audit |

#### 3.2.2 Audit Requirements

| Audit Type | Frequency | Scope |
|------------|-----------|-------|
| **Drift check** | Daily | All production stacks |
| **Access review** | Quarterly | State backend access |
| **Module audit** | Quarterly | Security, updates |
| **Compliance scan** | Weekly | Policy violations |
| **Cost review** | Monthly | Resource usage |

#### 3.2.3 Compliance Scanning

Automated policy enforcement:

```hcl
# Example OPA/Rego policy
package terraform.analysis

deny[msg] {
  resource := input.resource_changes[_]
  resource.type == "aws_s3_bucket"
  not resource.change.after.versioning[0].enabled
  msg := sprintf("S3 bucket %v must have versioning enabled", [resource.address])
}

deny[msg] {
  resource := input.resource_changes[_]
  resource.type == "aws_db_instance"
  not resource.change.after.storage_encrypted
  msg := sprintf("RDS instance %v must be encrypted", [resource.address])
}
```

### 3.3 Lifecycle Management

#### 3.3.1 Resource Lifecycle Stages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         RESOURCE LIFECYCLE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CREATE              UPDATE              DECOMMISSION                       │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐                   │
│  │ • IaC code   │   │ • IaC change │   │ • IaC removal│                   │
│  │ • PR review  │   │ • PR review  │   │ • PR review  │                   │
│  │ • Plan       │   │ • Plan       │   │ • Plan       │                   │
│  │ • Apply      │   │ • Apply      │   │ • Backup     │                   │
│  │ • Verify     │   │ • Verify     │   │ • Apply      │                   │
│  │              │   │              │   │ • Verify     │                   │
│  └──────────────┘   └──────────────┘   └──────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3.3.2 Decommissioning Workflow

| Step | Action | Owner |
|------|--------|-------|
| 1 | Identify resource for removal | Service owner |
| 2 | Verify no dependencies | Platform team |
| 3 | Create backup (if applicable) | Platform team |
| 4 | Remove from IaC code | Developer |
| 5 | PR review with destroy plan | Platform team |
| 6 | Approval from stakeholders | Service + Platform |
| 7 | Apply destruction | Platform team |
| 8 | Verify removal | Platform team |
| 9 | Archive backup (retention period) | Platform team |
| 10 | Update documentation | Developer |

#### 3.3.3 Import Existing Resources

For resources created outside IaC (legacy or emergency):

| Step | Action |
|------|--------|
| 1 | Identify unmanaged resource |
| 2 | Write IaC configuration matching current state |
| 3 | Run `terraform import` |
| 4 | Run `terraform plan` — expect no changes |
| 5 | Commit IaC code |
| 6 | Document in PR why import was needed |

### 3.4 Prohibited Practices

The following practices are **PROHIBITED**:

| Practice | Risk | Alternative |
|----------|------|-------------|
| ❌ **Click-ops in production** | Untracked, unreviewed changes | IaC workflow |
| ❌ **Untracked infrastructure** | Compliance gap, drift | Import to IaC |
| ❌ **Shared mutable state** | Corruption, conflicts | Isolated state per env |
| ❌ **Secrets in repos** | Credential exposure | Secret managers |
| ❌ **Secrets in state** | Exposure via state access | External secrets |
| ❌ **Unpinned module versions** | Breaking changes | Pin to versions |
| ❌ **Direct state manipulation** | Corruption | Use CLI commands |
| ❌ **Skipping plan review** | Unexpected changes | Mandatory review |
| ❌ **Force-unlock without cause** | Race conditions | Investigate first |
| ❌ **Targeting without review** | Partial applies, drift | Full applies |

---

## CYBERCUBE IaC — Quick Reference Card

Version: v1 | 2026-02-01  
Print it. Keep it handy.

### 🔹 Workflow

```
CODE → COMMIT → PR → VALIDATE → PLAN → REVIEW → APPROVE → APPLY → VERIFY
```

### 🔹 Approved Tools

| Use Case | Primary | Alternative |
|----------|---------|-------------|
| Cloud infra | Terraform | OpenTofu |
| Complex logic | Pulumi | (requires approval) |
| K8s clusters | Terraform | — |
| K8s apps | Helm | Kustomize |

### 🔹 State Requirements

| Requirement | Status |
|-------------|--------|
| Remote backend | ✅ Required |
| Encryption at rest | ✅ Required |
| State locking | ✅ Required |
| Versioning | ✅ Required |
| Access control | ✅ Required |

### 🔹 Environment Isolation

| Environment | State | Account | Approval |
|-------------|-------|---------|----------|
| Production | Dedicated | Dedicated | 2+ reviewers |
| Staging | Dedicated | Dedicated | 1+ reviewer |
| Development | Shared | Shared | 1 reviewer |
| Sandbox | Ephemeral | Shared | Self |

### 🔹 CI Checks

```
✓ terraform fmt -check
✓ terraform validate
✓ tflint
✓ trivy / checkov
✓ terraform plan
✓ cost estimate
```

### 🔹 Secrets Handling

| ❌ Prohibited | ✅ Approved |
|---------------|------------|
| In .tf files | Secret Manager |
| In tfvars | Reference by ARN |
| In state | External injection |
| In Git | External Secrets Operator |

### 🔹 Destructive Changes

```
1. Backup verification
2. Plan review with explicit destroy
3. Stakeholder approval
4. Change window (production)
5. Apply with monitoring
6. Verify removal
```

### 🔹 Drift Response

```
DETECT → INVESTIGATE → DOCUMENT → REMEDIATE → PREVENT
```

### 🔹 Module Versioning

```hcl
# ✅ Good
source  = "...?ref=v1.2.3"
version = "~> 1.2"

# ❌ Bad
source = "..."  # Unpinned
```

### 🔹 DO's

✅ All infrastructure via IaC
✅ Remote, encrypted, locked state
✅ Review plan before apply
✅ Pin module versions
✅ Separate state per environment
✅ Use secret managers
✅ Document all exceptions

### 🔹 DON'Ts

❌ Click-ops in production
❌ Untracked infrastructure
❌ Shared state across environments
❌ Secrets in code or state
❌ Unpinned module versions
❌ Skip plan review
❌ Force operations without cause

---

## Implementation Status

**Last Updated:** 2026-02-01  
**Standard Version:** v1

### Core Implementation

| Component | Status | Notes |
|-----------|--------|-------|
| Terraform adoption | PARTIAL | Primary tool in use |
| Remote state backend | COMPLETE | S3/GCS configured |
| State locking | COMPLETE | DynamoDB/GCS |
| State encryption | COMPLETE | KMS encryption |
| CI pipeline | PARTIAL | Add security scanning |
| Drift detection | PENDING | Implement scheduled plans |
| Module registry | PENDING | Centralize modules |
| Policy enforcement | PENDING | OPA/Sentinel |
| Secret management | PARTIAL | Migrate remaining secrets |
| CODEOWNERS | PENDING | Define ownership |
| Cost estimation | PENDING | Add Infracost |
| Resource tagging enforcement | PENDING | Define default tags module |
| Provider version pinning | PARTIAL | Add lock file to Git |
| Break-glass procedure | PENDING | Document emergency access |
| State recovery runbook | PENDING | Test versioned restore |

### Migration Path

1. **Phase 1**: Complete CI pipeline (fmt, validate, lint, security scan)
2. **Phase 2**: Implement CODEOWNERS and approval workflows
3. **Phase 3**: Centralize and version modules
4. **Phase 4**: Add policy enforcement (OPA)
5. **Phase 5**: Implement drift detection
6. **Phase 6**: Complete secret migration to external managers
7. **Phase 7**: Add cost estimation and tracking
8. **Phase 8**: Resource tagging enforcement (default tags module + OPA policy)
9. **Phase 9**: Document and test break-glass + state recovery procedures

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-01 | Initial release |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| Naming & Identifier Standard (5.1) | Resource naming, tag conventions |
| Data Classification Standard (3.3) | Data classification tags |
| Backup & Disaster Recovery Standard (4.2) | Infrastructure DR, state backup |
| Incident Response Standard (4.3) | Rollback coordination, break-glass postmortem |
| Observability & Telemetry Standard (4.5) | Infrastructure monitoring |
| Release & Deployment Standard | Deployment pipelines, promotion |
| Security Policy | Security controls, IAM |
| Authorization & Access Control Standard | Identity, permissions |
| Change Management Policy | Change control governance |
| Standards Governance Policy | Compliance oversight |
