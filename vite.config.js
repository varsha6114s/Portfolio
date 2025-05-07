import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    emptyOutDir: true
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: ['three', 'gsap']
  }
}); 