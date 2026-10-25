// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción (usado para canónicas, OG y sitemap).
  site: 'https://andrevalle.xyz',
  // El sitio sigue siendo estático; solo los endpoints con `export const prerender = false`
  // (src/pages/api/*) corren como funciones serverless en Vercel.
  adapter: vercel(),
  // MDX: los memos del Journal llevan ilustraciones (src/components/memo/).
  integrations: [mdx()],
});
