import { ref, onMounted } from 'vue'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'locus-theme'
const currentTheme = ref<Theme>('dark')

function applyTheme(theme: Theme) {
  const html = document.documentElement
  if (theme === 'light') {
    html.classList.add('light')
  } else {
    html.classList.remove('light')
  }
}

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
  applyTheme(currentTheme.value)
  localStorage.setItem(STORAGE_KEY, currentTheme.value)
}

function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored) {
    currentTheme.value = stored
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    currentTheme.value = 'light'
  }
  applyTheme(currentTheme.value)
}

export function useTheme() {
  onMounted(() => {
    initTheme()
  })

  return {
    currentTheme,
    toggleTheme,
  }
}
