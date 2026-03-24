<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/shared/composables/useScrollReveal'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const { target, isVisible } = useScrollReveal(0.1)

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    category: 'Getting Started',
    question: 'How quickly can I get started with Locusverse?',
    answer:
      'You can sign up and start tracking deliveries within minutes. Add your drivers by phone number, create your first delivery, and watch it appear on your live map. No hardware installation or complex setup required.',
  },
  {
    category: 'Getting Started',
    question: 'Do my drivers need to download an app?',
    answer:
      'For basic tracking, drivers just need any Android phone — no app download required. For advanced features like proof of delivery and voice check-ins, they can install our lightweight driver app (under 15MB) from the Play Store.',
  },
  {
    category: 'Pricing',
    question: 'Is the Starter plan really free?',
    answer:
      'Yes, completely free with no credit card required. You get up to 100 deliveries per month, 3 drivers, live GPS tracking, and basic route planning. It is designed for small businesses to experience the platform before scaling.',
  },
  {
    category: 'Pricing',
    question: 'Can I switch plans at any time?',
    answer:
      'Absolutely. Upgrade or downgrade at any time from your dashboard. When you upgrade, you get immediate access to new features. When you downgrade, the change takes effect at the end of your current billing period.',
  },
  {
    category: 'Features',
    question: 'How does the AI route optimization work?',
    answer:
      'Our routing engine analyzes real-time traffic data, historical road patterns, driver locations, vehicle capacity, and delivery time windows. It then calculates the optimal sequence and route for all pending deliveries — updating in real time as conditions change.',
  },
  {
    category: 'Features',
    question: 'Does Locusverse work offline?',
    answer:
      'Yes. Our offline-first architecture means drivers continue to be tracked even during connectivity gaps. GPS coordinates, proof of delivery captures, and status updates are queued locally and synced automatically when the connection returns.',
  },
  {
    category: 'Features',
    question: 'Which African cities do you support?',
    answer:
      'Locusverse operates in 30+ cities across Nigeria, Ghana, Kenya, South Africa, Tanzania, and Rwanda — with more launching monthly. Our mapping data is specifically optimized for African road networks, including unnamed streets and informal addresses.',
  },
  {
    category: 'Support',
    question: 'What kind of support do you offer?',
    answer:
      'Starter plans include email support with 24-hour response time. Professional plans get priority support with 4-hour response via chat and email. Enterprise customers receive a dedicated account manager and 24/7 phone support.',
  },
]

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" ref="target" class="relative py-20 sm:py-28 lg:py-36">
    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div
        class="text-center mb-12 sm:mb-16 transition-all duration-1000"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <span
          class="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
          :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
        >
          FAQ
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter"
          :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          Common<br />
          <span class="text-gradient">Questions.</span>
        </h2>
      </div>

      <!-- FAQ Items -->
      <div class="space-y-3">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.question"
          class="glass-panel rounded-xl border overflow-hidden transition-all duration-700"
          :class="[
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
            openIndex === i
              ? currentTheme === 'dark'
                ? 'border-emerald-500/20'
                : 'border-emerald-500/20'
              : currentTheme === 'dark'
                ? 'border-white/5'
                : 'border-black/5',
          ]"
          :style="{ transitionDelay: `${150 + i * 80}ms` }"
        >
          <button
            class="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
            @click="toggle(i)"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span
                class="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0"
                :class="
                  currentTheme === 'dark'
                    ? 'text-zinc-500 border-white/5 bg-white/5'
                    : 'text-zinc-400 border-black/5 bg-black/[0.02]'
                "
              >
                {{ faq.category }}
              </span>
              <span
                class="text-sm sm:text-base font-semibold truncate"
                :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
              >
                {{ faq.question }}
              </span>
            </div>
            <span
              class="material-symbols-outlined text-xl shrink-0 transition-transform duration-300"
              :class="[
                openIndex === i ? 'rotate-180' : 'rotate-0',
                currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400',
              ]"
            >
              expand_more
            </span>
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-48 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-48 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openIndex === i" class="overflow-hidden">
              <div
                class="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed"
                :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
              >
                {{ faq.answer }}
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Contact CTA -->
      <div
        class="mt-10 sm:mt-14 text-center transition-all duration-1000"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
        :style="{ transitionDelay: '800ms' }"
      >
        <p
          class="text-sm mb-4"
          :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
        >
          Still have questions?
        </p>
        <button
          class="px-6 py-3 glass-panel border font-bold text-sm rounded-full active:scale-95 transition-all duration-300"
          :class="
            currentTheme === 'dark'
              ? 'border-white/10 text-white hover:bg-white/5'
              : 'border-black/10 text-zinc-800 hover:bg-black/5'
          "
        >
          Contact Support
        </button>
      </div>
    </div>
  </section>
</template>
