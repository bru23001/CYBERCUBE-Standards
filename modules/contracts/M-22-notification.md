# M-22 — Notification Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.22 (lines 1594–1630)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.22 Notification Module (M-22) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: INotificationService                                                    │
│  MODULE: M-22 Notification                                                          │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Send                                                                            │
│  send(notification: Notification) → Result<NotificationId, Error>                  │
│  sendBatch(notifications: List<Notification>) → Result<List<NotificationId>>       │
│  sendToUser(userId: UserId, notification: Notification) → Result<NotificationId>   │
│                                                                                     │
│  // Templates                                                                       │
│  renderTemplate(templateId: TemplateId, data: Object) → Result<RenderedContent>    │
│  createTemplate(template: NotificationTemplate) → Result<TemplateId, Error>        │
│  updateTemplate(templateId: TemplateId, template: NotificationTemplate) → Result<> │
│                                                                                     │
│  // Preferences                                                                     │
│  getPreferences(userId: UserId) → Result<NotificationPreferences, Error>           │
│  updatePreferences(userId: UserId, prefs: NotificationPreferences) → Result<void>  │
│  isChannelEnabled(userId: UserId, channel: Channel) → Boolean                      │
│                                                                                     │
│  // Status                                                                          │
│  getStatus(notificationId: NotificationId) → Result<NotificationStatus, Error>     │
│  markAsRead(notificationId: NotificationId) → Result<void, Error>                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CHANNELS: EMAIL | SMS | PUSH | IN_APP | SLACK                                      │
│  PRIORITY: CRITICAL (immediate) | HIGH | NORMAL | LOW (batched)                     │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
