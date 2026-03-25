<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const entered = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    entered.value = true
  })
})
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    <!-- Ambient Grid Background -->
    <div class="absolute inset-0 hero-grid-bg" />

    <!-- Glow Orbs -->
    <div
      class="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
      :class="currentTheme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-500/10'"
    />
    <div
      class="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
      :class="currentTheme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-500/5'"
    />
    <div
      class="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
      :class="currentTheme === 'dark' ? 'bg-emerald-400/10' : 'bg-emerald-400/5'"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 pt-28 sm:pt-32 pb-8 sm:pb-12">
      <!-- Badge -->
      <div
        class="transition-all duration-1000 delay-100"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <span
          class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass-panel text-xs font-bold tracking-widest uppercase"
          :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
        >
          <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'" />
          Powering 10,000+ deliveries daily
        </span>
      </div>

      <!-- Headline -->
      <h1
        class="mt-6 sm:mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] transition-all duration-1000 delay-200"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <span class="block font-light" :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'">The Future of</span>
        <span class="text-gradient">Delivery Intelligence.</span>
      </h1>

      <!-- Subtitle -->
      <p
        class="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed transition-all duration-1000 delay-300"
        :class="[
          entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-500',
        ]"
      >
        Real-time tracking. Route optimization. Voice-powered logging. One platform for drivers,
        dispatchers, and customers across Africa.
      </p>

      <!-- CTAs -->
      <div
        class="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-[400ms]"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <router-link
          :to="{ name: 'auth:register' }"
          class="group px-8 py-4 font-extrabold rounded-full active:scale-95 transition-all duration-300 inline-block"
          :class="
            currentTheme === 'dark'
              ? 'bg-white text-[#070e1d] hover:shadow-lg hover:shadow-emerald-500/20'
              : 'bg-[#1a1a2e] text-white hover:shadow-lg hover:shadow-emerald-500/10'
          "
        >
          Start Free
          <span
            class="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1"
          >&rarr;</span>
        </router-link>
        <button
          class="px-8 py-4 glass-panel border font-bold rounded-full active:scale-95 transition-all duration-300"
          :class="
            currentTheme === 'dark'
              ? 'border-white/10 text-white hover:bg-white/5'
              : 'border-black/10 text-zinc-800 hover:bg-black/5'
          "
        >
          Watch Demo
        </button>
      </div>
    </div>

    <!-- Floating Dashboard Preview -->
    <div
      class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 perspective-container transition-all duration-1000 delay-500"
      :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
    >
      <div class="dashboard-tilt">
        <!-- Dashboard Frame -->
        <div
          class="glass-panel rounded-2xl p-[2px] shadow-2xl"
          :class="currentTheme === 'dark' ? 'shadow-emerald-500/5 border-white/10' : 'shadow-black/10 border-black/5'"
        >
          <div
            class="rounded-2xl overflow-hidden"
            :class="currentTheme === 'dark' ? 'bg-zinc-900/90' : 'bg-white/95'"
          >
            <!-- Window Chrome -->
            <div
              class="flex items-center gap-2 px-5 py-3.5 border-b"
              :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'"
            >
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full" :class="currentTheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'" />
                <div class="w-2.5 h-2.5 rounded-full" :class="currentTheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'" />
                <div class="w-2.5 h-2.5 rounded-full" :class="currentTheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'" />
              </div>
              <div
                class="text-[10px] mx-auto font-medium tracking-wide"
                :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
              >
                dashboard.locusverse.app
              </div>
            </div>

            <!-- Dashboard Content -->
            <div class="relative h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
              <!-- Map Grid -->
              <div class="absolute inset-0 hero-grid-bg opacity-60" />

              <!-- Animated Route Lines -->
              <svg
                class="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
              >
                <path
                  d="M80 320 C 200 280, 300 120, 450 200 S 700 80, 920 160"
                  fill="none"
                  :stroke="currentTheme === 'dark' ? '#6bff8f' : '#059669'"
                  stroke-width="2"
                  class="route-draw-loop"
                  opacity="0.6"
                />
                <path
                  d="M50 200 C 150 150, 250 300, 400 250 S 600 150, 800 280"
                  fill="none"
                  :stroke="currentTheme === 'dark' ? '#22d3ee' : '#0891b2'"
                  stroke-width="1.5"
                  class="route-draw-loop"
                  opacity="0.3"
                  style="animation-delay: 0.5s"
                />

                <circle cx="450" cy="200" r="5" :fill="currentTheme === 'dark' ? '#6bff8f' : '#059669'" class="animate-dot-pulse" />
                <circle
                  cx="450" cy="200" r="12"
                  fill="none"
                  :stroke="currentTheme === 'dark' ? '#6bff8f' : '#059669'"
                  stroke-width="1"
                  class="animate-ping-slow"
                  opacity="0.4"
                />

                <circle cx="800" cy="280" r="4" :fill="currentTheme === 'dark' ? '#22d3ee' : '#0891b2'" class="animate-dot-pulse" style="animation-delay: 0.7s" />
                <circle cx="200" cy="260" r="4" :fill="currentTheme === 'dark' ? '#6bff8f' : '#059669'" class="animate-dot-pulse" style="animation-delay: 1.2s" />

                <circle cx="920" cy="160" r="6" fill="none" stroke="#f97316" stroke-width="2" />
                <circle cx="920" cy="160" r="2" fill="#f97316" />
              </svg>

              <!-- Floating Stat Cards -->
              <div
                class="absolute top-3 left-3 sm:top-6 sm:left-6 glass-panel rounded-xl p-2.5 sm:p-4 animate-float-slow"
              >
                <div
                  class="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest"
                  :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
                >
                  Active Drivers
                </div>
                <div class="text-lg sm:text-2xl font-extrabold mt-0.5" :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'">24</div>
                <div class="flex items-center gap-1 mt-1">
                  <span class="w-1.5 h-1.5 rounded-full" :class="currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'" />
                  <span class="text-[8px]" :class="currentTheme === 'dark' ? 'text-emerald-400/80' : 'text-emerald-600/80'">All online</span>
                </div>
              </div>

              <div
                class="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 glass-panel rounded-xl p-2.5 sm:p-4 animate-float"
                style="animation-delay: 1s"
              >
                <div
                  class="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest"
                  :class="currentTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'"
                >
                  Deliveries Today
                </div>
                <div class="text-lg sm:text-2xl font-extrabold mt-0.5" :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'">147</div>
                <div class="flex items-center gap-1 mt-1">
                  <span class="text-[8px]" :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'">+12%</span>
                  <span class="text-[8px]" :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">vs yesterday</span>
                </div>
              </div>

              <div
                class="hidden sm:block absolute top-6 right-6 glass-panel rounded-xl p-3 animate-float-slow"
                style="animation-delay: 2s"
              >
                <div class="text-[9px] font-bold uppercase tracking-widest" :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'">
                  Avg ETA
                </div>
                <div class="text-lg font-bold" :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'">12 min</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Glow reflection under dashboard -->
        <div
          class="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-16 blur-3xl rounded-full"
          :class="currentTheme === 'dark' ? 'bg-emerald-500/8' : 'bg-emerald-500/4'"
        />
      </div>
    </div>
  </section>
</template>
