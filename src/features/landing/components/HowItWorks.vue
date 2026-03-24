<script setup lang="ts">
import { useScrollReveal } from '@/shared/composables/useScrollReveal'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const { target, isVisible } = useScrollReveal(0.1)

const steps = [
  {
    number: '01',
    title: 'Onboard Your Fleet',
    description: 'Add drivers, vehicles, and zones in minutes. No hardware needed — works on any Android phone.',
    icon: 'group_add',
  },
  {
    number: '02',
    title: 'Dispatch & Optimize',
    description: 'Assign deliveries manually or let AI auto-dispatch based on proximity, load, and traffic.',
    icon: 'alt_route',
  },
  {
    number: '03',
    title: 'Track & Deliver',
    description: 'Real-time GPS, voice check-ins, and proof-of-delivery — all streaming to your dashboard.',
    icon: 'local_shipping',
  },
  {
    number: '04',
    title: 'Analyze & Scale',
    description: 'Performance insights, cost breakdowns, and trend analysis to grow your delivery operation.',
    icon: 'trending_up',
  },
]
</script>

<template>
  <section id="how-it-works" ref="target" class="relative py-20 sm:py-28 lg:py-36">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div
        class="text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <span
          class="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
          :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
        >
          How it works
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter"
          :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          Up and Running<br />
          <span class="text-gradient">in Minutes.</span>
        </h2>
      </div>

      <!-- Steps -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="group relative glass-panel rounded-2xl p-5 sm:p-6 lg:p-8 border transition-all duration-700"
          :class="[
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            currentTheme === 'dark'
              ? 'border-white/5 hover:border-emerald-500/20'
              : 'border-black/5 hover:border-emerald-500/20',
          ]"
          :style="{ transitionDelay: `${200 + i * 150}ms` }"
        >
          <!-- Step number -->
          <div
            class="text-6xl font-extrabold absolute top-4 right-4 tracking-tighter"
            :class="currentTheme === 'dark' ? 'text-white/[0.03]' : 'text-black/[0.03]'"
          >
            {{ step.number }}
          </div>

          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl glass-panel flex items-center justify-center mb-5 border transition-colors duration-500"
            :class="
              currentTheme === 'dark'
                ? 'border-white/5 group-hover:border-emerald-500/20'
                : 'border-black/5 group-hover:border-emerald-500/20'
            "
          >
            <span
              class="material-symbols-outlined text-2xl"
              :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
            >
              {{ step.icon }}
            </span>
          </div>

          <!-- Content -->
          <h3
            class="text-base sm:text-lg font-bold mb-2"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
          >
            {{ step.title }}
          </h3>
          <p
            class="text-sm leading-relaxed"
            :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
          >
            {{ step.description }}
          </p>

          <!-- Connector line -->
          <div
            v-if="i < steps.length - 1"
            class="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed"
            :class="currentTheme === 'dark' ? 'border-white/10' : 'border-black/10'"
          />
        </div>
      </div>
    </div>
  </section>
</template>
