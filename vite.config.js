import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'lib/main.js'),
      name: 'seel-ui',
      fileName: 'seel-ui',
    },
    rolldownOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'react',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@hooks': '/lib/hooks',
      '@components': '/lib/components',
      '@providers': '/lib/providers',
      '@constants': '/lib/constants',
      '@utils': '/lib/utils',
      '@docs': '/docs',
    },
  },
})
