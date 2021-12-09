import { defineConfig } from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  includeAssets: ['icon.png'],
  manifest: {
    name: 'PWA Router',
    short_name: 'PWA Router',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
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
