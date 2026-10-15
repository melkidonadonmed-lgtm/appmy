import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/shared/constants/') || id.includes('src\\shared\\constants\\')) {
            return 'anatomy-catalog';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules\\lucide-react')) {
            return 'icons-vendor';
          }
          if (
            id.includes('node_modules/@react-three') ||
            id.includes('node_modules\\@react-three') ||
            id.includes('node_modules/three-stdlib') ||
            id.includes('node_modules\\three-stdlib')
          ) {
            return 'r3f-drei-vendor';
          }
          if (id.includes('node_modules/three') || id.includes('node_modules\\three')) {
            return 'three-core';
          }
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules\\react') ||
            id.includes('node_modules/scheduler') ||
            id.includes('node_modules\\scheduler') ||
            id.includes('node_modules/zustand') ||
            id.includes('node_modules\\zustand')
          ) {
            return 'react-vendor';
          }
          return undefined;
        }
      }
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    watch: {
      ignored: ['**/.agents/**', '**/.context/**', '**/.git/**', '**/dist/**']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
