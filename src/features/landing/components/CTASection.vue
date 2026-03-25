<script setup lang="ts">
import { useScrollReveal } from '@/shared/composables/useScrollReveal'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const { target, isVisible } = useScrollReveal(0.2)
</script>

<template>
  <section ref="target" class="relative py-20 sm:py-28 lg:py-40 overflow-hidden">
    <!-- Glow orbs -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
      :class="currentTheme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-500/5'"
    />
    <div
      class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
      :class="currentTheme === 'dark' ? 'bg-cyan-500/5' : 'bg-cyan-500/3'"
    />

    <div
      class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center transition-all duration-1000"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <span
        class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass-panel text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8"
        :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
      >
        <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500'" />
        Ready to go?
      </span>

      <h2
        class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95]"
        :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
      >
        Start Delivering<br />
        <span class="text-gradient">Smarter Today.</span>
      </h2>

      <p
        class="mt-4 sm:mt-6 text-base sm:text-lg max-w-xl mx-auto"
        :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
      >
        Join 500+ businesses across Africa already using Locusverse to power their logistics.
      </p>

      <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <router-link
          :to="{ name: 'auth:register' }"
          class="group px-8 sm:px-10 py-4 font-extrabold rounded-full active:scale-95 transition-all duration-300 text-base sm:text-lg inline-block"
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
          class="px-8 sm:px-10 py-4 glass-panel border font-bold rounded-full active:scale-95 transition-all duration-300 text-base sm:text-lg"
          :class="
            currentTheme === 'dark'
              ? 'border-white/10 text-white hover:bg-white/5'
              : 'border-black/10 text-zinc-800 hover:bg-black/5'
          "
        >
          Talk to Sales
        </button>
      </div>

      <p
        class="mt-4 sm:mt-6 text-xs"
        :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
      >
        No credit card required &middot; Free for up to 100 deliveries/month
      </p>
    </div>
  </section>
</template>
