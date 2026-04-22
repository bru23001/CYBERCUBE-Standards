# M-36 — Workflow Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.36 (lines 2629–2767)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.36 Workflow Module (M-36) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IWorkflowService                                                        │
│  MODULE: M-36 Workflow                                                              │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Workflow Definition                                                              │
│  registerWorkflow(definition: WorkflowDefinition) → Result<WorkflowId, WflError>   │
│  getWorkflow(workflowId: WorkflowId) → Result<WorkflowDefinition, WflError>       │
│  listWorkflows(filter?: WorkflowFilter) → PagedResult<WorkflowDefinition>          │
│  deprecateWorkflow(workflowId: WorkflowId) → Result<void, WflError>               │
│                                                                                     │
│  // Workflow Execution                                                               │
│  startInstance(workflowId: WorkflowId, input: any, opts?: InstanceOpts)            │
│    → Result<InstanceId, WflError>                                                   │
│  cancelInstance(instanceId: InstanceId, reason: String)                             │
│    → Result<void, WflError>                                                         │
│  getInstanceStatus(instanceId: InstanceId) → Result<InstanceStatus, WflError>      │
│  listInstances(filter?: InstanceFilter) → PagedResult<InstanceSummary>             │
│                                                                                     │
│  // Task Management                                                                 │
│  getTask(taskId: TaskId) → Result<WorkflowTask, WflError>                          │
│  completeTask(taskId: TaskId, output: any) → Result<void, WflError>                │
│  failTask(taskId: TaskId, error: ErrorInfo) → Result<void, WflError>               │
│  reassignTask(taskId: TaskId, assignee: UserId) → Result<void, WflError>           │
│  getMyTasks(userId: UserId, filter?: TaskFilter) → PagedResult<WorkflowTask>       │
│                                                                                     │
│  // Approval Chains                                                                 │
│  approve(taskId: TaskId, comment?: String) → Result<void, WflError>                │
│  reject(taskId: TaskId, reason: String) → Result<void, WflError>                   │
│  delegate(taskId: TaskId, delegateTo: UserId) → Result<void, WflError>             │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  WORKFLOW DEFINITION:                                                               │
│                                                                                     │
│  WorkflowDefinition = {                                                             │
│    id         : WorkflowId,                                                         │
│    name       : String,                                                             │
│    version    : Int,               // Monotonic, immutable once published            │
│    states     : List<StateDefinition>,                                              │
│    transitions: List<TransitionRule>,                                               │
│    triggers   : List<TriggerConfig>,  // Auto-start on event                       │
│    sla        : SlaConfig?,           // Overall + per-step deadlines               │
│    metadata   : Map<String, any>,                                                   │
│  }                                                                                  │
│                                                                                     │
│  StateDefinition = {                                                                │
│    name       : String,                                                             │
│    type       : "START"|"TASK"|"APPROVAL"|"PARALLEL"|"WAIT"|"END"|"ERROR",         │
│    assignee?  : AssigneeRule,         // Static, role-based, or dynamic             │
│    timeout?   : Duration,             // SLA for this step                          │
│    onTimeout? : "ESCALATE"|"SKIP"|"FAIL",                                          │
│    action?    : ActionConfig,         // Automated action (webhook, script)         │
│  }                                                                                  │
│                                                                                     │
│  TransitionRule = {                                                                 │
│    from       : String,              // State name                                  │
│    to         : String,              // State name                                  │
│    condition? : Expression,          // Guard condition                              │
│    event?     : String,              // Trigger event                                │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  INSTANCE LIFECYCLE:                                                                │
│                                                                                     │
│  CREATED → RUNNING → COMPLETED | FAILED | CANCELLED | TIMED_OUT                    │
│                  ↘ SUSPENDED → RUNNING (resume)                                     │
│                                                                                     │
│  • Checkpointing: State persisted after each transition (crash recovery)            │
│  • Compensation: On failure/cancel, run compensation steps in reverse order         │
│  • Parallel steps: Fork/join with configurable join condition (all/any/N-of-M)     │
│  • Wait states: Timer-based or event-based resume                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SLA & ESCALATION:                                                                  │
│                                                                                     │
│  SlaConfig = {                                                                      │
│    overallTimeout : Duration,          // Max workflow duration                     │
│    steps          : Map<String, StepSla>,                                          │
│    escalationChain: List<EscalationLevel>,                                         │
│  }                                                                                  │
│                                                                                     │
│  EscalationLevel = {                                                                │
│    afterDuration : Duration,           // Time since step entered                  │
│    action        : "NOTIFY"|"REASSIGN"|"ESCALATE_MANAGER"|"AUTO_APPROVE"|"FAIL",  │
│    target?       : UserId | RoleId,                                                │
│  }                                                                                  │
│                                                                                     │
│  SLA breach: WARN at 80% of timeout → ESCALATE at 100% → per escalation chain     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CONSUMERS (modules that use M-36 for their workflows):                             │
│                                                                                     │
│  • M-25 Incident Management: incident lifecycle (detect → triage → resolve)        │
│  • M-26 Change Management: change request approval flow                            │
│  • M-35 Billing: subscription approval, refund approval                            │
│  • Custom: any product-specific approval/orchestration flow                        │
│                                                                                     │
│  Consumers define WorkflowDefinitions; M-36 executes them.                         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Tenant-scoped (all workflow data isolated per STD-DAT-004)                      │
│  • Crash-safe (checkpoint after every state transition)                             │
│  • Exactly-once step execution (idempotency via instance+step ID)                  │
│  • All state transitions audit-logged (M-09)                                       │
│  • Compensation on failure (reverse completed steps)                               │
│  • No business logic in engine (M-36 is generic; consumers define logic)           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES (PORTS REQUIRED):                                                     │
│  • IRepository (M-32)      — Workflow/instance/task persistence                    │
│  • IAuditPort (M-09)       — State transition audit trail                          │
│  • IMessageBus (M-34)      — Workflow event publication + trigger subscription     │
│  • IConfigProvider (M-29)  — Workflow config, SLA defaults                         │
│  • IErrorFactory (M-30)    — Error creation                                        │
│  • ILogger (M-11)          — Execution logging                                     │
│  • IAuthZPort (M-03)       — Task assignment authorization                         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: INSTANCE_STARTED | INSTANCE_COMPLETED | INSTANCE_FAILED |                 │
│          INSTANCE_CANCELLED | INSTANCE_SUSPENDED | INSTANCE_RESUMED |              │
│          TASK_CREATED | TASK_COMPLETED | TASK_FAILED | TASK_REASSIGNED |            │
│          TASK_ESCALATED | APPROVAL_GRANTED | APPROVAL_REJECTED |                   │
│          SLA_WARNING | SLA_BREACHED | COMPENSATION_STARTED | COMPENSATION_DONE     │
│  ERROR CODES: WFL_001 Workflow not found | WFL_002 Instance not found |            │
│               WFL_003 Task not found | WFL_004 Invalid transition |                │
│               WFL_005 SLA breached | WFL_006 Compensation failed |                 │
│               WFL_007 Parallel join timeout | WFL_008 Definition invalid |         │
│               WFL_009 Task already completed | WFL_010 Assignee not authorized     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
