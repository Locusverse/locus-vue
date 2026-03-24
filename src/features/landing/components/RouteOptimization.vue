<script setup lang="ts">
import { useScrollReveal } from '@/shared/composables/useScrollReveal'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const { target, isVisible } = useScrollReveal(0.15)

const benefits = [
  { icon: 'speed', text: '30% faster deliveries on average' },
  { icon: 'local_gas_station', text: '25% reduction in fuel costs' },
  { icon: 'traffic', text: 'Real-time traffic & road condition aware' },
]
</script>

<template>
  <section ref="target" class="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
    <!-- Ambient glow -->
    <div
      class="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
      :class="currentTheme === 'dark' ? 'bg-cyan-500/5' : 'bg-cyan-500/3'"
    />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
        <!-- Visual -->
        <div
          class="relative transition-all duration-1000"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'"
        >
          <div
            class="glass-panel rounded-2xl p-[2px] border"
            :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'"
          >
            <div
              class="rounded-2xl overflow-hidden relative h-64 sm:h-80 lg:h-96"
              :class="currentTheme === 'dark' ? 'bg-zinc-900/90' : 'bg-white/95'"
            >
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
                  :stroke="currentTheme === 'dark' ? '#22d3ee' : '#0891b2'"
                  stroke-width="2.5"
                  class="route-draw-loop"
                  opacity="0.7"
                />

                <!-- Waypoints -->
                <circle cx="40" cy="350" r="5" :fill="currentTheme === 'dark' ? '#6bff8f' : '#059669'" />
                <circle cx="220" cy="200" r="4" :fill="currentTheme === 'dark' ? '#22d3ee' : '#0891b2'" class="animate-dot-pulse" />
                <circle
                  cx="220" cy="200" r="10"
                  fill="none"
                  :stroke="currentTheme === 'dark' ? '#22d3ee' : '#0891b2'"
                  stroke-width="1"
                  class="animate-ping-slow"
                  opacity="0.3"
                />
                <circle cx="460" cy="80" r="6" fill="none" stroke="#f97316" stroke-width="2" />
                <circle cx="460" cy="80" r="2" fill="#f97316" />
              </svg>

              <!-- Labels -->
              <div class="absolute top-4 left-4 glass-panel rounded-lg px-3 py-2 text-[10px] font-medium">
                <span class="text-red-400/50 line-through mr-2">45 min</span>
                <span
                  class="font-bold"
                  :class="currentTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'"
                >
                  28 min
                </span>
              </div>

              <div
                class="absolute bottom-4 right-4 glass-panel rounded-lg px-3 py-2 text-[10px] font-bold"
                :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
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
          <span
            class="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
            :class="currentTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'"
          >
            Route Intelligence
          </span>

          <h2
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-[0.95]"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
          >
            Smarter Routes,<br />
            <span class="text-gradient">Faster Deliveries.</span>
          </h2>

          <p
            class="mt-4 text-sm sm:text-base leading-relaxed max-w-md"
            :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
          >
            Our AI engine processes real-time traffic, weather, and road data to find the optimal path
            for every delivery in your fleet.
          </p>

          <div class="mt-6 sm:mt-8 space-y-4">
            <div
              v-for="(benefit, i) in benefits"
              :key="benefit.text"
              class="flex items-center gap-3 transition-all duration-700"
              :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'"
              :style="{ transitionDelay: `${400 + i * 100}ms` }"
            >
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                :class="currentTheme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-500/8'"
              >
                <span
                  class="material-symbols-outlined text-base"
                  :class="currentTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'"
                >
                  {{ benefit.icon }}
                </span>
              </div>
              <span
                class="text-sm"
                :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'"
              >
                {{ benefit.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
