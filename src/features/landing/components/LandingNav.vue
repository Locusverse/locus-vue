<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '@/shared/components/ui/ThemeToggle.vue'
import { useTheme } from '@/shared/composables/useTheme'

const { currentTheme } = useTheme()
const scrolled = ref(false)
const mobileOpen = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

function closeMobile() {
  mobileOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav
    class="fixed top-0 w-full z-100 transition-all duration-500 px-4 sm:px-6 lg:px-8"
    :class="[
      scrolled
        ? 'py-3 backdrop-blur-2xl border-b'
        : 'py-5 bg-transparent',
      scrolled && currentTheme === 'dark'
        ? 'bg-[#070e1d]/80 border-white/5'
        : scrolled && currentTheme === 'light'
          ? 'bg-[#f5f6ff]/85 border-black/5'
          : '',
    ]"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2.5">
        <img alt="Locusverse" class="h-7" src="/locus.png" />
        <span
          class="text-xl font-bold tracking-tight"
          :class="currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'"
        >
          Locusverse
        </span>
      </div>

      <div
        class="hidden md:flex items-center gap-8 text-sm font-medium"
        :class="currentTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'"
      >
        <a
          class="transition-colors duration-300"
          :class="currentTheme === 'dark' ? 'hover:text-white' : 'hover:text-zinc-900'"
          href="#features"
        >
          Features
        </a>
        <a
          class="transition-colors duration-300"
          :class="currentTheme === 'dark' ? 'hover:text-white' : 'hover:text-zinc-900'"
          href="#how-it-works"
        >
          How it works
        </a>
        <a
          class="transition-colors duration-300"
          :class="currentTheme === 'dark' ? 'hover:text-white' : 'hover:text-zinc-900'"
          href="#pricing"
        >
          Pricing
        </a>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <router-link
          :to="{ name: 'auth:login' }"
          class="hidden sm:block px-4 py-2 text-sm font-medium transition-all duration-300"
          :class="currentTheme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'"
        >
          Log in
        </router-link>
        <router-link
          :to="{ name: 'auth:register' }"
          class="hidden sm:block px-5 py-2.5 text-sm font-bold rounded-full active:scale-95 transition-all duration-200"
          :class="
            currentTheme === 'dark'
              ? 'bg-white text-[#070e1d] hover:bg-emerald-100'
              : 'bg-[#1a1a2e] text-white hover:bg-[#2a2a3e]'
          "
        >
          Get Started
        </router-link>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden w-11 h-11 flex items-center justify-center rounded-full transition-colors"
          :class="currentTheme === 'dark' ? 'text-zinc-400 hover:bg-white/10' : 'text-zinc-600 hover:bg-black/5'"
          aria-label="Open menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="material-symbols-outlined text-xl">
            {{ mobileOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="md:hidden absolute top-full left-0 w-full border-b backdrop-blur-2xl"
        :class="
          currentTheme === 'dark'
            ? 'bg-[#070e1d]/95 border-white/5'
            : 'bg-[#f5f6ff]/95 border-black/5'
        "
      >
        <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
          <a
            class="text-base font-medium py-2 transition-colors"
            :class="currentTheme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'"
            href="#features"
            @click="closeMobile"
          >
            Features
          </a>
          <a
            class="text-base font-medium py-2 transition-colors"
            :class="currentTheme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'"
            href="#how-it-works"
            @click="closeMobile"
          >
            How it works
          </a>
          <a
            class="text-base font-medium py-2 transition-colors"
            :class="currentTheme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'"
            href="#pricing"
            @click="closeMobile"
          >
            Pricing
          </a>

          <div class="flex flex-col gap-3 mt-2 pt-4 border-t" :class="currentTheme === 'dark' ? 'border-white/5' : 'border-black/5'">
            <router-link
              :to="{ name: 'auth:login' }"
              class="w-full py-3 text-sm font-medium rounded-full transition-all text-center block"
              :class="currentTheme === 'dark' ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'"
              @click="closeMobile"
            >
              Log in
            </router-link>
            <router-link
              :to="{ name: 'auth:register' }"
              class="w-full py-3 text-sm font-bold rounded-full active:scale-95 transition-all text-center block"
              :class="
                currentTheme === 'dark'
                  ? 'bg-white text-[#070e1d]'
                  : 'bg-[#1a1a2e] text-white'
              "
              @click="closeMobile"
            >
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
