'use client'
import { Truck, MessageSquareHeart, MapPin } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { CounterUp } from '@/components/ui/CounterUp'
import { GlowCard } from '@/components/ui/GlowCard'
import { AnimatedText } from '@/components/ui/AnimatedText'

const stats = [
  { value: 20, suffix: '+', label: 'años de experiencia' },
  { value: 5000, suffix: '+', label: 'eventos realizados' },
  { value: 2000, suffix: '+', label: 'clientes satisfechos' },
  { value: 48, suffix: 'h', label: 'entrega garantizada' },
]

const cards = [
  {
    icon: Truck,
    title: 'Entrega y montaje',
    desc: 'Llevamos, montamos y recogemos. Tú solo te ocupas de disfrutar tu evento.',
  },
  {
    icon: MessageSquareHeart,
    title: 'Asesoramiento experto',
    desc: 'Un equipo veterano te acompaña desde la primera llamada hasta la última silla.',
  },
  {
    icon: MapPin,
    title: 'Cobertura Madrid',
    desc: 'San Sebastián de los Reyes y toda la Comunidad de Madrid sin sorpresas.',
  },
]

export function PorQueNosotros() {
  return (
    <section className="relative bg-negro py-section overflow-hidden">
      <div className="bg-cta-glow absolute inset-0 opacity-80 pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-amarillo" />
              <span className="text-[0.62rem] tracking-[0.4em] uppercase text-amarillo">
                ¿Por qué Herranz?
              </span>
            </div>
          </SectionReveal>
          <AnimatedText
            text="Números que respaldan cada montaje"
            el="h2"
            className="font-display text-display-lg text-blanco"
          />
        </div>

        {/* Stats */}
        <SectionReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-turquesa/15 mb-24 lg:mb-32">
            {stats.map((s, i) => (
              <div key={i} className="px-0 lg:px-8 first:lg:pl-0">
                <div className="font-display text-[clamp(2.6rem,5vw,4.5rem)] text-blanco leading-none flex items-baseline">
                  <CounterUp end={s.value} className="tabular-nums" />
                  <span className="text-turquesa ml-1">{s.suffix}</span>
                </div>
                <p className="mt-3 text-[0.62rem] tracking-[0.3em] uppercase text-blanco-3">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <SectionReveal key={i} delay={i * 0.15}>
                <GlowCard className="p-8 lg:p-10 h-full" tilt>
                  <div className="w-14 h-14 border border-turquesa/40 flex items-center justify-center mb-8">
                    <Icon size={20} className="text-turquesa" />
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-blanco mb-4">
                    {c.title}
                  </h3>
                  <p className="text-blanco-3 leading-relaxed text-[0.95rem]">
                    {c.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-[0.62rem] tracking-[0.35em] uppercase text-turquesa">
                    <span className="block w-6 h-px bg-turquesa" />
                    0{i + 1}
                  </div>
                </GlowCard>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
