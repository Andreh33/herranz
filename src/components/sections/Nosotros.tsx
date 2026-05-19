'use client'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { photos } from '@/lib/photos'

export function Nosotros() {
  return (
    <section
      id="nosotros"
      className="relative bg-negro-50 py-section overflow-hidden"
    >
      <div className="bg-grid-dense absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Columna texto */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <SectionReveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-turquesa" />
                <span className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa">
                  Nuestra historia
                </span>
              </div>
            </SectionReveal>

            <AnimatedText
              text="Más de dos décadas creando momentos perfectos"
              el="h2"
              className="font-display text-display-lg text-blanco max-w-2xl"
              stagger={0.04}
            />

            <SectionReveal direction="up" delay={0.3}>
              <div className="mt-10 space-y-6 text-blanco-3 text-base lg:text-[1.05rem] leading-relaxed max-w-xl">
                <p>
                  Empezamos en una pequeña nave en San Sebastián de los Reyes, con
                  un puñado de sillas y la convicción de que cada evento merece
                  mobiliario impecable. Veinte años después, seguimos con la misma
                  filosofía: cuidar cada detalle como si fuese para nuestra propia
                  familia.
                </p>
                <p>
                  Hoy somos referencia en la Comunidad de Madrid en alquiler de
                  mobiliario para bodas, comuniones, bautizos y eventos
                  corporativos. Trabajamos con fincas, catering y wedding
                  planners de toda la región — pero nuestra puerta sigue abierta
                  para cualquier celebración, grande o íntima.
                </p>
              </div>
            </SectionReveal>

            {/* Quote */}
            <SectionReveal direction="up" delay={0.5}>
              <blockquote className="mt-12 pl-6 border-l-2 border-turquesa max-w-xl">
                <p className="font-display italic text-xl lg:text-2xl text-blanco leading-snug">
                  &ldquo;Cada silla que colocamos, cada mesa que montamos, es
                  parte de un recuerdo que durará toda la vida.&rdquo;
                </p>
                <footer className="mt-4 text-[0.62rem] tracking-[0.35em] uppercase text-turquesa">
                  — Familia Herranz
                </footer>
              </blockquote>
            </SectionReveal>

            <SectionReveal direction="up" delay={0.7}>
              <div className="mt-12">
                <MagneticButton variant="ghost" href="#proceso" cursorLabel="VER">
                  Conoce nuestro proceso
                  <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </SectionReveal>
          </div>

          {/* Columna visual */}
          <div className="lg:col-span-5 relative">
            <SectionReveal direction="right">
              <div className="relative pr-3 pb-16 lg:pb-24">
                {/* Imagen principal */}
                <div className="relative aspect-[4/5] overflow-hidden border border-turquesa/20">
                  <Image
                    src={photos.banqueteElegante}
                    alt="Montaje de boda con sillas Chiavari y centros florales blancos"
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-negro/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[0.6rem] tracking-[0.4em] uppercase text-turquesa">
                      Nave principal
                    </p>
                    <p className="font-display text-xl text-blanco mt-1">
                      San Sebastián de los Reyes
                    </p>
                  </div>
                  {/* Borde offset decorativo */}
                  <div className="absolute -inset-3 border border-turquesa/15 -z-10 pointer-events-none" />
                </div>

                {/* Segunda imagen */}
                <div className="absolute -bottom-4 -right-2 lg:-right-8 w-[55%] aspect-[3/4] overflow-hidden border border-amarillo/30 shadow-deep">
                  <Image
                    src={photos.centroFloral}
                    alt="Centros florales en mesa de boda"
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-negro/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[0.55rem] tracking-[0.35em] uppercase text-amarillo">
                      Catálogo
                    </p>
                  </div>
                </div>

                {/* Badge flotante */}
                <div className="absolute -top-6 -left-6 lg:-left-10 w-24 h-24 rounded-full border border-turquesa bg-negro flex flex-col items-center justify-center animate-float z-10">
                  <span className="font-display text-2xl text-turquesa leading-none">
                    +20
                  </span>
                  <span className="text-[0.55rem] tracking-[0.25em] uppercase text-blanco-3 mt-1">
                    años
                  </span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
