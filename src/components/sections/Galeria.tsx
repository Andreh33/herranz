'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionReveal } from '@/components/ui/SectionReveal'

interface GalItem {
  emoji: string
  titulo: string
  evento: string
  ratio: string
  gradient: string
}

const galeria: GalItem[] = [
  { emoji: '🪑', titulo: 'Sillas Chiavari doradas', evento: 'Boda en Finca El Pinar', ratio: 'aspect-[4/5]', gradient: 'from-amarillo-dark/30 to-negro-200' },
  { emoji: '🍽️', titulo: 'Mesa imperial', evento: 'Comunión en Alcobendas', ratio: 'aspect-[4/3]', gradient: 'from-turquesa-xdark/40 to-negro-100' },
  { emoji: '⛺', titulo: 'Carpa pagoda', evento: 'Evento al aire libre', ratio: 'aspect-[3/4]', gradient: 'from-turquesa-dark/30 to-negro-200' },
  { emoji: '🌸', titulo: 'Decoración floral', evento: 'Boda civil en jardín', ratio: 'aspect-square', gradient: 'from-amarillo-glow to-negro-200' },
  { emoji: '🎊', titulo: 'Montaje completo', evento: 'Comunión Madrid', ratio: 'aspect-[4/5]', gradient: 'from-turquesa-glow to-negro-100' },
  { emoji: '🥂', titulo: 'Barra de bar', evento: 'Cóctel corporativo', ratio: 'aspect-[3/4]', gradient: 'from-amarillo-dark/25 to-negro-200' },
  { emoji: '🪑', titulo: 'Sillas Cross Back', evento: 'Boda rústica Sanse', ratio: 'aspect-[4/3]', gradient: 'from-piedra/40 to-negro-100' },
  { emoji: '🎂', titulo: 'Mesa dulce', evento: 'Comunión en Sanse', ratio: 'aspect-square', gradient: 'from-amarillo-glow to-negro-200' },
  { emoji: '⛺', titulo: 'Carpa + mesas', evento: 'Jardín privado', ratio: 'aspect-[4/5]', gradient: 'from-turquesa-xdark/35 to-negro-100' },
]

export function Galeria() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? null : Math.max(0, i - 1)))
      if (e.key === 'ArrowRight')
        setLightbox((i) => (i === null ? null : Math.min(galeria.length - 1, i + 1)))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section
      id="galeria"
      className="relative bg-negro-50 py-section overflow-hidden"
    >
      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-turquesa" />
              <span className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa">
                Eventos recientes
              </span>
            </div>
          </SectionReveal>
          <AnimatedText
            text="Cada montaje, una historia"
            el="h2"
            className="font-display text-display-lg text-blanco"
          />
          <SectionReveal delay={0.3}>
            <p className="mt-6 text-blanco-3 text-base lg:text-lg leading-relaxed max-w-2xl">
              Una pequeña muestra de los últimos eventos que hemos tenido el
              placer de equipar. Haz clic en cualquier imagen para verla en
              detalle.
            </p>
          </SectionReveal>
        </div>

        {/* Masonry grid via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {galeria.map((item, i) => (
            <GaleriaItem
              key={i}
              item={item}
              idx={i}
              onOpen={() => setLightbox(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1000] bg-negro/97 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 border border-white/15 hover:border-turquesa text-blanco-2 hover:text-turquesa transition-colors flex items-center justify-center z-10"
              onClick={() => setLightbox(null)}
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/15 hover:border-turquesa text-blanco-2 hover:text-turquesa transition-colors flex items-center justify-center z-10 disabled:opacity-20"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? null : Math.max(0, i - 1)))
              }}
              disabled={lightbox === 0}
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/15 hover:border-turquesa text-blanco-2 hover:text-turquesa transition-colors flex items-center justify-center z-10 disabled:opacity-20"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) =>
                  i === null ? null : Math.min(galeria.length - 1, i + 1)
                )
              }}
              disabled={lightbox === galeria.length - 1}
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl aspect-[4/5] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${galeria[lightbox].gradient}`}
              />
              <span className="relative text-[16rem]">
                {galeria[lightbox].emoji}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-negro to-transparent">
                <p className="text-[0.6rem] tracking-[0.4em] uppercase text-turquesa mb-2">
                  {galeria[lightbox].evento}
                </p>
                <h3 className="font-display text-3xl text-blanco">
                  {galeria[lightbox].titulo}
                </h3>
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.35em] uppercase text-blanco-3">
              {lightbox + 1} / {galeria.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GaleriaItem({
  item,
  idx,
  onOpen,
}: {
  item: GalItem
  idx: number
  onOpen: () => void
}) {
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block w-full ${item.ratio} overflow-hidden border border-white/[0.06] hover:border-turquesa/30 transition-colors break-inside-avoid`}
      data-cursor="cta"
      data-cursor-label="VER"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
      <div className="absolute inset-0 flex items-center justify-center text-[6rem] transition-transform duration-700 group-hover:scale-110">
        {item.emoji}
      </div>
      <div className="absolute inset-0 bg-negro/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-[0.55rem] tracking-[0.35em] uppercase text-turquesa">
          {item.evento}
        </p>
        <h3 className="font-display text-lg text-blanco mt-1">{item.titulo}</h3>
      </div>
    </motion.button>
  )
}
