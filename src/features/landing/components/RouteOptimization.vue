<script setup lang="ts">
import { useScrollReveal } from '@/shared/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal(0.15)

const benefits = [
  { icon: 'speed', text: '30% faster deliveries on average' },
  { icon: 'local_gas_station', text: '25% reduction in fuel costs' },
  { icon: 'traffic', text: 'Real-time traffic & road condition aware' },
]
</script>

<template>
  <section ref="target" class="relative py-28 lg:py-36 overflow-hidden">
    <!-- Ambient glow -->
    <div
      class="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none"
    />

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Visual -->
        <div
          class="relative transition-all duration-1000"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'"
        >
          <div class="glass-panel rounded-2xl p-[2px] border border-white/5">
            <div class="bg-zinc-900/90 rounded-2xl overflow-hidden relative h-72 sm:h-80 lg:h-96">
              <div class="absolute inset-0 hero-grid-bg opacity-40" />

              <svg
                class="absolute inset-0 w-full h-full"
                viewBox="0 0 500 400"
                preserveAspectRatio="none"
              >
                <!-- Unoptimized route (faded) -->
                <path
                  d="M40 350 C 80 300, 120 100, 200 200 S 300 350, 350 150 S 420 300, 460 80"
                  fill="none"
                  stroke="#ef4444"
                  stroke-width="1.5"
                  stroke-dasharray="4 4"
                  opacity="0.2"
                />

                <!-- Optimized route -->
                <path
                  d="M40 350 C 100 280, 150 180, 220 200 S 340 120, 460 80"
                  fill="none"
                  stroke="#22d3ee"
                  stroke-width="2.5"
                  class="route-draw-loop"
                  opacity="0.7"
                />

                <!-- Waypoints -->
                <circle cx="40" cy="350" r="5" fill="#6bff8f" />
                <circle cx="220" cy="200" r="4" fill="#22d3ee" class="animate-dot-pulse" />
                <circle
                  cx="220"
                  cy="200"
                  r="10"
                  fill="none"
                  stroke="#22d3ee"
                  stroke-width="1"
                  class="animate-ping-slow"
                  opacity="0.3"
                />
                <circle cx="460" cy="80" r="6" fill="none" stroke="#f97316" stroke-width="2" />
                <circle cx="460" cy="80" r="2" fill="#f97316" />
              </svg>

              <!-- Labels -->
              <div
                class="absolute top-4 left-4 glass-panel rounded-lg px-3 py-2 text-[10px] font-medium"
              >
                <span class="text-red-400/50 line-through mr-2">45 min</span>
                <span class="text-cyan-400 font-bold">28 min</span>
              </div>

              <div
                class="absolute bottom-4 right-4 glass-panel rounded-lg px-3 py-2 text-[10px] text-emerald-400 font-bold"
              >
                -38% fuel saved
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div
          class="transition-all duration-1000 delay-200"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
        >
          <span class="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-4">
            Route Intelligence
          </span>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white leading-[0.95]">
            Smarter Routes,<br />
            <span class="text-gradient">Faster Deliveries.</span>
          </h2>

          <p class="mt-4 text-zinc-500 text-base leading-relaxed max-w-md">
            Our AI engine processes real-time traffic, weather, and road data to find the optimal path
            for every delivery in your fleet.
          </p>

          <div class="mt-8 space-y-4">
            <div
              v-for="(benefit, i) in benefits"
              :key="benefit.text"
              class="flex items-center gap-3 transition-all duration-700"
              :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'"
              :style="{ transitionDelay: `${400 + i * 100}ms` }"
            >
              <div
                class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0"
              >
                <span class="material-symbols-outlined text-base text-cyan-400">
                  {{ benefit.icon }}
                </span>
              </div>
              <span class="text-sm text-zinc-400">{{ benefit.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
