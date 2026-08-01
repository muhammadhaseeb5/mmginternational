import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { access, copyFile, mkdir } from 'node:fs/promises'

const sitesOutput = {
  name: 'sites-output',
  apply: 'build',
  enforce: 'post',
  async closeBundle() {
    const workerEntry = 'dist/mmg_cloudflare_worker/index.js'

    try {
      await access(workerEntry)
    } catch {
      return
    }

    await mkdir('dist/server', { recursive: true })
    await mkdir('dist/.openai', { recursive: true })
    await copyFile(workerEntry, 'dist/server/index.js')
    await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json')
  },
}

export default defineConfig(async () => {
  const { cloudflare } = await import('@cloudflare/vite-plugin')

  return {
    plugins: [react(), tailwindcss(), cloudflare(), sitesOutput],
  }
})
