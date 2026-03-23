# Locus Vue — Claude Code Rules

## Project Overview

Locus (Locusverse) is a delivery operations PWA for African markets. Vue 3 + TypeScript frontend with NestJS backend (separate repo). This repo is the **frontend only**.

## Golden Rule

**Every file, folder, component, and function must have a clear architectural reason to exist.** No dumping files in flat directories. No "utils" junk drawers. No shortcuts that trade structure for speed.

---

## Tech Stack

- **Framework:** Vue 3 (Composition API + `<script setup>` only — no Options API)
- **Language:** TypeScript (strict mode, no `any` unless explicitly unavoidable)
- **State:** Pinia (modular stores)
- **Routing:** Vue Router 5
- **Build:** Vite 7
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Linting:** ESLint + OxLint + Prettier
- **Styling:** (TBD — but all styles must be scoped or use CSS modules)

---

## File Structure (Mandatory)

```
src/
├── app/                          # App shell — things that wrap the entire app
│   ├── App.vue                   # Root component
│   ├── router.ts                 # Router instance + route definitions
│   └── main.ts                   # App bootstrap (createApp, plugins)
│
├── features/                     # Feature modules — the heart of the app
│   ├── auth/                     # Authentication feature
│   │   ├── components/           # Auth-specific components (LoginForm, RegisterForm)
│   │   ├── composables/          # Auth-specific composables (useAuth, useSession)
│   │   ├── stores/               # Auth Pinia store (auth.store.ts)
│   │   ├── types/                # Auth types/interfaces (auth.types.ts)
│   │   ├── services/             # Auth API calls (auth.service.ts)
│   │   └── views/                # Route-level pages (LoginView, RegisterView)
│   │
│   ├── dashboard/                # Dispatcher dashboard feature
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── tracking/                 # Live tracking (driver + customer views)
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── deliveries/               # Delivery management
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── trips/                    # Trip recording + history
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── pod/                      # Proof of delivery (camera, signature)
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── voice/                    # Voice transaction logging
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── routes/                   # Route optimization
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── analytics/                # Analytics dashboard
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── drivers/                  # Driver management (dispatcher side)
│   │   ├── components/
│   │   ├── composables/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── services/
│   │   └── views/
│   │
│   ├── landing/                  # Public marketing landing page
│   │   ├── components/
│   │   └── views/
│   │
│   └── settings/                 # User/org settings
│       ├── components/
│       ├── composables/
│       ├── stores/
│       ├── types/
│       ├── services/
│       └── views/
│
├── shared/                       # Cross-feature shared code (NOT a dumping ground)
│   ├── components/               # Truly reusable UI (buttons, modals, inputs, map)
│   │   ├── ui/                   # Atomic UI primitives (AppButton, AppInput, AppModal)
│   │   ├── layout/               # Layout shells (AppSidebar, AppTopBar, AppBottomNav)
│   │   └── map/                  # Map components (BaseMap, DriverMarker, RouteLayer)
│   ├── composables/              # Cross-feature composables (useApi, useGeolocation, useWebSocket)
│   ├── services/                 # Cross-feature services (http.service.ts, websocket.service.ts)
│   ├── types/                    # Shared types (api.types.ts, user.types.ts, geo.types.ts)
│   ├── constants/                # App-wide constants (api endpoints, map config, roles)
│   └── utils/                    # Pure utility functions ONLY (formatCurrency, formatDate, validators)
│
├── assets/                       # Static assets
│   ├── styles/                   # Global CSS (variables, resets, typography)
│   ├── icons/                    # SVG icons
│   └── images/                   # Static images
│
└── plugins/                      # Vue plugin configs (pinia, router guards, i18n)
```

### File Structure Rules

1. **Feature-first organization.** Code lives in the feature it belongs to. If a component is only used in `deliveries/`, it goes in `deliveries/components/`, not `shared/`.
2. **`shared/` is earned, not default.** A piece of code moves to `shared/` only when it is used by 2+ features. Never start by putting something in `shared/`.
3. **No barrel exports (index.ts re-exports) unless a folder has 4+ public exports.** Premature barrel files add indirection for no benefit.
4. **One component per file.** No multi-component `.vue` files.
5. **Views are route-level only.** A `views/` folder contains only components that are directly mounted by a route. Everything else goes in `components/`.
6. **Naming conventions:**
   - Vue components: `PascalCase.vue` (e.g., `DeliveryCard.vue`, `LoginForm.vue`)
   - Composables: `use*.ts` (e.g., `useAuth.ts`, `useDeliveries.ts`)
   - Stores: `*.store.ts` (e.g., `auth.store.ts`, `deliveries.store.ts`)
   - Services: `*.service.ts` (e.g., `auth.service.ts`, `http.service.ts`)
   - Types: `*.types.ts` (e.g., `auth.types.ts`, `delivery.types.ts`)
   - Constants: `*.constants.ts`
   - Utils: `*.util.ts` (e.g., `currency.util.ts`)
7. **No god files.** If a file exceeds ~300 lines, it needs to be split. Composables should be focused on one concern.
8. **Tests live next to the code they test.** `DeliveryCard.vue` → `DeliveryCard.spec.ts` in the same directory.

---

## Component Architecture Rules

1. **`<script setup lang="ts">` only.** No Options API. No `defineComponent()`. No `<script>` without `setup`.
2. **Props must be typed with `defineProps<T>()`.** No runtime prop validation objects.
3. **Emits must be typed with `defineEmits<T>()`.**
4. **Components must be single-responsibility.** A component either displays data OR handles interaction logic — not both in a complex way. Extract composables for complex logic.
5. **Scoped styles or CSS modules only.** No unscoped `<style>` blocks except in `App.vue`.
6. **Prefix shared UI components with `App`.** `AppButton`, `AppInput`, `AppModal`, `AppCard`. This avoids collisions and makes shared components instantly identifiable.
7. **Template refs must be typed.** `const el = ref<HTMLDivElement | null>(null)`.

---

## State Management (Pinia) Rules

1. **One store per feature domain.** `auth.store.ts`, `deliveries.store.ts`, `tracking.store.ts`.
2. **Setup stores syntax only** (function-based, not object-based). This keeps consistency with Composition API.
3. **Stores never call other stores directly.** If feature A needs data from feature B, the composable or view that uses both stores coordinates them.
4. **API calls do NOT live in stores.** Stores hold state and mutations. API calls live in `*.service.ts` files. Stores call services.
5. **Store state must be typed.** Define interfaces for all store state in the feature's `types/` folder.

---

## API / Service Layer Rules

1. **All HTTP calls go through a centralized `http.service.ts`** in `shared/services/`. This wraps fetch/axios with auth headers, base URL, error handling.
2. **Feature services are thin wrappers.** `auth.service.ts` calls `httpService.post('/auth/login', data)` — it does not construct headers or handle tokens.
3. **API response types must be defined.** No `any` responses. Define request/response types in the feature's `types/` folder.
4. **WebSocket connections use a centralized `websocket.service.ts`** in `shared/services/`.

---

## Routing Rules

1. **Routes are defined per-feature** and imported into `app/router.ts`. Each feature exports its route config from a `*.routes.ts` file if it has routes.
2. **Lazy-load all views.** `component: () => import('@/features/auth/views/LoginView.vue')`.
3. **Route guards live in `plugins/` or feature-level `composables/`.** Not inline in route definitions.
4. **Route names must be namespaced.** `auth:login`, `dashboard:live-map`, `deliveries:list`.

---

## TypeScript Rules

1. **Strict mode. No `any`.** If you truly cannot type something, use `unknown` and narrow.
2. **Interfaces for object shapes, types for unions/intersections.**
3. **Enums are forbidden.** Use `as const` objects or union types instead.
4. **No non-null assertions (`!`).** Handle null/undefined explicitly.
5. **Import types with `import type` when importing only types.**

---

## Testing Rules

1. **Unit tests (Vitest):** Test composables, stores, services, and utility functions. Test components only when they have meaningful logic.
2. **E2E tests (Playwright):** Test complete user flows (login → create delivery → track → POD).
3. **Test files live next to source files**, not in a separate `__tests__/` tree.
4. **Name test files `*.spec.ts`.**

---

## Git Conventions

- **Commit messages:** imperative mood, lowercase, max 72 chars. Example: `add delivery assignment modal` not `Added the delivery assignment modal component`
- **Branch naming:** `feature/delivery-management`, `fix/auth-token-refresh`, `refactor/store-setup-syntax`

---

## What NOT to Do

- **Do NOT use Options API or `defineComponent()`.** Ever.
- **Do NOT use `any`.** Ever.
- **Do NOT create flat component directories** with 30+ components in one folder.
- **Do NOT put business logic in components.** Extract to composables or services.
- **Do NOT import from `../../../shared/`.** Use the `@/` alias.
- **Do NOT create "helper" or "misc" files.** Name things by what they do.
- **Do NOT mix concerns in a single file.** API calls, state, and UI are separate layers.
- **Do NOT add packages without justification.** Every dependency must solve a real, current problem.
