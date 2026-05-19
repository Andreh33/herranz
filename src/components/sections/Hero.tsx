'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CounterUp } from '@/components/ui/CounterUp'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { ParticlesCanvas } from './ParticlesCanvas'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const subY = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-negro"
    >
      <div className="absolute inset-0 bg-grid-dark opacity-60" />
      <div className="absolute inset-0 bg-hero-radial" />
      <ParticlesCanvas />

      {/* Texto vertical decorativo */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="block rotate-180 [writing-mode:vertical-rl] text-[0.6rem] tracking-[0.5em] uppercase text-blanco/15">
          Alquileres Herranz · {new Date().getFullYear()}
        </span>
      </div>

      {/* Glow esquinas */}
      <div className="absolute top-32 left-10 w-2 h-2 rounded-full bg-turquesa shadow-turquesa-sm hidden lg:block" />
      <div className="absolute bottom-32 right-32 w-2 h-2 rounded-full bg-amarillo shadow-amarillo-sm hidden lg:block animate-pulse" />

      <motion.div
        className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-10 w-full pt-28 lg:pt-20 pb-32 lg:pb-24"
        style={{ opacity }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="block w-8 h-px bg-turquesa" />
          <span className="text-[0.62rem] tracking-[0.45em] uppercase text-turquesa">
            Mobiliario para eventos · San Sebastián de los Reyes
          </span>
          <span className="block w-8 h-px bg-turquesa" />
        </motion.div>

        {/* Headline */}
        <motion.div style={{ y: headlineY }}>
          <h1 className="font-display text-display-2xl leading-[0.95] tracking-[-0.03em]">
            <span className="block overflow-hidden">
              <AnimatedText
                text="Tu evento merece"
                el="span"
                className="block text-blanco"
                delay={3.0}
                stagger={0.08}
              />
            </span>
            <span className="block overflow-hidden">
              <AnimatedText
                text="lo extraordinario."
                el="span"
                className="block italic text-turquesa"
                delay={3.4}
                stagger={0.08}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.div style={{ y: subY }}>
          <motion.p
            className="mt-8 max-w-xl text-blanco-3 text-base lg:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 4.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Alquiler de sillas, mesas y mobiliario premium para bodas, comuniones
            y eventos en Madrid. Más de 20 años haciendo que cada celebración
            sea inolvidable.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 4.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton variant="amarillo" href="#presupuesto" cursorLabel="PEDIR">
              Solicitar Presupuesto
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="ghost" href="#catalogo" cursorLabel="VER">
              Ver Catálogo
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 lg:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-0 lg:divide-x lg:divide-turquesa/20 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 5.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <Stat number={20} suffix="+" label="años de experiencia" />
          <Stat number={5000} suffix="+" label="eventos realizados" />
          <Stat label="Madrid" sub="y alrededores" isLocation />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.4 }}
      >
        <span className="text-[0.6rem] tracking-[0.4em] uppercase text-blanco-4">
          Descubre
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-turquesa" />
        </motion.div>
      </motion.div>
    </section>
  )
}

interface StatProps {
  number?: number
  suffix?: string
  label: string
  sub?: string
  isLocation?: boolean
}

function Stat({ number, suffix, label, sub, isLocation }: StatProps) {
  return (
    <div className="px-0 lg:px-6 first:lg:pl-0">
      {!isLocation && number !== undefined ? (
        <div className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-blanco leading-none flex items-baseline">
          <CounterUp end={number} className="tabular-nums" />
          {suffix && <span className="text-turquesa ml-0.5">{suffix}</span>}
        </div>
      ) : (
        <div className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-blanco leading-none italic">
          {label}
        </div>
      )}
      {!isLocation && (
        <p className="mt-3 text-[0.62rem] tracking-[0.3em] uppercase text-blanco-3">
          {label}
        </p>
      )}
      {sub && (
        <p className="mt-3 text-[0.62rem] tracking-[0.3em] uppercase text-blanco-3">
          {sub}
        </p>
      )}
    </div>
  )
}
