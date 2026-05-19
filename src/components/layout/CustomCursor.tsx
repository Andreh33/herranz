'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'click' | 'text' | 'cta' | 'drag'

export function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const auraX = useSpring(useMotionValue(-100), { stiffness: 180, damping: 22, mass: 0.5 })
  const auraY = useSpring(useMotionValue(-100), { stiffness: 180, damping: 22, mass: 0.5 })

  const [state, setState] = useState<CursorState>('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      auraX.set(e.clientX)
      auraY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    const down = () => setState((s) => (s === 'cta' ? 'cta' : 'click'))
    const up = () => setState('default')

    window.addEventListener('mousemove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    const handleEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const type = (target.dataset.cursor as CursorState) || 'hover'
      const lbl = target.dataset.cursorLabel || ''
      setState(type)
      setLabel(lbl)
    }
    const handleLeave = () => {
      setState('default')
      setLabel('')
    }

    const attach = () => {
      const items = document.querySelectorAll<HTMLElement>(
        '[data-cursor], a, button, input, textarea, select, label'
      )
      items.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    }
    const tid = window.setTimeout(attach, 400)
    const interval = window.setInterval(attach, 2000)

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.clearTimeout(tid)
      window.clearInterval(interval)
    }
  }, [auraX, auraY, dotX, dotY, visible])

  if (!enabled) return null

  const auraSize =
    state === 'cta' ? 96 : state === 'hover' || state === 'drag' ? 64 : state === 'text' ? 8 : 44
  const dotSize = state === 'click' ? 6 : state === 'text' ? 3 : 8
  const auraBg =
    state === 'cta'
      ? 'rgba(245,197,24,0.10)'
      : state === 'hover' || state === 'drag'
      ? 'rgba(0,191,179,0.06)'
      : 'transparent'
  const auraBorder = state === 'cta' ? '#F5C518' : '#00BFB3'
  const dotColor = state === 'click' || state === 'cta' ? '#F5C518' : '#00BFB3'
  const displayLabel = label || (state === 'cta' ? 'IR' : state === 'drag' ? 'ARRASTRA' : '')

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          background: dotColor,
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: dotSize, height: dotSize, background: dotColor }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full flex items-center justify-center"
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: auraSize,
          height: auraSize,
          borderColor: auraBorder,
          background: auraBg,
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="rounded-full w-full h-full flex items-center justify-center"
          style={{ border: `1.5px solid ${auraBorder}`, background: auraBg }}
        >
          {displayLabel && state === 'cta' && (
            <span className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-amarillo">
              {displayLabel}
            </span>
          )}
        </div>
      </motion.div>
    </>
  )
}
