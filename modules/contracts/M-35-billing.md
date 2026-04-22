# M-35 — Billing Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.35 (lines 2511–2628)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.35 Billing Module (M-35) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IBillingService                                                         │
│  MODULE: M-35 Billing                                                               │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Payment Methods                                                                 │
│  addPaymentMethod(tenantId: TenantId, method: PaymentMethodInput)                  │
│    → Result<PaymentMethod, BillingError>                                            │
│  removePaymentMethod(methodId: PaymentMethodId) → Result<void, BillingError>       │
│  getPaymentMethods(tenantId: TenantId) → Result<List<PaymentMethod>>               │
│  setDefaultPaymentMethod(methodId: PaymentMethodId) → Result<void, BillingError>   │
│                                                                                     │
│  // Subscriptions                                                                   │
│  createSubscription(tenantId: TenantId, plan: PlanId, opts?: SubscriptionOpts)     │
│    → Result<Subscription, BillingError>                                             │
│  cancelSubscription(subId: SubscriptionId, opts?: CancelOpts)                      │
│    → Result<Subscription, BillingError>                                             │
│  changeSubscription(subId: SubscriptionId, newPlan: PlanId, opts?: ChangeOpts)     │
│    → Result<Subscription, BillingError>        // Handles proration automatically  │
│  getSubscription(subId: SubscriptionId) → Result<Subscription, BillingError>       │
│  listSubscriptions(tenantId: TenantId) → Result<List<Subscription>>                │
│                                                                                     │
│  // Plans                                                                           │
│  createPlan(plan: PlanInput) → Result<Plan, BillingError>                          │
│  listPlans(filter?: PlanFilter) → Result<List<Plan>>                               │
│  getPlan(planId: PlanId) → Result<Plan, BillingError>                              │
│                                                                                     │
│  // Invoicing                                                                       │
│  generateInvoice(subId: SubscriptionId) → Result<Invoice, BillingError>            │
│  getInvoice(invoiceId: InvoiceId) → Result<Invoice, BillingError>                  │
│  listInvoices(tenantId: TenantId, filter?: InvoiceFilter) → PagedResult<Invoice>   │
│  retryPayment(invoiceId: InvoiceId) → Result<PaymentResult, BillingError>          │
│                                                                                     │
│  // Usage Metering                                                                  │
│  recordUsage(tenantId: TenantId, meter: MeterId, quantity: Decimal, ts?: Timestamp)│
│    → Result<UsageRecord, BillingError>                                              │
│  getUsageSummary(tenantId: TenantId, meter: MeterId, period: DateRange)            │
│    → Result<UsageSummary, BillingError>                                             │
│                                                                                     │
│  // Refunds                                                                         │
│  createRefund(invoiceId: InvoiceId, amount?: Decimal, reason: String)              │
│    → Result<Refund, BillingError>                                                   │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SUBSCRIPTION LIFECYCLE:                                                            │
│                                                                                     │
│  TRIAL → ACTIVE → PAST_DUE → CANCELLED | EXPIRED                                  │
│                 ↘ PAUSED → ACTIVE (resume)                                          │
│                                                                                     │
│  • Trial: configurable duration, auto-convert to active, no payment required        │
│  • Active: recurring billing per plan interval                                      │
│  • Past Due: payment failed → dunning sequence (configurable retries)               │
│  • Paused: voluntary hold, no billing, resume to active                             │
│  • Cancelled: immediate or end-of-period, prorated refund if configured             │
│  • Expired: trial ended without conversion                                          │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  PAYMENT GATEWAY ABSTRACTION:                                                       │
│                                                                                     │
│  Supported backends (swap via M-29 config):                                         │
│  • Stripe (default)                                                                 │
│  • Braintree                                                                        │
│  • Adyen                                                                            │
│                                                                                     │
│  Adapter interface: IPaymentGateway (implemented per backend)                       │
│  M-35 NEVER stores raw card numbers — tokenization via gateway (PCI DSS)           │
│  Payment tokens encrypted at rest via M-16 Crypto                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DUNNING (automated payment recovery):                                              │
│                                                                                     │
│  1. Payment fails → PAST_DUE + event emitted                                       │
│  2. Retry schedule (configurable): Day 1, Day 3, Day 7, Day 14                     │
│  3. Each retry: attempt charge + notify customer (via M-22 Notification)            │
│  4. All retries exhausted → cancel subscription + final notification                │
│  5. Grace period: configurable days before feature restriction                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Tenant-scoped (all billing data isolated per STD-DAT-004)                       │
│  • PCI DSS compliant (no raw card storage, tokenization only)                      │
│  • All financial events audit-logged (M-09)                                        │
│  • Idempotent payment operations (safe to retry)                                   │
│  • Currency handling via Decimal type (M-31 math precision, no floating point)     │
│  • All amounts in smallest currency unit (cents/pence)                             │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES (PORTS REQUIRED):                                                     │
│  • IRepository (M-32)       — Subscription/invoice/payment persistence             │
│  • ICryptoPort (M-16)       — Payment token encryption                              │
│  • IAuditPort (M-09)        — Financial event audit trail                           │
│  • IMessageBus (M-34)       — Billing event publication                             │
│  • INotificationPort (M-22) — Dunning & receipt notifications                      │
│  • IHttpClient (M-33)       — Payment gateway API calls                            │
│  • IConfigProvider (M-29)   — Gateway config, dunning schedule                      │
│  • IErrorFactory (M-30)     — Error creation                                        │
│  • IMathService (M-31)      — Currency arithmetic                                   │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: SUBSCRIPTION_CREATED | SUBSCRIPTION_ACTIVATED | SUBSCRIPTION_CANCELLED |   │
│          SUBSCRIPTION_EXPIRED | SUBSCRIPTION_PAUSED | SUBSCRIPTION_RESUMED |        │
│          PAYMENT_SUCCEEDED | PAYMENT_FAILED | INVOICE_GENERATED | INVOICE_PAID |   │
│          REFUND_ISSUED | USAGE_RECORDED | DUNNING_STARTED | DUNNING_EXHAUSTED      │
│  ERROR CODES: BIL_001 Payment declined | BIL_002 Invalid payment method |          │
│               BIL_003 Plan not found | BIL_004 Subscription not found |            │
│               BIL_005 Invoice not found | BIL_006 Proration calc failed |          │
│               BIL_007 Gateway unavailable | BIL_008 Usage meter not found |        │
│               BIL_009 Refund exceeds amount | BIL_010 Duplicate payment            │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
