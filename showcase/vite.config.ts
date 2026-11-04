import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// The site is served from /ui/ on GitHub Pages; locally it runs from /.
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: process.env.GITHUB_ACTIONS ? "/ui/" : "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: fileURLToPath(new URL("../dist-showcase", import.meta.url)),
    emptyOutDir: true,
  },
});
