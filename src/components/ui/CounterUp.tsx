'use client'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface CounterUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function CounterUp({
  end,
  duration = 2200,
  suffix = '',
  prefix = '',
  className,
  decimals = 0,
}: CounterUpProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  useEffect(() => {
    if (!inView) return
    let raf = 0
    let start: number | undefined
    const step = (t: number) => {
      if (start === undefined) start = t
      const progress = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(eased * end)
      if (progress < 1) raf = requestAnimationFrame(step)
      else setCount(end)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, duration])

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString('es-ES')

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
