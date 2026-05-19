'use client'
import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'turquesa' | 'amarillo'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  href?: string
  variant?: Variant
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
  cursorLabel?: string
}

const variants: Record<Variant, string> = {
  primary:
    'bg-turquesa text-negro hover:bg-turquesa-light tracking-[0.18em] uppercase text-[0.7rem] font-medium px-8 py-4',
  turquesa:
    'bg-turquesa text-negro hover:bg-turquesa-light tracking-[0.18em] uppercase text-[0.75rem] font-medium px-10 py-5',
  amarillo:
    'bg-amarillo text-negro hover:bg-amarillo-light tracking-[0.18em] uppercase text-[0.75rem] font-medium px-10 py-5',
  ghost:
    'border border-blanco-3/40 text-blanco-2 hover:border-turquesa hover:text-turquesa tracking-[0.18em] uppercase text-[0.7rem] font-medium px-8 py-4',
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  href,
  variant = 'primary',
  type = 'button',
  disabled,
  cursorLabel,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength })
  }
  const handleLeave = () => setPos({ x: 0, y: 0 })

  const classes = cn(
    'inline-flex items-center gap-3 transition-all duration-500 ease-out relative overflow-hidden group',
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent',
    'before:translate-x-[-100%] before:transition-transform before:duration-700 before:ease-out',
    'hover:before:translate-x-[100%]',
    disabled && 'opacity-50 pointer-events-none',
    variants[variant],
    className
  )

  const content = <span className="relative z-10 flex items-center gap-3">{children}</span>

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        {href ? (
          <a
            href={href}
            data-cursor="cta"
            data-cursor-label={cursorLabel || 'IR'}
            className={classes}
            {...props}
          >
            {content}
          </a>
        ) : (
          <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            data-cursor="cta"
            data-cursor-label={cursorLabel || 'IR'}
            className={classes}
            {...props}
          >
            {content}
          </button>
        )}
      </motion.div>
    </div>
  )
}
