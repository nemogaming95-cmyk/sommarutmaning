import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Project pages require the repo name as the base so assets are requested from:
  // https://nemogaming95-cmyk.github.io/sommarutmaning/
  base: '/sommarutmaning/',
  plugins: [react()]
});
