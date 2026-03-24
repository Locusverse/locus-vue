<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/shared/composables/useScrollReveal'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const { target, isVisible } = useScrollReveal(0.1)
const isAnnual = ref(true)

interface PricingTier {
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  unit: string
  cta: string
  highlighted: boolean
  features: string[]
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'For small businesses getting started with delivery tracking.',
    monthlyPrice: 0,
    annualPrice: 0,
    unit: 'forever',
    cta: 'Start Free',
    highlighted: false,
    features: [
      'Up to 100 deliveries/month',
      '3 drivers',
      'Live GPS tracking',
      'Basic route planning',
      'Proof of delivery (photo)',
      'Customer tracking links',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need AI optimization and analytics.',
    monthlyPrice: 49,
    annualPrice: 39,
    unit: '/month',
    cta: 'Start 14-Day Trial',
    highlighted: true,
    features: [
      'Unlimited deliveries',
      'Unlimited drivers',
      'AI route optimization',
      'Advanced analytics dashboard',
      'Proof of delivery (photo + signature)',
      'WhatsApp notifications',
      'Fleet management tools',
      'Zone-based operations',
      'API access',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large operations with custom needs and SLA requirements.',
    monthlyPrice: -1,
    annualPrice: -1,
    unit: '',
    cta: 'Talk to Sales',
    highlighted: false,
    features: [
      'Everything in Professional',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantees (99.95% uptime)',
      'On-premise deployment option',
      'Custom analytics & reporting',
      'Multi-org support',
      'SSO & advanced security',
      'Training & onboarding',
      '24/7 phone support',
    ],
  },
]

function displayPrice(tier: PricingTier): string {
  if (tier.monthlyPrice === -1) return 'Custom'
  if (tier.monthlyPrice === 0) return '$0'
  return `$${isAnnual.value ? tier.annualPrice : tier.monthlyPrice}`
}
</script>

<template>
  <section id="pricing" ref="target" class="relative py-20 sm:py-28 lg:py-36">
    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div
        class="text-center mb-12 sm:mb-16 transition-all duration-1000"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <span
          class="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
          :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
        >
          Pricing
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter"
          :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          Simple, Transparent<br />
          <span class="text-gradient">Pricing.</span>
        </h2>
        <p
          class="mt-4 text-base sm:text-lg max-w-xl mx-auto"
          :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
        >
          Start free. Scale as you grow. No hidden fees.
        </p>

        <!-- Annual/Monthly Toggle -->
        <div class="mt-8 flex items-center justify-center gap-3">
          <span
            class="text-sm font-medium"
            :class="[
              !isAnnual
                ? currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'
                : currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400',
            ]"
          >
            Monthly
          </span>
          <button
            class="relative w-12 h-6 rounded-full transition-colors duration-300"
            :class="isAnnual ? 'bg-emerald-500' : currentTheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'"
            @click="isAnnual = !isAnnual"
            aria-label="Toggle annual billing"
          >
            <span
              class="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm"
              :class="isAnnual ? 'translate-x-6.5' : 'translate-x-0.5'"
            />
          </button>
          <span
            class="text-sm font-medium"
            :class="[
              isAnnual
                ? currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'
                : currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400',
            ]"
          >
            Annual
          </span>
          <span
            class="ml-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
            :class="currentTheme === 'dark' ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-500/10'"
          >
            Save 20%
          </span>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div
          v-for="(tier, i) in tiers"
          :key="tier.name"
          class="relative glass-panel rounded-2xl border p-6 sm:p-8 transition-all duration-700 flex flex-col"
          :class="[
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
            tier.highlighted
              ? currentTheme === 'dark'
                ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                : 'border-emerald-500/30 shadow-lg shadow-emerald-500/5'
              : currentTheme === 'dark'
                ? 'border-white/5'
                : 'border-black/5',
          ]"
          :style="{ transitionDelay: `${200 + i * 150}ms` }"
        >
          <!-- Popular badge -->
          <div
            v-if="tier.highlighted"
            class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-500 text-white"
          >
            Most Popular
          </div>

          <!-- Tier info -->
          <div class="mb-6">
            <h3
              class="text-lg font-bold mb-1"
              :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
            >
              {{ tier.name }}
            </h3>
            <p
              class="text-sm"
              :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
            >
              {{ tier.description }}
            </p>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <div class="flex items-baseline gap-1">
              <span
                class="text-4xl sm:text-5xl font-extrabold tracking-tighter"
                :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
              >
                {{ displayPrice(tier) }}
              </span>
              <span
                v-if="tier.monthlyPrice >= 0"
                class="text-sm font-medium"
                :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
              >
                {{ tier.unit }}
              </span>
            </div>
            <p
              v-if="tier.monthlyPrice > 0 && isAnnual"
              class="text-xs mt-1"
              :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
            >
              ${{ tier.annualPrice * 12 }} billed annually
            </p>
          </div>

          <!-- CTA Button -->
          <button
            class="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-300 active:scale-95 mb-6"
            :class="
              tier.highlighted
                ? currentTheme === 'dark'
                  ? 'bg-white text-[#070e1d] hover:shadow-lg hover:shadow-emerald-500/20'
                  : 'bg-[#1a1a2e] text-white hover:shadow-lg hover:shadow-emerald-500/10'
                : currentTheme === 'dark'
                  ? 'glass-panel border border-white/10 text-white hover:bg-white/5'
                  : 'glass-panel border border-black/10 text-zinc-800 hover:bg-black/5'
            "
          >
            {{ tier.cta }}
          </button>

          <!-- Features List -->
          <ul class="space-y-3 flex-1">
            <li
              v-for="feat in tier.features"
              :key="feat"
              class="flex items-start gap-2.5 text-sm"
              :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
            >
              <span
                class="material-symbols-outlined text-base mt-0.5 shrink-0"
                :class="tier.highlighted ? 'text-emerald-400' : currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
              >
                check_circle
              </span>
              {{ feat }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
