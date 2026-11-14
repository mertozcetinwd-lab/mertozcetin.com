import { fileURLToPath } from "node:url"
import path from "node:path"

// Absolute content globs: Tailwind resolves relative globs against the working directory,
// and the dev server is started from the repo root (see .claude/launch.json).
const here = path.dirname(fileURLToPath(import.meta.url)).replace(/\\/g, "/")

/** @type {import('tailwindcss').Config} */
export default {
  content: [`${here}/index.html`, `${here}/src/**/*.{ts,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono Variable"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
}
