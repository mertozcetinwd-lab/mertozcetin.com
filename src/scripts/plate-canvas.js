// Animated agent graphs: nodes drift, edges follow.
//
// Canvas rather than SVG, and that's forced rather than preferred: a <line>'s
// x1/y1/x2/y2 can't track a CSS-translated <circle>, so an edge whose endpoints
// move has to be recomputed every frame. The SVG plates get marching dashes on
// STATIC geometry, which reads as a diagram; this reads as a live system, which
// is why the graph cells use it.
//
// Renders into ANY canvas[data-plate]:
//   data-seed  — stable per-plate geometry
//   data-nodes — density hint; small cells need fewer or it's mush
//   data-shape — 'chain' (default) or 'radial'
//
// Three exist (hero + the Agents and Research capability cells). The hero and the
// capabilities grid are never on screen together, and the IntersectionObserver
// below parks anything off-screen, so at most one or two ever run a frame loop.
//
// SHAPE is not decoration — it's the honest picture of what the cell describes:
//   chain  — an agent IS a sequence: input, decide, act, stop. Left to right.
//   radial — research converges: perspectives around a question, synthesis at the
//            centre, and chords between neighbours where they disagree.
// Both cells were 'chain' with different seeds, which is exactly why they read as
// the same picture twice.

// mulberry32 — matches Plate.astro's generator, so a seed means the same thing
// in both and the canvas graphs are stable across reloads rather than reshuffling.
function rng(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Left-to-right pipeline. Nodes drift around a fixed column/row anchor.
function buildChain(r, density) {
  // Small cells get a sparser graph — the hero's 9 nodes inside a 300px box is mud.
  const cols = density === 'sparse' ? [2, 2, 1] : [2, 3, 3, 1];

  const nodes = [];
  const groups = [];
  cols.forEach((n, c) => {
    const list = [];
    for (let i = 0; i < n; i++) {
      list.push(nodes.length);
      nodes.push({
        cx: c / (cols.length - 1),
        cy: (i + 1) / (n + 1),
        ph: r() * Math.PI * 2,          // phase, so they don't drift in lockstep
        sp: 0.4 + r() * 0.5,
        am: 0.012 + r() * 0.018,
        rad: c === cols.length - 1 ? (density === 'sparse' ? 4.5 : 5.5) : 2.6 + r() * 2,
        sink: c === cols.length - 1,
        x: 0, y: 0,
      });
    }
    groups.push(list);
  });

  const edges = [];
  for (let c = 0; c < groups.length - 1; c++) {
    for (const a of groups[c]) {
      for (const b of groups[c + 1]) if (r() > 0.42) edges.push([a, b]);
      // no orphans — a dangling node reads as a bug, not a composition
      if (!edges.some(([f]) => f === a)) edges.push([a, groups[c + 1][0]]);
    }
  }
  return { nodes, edges };
}

// A synthesis at the centre with perspectives orbiting it. Each satellite keeps
// its own angular speed, so the constellation slowly shears rather than spinning
// as a rigid wheel — which would read as a loading spinner, not a system.
function buildRadial(r) {
  const N = 5;
  const nodes = [{
    orbit: false, cx: 0.5, cy: 0.5,
    ph: r() * Math.PI * 2, sp: 0.5, am: 0.008,
    rad: 5, sink: true, x: 0, y: 0,
  }];

  for (let i = 0; i < N; i++) {
    nodes.push({
      orbit: true,
      ang: (i / N) * Math.PI * 2 + r() * 0.4,   // seeded jitter off a perfect ring
      dist: 0.3 + r() * 0.14,
      sp: 0.06 + r() * 0.07,                     // slow: this is a drift, not a spin
      dir: r() > 0.5 ? 1 : -1,
      ph: r() * Math.PI * 2,
      am: 0.01 + r() * 0.014,                    // breathe in/out along the radius
      rad: 2.6 + r() * 2,
      sink: false, x: 0, y: 0,
    });
  }

  // Spokes to the synthesis, plus chords between neighbours: the disagreement.
  const edges = [];
  for (let i = 1; i <= N; i++) edges.push([0, i]);
  for (let i = 1; i <= N; i++) if (r() > 0.45) edges.push([i, (i % N) + 1]);
  return { nodes, edges };
}

function build(cv) {
  const ctx = cv.getContext('2d');
  if (!ctx) return null;

  const seed = parseInt(cv.dataset.seed, 10) || 1;
  const shape = cv.dataset.shape || 'chain';
  const r = rng(seed * 2654435761);
  const { nodes, edges } = shape === 'radial'
    ? buildRadial(r)
    : buildChain(r, cv.dataset.nodes || 'full');

  return { cv, ctx, nodes, edges, W: 0, H: 0 };
}

export function initPlateCanvas() {
  const plates = [...document.querySelectorAll('canvas[data-plate]')]
    .map(build)
    .filter(Boolean);
  if (!plates.length) return;

  const css = getComputedStyle(document.documentElement);
  let ink = css.getPropertyValue('--text').trim() || '#ede9dd';
  let hot = css.getPropertyValue('--accent').trim() || '#ff5a1f';

  const resize = (p) => {
    const rect = p.cv.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    p.W = rect.width; p.H = rect.height;
    p.cv.width = Math.round(p.W * dpr);
    p.cv.height = Math.round(p.H * dpr);
    p.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (p, t) => {
    const { ctx, nodes, edges, W, H } = p;
    ctx.clearRect(0, 0, W, H);
    const padX = W * 0.1, padY = H * 0.12;
    const iw = W - padX * 2, ih = H - padY * 2;

    for (const n of nodes) {
      if (n.orbit) {
        // Orbit in NORMALISED space, then map to the box. The cells are 16/9, so
        // the ring lands as an ellipse that fills the frame rather than a circle
        // stranded in the middle with dead space either side.
        const a = n.ang + t * n.sp * n.dir;
        const d = n.dist + Math.sin(t * 0.5 + n.ph) * n.am;
        n.x = padX + (0.5 + Math.cos(a) * d) * iw;
        n.y = padY + (0.5 + Math.sin(a) * d) * ih;
      } else {
        n.x = padX + n.cx * iw + Math.sin(t * n.sp + n.ph) * (iw * n.am);
        n.y = padY + n.cy * ih + Math.cos(t * n.sp * 0.8 + n.ph) * (ih * n.am * 1.6);
      }
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = ink;
    ctx.globalAlpha = 0.26;
    for (const [a, b] of edges) {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.stroke();
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.rad, 0, Math.PI * 2);
      if (n.sink) { ctx.globalAlpha = 0.9; ctx.fillStyle = hot; ctx.fill(); }
      else { ctx.globalAlpha = 0.5; ctx.strokeStyle = ink; ctx.lineWidth = 1.1; ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
  };

  plates.forEach(resize);
  window.addEventListener('resize', () => plates.forEach(resize));

  // Re-read the tokens on theme swap so the art follows the field.
  window.addEventListener('themechange', () => {
    const c = getComputedStyle(document.documentElement);
    ink = c.getPropertyValue('--text').trim() || ink;
    hot = c.getPropertyValue('--accent').trim() || hot;
  });

  // Only the visible plates cost a frame. Each keeps its own raf id so an
  // off-screen canvas isn't paying for an on-screen one.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const p = plates.find((x) => x.cv === e.target);
      if (!p) continue;
      if (e.isIntersecting && !p.raf) {
        const loop = () => { draw(p, performance.now() / 1000); p.raf = requestAnimationFrame(loop); };
        loop();
      } else if (!e.isIntersecting && p.raf) {
        cancelAnimationFrame(p.raf);
        p.raf = 0;
      }
    }
  });
  plates.forEach((p) => io.observe(p.cv));
}
