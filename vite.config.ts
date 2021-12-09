import { defineConfig } from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  includeAssets: ['icon.png'],
  manifest: {
    name: 'Vue3 Todo',
    short_name: 'TODO',
    theme_color: '#ffffff',
    icons: [],
  },
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions)],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      plugins: [nodeResolve()]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },

})
