<script setup lang="ts">
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
  <section class="relative py-8 border-y border-white/5 overflow-hidden bg-black/20">
    <div class="flex animate-marquee">
      <div v-for="pass in 2" :key="pass" class="flex shrink-0">
        <div v-for="item in items" :key="`${pass}-${item}`" class="flex items-center gap-8 px-8">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
          <span class="text-sm font-medium text-zinc-500 whitespace-nowrap tracking-wide">{{
            item
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
