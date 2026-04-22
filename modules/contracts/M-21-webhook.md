# M-21 — Webhook Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.21 (lines 1554–1591)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.21 Webhook Module (M-21) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IWebhookService                                                         │
│  MODULE: M-21 Webhook                                                               │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Registration                                                                    │
│  registerWebhook(config: WebhookConfig) → Result<WebhookId, Error>                 │
│  updateWebhook(webhookId: WebhookId, config: WebhookConfig) → Result<void, Error>  │
│  deleteWebhook(webhookId: WebhookId) → Result<void, Error>                         │
│  listWebhooks(tenantId: TenantId) → Result<List<Webhook>, Error>                   │
│                                                                                     │
│  // Dispatch                                                                        │
│  dispatch(webhookId: WebhookId, event: WebhookEvent) → Result<DeliveryId, Error>   │
│  dispatchToAll(eventType: String, payload: Object) → Result<List<DeliveryId>>      │
│                                                                                     │
│  // Delivery Tracking                                                               │
│  getDeliveryStatus(deliveryId: DeliveryId) → Result<DeliveryStatus, Error>         │
│  getDeliveryHistory(webhookId: WebhookId, page: Page) → Result<PagedResult<...>>   │
│  retryDelivery(deliveryId: DeliveryId) → Result<DeliveryId, Error>                 │
│                                                                                     │
│  // Verification                                                                    │
│  generateSignature(payload: Bytes, secret: Bytes) → String                         │
│  verifySignature(payload: Bytes, signature: String, secret: Bytes) → Boolean       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  RETRY POLICY: Exponential backoff (1s, 2s, 4s, 8s, 16s) up to 5 attempts          │
│  SIGNATURE: HMAC-SHA256 in X-Webhook-Signature header                               │
│  EVENTS: WEBHOOK_DELIVERED | WEBHOOK_FAILED | WEBHOOK_RETRYING                      │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
