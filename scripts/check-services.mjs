// Verification probe for the /services fixes. Measures rather than eyeballs:
// list markers gone, Approach grid aligned, graph canvas live. Build-time only.
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.argv[2] || 'http://localhost:4322/services';

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(URL, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));

const out = await page.evaluate(() => {
  const cs = (el, p) => el ? getComputedStyle(el).getPropertyValue(p) : null;
  const layers = document.querySelector('.layers');
  const layer0 = document.querySelector('.layer');
  const process = document.querySelector('.process');
  // the Approach section's own tag, to compare left edges
  const tag = process?.closest('section')?.querySelector('.section-tag');
  const canvas = document.querySelector('.panel .art canvas');
  const r = (el) => el ? el.getBoundingClientRect() : null;
  const lr = r(layer0);
  return {
    layersListStyle: cs(layers, 'list-style-type'),
    layersPadLeft: cs(layers, 'padding-left'),
    layersCols: cs(layers, 'grid-template-columns'),
    layerTextWidthPx: lr ? Math.round(lr.width - parseFloat(cs(layer0, 'padding-left')) * 2) : null,
    layerCount: document.querySelectorAll('.layer').length,
    processPadLeft: cs(process, 'padding-left'),
    processLeft: process ? Math.round(r(process).left) : null,
    tagLeft: tag ? Math.round(r(tag).left) : null,
    canvasPresent: !!canvas,
    canvasSize: canvas ? `${canvas.width}x${canvas.height}` : null,
    canvasBox: canvas ? `${Math.round(r(canvas).width)}x${Math.round(r(canvas).height)}` : null,
    svgPlateCount: document.querySelectorAll('svg.plate').length,
  };
});

// Is the canvas actually being repainted? The rAF loop is IntersectionObserver-
// gated, so scroll it into view first, then sample the WHOLE canvas twice.
await page.evaluate(() => {
  document.querySelector('.panel .art canvas')?.scrollIntoView({ block: 'center' });
});
await new Promise((r) => setTimeout(r, 1200));

const frame = async () => page.evaluate(() => {
  const c = document.querySelector('.panel .art canvas');
  if (!c) return null;
  try {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    // cheap checksum so we don't ship megabytes back over the CDP bridge
    let sum = 0;
    for (let i = 0; i < d.length; i += 97) sum = (sum + d[i] * (i % 251)) >>> 0;
    return sum;
  } catch { return 'blocked'; }
});
const a = await frame();
await new Promise((r) => setTimeout(r, 900));
const b = await frame();

console.log('ERRORS:', errors.length ? errors : 'none');
console.log(JSON.stringify(out, null, 2));
console.log('canvas animating:', a && b ? (a !== b ? 'YES (pixels changed)' : 'no change detected') : 'n/a');
await browser.close();
