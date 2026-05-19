'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Phone, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.35, rootMargin: '-20% 0px -40% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-[900] transition-all duration-500',
          scrolled
            ? 'bg-negro/95 backdrop-blur-xl border-b border-turquesa/10 py-4'
            : 'bg-transparent py-6'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-8">
          <Link href="/" className="group flex items-baseline gap-2">
            <motion.span
              className="font-display text-lg lg:text-xl tracking-[0.04em] text-blanco group-hover:text-turquesa transition-colors duration-400"
              whileHover={{ scale: 1.02 }}
            >
              Alquileres
            </motion.span>
            <span className="font-display italic text-lg lg:text-xl tracking-[0.04em] text-turquesa">
              Herranz
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-[0.7rem] tracking-[0.22em] uppercase transition-colors duration-300 py-1',
                    isActive
                      ? 'text-turquesa'
                      : 'text-blanco-3 hover:text-blanco'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-turquesa"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:912357093"
              className="flex items-center gap-2 text-blanco-3 hover:text-turquesa transition-colors text-[0.7rem] tracking-[0.18em]"
            >
              <Phone size={13} />
              912 35 70 93
            </a>
            <MagneticButton
              variant="turquesa"
              href="#presupuesto"
              className="py-3 px-6 text-[0.65rem]"
              cursorLabel="PEDIR"
            >
              Pedir Presupuesto
            </MagneticButton>
          </div>

          <button
            className="lg:hidden text-blanco p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[850] bg-negro/98 backdrop-blur-xl flex flex-col items-center justify-center gap-7 lg:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.55, ease: [0.87, 0, 0.13, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-display-md text-blanco hover:text-turquesa transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="tel:912357093"
              className="text-turquesa text-lg tracking-[0.15em] mt-6 flex items-center gap-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Phone size={16} /> 912 35 70 93
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
