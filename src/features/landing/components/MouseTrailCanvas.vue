<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TrailPoint {
  x: number
  y: number
  age: number
  lat: string
  lng: string
}

const canvas = ref<HTMLCanvasElement | null>(null)
const coordDisplay = ref<HTMLDivElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isActive = ref(false)

const trail: TrailPoint[] = []
const MAX_TRAIL = 80
const TRAIL_LIFETIME = 100

// Map screen coords to African lat/lng ranges (Lagos → Nairobi corridor)
function screenToCoord(x: number, y: number): { lat: string; lng: string } {
  const w = window.innerWidth
  const h = window.innerHeight
  const lat = (9.0 - (y / h) * 6 + Math.sin(x / 200) * 0.3).toFixed(4)
  const lng = (3.3 + (x / w) * 33.5 + Math.cos(y / 150) * 0.2).toFixed(4)
  return { lat, lng }
}

let rafId = 0
let lastAddTime = 0

function handleMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  isActive.value = true

  const now = performance.now()
  if (now - lastAddTime < 20) return
  lastAddTime = now

  const { lat, lng } = screenToCoord(e.clientX, e.clientY)

  trail.push({
    x: e.clientX,
    y: e.clientY,
    age: 0,
    lat,
    lng,
  })

  if (trail.length > MAX_TRAIL) {
    trail.splice(0, trail.length - MAX_TRAIL)
  }
}

function handleMouseLeave() {
  isActive.value = false
}

function draw() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx || !canvas.value) {
    rafId = requestAnimationFrame(draw)
    return
  }

  const dpr = window.devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight

  if (canvas.value.width !== w * dpr || canvas.value.height !== h * dpr) {
    canvas.value.width = w * dpr
    canvas.value.height = h * dpr
    canvas.value.style.width = `${w}px`
    canvas.value.style.height = `${h}px`
    ctx.scale(dpr, dpr)
  }

  ctx.clearRect(0, 0, w, h)

  // Age and prune
  for (let i = trail.length - 1; i >= 0; i--) {
    trail[i].age++
    if (trail[i].age >= TRAIL_LIFETIME) {
      trail.splice(i, 1)
    }
  }

  // --- Globe / orbital rings around cursor ---
  if (isActive.value) {
    const cx = mouseX.value
    const cy = mouseY.value
    const now = performance.now()

    // Orbital rings — 3 tilted ellipses rotating at different speeds
    const orbits = [
      { rx: 40, ry: 14, speed: 0.0008, tilt: -0.3, color: '107, 255, 143', alpha: 0.15, width: 1.2 },
      { rx: 55, ry: 18, speed: -0.0005, tilt: 0.5, color: '34, 211, 238', alpha: 0.1, width: 1 },
      { rx: 30, ry: 30, speed: 0.001, tilt: 0, color: '107, 255, 143', alpha: 0.08, width: 0.8 },
    ]

    for (const orbit of orbits) {
      const angle = now * orbit.speed
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(orbit.tilt + angle * 0.3)

      // Draw orbital ellipse
      ctx.beginPath()
      ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${orbit.color}, ${orbit.alpha})`
      ctx.lineWidth = orbit.width
      ctx.stroke()

      // Orbiting dot on the ring
      const dotAngle = angle
      const dotX = Math.cos(dotAngle) * orbit.rx
      const dotY = Math.sin(dotAngle) * orbit.ry

      ctx.beginPath()
      ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${orbit.color}, 0.6)`
      ctx.shadowColor = `rgba(${orbit.color}, 0.5)`
      ctx.shadowBlur = 6
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.restore()
    }

    // Globe core — soft radial glow
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28)
    gradient.addColorStop(0, 'rgba(107, 255, 143, 0.12)')
    gradient.addColorStop(0.5, 'rgba(107, 255, 143, 0.04)')
    gradient.addColorStop(1, 'rgba(107, 255, 143, 0)')
    ctx.beginPath()
    ctx.arc(cx, cy, 28, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Globe wireframe lines (latitude/longitude arcs)
    ctx.save()
    ctx.translate(cx, cy)
    const globeR = 20
    const wobble = Math.sin(now * 0.001) * 0.15

    // Latitude lines
    for (let i = -1; i <= 1; i++) {
      const yOff = i * globeR * 0.45
      const scaleX = Math.sqrt(1 - Math.pow(yOff / globeR, 2))
      if (scaleX <= 0) continue

      ctx.beginPath()
      ctx.ellipse(0, yOff, globeR * scaleX, globeR * 0.15 * scaleX, wobble, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(107, 255, 143, 0.08)'
      ctx.lineWidth = 0.6
      ctx.stroke()
    }

    // Longitude arcs
    for (let i = 0; i < 3; i++) {
      const arcAngle = (i / 3) * Math.PI + now * 0.0003
      ctx.beginPath()
      ctx.ellipse(0, 0, globeR * Math.abs(Math.cos(arcAngle)), globeR, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(107, 255, 143, 0.06)'
      ctx.lineWidth = 0.6
      ctx.stroke()
    }

    // Equator ring (brighter)
    ctx.beginPath()
    ctx.ellipse(0, 0, globeR, globeR * 0.2, wobble, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(107, 255, 143, 0.12)'
    ctx.lineWidth = 0.8
    ctx.stroke()

    ctx.restore()

    // Center dot
    ctx.beginPath()
    ctx.arc(cx, cy, 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(107, 255, 143, 0.5)'
    ctx.shadowColor = '#6bff8f'
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.shadowBlur = 0

    ctx.beginPath()
    ctx.arc(cx, cy, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = '#6bff8f'
    ctx.fill()

    // Pulsing outer ring
    const pulsePhase = (now % 2500) / 2500
    const pulseR = 28 + pulsePhase * 20
    const pulseAlpha = (1 - pulsePhase) * 0.1
    ctx.beginPath()
    ctx.arc(cx, cy, pulseR, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(107, 255, 143, ${pulseAlpha})`
    ctx.lineWidth = 0.8
    ctx.stroke()
  }

  // --- Trail: fading orbital breadcrumbs ---
  for (let i = 0; i < trail.length; i++) {
    const p = trail[i]
    const life = 1 - p.age / TRAIL_LIFETIME
    const alpha = life * 0.3

    // Fading ring (like a sonar/radar mark)
    const ringExpand = (1 - life) * 8
    ctx.beginPath()
    ctx.arc(p.x, p.y, 3 + ringExpand, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(107, 255, 143, ${alpha * 0.3})`
    ctx.lineWidth = 0.5
    ctx.stroke()

    // Center dot
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.5 * life, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(107, 255, 143, ${alpha})`
    ctx.fill()

    // Coordinate labels on sparse points
    if (i % 15 === 0 && life > 0.4) {
      ctx.font = '8px Manrope, monospace'
      ctx.fillStyle = `rgba(107, 255, 143, ${alpha * 0.5})`
      ctx.fillText(`${p.lat}°N  ${p.lng}°E`, p.x + 10, p.y + 3)
    }
  }

  // Update coord display position
  if (coordDisplay.value && isActive.value) {
    coordDisplay.value.style.transform = `translate(${mouseX.value + 32}px, ${mouseY.value - 40}px)`
  }

  rafId = requestAnimationFrame(draw)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('mouseleave', handleMouseLeave)
  rafId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <canvas
    ref="canvas"
    class="fixed inset-0 z-50 pointer-events-none"
    aria-hidden="true"
  />
  <div
    ref="coordDisplay"
    class="fixed top-0 left-0 z-50 pointer-events-none transition-opacity duration-300"
    :class="isActive ? 'opacity-100' : 'opacity-0'"
  >
    <div class="glass-panel rounded-lg px-2.5 py-1.5 border border-emerald-500/10">
      <div class="text-[9px] font-mono text-emerald-400/70 leading-tight tracking-wider">
        {{ screenToCoord(mouseX, mouseY).lat }}°N
      </div>
      <div class="text-[9px] font-mono text-emerald-400/50 leading-tight tracking-wider">
        {{ screenToCoord(mouseX, mouseY).lng }}°E
      </div>
    </div>
  </div>
</template>
