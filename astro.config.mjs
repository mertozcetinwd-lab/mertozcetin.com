import { defineConfig } from 'astro/config';

// Vanilla Astro (no UI framework needed for v1) — hand-authored scoped CSS + a
// little client JS for the theme engine, generative art, and motion.
export default defineConfig({
  site: 'https://mertozcetin.com',
  devToolbar: { enabled: false },
});
