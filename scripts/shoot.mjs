// Dev screenshot helper — drives the already-installed Chrome via puppeteer-core.
// Usage: node scripts/shoot.mjs <outDir> [themes csv] [url]
import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = process.argv[2] || '.';
const THEMES = (process.argv[3] || 'blood,steel,paper').split(',');
const BASE = process.argv[4] || 'http://localhost:4321/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

// freeze intro/reveal states so full-page shots show final layout
const freeze =
  '*{transition:none!important} .reveal{opacity:1!important;transform:none!important}' +
  '.js .line{transform:none!important} .js [data-hero-fade]{opacity:1!important}';

for (const t of THEMES) {
  const url = BASE + (BASE.includes('?') ? '&' : '?') + 'theme=' + t;
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: freeze });
  // force lazy images to load (headless full-page capture never scrolls):
  // set eager, nudge-scroll to trip IntersectionObserver, then await decode.
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y <= h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); }
    window.scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  });
  await new Promise((r) => setTimeout(r, 800)); // let fonts + duotone settle
  await page.screenshot({ path: `${OUT}/${t}-fold.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  await page.screenshot({ path: `${OUT}/${t}-full.png`, fullPage: true });
  console.log('shot', t);
}

await browser.close();
console.log('done ->', OUT);
