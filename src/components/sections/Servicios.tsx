'use client'
import { Check, Sparkles, Heart, PartyPopper } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { GlowCard } from '@/components/ui/GlowCard'

interface Servicio {
  icon: LucideIcon
  label: string
  title: string
  desc: string
  features: string[]
  visualEmoji: string
  glow: 'turquesa' | 'amarillo'
  align: 'left' | 'right'
}

const servicios: Servicio[] = [
  {
    icon: Sparkles,
    label: '01 · Alquiler completo',
    title: 'Mobiliario completo para tu evento',
    desc: 'Catálogo amplio y versátil — desde sillas premium hasta carpas modulares. Todo bajo un mismo proveedor para que tú solo tengas que ocuparte de disfrutar.',
    features: [
      'Entrega a domicilio puntual',
      'Montaje incluido en el servicio',
      'Recogida al finalizar el evento',
      'Asesoramiento gratuito por equipo experto',
    ],
    visualEmoji: '🪑',
    glow: 'turquesa',
    align: 'left',
  },
  {
    icon: Heart,
    label: '02 · Bodas',
    title: 'El día más especial merece lo mejor',
    desc: 'Cada boda es única. Personalizamos cada propuesta con base en el estilo de los novios, el lugar y el número de invitados. Coordinamos con tus proveedores para que el día fluya sin sorpresas.',
    features: [
      'Paquetes a medida según estilo',
      'Coordinación con catering y decoración',
      'Visita previa al lugar sin compromiso',
      'Cobertura en toda la Comunidad de Madrid',
    ],
    visualEmoji: '💍',
    glow: 'amarillo',
    align: 'right',
  },
  {
    icon: PartyPopper,
    label: '03 · Comuniones y eventos sociales',
    title: 'Comuniones, bautizos y celebraciones',
    desc: 'Las celebraciones familiares son nuestro día a día. Nos volcamos para que cada comunión o bautizo tenga el mobiliario perfecto, sin importar el tamaño del evento.',
    features: [
      'Presupuesto sin compromiso en 24h',
      'Disponibilidad fines de semana',
      'Stock amplio para fechas concurridas',
      'Precios competitivos y transparentes',
    ],
    visualEmoji: '🎊',
    glow: 'turquesa',
    align: 'left',
  },
]

export function Servicios() {
  return (
    <section
      id="servicios"
      className="relative bg-negro-100 py-section overflow-hidden"
    >
      <div className="bg-noise absolute inset-0 opacity-[0.025] pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-turquesa" />
              <span className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa">
                Servicios
              </span>
            </div>
          </SectionReveal>
          <AnimatedText
            text="Lo que hacemos por ti"
            el="h2"
            className="font-display text-display-lg text-blanco"
          />
          <SectionReveal delay={0.3}>
            <p className="mt-6 text-blanco-3 text-lg max-w-xl leading-relaxed">
              Tres servicios principales pensados para que tu evento sea
              impecable de principio a fin.
            </p>
          </SectionReveal>
        </div>

        {/* Servicios */}
        <div className="space-y-24 lg:space-y-32">
          {servicios.map((s, idx) => (
            <ServicioRow key={idx} servicio={s} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicioRow({ servicio, idx }: { servicio: Servicio; idx: number }) {
  const Icon = servicio.icon
  const isRight = servicio.align === 'right'
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
        isRight ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Texto */}
      <SectionReveal
        direction={isRight ? 'right' : 'left'}
        className="lg:col-span-6"
      >
        <p className="text-[0.62rem] tracking-[0.45em] uppercase text-turquesa mb-4">
          {servicio.label}
        </p>
        <h3 className="font-display text-display-md text-blanco max-w-lg leading-tight">
          {servicio.title}
        </h3>
        <p className="mt-6 text-blanco-3 text-base lg:text-[1.05rem] leading-relaxed max-w-lg">
          {servicio.desc}
        </p>
        <ul className="mt-8 space-y-3 max-w-lg">
          {servicio.features.map((f, i) => (
            <SectionReveal key={i} delay={i * 0.06} direction="up">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 border border-turquesa/50 flex items-center justify-center mt-0.5">
                  <Check size={11} className="text-turquesa" />
                </span>
                <span className="text-blanco-2 text-[0.95rem]">{f}</span>
              </li>
            </SectionReveal>
          ))}
        </ul>
      </SectionReveal>

      {/* Visual */}
      <SectionReveal
        direction={isRight ? 'left' : 'right'}
        delay={0.2}
        className="lg:col-span-6"
      >
        <GlowCard glowColor={servicio.glow} className="aspect-[4/3] relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              servicio.glow === 'turquesa'
                ? 'from-turquesa-xdark/30 via-negro-200 to-negro-100'
                : 'from-amarillo-dark/20 via-negro-200 to-negro-100'
            }`}
          />
          <div className="absolute inset-0 flex items-center justify-center text-[8rem] opacity-90">
            {servicio.visualEmoji}
          </div>
          <div className="absolute top-6 left-6 w-12 h-12 border border-turquesa/40 flex items-center justify-center bg-negro/50 backdrop-blur-sm">
            <Icon size={18} className="text-turquesa" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-negro/90 to-transparent">
            <span className="font-display text-[5rem] text-turquesa/15 leading-none">
              0{idx + 1}
            </span>
          </div>
        </GlowCard>
      </SectionReveal>
    </div>
  )
}
