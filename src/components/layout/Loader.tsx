'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEF'

function useTextScramble(target: string, active: boolean) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!active) return
    let frame = 0
    let raf = 0
    const length = target.length

    const tick = () => {
      let output = ''
      let complete = 0
      for (let i = 0; i < length; i++) {
        const start = i * 1.5
        const end = start + 12
        if (frame >= end) {
          output += target[i]
          complete++
        } else if (frame >= start) {
          output +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        } else {
          output += ' '
        }
      }
      setText(output)
      if (complete < length) {
        frame++
        raf = requestAnimationFrame(tick)
      } else {
        setText(target)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active])

  return text
}

export function Loader() {
  const [visible, setVisible] = useState<boolean | null>(null)
  const [progress, setProgress] = useState(0)
  const [scrambleActive, setScrambleActive] = useState(false)
  const scrambled = useTextScramble('HERRANZ', scrambleActive)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('ah-loader-seen')
    if (seen) {
      setVisible(false)
      return
    }
    setVisible(true)
    setTimeout(() => setScrambleActive(true), 400)
    sessionStorage.setItem('ah-loader-seen', '1')

    let start: number | undefined
    const dur = 2200
    let raf = 0
    const tick = (t: number) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setProgress(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const hide = setTimeout(() => setVisible(false), 2500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hide)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-negro flex items-center justify-center overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="bg-grid-dark absolute inset-0 opacity-50" />
          <div className="bg-hero-radial absolute inset-0" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <motion.div
              className="overflow-hidden"
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-display-lg text-blanco tracking-[-0.02em]">
                Alquileres
              </span>
            </motion.div>
            <motion.div
              className="overflow-hidden"
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display italic text-display-lg text-turquesa tracking-[-0.02em]">
                {scrambled || 'Herranz'}
              </span>
            </motion.div>

            <motion.div
              className="h-px bg-gradient-to-r from-turquesa via-amarillo to-turquesa origin-left mt-6"
              initial={{ width: 0 }}
              animate={{ width: 280 }}
              transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="absolute bottom-12 right-12 flex items-baseline gap-2 text-blanco-3">
            <span className="font-display text-xl tabular-nums">{progress}</span>
            <span className="text-[0.65rem] tracking-[0.4em] uppercase">%</span>
          </div>

          <div className="absolute bottom-12 left-12 flex items-center gap-3">
            <span className="block w-2 h-2 rounded-full bg-turquesa animate-pulse" />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase text-blanco-3">
              Mobiliario Premium · Madrid
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
