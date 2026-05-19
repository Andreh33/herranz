'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { ElementType } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  el?: ElementType
  className?: string
  mode?: 'words' | 'chars'
  delay?: number
  stagger?: number
  once?: boolean
}

export function AnimatedText({
  text,
  el: Tag = 'p',
  className,
  mode = 'words',
  delay = 0,
  stagger = 0.045,
  once = true,
}: AnimatedTextProps) {
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.2 })

  const units = mode === 'chars' ? Array.from(text) : text.split(' ')

  return (
    <Tag ref={ref} className={cn('inline-block', className)} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-baseline"
          style={{ verticalAlign: 'baseline' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit === ' ' ? ' ' : unit}
            {mode === 'words' && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
