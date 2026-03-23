<script setup lang="ts">
import { useScrollReveal } from '@/shared/composables/useScrollReveal'

const { target, isVisible } = useScrollReveal(0.2)
</script>

<template>
  <section ref="target" class="relative py-28 lg:py-40 overflow-hidden">
    <!-- Glow orbs -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[180px] pointer-events-none"
    />
    <div
      class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none"
    />

    <div
      class="relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <span
        class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass-panel text-emerald-400 text-xs font-bold tracking-widest uppercase mb-8"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Ready to go?
      </span>

      <h2 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.95]">
        Start Delivering<br />
        <span class="text-gradient">Smarter Today.</span>
      </h2>

      <p class="mt-6 text-lg text-zinc-500 max-w-xl mx-auto">
        Join 500+ businesses across Africa already using Locusverse to power their logistics.
      </p>

      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="group px-10 py-4 bg-white text-inverse-surface font-extrabold rounded-full hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all duration-300 text-lg"
        >
          Start Free
          <span
            class="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1"
          >&rarr;</span>
        </button>
        <button
          class="px-10 py-4 glass-panel border border-white/10 text-white font-bold rounded-full hover:bg-white/5 active:scale-95 transition-all duration-300 text-lg"
        >
          Talk to Sales
        </button>
      </div>

      <p class="mt-6 text-xs text-zinc-600">
        No credit card required &middot; Free for up to 100 deliveries/month
      </p>
    </div>
  </section>
</template>
