# Locusverse — Backend Architecture Document

---

## Go vs NestJS: The Verdict

### Recommendation: **NestJS** (with one Go microservice later)

Here's why, specific to your situation:

| Factor | NestJS | Go |
|---|---|---|
| **Your existing backend** | Already Node/Express (`spitch-hack-backend`). NestJS is a direct upgrade — migrate, don't rewrite | Would require a full rewrite from scratch |
| **Shared types with frontend** | TypeScript end-to-end. Define a `Delivery` interface once, share it across frontend + backend | Separate type definitions, manual sync, protobuf overhead |
| **Dev speed** | Decorators, DI, modules, pipes, guards — you scaffold a full CRUD resource in 30 seconds with `nest generate resource` | More boilerplate for every endpoint, no DI framework out of the box |
| **Real-time (WebSockets)** | Built-in `@WebSocketGateway` with rooms, namespaces, auth guards. Good enough for 1,000–10,000 concurrent drivers | Goroutines + channels are objectively better for 50,000+ connections |
| **Hiring in Africa** | 10× more TypeScript/Node developers available in Lagos, Nairobi, Accra | Go talent pool is small and expensive |
| **Ecosystem** | Prisma/TypeORM, Bull queues, Passport auth, Multer uploads, PDFKit, Sharp — all drop-in | Excellent stdlib, but you'll write more glue code |
| **When Go wins** | When you have 10,000+ drivers sending GPS pings every 2 seconds and need sub-millisecond fan-out | That's a year-2 problem, not a launch problem |

**The play:** Ship everything in NestJS now. When GPS ingestion becomes a bottleneck (thousands of concurrent drivers), extract *only* the real-time location ingestion service into a Go microservice. Everything else stays NestJS.

---

## Tech Stack

```
Runtime:          Node.js 20 LTS
Framework:        NestJS 11
Language:         TypeScript 5.x
Database:         PostgreSQL 16 (primary) + Redis 7 (cache, pub/sub, queues)
ORM:              Prisma 6
Auth:             JWT (access + refresh tokens) via @nestjs/jwt + Passport
Real-time:        Socket.IO via @nestjs/websockets
Queue:            BullMQ (Redis-backed job queue)
File Storage:     AWS S3 (or Cloudflare R2 for cheaper egress)
PDF Generation:   @react-pdf/renderer or PDFKit
Image Processing: Sharp (resize POD photos before storage)
Email:            Resend or Nodemailer + SES
SMS:              Africa's Talking API (local African carrier coverage)
Push:             Firebase Cloud Messaging (FCM) via web push
Geospatial:       PostGIS extension on PostgreSQL
Maps/Routing:     Mapbox Directions API + Optimization API (TSP solver)
Speech-to-Text:   Existing backend service (spitch) or Whisper API
Payments:         Paystack (Nigerian card payments, bank transfers)
Deployment:       Docker containers on Railway / Render / AWS ECS
CI/CD:            GitHub Actions
Monitoring:       Sentry (errors) + Upstash (Redis metrics)
```

---

## Database Schema (PostgreSQL + PostGIS)

### Core Tables

```sql
-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS & AUTH
-- ============================================================

CREATE TYPE user_role AS ENUM ('driver', 'dispatcher', 'admin', 'customer');
CREATE TYPE account_status AS ENUM ('active', 'suspended', 'pending_verification');

CREATE TABLE organizations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    slug            VARCHAR(100) UNIQUE NOT NULL,        -- for URLs: locusverse.app/track/slug/xxx
    logo_url        TEXT,
    brand_color     VARCHAR(7) DEFAULT '#22C55E',        -- hex color for customer tracking page
    custom_message  TEXT,                                 -- "Your delivery from X is on the way!"
    plan            VARCHAR(50) DEFAULT 'starter',       -- starter, business, enterprise
    stripe_customer_id VARCHAR(255),
    paystack_customer_code VARCHAR(255),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID REFERENCES organizations(id),   -- NULL for standalone drivers
    email           VARCHAR(255) UNIQUE NOT NULL,
    phone           VARCHAR(20),
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(255) NOT NULL,
    avatar_url      TEXT,
    role            user_role NOT NULL DEFAULT 'driver',
    status          account_status DEFAULT 'active',
    preferred_lang  VARCHAR(5) DEFAULT 'en',             -- en, yo, ig, ha
    vehicle_type    VARCHAR(50),                          -- motorcycle, car, van, bicycle
    fcm_token       TEXT,                                 -- for push notifications
    last_seen_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE refresh_tokens (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) NOT NULL,
    expires_at      TIMESTAMPTZ NOT NULL,
    revoked         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DELIVERIES
-- ============================================================

CREATE TYPE delivery_status AS ENUM (
    'pending',          -- created, not assigned
    'assigned',         -- assigned to driver, not started
    'picked_up',        -- driver picked up package
    'in_transit',       -- driver heading to destination
    'arriving',         -- driver within geofence of destination
    'delivered',        -- POD captured, done
    'failed',           -- could not deliver
    'cancelled'
);

CREATE TYPE delivery_priority AS ENUM ('normal', 'urgent');

CREATE TABLE deliveries (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(id),
    driver_id       UUID REFERENCES users(id),            -- NULL if unassigned
    created_by      UUID NOT NULL REFERENCES users(id),   -- dispatcher who created it

    -- Recipient
    recipient_name  VARCHAR(255) NOT NULL,
    recipient_phone VARCHAR(20),
    recipient_email VARCHAR(255),

    -- Pickup
    pickup_address  TEXT,
    pickup_lat      DOUBLE PRECISION,
    pickup_lng      DOUBLE PRECISION,
    pickup_point    GEOMETRY(Point, 4326),                -- PostGIS point

    -- Dropoff
    dropoff_address TEXT NOT NULL,
    dropoff_lat     DOUBLE PRECISION NOT NULL,
    dropoff_lng     DOUBLE PRECISION NOT NULL,
    dropoff_point   GEOMETRY(Point, 4326),

    -- Details
    package_desc    TEXT,
    delivery_notes  TEXT,
    priority        delivery_priority DEFAULT 'normal',
    status          delivery_status DEFAULT 'pending',

    -- Tracking
    tracking_code   VARCHAR(20) UNIQUE NOT NULL,          -- short code: "LCS-A7X2M9"
    tracking_views  INTEGER DEFAULT 0,

    -- Timing
    estimated_pickup_at  TIMESTAMPTZ,
    actual_pickup_at     TIMESTAMPTZ,
    estimated_delivery_at TIMESTAMPTZ,
    actual_delivery_at   TIMESTAMPTZ,

    -- Route (if part of multi-stop)
    route_id        UUID REFERENCES routes(id),
    stop_order      INTEGER,                              -- position in optimized route

    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_deliveries_org ON deliveries(org_id);
CREATE INDEX idx_deliveries_driver ON deliveries(driver_id);
CREATE INDEX idx_deliveries_status ON deliveries(status);
CREATE INDEX idx_deliveries_tracking ON deliveries(tracking_code);
CREATE INDEX idx_deliveries_dropoff_geo ON deliveries USING GIST(dropoff_point);

-- Status change audit log
CREATE TABLE delivery_events (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    delivery_id     UUID NOT NULL REFERENCES deliveries(id) ON DELETE CASCADE,
    status          delivery_status NOT NULL,
    location        GEOMETRY(Point, 4326),
    note            TEXT,
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROOF OF DELIVERY
-- ============================================================

CREATE TABLE proof_of_delivery (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    delivery_id     UUID UNIQUE NOT NULL REFERENCES deliveries(id),
    driver_id       UUID NOT NULL REFERENCES users(id),

    photo_url       TEXT NOT NULL,                        -- S3 URL
    signature_url   TEXT NOT NULL,                        -- S3 URL (signature image)
    pdf_url         TEXT,                                 -- generated receipt PDF

    -- GPS stamp (tamper-proof: captured at moment of delivery)
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    gps_accuracy    DOUBLE PRECISION,                     -- meters
    location_point  GEOMETRY(Point, 4326),

    captured_at     TIMESTAMPTZ NOT NULL,                 -- device timestamp
    server_received_at TIMESTAMPTZ DEFAULT NOW(),         -- server timestamp (for discrepancy detection)

    -- Recipient confirmation
    recipient_name_confirmed VARCHAR(255),                -- name as entered by recipient
    notes           TEXT,

    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIPS (GPS TRACKING)
-- ============================================================

CREATE TYPE trip_status AS ENUM ('active', 'paused', 'completed', 'cancelled');

CREATE TABLE trips (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_id       UUID NOT NULL REFERENCES users(id),
    delivery_id     UUID REFERENCES deliveries(id),       -- optional link to delivery
    org_id          UUID REFERENCES organizations(id),

    status          trip_status DEFAULT 'active',
    started_at      TIMESTAMPTZ NOT NULL,
    ended_at        TIMESTAMPTZ,
    paused_duration INTEGER DEFAULT 0,                    -- total pause time in seconds

    -- Aggregated stats (computed on trip end)
    total_distance  DOUBLE PRECISION DEFAULT 0,           -- meters
    avg_speed       DOUBLE PRECISION DEFAULT 0,           -- m/s
    max_speed       DOUBLE PRECISION DEFAULT 0,           -- m/s

    -- Snapped path (computed after trip via Mapbox Map Matching)
    raw_path        GEOMETRY(LineString, 4326),           -- raw GPS points
    snapped_path    GEOMETRY(LineString, 4326),           -- road-snapped path

    start_address   TEXT,
    end_address     TEXT,

    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Raw GPS pings — high-frequency insert table
-- Partitioned by month for performance
CREATE TABLE trip_points (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id         UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    accuracy        DOUBLE PRECISION,
    heading         DOUBLE PRECISION,
    speed           DOUBLE PRECISION,
    altitude        DOUBLE PRECISION,
    point           GEOMETRY(Point, 4326),
    recorded_at     TIMESTAMPTZ NOT NULL,                 -- device timestamp
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trip_points_trip ON trip_points(trip_id, recorded_at);

-- ============================================================
-- ROUTES (MULTI-STOP OPTIMIZATION)
-- ============================================================

CREATE TABLE routes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(id),
    driver_id       UUID REFERENCES users(id),
    name            VARCHAR(255),                         -- "Monday Lekki Route"
    is_template     BOOLEAN DEFAULT FALSE,                -- reusable route template

    -- Optimization results
    original_distance   DOUBLE PRECISION,                 -- meters before optimization
    optimized_distance  DOUBLE PRECISION,                 -- meters after optimization
    distance_saved      DOUBLE PRECISION,                 -- meters saved
    estimated_duration  INTEGER,                          -- seconds

    optimized_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE route_stops (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_id        UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    delivery_id     UUID REFERENCES deliveries(id),
    address         TEXT NOT NULL,
    latitude        DOUBLE PRECISION NOT NULL,
    longitude       DOUBLE PRECISION NOT NULL,
    point           GEOMETRY(Point, 4326),
    original_order  INTEGER NOT NULL,                     -- order before optimization
    optimized_order INTEGER,                              -- order after optimization
    time_window_start TIMESTAMPTZ,                        -- earliest delivery time
    time_window_end   TIMESTAMPTZ,                        -- latest delivery time
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRANSACTIONS (VOICE-LOGGED)
-- ============================================================

CREATE TYPE transaction_type AS ENUM ('income', 'debt');

CREATE TABLE transactions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id),
    customer_name   VARCHAR(255) NOT NULL,
    details         TEXT,
    amount          DECIMAL(15, 2) NOT NULL,              -- Naira
    type            transaction_type NOT NULL,
    language        VARCHAR(5),                           -- language it was spoken in
    audio_url       TEXT,                                 -- original recording (S3)
    transcript      TEXT,                                 -- raw transcription
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TYPE notification_channel AS ENUM ('push', 'email', 'sms', 'in_app');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed');

CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id),
    channel         notification_channel NOT NULL,
    title           VARCHAR(255),
    body            TEXT NOT NULL,
    data            JSONB,                                -- payload (delivery_id, etc.)
    status          notification_status DEFAULT 'pending',
    sent_at         TIMESTAMPTZ,
    read_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BILLING & USAGE
-- ============================================================

CREATE TABLE usage_records (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id          UUID NOT NULL REFERENCES organizations(id),
    period_start    DATE NOT NULL,
    period_end      DATE NOT NULL,
    deliveries_count INTEGER DEFAULT 0,
    drivers_count   INTEGER DEFAULT 0,
    pod_count       INTEGER DEFAULT 0,
    tracking_link_views INTEGER DEFAULT 0,
    route_optimizations INTEGER DEFAULT 0,
    audio_minutes   DECIMAL(10, 2) DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(org_id, period_start)
);
```

---

## Module Architecture

NestJS organizes code into modules. Here is every module, its responsibilities, and its endpoints.

```
src/
├── main.ts
├── app.module.ts                      -- root module
│
├── common/                            -- shared utilities
│   ├── guards/                        -- JwtAuthGuard, RolesGuard, WsAuthGuard
│   ├── decorators/                    -- @CurrentUser(), @Roles(), @Public()
│   ├── interceptors/                  -- TransformInterceptor, LoggingInterceptor
│   ├── filters/                       -- HttpExceptionFilter, WsExceptionFilter
│   ├── pipes/                         -- ParseUUIDPipe, ValidationPipe
│   └── dto/                           -- PaginationDto, ApiResponseDto
│
├── config/                            -- ConfigModule setup
│   └── config.module.ts               -- env validation via Joi
│
├── prisma/                            -- PrismaModule (DB connection)
│   ├── prisma.service.ts
│   └── prisma.module.ts
│
├── auth/                              -- Authentication module
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/                    -- JwtStrategy, LocalStrategy
│   ├── dto/                           -- RegisterDto, LoginDto, RefreshDto
│   └── guards/
│
├── users/                             -- User management
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│
├── organizations/                     -- Business/org management
│   ├── organizations.module.ts
│   ├── organizations.controller.ts
│   ├── organizations.service.ts
│   └── dto/
│
├── deliveries/                        -- Delivery CRUD + lifecycle
│   ├── deliveries.module.ts
│   ├── deliveries.controller.ts
│   ├── deliveries.service.ts
│   └── dto/
│
├── tracking/                          -- Real-time driver location
│   ├── tracking.module.ts
│   ├── tracking.gateway.ts            -- WebSocket gateway
│   ├── tracking.service.ts
│   └── dto/
│
├── trips/                             -- Trip recording + history
│   ├── trips.module.ts
│   ├── trips.controller.ts
│   ├── trips.service.ts
│   └── dto/
│
├── pod/                               -- Proof of Delivery
│   ├── pod.module.ts
│   ├── pod.controller.ts
│   ├── pod.service.ts
│   ├── pdf.service.ts                 -- PDF receipt generation
│   └── dto/
│
├── routes/                            -- Route optimization
│   ├── routes.module.ts
│   ├── routes.controller.ts
│   ├── routes.service.ts
│   ├── optimization.service.ts        -- Mapbox Optimization API wrapper
│   └── dto/
│
├── customer-tracking/                 -- Public tracking page API
│   ├── customer-tracking.module.ts
│   ├── customer-tracking.controller.ts
│   ├── customer-tracking.gateway.ts   -- WebSocket for live updates
│   └── customer-tracking.service.ts
│
├── transactions/                      -- Voice-logged transactions
│   ├── transactions.module.ts
│   ├── transactions.controller.ts
│   ├── transactions.service.ts
│   └── dto/
│
├── audio/                             -- Speech-to-text processing
│   ├── audio.module.ts
│   ├── audio.service.ts               -- Whisper / existing Spitch integration
│   └── audio.processor.ts             -- BullMQ job processor
│
├── notifications/                     -- Push, email, SMS, in-app
│   ├── notifications.module.ts
│   ├── notifications.service.ts
│   ├── notifications.processor.ts     -- BullMQ job processor
│   ├── channels/
│   │   ├── push.service.ts            -- FCM
│   │   ├── email.service.ts           -- Resend/SES
│   │   └── sms.service.ts             -- Africa's Talking
│   └── dto/
│
├── analytics/                         -- Reporting + aggregation
│   ├── analytics.module.ts
│   ├── analytics.controller.ts
│   └── analytics.service.ts
│
├── billing/                           -- Plans, usage, payments
│   ├── billing.module.ts
│   ├── billing.controller.ts
│   ├── billing.service.ts
│   ├── paystack.service.ts
│   └── dto/
│
├── upload/                            -- File upload (S3/R2)
│   ├── upload.module.ts
│   └── upload.service.ts
│
└── geofence/                          -- Arrival detection
    ├── geofence.module.ts
    └── geofence.service.ts
```

---

## API Endpoints (Full Reference)

### Auth — `/api/v1/auth`

```
POST   /register                -- Create account (driver or business)
POST   /login                   -- Email + password → access + refresh tokens
POST   /refresh                 -- Refresh token → new access token
POST   /logout                  -- Revoke refresh token
POST   /forgot-password         -- Send reset email
POST   /reset-password          -- Reset with token
```

### Users — `/api/v1/users`

```
GET    /me                      -- Current user profile
PATCH  /me                      -- Update profile (name, avatar, vehicle, lang)
PATCH  /me/fcm-token            -- Register push notification token
GET    /me/stats                -- Personal stats (deliveries, distance, earnings)
```

### Organizations — `/api/v1/organizations`

```
POST   /                        -- Create organization (on business signup)
GET    /mine                    -- Get current user's org
PATCH  /:id                     -- Update org (name, logo, brand_color)
POST   /:id/invite              -- Invite driver/dispatcher by email or phone
GET    /:id/members             -- List org members
DELETE /:id/members/:userId     -- Remove member
PATCH  /:id/members/:userId/role -- Change member role
```

### Deliveries — `/api/v1/deliveries`

```
POST   /                        -- Create delivery (dispatcher)
GET    /                        -- List deliveries (filtered by status, driver, date)
GET    /:id                     -- Get delivery detail
PATCH  /:id                     -- Update delivery (assign driver, change status, edit details)
DELETE /:id                     -- Cancel delivery
POST   /:id/assign/:driverId   -- Assign driver
POST   /:id/status              -- Update status (picked_up, in_transit, delivered, failed)
GET    /:id/events              -- Get status history timeline
GET    /:id/tracking-link       -- Generate/get customer tracking link
GET    /my-assignments          -- Driver's assigned deliveries
POST   /bulk                    -- Create multiple deliveries at once (CSV import)
```

### Real-Time Tracking — WebSocket `ws://api/tracking`

```
-- DRIVER → SERVER (emits)
location:update        { lat, lng, accuracy, heading, speed, timestamp }
status:update          { status: 'online' | 'offline' | 'on_delivery' }

-- SERVER → DISPATCHER (emits, room: org:{orgId})
driver:location        { driverId, lat, lng, heading, speed, updatedAt }
driver:status          { driverId, status }
delivery:status        { deliveryId, status, driverId }

-- SERVER → CUSTOMER (emits, room: track:{trackingCode})
driver:location        { lat, lng, heading, eta }
delivery:status        { status, timestamp }
eta:update             { minutes, distance }
```

### Trips — `/api/v1/trips`

```
POST   /start                   -- Start new trip (optionally link to delivery)
POST   /:id/pause               -- Pause trip
POST   /:id/resume              -- Resume trip
POST   /:id/end                 -- End trip, triggers path snapping
POST   /:id/points              -- Batch upload GPS points (every 5-10 seconds)
GET    /                        -- List trip history
GET    /:id                     -- Trip detail with path GeoJSON
GET    /:id/geojson             -- Trip path as GeoJSON (for map rendering)
GET    /stats                   -- Aggregate stats (total distance, trips, etc.)
```

### Proof of Delivery — `/api/v1/pod`

```
POST   /                        -- Submit POD (photo + signature + GPS + delivery_id)
GET    /:deliveryId             -- Get POD for a delivery
GET    /:deliveryId/pdf         -- Download POD receipt PDF
POST   /:deliveryId/send        -- Email/SMS receipt to customer
GET    /                        -- List all PODs (filtered by date, driver)
```

### Route Optimization — `/api/v1/routes`

```
POST   /                        -- Create route with stops
POST   /:id/optimize            -- Run TSP optimization (Mapbox Optimization API)
GET    /:id                     -- Get route with stops
PATCH  /:id                     -- Update route (reorder stops manually)
DELETE /:id                     -- Delete route
POST   /:id/assign/:driverId   -- Assign optimized route to driver
GET    /templates               -- List saved route templates
POST   /:id/save-template       -- Save route as reusable template
```

### Customer Tracking — `/api/v1/track` (public, no auth)

```
GET    /:trackingCode           -- Get delivery status, driver location, ETA, org branding
                                -- Returns: { delivery, driverLocation, eta, branding }
```

Plus the WebSocket room `track:{trackingCode}` described above.

### Transactions — `/api/v1/transactions`

```
POST   /                        -- Create transaction (from transcribed audio)
GET    /                        -- List transactions (filter: date, type, customer)
GET    /:id                     -- Single transaction
DELETE /:id                     -- Delete transaction
GET    /summary                 -- Totals: credits, debts, net (by date range)
GET    /dates                   -- List dates that have transactions (for sidebar)
```

### Audio Processing — `/api/v1/audio`

```
POST   /process                 -- Upload WAV, get transcription + parsed transaction
                                -- Accepts: multipart/form-data (audio file + language)
                                -- Returns: { transcript, transaction, audioResponse }
```

### Notifications — `/api/v1/notifications`

```
GET    /                        -- List in-app notifications for current user
PATCH  /:id/read                -- Mark as read
POST   /read-all                -- Mark all as read
GET    /unread-count             -- Get unread count (for badge)
```

### Analytics — `/api/v1/analytics`

```
GET    /dashboard               -- KPIs: deliveries, on-time rate, avg time, distance
GET    /deliveries/chart        -- Deliveries over time (daily/weekly)
GET    /deliveries/breakdown    -- Status breakdown (pie chart data)
GET    /drivers/performance     -- Per-driver performance comparison
GET    /drivers/leaderboard     -- Ranked by deliveries, on-time rate
GET    /routes/savings          -- Route optimization savings over time
GET    /peak-hours              -- Deliveries by day-of-week × hour heatmap
```

### Billing — `/api/v1/billing`

```
GET    /plan                    -- Current plan and usage
GET    /usage                   -- Current period usage breakdown
POST   /subscribe               -- Subscribe to plan (Paystack checkout)
POST   /webhook/paystack        -- Paystack webhook receiver
PATCH  /plan                    -- Change plan
GET    /invoices                -- List past invoices
```

---

## Real-Time Architecture (The Critical Path)

This is the heart of the product. Here's how live tracking works end-to-end:

```
┌──────────┐     WebSocket      ┌───────────────┐     Redis Pub/Sub     ┌──────────────────┐
│  Driver   │ ──location:update──▶  Tracking     │ ──────publish────────▶  Tracking         │
│  Phone    │   (every 3 sec)   │  Gateway       │                      │  Gateway          │
└──────────┘                    │  (ingestion)   │                      │  (fan-out)        │
                                └───────┬────────┘                      └────────┬───────────┘
                                        │                                        │
                                        │ batch write                            ├──▶ Dispatcher dashboard
                                        │ (every 10 sec)                         │    (room: org:{orgId})
                                        ▼                                        │
                                ┌───────────────┐                                ├──▶ Customer tracking page
                                │  PostgreSQL    │                                │    (room: track:{code})
                                │  trip_points   │                                │
                                └───────────────┘                                └──▶ ETA recalculation
                                                                                      (Mapbox Directions)
```

### Key Design Decisions

1. **GPS points are batched** — The driver sends a location every 3 seconds. The server buffers these in Redis and flushes to PostgreSQL every 10 seconds (batch insert). This prevents DB write storms.

2. **Redis Pub/Sub for fan-out** — When a driver location arrives, it's published to a Redis channel. All NestJS instances subscribed to that channel forward it to the right WebSocket rooms. This enables horizontal scaling (multiple server instances).

3. **ETA recalculation is debounced** — We don't call Mapbox Directions API on every GPS ping. ETA recalculates every 30 seconds or when the driver deviates from the expected route, whichever comes first.

4. **Rooms structure:**
   - `org:{orgId}` — all dispatchers in that org see all driver updates
   - `track:{trackingCode}` — specific customer watching a specific delivery
   - `driver:{driverId}` — direct messages to a driver (new assignments, etc.)

---

## Background Job Queues (BullMQ)

These jobs run asynchronously so API responses stay fast:

| Queue | Job | Trigger | What It Does |
|---|---|---|---|
| `audio` | `process-audio` | POST /audio/process | Transcribe WAV → extract transaction → respond |
| `pod` | `generate-pdf` | POD submitted | Resize photo, generate PDF receipt, upload to S3 |
| `pod` | `send-receipt` | PDF generated | Email/SMS receipt to customer |
| `notifications` | `send-push` | Various events | Send FCM push notification |
| `notifications` | `send-email` | Various events | Send email via Resend/SES |
| `notifications` | `send-sms` | Various events | Send SMS via Africa's Talking |
| `routes` | `optimize` | POST /routes/:id/optimize | Call Mapbox Optimization API, save result |
| `trips` | `snap-path` | Trip ended | Call Mapbox Map Matching, update trip path |
| `analytics` | `aggregate` | Cron: every hour | Recompute analytics aggregations |
| `billing` | `usage-tick` | Delivery completed | Increment usage counters |
| `geofence` | `check-arrival` | Driver location update | Check if driver is within 100m of destination |

---

## Proof-of-Delivery Pipeline (Detail)

This is the monetizable feature — it must be tamper-proof.

```
Driver taps "Confirm Delivery"
        │
        ▼
┌─────────────────────────────────┐
│ Client captures simultaneously: │
│  • Photo (JPEG, max 2MB)        │
│  • Signature (PNG from canvas)  │
│  • GPS coordinates + accuracy   │
│  • Device timestamp             │
│  • Delivery ID                  │
└────────────┬────────────────────┘
             │
             ▼  POST /api/v1/pod (multipart/form-data)
┌─────────────────────────────────┐
│ Server validates:               │
│  • Delivery exists & assigned   │
│  • Driver is the assigned one   │
│  • GPS is within 500m of        │
│    delivery destination         │
│  • Server timestamp vs device   │
│    timestamp < 5 min drift      │
└────────────┬────────────────────┘
             │
             ▼  Queue: pod.generate-pdf
┌─────────────────────────────────┐
│ Background job:                 │
│  1. Resize photo (Sharp, 1200px)│
│  2. Upload photo to S3          │
│  3. Upload signature to S3      │
│  4. Generate PDF with:          │
│     • Business logo             │
│     • Delivery details          │
│     • Photo embedded            │
│     • Signature embedded        │
│     • GPS coordinates + map     │
│     • Timestamp                 │
│     • Unique receipt ID         │
│     • QR code linking to verify │
│  5. Upload PDF to S3            │
│  6. Update delivery → delivered │
│  7. Queue receipt send          │
└─────────────────────────────────┘
```

---

## Geofence & Arrival Detection

```typescript
// geofence.service.ts — runs on every driver location update

const ARRIVAL_RADIUS_METERS = 150;

async checkArrival(driverId: string, lat: number, lng: number) {
  // Find active delivery for this driver
  const delivery = await this.prisma.delivery.findFirst({
    where: { driverId, status: 'in_transit' },
  });
  if (!delivery) return;

  // PostGIS distance calculation
  const distance = await this.prisma.$queryRaw`
    SELECT ST_DistanceSphere(
      ST_MakePoint(${lng}, ${lat}),
      ST_MakePoint(${delivery.dropoffLng}, ${delivery.dropoffLat})
    ) as distance
  `;

  if (distance[0].distance <= ARRIVAL_RADIUS_METERS) {
    await this.deliveriesService.updateStatus(delivery.id, 'arriving');
    await this.notificationsService.send(driverId, {
      title: 'You have arrived',
      body: `Deliver to ${delivery.recipientName}. Tap to capture proof of delivery.`,
    });
  }
}
```

---

## Route Optimization Flow

```
Dispatcher adds 5-20 stops
        │
        ▼  POST /api/v1/routes/:id/optimize
┌───────────────────────────────────┐
│ routes.service.ts:                │
│  1. Fetch all stops with coords   │
│  2. Call Mapbox Optimization API  │
│     (Traveling Salesman solver)   │
│     - Max 12 stops per request    │
│     - For >12: split into chunks  │
│       and chain                   │
│  3. Receive optimized order       │
│  4. Calculate distance savings    │
│  5. Save optimized_order to stops │
│  6. Return comparison to client   │
└───────────────────────────────────┘

Response:
{
  "original_distance_km": 47.2,
  "optimized_distance_km": 31.1,
  "saved_km": 16.1,
  "saved_percent": 34,
  "estimated_duration_min": 68,
  "stops": [
    { "order": 1, "address": "...", "lat": ..., "lng": ... },
    { "order": 2, "address": "...", "lat": ..., "lng": ... },
    ...
  ]
}
```

---

## Authentication Flow

```
Register → hash password (bcrypt) → create user → issue tokens
Login    → verify password → issue access token (15min) + refresh token (7d)
Refresh  → verify refresh token → issue new access token
Logout   → revoke refresh token

Access token payload:
{
  sub: "user-uuid",
  email: "...",
  role: "driver" | "dispatcher" | "admin",
  orgId: "org-uuid" | null
}

Guards:
@UseGuards(JwtAuthGuard)              -- require valid access token
@UseGuards(JwtAuthGuard, RolesGuard)  -- require token + specific role
@Roles('dispatcher', 'admin')         -- decorator for RolesGuard
@Public()                             -- skip auth (customer tracking)
```

---

## Environment Variables

```env
# App
PORT=3000
NODE_ENV=production
API_URL=https://api.locusverse.app

# Database
DATABASE_URL=postgresql://user:pass@host:5432/locus?schema=public
REDIS_URL=redis://default:pass@host:6379

# Auth
JWT_SECRET=<random-64-char>
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Storage (S3 or R2)
S3_BUCKET=locusverse-uploads
S3_REGION=us-east-1
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_ENDPOINT=                           # for R2: https://<account>.r2.cloudflarestorage.com

# Mapbox
MAPBOX_ACCESS_TOKEN=
MAPBOX_OPTIMIZATION_API=https://api.mapbox.com/optimized-trips/v1

# Notifications
FCM_PROJECT_ID=
FCM_PRIVATE_KEY=
AFRICAS_TALKING_API_KEY=
AFRICAS_TALKING_USERNAME=
RESEND_API_KEY=

# Payments
PAYSTACK_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=

# Audio processing
WHISPER_API_URL=                        # or keep existing Spitch backend
OPENAI_API_KEY=                         # if using Whisper via OpenAI

# Weather (passed to frontend, but backend may need it too)
OPENWEATHER_API_KEY=
```

---

## Deployment Architecture

```
                    ┌─────────────┐
                    │  Cloudflare  │
                    │  (CDN + DNS) │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
      ┌───────▼────────┐      ┌────────▼──────────┐
      │  Next.js Front │      │  NestJS API        │
      │  (Vercel)      │      │  (Railway/Render)  │
      │                │      │  2+ instances       │
      └────────────────┘      └────────┬───────────┘
                                       │
                        ┌──────────────┼──────────────┐
                        │              │              │
                ┌───────▼──┐   ┌──────▼───┐   ┌─────▼──────┐
                │PostgreSQL │   │  Redis    │   │  S3 / R2   │
                │(Neon/     │   │(Upstash)  │   │(file store)│
                │ Supabase) │   │           │   │            │
                └──────────┘   └──────────┘   └────────────┘
```

### Scaling Notes

- **API servers:** Stateless. Scale horizontally. Redis Pub/Sub syncs WebSocket state across instances.
- **PostgreSQL:** Start with managed Postgres (Neon or Supabase). Partition `trip_points` by month when it gets large.
- **Redis:** Upstash serverless Redis for low-traffic start. Upgrade to dedicated when WebSocket connections exceed 5,000.
- **File storage:** Cloudflare R2 is S3-compatible but has zero egress fees — saves money on POD photo/PDF downloads.

---

## Migration Path from Current Backend

Your current backend (`spitch-hack-backend` on Render) has:
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `GET /api/v1/akawo/transactions`
- `POST /api/v1/akawo/process-audio`
- `DELETE /api/v1/akawo/transactions/:id`

### Migration steps:

1. **Scaffold NestJS project** with the module structure above
2. **Port auth first** — same JWT format so frontend works with both backends during transition
3. **Port transactions** — same endpoints, add the new ones
4. **Port audio processing** — wrap existing Spitch logic or switch to Whisper
5. **Add new modules** one at a time: deliveries → tracking → trips → POD → routes → analytics → billing
6. **Switch frontend API_URL** when ready
7. **Decommission old backend**

Each module is independent — you can ship incrementally. Deliveries + tracking alone are enough to start charging.

---

## Implementation Priority (What to Build First)

```
Phase 1 — Core (Weeks 1-3)          ← Start charging businesses
├── Auth (port from existing)
├── Organizations
├── Deliveries (CRUD + assignment)
├── Real-time tracking (WebSocket)
└── Customer tracking links

Phase 2 — Proof (Weeks 4-5)         ← POD = premium feature
├── Proof of Delivery (photo + signature + PDF)
├── Geofence arrival detection
└── Notifications (push + SMS)

Phase 3 — Optimization (Weeks 6-7)  ← Route optimization = upsell
├── Route optimization (Mapbox)
├── Trip recording (port from frontend service)
└── Analytics dashboard API

Phase 4 — Money (Weeks 8-9)         ← Billing = revenue
├── Billing + Paystack integration
├── Usage tracking
├── Plan enforcement (limits)
└── Voice transactions (port existing)

Phase 5 — Polish (Week 10+)
├── Email notifications (Resend)
├── CSV import/export
├── Route templates
└── API keys for Enterprise
```
