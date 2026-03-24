<script setup lang="ts">
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()

const items = [
  'Real-time GPS Tracking',
  '10,000+ Deliveries Daily',
  'Lagos \u2022 Accra \u2022 Nairobi',
  '99.9% Uptime',
  'Voice in Yoruba, Igbo, Hausa',
  '500+ Businesses',
  'Route Optimization AI',
  '< 0.2s Latency',
  'SOC 2 Compliant',
  'Proof of Delivery',
]
</script>

<template>
  <section
    class="relative py-8 border-y overflow-hidden"
    :class="
      currentTheme === 'dark'
        ? 'border-white/5 bg-black/20'
        : 'border-black/5 bg-black/[0.02]'
    "
  >
    <div class="flex animate-marquee">
      <div v-for="pass in 2" :key="pass" class="flex shrink-0">
        <div v-for="item in items" :key="`${pass}-${item}`" class="flex items-center gap-8 px-8">
          <span
            class="w-1.5 h-1.5 rounded-full"
            :class="currentTheme === 'dark' ? 'bg-emerald-500/60' : 'bg-emerald-500/40'"
          />
          <span
            class="text-sm font-medium whitespace-nowrap tracking-wide"
            :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
