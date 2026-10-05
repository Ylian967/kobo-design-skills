import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
const K = resolve(import.meta.dirname, '../..');   // kobo-studio/
const pages = ['composants', 'accueil', 'interieure', 'landing', 'article', 'recit', 'gabarits', 'application', 'fiche', 'tableau-de-bord'];
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { '@k': K, react: resolve('node_modules/react'), 'react-dom': resolve('node_modules/react-dom') }, preserveSymlinks: true },
  build: { minify: false, rollupOptions: { input: Object.fromEntries(pages.filter((p) => process.env.PAGES ? process.env.PAGES.split(',').includes(p) : p !== 'gabarits').map((p) => [p, resolve(p + '.html')])) } },
});
