import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared'), // 👈 критически важно
      '@app': path.resolve(__dirname, './src/app'),
    },
  },
  server: {
    open: true,
    port: 5173,
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
});