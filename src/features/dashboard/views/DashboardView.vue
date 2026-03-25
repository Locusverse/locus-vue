<script setup lang="ts">
import { useAuthStore } from '@/features/auth/stores/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-dvh flex items-center justify-center bg-[#070e1d] text-white">
    <div class="text-center">
      <h1 class="text-3xl font-extrabold tracking-tight mb-4">Dashboard</h1>
      <p class="text-zinc-400 mb-8">Welcome, {{ authStore.user?.name ?? 'User' }}</p>
      <button
        class="px-6 py-3 rounded-xl bg-white text-[#070e1d] font-bold text-sm"
        @click="authStore.logout()"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>
