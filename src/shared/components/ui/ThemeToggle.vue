<script setup lang="ts">
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 light-hover:bg-black/5"
    :class="currentTheme === 'light' ? 'text-zinc-700' : 'text-zinc-400'"
    :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
    @click="toggleTheme"
  >
    <span class="material-symbols-outlined text-xl transition-transform duration-500" :class="currentTheme === 'light' ? 'rotate-0' : 'rotate-180'">
      {{ currentTheme === 'dark' ? 'light_mode' : 'dark_mode' }}
    </span>
  </button>
</template>
