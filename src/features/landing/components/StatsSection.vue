<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'
import { useScrollReveal } from '@/shared/composables/useScrollReveal'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const { target, isVisible } = useScrollReveal(0.2)

interface StatItem {
  label: string
  value: number
  suffix: string
  prefix: string
  decimals: number
}

const stats: StatItem[] = [
  { label: 'Deliveries Completed', value: 10000, suffix: '+', prefix: '', decimals: 0 },
  { label: 'Businesses Served', value: 500, suffix: '+', prefix: '', decimals: 0 },
  { label: 'Platform Uptime', value: 99.9, suffix: '%', prefix: '', decimals: 1 },
  { label: 'Average Latency', value: 0.2, suffix: 's', prefix: '< ', decimals: 1 },
]

const animatedValues = ref<number[]>(stats.map(() => 0))
const rafIds: number[] = []

function animateCount(index: number, targetVal: number, decimals: number, duration = 2000) {
  const start = performance.now()

  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedValues.value[index] = Number((eased * targetVal).toFixed(decimals))

    if (progress < 1) {
      rafIds[index] = requestAnimationFrame(tick)
    }
  }

  rafIds[index] = requestAnimationFrame(tick)
}

watch(isVisible, (visible) => {
  if (visible) {
    stats.forEach((stat, i) => {
      setTimeout(() => {
        animateCount(i, stat.value, stat.decimals)
      }, i * 150)
    })
  }
})

onUnmounted(() => {
  rafIds.forEach((id) => cancelAnimationFrame(id))
})

function formatValue(value: number, stat: StatItem): string {
  if (stat.decimals === 0) {
    return value.toLocaleString()
  }
  return value.toFixed(stat.decimals)
}
</script>

<template>
  <section ref="target" class="relative py-16 sm:py-24 lg:py-32">
    <div
      class="absolute inset-0 pointer-events-none"
      :class="
        currentTheme === 'dark'
          ? 'bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent'
          : 'bg-gradient-to-b from-transparent via-emerald-500/[0.01] to-transparent'
      "
    />

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="text-center transition-all duration-700"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <div
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-2"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
          >
            <span :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">{{ stat.prefix }}</span>
            <span class="text-gradient">{{ formatValue(animatedValues[i], stat) }}</span>
            <span :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'">{{ stat.suffix }}</span>
          </div>
          <div
            class="text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-widest"
            :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
          >
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
