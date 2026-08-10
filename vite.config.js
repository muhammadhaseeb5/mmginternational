import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { access, copyFile, mkdir } from 'node:fs/promises'
import { allCollectionItems } from './src/data/collections.js'

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

    const clientIndex = 'dist/client/index.html'

    try {
      await access(clientIndex)
    } catch {
      return
    }

    const staticRoutes = ['catalogue', ...allCollectionItems.map((item) => `catalogue/${item.slug}`)]
    for (const route of staticRoutes) {
      const routeDirectory = `dist/client/${route}`
      await mkdir(routeDirectory, { recursive: true })
      await copyFile(clientIndex, `${routeDirectory}/index.html`)
    }
  },
}

export default defineConfig(async () => {
  const { cloudflare } = await import('@cloudflare/vite-plugin')

  return {
    plugins: [react(), tailwindcss(), cloudflare(), sitesOutput],
  }
})
