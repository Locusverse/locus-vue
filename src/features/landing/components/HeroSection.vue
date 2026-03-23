<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
      class="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[160px] pointer-events-none"
    />
    <div
      class="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none"
    />
    <div
      class="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-400/10 blur-[120px] pointer-events-none"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-5xl mx-auto text-center px-6 pt-32 pb-12">
      <!-- Badge -->
      <div
        class="transition-all duration-1000 delay-100"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <span
          class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass-panel text-emerald-400 text-xs font-bold tracking-widest uppercase"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Powering 10,000+ deliveries daily
        </span>
      </div>

      <!-- Headline -->
      <h1
        class="mt-8 text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] transition-all duration-1000 delay-200"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <span class="block text-white font-light">The Future of</span>
        <span class="text-gradient">Delivery Intelligence.</span>
      </h1>

      <!-- Subtitle -->
      <p
        class="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed transition-all duration-1000 delay-300"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        Real-time tracking. Route optimization. Voice-powered logging. One platform for drivers,
        dispatchers, and customers across Africa.
      </p>

      <!-- CTAs -->
      <div
        class="mt-10 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-[400ms]"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <button
          class="group px-8 py-4 bg-white text-inverse-surface font-extrabold rounded-full hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-300"
        >
          Start Free
          <span
            class="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1"
            >&rarr;</span
          >
        </button>
        <button
          class="px-8 py-4 glass-panel border border-white/10 text-white font-bold rounded-full hover:bg-white/5 active:scale-95 transition-all duration-300"
        >
          Watch Demo
        </button>
      </div>
    </div>

    <!-- Floating Dashboard Preview -->
    <div
      class="relative z-10 w-full max-w-5xl mx-auto px-6 pb-20 perspective-container transition-all duration-1000 delay-500"
      :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
    >
      <div class="dashboard-tilt">
        <!-- Dashboard Frame -->
        <div
          class="glass-panel rounded-2xl p-[2px] shadow-2xl shadow-emerald-500/5 border-white/10"
        >
          <div class="bg-zinc-900/90 rounded-2xl overflow-hidden">
            <!-- Window Chrome -->
            <div class="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
              <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div class="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div class="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <div class="text-[10px] text-zinc-600 mx-auto font-medium tracking-wide">
                dashboard.locusverse.app
              </div>
            </div>

            <!-- Dashboard Content -->
            <div class="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
              <!-- Map Grid -->
              <div class="absolute inset-0 hero-grid-bg opacity-60" />

              <!-- Animated Route Lines -->
              <svg
                class="absolute inset-0 w-full h-full"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
              >
                <!-- Route 1 -->
                <path
                  d="M80 320 C 200 280, 300 120, 450 200 S 700 80, 920 160"
                  fill="none"
                  stroke="#6bff8f"
                  stroke-width="2"
                  class="route-draw-loop"
                  opacity="0.6"
                />
                <!-- Route 2 -->
                <path
                  d="M50 200 C 150 150, 250 300, 400 250 S 600 150, 800 280"
                  fill="none"
                  stroke="#22d3ee"
                  stroke-width="1.5"
                  class="route-draw-loop"
                  opacity="0.3"
                  style="animation-delay: 0.5s"
                />

                <!-- Driver Dots -->
                <circle cx="450" cy="200" r="5" fill="#6bff8f" class="animate-dot-pulse" />
                <circle
                  cx="450"
                  cy="200"
                  r="12"
                  fill="none"
                  stroke="#6bff8f"
                  stroke-width="1"
                  class="animate-ping-slow"
                  opacity="0.4"
                />

                <circle
                  cx="800"
                  cy="280"
                  r="4"
                  fill="#22d3ee"
                  class="animate-dot-pulse"
                  style="animation-delay: 0.7s"
                />

                <circle
                  cx="200"
                  cy="260"
                  r="4"
                  fill="#6bff8f"
                  class="animate-dot-pulse"
                  style="animation-delay: 1.2s"
                />

                <!-- Destination pins -->
                <circle cx="920" cy="160" r="6" fill="none" stroke="#f97316" stroke-width="2" />
                <circle cx="920" cy="160" r="2" fill="#f97316" />
              </svg>

              <!-- Floating Stat Cards -->
              <div
                class="absolute top-4 left-4 sm:top-6 sm:left-6 glass-panel rounded-xl p-3 sm:p-4 animate-float-slow"
              >
                <div
                  class="text-[8px] sm:text-[9px] text-emerald-400 font-bold uppercase tracking-widest"
                >
                  Active Drivers
                </div>
                <div class="text-xl sm:text-2xl font-extrabold text-white mt-0.5">24</div>
                <div class="flex items-center gap-1 mt-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span class="text-[8px] text-emerald-400/80">All online</span>
                </div>
              </div>

              <div
                class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 glass-panel rounded-xl p-3 sm:p-4 animate-float"
                style="animation-delay: 1s"
              >
                <div
                  class="text-[8px] sm:text-[9px] text-cyan-400 font-bold uppercase tracking-widest"
                >
                  Deliveries Today
                </div>
                <div class="text-xl sm:text-2xl font-extrabold text-white mt-0.5">147</div>
                <div class="flex items-center gap-1 mt-1">
                  <span class="text-[8px] text-emerald-400">+12%</span>
                  <span class="text-[8px] text-zinc-600">vs yesterday</span>
                </div>
              </div>

              <div
                class="hidden sm:block absolute top-6 right-6 glass-panel rounded-xl p-3 animate-float-slow"
                style="animation-delay: 2s"
              >
                <div class="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                  Avg ETA
                </div>
                <div class="text-lg font-bold text-white">12 min</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Glow reflection under dashboard -->
        <div
          class="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-emerald-500/8 blur-3xl rounded-full"
        />
      </div>
    </div>
  </section>
</template>
