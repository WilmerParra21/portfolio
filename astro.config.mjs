import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@astrojs/tailwind';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  site: 'https://DevsParra.com/',
  integrations: [vue({ appEntrypoint: './src/app-entrypoint.ts' }), tailwindcss()],
  output: 'static',
  build: {
    format: 'directory',
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.webp', '**/*.gif'],
    server: {
      port: 5173,
    },
  },
});
