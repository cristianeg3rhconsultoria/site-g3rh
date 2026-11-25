import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: '/' — o site fica na raiz do domínio (ex.: https://www.g3rh.com.br/).
// Se for publicar dentro de uma subpasta, troque por '/nome-da-pasta/'.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
  },
});
