// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción (usado para canónicas, OG y sitemap).
  site: 'https://andrevalle.xyz',
  integrations: [react()],
  // El sitio sigue siendo estático; solo los endpoints con `export const prerender = false`
  // (src/pages/api/*) corren como funciones serverless en Vercel.
  adapter: vercel(),
});
