'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionReveal } from '@/components/ui/SectionReveal'

const testimonios = [
  { nombre: 'María García', evento: 'Boda en Alcalá de Henares', texto: 'El servicio fue impecable. Las sillas Chiavari quedaron preciosas y el montaje fue rapidísimo. 100% recomendable para cualquier boda.', stars: 5 },
  { nombre: 'Carlos Martínez', evento: 'Comunión en Sanse', texto: 'Llevamos años contando con Alquileres Herranz para las fiestas de la familia. Siempre impecables y muy atentos. Una empresa de toda la vida.', stars: 5 },
  { nombre: 'Laura Sánchez', evento: 'Evento corporativo Madrid', texto: 'Gestionaron todo el mobiliario para nuestro evento de empresa. Puntualidad, profesionalidad y un precio muy ajustado. Volveremos a contar con ellos.', stars: 5 },
  { nombre: 'Javier López', evento: 'Boda en finca en Colmenar', texto: 'La carpa pagoda fue el elemento estrella de nuestra boda al aire libre. El equipo de montaje fue extraordinario y muy puntual.', stars: 5 },
  { nombre: 'Ana Fernández', evento: 'Bautizo en Tres Cantos', texto: 'Pedí presupuesto y en pocas horas ya tenía todo organizado. Muy fácil trabajar con ellos. Vinieron, montaron y se fueron sin que nos enteráramos.', stars: 5 },
  { nombre: 'Roberto Díaz', evento: 'Comunión en Alcobendas', texto: 'Material en perfecto estado, entrega puntual y recogida al día siguiente sin ningún problema. Repetiremos seguro el año que viene.', stars: 5 },
]

const marqueeWords = [
  'BODAS',
  'COMUNIONES',
  'EVENTOS',
  'MADRID',
  'EXCELENCIA',
  '20 AÑOS',
]

export function Testimonios() {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current || !containerRef.current) return
      const trackW = trackRef.current.scrollWidth
      const contW = containerRef.current.clientWidth
      setConstraints({ left: Math.min(0, contW - trackW), right: 0 })
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const cardWidth = 420
  const gap = 24

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, testimonios.length - 1))
    setActiveIdx(clamped)
    const target = Math.max(constraints.left, -(clamped * (cardWidth + gap)))
    animate(x, target, {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    })
  }

  return (
    <section className="relative bg-negro py-section overflow-hidden">
      <div className="bg-grid-dense absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-turquesa" />
                <span className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa">
                  Testimonios reales
                </span>
              </div>
            </SectionReveal>
            <AnimatedText
              text="Lo que dicen quienes han confiado en nosotros"
              el="h2"
              className="font-display text-display-lg text-blanco max-w-3xl"
            />
          </div>

          {/* Controles */}
          <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-3">
            <button
              onClick={() => goTo(activeIdx - 1)}
              disabled={activeIdx === 0}
              className="w-12 h-12 border border-white/15 hover:border-turquesa hover:text-turquesa text-blanco-3 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => goTo(activeIdx + 1)}
              disabled={activeIdx === testimonios.length - 1}
              className="w-12 h-12 border border-white/15 hover:border-turquesa hover:text-turquesa text-blanco-3 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carrusel drag */}
        <div ref={containerRef} className="overflow-hidden -mx-6 lg:-mx-10 px-6 lg:px-10">
          <motion.div
            ref={trackRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing select-none"
            data-cursor="drag"
            data-cursor-label="ARRASTRA"
            drag="x"
            dragConstraints={constraints}
            dragElastic={0.08}
            style={{ x }}
          >
            {testimonios.map((t, i) => (
              <TestimonioCard key={i} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {testimonios.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'h-[2px] transition-all duration-500',
                activeIdx === i ? 'w-10 bg-turquesa' : 'w-5 bg-white/15 hover:bg-white/30'
              )}
              aria-label={`Ir a testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Marquee inferior */}
      <div className="mt-20 lg:mt-28 overflow-hidden border-t border-b border-turquesa/15 py-6">
        <div className="marquee-track">
          {[...Array(3)].flatMap((_, k) =>
            marqueeWords.map((w, i) => (
              <span
                key={`${k}-${i}`}
                className="font-display italic text-2xl lg:text-3xl text-blanco-2 tracking-tight flex items-center gap-12"
              >
                {w}
                <span className="text-turquesa">·</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function TestimonioCard({ t }: { t: (typeof testimonios)[number] }) {
  return (
    <div className="relative w-[380px] sm:w-[420px] flex-shrink-0 bg-negro-100 border border-white/[0.06] p-8 lg:p-10 min-h-[340px] flex flex-col hover:border-turquesa/30 transition-colors duration-500">
      <Quote
        size={48}
        className="absolute top-6 left-6 text-turquesa/12"
        strokeWidth={1}
      />
      <div className="relative flex-1 flex flex-col pt-12">
        <p className="font-display italic text-lg lg:text-xl text-blanco leading-snug flex-1">
          &ldquo;{t.texto}&rdquo;
        </p>
        <div className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-turquesa text-sm tracking-wide">{t.nombre}</p>
            <p className="text-blanco-4 text-xs tracking-wider mt-1">{t.evento}</p>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star key={i} size={11} className="text-amarillo" fill="#F5C518" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
