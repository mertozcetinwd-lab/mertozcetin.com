// Artifact capture — renders real project outputs (HTML reports, the live site)
// to PNGs used as the duotone-treated "proof" plates on /work.
// Usage: node scripts/shoot-artifacts.mjs
// Reuses the installed-Chrome puppeteer-core pattern from shoot.mjs.
import puppeteer from 'puppeteer-core';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const REPO = resolve(process.cwd(), '..');        // AI OS repo root (script runs from mertozcetin.com)
const OUT = resolve(process.cwd(), 'public/img/work');
mkdirSync(OUT, { recursive: true });

const fileUrl = (p) => pathToFileURL(resolve(REPO, p)).href;

// Each job renders one artifact. `clip` fixes the card crop; DPR 2 keeps it crisp.
//
// Only the four projects that actually SHOW an artifact are captured. The other
// six are listed in WorkIndex without a picture, so generating their PNGs would
// ship ~1MB to the CDN that no page requests. Their scripts/artifact-*.html
// sources are kept: promoting one back is a job re-add and one run.
const jobs = [
  {
    name: 'aisos',
    url: pathToFileURL(resolve(process.cwd(), 'scripts/artifact-aisos.html')).href,
    viewport: { width: 1280, height: 960 },
    clip: { x: 0, y: 0, width: 1280, height: 800 },   // 16:10 console — the flagship
  },
  {
    name: 'outreach-engine',
    url: pathToFileURL(resolve(process.cwd(), 'scripts/artifact-outreach-engine.html')).href,
    viewport: { width: 1400, height: 900 },
    clip: { x: 0, y: 0, width: 1400, height: 875 },   // 16:10 — sweep stdout + gate verdicts
  },
  {
    name: 'lead-engine',
    url: pathToFileURL(resolve(process.cwd(), 'scripts/artifact-lead-engine.html')).href,
    viewport: { width: 1400, height: 900 },
    clip: { x: 0, y: 0, width: 1400, height: 875 },   // 16:10 — run stdout + ranked output
  },
  {
    name: 'storm',
    url: fileUrl('reports/storm-agentic-workflows-2026-07-05.html'),
    viewport: { width: 1040, height: 900 },
    clip: { x: 0, y: 0, width: 1040, height: 832 },   // 5:4 — masthead + lead
  },
  {
    name: 'slides',
    url: pathToFileURL(resolve(process.cwd(), 'scripts/artifact-slides.html')).href,
    viewport: { width: 1300, height: 1040 },
    clip: { x: 0, y: 0, width: 1300, height: 1040 },  // 5:4 — deck editor + vision loop
  },
  {
    name: 'clay',
    url: pathToFileURL(resolve(process.cwd(), 'scripts/artifact-clay.html')).href,
    viewport: { width: 1300, height: 1040 },
    clip: { x: 0, y: 0, width: 1300, height: 1040 },  // 5:4 — WSL terminal + enriched row + email
  },
  {
    name: 'qualifier',
    url: pathToFileURL(resolve(process.cwd(), 'scripts/artifact-qualifier.html')).href,
    viewport: { width: 1300, height: 1040 },
    clip: { x: 0, y: 0, width: 1300, height: 1040 },  // 5:4 — intake + verdict
  },
];

// Parked generators — scripts/artifact-{inbox,estimate,research,report,digest}.html
// still exist, and 'site' shot the live hero. Their projects are listed in
// WorkIndex without a picture now, so capturing them would ship ~1MB to the CDN
// that no page requests. Promote one back to a highlight in site.js and re-add
// its job here; the HTML source is already written.

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});

// Freeze every entrance so a capture never catches the page mid-animation.
// (`.js .line` / `[data-hero-fade]` here were stale selectors from the pre-revamp
// site and had been freezing nothing for several passes.)
const freeze =
  '*{transition:none!important;animation:none!important}' +
  '.reveal{opacity:1!important;transform:none!important}' +
  '[data-boot]{opacity:1!important;transform:none!important}' +
  '.mask > *{transform:none!important;opacity:1!important}' +
  // The film grain is per-pixel noise, which is precisely what PNG cannot
  // compress — it alone took site.png to 2.6MB. It's also invisible once the
  // capture is scaled down into a card, so it costs megabytes to show nothing.
  'body::after{display:none!important}';

for (const j of jobs) {
  const page = await browser.newPage();
  await page.setViewport({ ...j.viewport, deviceScaleFactor: 2 });
  await page.goto(j.url, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: freeze });
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  });
  await new Promise((r) => setTimeout(r, 900)); // fonts + canvas art settle
  await page.screenshot({ path: `${OUT}/${j.name}.png`, clip: j.clip });
  console.log('shot', j.name, '->', `${OUT}/${j.name}.png`);
  await page.close();
}

await browser.close();
console.log('done ->', OUT);
