import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Loader } from '@/components/layout/Loader'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Toaster } from 'react-hot-toast'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alquileresherranz.es'),
  title: 'Alquileres Herranz | Mobiliario para Bodas y Eventos en Madrid',
  description:
    'Alquiler de sillas, mesas, carpas y mobiliario para bodas, comuniones y eventos en San Sebastián de los Reyes. +20 años de experiencia. Presupuesto gratis.',
  keywords: [
    'alquiler sillas bodas madrid',
    'alquiler mesas eventos',
    'mobiliario comuniones sanse',
    'alquiler carpas madrid',
  ],
  openGraph: {
    title: 'Alquileres Herranz',
    description: 'Mobiliario premium para eventos en Madrid',
    type: 'website',
    locale: 'es_ES',
    siteName: 'Alquileres Herranz',
  },
  alternates: { canonical: 'https://alquileresherranz.es' },
  robots: { index: true, follow: true },
}

const ldJson = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Alquileres Herranz',
  telephone: '+34912357093',
  email: 'info@alquileresherranz.es',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avenida del Camino de Lo Cortao 6',
    addressLocality: 'San Sebastián de los Reyes',
    postalCode: '28703',
    addressRegion: 'Comunidad de Madrid',
    addressCountry: 'ES',
  },
  priceRange: '€€',
  openingHours: ['Mo-Fr 09:00-14:00', 'Mo-Fr 16:00-19:00', 'Sa 09:00-13:00'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </head>
      <body>
        <Providers>
          <Loader />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#161616',
                color: '#F8F6F0',
                border: '1px solid rgba(0,191,179,0.3)',
                borderRadius: '0',
                fontFamily: 'var(--font-dm-sans)',
                padding: '14px 18px',
                fontSize: '0.85rem',
                letterSpacing: '0.04em',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
