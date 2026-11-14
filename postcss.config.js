import { fileURLToPath } from "node:url"

// Point Tailwind at this folder's config, so the dev server works from any working directory.
export default {
  plugins: {
    tailwindcss: { config: fileURLToPath(new URL("./tailwind.config.js", import.meta.url)) },
    autoprefixer: {},
  },
}
