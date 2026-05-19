'use client'
import { useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'turquesa' | 'amarillo'
  tilt?: boolean
}

export function GlowCard({
  children,
  className,
  glowColor = 'turquesa',
  tilt = false,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [tiltVal, setTiltVal] = useState({ rx: 0, ry: 0 })
  const [hover, setHover] = useState(false)

  const glow =
    glowColor === 'turquesa' ? 'rgba(0,191,179,0.14)' : 'rgba(245,197,24,0.12)'

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setGlowPos({ x: px * 100, y: py * 100 })
    if (tilt) {
      setTiltVal({ rx: (0.5 - py) * 8, ry: (px - 0.5) * 10 })
    }
  }
  const handleLeave = () => {
    setHover(false)
    setTiltVal({ rx: 0, ry: 0 })
  }

  const background = hover
    ? `radial-gradient(380px circle at ${glowPos.x}% ${glowPos.y}%, ${glow}, transparent 60%), #161616`
    : '#161616'

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleLeave}
      className={cn(
        'relative overflow-hidden border border-white/[0.06] transition-[border-color,transform] duration-500',
        hover && (glowColor === 'turquesa' ? 'border-turquesa/30' : 'border-amarillo/30'),
        className
      )}
      style={{
        background,
        transform: tilt
          ? `perspective(1000px) rotateX(${tiltVal.rx}deg) rotateY(${tiltVal.ry}deg)`
          : undefined,
        transformStyle: tilt ? 'preserve-3d' : undefined,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
