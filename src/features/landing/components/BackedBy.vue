<script setup lang="ts">
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()

const partners = [
  { name: 'Y Combinator', tier: 'Accelerator' },
  { name: 'Techstars', tier: 'Accelerator' },
  { name: 'Google for Startups', tier: 'Partner' },
  { name: 'AWS Activate', tier: 'Cloud' },
  { name: 'Stripe Atlas', tier: 'Payments' },
  { name: 'Flutterwave', tier: 'Payments' },
  { name: 'Microsoft for Startups', tier: 'Cloud' },
  { name: 'Twilio', tier: 'Comms' },
  { name: 'Mapbox', tier: 'Maps' },
  { name: 'Paystack', tier: 'Payments' },
  { name: 'Andela', tier: 'Talent' },
  { name: '54gene', tier: 'Data' },
]
</script>

<template>
  <section
    class="relative py-12 border-y overflow-hidden"
    :class="
      currentTheme === 'dark'
        ? 'border-white/5 bg-black/20'
        : 'border-black/5 bg-black/[0.02]'
    "
  >
    <!-- Label -->
    <div class="text-center mb-6">
      <span
        class="text-[10px] font-bold tracking-[0.25em] uppercase"
        :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
      >
        Backed by &amp; integrated with
      </span>
    </div>

    <!-- Scrolling track -->
    <div class="flex animate-marquee-slow">
      <div v-for="pass in 2" :key="pass" class="flex shrink-0">
        <div
          v-for="partner in partners"
          :key="`${pass}-${partner.name}`"
          class="flex items-center gap-3 px-8"
        >
          <!-- Icon placeholder -->
          <div
            class="w-8 h-8 rounded-lg glass-panel flex items-center justify-center border shrink-0"
            :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'"
          >
            <span
              class="text-[11px] font-extrabold"
              :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
            >
              {{ partner.name.charAt(0) }}
            </span>
          </div>
          <div class="whitespace-nowrap">
            <div
              class="text-sm font-semibold"
              :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
            >
              {{ partner.name }}
            </div>
            <div
              class="text-[9px] font-medium uppercase tracking-wider"
              :class="currentTheme === 'dark' ? 'text-zinc-700' : 'text-zinc-400'"
            >
              {{ partner.tier }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fade edges -->
    <div
      class="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
      :class="
        currentTheme === 'dark'
          ? 'bg-linear-to-r from-[#070e1d] to-transparent'
          : 'bg-linear-to-r from-[#f5f6ff] to-transparent'
      "
    />
    <div
      class="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
      :class="
        currentTheme === 'dark'
          ? 'bg-linear-to-l from-[#070e1d] to-transparent'
          : 'bg-linear-to-l from-[#f5f6ff] to-transparent'
      "
    />
  </section>
</template>
