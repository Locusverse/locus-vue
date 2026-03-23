<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    class="fixed top-0 w-full z-100 transition-all duration-500 px-6 lg:px-8"
    :class="
      scrolled
        ? 'py-3 bg-inverse-surface/80 backdrop-blur-2xl border-b border-white/5'
        : 'py-5 bg-transparent'
    "
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2.5">
        <img alt="Locusverse" class="h-7" src="/locus.png" />
        <span class="text-xl font-bold tracking-tight text-white">Locusverse</span>
      </div>

      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
        <a class="hover:text-white transition-colors duration-300" href="#features">Features</a>
        <a class="hover:text-white transition-colors duration-300" href="#how-it-works"
          >How it works</a
        >
        <a class="hover:text-white transition-colors duration-300" href="#pricing">Pricing</a>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="hidden sm:block px-4 py-2 text-sm text-zinc-400 font-medium hover:text-white transition-all duration-300"
        >
          Log in
        </button>
        <button
          class="px-5 py-2.5 text-sm bg-white text-inverse-surface font-bold rounded-full hover:bg-emerald-100 active:scale-95 transition-all duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  </nav>
</template>
