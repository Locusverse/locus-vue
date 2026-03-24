<script setup lang="ts">
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const year = new Date().getFullYear()

const links = {
  Product: ['Features', 'Pricing', 'API Docs', 'Integrations'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}
</script>

<template>
  <footer
    class="relative border-t"
    :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2.5 mb-4">
            <img alt="Locusverse" class="h-7" src="/locus.png" />
            <span
              class="text-lg font-bold tracking-tight"
              :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
            >
              Locusverse
            </span>
          </div>
          <p
            class="text-sm leading-relaxed max-w-xs"
            :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-500'"
          >
            The delivery intelligence platform built for Africa's fastest-growing businesses.
          </p>
        </div>

        <!-- Link columns -->
        <div v-for="(items, category) in links" :key="category">
          <h4
            class="text-xs font-bold uppercase tracking-widest mb-4"
            :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'"
          >
            {{ category }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="item in items" :key="item">
              <a
                href="#"
                class="text-sm transition-colors duration-300"
                :class="
                  currentTheme === 'dark'
                    ? 'text-zinc-600 hover:text-white'
                    : 'text-zinc-400 hover:text-zinc-900'
                "
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-10 sm:mt-14 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
        :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'"
      >
        <p
          class="text-xs"
          :class="currentTheme === 'dark' ? 'text-zinc-700' : 'text-zinc-400'"
        >
          &copy; {{ year }} Locusverse. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <span
            class="flex items-center gap-1.5 text-xs"
            :class="currentTheme === 'dark' ? 'text-zinc-700' : 'text-zinc-400'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All systems operational
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
