import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
await ctx.addInitScript(() => {
  try { sessionStorage.setItem('ah-loader-seen', '1') } catch {}
})
const page = await ctx.newPage()
await page.goto('https://herranz.vercel.app/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

const result = await page.evaluate(() => {
  const sections = ['nosotros', 'catalogo', 'servicios', 'proceso', 'galeria', 'presupuesto', 'contacto']
  const out = []
  for (const id of sections) {
    const sec = document.getElementById(id)
    if (!sec) continue
    // Find the centered container inside
    const containers = sec.querySelectorAll('div.relative')
    for (const c of containers) {
      const cs = getComputedStyle(c)
      if (cs.maxWidth !== 'none' && parseFloat(cs.maxWidth) > 800) {
        const rect = c.getBoundingClientRect()
        out.push({
          section: id,
          maxWidth: cs.maxWidth,
          width: rect.width,
          left: rect.left,
          marginLeft: cs.marginLeft,
          marginRight: cs.marginRight,
          paddingLeft: cs.paddingLeft,
          paddingRight: cs.paddingRight,
        })
        break
      }
    }
  }
  // Also navbar
  const nav = document.querySelector('header div')
  if (nav) {
    const cs = getComputedStyle(nav)
    const rect = nav.getBoundingClientRect()
    out.push({
      section: 'navbar',
      maxWidth: cs.maxWidth,
      width: rect.width,
      left: rect.left,
      marginLeft: cs.marginLeft,
      paddingLeft: cs.paddingLeft,
    })
  }
  // Hero content
  const hero = document.getElementById('hero')
  if (hero) {
    const c = hero.querySelector('.max-w-\\[1500px\\]') || hero.querySelector('div[class*="max-w"]')
    if (c) {
      const cs = getComputedStyle(c)
      const rect = c.getBoundingClientRect()
      out.push({
        section: 'hero-content',
        maxWidth: cs.maxWidth,
        width: rect.width,
        left: rect.left,
        marginLeft: cs.marginLeft,
        paddingLeft: cs.paddingLeft,
      })
    }
  }
  return out
})

console.log(JSON.stringify(result, null, 2))
await browser.close()
