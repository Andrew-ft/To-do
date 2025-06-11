import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy only for local dev environment
      '/api': {
        target: 'https://to-do-production-92f0.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
