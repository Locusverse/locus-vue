<script setup lang="ts">
import { useScrollReveal } from '@/shared/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal(0.1)

const features = [
  {
    title: 'Live GPS Tracking',
    description: 'See every driver in real time. Sub-200ms updates across Lagos, Accra, and Nairobi.',
    icon: 'my_location',
    accent: 'emerald',
    large: true,
  },
  {
    title: 'Route Optimization',
    description: 'AI finds the fastest path through traffic, fuel stops, and road conditions.',
    icon: 'route',
    accent: 'cyan',
    large: false,
  },
  {
    title: 'Fleet Management',
    description: 'Onboard drivers, assign vehicles, and manage zones — all from one dashboard.',
    icon: 'groups',
    accent: 'violet',
    large: false,
  },
  {
    title: 'Proof of Delivery',
    description: 'Photo, signature, and GPS stamp — immutable proof for every drop-off.',
    icon: 'verified',
    accent: 'amber',
    large: false,
  },
  {
    title: 'Customer Links',
    description: 'One-tap tracking links. Customers see ETA, driver location, and live updates.',
    icon: 'link',
    accent: 'rose',
    large: false,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Fleet-wide insights. Delivery trends, driver scores, and cost breakdowns.',
    icon: 'analytics',
    accent: 'blue',
    large: false,
  },
]

function accentClasses(accent: string, type: 'border' | 'icon' | 'glow') {
  const map: Record<string, Record<string, string>> = {
    emerald: { border: 'group-hover:border-emerald-500/30', icon: 'text-emerald-400', glow: 'bg-emerald-500/20' },
    cyan: { border: 'group-hover:border-cyan-500/30', icon: 'text-cyan-400', glow: 'bg-cyan-500/20' },
    violet: { border: 'group-hover:border-violet-500/30', icon: 'text-violet-400', glow: 'bg-violet-500/20' },
    amber: { border: 'group-hover:border-amber-500/30', icon: 'text-amber-400', glow: 'bg-amber-500/20' },
    rose: { border: 'group-hover:border-rose-500/30', icon: 'text-rose-400', glow: 'bg-rose-500/20' },
    blue: { border: 'group-hover:border-blue-500/30', icon: 'text-blue-400', glow: 'bg-blue-500/20' },
  }
  return map[accent]?.[type] ?? ''
}
</script>

<template>
  <section id="features" ref="target" class="relative py-28 lg:py-36">
    <!-- Background glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-[200px] pointer-events-none"
    />

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Section Header -->
      <div
        class="text-center mb-16 lg:mb-20 transition-all duration-1000"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <span
          class="inline-block text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-4"
        >
          Everything you need
        </span>
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white">
          One Platform.<br />
          <span class="text-gradient">Every Mile.</span>
        </h2>
        <p class="mt-4 text-zinc-500 text-lg max-w-xl mx-auto">
          Six powerful modules working together to make every delivery faster, safer, and smarter.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="group bento-card glass-panel rounded-2xl p-6 lg:p-8 border border-white/5 relative overflow-hidden transition-all duration-700"
          :class="[
            feature.large ? 'md:col-span-2 lg:col-span-2' : '',
            accentClasses(feature.accent, 'border'),
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          ]"
          :style="{ transitionDelay: `${200 + i * 100}ms` }"
        >
          <!-- Corner glow on hover -->
          <div
            class="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            :class="accentClasses(feature.accent, 'glow')"
          />

          <!-- Icon -->
          <div class="relative z-10">
            <div
              class="w-12 h-12 rounded-xl glass-panel flex items-center justify-center mb-5 border border-white/5"
            >
              <span
                class="material-symbols-outlined text-2xl"
                :class="accentClasses(feature.accent, 'icon')"
              >
                {{ feature.icon }}
              </span>
            </div>

            <h3 class="text-xl font-bold text-white mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-zinc-500 leading-relaxed max-w-md">
              {{ feature.description }}
            </p>
          </div>

          <!-- Large card: animated visual -->
          <div
            v-if="feature.large"
            class="mt-6 relative h-32 sm:h-40 rounded-xl overflow-hidden glass-panel border border-white/5"
          >
            <div class="absolute inset-0 hero-grid-bg opacity-40" />
            <svg class="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <!-- Live route -->
              <path
                d="M30 160 C 100 120, 180 40, 280 100 S 450 30, 570 80"
                fill="none"
                stroke="#6bff8f"
                stroke-width="2"
                class="route-draw-loop"
                opacity="0.5"
              />
              <!-- Driver dots -->
              <circle cx="280" cy="100" r="4" fill="#6bff8f" class="animate-dot-pulse" />
              <circle
                cx="280"
                cy="100"
                r="10"
                fill="none"
                stroke="#6bff8f"
                stroke-width="1"
                class="animate-ping-slow"
                opacity="0.4"
              />
              <circle
                cx="450"
                cy="55"
                r="3"
                fill="#22d3ee"
                class="animate-dot-pulse"
                style="animation-delay: 0.5s"
              />
              <circle
                cx="120"
                cy="90"
                r="3"
                fill="#6bff8f"
                class="animate-dot-pulse"
                style="animation-delay: 1s"
              />
              <!-- Destination -->
              <circle cx="570" cy="80" r="5" fill="none" stroke="#f97316" stroke-width="1.5" />
              <circle cx="570" cy="80" r="2" fill="#f97316" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
