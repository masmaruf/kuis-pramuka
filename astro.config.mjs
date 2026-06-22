// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kuis.pramukaupdate.id',
  adapter: cloudflare(),
  
  // Vite config
  vite: {
    plugins: [
      tailwind(),
    ],
    optimizeDeps: {
      exclude: ['@astrojs/cloudflare'],
    },
  },
  
  // Image optimization
  image: {
    service: {
      entrypoint: '@astrojs/cloudflare/image',
    },
  },
});
