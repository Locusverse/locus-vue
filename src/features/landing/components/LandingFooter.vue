<script setup lang="ts">
const year = new Date().getFullYear()

const links = {
  Product: ['Features', 'Pricing', 'API Docs', 'Integrations'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}
</script>

<template>
  <footer class="relative border-t border-white/5">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-2.5 mb-4">
            <img alt="Locusverse" class="h-7" src="/locus.png" />
            <span class="text-lg font-bold tracking-tight text-white">Locusverse</span>
          </div>
          <p class="text-sm text-zinc-600 leading-relaxed max-w-xs">
            The delivery intelligence platform built for Africa's fastest-growing businesses.
          </p>
        </div>

        <!-- Link columns -->
        <div v-for="(items, category) in links" :key="category">
          <h4 class="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
            {{ category }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="item in items" :key="item">
              <a
                href="#"
                class="text-sm text-zinc-600 hover:text-white transition-colors duration-300"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-xs text-zinc-700">
          &copy; {{ year }} Locusverse. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5 text-xs text-zinc-700">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All systems operational
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
