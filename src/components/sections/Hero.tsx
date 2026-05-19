'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CounterUp } from '@/components/ui/CounterUp'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { ParticlesCanvas } from './ParticlesCanvas'
import { photos } from '@/lib/photos'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Parallax muy sutil
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 0.8, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-negro"
    >
      {/* Imagen de fondo con tinte */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <Image
          src={photos.banqueteElegante}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-negro/85 via-negro/75 to-negro" />
      </motion.div>

      <div className="absolute inset-0 bg-grid-dark opacity-50 z-0" />
      <div className="absolute inset-0 bg-hero-radial z-0" />
      <ParticlesCanvas />

      {/* Texto vertical decorativo */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block z-10">
        <span className="block rotate-180 [writing-mode:vertical-rl] text-[0.6rem] tracking-[0.5em] uppercase text-blanco/15">
          Alquileres Herranz · {new Date().getFullYear()}
        </span>
      </div>
      {/* Texto vertical decorativo izquierda */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block z-10">
        <span className="block [writing-mode:vertical-rl] text-[0.6rem] tracking-[0.5em] uppercase text-blanco/15">
          Madrid · CAM
        </span>
      </div>

      {/* Puntos decorativos */}
      <div className="absolute top-32 left-24 w-1.5 h-1.5 rounded-full bg-turquesa shadow-turquesa-sm hidden lg:block z-10" />
      <div className="absolute bottom-32 right-24 w-1.5 h-1.5 rounded-full bg-amarillo shadow-amarillo-sm hidden lg:block animate-pulse z-10" />

      {/* CONTENIDO PRINCIPAL — CENTRADO */}
      <motion.div
        className="relative z-10 w-full max-w-[1500px] mx-auto px-6 lg:px-10 pt-24 lg:pt-20 pb-20 lg:pb-16 text-center flex flex-col items-center"
        style={{ opacity, y: contentY }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2 mb-10 px-2"
        >
          <span className="hidden sm:block w-6 lg:w-8 h-px bg-turquesa" />
          <span className="text-[0.58rem] sm:text-[0.62rem] tracking-[0.35em] sm:tracking-[0.45em] uppercase text-turquesa text-center">
            Mobiliario para eventos · San Sebastián de los Reyes
          </span>
          <span className="hidden sm:block w-6 lg:w-8 h-px bg-turquesa" />
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-display-xl leading-[0.95] tracking-[-0.025em]">
          <AnimatedText
            text="Tu evento merece"
            el="span"
            className="block text-blanco"
            delay={3.0}
            stagger={0.08}
          />
          <AnimatedText
            text="lo extraordinario."
            el="span"
            className="block italic text-turquesa"
            delay={3.4}
            stagger={0.08}
          />
        </h1>

        {/* Subheadline */}
        <motion.p
          className="mt-10 max-w-2xl text-blanco-3 text-base lg:text-lg leading-relaxed"
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
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
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

        {/* Stats */}
        <motion.div
          className="mt-16 lg:mt-20 grid grid-cols-3 gap-6 lg:gap-0 lg:divide-x lg:divide-turquesa/20 w-full max-w-3xl"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.4 }}
        style={{ opacity }}
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
    <div className="px-0 lg:px-8 text-center">
      {!isLocation && number !== undefined ? (
        <div className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-blanco leading-none flex items-baseline justify-center">
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
