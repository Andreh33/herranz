import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-negro flex items-center justify-center relative overflow-hidden px-6">
      <div className="bg-grid-dark absolute inset-0 opacity-50" />
      <div className="bg-hero-radial absolute inset-0" />

      <div className="relative z-10 text-center max-w-2xl">
        <p className="text-[0.62rem] tracking-[0.4em] uppercase text-turquesa mb-6">
          Error 404
        </p>
        <h1 className="font-display text-[clamp(4rem,12vw,10rem)] text-blanco leading-none">
          Esta página no
          <br />
          <span className="italic text-turquesa">existe.</span>
        </h1>
        <p className="mt-8 text-blanco-3 text-lg max-w-md mx-auto">
          Quizá la moviste, quizá la borramos, quizá nunca existió. Vuelve a la
          página principal y empezamos de nuevo.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-turquesa text-negro px-10 py-5 text-[0.7rem] tracking-[0.22em] uppercase font-medium hover:bg-turquesa-light transition-colors"
          >
            Volver al inicio
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
