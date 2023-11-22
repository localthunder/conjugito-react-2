import { defineConfig } from 'vite';
import ViteReactPlugin from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteReactPlugin()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // Adjust the port accordingly
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  build: {
    sourcemap: true
  },
});