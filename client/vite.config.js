import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Build output goes one level up so Vercel sees a top‑level "dist" folder
  build: {
    outDir: '../dist',
    // silence the 500 KB chunk warning (optional)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // split React into its own chunk – improves caching & reduces main chunk size
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  // Development proxy (used when running locally)
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
