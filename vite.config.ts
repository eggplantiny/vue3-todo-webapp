import { defineConfig } from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), nodeResolve()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})
