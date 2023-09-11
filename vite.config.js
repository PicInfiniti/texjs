import { defineConfig } from 'vite'
import { resolve } from 'path'


const root = resolve(__dirname, '')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      }
    }
  },
})