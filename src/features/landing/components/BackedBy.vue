<script setup lang="ts">
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
  <section class="relative py-12 border-y border-white/5 overflow-hidden bg-black/20">
    <!-- Label -->
    <div class="text-center mb-6">
      <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-600">
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
          <div class="w-8 h-8 rounded-lg glass-panel flex items-center justify-center border border-white/5 shrink-0">
            <span class="text-[11px] font-extrabold text-zinc-600">
              {{ partner.name.charAt(0) }}
            </span>
          </div>
          <div class="whitespace-nowrap">
            <div class="text-sm font-semibold text-zinc-500">{{ partner.name }}</div>
            <div class="text-[9px] font-medium text-zinc-700 uppercase tracking-wider">{{ partner.tier }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fade edges -->
    <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-inverse-surface to-transparent pointer-events-none z-10" />
    <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-inverse-surface to-transparent pointer-events-none z-10" />
  </section>
</template>
