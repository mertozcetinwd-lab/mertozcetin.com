// Theme-reactive duotone. Updates one shared inline SVG <filter> so every work
// artifact re-tones instantly on the theme swap. Maps image luminance between
// --duo-shadow and --duo-highlight, both neutral greys — holding the artifact
// colourless until hover lifts the overlay. See WorkArtifact.astro.
function chan(varName) {
  const cs = getComputedStyle(document.documentElement);
  let v = cs.getPropertyValue(varName).trim().replace('#', '');
  if (v.length === 3) v = v.split('').map((c) => c + c).join('');
  return [
    parseInt(v.slice(0, 2), 16) / 255,
    parseInt(v.slice(2, 4), 16) / 255,
    parseInt(v.slice(4, 6), 16) / 255,
  ];
}

export function applyDuotone() {
  const s = chan('--duo-shadow');
  const h = chan('--duo-highlight');
  const set = (id, lo, hi) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('tableValues', `${lo} ${hi}`);
  };
  set('duoR', s[0], h[0]);
  set('duoG', s[1], h[1]);
  set('duoB', s[2], h[2]);
}

export function initDuotone() {
  applyDuotone();
  window.addEventListener('themechange', applyDuotone);
}
