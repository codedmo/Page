import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar React y librerías principales
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separar librerías de UI
          'ui-vendor': ['lucide-react', '@radix-ui/react-checkbox', '@radix-ui/react-label', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-slider', '@radix-ui/react-slot'],
          // Separar librerías de PDF y utils
          'pdf-vendor': ['jspdf', 'html2canvas', 'svg2pdf.js'],
          // Separar librerías de estilo
          'style-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          // Componentes grandes del cotizador
          'quotation': ['./src/components/QuotationModern.tsx', './src/components/quotation.tsx']
        }
      }
    },
    // Aumentar el límite de advertencia a 1MB
    chunkSizeWarningLimit: 1000,
    // Optimizar la compilación
    minify: 'terser'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://api.resend.codedmo.dev',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_, req) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
})
