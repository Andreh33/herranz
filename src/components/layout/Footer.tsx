'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const marqueeItems = [
  'BODAS',
  'COMUNIONES',
  'BAUTIZOS',
  'EVENTOS CORPORATIVOS',
  'FIESTAS PRIVADAS',
  'SILLAS',
  'MESAS',
  'CARPAS',
  'TARIMAS',
]

export function Footer() {
  return (
    <footer className="relative bg-negro border-t border-turquesa/15 overflow-hidden">
      {/* Marquee gigante */}
      <div className="relative overflow-hidden py-8 border-b border-white/[0.04]">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-display italic text-[clamp(3rem,8vw,7rem)] text-blanco/[0.05] tracking-tight"
            >
              {item} ·
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo + tagline */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-3xl text-blanco">Alquileres</span>
              <span className="font-display italic text-3xl text-turquesa">Herranz</span>
            </div>
            <p className="text-blanco-3 text-sm leading-relaxed max-w-md">
              Mobiliario para eventos premium en Madrid. Más de 20 años haciendo
              que cada celebración sea inolvidable.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="block w-2 h-2 rounded-full bg-turquesa animate-pulse" />
              <span className="text-[0.6rem] tracking-[0.4em] uppercase text-blanco-3">
                Estamos operativos
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[0.6rem] tracking-[0.35em] uppercase text-turquesa mb-6">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                ['Nosotros', '#nosotros'],
                ['Catálogo', '#catalogo'],
                ['Servicios', '#servicios'],
                ['Galería', '#galeria'],
                ['Proceso', '#proceso'],
                ['Contacto', '#contacto'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-blanco-2 hover:text-turquesa transition-colors text-sm tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-4">
            <h4 className="text-[0.6rem] tracking-[0.35em] uppercase text-turquesa mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-turquesa mt-0.5 flex-shrink-0" />
                <a
                  href="tel:912357093"
                  className="text-blanco-2 hover:text-turquesa transition-colors text-sm"
                >
                  912 35 70 93
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-turquesa mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@alquileresherranz.es"
                  className="text-blanco-2 hover:text-turquesa transition-colors text-sm"
                >
                  info@alquileresherranz.es
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-turquesa mt-0.5 flex-shrink-0" />
                <span className="text-blanco-2 text-sm leading-relaxed">
                  Av. del Camino de Lo Cortao 6<br />
                  28703 San Sebastián de los Reyes<br />
                  Madrid
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <p className="text-blanco-4 text-xs tracking-wider">
            © {new Date().getFullYear()} Alquileres Herranz · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-blanco-4 hover:text-turquesa transition-colors text-xs tracking-wider">
              Aviso Legal
            </Link>
            <Link href="#" className="text-blanco-4 hover:text-turquesa transition-colors text-xs tracking-wider">
              Privacidad
            </Link>
            <Link href="#" className="text-blanco-4 hover:text-turquesa transition-colors text-xs tracking-wider">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
