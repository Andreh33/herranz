'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, AlertCircle } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { GlowCard } from '@/components/ui/GlowCard'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

type Cat =
  | 'todos'
  | 'sillas'
  | 'mesas'
  | 'manteleria'
  | 'carpas'
  | 'tarimas'
  | 'decoracion'
  | 'barras'

interface Item {
  id: number
  cat: Exclude<Cat, 'todos'>
  nombre: string
  desc: string
  disponible: boolean
  destacado: boolean
  emoji: string
}

const items: Item[] = [
  { id: 1, cat: 'sillas', nombre: 'Silla Chiavari', desc: 'Elegante silla de resina, acabados dorados y plateados para eventos premium.', disponible: true, destacado: true, emoji: '🪑' },
  { id: 2, cat: 'sillas', nombre: 'Silla Tiffany', desc: 'Clásica y versátil, perfecta para bodas civiles y banquetes formales.', disponible: true, destacado: false, emoji: '🪑' },
  { id: 3, cat: 'sillas', nombre: 'Silla Cross Back', desc: 'Estilo rústico y moderno, ideal para bodas al aire libre.', disponible: true, destacado: false, emoji: '🪑' },
  { id: 4, cat: 'mesas', nombre: 'Mesa Redonda Ø150', desc: 'Para 8-10 comensales. La opción reina para bodas y comuniones.', disponible: true, destacado: true, emoji: '🍽️' },
  { id: 5, cat: 'mesas', nombre: 'Mesa Imperial', desc: 'Rectangular para banquetes largos y eventos corporativos.', disponible: true, destacado: false, emoji: '🍽️' },
  { id: 6, cat: 'mesas', nombre: 'Mesa Cocktail Alta', desc: 'Perfecta para cócteles, vinos de honor y reuniones informales.', disponible: true, destacado: false, emoji: '🥂' },
  { id: 7, cat: 'mesas', nombre: 'Mesa Madera Maciza', desc: 'Rústica y elegante para bodas campestres y al aire libre.', disponible: false, destacado: false, emoji: '🪵' },
  { id: 8, cat: 'manteleria', nombre: 'Mantel Blanco Roto', desc: 'Algodón 100%, disponible en todas las medidas estándar.', disponible: true, destacado: false, emoji: '🤍' },
  { id: 9, cat: 'manteleria', nombre: 'Camino Mesa Lino', desc: 'Acabado rústico para realzar mesas imperiales y redondas.', disponible: true, destacado: false, emoji: '🧵' },
  { id: 10, cat: 'carpas', nombre: 'Carpa Pagoda 5×5m', desc: 'Carpa modular elegante, ampliable a la medida del evento.', disponible: true, destacado: true, emoji: '⛺' },
  { id: 11, cat: 'tarimas', nombre: 'Tarima Modular', desc: 'Sistema flexible para escenarios, pistas de baile y altares.', disponible: true, destacado: false, emoji: '🪜' },
  { id: 12, cat: 'barras', nombre: 'Barra de Bar Portátil', desc: 'Completa con faldón y estantes. Varios acabados disponibles.', disponible: true, destacado: false, emoji: '🍸' },
  { id: 13, cat: 'decoracion', nombre: 'Centro Floral', desc: 'Arreglos personalizados con flor natural y artificial.', disponible: true, destacado: false, emoji: '🌸' },
  { id: 14, cat: 'decoracion', nombre: 'Candelabros', desc: 'Set de candelabros dorados y plateados para mesas largas.', disponible: true, destacado: false, emoji: '🕯️' },
]

const tabs: { id: Cat; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'sillas', label: 'Sillas' },
  { id: 'mesas', label: 'Mesas' },
  { id: 'manteleria', label: 'Mantelería' },
  { id: 'carpas', label: 'Carpas' },
  { id: 'tarimas', label: 'Tarimas' },
  { id: 'decoracion', label: 'Decoración' },
  { id: 'barras', label: 'Barras' },
]

export function Catalogo() {
  const [active, setActive] = useState<Cat>('todos')

  const filtered = useMemo(
    () => (active === 'todos' ? items : items.filter((i) => i.cat === active)),
    [active]
  )

  return (
    <section
      id="catalogo"
      className="relative bg-negro py-section overflow-hidden"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-turquesa" />
                <span className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa">
                  Catálogo · {items.length} referencias
                </span>
              </div>
            </SectionReveal>
            <AnimatedText
              text="Todo lo que necesitas, bajo un mismo proveedor"
              el="h2"
              className="font-display text-display-lg text-blanco"
            />
          </div>
          <SectionReveal delay={0.3} className="lg:col-span-5">
            <p className="text-blanco-3 text-base lg:text-lg leading-relaxed">
              Explora nuestro catálogo. Si no encuentras algo específico,
              cuéntanos — el stock crece cada mes.
            </p>
          </SectionReveal>
        </div>

        {/* Tabs */}
        <SectionReveal delay={0.4}>
          <div className="flex flex-wrap gap-2 mb-12 lg:mb-16">
            {tabs.map((t) => {
              const isActive = active === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    'relative px-5 py-2.5 text-[0.7rem] tracking-[0.22em] uppercase transition-colors duration-300',
                    isActive
                      ? 'text-negro'
                      : 'text-blanco-3 hover:text-blanco border border-white/15 hover:border-turquesa/40'
                  )}
                  data-cursor="hover"
                >
                  {isActive && (
                    <motion.span
                      layoutId="cat-active"
                      className="absolute inset-0 bg-turquesa -z-0"
                      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              )
            })}
          </div>
        </SectionReveal>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <ItemCard key={item.id} item={item} idx={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA bottom */}
        <SectionReveal delay={0.3}>
          <div className="mt-16 lg:mt-20 text-center border-t border-white/[0.06] pt-12">
            <p className="text-blanco-3 text-base lg:text-lg mb-6">
              ¿No encuentras lo que buscas? Cuéntanos tu evento y lo conseguimos.
            </p>
            <MagneticButton variant="amarillo" href="#presupuesto" cursorLabel="PEDIR">
              Solicitar Asesoramiento
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function ItemCard({ item, idx }: { item: Item; idx: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.55, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlowCard className="group relative aspect-[3/4] flex flex-col" tilt>
        {/* Visual placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-negro-300/80 via-negro-200 to-negro-100" />
        <div className="absolute inset-0 flex items-center justify-center text-[7rem] opacity-90 transition-transform duration-700 group-hover:scale-110">
          {item.emoji}
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          {item.destacado && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amarillo/95 text-negro text-[0.55rem] tracking-[0.25em] uppercase font-medium">
              <Star size={9} fill="#070707" /> Destacado
            </span>
          )}
          {!item.disponible && (
            <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/20 bg-negro/70 backdrop-blur-sm text-blanco-3 text-[0.55rem] tracking-[0.25em] uppercase">
              <AlertCircle size={9} /> Consultar
            </span>
          )}
        </div>

        {/* Overlay inferior */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/90 to-transparent" />
          <div className="relative">
            <p className="text-[0.58rem] tracking-[0.35em] uppercase text-turquesa mb-2">
              {item.cat}
            </p>
            <h3 className="font-display text-lg lg:text-xl text-blanco mb-1.5 leading-tight">
              {item.nombre}
            </h3>
            <p className="text-blanco-3 text-[0.78rem] leading-snug line-clamp-2">
              {item.desc}
            </p>

            {/* Hover reveal */}
            <div className="overflow-hidden mt-4 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500 ease-out">
              <a
                href="#presupuesto"
                data-cursor="cta"
                data-cursor-label="PEDIR"
                className="inline-flex items-center gap-2 text-turquesa text-[0.62rem] tracking-[0.3em] uppercase border-b border-turquesa pb-1"
              >
                Solicitar
                <ArrowRight size={11} />
              </a>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
