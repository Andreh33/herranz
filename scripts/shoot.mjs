// Captura screenshots full-page de la web en producción.
// Uso: node scripts/shoot.mjs
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const URL = process.env.SHOOT_URL || 'https://herranz.vercel.app/'
const OUT = resolve(process.cwd(), 'shots')

const viewports = [
  { name: '1920', width: 1920, height: 1080 },
  { name: '1440', width: 1440, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '375', width: 375, height: 812 },
]

const sections = [
  { id: 'hero', y: 0 },
  { id: 'nosotros', selector: '#nosotros' },
  { id: 'catalogo', selector: '#catalogo' },
  { id: 'servicios', selector: '#servicios' },
  { id: 'proceso', selector: '#proceso' },
  { id: 'galeria', selector: '#galeria' },
  { id: 'presupuesto', selector: '#presupuesto' },
  { id: 'contacto', selector: '#contacto' },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })
  // Saltarse el loader
  await ctx.addInitScript(() => {
    try { sessionStorage.setItem('ah-loader-seen', '1') } catch {}
  })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(6000) // Esperar a que terminen las animaciones de entrada del hero

  // Hero
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png`, fullPage: false })

  // Por cada sección
  for (const s of sections) {
    if (s.id === 'hero') continue
    const el = await page.$(s.selector)
    if (!el) continue
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/${vp.name}-${s.id}.png`, fullPage: false })
  }

  // Full page
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true })

  await ctx.close()
  console.log(`✓ ${vp.name}`)
}

await browser.close()
console.log('done')
