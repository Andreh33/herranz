'use client'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

const horario = [
  { dia: 'Lunes a Viernes', tramos: ['09:00 — 14:00', '16:00 — 19:00'] },
  { dia: 'Sábados', tramos: ['09:00 — 13:00'] },
  { dia: 'Domingos', tramos: ['Cerrado'] },
]

export function Contacto() {
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Avenida+del+Camino+de+Lo+Cortao+6+28703+San+Sebasti%C3%A1n+de+los+Reyes'
  const embedUrl =
    'https://www.google.com/maps?q=Avenida+del+Camino+de+Lo+Cortao+6,+28703+San+Sebasti%C3%A1n+de+los+Reyes&output=embed'

  return (
    <section
      id="contacto"
      className="relative bg-negro py-section overflow-hidden"
    >
      <div className="bg-grid-dark absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Izquierda: datos */}
          <div className="lg:col-span-5">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-turquesa" />
                <span className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa">
                  Estamos aquí para ti
                </span>
              </div>
            </SectionReveal>
            <AnimatedText
              text="Visítanos o llámanos"
              el="h2"
              className="font-display text-display-lg text-blanco"
            />
            <SectionReveal delay={0.3}>
              <p className="mt-6 text-blanco-3 text-base lg:text-lg leading-relaxed max-w-md">
                Puedes pasarte por nuestras oficinas en Sanse o llamarnos para
                cualquier consulta. Estaremos encantados de atenderte.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <div className="mt-10 space-y-4">
                <ContactCard
                  icon={Phone}
                  label="Teléfono"
                  value="912 35 70 93"
                  href="tel:912357093"
                />
                <ContactCard
                  icon={Mail}
                  label="Email"
                  value="info@alquileresherranz.es"
                  href="mailto:info@alquileresherranz.es"
                />
                <ContactCard
                  icon={MapPin}
                  label="Dirección"
                  value="Av. del Camino de Lo Cortao 6, 28703 San Sebastián de los Reyes, Madrid"
                />
              </div>
            </SectionReveal>

            {/* Horario */}
            <SectionReveal delay={0.5}>
              <div className="mt-10 border-t border-white/[0.06] pt-8">
                <h4 className="text-[0.6rem] tracking-[0.4em] uppercase text-turquesa mb-5">
                  Horario de oficina
                </h4>
                <div className="space-y-3">
                  {horario.map((h) => (
                    <div
                      key={h.dia}
                      className="flex items-baseline justify-between text-sm gap-4"
                    >
                      <span className="text-blanco-2">{h.dia}</span>
                      <div className="flex-1 mx-3 border-b border-dashed border-white/8" />
                      <div className="text-blanco-3 text-right tabular-nums">
                        {h.tramos.map((t, i) => (
                          <span key={i} className="block">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.6}>
              <div className="mt-10">
                <MagneticButton variant="ghost" href={mapsUrl} cursorLabel="ABRIR">
                  Abrir en Google Maps
                  <ExternalLink size={14} />
                </MagneticButton>
              </div>
            </SectionReveal>
          </div>

          {/* Derecha: mapa */}
          <SectionReveal direction="right" delay={0.3} className="lg:col-span-7">
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden border border-turquesa/25">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                style={{
                  border: 0,
                  filter: 'invert(92%) hue-rotate(170deg) saturate(0.3) contrast(0.9) brightness(0.95)',
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Alquileres Herranz"
                allowFullScreen
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-turquesa/5 pointer-events-none" />

              {/* Badge superpuesto */}
              <div className="absolute top-6 left-6 right-6 lg:left-8 lg:right-auto bg-negro/90 backdrop-blur-md border border-turquesa/30 p-4 lg:p-5 max-w-sm">
                <p className="text-[0.55rem] tracking-[0.35em] uppercase text-turquesa mb-1">
                  Aquí estamos
                </p>
                <p className="font-display text-lg lg:text-xl text-blanco leading-snug">
                  Alquileres Herranz
                </p>
                <p className="text-blanco-3 text-xs mt-1">
                  San Sebastián de los Reyes · Madrid
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

interface ContactCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
  href?: string
}

function ContactCard({ icon: Icon, label, value, href }: ContactCardProps) {
  const inner = (
    <div className="flex items-start gap-4 p-5 border border-white/[0.08] hover:border-turquesa/30 transition-colors duration-500 group">
      <div className="w-11 h-11 border border-turquesa/40 flex items-center justify-center flex-shrink-0 group-hover:bg-turquesa-subtle transition-colors">
        <Icon size={16} className="text-turquesa" />
      </div>
      <div className="flex-1">
        <p className="text-[0.55rem] tracking-[0.35em] uppercase text-blanco-3 mb-1">
          {label}
        </p>
        <p className="text-blanco-2 group-hover:text-blanco transition-colors text-[0.95rem] leading-snug">
          {value}
        </p>
      </div>
    </div>
  )
  if (href) {
    return (
      <a href={href} className="block" data-cursor="cta" data-cursor-label="IR">
        {inner}
      </a>
    )
  }
  return inner
}
