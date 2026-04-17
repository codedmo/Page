import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  site: 'https://codedmo.dev',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://api.resend.codedmo.dev',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
});
