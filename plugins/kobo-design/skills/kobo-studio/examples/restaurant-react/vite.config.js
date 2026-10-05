import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Une entrée par page .html posée à la racine : ajouter une page, c'est ajouter un fichier (et son src/<page>.jsx).
const pages = readdirSync(import.meta.dirname).filter((f) => f.endsWith('.html'));

export default defineConfig({
  base: './',
  plugins: [react()],
  build: { rollupOptions: { input: Object.fromEntries(pages.map((f) => [f.replace('.html', ''), resolve(import.meta.dirname, f)])) } },
});
