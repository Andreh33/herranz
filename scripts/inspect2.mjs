import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
await ctx.addInitScript(() => {
  try { sessionStorage.setItem('ah-loader-seen', '1') } catch {}
})
const page = await ctx.newPage()
await page.goto('https://herranz.vercel.app/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

const out = await page.evaluate(() => {
  const cat = document.getElementById('catalogo')
  const inner = cat?.querySelector('.relative.max-w-\\[1500px\\]') || cat?.querySelector('[class*="max-w-[1500px]"]')
  if (!inner) return { found: false, html: cat?.innerHTML?.slice(0, 500) }
  const cs = getComputedStyle(inner)
  return {
    className: inner.className,
    maxWidth: cs.maxWidth,
    marginInline: cs.marginInline,
    marginLeft: cs.marginLeft,
    paddingInline: cs.paddingInline,
    paddingLeft: cs.paddingLeft,
    width: inner.getBoundingClientRect().width,
    left: inner.getBoundingClientRect().left,
    matches_mxauto: inner.matches('.mx-auto'),
    parentDisplay: getComputedStyle(inner.parentElement).display,
  }
})
console.log(JSON.stringify(out, null, 2))
await browser.close()
