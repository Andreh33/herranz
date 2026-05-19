'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface SectionRevealProps {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
  once?: boolean
  threshold?: number
  duration?: number
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 50 },
  down: { y: -50 },
  left: { x: -50 },
  right: { x: 50 },
  none: {},
}

export function SectionReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
  threshold = 0.12,
  duration = 0.9,
}: SectionRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: once, threshold })

  const hidden = { opacity: 0, ...offsets[direction] }
  const visible = { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
