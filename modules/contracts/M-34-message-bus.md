# M-34 — Message Bus Module Interface Contract

**Status:** EXTRACTED (owner: `eng-lead`)  
**Source:** `[33]-STD-ENG-008 CYBERCUBE-Reusable-Modules-Standard-v1.1.md` §ICD-3.34 (lines 2353–2510)  
**Versioning:** semver per ICD-6 (API Versioning Contract) in STD-ENG-008.  
**Change control:** non-breaking edits may be made without STD-ENG-008 version bump; breaking changes require RFC (STD-ENG-007).

---

#### ICD-3.34 Message Bus Module (M-34) Interfaces

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  INTERFACE: IMessageBusService                                                      │
│  MODULE: M-34 Message Bus                                                           │
│  VERSION: 1.0                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  // Publishing                                                                      │
│  publish(topic: TopicName, message: BusMessage) → Result<MessageId, BusError>      │
│  publishBatch(topic: TopicName, msgs: List<BusMessage>) → Result<BatchResult>      │
│  publishDelayed(topic: TopicName, msg: BusMessage, delay: Duration) → Result<MsgId>│
│                                                                                     │
│  // Subscribing                                                                     │
│  subscribe(topic: TopicName, opts: SubscribeOpts) → Subscription                   │
│  unsubscribe(subscription: Subscription) → void                                    │
│                                                                                     │
│  // Consumer Groups                                                                 │
│  createConsumerGroup(group: ConsumerGroupConfig) → Result<GroupId, BusError>       │
│  joinGroup(groupId: GroupId, handler: MessageHandler) → Membership                 │
│  leaveGroup(membership: Membership) → void                                         │
│                                                                                     │
│  // Dead-Letter Queue Management                                                    │
│  getDlqMessages(topic: TopicName, opts?: DlqQuery) → PagedResult<DlqMessage>      │
│  replayDlqMessage(messageId: MessageId) → Result<void, BusError>                  │
│  purgeDlq(topic: TopicName, before: Timestamp) → Result<Int, BusError>            │
│                                                                                     │
│  // Topic Management                                                                │
│  createTopic(config: TopicConfig) → Result<TopicName, BusError>                    │
│  getTopicMetrics(topic: TopicName) → TopicMetrics                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  MESSAGE STRUCTURE:                                                                 │
│                                                                                     │
│  BusMessage = {                                                                     │
│    id          : MessageId,             // Auto-generated UUID v7                   │
│    type        : String,                // Event type (cybercube.{domain}.{action}) │
│    source      : String,                // Originating module                       │
│    timestamp   : Timestamp,             // ISO 8601 UTC (per STD-OPS-003)          │
│    data        : any,                   // Payload (schema-validated)               │
│    metadata    : {                                                                  │
│      traceId     : String,              // W3C Trace Context                       │
│      requestId   : String,              // Correlation                              │
│      tenantId?   : TenantId,            // Tenant scope (when applicable)          │
│      causationId?: MessageId,           // What caused this message                │
│      correlationId: String,             // Business-level correlation              │
│      schemaVersion: String,             // Payload schema version                   │
│    }                                                                                │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SUBSCRIBE OPTIONS:                                                                 │
│                                                                                     │
│  SubscribeOpts = {                                                                  │
│    handler       : MessageHandler,      // (msg: BusMessage) → Promise<void>       │
│    concurrency?  : Int,                 // Default: 1 (sequential)                 │
│    maxRetries?   : Int,                 // Default: 3 (before DLQ)                 │
│    retryDelay?   : Duration,            // Default: 1s (exponential backoff)       │
│    backpressure? : BackpressureConfig,  // Rate limit consumer                     │
│    filter?       : MessageFilter,       // Server-side message filtering           │
│  }                                                                                  │
│                                                                                     │
│  BackpressureConfig = {                                                             │
│    maxInFlight   : Int,                 // Default: 100                             │
│    pauseAt       : Float,               // Default: 0.8 (80% of maxInFlight)      │
│    resumeAt      : Float,               // Default: 0.5 (50% of maxInFlight)      │
│  }                                                                                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DELIVERY GUARANTEES:                                                               │
│                                                                                     │
│  • At-least-once delivery (DEFAULT — consumers MUST be idempotent)                 │
│  • Ordering: Per-partition (same partition key = ordered)                           │
│  • Partition key: tenantId by default (tenant events stay in order)                │
│  • Exactly-once: NOT guaranteed by transport — use idempotency keys at consumer    │
│  • Acknowledgment: Per-message or batch. Unacked after timeout → redeliver         │
│  • Max message size: 256KB (larger payloads → reference pattern with M-24)         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEAD-LETTER QUEUE (DLQ):                                                           │
│                                                                                     │
│  Messages moved to DLQ after maxRetries exhausted.                                 │
│  DLQ message includes: original message, error details, retry count, timestamps.   │
│  DLQ retention: 14 days (configurable via M-29).                                   │
│  Replay: Individual or batch. Replayed messages re-enter original topic.           │
│  Monitoring: DLQ depth emitted as metric (cybercube_msgbus_dlq_depth).             │
│  Alert: DLQ depth > threshold → HIGH alert (per STD-OPS-003).                     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SCHEMA VALIDATION:                                                                 │
│                                                                                     │
│  • Schema registry integration (JSON Schema / Avro / Protobuf)                     │
│  • Producer-side validation MANDATORY (reject invalid before publish)              │
│  • Consumer-side validation RECOMMENDED (defensive)                                │
│  • Schema evolution: backward-compatible changes only (add fields, not remove)     │
│  • Breaking changes: new topic version (e.g., cybercube.user.created.v2)           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  BROKER ABSTRACTION:                                                                │
│                                                                                     │
│  Supported backends (swap via M-29 config, no code changes):                       │
│  • Google Cloud Pub/Sub (default for GCP)                                          │
│  • Amazon SQS/SNS                                                                  │
│  • RabbitMQ (AMQP 0-9-1)                                                           │
│  • Apache Kafka                                                                     │
│  • In-Memory (test/development only — NOT for production)                          │
│                                                                                     │
│  Adapter interface: IBrokerAdapter (implemented per backend)                        │
│  Connection management: pooled, health-checked, auto-reconnect                     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CORRELATION PROPAGATION (MANDATORY — per STD-OPS-003):                             │
│                                                                                     │
│  All messages automatically include in metadata:                                    │
│  • traceId       : {W3C Trace Context from M-13}                                  │
│  • requestId     : {current request ID}                                            │
│  • tenantId      : {current tenant context}                                        │
│  Consumer handlers restore correlation context before processing.                  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  POISON MESSAGE HANDLING:                                                           │
│                                                                                     │
│  1. Message fails handler → retry with exponential backoff                         │
│  2. After maxRetries → move to DLQ with full error context                         │
│  3. Log at ERROR with message ID, topic, error details                             │
│  4. Emit metric: cybercube_msgbus_poison_total{topic}                              │
│  5. Consumer continues processing next message (never blocks queue)                │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  GUARANTEES:                                                                        │
│  • Broker-agnostic — swap backend via config without code changes                  │
│  • Correlation IDs propagated through all async messages (STD-OPS-003)             │
│  • No PII in message metadata (STD-SEC-002)                                        │
│  • DLQ for every topic (no silent message loss)                                    │
│  • Idempotent consumer support (messageId for deduplication)                       │
│  • Tenant-scoped partitioning by default (STD-DAT-004)                             │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  DEPENDENCIES (PORTS REQUIRED):                                                     │
│  • ILogger              — Message lifecycle logging (M-11)                          │
│  • ITracer              — Span context propagation (M-13)                           │
│  • IConfigProvider      — Broker connection, topic config, retry params (M-29)      │
│  • IErrorFactory        — Error creation (M-30)                                     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  EVENTS: MESSAGE_PUBLISHED | MESSAGE_CONSUMED | MESSAGE_DLQ | CONSUMER_LAG_HIGH    │
│          | BROKER_CONNECTED | BROKER_DISCONNECTED | CONSUMER_GROUP_REBALANCED       │
│  ERROR CODES: MBU_001 Broker connection failed | MBU_002 Publish timeout |         │
│               MBU_003 Schema validation failed | MBU_004 Consumer handler error |   │
│               MBU_005 DLQ write failed | MBU_006 Topic not found |                 │
│               MBU_007 Consumer group conflict | MBU_008 Message too large           │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---
