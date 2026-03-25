<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleSubmit() {
  await authStore.login({
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <!-- Error Alert -->
    <div
      v-if="authStore.error"
      class="flex items-start gap-3 p-4 rounded-xl border text-sm"
      :class="
        currentTheme === 'dark'
          ? 'bg-red-500/5 border-red-500/20 text-red-400'
          : 'bg-red-50 border-red-200 text-red-600'
      "
    >
      <span class="material-symbols-outlined text-lg shrink-0 mt-0.5">error</span>
      {{ authStore.error }}
    </div>

    <!-- Email -->
    <div>
      <label
        class="block text-xs font-bold uppercase tracking-wider mb-2"
        :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        for="login-email"
      >
        Email
      </label>
      <div class="relative">
        <span
          class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg"
          :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
        >
          mail
        </span>
        <input
          id="login-email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          placeholder="you@company.com"
          class="w-full pl-11 pr-4 py-3.5 rounded-xl glass-panel border text-sm font-medium transition-colors duration-300 outline-none"
          :class="
            currentTheme === 'dark'
              ? 'border-white/5 text-white placeholder-zinc-600 focus:border-emerald-500/30'
              : 'border-black/10 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500/30'
          "
        />
      </div>
    </div>

    <!-- Password -->
    <div>
      <label
        class="block text-xs font-bold uppercase tracking-wider mb-2"
        :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        for="login-password"
      >
        Password
      </label>
      <div class="relative">
        <span
          class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg"
          :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
        >
          lock
        </span>
        <input
          id="login-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          required
          autocomplete="current-password"
          placeholder="Enter your password"
          class="w-full pl-11 pr-12 py-3.5 rounded-xl glass-panel border text-sm font-medium transition-colors duration-300 outline-none"
          :class="
            currentTheme === 'dark'
              ? 'border-white/5 text-white placeholder-zinc-600 focus:border-emerald-500/30'
              : 'border-black/10 text-zinc-900 placeholder-zinc-400 focus:border-emerald-500/30'
          "
        />
        <button
          type="button"
          class="absolute right-4 top-1/2 -translate-y-1/2"
          :class="currentTheme === 'dark' ? 'text-zinc-600 hover:text-zinc-400' : 'text-zinc-400 hover:text-zinc-600'"
          @click="showPassword = !showPassword"
        >
          <span class="material-symbols-outlined text-lg">
            {{ showPassword ? 'visibility_off' : 'visibility' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Forgot Password -->
    <div class="flex justify-end">
      <a
        href="#"
        class="text-xs font-semibold transition-colors duration-300"
        :class="
          currentTheme === 'dark'
            ? 'text-emerald-400 hover:text-emerald-300'
            : 'text-emerald-600 hover:text-emerald-500'
        "
      >
        Forgot password?
      </a>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      :disabled="authStore.isLoading"
      class="w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      :class="
        currentTheme === 'dark'
          ? 'bg-white text-[#070e1d] hover:shadow-lg hover:shadow-emerald-500/20'
          : 'bg-[#1a1a2e] text-white hover:shadow-lg hover:shadow-emerald-500/10'
      "
    >
      <span v-if="authStore.isLoading" class="inline-flex items-center gap-2">
        <span class="material-symbols-outlined text-lg animate-spin">progress_activity</span>
        Signing in...
      </span>
      <span v-else>Sign In</span>
    </button>
  </form>
</template>
