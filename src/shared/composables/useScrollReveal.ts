import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal(threshold = 0.15) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { target, isVisible }
}
