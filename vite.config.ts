import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'unplugin-dts/vite'


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      bundleTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'lib/main.ts'),
      name: 'seel-ui',
      fileName: 'seel-ui',
    },
    rolldownOptions: {
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/],
      output: {
        globals: {
          react: 'react',
          'react/jsx-runtime': 'react/jsx-runtime',
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
      '@types': './lib/types',
      '@docs': '/docs',
    },
  },
})
