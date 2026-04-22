# CYBERCUBE Technology Stack Standard

| Metadata | Value |
|----------|-------|
| **Standard ID** | STD-ENG-009 |
| **Catalog Number** | 5.10 |
| **Name** | CYBERCUBE Technology Stack Standard |
| **Version** | 2.1 |
| **Status** | Active |
| **Owner** | Engineering Lead |
| **Effective** | 2026-04-15 |
| **Last Updated** | 2026-04-16 |
| **Classification** | INTERNAL |
| **Compliance Level** | Mandatory |
| **Next Review** | 2026-07-15 |

## Applicability Tier Table

| Applicability | Tier | Summary of Clauses in This Standard | Waiver Path |
| ------------- | ---- | ----------------------------------- | ----------- |
| All new CYBERCUBE projects | **T1 MUST** | (1) Every new project MUST declare its technology stack in its README against the radar (ADOPT / TRIAL / ASSESS / HOLD). (2) Technologies on HOLD MUST NOT be used for new projects without an approved ADR per POL-GOV-002. (3) Runtime language + framework versions MUST be within the supported-version window stated in this standard; known-EOL versions MUST NOT ship to production. (4) Any deviation from the ADOPT stack MUST be captured in an ADR (POL-GOV-002 T1) that lists risks, alternatives, and rollback. (5) Package provenance: third-party dependencies MUST be resolved from the trusted registry list; direct installs from untrusted sources are prohibited. | None (non-waivable) |
| SaaS / customer-facing | **T2 SHOULD** | Radar refresh on quarterly cadence, Technology Radar published internally, compatibility matrix maintained (service × language version), SBOM generation at build, runtime version pinning in lockfiles, license-policy enforcement in CI, TRIAL-to-ADOPT progression criteria documented. | Lightweight waiver per POL-GOV-001 §8.3 |
| Regulated / high-risk | **T3 MAY** | Formal architecture review for each new stack entry, vendor-risk assessment on each adopted technology (per POL-VEN-001 T3), supply-chain attestation (SLSA level or equivalent), reproducible builds, FIPS-validated crypto libraries, golden-image / blessed-runtime requirement. | Formal waiver per STD-GOV-003 |

> Per POL-GOV-001 §8.8.

> **v2.2 (2026-04-22) — Tier Table addition** (staying at v2 major; micro-bump).
| **Audience** | Engineering Team, Technical Leadership, New Hires |

> **Supersedes:** STD-ENG-009 v1 (2026-01-13). All references to the previous version should be updated.

**Related Documents:**
- [Architecture Governance Policy](./POL-GOV-002%20CYBERCUBE-Architecture-Governance-Policy-v1.md) — Technology Radar governance, ADR process
- [Authentication & Identity Standard](./STD-SEC-003%20CYBERCUBE-Authentication-Identity-Standard-v1.md) — Session model, token lifecycle
- [Cryptography & Key Management Standard](./STD-SEC-005%20CYBERCUBE-Cryptography-Key-Management-Standard-v1.md) — Hashing, encryption requirements
- [Secure Coding Standard](./STD-SEC-002%20CYBERCUBE-Secure-Coding-Standard-v1.md) — Input validation, security headers
- [Reusable Modules Standard](./STD-ENG-008%20CYBERCUBE-Reusable-Modules-Standard-v1.1.md) — Module registry

---

## Table of Contents

1. [Overview](#overview)
2. [Service Offerings Summary](#service-offerings-summary)
3. [Core Technology Stack](#core-technology-stack)
4. [Service-Specific Technologies](#service-specific-technologies)
   - [Web Applications & Websites](#1-web-applications--websites)
   - [Mobile Apps](#2-mobile-apps)
   - [AI Integration](#3-ai-integration)
   - [Data & Analytics](#4-data--analytics)
   - [MVP Development](#5-mvp-development)
   - [Custom Software](#6-custom-software--enterprise-systems)
5. [Infrastructure & DevOps](#infrastructure--devops)
6. [Development Tools & Quality](#development-tools--quality)
7. [Security Standards](#security-standards)
8. [Technology Selection Guidelines](#technology-selection-guidelines)
9. [Technology Radar](#technology-radar)
10. [Priority Technology Matrix](#priority-technology-matrix)
11. [Version Requirements](#version-requirements)
12. [Governance & Compliance](#governance--compliance)
13. [Learning Resources](#learning-resources)

---

## Overview

This document defines the official technology stack for CYBERCUBE Software. It serves as the authoritative reference for technology decisions across all client projects and internal systems.

### Guiding Principles

1. **Consistency** — Use standardized tools across projects to maximize code reuse and team efficiency
2. **Scalability** — Select technologies that grow from MVP to enterprise scale
3. **Modern Practices** — Embrace TypeScript, containerization, CI/CD, and infrastructure-as-code
4. **Cost Efficiency** — Prefer open-source solutions and optimize cloud spending
5. **Talent Availability** — Choose popular technologies with strong community support
6. **Security First** — Prioritize technologies with strong security track records

---

## Service Offerings Summary

CYBERCUBE provides six core service offerings:

| Service | Description | Typical Timeline |
|---------|-------------|------------------|
| **Web Applications & Websites** | Custom web apps, marketing sites, eCommerce, portals, APIs | 4-16 weeks |
| **Mobile Apps** | iOS, Android, cross-platform, wearables | 8-20 weeks |
| **AI Integration** | ML models, chatbots, NLP, predictive analytics | 4-12 weeks |
| **Data & Analytics** | Dashboards, ETL pipelines, BI platforms | 3-10 weeks |
| **MVP Development** | Rapid prototyping, product validation | 4-8 weeks |
| **Custom Software** | Enterprise systems, workflow automation | 8-24 weeks |

---

## Core Technology Stack

These technologies form the foundation used across all CYBERCUBE projects.

### Languages

| Language | Use Case | Version |
|----------|----------|---------|
| **TypeScript** | Primary language for web frontend and backend | 5.9+ |
| **JavaScript** | Legacy support, rapid prototyping | ES2022+ |
| **Python** | AI/ML, data processing, automation | 3.12+ |
| **Swift** | Native iOS development | 6.2+ |
| **Kotlin** | Native Android development | 2.1+ |
| **Dart** | Cross-platform mobile (Flutter) | 3.x |
| **SQL** | Database queries | PostgreSQL 17+ / MySQL 8.0+ |

### Primary Frameworks

| Category | Technology | Alternative |
|----------|------------|-------------|
| Web Frontend | **React 19+ / Next.js 16+** | Vue 3 / Nuxt 3 |
| Web Backend | **Node.js 22 LTS / Express 5.x** | Bun / Hono, Python / FastAPI (Node.js 24 target after Oct 2026 LTS) |
| Mobile Cross-Platform | **Flutter 3.38+** | React Native 0.82+ |
| AI/ML | **Python + LangChain / LangGraph** | — |

### Databases

| Type | Primary | Alternative |
|------|---------|-------------|
| Relational | **PostgreSQL 17+** | MySQL 8.0+ |
| Document | MongoDB 7+ | — |
| Caching | **Redis 8+** | Memcached |
| Search | Elasticsearch 8+ | Algolia |
| Vector (AI) | Pinecone | pgvector, Chroma |

### Cloud Platform

**Primary:** Google Cloud Platform (GCP)
- Cloud Run (containerized services)
- Cloud SQL (managed PostgreSQL/MySQL)
- Cloud Storage (GCS)
- BigQuery (data warehouse)
- Secret Manager
- Cloud CDN

**Alternative:** AWS or Azure for client requirements

---

## Service-Specific Technologies

### 1. Web Applications & Websites

Build custom web applications, marketing websites, eCommerce platforms, business portals, and backend APIs.

#### Frontend Technologies

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Framework** | React 19+, Next.js 16+ | SSR/SSG for performance; Turbopack default |
| **Alternative** | Vue 3, Nuxt 3 | Client preference |
| **Language** | TypeScript 5.9+ | Strict mode enabled |
| **Styling** | Tailwind CSS 4.x, SCSS | CSS-first config, 5x faster builds |
| **UI Components** | shadcn/ui 3.x, Radix UI | Accessible components |
| **State Management** | Zustand, TanStack Query | Minimal Redux |
| **Forms** | React Hook Form, Zod | Schema validation |
| **Animation** | Framer Motion, GSAP | Performance-optimized |
| **Accessibility** | axe-core, Lighthouse CI, eslint-plugin-jsx-a11y | WCAG 2.2 AA compliance required for all web deliverables |
| **Internationalization** | next-intl (Next.js), react-i18next, FormatJS | Required when project serves multiple locales; ICU MessageFormat for plurals/gender |

#### Backend Technologies

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Runtime** | Node.js 22 LTS | Active LTS; Node.js 24 target after Oct 2026 LTS promotion |
| **Alt Runtime** | Bun | Performance-critical services; Node.js API compatible |
| **Framework** | Express 5.x | REST APIs; Express 5 default on npm since Mar 2025 |
| **Alt Framework** | Fastify 5.x | Use when p95 latency < 50 ms is a hard requirement |
| **Alt Framework** | Hono | Lightweight, edge-first, Web Standards API |
| **Language** | TypeScript 5.9+ | Full type safety |
| **API Design** | REST, GraphQL (Yoga preferred, Apollo for existing), tRPC | OpenAPI documentation; tRPC for TS-only stacks |
| **Authentication** | Access tokens (JWT ES256 via `jose`), refresh tokens (opaque, server-stored), OAuth 2.0 + PKCE | Per STD-SEC-003 session model; no localStorage token storage |
| **Auth Libraries** | `jose` (JWT), `@oslojs/crypto` (hashing/TOTP), Passport.js (legacy) | `jose` + `@oslojs` preferred for new projects; Passport.js for legacy migration only |
| **Validation** | Zod, Joi | Request validation |
| **ORM/Query** | Prisma, Drizzle | Type-safe queries; Prisma default for new projects |
| **Migrations** | Prisma Migrate (default), Drizzle Kit, Alembic (Python), Flyway (JVM) | Every project MUST use managed migrations; raw DDL forbidden in production |
| **Email** | Resend (preferred), SendGrid | Transactional email; Resend for new projects; SendGrid for high-volume or legacy |
| **Background Jobs** | BullMQ (Redis-backed), Cloud Tasks | BullMQ for Node.js job queues; Cloud Tasks for serverless/lightweight |
| **Scheduled Jobs** | Cloud Scheduler (preferred), node-cron | Cloud Scheduler for production; node-cron for local dev only |
| **Connection Pooling** | Cloud SQL Auth Proxy, PgBouncer | Required for Cloud Run / serverless; Prisma Data Proxy as alternative |
| **File Storage** | GCS + signed URLs, Sharp (image processing) | Cloudinary or Imgproxy for CDN-backed image transformation |
| **API Codegen** | openapi-typescript, orval | Generate typed clients from OpenAPI specs; required for cross-service contracts |
| **Logging** | pino (preferred), winston | Structured JSON logging; pino for performance; pairs with OpenTelemetry via pino-opentelemetry-transport |
| **Env Management** | `@t3-oss/env-nextjs` (Next.js), `envalid` (Node.js), `dotenv` | Typed env validation required; `dotenv` for local dev only; production secrets via Secret Manager |
| **Date/Time** | date-fns (preferred), dayjs | date-fns for tree-shaking and immutability; dayjs for drop-in Moment replacement; avoid Moment.js (HOLD) |
| **Rich Text Editor** | TipTap (preferred), Lexical | TipTap (ProseMirror-based) for content-rich apps; Lexical for Meta-ecosystem projects |
| **Webhook Delivery** | Svix, or custom via BullMQ + HMAC signing | Reliable outbound webhooks with retry, idempotency, and payload signing per STD-ENG-003 |

#### eCommerce Technologies

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Payments** | Stripe, PayPal, Square | PCI compliant |
| **Subscriptions** | Stripe Billing | Recurring payments |
| **Platforms** | Shopify API, WooCommerce | Integrations |
| **Inventory** | Custom, Shopify | Real-time sync |

#### CMS Options

| Type | Technologies | Use Case |
|------|-------------|----------|
| **Headless** | Sanity, Strapi, Contentful | Modern JAMstack |
| **Traditional** | WordPress (headless) | Blog-heavy sites; **HOLD** — use for legacy only; migrate to Sanity/Strapi |
| **Simple** | Notion API, Airtable | MVP/internal |

#### API Development

| Category | Technologies | Notes |
|----------|-------------|-------|
| **REST** | Express + OpenAPI/Swagger | Auto-documentation |
| **Type-Safe API** | tRPC | End-to-end type safety for TypeScript-only stacks |
| **GraphQL** | Yoga (new projects), Apollo Server (existing) | Yoga preferred — lighter runtime; Apollo for legacy |
| **Real-time** | Socket.IO, WebSockets | Live updates |
| **Rate Limiting** | express-rate-limit, @upstash/ratelimit (serverless) | DDoS protection; sliding-window or token-bucket per STD-SEC-003 |
| **Health Checks** | `GET /healthz` (liveness), `GET /readyz` (readiness) | Required for all deployable services; response must include dependency status |
| **Graceful Shutdown** | Built-in `server.close()` + SIGTERM handler | Drain in-flight requests before exit; mandatory for Cloud Run / K8s |

---

### 2. Mobile Apps

Build native iOS/Android apps, cross-platform solutions, and wearable applications.

#### Cross-Platform Development (Recommended)

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Primary** | **Flutter 3.38+ (Dart)** | Best performance/UX |
| **Alternative** | React Native 0.82+ | New Architecture mandatory; JavaScript ecosystem |
| **State** | Riverpod (Flutter), Redux/Zustand (RN) | — |
| **Navigation** | go_router (Flutter), React Navigation | — |
| **HTTP** | Dio (Flutter), Axios (RN) | — |
| **Storage** | Hive, SharedPreferences | Local persistence |

#### Native iOS Development

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Language** | Swift 6.2+ | Strict concurrency, performance improvements |
| **UI** | SwiftUI, UIKit | SwiftUI for new projects |
| **IDE** | Xcode 17+ | Latest toolchain; matches Swift 6.2 |
| **Architecture** | MVVM, Clean Architecture | Testable code |
| **Networking** | URLSession, Alamofire | — |
| **Persistence** | Core Data, SwiftData, Realm | — |
| **Keychain** | KeychainAccess | Secure storage |

#### Native Android Development

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Language** | Kotlin 2.1+ | K2 compiler stable; modern Kotlin |
| **UI** | Jetpack Compose | Declarative UI |
| **IDE** | Android Studio Ladybug+ | Latest stable IDE |
| **Architecture** | MVVM + Clean Architecture | — |
| **Networking** | Retrofit, Ktor | — |
| **Persistence** | Room, DataStore | — |
| **DI** | Hilt/Dagger | Dependency injection |

#### Wearables

| Platform | Technologies | Notes |
|----------|-------------|-------|
| **Apple Watch** | WatchKit, SwiftUI | watchOS 10+ |
| **Wear OS** | Compose for Wear OS | Android watches |
| **Widgets** | WidgetKit (iOS), Glance (Android) | Home screen |

#### Progressive Web Apps (PWA)

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Service Workers** | Workbox | Caching strategies, offline support |
| **Manifest** | Web App Manifest | Installability, splash screen, icons |
| **Push** | Web Push API + FCM | Browser push notifications |
| **Scope** | Use for content-heavy apps where native install is not required | Aligns with MA-PW artifact code |

#### Desktop Applications

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Primary** | Tauri 2.x (Rust + web frontend) | Small binary, strong security sandbox; preferred for new projects |
| **Alternative** | Electron | Larger binary; use when extensive Node.js API access is required |
| **Cross-Platform** | Flutter Desktop | When mobile + desktop from single codebase is a requirement |
| **Scope** | Aligns with DA-MC/WN/LX/XP artifact codes | ADR required for framework selection |

#### Mobile Backend Services

| Category | Technologies | Notes |
|----------|-------------|-------|
| **BaaS** | Firebase, Supabase | Rapid development |
| **Push Notifications** | FCM, APNs | Cross-platform |
| **Analytics** | Firebase Analytics, Mixpanel | User behavior |
| **Crash Reporting** | Firebase Crashlytics, Sentry | Error tracking |
| **Remote Config** | Firebase Remote Config | Feature flags |

#### App Store & CI/CD

| Category | Technologies | Notes |
|----------|-------------|-------|
| **iOS** | App Store Connect, TestFlight | Distribution |
| **Android** | Google Play Console | Distribution |
| **CI/CD** | Fastlane, GitHub Actions | Automation |
| **Code Signing** | Match (iOS), Gradle (Android) | Secure signing |

---

### 3. AI Integration

Build AI-powered applications, chatbots, predictive analytics, and NLP solutions.

#### Large Language Models (LLMs)

> **Note:** Model versions below reflect the latest available or announced releases as of April 2026. Verify current versions before implementation — providers ship new models frequently.

| Provider | Models | Use Case |
|----------|--------|----------|
| **OpenAI** | GPT-series (latest stable) | Primary LLM provider |
| **Anthropic** | Claude-series (Opus/Sonnet/Haiku) | Complex reasoning; strong coding benchmarks |
| **Google** | Gemini-series (Pro/Flash) | Multimodal; large context; video processing |
| **Open Source** | Llama, Mistral, DeepSeek (latest stable) | Self-hosted options |
| **xAI** | Grok (latest stable) | Multi-step reasoning; **ASSESS** — evaluate before production use |

#### AI Development Frameworks

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Orchestration** | LangChain, LangGraph, CrewAI | Agent workflows; LangGraph for stateful agents |
| **RAG** | LlamaIndex, LangChain | Retrieval-augmented generation |
| **Embeddings** | OpenAI text-embedding-3, Cohere | Text embeddings |
| **Vector DBs** | Pinecone, Weaviate, Chroma | Similarity search |
| **Local Vector** | pgvector (PostgreSQL) | Integrated search |
| **AI Coding** | Cursor, GitHub Copilot, Codeium | Developer productivity |

#### Machine Learning

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Frameworks** | TensorFlow 2.x, PyTorch 2.x | Model training |
| **Classical ML** | scikit-learn, XGBoost | Tabular data |
| **AutoML** | Vertex AI AutoML | Automated training |
| **Model Serving** | TensorFlow Serving, ONNX | Production inference |

#### Natural Language Processing (NLP)

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Libraries** | spaCy, NLTK | Text processing |
| **Transformers** | Hugging Face Transformers | Pre-trained models |
| **Sentiment** | LLM-based (GPT/Claude), spaCy | LLM preferred for accuracy; VADER/TextBlob deprecated |
| **Entity Extraction** | spaCy NER, Cloud NL API | Named entities |

#### Chatbots & Conversational AI

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Platforms** | Vertex AI Agent Builder, Dialogflow CX, Rasa | Enterprise chatbots |
| **Custom** | LangGraph + OpenAI/Claude | Stateful agent workflows |
| **Voice** | Whisper (STT), ElevenLabs (TTS) | Voice interfaces |

#### Computer Vision

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Libraries** | OpenCV, Pillow | Image processing |
| **Detection** | YOLO, Detectron2 | Object detection |
| **Cloud APIs** | Google Vision, AWS Rekognition | Managed services |

#### MLOps & Model Management

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Experiment Tracking** | MLflow, Weights & Biases | Model versioning |
| **Feature Store** | Feast, Vertex AI | Feature management |
| **Model Registry** | MLflow, Vertex AI | Deployment |
| **Monitoring** | Evidently, WhyLabs | Model drift |

#### AI Development Environment

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Language** | Python 3.12+ | Primary AI language |
| **Notebooks** | Jupyter, Google Colab | Experimentation |
| **Package Manager** | uv (preferred), Poetry, pip | uv default for new projects (10-100x faster); Poetry for complex dependency resolution; pip as fallback |
| **GPU** | NVIDIA CUDA, Cloud GPUs | Training acceleration |

---

### 4. Data & Analytics

Build dashboards, ETL pipelines, data warehouses, and business intelligence solutions.

#### Data Visualization

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Web Charts** | D3.js, Chart.js, Apache ECharts | Interactive charts |
| **React** | Recharts, Nivo, Victory | React integration |
| **Mapping** | Mapbox, Leaflet, Google Maps | Geospatial |
| **Dashboards** | Custom React + D3 | Tailored solutions |

#### Business Intelligence Platforms

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Enterprise** | Tableau, Power BI | Client preference |
| **Open Source** | Metabase, Apache Superset | Self-hosted |
| **Google** | Looker Studio | GCP integration |
| **Embedded** | Cube.js | Custom BI |

#### Data Warehouses

| Category | Technologies | Notes |
|----------|-------------|-------|
| **GCP** | BigQuery | Primary choice |
| **Multi-cloud** | Snowflake | Cross-platform |
| **AWS** | Redshift | AWS projects |
| **Open Source** | ClickHouse | High performance |

#### ETL/ELT Pipelines

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Orchestration** | Apache Airflow, Prefect | Workflow scheduling |
| **Transformation** | dbt (data build tool) | SQL transformations |
| **Ingestion** | Fivetran, Airbyte | SaaS connectors |
| **Custom** | Python, Node.js scripts | Flexible pipelines |
| **Streaming** | Apache Kafka, Google Pub/Sub | Real-time |

#### Data Processing

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Batch** | Apache Spark, Pandas | Large datasets |
| **Streaming** | Apache Kafka, Flink | Real-time processing |
| **Query Engine** | Trino, Presto | Federated queries |

#### Reporting & Export

| Category | Technologies | Notes |
|----------|-------------|-------|
| **PDF Generation** | Puppeteer, pdf-lib | Automated reports |
| **Excel** | ExcelJS, SheetJS | Spreadsheet export |
| **Email** | Resend, SendGrid | Scheduled delivery |
| **Scheduling** | Cloud Scheduler, cron | Automated runs |

---

### 5. MVP Development

Rapid prototyping and product validation with lean technology choices.

#### Rapid Development Stack

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Frontend** | Next.js 16+, Vite + React | Fast setup |
| **UI Kit** | shadcn/ui, Tailwind CSS | Pre-built components |
| **Backend** | Supabase, Firebase | BaaS for speed |
| **Database** | Supabase (PostgreSQL), Neon | Managed DB; serverless PostgreSQL |
| **Auth** | Supabase Auth, Clerk, NextAuth | Zero-config auth |

#### Backend-as-a-Service (BaaS)

| Platform | Features | Best For |
|----------|----------|----------|
| **Supabase** | PostgreSQL, Auth, Storage, Realtime | Full-stack MVPs |
| **Firebase** | NoSQL, Auth, Hosting, Functions | Mobile-first MVPs |
| **PocketBase** | Single binary, SQLite | Simple MVPs |
| **Appwrite** | Self-hosted, Docker | Privacy-focused |

#### Low-Code Augmentation

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Admin Panels** | Retool, Appsmith | Internal tools |
| **Databases** | Airtable, Notion | Simple data |
| **Automation** | Zapier, Make, n8n | Integrations |
| **Forms** | Typeform, Tally | User input |

#### Prototyping & Design

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Design** | Figma | UI/UX design |
| **Interactive** | Framer, Webflow | Clickable prototypes |
| **Components** | Storybook | Component library |

#### Analytics & Feedback

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Product Analytics** | Mixpanel, PostHog, Amplitude | User behavior |
| **Web Analytics** | Google Analytics 4, Plausible | Traffic |
| **Session Recording** | Hotjar, FullStory, PostHog | UX insights |
| **User Feedback** | Canny, Intercom | Feature requests |
| **A/B Testing** | LaunchDarkly, GrowthBook, PostHog | Experiments |

#### MVP Launch Checklist

- [ ] Authentication (Supabase Auth / Clerk)
- [ ] Database with migrations
- [ ] Basic CRUD operations
- [ ] Error tracking (Sentry)
- [ ] Analytics (Mixpanel/PostHog)
- [ ] Feedback collection
- [ ] Landing page with waitlist
- [ ] Email notifications (Resend)

---

### 6. Custom Software / Enterprise Systems

Build enterprise-grade platforms, workflow automation, and complex integrations.

#### Enterprise Backend

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Node.js** | Express 5.x (default), Fastify 5.x, Hono, NestJS | Express default; Fastify/Hono for perf-critical; NestJS for enterprise DI patterns |
| **Python** | FastAPI + Pydantic, Django | Data-heavy apps; Pydantic mandatory for FastAPI validation/serialization |
| **Go** | Gin, Echo | High performance |
| **Java** | Spring Boot | Enterprise clients |
| **.NET** | ASP.NET Core | Microsoft stack |

#### Enterprise Databases

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Primary** | PostgreSQL 17+, MySQL 8.0+ | ACID compliance |
| **Document** | MongoDB 7+ | Flexible schema |
| **Time Series** | TimescaleDB, InfluxDB | Metrics/logs |
| **Graph** | Neo4j | Relationship data |

#### Message Queues & Event Streaming

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Queues** | RabbitMQ, Bull (Redis) | Task processing |
| **Streaming** | Apache Kafka, Google Pub/Sub | Event-driven |
| **Serverless** | Cloud Tasks, Cloud Functions | Lightweight |

#### Microservices Architecture

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Containers** | Docker, Docker Compose | Containerization |
| **Orchestration** | Kubernetes (GKE), Cloud Run | Scaling |
| **Service Mesh** | Istio, Linkerd | Traffic management |
| **Communication** | gRPC, REST, GraphQL | Inter-service |
| **API Gateway** | Kong, Cloud Endpoints | Routing |

#### Workflow Engines

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Orchestration** | Temporal, Apache Airflow | Complex workflows |
| **Automation** | n8n, Node-RED | Visual workflows |
| **BPMN** | Camunda | Business processes |

#### Enterprise Authentication

| Category | Technologies | Notes |
|----------|-------------|-------|
| **SSO** | Keycloak, Okta, Auth0 | Single sign-on |
| **Directory** | LDAP, Azure AD | Enterprise users |
| **SAML/OIDC** | SAML 2.0, OpenID Connect | Federation |
| **MFA** | TOTP (speakeasy), WebAuthn | TOTP or WebAuthn required for privileged roles; SMS OTP is HOLD — use only as last-resort fallback with ARB risk acceptance |

#### Document Processing

| Category | Technologies | Notes |
|----------|-------------|-------|
| **PDF** | pdf-lib, PDFKit, Puppeteer | Generation |
| **Parsing** | Apache PDFBox, Document AI | Extraction |
| **Office** | LibreOffice (headless), docx | Conversion |
| **OCR** | Tesseract, Google Vision | Text extraction |
| **PDF Accessibility** | PDF/UA compliance via tagged PDF generation | Required for government / healthcare clients; validate with PAC 2024 |

#### Enterprise Integrations

| Category | Technologies | Notes |
|----------|-------------|-------|
| **ERP** | SAP, Oracle, NetSuite APIs | Business systems |
| **CRM** | Salesforce, HubSpot APIs | Customer data |
| **Accounting** | QuickBooks, Xero APIs | Financial |
| **Communication** | Slack, Microsoft Teams APIs | Messaging |

---

## Infrastructure & DevOps

### Cloud Platform (GCP Primary)

| Service | GCP Technology | Purpose |
|---------|---------------|---------|
| **Compute** | Cloud Run | Containerized services |
| **Database** | Cloud SQL | Managed PostgreSQL/MySQL |
| **Storage** | Cloud Storage (GCS) | Files, assets, backups |
| **CDN** | Cloud CDN | Static content delivery |
| **Functions** | Cloud Functions | Serverless compute |
| **Queues** | Cloud Tasks, Pub/Sub | Async processing |
| **Data Warehouse** | BigQuery | Analytics |
| **AI/ML** | Vertex AI | ML platform |
| **Secrets** | Secret Manager | Credentials |
| **Monitoring** | Cloud Monitoring | Observability |
| **Logging** | Cloud Logging | Centralized logs |

### Containerization

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Containers** | Docker | Standard |
| **Local Dev** | Docker Compose | Multi-service |
| **Registry** | Artifact Registry (GCP) | Container images |
| **Orchestration** | Kubernetes (GKE), Cloud Run | Production |

### CI/CD Pipeline

| Stage | Technologies | Notes |
|-------|-------------|-------|
| **Source Control** | GitHub | Primary |
| **CI** | GitHub Actions | Tests, builds |
| **CD** | Cloud Build | Deployment |
| **Artifacts** | Artifact Registry | Images, packages |
| **Environments** | Staging, Production | Multi-env |

### Monorepo & Package Management

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Monorepo** | Turborepo | Standard for CYBERCUBE multi-package repos |
| **Package Manager** | pnpm | Preferred; faster installs, strict dependency resolution |
| **Alternative** | npm | Fallback; lock file via package-lock.json |

### Infrastructure as Code

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Primary** | Terraform | GCP resources |
| **Alternative** | Pulumi | TypeScript IaC |
| **Config** | Helm (K8s) | Kubernetes packages |

### Monitoring & Observability

| Category | Technologies | Notes |
|----------|-------------|-------|
| **APM** | Cloud Monitoring, Datadog | Performance |
| **Error Tracking** | Sentry | Exceptions |
| **Logging** | Cloud Logging, Loki | Centralized |
| **Tracing** | Cloud Trace, Jaeger, OpenTelemetry | Distributed; OpenTelemetry for vendor-neutral instrumentation |
| **Alerting** | Cloud Monitoring, PagerDuty | Incidents |
| **Uptime** | Cloud Monitoring, Pingdom | Availability |

### CDN & Edge

| Category | Technologies | Notes |
|----------|-------------|-------|
| **CDN** | Cloud CDN, Cloudflare | Content delivery |
| **DNS** | Cloud DNS, Cloudflare | Domain management |
| **SSL** | Let's Encrypt, Cloud LB | Certificates |
| **WAF** | Cloud Armor, Cloudflare | Security |

---

## Development Tools & Quality

### Code Quality

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Linting** | ESLint, Prettier | JavaScript/TypeScript |
| **Alt Linting** | Biome | All-in-one linter + formatter; faster than ESLint + Prettier |
| **Python** | Ruff, Black, isort | Python formatting |
| **Python Logging** | structlog (preferred), loguru | Structured JSON logging for Python services; pairs with OpenTelemetry |
| **Python Env** | pydantic-settings, python-dotenv | Typed env validation; `python-dotenv` for local dev only |
| **Type Checking** | TypeScript strict, mypy | Type safety |
| **Static Analysis** | SonarQube, CodeClimate | Code quality |

### Testing

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Unit Tests** | Vitest, Jest | JavaScript |
| **Python Tests** | pytest | Python |
| **E2E Tests** | Playwright | Browser automation |
| **API Tests** | Supertest, httpx | HTTP testing |
| **Load Tests** | K6, Artillery | Performance |
| **Mobile** | XCTest, Espresso | Native tests |

### Test Data & Contract Testing

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Seeding / Fixtures** | @faker-js/faker, Prisma seed scripts | Every project MUST have a repeatable seed command |
| **Contract Testing** | Pact | Consumer-driven contracts for microservice APIs; required when 3+ services |
| **API Mocking** | msw (browser + Node), nock (Node-only) | msw preferred for full-stack mocking; nock for backend-only unit tests |
| **Snapshot Testing** | Vitest snapshots | UI component regression |

### Monorepo Shared Config

| Category | Pattern | Notes |
|----------|---------|-------|
| **ESLint** | `@cybercube/eslint-config` | Shared across all packages in Turborepo |
| **TypeScript** | `@cybercube/tsconfig` | Base `tsconfig.json` with strict mode |
| **Tailwind** | `@cybercube/tailwind-config` | Shared design tokens, theme, plugins |
| **Prettier** | `.prettierrc` at repo root | Single config, no per-package overrides |

### Documentation

| Category | Technologies | Notes |
|----------|-------------|-------|
| **API Docs** | OpenAPI/Swagger | Auto-generated |
| **Code Docs** | JSDoc, TypeDoc | Inline docs |
| **Components** | Storybook | UI documentation |
| **Architecture** | Mermaid, Draw.io | Diagrams |

### Design Tools

| Category | Technologies | Notes |
|----------|-------------|-------|
| **UI/UX** | Figma | Design system |
| **Graphics** | Affinity Designer | Vector graphics |
| **Prototyping** | Figma, Framer | Interactive |

### Project Management

| Category | Technologies | Notes |
|----------|-------------|-------|
| **Tasks** | Linear, Jira | Issue tracking |
| **Docs** | Notion, Confluence | Knowledge base |
| **Communication** | Slack, Discord | Team chat |

---

## Security Standards

> Security controls below align with the [Authentication & Identity Standard (STD-SEC-003)](./STD-SEC-003%20CYBERCUBE-Authentication-Identity-Standard-v1.md) and the [Cryptography & Key Management Standard (STD-SEC-005)](./STD-SEC-005%20CYBERCUBE-Cryptography-Key-Management-Standard-v1.md). Where this document summarizes, the referenced standard is authoritative.

### Authentication & Authorization

| Category | Standard | Implementation |
|----------|----------|----------------|
| **Password Hashing** | **Argon2id** (mandatory for new systems) | OWASP #1; bcrypt (cost 12+) accepted in legacy only with documented migration plan |
| **Access Tokens** | Short-lived JWT (ES256 preferred, HS256 acceptable) | No PII in payload; claims limited to subject ID and scope; transmitted over TLS only |
| **Refresh Tokens** | Long-lived, opaque, server-stored | Rotation on use; bound to device/session; revocable |
| **Session Management** | Server-side sessions with httpOnly / secure / sameSite=strict cookies | Session ID: CSPRNG 32+ bytes; idle timeout 30 min; absolute timeout 24 h; regenerate on privilege change (per STD-SEC-003 §4) |
| **OAuth** | OAuth 2.0 + PKCE | Third-party auth; PKCE mandatory even for confidential clients |
| **MFA** | **TOTP (speakeasy)** or **WebAuthn** | Enforced for admin and privileged roles; speakeasy is approved TOTP library (ADR-13) |
| **MFA — Excluded** | SMS OTP | **HOLD** — not recommended due to SIM-swap and SS7 interception risks; use only as fallback-of-last-resort with risk acceptance by ARB |
| **RBAC** | Role-based access | Principle of least privilege |
| **CSRF** | Double-submit cookie or SameSite strict | Required for mutation endpoints |
| **CSP** | Content Security Policy headers | Required for all web applications |
| **Security Headers** | helmet (Express), secure-headers (Fastify) | Enforces CSP, HSTS, X-Frame-Options, X-Content-Type-Options; must be first middleware |
| **CORS** | cors (Express), @fastify/cors | Allowlist-only origin policy; no wildcard `*` in production |

### Data Protection

| Category | Standard | Implementation |
|----------|----------|----------------|
| **Encryption at Rest** | AES-256 | Database, storage |
| **Encryption in Transit** | TLS 1.3 | All connections |
| **Secrets** | Secret Manager | Never in code |
| **PII** | GDPR/CCPA compliance | Data minimization |

### API Security

| Category | Standard | Implementation |
|----------|----------|----------------|
| **Rate Limiting** | Per-user/IP limits | DDoS protection |
| **Input Validation** | Zod schemas | All endpoints |
| **CORS** | Strict origin policy | Whitelist domains |
| **Headers** | Helmet.js | Security headers |

### Client-Side Encryption

| Category | Standard | Implementation |
|----------|----------|----------------|
| **Browser Crypto** | Web Crypto API | Native browser cryptography for client-side operations |
| **Library** | `libsodium.js` (tweetnacl) | Use when Web Crypto API is insufficient (e.g. NaCl box/secretbox) |
| **Scope** | Required for healthcare, finance, or client-mandated E2E encryption | ADR required; coordinate with STD-SEC-005 |

### Feature Flags

| Category | Standard | Implementation |
|----------|----------|----------------|
| **Platform** | LaunchDarkly (enterprise), GrowthBook (open-source), PostHog | LaunchDarkly for paid clients needing audit trails; GrowthBook default for internal |
| **Mobile** | Firebase Remote Config | Flutter / React Native feature toggles |
| **Governance** | All flags MUST have an owner and expiry date | Stale flags (> 90 days unused) must be removed |

### Dependency Management

| Category | Standard | Implementation |
|----------|----------|----------------|
| **Scanning** | Snyk, npm audit | Automated |
| **Updates** | Dependabot | Weekly PRs |
| **Lock Files** | pnpm-lock.yaml / package-lock.json | Deterministic; pnpm preferred |

---

## Technology Selection Guidelines

### When to Use What

#### Frontend Framework Selection

| Scenario | Choice | Rationale |
|----------|--------|-----------|
| Full-stack web app | **Next.js** | SSR, API routes, file routing |
| SPA with existing API | **Vite + React** | Fast builds, simple setup |
| Content-heavy site | **Next.js + Sanity** | CMS integration |
| Vue preference | **Nuxt 3** | Vue ecosystem |

#### Mobile Framework Selection

| Scenario | Choice | Rationale |
|----------|--------|-----------|
| iOS + Android, budget-conscious | **Flutter** | Single codebase, native feel |
| JavaScript team, quick MVP | **React Native** | Familiar stack |
| Maximum iOS performance | **Swift/SwiftUI** | Native APIs |
| Maximum Android performance | **Kotlin/Compose** | Native APIs |
| Complex graphics/AR | **Native** | GPU access |

#### Backend Framework Selection

| Scenario | Choice | Rationale |
|----------|--------|-----------|
| Standard web API | **Node.js + Express 5.x** | Team expertise |
| High-performance API | **Fastify 5.x**, Hono, or Go | Lower latency; Fastify/Hono are TRIAL — ADR required |
| AI/ML integration | **Python + FastAPI** | ML ecosystem |
| Enterprise client | **Java Spring Boot** | Industry standard |

#### Database Selection

| Scenario | Choice | Rationale |
|----------|--------|-----------|
| Transactional data | **PostgreSQL 17+ / MySQL 8.0+** | ACID, relations; PostgreSQL default for new projects |
| Flexible schema | **MongoDB** | Document store |
| Caching layer | **Redis** | In-memory speed |
| Full-text search | **Elasticsearch** | Search features |
| AI embeddings | **Pinecone / pgvector** | Vector similarity |

---

## Technology Radar

> The Technology Radar is the **authoritative governance model** for technology adoption at CYBERCUBE. It aligns with the [Architecture Governance Policy (POL-GOV-002) §6](./POL-GOV-002%20CYBERCUBE-Architecture-Governance-Policy-v1.md) and is reviewed **quarterly** by the Architecture Review Board (ARB).

### Radar Rings

| Ring | Meaning | Usage | New Project Rule |
|------|---------|-------|------------------|
| **ADOPT** | Proven, recommended for broad use | Default choice for all projects | Use without ADR |
| **TRIAL** | Worth pursuing, validated in pilots | Allowed on low-risk projects with ADR | ADR required (Principal approval) |
| **ASSESS** | Worth exploring, understanding impact | Research and spike work only | ADR required (ARB approval) |
| **HOLD** | Not recommended for new work; phase out | No new adoption; existing usage must have sunset plan | ADR + ARB for any exception |

### Radar — Languages & Runtimes

| Technology | Ring | Notes |
|------------|------|-------|
| TypeScript 5.9+ | **ADOPT** | Primary language for web frontend and backend |
| JavaScript ES2022+ | **ADOPT** | Legacy support, rapid prototyping |
| Python 3.12+ | **ADOPT** | AI/ML, data processing, automation |
| Dart 3.x | **ADOPT** | Cross-platform mobile (Flutter) |
| Swift 6.2+ | **ADOPT** | Native iOS |
| Kotlin 2.1+ | **ADOPT** | Native Android |
| Go | **TRIAL** | High-performance services, enterprise backend |
| Java (Spring Boot) | **TRIAL** | Enterprise client requirement only |
| .NET (ASP.NET Core) | **TRIAL** | Microsoft-stack client requirement only |
| SQL (PostgreSQL 17+ / MySQL 8.0+) | **ADOPT** | Database queries |

### Radar — Web Frameworks

| Technology | Ring | Notes |
|------------|------|-------|
| React 19+ / Next.js 16+ | **ADOPT** | Primary web frontend |
| Vue 3 / Nuxt 3 | **TRIAL** | Client preference only |
| React Router v7 (Remix) | **ASSESS** | React meta-framework alternative; evaluate for SPA-heavy projects |
| Vite + React | **ADOPT** | SPA with existing API |
| Tailwind CSS 4.x | **ADOPT** | Primary styling |
| shadcn/ui 3.x / Radix UI | **ADOPT** | Accessible component library |
| SCSS | **HOLD** | Legacy projects only; migrate to Tailwind |

### Radar — Backend Frameworks

| Technology | Ring | Notes |
|------------|------|-------|
| Node.js 22 LTS + Express 5.x | **ADOPT** | Primary backend |
| Fastify 5.x | **TRIAL** | Use when p95 latency < 50 ms is a hard requirement; ADR required |
| Hono | **TRIAL** | Edge-first, lightweight |
| Bun | **TRIAL** | Performance-critical services |
| NestJS | **TRIAL** | Enterprise-pattern projects |
| Python + FastAPI + Pydantic | **ADOPT** | AI/ML integration, data-heavy apps; Pydantic mandatory for validation |
| Python + Django | **TRIAL** | Admin-heavy data apps |

### Radar — Mobile Frameworks

| Technology | Ring | Notes |
|------------|------|-------|
| Flutter 3.38+ | **ADOPT** | Primary cross-platform |
| React Native 0.82+ (New Architecture) | **TRIAL** | JS ecosystem teams |
| Swift + SwiftUI | **ADOPT** | Native iOS |
| Kotlin + Jetpack Compose | **ADOPT** | Native Android |

### Radar — Databases

| Technology | Ring | Notes |
|------------|------|-------|
| PostgreSQL 17+ | **ADOPT** | Primary relational; default for new projects; required for pgvector, TimescaleDB, PostGIS |
| MySQL 8.0+ | **ADOPT** | Alternative relational; existing projects, client preference |
| MongoDB 7+ | **TRIAL** | Flexible schema use cases |
| Redis 8+ | **ADOPT** | Caching layer |
| Elasticsearch 8+ | **ADOPT** | Full-text search |
| Pinecone | **TRIAL** | Managed vector DB |
| pgvector | **TRIAL** | Integrated vector search with PostgreSQL |
| Chroma | **ASSESS** | Local dev vector search |
| Algolia | **TRIAL** | Managed search (client requirement) |

### Radar — AI / ML Frameworks

| Technology | Ring | Notes |
|------------|------|-------|
| LangChain / LangGraph | **ADOPT** | Agent orchestration |
| LlamaIndex | **TRIAL** | RAG pipelines |
| CrewAI | **ASSESS** | Multi-agent patterns |
| TensorFlow 2.x / PyTorch 2.x | **ADOPT** | Model training |
| scikit-learn / XGBoost | **ADOPT** | Classical ML |
| Vertex AI | **ADOPT** | GCP ML platform |

### Radar — Cloud & Infrastructure

| Technology | Ring | Notes |
|------------|------|-------|
| GCP (Cloud Run, Cloud SQL, GCS, BigQuery) | **ADOPT** | Primary cloud platform |
| AWS | **TRIAL** | Client requirement only |
| Azure | **TRIAL** | Client requirement only |
| Docker | **ADOPT** | Standard containerization |
| Kubernetes (GKE) | **ADOPT** | Production orchestration |
| Terraform | **ADOPT** | Primary IaC |
| Pulumi | **TRIAL** | TypeScript IaC alternative |
| GitHub Actions | **ADOPT** | Primary CI |
| Cloud Build | **ADOPT** | Primary CD |

### Radar — Observability & DevOps

| Technology | Ring | Notes |
|------------|------|-------|
| OpenTelemetry | **ADOPT** | Vendor-neutral instrumentation |
| Sentry | **ADOPT** | Error tracking |
| Cloud Monitoring / Logging / Trace | **ADOPT** | GCP observability |
| Datadog | **TRIAL** | APM (client/enterprise) |
| Turborepo | **ADOPT** | Monorepo tooling |
| pnpm | **ADOPT** | Preferred package manager |
| npm | **ADOPT** | Fallback package manager |
| Biome | **TRIAL** | All-in-one linter + formatter |
| ESLint + Prettier | **ADOPT** | JS/TS lint + format |
| pino | **ADOPT** | Structured JSON logging for Node.js; pairs with OpenTelemetry |
| winston | **TRIAL** | Node.js logging; use only for legacy projects |
| structlog | **ADOPT** | Structured logging for Python services |
| loguru | **TRIAL** | Python logging; convenient but less structured than structlog |

### Radar — Testing

| Technology | Ring | Notes |
|------------|------|-------|
| Vitest | **ADOPT** | Primary JS/TS unit tests |
| Playwright | **ADOPT** | E2E browser tests |
| pytest | **ADOPT** | Python tests |
| K6 | **TRIAL** | Load testing |
| Jest | **HOLD** | Migrate to Vitest for new projects |
| msw | **ADOPT** | API mocking for tests and dev (browser + Node); preferred over nock |
| nock | **TRIAL** | Node-only HTTP mocking; use for backend unit tests |

### Radar — ORM, API & Real-time

| Technology | Ring | Notes |
|------------|------|-------|
| Prisma | **ADOPT** | Primary ORM; schema-first, migrations, type-safe |
| Drizzle | **TRIAL** | SQL-first ORM; lighter than Prisma; use for performance-sensitive queries |
| tRPC | **ADOPT** | End-to-end type safety for TypeScript-only stacks |
| GraphQL Yoga | **ADOPT** | Preferred GraphQL server for new projects; lighter than Apollo |
| Apollo Server | **TRIAL** | Existing GraphQL projects; heavier runtime |
| Socket.IO | **ADOPT** | Real-time bidirectional communication |
| gRPC | **TRIAL** | Inter-service communication; high-throughput microservices |

### Radar — Data & Workflow

| Technology | Ring | Notes |
|------------|------|-------|
| Apache Kafka | **TRIAL** | Event streaming; use for high-throughput event-driven architectures |
| Google Pub/Sub | **ADOPT** | GCP-native async messaging |
| Temporal | **TRIAL** | Durable workflow orchestration; enterprise-grade |
| Apache Airflow | **ADOPT** | ETL/ELT orchestration |
| dbt | **ADOPT** | SQL transformations in data warehouse |
| Storybook | **ADOPT** | Component documentation and visual testing |
| Framer Motion | **ADOPT** | React animation library |

### Radar — Platforms & BaaS

| Technology | Ring | Notes |
|------------|------|-------|
| Supabase | **TRIAL** | BaaS for MVPs; PostgreSQL-backed |
| Firebase | **TRIAL** | BaaS for mobile-first MVPs |
| WordPress (headless) | **HOLD** | Legacy CMS only; migrate to Sanity/Strapi for new projects |
| Sanity | **ADOPT** | Primary headless CMS |
| Strapi | **TRIAL** | Self-hosted headless CMS |

### Radar — LLM Providers

| Technology | Ring | Notes |
|------------|------|-------|
| OpenAI GPT-series | **ADOPT** | Primary LLM provider |
| Anthropic Claude-series | **ADOPT** | Complex reasoning, coding |
| Google Gemini-series | **TRIAL** | Multimodal, large context |
| xAI Grok | **ASSESS** | Emerging provider; evaluate before production use |
| Open-source (Llama, Mistral, DeepSeek) | **ASSESS** | Self-hosted evaluation only |

### Radar — Cross-Cutting Concerns

| Technology | Ring | Notes |
|------------|------|-------|
| axe-core | **ADOPT** | Accessibility testing; integrate in CI via Lighthouse CI or playwright-axe |
| eslint-plugin-jsx-a11y | **ADOPT** | Lint-time a11y checks for React |
| pa11y | **TRIAL** | Automated WCAG audit tool |
| next-intl | **ADOPT** | i18n for Next.js projects |
| react-i18next | **ADOPT** | i18n for non-Next React projects |
| FormatJS (react-intl) | **TRIAL** | Alternative i18n; ICU MessageFormat |
| Resend | **ADOPT** | Transactional email; preferred for new projects |
| SendGrid | **TRIAL** | High-volume / legacy email |
| BullMQ | **ADOPT** | Redis-backed job queue for Node.js |
| Cloud Tasks | **ADOPT** | GCP serverless task queue |
| Cloud Scheduler | **ADOPT** | Managed cron; production scheduled jobs |
| node-cron | **TRIAL** | Local dev / simple scheduling only |
| GrowthBook | **ADOPT** | Open-source feature flags; default for internal projects |
| LaunchDarkly | **TRIAL** | Enterprise feature flags with audit trail |
| Sharp | **ADOPT** | Node.js image processing (resize, format conversion) |
| Cloudinary / Imgproxy | **TRIAL** | CDN-backed image transformation |
| openapi-typescript | **ADOPT** | Typed API client generation from OpenAPI specs |
| orval | **TRIAL** | OpenAPI → React Query / Axios client generation |
| @faker-js/faker | **ADOPT** | Test data generation and database seeding |
| Pact | **TRIAL** | Consumer-driven contract testing for microservices |
| Web Crypto API | **ADOPT** | Browser-native cryptography |
| libsodium.js | **TRIAL** | Client-side encryption when Web Crypto is insufficient |
| date-fns | **ADOPT** | Date manipulation; tree-shakable, immutable |
| dayjs | **TRIAL** | Lightweight date library; drop-in Moment.js replacement |
| Moment.js | **HOLD** | Deprecated; migrate to date-fns or dayjs |
| TipTap | **ADOPT** | ProseMirror-based rich text editor; preferred for content-rich apps |
| Lexical | **TRIAL** | Meta's rich text framework; evaluate for React-heavy projects |
| `@t3-oss/env-nextjs` | **ADOPT** | Typed environment variable validation for Next.js |
| envalid | **ADOPT** | Typed env validation for Node.js |
| pydantic-settings | **ADOPT** | Typed env validation for Python (FastAPI) |
| Svix | **TRIAL** | Managed webhook delivery with retry and signing |
| helmet | **ADOPT** | Express security headers middleware |
| cors (Express) | **ADOPT** | CORS middleware; allowlist-only in production |
| @upstash/ratelimit | **TRIAL** | Serverless rate limiting (Redis-backed) |

### Radar — Desktop & PWA

| Technology | Ring | Notes |
|------------|------|-------|
| Tauri 2.x | **TRIAL** | Rust-backed desktop apps; smaller binary than Electron; preferred for new projects |
| Electron | **TRIAL** | Desktop apps requiring full Node.js API access |
| Flutter Desktop | **ASSESS** | Cross-platform mobile + desktop from single codebase |
| Workbox | **ADOPT** | Service worker tooling for PWA |
| Web Push API | **ADOPT** | Browser push notifications |

### Radar — Infrastructure (additional)

| Technology | Ring | Notes |
|------------|------|-------|
| Cloud SQL Auth Proxy | **ADOPT** | Connection pooling for Cloud Run → Cloud SQL |
| PgBouncer | **TRIAL** | Connection pooling for self-managed PostgreSQL |
| Prisma Data Proxy | **TRIAL** | Managed connection pooling for Prisma + serverless |

### Radar — Security & Auth

| Technology | Ring | Notes |
|------------|------|-------|
| Argon2id | **ADOPT** | Password hashing (mandatory for new systems) |
| bcrypt (cost 12+) | **HOLD** | Legacy only; migrate to Argon2id |
| `jose` (JWT) | **ADOPT** | Token creation/verification |
| `@oslojs/crypto` | **ADOPT** | Hashing, TOTP, crypto primitives |
| Passport.js | **HOLD** | Legacy auth middleware; migrate to `jose` + `@oslojs` for new projects |
| OAuth 2.0 + PKCE | **ADOPT** | Third-party auth |
| TOTP (speakeasy) + WebAuthn | **ADOPT** | MFA |
| SMS OTP | **HOLD** | Not recommended; SIM-swap/interception risk |
| Keycloak | **TRIAL** | Enterprise SSO |
| Supabase Auth / Clerk | **TRIAL** | MVP auth |

---

## Priority Technology Matrix

> **Note:** The [Technology Radar](#technology-radar) is the authoritative governance classification. This matrix is a quick operational reference for primary and fallback choices (all entries are ADOPT or TRIAL ring).

Quick reference for primary and fallback choices:

| Capability | Primary | Fallback |
|------------|---------|----------|
| Web Frontend | React + Next.js | Vue + Nuxt |
| Web Backend | Node.js + Express | Python + FastAPI |
| Database | PostgreSQL 17+ | MySQL 8.0+ |
| Mobile Cross-Platform | Flutter | React Native |
| Mobile iOS | Swift + SwiftUI | — |
| Mobile Android | Kotlin + Compose | — |
| Desktop | Tauri 2.x | Electron |
| AI/LLM | OpenAI + LangGraph | Claude API |
| Data Viz | D3.js + React | Chart.js |
| BI Platform | Metabase | Looker Studio |
| ETL | Airflow + dbt | Custom Python |
| Cloud | GCP | AWS |
| Caching | Redis | — |
| Search | Elasticsearch | Algolia |
| CI/CD | GitHub Actions + Cloud Build | GitLab CI |
| Containers | Docker + Cloud Run | Kubernetes |
| IaC | Terraform | Pulumi |
| Email | Resend | SendGrid |
| Background Jobs | BullMQ | Cloud Tasks |
| Feature Flags | GrowthBook | LaunchDarkly |
| Accessibility | axe-core + Lighthouse CI | pa11y |
| i18n | next-intl / react-i18next | FormatJS |
| ORM | Prisma | Drizzle |
| GraphQL | Yoga | Apollo Server |
| Connection Pooling | Cloud SQL Auth Proxy | PgBouncer |
| Logging (Node.js) | pino | winston |
| Logging (Python) | structlog | loguru |
| Date/Time (JS) | date-fns | dayjs |
| Rich Text Editor | TipTap | Lexical |
| Env Validation (Node) | envalid / @t3-oss/env | dotenv |
| Env Validation (Python) | pydantic-settings | python-dotenv |
| API Mocking | msw | nock |
| Security Headers | helmet | — |
| Webhooks | Svix | BullMQ + HMAC |
| Rate Limiting | express-rate-limit | @upstash/ratelimit |

---

## Version Requirements

### Minimum Supported Versions

| Technology | Minimum Version | Target Version |
|------------|-----------------|----------------|
| Node.js | 22 LTS | **24 LTS** |
| TypeScript | 5.7 | **5.9+** |
| React | 19.0 | **19.2+** |
| Next.js | 15.0 | **16.1+** |
| Python | 3.11 | **3.12+** |
| Flutter | 3.30 | **3.38+** |
| Swift | 6.0 | **6.2+** |
| Kotlin | 2.0 | **2.1+** |
| MySQL | 8.0 | **8.0.35+** |
| PostgreSQL | 16 | **17+** |
| Redis | 7.2 | **8.4+** |
| Docker | 25.0 | **27+** |

### Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 16+ |
| Edge | 90+ (Chromium) |

---

## Learning Resources

### Official Documentation

- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Flutter Docs](https://docs.flutter.dev)
- [Swift Documentation](https://www.swift.org/documentation/)
- [LangChain Docs](https://docs.langchain.com)
- [GCP Documentation](https://cloud.google.com/docs)

### Internal Resources

- `docs/development/COMPONENT_FACTORY_PATTERN.md` — Component architecture
- `docs/development/BROWSER_SUPPORT.md` — Browser compatibility
- `docs/deployment/` — Deployment guides

### Training Recommendations

| Technology | Resource |
|------------|----------|
| React | React.dev Learn section |
| TypeScript | TypeScript Deep Dive (book) |
| Flutter | Flutter codelabs |
| AI/ML | fast.ai courses |
| GCP | Google Cloud Skills Boost |

---

## Governance & Compliance

### Compliance Level

This standard is **Mandatory**. All CYBERCUBE projects — internal and client-facing — MUST conform unless a formal deviation is granted.

### Deviation Process

Any deviation from the canonical stack defined in this standard requires a documented exception per the [Policy Exception & Waiver Standard (STD-GOV-003)](./STD-GOV-003%20CYBERCUBE-Policy-Exception-Waiver-Standard-v1.md).

| Deviation Type | Example | Required Artifacts | Approver |
|---------------|---------|-------------------|----------|
| **ADOPT → non-listed technology** | Using a framework not in this standard | ADR + risk assessment | ARB |
| **Using a TRIAL technology in production** | Deploying Hono or Bun to a client project | ADR documenting rationale and rollback plan | Principal Engineer |
| **Using an ASSESS technology** | Evaluating CrewAI in a client engagement | ADR + time-boxed spike proposal | ARB |
| **Using a HOLD technology in new code** | Adding bcrypt to a greenfield service | ADR + migration timeline + ARB exception | ARB + CTO |
| **Version below minimum** | Deploying Node.js 20 instead of 22 LTS | ADR with upgrade timeline (max 90 days) | Domain Lead + Principal |

### ADR Requirement

Per the [Architecture Governance Policy (POL-GOV-002) §2](./POL-GOV-002%20CYBERCUBE-Architecture-Governance-Policy-v1.md):
- **Technology Adoption** decisions (new language, framework, database) require an ADR approved by the ARB.
- **Movement between Radar rings** requires an ADR with the approval level specified in POL-GOV-002 §6.2.
- ADRs MUST reference this standard by ID (STD-ENG-009) and the specific Radar ring being changed.

### Review Cadence

| Activity | Frequency | Owner | Deliverable |
|----------|-----------|-------|-------------|
| Full standard review | Quarterly | Engineering Lead + ARB | Updated version of this document |
| Technology Radar review | Quarterly | ARB | Ring movement decisions, published Radar |
| Version requirements check | Per major release | Platform Team | Updated version table |
| Security alignment review | Semi-annually | Security Team | Cross-reference with STD-SEC-003, STD-SEC-005 |
| Ad-hoc update | When new services are added | Engineering Lead | Patch version of this document |

### Sunset & Migration Paths

Technologies classified as **HOLD** MUST have:

1. **Sunset timeline** — maximum 12 months from HOLD classification to full removal from active codebases.
2. **Migration plan** — documented path from HOLD technology to its ADOPT replacement, filed as an ADR.
3. **Tracking** — all active usages of HOLD technologies tracked in the Architecture Debt Register.
4. **No new adoption** — HOLD technologies MUST NOT be introduced in any new project or module. Violations are Tier 1 deviations requiring ARB + CTO approval.

Current HOLD items and their replacement paths:

| HOLD Technology | Replacement | Migration Deadline |
|----------------|-------------|-------------------|
| SCSS | Tailwind CSS 4.x | 2026-10-15 |
| bcrypt | Argon2id | 2026-10-15 |
| SMS OTP | TOTP (speakeasy) / WebAuthn | 2026-10-15 |
| WordPress (headless) | Sanity / Strapi | 2026-10-15 |
| Passport.js | `jose` + `@oslojs/crypto` | 2027-01-15 |
| Apollo Server | GraphQL Yoga | 2027-01-15 |
| Jest | Vitest | 2027-01-15 |

---

## Document Maintenance

**Owner:** Engineering Lead
**Last Review:** 2026-04-15
**Change Log:**

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-01-13 | Engineering Lead | Initial technology stack standard |
| 2.0 | 2026-04-15 | Engineering Lead | Major revision: Technology Radar governance, security alignment with STD-SEC-003/005, upgraded baselines (React 19, Next 16, Node 22, Express 5, Tailwind 4, LangGraph), PostgreSQL as primary DB, Fastify demoted to TRIAL, Passport.js/Apollo/WordPress moved to HOLD, full Radar coverage for ORM/API/data/platform/LLM categories, uv preferred Python PM, Safari 16+ baseline, Remix ASSESS, cross-cutting gaps closed (a11y, i18n, email, background jobs, feature flags, connection pooling, file storage, cron, desktop apps, PWA, client-side encryption, contract testing, API codegen, shared monorepo config, PDF/UA, seeding) |
| 2.1 | 2026-04-16 | Engineering Lead | Operational tooling pass: added pino/structlog (logging), envalid/pydantic-settings (env validation), date-fns (date/time), TipTap/Lexical (rich text editors), msw/nock (API mocking), helmet/cors (security middleware), health check & graceful shutdown patterns, @upstash/ratelimit (serverless), Svix (webhooks), Pydantic (FastAPI validation), Moment.js HOLD; Radar and Priority Matrix updated |

---

*This document is the authoritative reference for technology decisions at CYBERCUBE. Deviations require formal approval per the process defined in [Governance & Compliance](#governance--compliance).*
