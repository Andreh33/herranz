'use client'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Clock, Check, ArrowRight } from 'lucide-react'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

const formSchema = z.object({
  nombre: z.string().min(2, 'Nombre requerido'),
  telefono: z.string().min(9, 'Teléfono válido requerido'),
  email: z.string().email('Email no válido'),
  tipoEvento: z.enum([
    'boda',
    'comunion',
    'bautizo',
    'corporativo',
    'cumpleanos',
    'otro',
  ]),
  fechaEvento: z.string().min(1, 'Fecha requerida'),
  numPersonas: z.string().min(1, 'Número de personas requerido'),
  lugarEvento: z.string().min(3, 'Lugar requerido'),
  materiales: z.array(z.string()).min(1, 'Selecciona al menos un material'),
  mensaje: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const tiposEvento = [
  { id: 'boda', label: 'Boda' },
  { id: 'comunion', label: 'Comunión' },
  { id: 'bautizo', label: 'Bautizo' },
  { id: 'corporativo', label: 'Corporativo' },
  { id: 'cumpleanos', label: 'Cumpleaños' },
  { id: 'otro', label: 'Otro' },
] as const

const materialesOptions = [
  'Sillas',
  'Mesas',
  'Mantelería',
  'Carpas',
  'Tarimas',
  'Decoración',
  'Barras',
  'Otro',
]

export function Presupuesto() {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      materiales: [],
      tipoEvento: 'boda',
    },
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/presupuesto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.ok) {
        toast.success(
          `Solicitud recibida — te llamamos en menos de 24h${json.ref ? ` · Ref ${json.ref}` : ''}`,
          { duration: 6000 }
        )
        reset()
      } else {
        toast.error('Revisa los campos del formulario')
      }
    } catch {
      toast.error('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="presupuesto"
      className="relative bg-negro-100 py-section overflow-hidden border-t border-turquesa/15"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-turquesa via-50% to-amarillo" />
      <div className="bg-grid-dark absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Columna izquierda */}
          <div className="lg:col-span-5">
            <SectionReveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-8 h-px bg-amarillo" />
                <span className="text-[0.62rem] tracking-[0.4em] uppercase text-amarillo">
                  Presupuesto gratuito
                </span>
              </div>
            </SectionReveal>
            <AnimatedText
              text="Cuéntanos tu evento"
              el="h2"
              className="font-display text-display-lg text-blanco"
            />
            <SectionReveal delay={0.3}>
              <p className="mt-6 text-blanco-3 text-base lg:text-lg leading-relaxed max-w-md">
                Rellena el formulario o llámanos directamente. Te preparamos un
                presupuesto detallado sin compromiso en menos de 24 horas.
              </p>
            </SectionReveal>

            {/* Card teléfono */}
            <SectionReveal delay={0.5}>
              <a
                href="tel:912357093"
                className="mt-10 block relative p-6 border border-turquesa/30 bg-turquesa-subtle hover:bg-turquesa/10 transition-colors duration-500 group"
                data-cursor="cta"
                data-cursor-label="LLAMAR"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-turquesa/40 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-turquesa" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.35em] uppercase text-blanco-3 mb-1">
                      O llámanos directamente
                    </p>
                    <p className="font-display text-3xl text-turquesa group-hover:text-turquesa-light transition-colors">
                      912 35 70 93
                    </p>
                  </div>
                </div>
              </a>
            </SectionReveal>

            {/* Datos secundarios */}
            <SectionReveal delay={0.6}>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-turquesa mt-1 flex-shrink-0" />
                  <a
                    href="mailto:info@alquileresherranz.es"
                    className="text-blanco-2 hover:text-turquesa transition-colors text-sm"
                  >
                    info@alquileresherranz.es
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-turquesa mt-1 flex-shrink-0" />
                  <span className="text-blanco-2 text-sm leading-relaxed">
                    Av. del Camino de Lo Cortao 6<br />
                    28703 San Sebastián de los Reyes, Madrid
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={14} className="text-turquesa mt-1 flex-shrink-0" />
                  <div className="text-blanco-2 text-sm leading-relaxed">
                    <p>Lun-Vie · 09:00-14:00 / 16:00-19:00</p>
                    <p>Sábados · 09:00-13:00</p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Por qués */}
            <SectionReveal delay={0.7}>
              <ul className="mt-10 grid grid-cols-2 gap-3">
                {['Sin compromiso', 'Respuesta 24h', 'Asesoramiento gratis', 'Precios claros'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check size={12} className="text-turquesa" />
                      <span className="text-blanco-3 text-xs tracking-wide">
                        {item}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </SectionReveal>
          </div>

          {/* Formulario */}
          <SectionReveal delay={0.2} direction="right" className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative bg-negro-200 border border-white/[0.08] p-6 lg:p-10"
            >
              <h3 className="font-display text-xl text-blanco mb-8 flex items-center gap-3">
                <span className="block w-6 h-px bg-turquesa" />
                Datos del evento
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field
                  label="Nombre"
                  error={errors.nombre?.message}
                  required
                >
                  <input
                    {...register('nombre')}
                    placeholder="Tu nombre"
                    className="input-line"
                  />
                </Field>

                <Field
                  label="Teléfono"
                  error={errors.telefono?.message}
                  required
                >
                  <input
                    {...register('telefono')}
                    placeholder="600 000 000"
                    className="input-line"
                    inputMode="tel"
                  />
                </Field>

                <Field
                  label="Email"
                  error={errors.email?.message}
                  required
                  className="md:col-span-2"
                >
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="tu@email.com"
                    className="input-line"
                  />
                </Field>

                <Field
                  label="Tipo de evento"
                  error={errors.tipoEvento?.message}
                  required
                >
                  <select {...register('tipoEvento')} className="input-line cursor-pointer">
                    {tiposEvento.map((t) => (
                      <option key={t.id} value={t.id} className="bg-negro">
                        {t.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Fecha del evento"
                  error={errors.fechaEvento?.message}
                  required
                >
                  <input
                    {...register('fechaEvento')}
                    type="date"
                    className="input-line"
                  />
                </Field>

                <Field
                  label="Nº de personas"
                  error={errors.numPersonas?.message}
                  required
                >
                  <input
                    {...register('numPersonas')}
                    placeholder="80"
                    className="input-line"
                    inputMode="numeric"
                  />
                </Field>

                <Field
                  label="Lugar del evento"
                  error={errors.lugarEvento?.message}
                  required
                >
                  <input
                    {...register('lugarEvento')}
                    placeholder="Finca, restaurante o dirección"
                    className="input-line"
                  />
                </Field>

                {/* Materiales */}
                <div className="md:col-span-2">
                  <label className="block text-[0.6rem] tracking-[0.35em] uppercase text-turquesa mb-4">
                    Materiales necesarios *
                  </label>
                  <Controller
                    control={control}
                    name="materiales"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {materialesOptions.map((mat) => {
                          const checked = field.value.includes(mat)
                          return (
                            <label
                              key={mat}
                              className="flex items-center gap-3 cursor-pointer py-1"
                            >
                              <input
                                type="checkbox"
                                className="check-custom"
                                checked={checked}
                                onChange={() => {
                                  if (checked)
                                    field.onChange(field.value.filter((v) => v !== mat))
                                  else field.onChange([...field.value, mat])
                                }}
                              />
                              <span className="text-blanco-2 text-sm">{mat}</span>
                            </label>
                          )
                        })}
                      </div>
                    )}
                  />
                  {errors.materiales && (
                    <p className="mt-2 text-[0.7rem] text-amarillo tracking-wide">
                      {errors.materiales.message}
                    </p>
                  )}
                </div>

                <Field
                  label="Mensaje (opcional)"
                  error={errors.mensaje?.message}
                  className="md:col-span-2"
                >
                  <textarea
                    {...register('mensaje')}
                    placeholder="Cuéntanos más sobre tu evento, ideas, requisitos especiales..."
                    rows={4}
                    className="input-line resize-none"
                  />
                </Field>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                <p className="text-blanco-4 text-[0.7rem] tracking-wide leading-relaxed max-w-md">
                  Al enviar aceptas que contactemos contigo por teléfono o email para preparar tu presupuesto.
                </p>
                <MagneticButton
                  variant="amarillo"
                  type="submit"
                  disabled={submitting}
                  cursorLabel="ENVIAR"
                >
                  {submitting ? 'Enviando…' : 'Enviar Solicitud'}
                  <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}

function Field({ label, required, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label className="block text-[0.6rem] tracking-[0.35em] uppercase text-turquesa mb-2">
        {label}
        {required && <span className="ml-1 text-amarillo">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-[0.7rem] text-amarillo tracking-wide">{error}</p>
      )}
    </div>
  )
}
