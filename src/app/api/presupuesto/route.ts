import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().min(2),
  telefono: z.string().min(9),
  email: z.string().email(),
  tipoEvento: z.enum([
    'boda',
    'comunion',
    'bautizo',
    'corporativo',
    'cumpleanos',
    'otro',
  ]),
  fechaEvento: z.string().min(1),
  numPersonas: z.string().min(1),
  lugarEvento: z.string().min(3),
  materiales: z.array(z.string()).min(1),
  mensaje: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { ok: false, errors: result.error.flatten() },
        { status: 400 }
      )
    }

    // Simula latencia de envío (en prod: Resend / Nodemailer / SMTP)
    await new Promise((r) => setTimeout(r, 900))

    // TODO: enviar email real con result.data
    return NextResponse.json({ ok: true, ref: `AH-${Date.now().toString(36).toUpperCase()}` })
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 })
  }
}
