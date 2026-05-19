'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  hover: number
}

export function ParticlesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const particles: Particle[] = []
    const mouse = { x: -9999, y: -9999 }
    let raf = 0

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }

    const init = () => {
      particles.length = 0
      const count = Math.min(80, Math.floor((w * h) / 18000))
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.4 + 0.4,
          hover: 0,
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 130) {
          const force = (1 - dist / 130) * 0.5
          p.x += dx * force * 0.06
          p.y += dy * force * 0.06
          p.hover = Math.min(p.hover + 0.06, 1)
        } else {
          p.x += (p.baseX - p.x) * 0.015 + p.vx
          p.y += (p.baseY - p.y) * 0.015 + p.vy
          p.hover = Math.max(p.hover - 0.04, 0)
          p.baseX += p.vx
          p.baseY += p.vy
          if (p.baseX < 0 || p.baseX > w) p.vx *= -1
          if (p.baseY < 0 || p.baseY > h) p.vy *= -1
        }

        const alpha = 0.15 + p.hover * 0.55
        const isTurq = p.hover > 0.15
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size + p.hover * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = isTurq
          ? `rgba(0, 191, 179, ${alpha})`
          : `rgba(248, 246, 240, ${alpha})`
        ctx.fill()
      }

      // Líneas entre partículas cercanas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            const alpha = (1 - d / 110) * 0.08
            ctx.strokeStyle = `rgba(0, 191, 179, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(render)
    }

    resize()
    init()
    render()
    window.addEventListener('resize', () => {
      resize()
      init()
    })
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  )
}
