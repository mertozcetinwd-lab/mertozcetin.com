// Theme engine — the site's signature. Swaps the whole tonal system live.
export const THEMES = ['dark', 'light'];
const KEY = 'mz-theme';

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

export function setTheme(t) {
  if (!THEMES.includes(t)) return;
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(KEY, t); } catch (e) { /* private mode */ }
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } }));
}

export function cycleTheme() {
  const i = THEMES.indexOf(getTheme());
  setTheme(THEMES[(i + 1) % THEMES.length]);
}

function sync() {
  const t = getTheme();
  document.querySelectorAll('[data-theme-set]').forEach((el) => {
    el.setAttribute('aria-pressed', String(el.getAttribute('data-theme-set') === t));
  });
  document.querySelectorAll('[data-theme-label]').forEach((el) => { el.textContent = t; });
}

export function initThemeControls() {
  document.querySelectorAll('[data-theme-set]').forEach((el) => {
    el.addEventListener('click', () => setTheme(el.getAttribute('data-theme-set')));
  });
  document.querySelectorAll('[data-theme-cycle]').forEach((el) => {
    el.addEventListener('click', () => cycleTheme());
  });
  window.addEventListener('themechange', sync);
  sync();
}

// The motion preference that used to live here is gone — see tokens.css for why.
// Animations are unconditional now; there is nothing to persist.
