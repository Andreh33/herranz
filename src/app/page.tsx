import { Hero } from '@/components/sections/Hero'
import { Nosotros } from '@/components/sections/Nosotros'
import { Catalogo } from '@/components/sections/Catalogo'
import { Servicios } from '@/components/sections/Servicios'
import { PorQueNosotros } from '@/components/sections/PorQueNosotros'
import { Proceso } from '@/components/sections/Proceso'
import { Galeria } from '@/components/sections/Galeria'
import { Testimonios } from '@/components/sections/Testimonios'
import { Presupuesto } from '@/components/sections/Presupuesto'
import { Contacto } from '@/components/sections/Contacto'

export default function Home() {
  return (
    <>
      <Hero />
      <Nosotros />
      <Catalogo />
      <Servicios />
      <PorQueNosotros />
      <Proceso />
      <Galeria />
      <Testimonios />
      <Presupuesto />
      <Contacto />
    </>
  )
}
