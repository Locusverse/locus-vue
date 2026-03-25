# Locus — Full Application Design Specification

> **Purpose of this document:** Provide a complete description of the Locus application — every screen, feature, and user flow — so a design tool can generate UI designs for the **Landing Page**, **Web Dashboard**, and **Mobile App** views.

---

## Brand Identity

- **Name:** Locusverse (short: Locus)
- **Tagline:** "Locate, Deliver, Track"
- **Description:** Locus is a delivery operations platform for businesses and drivers in Africa. It combines real-time GPS tracking, trip recording, route optimization, proof-of-delivery, live customer tracking links, and a dispatcher dashboard — all in one PWA.
- **Logo:** come up wth something unique revoling around path movemrnt.
- **Primary Font:** Manrope (geometric sans-serif)
- **Color Palette:**
  - Primary Green: `#22C55E`
  - Dark: `#111827` / `#1F2937`
  - Light Gray: `#F3F4F6`
  - Accent Blue: `#3B82F6`
  - Success/Credit: `#16A34A`
  - Error/Debt: `#DC2626`
  - White: `#FFFFFF`
- **Design Style:** Clean, modern, minimal. Glass-morphism panels over map backgrounds. Rounded corners. Subtle shadows. Mobile-first responsive.

---

## Target Users

| Persona | Description |
|---|---|
| **Driver / Rider** | Delivery personnel using the mobile app to navigate, record trips, and capture proof-of-delivery |
| **Dispatcher** | Operations manager at a logistics company assigning deliveries, monitoring drivers in real time, reviewing completed trips |
| **Business Owner** | Small-to-medium business owner viewing delivery analytics, managing drivers, controlling costs |
| **Customer** | End recipient of a delivery who receives a live tracking link and proof-of-delivery receipt |

---

## 1. Landing Page (Marketing / Public)

### Purpose
Convert visitors into signups. Show what Locus does, who it's for, and why it's better.

### Sections (top to bottom)

#### 1.1 Hero Section
- **Background:** Full-bleed animated map showing a delivery route being drawn in real time (green line snapping to roads) with a pulsing driver dot moving along it
- **Overlay content (centered):**
  - Locus logo (green rounded square with white "L")
  - Headline: **"Delivery operations, simplified."**
  - Subheadline: "Real-time tracking. Proof of delivery. Route optimization. One platform for drivers, dispatchers, and customers."
  - Two CTA buttons:
    - **"Start Free"** (solid green, large) → goes to /register
    - **"Watch Demo"** (outline white) → scrolls to demo video or opens modal
  - Below CTAs: small trust badge row — "Used by 200+ delivery teams across Lagos, Accra, Nairobi"

#### 1.2 Product Overview Strip
- Horizontal scrolling row of 5 feature cards (icon + short label + one-liner):
  1. **Live Tracking** — "See every driver on a live map, in real time"
  2. **Proof of Delivery** — "GPS-stamped photos and e-signatures"
  3. **Route Optimization** — "Fastest route through 20+ stops"
  4. **Customer Links** — "Share a live tracking page, no app install"

#### 1.3 "How It Works" — 3-Step Visual
Three columns (or stacked on mobile) with illustrations:
1. **Plan** — Dispatcher adds stops, Locus optimizes the route
2. **Deliver** — Driver follows the route, GPS records everything, customer watches live
3. **Confirm** — Driver captures photo + signature, receipt auto-generated, business gets analytics

#### 1.4 Feature Deep-Dives (alternating left-right layout)

**Section A: Live Driver Tracking**
- Left: screenshot/mockup of dispatcher dashboard showing multiple driver dots on a map
- Right: text — "See where every driver is, right now. Assign deliveries from a live map. Get alerts when drivers go off-route or are running late."

**Section B: Proof-of-Delivery**
- Right: mockup of a driver's phone showing camera capture with GPS overlay and signature pad
- Left: text — "Tamper-proof delivery receipts. Photo + GPS coordinates + timestamp + e-signature. Auto-generated PDF sent to customer and business. Built for compliance — pharma, legal, food safety."

**Section C: Customer Tracking Links**
- Left: mockup of a customer's phone browser showing a branded tracking page with moving driver dot, ETA, and business logo
- Right: text — "One-tap share link. Your customer watches their delivery arrive in real time. No app install. Branded with your logo. This alone replaces $500+/month tools."

**Section D: Route Optimization**
- Right: mockup of a route with numbered stops reordered on a map, showing "Before: 47km" crossed out and "After: 31km" in green
- Left: text — "Input up to 20 stops. Locus returns the fastest route. Drivers save fuel and time. End-of-day summary: 'You saved 12km and 40 minutes today.'"

#### 1.5 Pricing Section
- **Heading:** "Simple pricing. Pay as you grow."
- Three pricing cards:

| Plan | Price | Includes |
|---|---|---|
| **Starter** | Free | 1 driver, 50 deliveries/month, basic tracking |
| **Business** | ₦25,000/month | Up to 10 drivers, unlimited deliveries, POD, customer links, route optimization, dispatcher dashboard |
| **Enterprise** | Custom | Unlimited drivers, API access, custom branding, SLA, dedicated support |

- Each card has a green "Get Started" button

#### 1.6 Testimonial / Social Proof
- 2-3 quote cards from delivery businesses:
  - "We replaced three different apps with Locus." — Courier company, Lagos
  - "The customer tracking link alone reduced our 'where is my delivery' calls by 80%." — E-commerce store, Accra
  - "Route optimization alone saves our riders 30 minutes daily." — Food delivery, Ibadan

#### 1.7 Footer
- Locus logo + tagline
- Links: Product, Pricing, About, Blog, Contact, Privacy, Terms
- Social icons: Twitter/X, LinkedIn, Instagram
- "Download the App" row with PWA install instructions (works on any phone)
- Copyright: © 2026 Locus. All rights reserved.

---

## 2. Authentication Pages

### 2.1 Register Page (`/register`)
- Split layout:
  - **Left half (desktop only):** Full-height green gradient with Locus logo, tagline, and a subtle animated map pattern
  - **Right half:** White background with registration form
- Form fields:
  - Full name
  - Email address
  - Phone number (with country code selector, default +234 Nigeria)
  - Password (with show/hide toggle)
  - Account type selector: "I'm a Driver" / "I'm a Business"
  - Checkbox: "I agree to Terms of Service and Privacy Policy"
  - Green "Create Account" button (full width)
  - Below: "Already have an account? Log in" link
- On mobile: form is full screen, green accent at top with logo

### 2.2 Login Page (`/login`)
- Same split layout as register
- Form fields:
  - Email address
  - Password (with show/hide toggle)
  - "Forgot password?" link (right-aligned)
  - Green "Log In" button (full width)
  - Below: "Don't have an account? Sign up" link

---

## 3. Driver Mobile App (Primary Mobile Experience)

> The driver app is a PWA optimized for mobile. The map is always the background. UI elements float over the map.

### 3.1 Home / Map View (`/dashboard`)
- **Full-screen interactive map** as background (Mapbox GL with 3D buildings, terrain, adaptive day/night lighting)
- **Top bar (floating, translucent):**
  - Left: hamburger menu icon (opens sidebar)
  - Center: "Locus" branding
  - Right: user avatar circle (tappable → profile)
- **Search bar** (floating below top bar): tap to expand into full search with location suggestions and weather preview for each result
- **Bottom area:**
  - **Trip button** (large, centered): shows "Start Trip" when idle. When active, shows trip stats (duration, distance, speed) and Pause / End buttons

### 3.2 Active Trip View
- Map follows driver location with smooth animation
- **Green line** drawn on map showing the traveled path (road-snapped)
- **Trip stats bar** (floating bottom panel):
  - Duration: `00:14:32`
  - Distance: `4.7 km`
  - Speed: `32 km/h`
  - Avg Speed: `28 km/h`
- **Two action buttons:**
  - Pause (yellow) / Resume (green)
  - End Trip (red)
- If route optimization is active: remaining stops shown as numbered markers on map, next stop highlighted with distance/ETA

### 3.3 Proof-of-Delivery Capture Screen
- Triggered when driver taps "Arrived" at a delivery stop or "End Trip"
- **Full-screen camera view** with overlay:
  - Top: delivery address and recipient name
  - Bottom left: GPS coordinates and timestamp (auto-filled, non-editable)
  - Bottom center: large circular shutter button
  - After photo taken:
    - Photo preview
    - **Signature pad** (finger drawing area with white background and "Sign here" placeholder)
    - **"Confirm Delivery"** green button
    - **"Retake"** gray link
- After confirmation:
  - Success animation (green checkmark)
  - "Receipt sent to [business name]" message
  - Returns to map view

### 3.4 Route Optimization View
- Triggered when driver starts a multi-stop trip
- **Screen layout:**
  - Top: "Optimize Route" heading
  - List of stops (draggable to reorder manually):
    - Each stop shows: address, recipient name, delivery notes
    - Numbered in current order
  - **"Optimize" button** (green): reorders stops for shortest route
  - After optimization:
    - Shows comparison: "Original: 47km → Optimized: 31km (saved 16km)"
    - Map preview showing optimized route
    - **"Start Route"** button → begins navigation with turn-by-turn stops

### 3.5 Sidebar Menu (slides in from left)
- User avatar + name + account type
- Menu items:
  - **Dashboard** (home/map)
  - **My Trips** (trip history list)
  - **Deliveries** (assigned deliveries from dispatcher)
  - **Earnings** (delivery earnings summary)
  - **Settings** (profile, language, notifications)
  - **Help & Support**
  - **Log Out**

### 3.6 Trip History
- List of past trips, sorted by date (newest first)
- Each trip card shows:
  - Date and time
  - Start → End location names
  - Distance and duration
  - Number of stops / deliveries
  - Status: Completed (green) / Cancelled (gray)
- Tap a trip → detailed view with map replay of the route and all POD receipts

### 3.7 Delivery Assignment View
- Shows deliveries assigned by dispatcher
- Each delivery card:
  - Recipient name and address
  - Package description / notes
  - Priority badge (Urgent / Normal)
  - Status: Pending → In Transit → Delivered
  - "Start Navigation" button → opens route on map
  - "Call Customer" button (phone icon)

---

## 4. Customer Live Tracking Page (Public, No Auth)

> This is a branded page customers access via a shared link. No app install needed. Works in any mobile browser.

### URL: `/track/{tracking-id}`

### Layout
- **Full-screen map** showing:
  - Driver's current position (animated green dot with ripple effect)
  - Delivery destination (red pin)
  - Route line between them (green dashed line)
  - Route progress (solid green for completed portion)
- **Top panel (floating, translucent white):**
  - Business logo (left) — customizable by the business
  - "Your delivery is on the way" status text
  - Tracking ID displayed small
- **Bottom panel (floating card):**
  - **Driver info:** name, vehicle type, photo (if available)
  - **ETA:** "Arriving in ~12 minutes" (updates in real time)
  - **Progress bar:** visual representation of delivery progress
  - **Status updates timeline** (vertical):
    - ✅ Order picked up — 2:30 PM
    - ✅ In transit — 2:35 PM
    - 🔵 Arriving soon — ETA 2:47 PM
    - ⬜ Delivered
  - **Contact driver** button (phone icon)
- **Branding footer:** "Powered by Locus" in small gray text (removable on Enterprise plan)

### States
- **Waiting for pickup:** "Driver is heading to pick up your order"
- **In transit:** Map actively tracking, ETA updating
- **Arriving:** "Your driver is nearby!" with green highlight
- **Delivered:** Map shows final location, POD receipt viewable: "Your delivery was completed at 2:47 PM. [View Receipt]"

---

## 5. Dispatcher / Business Web Dashboard

> This is the B2B web interface for logistics companies, accessed on desktop/tablet browsers. It is the control center for managing drivers, deliveries, and analytics.

### 5.1 Dashboard Layout (Desktop)
- **Left sidebar** (dark, 240px wide):
  - Locus logo at top
  - Business name and plan badge (e.g., "Business Plan")
  - Navigation:
    - **Live Map** (default view)
    - **Deliveries**
    - **Drivers**
    - **Route Planner**
    - **Proof of Delivery**
    - **Analytics**
    - **Customer Links**
    - **Settings**
  - Bottom: user avatar, name, "Log Out"
- **Main content area** (right, full remaining width)

### 5.2 Live Map View (Default)
- **Full-width interactive map** showing:
  - All active drivers as colored dots with name labels
  - Color coding: green = on delivery, yellow = idle, red = offline
  - Click a driver dot → popup with: name, current delivery, speed, last update time
  - Delivery destination pins with recipient names
  - Active route lines for each driver
- **Right panel (collapsible, 360px):**
  - **Active Deliveries** list:
    - Each delivery: recipient, address, assigned driver, status, ETA
    - Status pills: Pending (gray), Assigned (blue), In Transit (yellow), Delivered (green), Failed (red)
    - Click a delivery → map zooms to driver + destination
  - **Quick Actions:**
    - "New Delivery" button → opens assignment modal
    - "Optimize All Routes" button
- **Top stats bar** (above map):
  - Active Drivers: 8/12
  - In Transit: 14
  - Delivered Today: 47
  - Average Delivery Time: 34 min
  - Failed: 2

### 5.3 Delivery Management
- **Table view** with columns: ID, Recipient, Address, Driver, Status, Created, ETA, Actions
- **Filters:** Status, Driver, Date range, Priority
- **Search bar** for recipient name or address
- **"+ New Delivery" button** → opens modal:
  - Recipient name
  - Phone number
  - Delivery address (with map pin selector and autocomplete)
  - Package description
  - Priority: Normal / Urgent
  - Assign to driver (dropdown of available drivers)
  - Delivery notes
  - "Create & Assign" button
- **Bulk actions:** Select multiple → Assign to driver, Change priority, Cancel
- Click a delivery row → slide-out detail panel:
  - Full delivery info
  - Timeline of status changes
  - Map showing route
  - POD receipt (if delivered): photo, signature, GPS coordinates, timestamp
  - Customer tracking link (copy button)

### 5.4 Driver Management
- **Grid or list view** of all drivers
- Each driver card:
  - Photo, name, phone, vehicle type
  - Status: Active (green) / Offline (gray) / On Delivery (yellow)
  - Today's stats: deliveries completed, distance traveled, active time
  - Current location (last known)
- Click a driver → detail page:
  - Profile info
  - Performance metrics (deliveries/week, avg delivery time, rating)
  - Trip history with map replays
  - Earnings summary
  - Active/recent deliveries
- **"+ Add Driver"** button → invite via phone number or email

### 5.5 Route Planner
- **Left panel:** stop input list
  - Add stops by typing address (autocomplete) or clicking map
  - Each stop: address, recipient name, time window (optional)
  - Drag to reorder
  - "Add Stop" button at bottom
- **Right panel:** map showing stops as numbered pins
- **"Optimize Route" button** → rearranges stops, shows new route on map
  - Comparison: total distance before vs after, estimated time savings
- **"Assign to Driver" dropdown** → assigns optimized route
- **"Save as Template"** for recurring routes (e.g., daily milk delivery)

### 5.6 Proof-of-Delivery Log
- **Table/grid view** of all completed deliveries with POD
- Each entry shows: delivery ID, recipient, driver, date/time, status
- Click to expand:
  - **Photo** taken at delivery
  - **E-signature** image
  - **GPS coordinates** with mini-map
  - **Timestamp** of delivery
  - **"Download PDF"** button → generates tamper-proof receipt
  - **"Send to Customer"** button → emails/SMS the receipt
- **Filters:** Date range, driver, recipient
- **Export:** CSV or PDF batch download

### 5.7 Analytics Dashboard
- **Date range selector** at top (Today, This Week, This Month, Custom)
- **KPI Cards** (top row):
  - Total Deliveries: 342
  - On-Time Rate: 91%
  - Average Delivery Time: 28 min
  - Total Distance: 4,230 km
  - Fuel Savings (from optimization): 890 km
  - Customer Satisfaction: 4.7/5
- **Charts:**
  - **Deliveries over time** (bar chart, daily/weekly)
  - **Delivery status breakdown** (pie chart: completed, failed, cancelled)
  - **Driver performance comparison** (horizontal bar chart)
  - **Peak delivery hours** (heatmap by day of week × hour)
  - **Route optimization savings** (line chart: km saved per week)
- **Driver leaderboard:** ranked by deliveries completed, on-time rate

### 5.8 Customer Tracking Links Manager
- **List of all generated tracking links**
- Each entry: delivery ID, recipient name, link URL, status (active/expired), views count
- **Branding settings:**
  - Upload business logo
  - Set brand color (applied to tracking page header)
  - Custom message: "Your delivery from [Business Name] is on the way!"
  - Toggle "Powered by Locus" footer (Enterprise only to remove)
- **"Generate Link" button** → for any active delivery

### 5.9 Settings
- **Business Profile:** name, logo, address, contact info
- **Team Management:** invite/remove team members, set roles (Admin, Dispatcher, Viewer)
- **Billing:** current plan, usage, upgrade options, payment method
- **Notifications:** email/SMS alerts for failed deliveries, driver offline, etc.
- **API Keys:** for Enterprise plan, generate API keys for integration
- **Branding:** customer tracking page customization (logo, colors, message)

---

## 6. Mobile Responsive Web Dashboard

> The dispatcher dashboard adapts for tablet and mobile use.

### Tablet (768px–1024px)
- Sidebar collapses to icons only (expandable on tap)
- Map takes full width
- Right panel becomes a bottom sheet (swipe up to see delivery list)
- Stats bar wraps to 2 rows

### Mobile (< 768px)
- Bottom tab navigation replaces sidebar:
  - **Map** | **Deliveries** | **Drivers** | **Analytics** | **More**
- Map is full screen with floating action button for "New Delivery"
- Delivery list is full-screen list view (no table)
- Analytics shows simplified KPI cards + one chart at a time
- Driver management is card-based vertical scroll

---

## 7. Notifications & Alerts

### Driver App
- Push notification when new delivery is assigned
- Alert when approaching delivery destination (geofence)
- Reminder to capture POD when trip ends
- Daily summary: "You completed 8 deliveries and saved 12km today"

### Dispatcher Dashboard
- Real-time toast notifications:
  - "Driver [name] completed delivery #123"
  - "Driver [name] went offline"
  - "Delivery #456 is running 15 min late"
  - "Customer viewed tracking link for #789"
- Alert badges on sidebar items (unread count)
- Email digest: daily/weekly delivery summary

### Customer Tracking Page
- Auto-updating status (no manual refresh needed)
- Browser notification permission request: "Notify me when my delivery arrives"

---

## 8. Key Interaction Patterns

### Map Interactions
- Pinch to zoom, drag to pan, rotate with two fingers
- Tap on driver dot → info popup
- Tap on map → place pin for new delivery address
- Long press → reverse geocode and show address
- Double tap → zoom in
- 3D tilt with two-finger drag up/down

### Delivery Assignment Flow (Dispatcher)
1. Click "New Delivery" → modal opens
2. Type recipient address → autocomplete suggestions appear
3. Select address → pin drops on map preview in modal
4. Fill in details → select driver from dropdown
5. Click "Create & Assign" → delivery appears on map, driver gets notification

### POD Flow (Driver)
1. Arrive at destination → "Capture Delivery" prompt appears
2. Camera opens with GPS overlay
3. Take photo → preview shown
4. Signature pad appears → customer signs with finger
5. "Confirm" → receipt generated, status updated, business notified

---

## 9. Empty States & Onboarding

### First-Time Driver
- Welcome screen: "Welcome to Locus! Let's get you set up."
- Step 1: "Allow location access" (with explanation of why)
- Step 2: "Allow notifications" (with explanation)
- Step 3: "You're ready! Start your first trip."

### First-Time Dispatcher
- Welcome screen: "Welcome to your delivery command center."
- Step 1: "Add your first driver" (invite form)
- Step 2: "Create your first delivery" (guided walkthrough)
- Step 3: "Share a tracking link with your customer"
- Step 4: "Explore analytics after your first delivery"

### Empty Delivery List
- Illustration of a delivery truck with dotted route
- "No deliveries yet. Create your first delivery to get started."
- "New Delivery" button

### Empty Trip History
- Illustration of a map with a path
- "No trips recorded yet. Start a trip to see it here."

---

## 10. PWA / App-Like Behavior

- **Install prompt:** after 3 seconds on first visit, a banner appears: "Add Locus to your home screen for the best experience"
  - iOS: instructions with share icon illustration
  - Android: native "Install" button
- **Standalone mode:** no browser chrome when launched from home screen
- **Splash screen:** green background with white Locus logo
- **Offline support:** cached map tiles, queued data syncs when back online
- **App shortcuts** (long-press app icon):
  - "Start Trip" → starts GPS tracking

---

## 11. Design Specifications for Stitch

### Landing Page
- **Viewport:** design for 1440px desktop width and 390px mobile width
- **Style:** modern SaaS landing page, dark sections alternating with light, green accent color throughout
- **Map animations:** show a stylized/illustrated version of a map with route lines and driver dots
- **Photography style:** if showing people, use African delivery riders and business owners in urban settings

### Web Dashboard
- **Viewport:** design for 1440px desktop, 768px tablet, 390px mobile
- **Style:** clean data dashboard with a large map as the centerpiece, dark sidebar, white content areas
- **Data density:** show realistic Nigerian addresses, Naira amounts (₦), African names

### Mobile App
- **Viewport:** design for 390px × 844px (iPhone 14 / similar Android)
- **Style:** map-first with floating glass-morphism panels, bottom-anchored controls
- **Show:** the map always visible behind translucent UI elements
- **Include safe areas:** top notch/island, bottom home indicator

### Customer Tracking Page
- **Viewport:** 390px mobile (this is primarily viewed on phone)
- **Style:** simple, clean, branded — customer should feel reassured, not overwhelmed
- **Show:** large map with moving driver dot, clear ETA, minimal UI

---

## Summary of All Screens to Design

| # | Screen | Platform | Auth |
|---|--------|----------|------|
| 1 | Landing Page | Desktop + Mobile | Public |
| 2 | Register | Desktop + Mobile | Public |
| 3 | Login | Desktop + Mobile | Public |
| 4 | Driver Home / Map | Mobile | Driver |
| 5 | Active Trip with Stats | Mobile | Driver |
| 6 | Route Optimization (multi-stop) | Mobile | Driver |
| 7 | Proof-of-Delivery Camera | Mobile | Driver |
| 8 | Proof-of-Delivery Signature | Mobile | Driver |
| 9 | Delivery Assignment List | Mobile | Driver |
| 10 | Trip History | Mobile | Driver |
| 11 | Sidebar Menu | Mobile | Driver |
| 12 | Customer Live Tracking Page | Mobile | Public |
| 13 | Customer Delivery Completed | Mobile | Public |
| 14 | Dispatcher Live Map | Desktop | Business |
| 15 | Dispatcher Delivery Management | Desktop | Business |
| 16 | Dispatcher New Delivery Modal | Desktop | Business |
| 17 | Dispatcher Driver Management | Desktop | Business |
| 18 | Dispatcher Route Planner | Desktop | Business |
| 19 | Dispatcher POD Log | Desktop | Business |
| 20 | Dispatcher Analytics | Desktop | Business |
| 21 | Dispatcher Customer Links | Desktop | Business |
| 22 | Dispatcher Settings | Desktop | Business |
| 23 | Mobile Dispatcher (responsive) | Mobile | Business |
| 24 | Onboarding — Driver | Mobile | Driver |
| 25 | Onboarding — Dispatcher | Desktop | Business |
