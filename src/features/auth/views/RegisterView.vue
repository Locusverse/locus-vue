<script setup lang="ts">
import { useTheme } from '@/shared/composables/useTheme'
import RegisterForm from '../components/RegisterForm.vue'

const { currentTheme } = useTheme()
</script>

<template>
  <div
    class="min-h-dvh flex"
    :class="currentTheme === 'dark' ? 'bg-[#070e1d]' : 'bg-[#f5f6ff]'"
  >
    <!-- Left Panel — Branding -->
    <div
      class="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
    >
      <!-- Background -->
      <div class="absolute inset-0 hero-grid-bg opacity-40" />
      <div
        class="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
        :class="currentTheme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-500/5'"
      />
      <div
        class="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[150px] pointer-events-none"
        :class="currentTheme === 'dark' ? 'bg-violet-500/5' : 'bg-violet-500/3'"
      />

      <!-- Content -->
      <div class="relative z-10 max-w-md">
        <div class="flex items-center gap-3 mb-10">
          <img alt="Locusverse" class="h-9" src="/locus.png" />
          <span
            class="text-2xl font-extrabold tracking-tight"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
          >
            Locusverse
          </span>
        </div>

        <h1
          class="text-4xl xl:text-5xl font-extrabold tracking-tighter leading-[1.1] mb-5"
          :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          Start Delivering<br />
          <span class="text-gradient">Smarter Today.</span>
        </h1>

        <p
          class="text-base leading-relaxed mb-10"
          :class="currentTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'"
        >
          Join 500+ businesses across Africa already using Locusverse to power their
          logistics. Get started in minutes — no hardware required.
        </p>

        <!-- Features list -->
        <ul class="space-y-4">
          <li
            v-for="feat in [
              'Free plan with 100 deliveries/month',
              'Live GPS tracking from day one',
              'AI route optimization included',
              'No credit card required',
            ]"
            :key="feat"
            class="flex items-center gap-3"
          >
            <span
              class="material-symbols-outlined text-lg"
              :class="currentTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'"
            >
              check_circle
            </span>
            <span
              class="text-sm font-medium"
              :class="currentTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'"
            >
              {{ feat }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Panel — Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
      <div class="w-full max-w-md">
        <!-- Top bar -->
        <div class="flex justify-between items-center mb-10">
          <router-link
            :to="{ name: 'home' }"
            class="flex items-center gap-2"
          >
            <img alt="Locusverse" class="h-7" src="/locus.png" />
            <span
              class="text-lg font-extrabold tracking-tight"
              :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
            >
              Locusverse
            </span>
          </router-link>
        </div>

        <!-- Heading -->
        <div class="mb-8">
          <h2
            class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
            :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
          >
            Create your account
          </h2>
          <p
            class="text-sm"
            :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
          >
            Start your free plan — upgrade anytime.
          </p>
        </div>

        <!-- Register Form -->
        <RegisterForm />

        <!-- Divider -->
        <div class="flex items-center gap-4 my-6">
          <div
            class="flex-1 h-px"
            :class="currentTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'"
          />
          <span
            class="text-[10px] font-bold uppercase tracking-widest"
            :class="currentTheme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'"
          >
            or
          </span>
          <div
            class="flex-1 h-px"
            :class="currentTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'"
          />
        </div>

        <!-- Social Register -->
        <button
          type="button"
          class="w-full py-3.5 rounded-xl glass-panel border font-semibold text-sm transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3"
          :class="
            currentTheme === 'dark'
              ? 'border-white/5 text-white hover:bg-white/5'
              : 'border-black/10 text-zinc-800 hover:bg-black/5'
          "
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <!-- Login Link -->
        <p
          class="mt-8 text-center text-sm"
          :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
        >
          Already have an account?
          <router-link
            :to="{ name: 'auth:login' }"
            class="font-bold transition-colors duration-300"
            :class="
              currentTheme === 'dark'
                ? 'text-emerald-400 hover:text-emerald-300'
                : 'text-emerald-600 hover:text-emerald-500'
            "
          >
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
