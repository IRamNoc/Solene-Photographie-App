import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    host: true,
  },
  preview: {
    port: 3003,
    host: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'framer-motion'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion'],
          icons: ['lucide-react'],
          email: ['@emailjs/browser']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
