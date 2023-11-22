import { defineConfig } from 'vite';
import ViteReactPlugin from '@vitejs/plugin-react';

// Determine the mode based on the environment
const isProduction = process.env.NODE_ENV === 'production';

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
    sourcemap: !isProduction, // Enable sourcemaps in development
  },
});