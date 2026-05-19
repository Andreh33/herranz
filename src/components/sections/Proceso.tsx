'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Phone, FileText, CheckCircle2, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionReveal } from '@/components/ui/SectionReveal'

interface Paso {
  num: string
  title: string
  desc: string
  icon: LucideIcon
}

const pasos: Paso[] = [
  {
    num: '01',
    title: 'Contacto',
    desc: 'Llámanos al 912 35 70 93 o escríbenos. Cuéntanos cuándo es tu evento, dónde y qué necesitas. Sin compromiso.',
    icon: Phone,
  },
  {
    num: '02',
    title: 'Presupuesto',
    desc: 'En menos de 24 horas recibirás un presupuesto detallado por correo electrónico con todas las opciones disponibles.',
    icon: FileText,
  },
  {
    num: '03',
    title: 'Confirmación',
    desc: 'Reservamos tu fecha y el material que necesitas. Acordamos hora de entrega y montaje en el lugar del evento.',
    icon: CheckCircle2,
  },
  {
    num: '04',
    title: 'El gran día',
    desc: 'Entregamos, montamos y recogemos al finalizar. Tú solo te ocupas de disfrutar y de tus invitados.',
    icon: Sparkles,
  },
]

export function Proceso() {
  return (
    <section
      id="proceso"
      className="relative bg-negro-50 py-section overflow-hidden"
    >
      <div className="bg-grid-dense absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-turquesa" />
              <span className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa">
                Cómo trabajamos
              </span>
            </div>
          </SectionReveal>
          <AnimatedText
            text="Un proceso simple y transparente"
            el="h2"
            className="font-display text-display-lg text-blanco"
          />
          <SectionReveal delay={0.3}>
            <p className="mt-6 text-blanco-3 text-lg max-w-xl leading-relaxed">
              Desde la primera llamada hasta el último brindis, te acompañamos
              en cada paso.
            </p>
          </SectionReveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical central */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px -translate-x-px hidden md:block">
            <TimelineLine />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {pasos.map((paso, i) => (
              <PasoItem key={i} paso={paso} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineLine() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0 })
  return (
    <div ref={ref} className="h-full relative">
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-turquesa via-turquesa to-transparent origin-top"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '1px', height: '100%' }}
      />
    </div>
  )
}

function PasoItem({ paso, idx }: { paso: Paso; idx: number }) {
  const Icon = paso.icon
  const isLeft = idx % 2 === 0
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative"
    >
      {/* Dot en línea */}
      <span className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-turquesa border border-negro shadow-turquesa-sm z-10" />

      {/* Lado izquierdo (texto si idx par) */}
      <div
        className={`pl-16 md:pl-0 ${
          isLeft ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'
        }`}
      >
        <div
          className={`relative inline-block ${
            isLeft ? 'md:float-right' : ''
          }`}
        >
          <span className="font-display text-[clamp(3.5rem,7vw,6rem)] text-transparent leading-none [-webkit-text-stroke:1px_rgb(0_191_179_/_0.25)]">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block"
              style={{
                background: 'linear-gradient(180deg, #00BFB3 0%, #00BFB3 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: inView ? '#00BFB3' : 'transparent',
                transition: 'color 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              {paso.num}
            </motion.span>
          </span>
        </div>
        <h3
          className={`mt-2 font-display text-display-md text-blanco ${
            isLeft ? 'md:text-right' : ''
          }`}
        >
          {paso.title}
        </h3>
        <p
          className={`mt-4 text-blanco-3 leading-relaxed max-w-md ${
            isLeft ? 'md:text-right md:ml-auto' : ''
          }`}
        >
          {paso.desc}
        </p>
      </div>

      {/* Lado derecho (icono) */}
      <div className={`hidden md:flex ${isLeft ? 'md:pl-12' : 'md:order-1 md:pr-12 md:justify-end'}`}>
        <div className="w-24 h-24 border border-turquesa/30 flex items-center justify-center bg-negro/40 backdrop-blur-sm">
          <Icon size={28} className="text-turquesa" />
        </div>
      </div>
    </motion.div>
  )
}
