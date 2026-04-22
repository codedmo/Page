import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { loadEnv } from 'vite';

const envMode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const env = loadEnv(envMode, process.cwd(), '');

export default defineConfig({
  site: 'https://codedmo.dev',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      __FORM_API_URL__: JSON.stringify(env.PUBLIC_API_URL || env.VITE_API_URL || ''),
      __FORM_API_KEY__: JSON.stringify(env.PUBLIC_API_KEY || env.VITE_API_KEY || ''),
      __FORM_BEARER_TOKEN__: JSON.stringify(env.PUBLIC_BEARER_TOKEN || env.VITE_BEARER_TOKEN || ''),
      __FORM_WEBSITE_ORIGIN__: JSON.stringify(
        env.PUBLIC_WEBSITE_ORIGIN || env.VITE_WEBSITE_ORIGIN || 'https://codedmo.dev'
      ),
      __FORM_EMAIL_TEMPLATE_TYPE__: JSON.stringify(
        env.PUBLIC_EMAIL_TEMPLATE_TYPE || env.VITE_EMAIL_TEMPLATE_TYPE || 'custom'
      ),
    },
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
