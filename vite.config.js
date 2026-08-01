import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdir, writeFile } from 'node:fs/promises'

const cloudflareWorker = {
  name: 'mmg-cloudflare-worker',
  apply: 'build',
  async closeBundle() {
    await mkdir('dist/server', { recursive: true })
    await writeFile(
      'dist/server/index.js',
      "export default { async fetch(request, env) { return env.ASSETS.fetch(request); } };\n",
    )
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflareWorker],
})
