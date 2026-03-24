<script setup lang="ts">
import { useScrollReveal } from '@/shared/composables/useScrollReveal'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const { target, isVisible } = useScrollReveal(0.05)

const features = [
  {
    icon: 'my_location',
    title: 'Live GPS Tracking',
    subtitle: 'Real-time visibility across every city',
    description:
      'Track every vehicle in your fleet with sub-200ms position updates. Built for African road networks with offline resilience — drivers stay visible even when connectivity drops.',
    bullets: [
      'Sub-200ms GPS updates across Lagos, Accra, Nairobi, and 30+ cities',
      'Offline-first architecture — queues updates during connectivity gaps',
      'Multi-layer map with traffic, weather, and road condition overlays',
      'Geofence alerts for zones, warehouses, and customer locations',
    ],
    accent: 'emerald',
  },
  {
    icon: 'route',
    title: 'AI Route Optimization',
    subtitle: 'The fastest path through chaos',
    description:
      'Our routing engine ingests live traffic data, fuel station locations, and historical road conditions to find the optimal route — not just the shortest one. Built specifically for African road networks.',
    bullets: [
      'Traffic-aware routing with real-time congestion data',
      'Multi-stop optimization — reorders deliveries for minimum time and fuel',
      'Learns from historical patterns — rush hour, market days, road closures',
      'Saves fleets an average of 23% on fuel costs',
    ],
    accent: 'cyan',
  },
  {
    icon: 'groups',
    title: 'Fleet Management',
    subtitle: 'Your entire operation in one view',
    description:
      'Onboard drivers in minutes with just a phone number. Assign vehicles, define delivery zones, and manage shifts — all from a single dashboard that works on desktop and mobile.',
    bullets: [
      'Driver onboarding via SMS — no app download required for basic tracking',
      'Vehicle assignment with capacity, type, and maintenance tracking',
      'Zone-based operations with custom boundaries and rules',
      'Shift scheduling with availability tracking and auto-assignment',
    ],
    accent: 'violet',
  },
  {
    icon: 'verified',
    title: 'Proof of Delivery',
    subtitle: 'Immutable records for every drop-off',
    description:
      'Capture photo, e-signature, and GPS coordinates at the moment of delivery. Every record is timestamped and tamper-proof — giving you and your customers complete confidence.',
    bullets: [
      'Photo capture with automatic GPS tagging and timestamp',
      'Electronic signature pad optimized for mobile screens',
      'Offline POD — captures and syncs when connectivity returns',
      'Dispute resolution dashboard with full delivery timeline',
    ],
    accent: 'amber',
  },
  {
    icon: 'link',
    title: 'Customer Tracking Links',
    subtitle: 'Keep customers in the loop, effortlessly',
    description:
      'Generate one-tap tracking links that customers can open in any browser — no app needed. They see live driver location, accurate ETA, and driver details. Integrates with WhatsApp for proactive updates.',
    bullets: [
      'Branded tracking pages with your logo and colors',
      'Live ETA with traffic-adjusted predictions',
      'WhatsApp and SMS notifications at key delivery milestones',
      'Customer feedback collection at delivery completion',
    ],
    accent: 'rose',
  },
  {
    icon: 'analytics',
    title: 'Analytics Dashboard',
    subtitle: 'Turn delivery data into decisions',
    description:
      'Comprehensive analytics covering delivery performance, driver efficiency, cost breakdowns, and customer satisfaction. Spot trends before they become problems.',
    bullets: [
      'Real-time KPIs: on-time rate, average delivery time, cost per delivery',
      'Driver scorecards with performance rankings and improvement tracking',
      'Cost analysis by zone, vehicle type, and time period',
      'Exportable reports for stakeholders and investors',
    ],
    accent: 'blue',
  },
]

function accentColor(accent: string, element: 'icon' | 'badge' | 'bullet' | 'border'): string {
  const map: Record<string, Record<string, string>> = {
    emerald: {
      icon: 'text-emerald-400',
      badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      bullet: 'bg-emerald-500',
      border: 'border-emerald-500/20',
    },
    cyan: {
      icon: 'text-cyan-400',
      badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      bullet: 'bg-cyan-500',
      border: 'border-cyan-500/20',
    },
    violet: {
      icon: 'text-violet-400',
      badge: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
      bullet: 'bg-violet-500',
      border: 'border-violet-500/20',
    },
    amber: {
      icon: 'text-amber-400',
      badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      bullet: 'bg-amber-500',
      border: 'border-amber-500/20',
    },
    rose: {
      icon: 'text-rose-400',
      badge: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      bullet: 'bg-rose-500',
      border: 'border-rose-500/20',
    },
    blue: {
      icon: 'text-blue-400',
      badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      bullet: 'bg-blue-500',
      border: 'border-blue-500/20',
    },
  }
  return map[accent]?.[element] ?? ''
}
</script>

<template>
  <section ref="target" class="relative py-20 sm:py-28 lg:py-36">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div
        class="text-center mb-16 sm:mb-20 lg:mb-28 transition-all duration-1000"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <span
          class="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
          :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
        >
          Platform deep dive
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter"
          :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          Built for the<br />
          <span class="text-gradient">Last Mile.</span>
        </h2>
        <p
          class="mt-4 text-base sm:text-lg max-w-2xl mx-auto"
          :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
        >
          Every module is designed for Africa's unique logistics challenges — unreliable
          connectivity, complex road networks, and fast-growing demand.
        </p>
      </div>

      <!-- Feature Rows -->
      <div class="space-y-20 sm:space-y-28 lg:space-y-36">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-1000"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          :style="{ transitionDelay: `${300 + i * 100}ms` }"
        >
          <!-- Text Content -->
          <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
            <!-- Badge -->
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase mb-5"
              :class="accentColor(feature.accent, 'badge')"
            >
              <span class="material-symbols-outlined text-sm" :class="accentColor(feature.accent, 'icon')">
                {{ feature.icon }}
              </span>
              {{ feature.title }}
            </div>

            <h3
              class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3"
              :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
            >
              {{ feature.subtitle }}
            </h3>

            <p
              class="text-sm sm:text-base leading-relaxed mb-6"
              :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
            >
              {{ feature.description }}
            </p>

            <!-- Bullets -->
            <ul class="space-y-3">
              <li
                v-for="bullet in feature.bullets"
                :key="bullet"
                class="flex items-start gap-3 text-sm"
                :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  :class="accentColor(feature.accent, 'bullet')"
                />
                {{ bullet }}
              </li>
            </ul>
          </div>

          <!-- Visual Card -->
          <div :class="i % 2 === 1 ? 'lg:order-1' : ''">
            <div
              class="relative rounded-2xl glass-panel border overflow-hidden p-6 sm:p-8"
              :class="[
                currentTheme === 'dark' ? 'border-white/5' : 'border-black/5',
                accentColor(feature.accent, 'border'),
              ]"
            >
              <!-- Background grid -->
              <div class="absolute inset-0 hero-grid-bg opacity-30" />

              <!-- Feature visual -->
              <div class="relative z-10 space-y-4">
                <!-- Icon block -->
                <div
                  class="w-16 h-16 rounded-2xl glass-panel border flex items-center justify-center"
                  :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'"
                >
                  <span
                    class="material-symbols-outlined text-3xl"
                    :class="accentColor(feature.accent, 'icon')"
                  >
                    {{ feature.icon }}
                  </span>
                </div>

                <!-- Mock metric bars -->
                <div class="space-y-3 pt-2">
                  <div v-for="j in 3" :key="j" class="space-y-1.5">
                    <div class="flex justify-between">
                      <div
                        class="h-2 rounded-full"
                        :class="currentTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'"
                        :style="{ width: `${60 + j * 10}px` }"
                      />
                      <div
                        class="h-2 rounded-full"
                        :class="currentTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'"
                        :style="{ width: '32px' }"
                      />
                    </div>
                    <div class="h-2 rounded-full overflow-hidden" :class="currentTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'">
                      <div
                        class="h-full rounded-full transition-all duration-1000"
                        :class="accentColor(feature.accent, 'bullet')"
                        :style="{
                          width: isVisible ? `${55 + j * 15}%` : '0%',
                          opacity: 0.6,
                          transitionDelay: `${800 + i * 200 + j * 200}ms`,
                        }"
                      />
                    </div>
                  </div>
                </div>

                <!-- Mock stat row -->
                <div
                  class="flex gap-4 pt-3 border-t"
                  :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'"
                >
                  <div v-for="k in 3" :key="k" class="flex-1">
                    <div
                      class="text-lg sm:text-xl font-extrabold tracking-tight"
                      :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
                    >
                      {{ k === 1 ? '98%' : k === 2 ? '2.4s' : '↑ 31%' }}
                    </div>
                    <div
                      class="text-[9px] uppercase tracking-wider font-medium"
                      :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
                    >
                      {{ k === 1 ? 'Accuracy' : k === 2 ? 'Avg Latency' : 'This Month' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
