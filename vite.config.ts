import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { port: 5173 },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 200,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-i18n'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
  preview: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
})
