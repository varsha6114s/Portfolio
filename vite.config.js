import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['three', 'gsap'],
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['three', 'gsap'],
  },
  publicDir: 'public',
}); 