# M-23 — Email Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.23 (lines 1631–1668)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.23 Email Module (M-23) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IEmailService                                                           │
│  MODULE: M-23 Email                                                                 │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Sending                                                                         │
│  send(email: Email) → Result<EmailId, SendError>                                   │
│  sendTemplate(templateId: TemplateId, to: Email, data: Object) → Result<EmailId>   │
│  sendBatch(emails: List<Email>) → Result<List<EmailId>, Error>                     │
│                                                                                     │
│  // Templates                                                                       │
│  createTemplate(template: EmailTemplate) → Result<TemplateId, Error>               │
│  renderTemplate(templateId: TemplateId, data: Object) → Result<RenderedEmail>      │
│                                                                                     │
│  // Tracking                                                                        │
│  getDeliveryStatus(emailId: EmailId) → Result<DeliveryStatus, Error>               │
│  getOpenStatus(emailId: EmailId) → Result<OpenStatus, Error>                       │
│  getClickStatus(emailId: EmailId) → Result<List<ClickEvent>, Error>                │
│                                                                                     │
│  // Bounce Handling                                                                 │
│  handleBounce(bounceEvent: BounceEvent) → Result<void, Error>                      │
│  isEmailValid(email: Email) → Boolean         // Check against bounce list         │
│  getSuppressionList() → List<SuppressedEmail>                                      │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  PROVIDERS: SendGrid | AWS SES | Mailgun | Postmark                                │
│  EVENTS: EMAIL_SENT | EMAIL_DELIVERED | EMAIL_OPENED | EMAIL_BOUNCED |             │
│          EMAIL_COMPLAINED                                                           │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
