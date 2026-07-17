// Motion — reveals, accent marks, the artifact load-bloom, character decode, and
// a theme-swap glitch. All vanilla; the gsap that used to drive a marquee and a
// parallax is gone and is not coming back for this.
//
// Nothing here gates content: .reveal and .mark are only hidden under html.js
// (set before first paint), and scrambled elements already carry their final
// text in the markup.
//
// There is no motion gate any more — animations are unconditional. See the note
// in tokens.css for the reasoning and the commit to recover it from.

/* ------------------------------------------------------------------ shared */

// One-shot intersection: add .in the first time an element is on screen, then
// stop watching it. Reveals and marks are the same behaviour with different
// thresholds, so they share this rather than each growing an observer.
function observeOnce(selector, opts = {}) {
  const els = [...document.querySelectorAll(selector)];
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px', ...opts });
  els.forEach((el) => io.observe(el));
}

/* ------------------------------------------------ reveals / marks / arrows */

function initReveals() { observeOnce('.reveal'); }

// Marks fire a little later than a reveal — the underline drawing itself is the
// payoff, and it plays to nobody if it runs while the phrase is still at the
// very bottom edge of the viewport.
function initMarks() { observeOnce('.mark', { threshold: 0.9, rootMargin: '0px 0px -10% 0px' }); }

/* -------------------------------------------------------------------- bloom */

// The signature, taught once: the hero artifact loads in full colour, holds, then
// settles to grey. A visitor who never hovers still learns that colour means "real".
//
// It fires on INTERSECTION, not on load. The plate sits ~1400px down the page, so a
// load-timed hold would play the whole thing to an empty viewport and be over before
// anyone scrolled to it — the one moment that teaches the rule, wasted.
function initBloom() {
  const els = [...document.querySelectorAll('[data-bloom]')];
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const hold = parseInt(e.target.dataset.bloom, 10) || 900;
        // Drop the attribute to hand control back to :hover — CSS does the fade.
        setTimeout(() => e.target.removeAttribute('data-bloom'), hold);
      }
    },
    { threshold: 0.55 } // most of the plate is on screen, so the settle is watchable
  );
  els.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------ decode */

// Why this effect and not some other: in a proportional face, scrambling text
// reflows as glyph widths change and the whole line jitters. IBM Plex Mono is a
// fixed grid, so scrambled text holds its exact position while the characters
// churn. It's the one effect the typeface makes genuinely free.
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>[]{}#$%&*+=~^';

export function scramble(el, duration = 700) {
  const final = el.dataset.text || el.textContent;
  el.dataset.text = final;                    // survive repeat runs (hover in/out)

  cancelAnimationFrame(Number(el.dataset.raf)); // never let two runs fight

  const n = final.length;
  const start = performance.now();

  const frame = (now) => {
    const p = Math.min(1, (now - start) / duration);
    // Ease the lock so it starts fast and settles — a linear wipe reads mechanical.
    const locked = Math.floor((1 - Math.pow(1 - p, 2)) * n);
    let out = '';
    for (let i = 0; i < n; i++) {
      if (i < locked || final[i] === ' ') out += final[i];
      else out += POOL[(Math.random() * POOL.length) | 0];
    }
    el.textContent = out;
    if (p < 1) el.dataset.raf = requestAnimationFrame(frame);
    else el.textContent = final;
  };
  el.dataset.raf = requestAnimationFrame(frame);
}

// Elements marked data-scramble decode once, on load, after their boot delay.
function initScramble() {
  const els = [...document.querySelectorAll('[data-scramble]')];
  if (!els.length) return;
  els.forEach((el) => {
    const at = parseInt(el.dataset.scramble, 10) || 0;
    setTimeout(() => scramble(el, 700), at);
  });
}

// Body copy decodes when it scrolls into view. Fires once. A load-timed decode
// on copy that's three screens down plays to nobody — same reasoning that moved
// the artifact bloom onto an observer.
function initDecode() {
  const els = [...document.querySelectorAll('[data-decode]')];
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        const dur = parseInt(e.target.dataset.decode, 10) || 620;
        scramble(e.target, dur);
        e.target.removeAttribute('data-decode');
      }
    },
    { threshold: 0.3, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

// Elements marked data-scramble-hover decode on pointer/focus of their nearest
// [data-scramble-scope] ancestor (so hovering anywhere in a cell fires the label).
function initScrambleHover() {
  const scopes = [...document.querySelectorAll('[data-scramble-scope]')];
  if (!scopes.length) return;
  scopes.forEach((scope) => {
    const target = scope.querySelector('[data-scramble-hover]');
    if (!target) return;
    const run = () => scramble(target, 420);
    scope.addEventListener('pointerenter', run);
    scope.addEventListener('focusin', run);
  });
}

/* ---------------------------------------------------------------- parallax */

// Lerped fractional parallax on one shared rAF loop. The baseline had this
// driven by a gsap ticker; this is the same behaviour for none of the bytes.
// Elements opt in with data-parallax="<strength px>" and optional
// data-parallax-scale="<n>" (an image drifting inside its frame must be scaled
// up first or the drift exposes the frame's edge).
function initParallax() {
  const items = [...document.querySelectorAll('[data-parallax]')];
  if (!items.length) return;

  const cur = new WeakMap();
  const tick = () => {
    const vh = window.innerHeight;
    for (const el of items) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -400 || r.top > vh + 400) continue; // off-screen: don't pay for it
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      const target = -progress * (parseFloat(el.dataset.parallax) || 24);
      const now = cur.get(el);
      // Lerp toward the target so the drift lags the scroll slightly — that lag
      // is the whole effect; snapping straight to target reads as jitter.
      const next = now == null ? target : now + (target - now) * 0.12;
      cur.set(el, next);
      const s = el.dataset.parallaxScale;
      el.style.transform = `translate3d(0, ${next.toFixed(2)}px, 0)` + (s ? ` scale(${s})` : '');
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------- clock */

// Mert's local time, ticking. The timezone is passed in from site.js rather than
// read from the visitor's machine — a clock showing someone their own time is
// decoration; a clock showing them YOUR time tells them when to expect a reply.
//
export function initClock(tz) {
  const els = [...document.querySelectorAll('[data-clock]')];
  if (!els.length) return;

  let fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz,
    });
  } catch {
    // An invalid/unsupported zone throws — fall back rather than leave "--:--:--"
    // frozen on the page forever.
    fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
  }

  const tick = () => {
    const s = fmt.format(new Date());
    els.forEach((e) => { e.textContent = s; });
  };
  tick();
  setInterval(tick, 1000);
}

/* ------------------------------------------------------------------ glitch */

// The theme swap is a real system event, so it gets to feel like one. Rides the
// existing `themechange` event that theme.js already dispatches.
function initGlitch() {
  const root = document.documentElement;
  let t;
  window.addEventListener('themechange', () => {
    root.classList.add('theme-glitch');
    clearTimeout(t);
    t = setTimeout(() => root.classList.remove('theme-glitch'), 240);
  });
}

/* -------------------------------------------------------------------- boot */

export function initMotion() {
  initReveals();
  initMarks();
  initBloom();
  initScramble();
  initScrambleHover();
  initDecode();
  initParallax();
  initGlitch();
}
