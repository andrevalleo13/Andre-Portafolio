# Stack Técnico

Tecnologías, dependencias y configuración del proyecto.

## Dependencias

| Capa | Paquete | Uso |
|---|---|---|
| Framework | `astro` 7.x | Sitio estático + View Transitions (`astro:transitions`) |
| Deploy | `@astrojs/vercel` | Adapter; solo `src/pages/api/*` es serverless |
| Animación | `gsap` 3.15 | ScrollTrigger, DrawSVG, Draggable, Inertia (incluidos y gratis desde 3.13) |
| Scroll | `lenis` 1.3 | Scroll con inercia, sincronizado con el reloj de GSAP |
| Fuentes | `@fontsource/redaction`, `@fontsource/redaction-50`, `@fontsource-variable/hubot-sans` | Servidas desde el propio sitio (sin Google Fonts) |
| Email | `resend` | Formularios (ver CLAUDE.md) |
| Analítica | `@vercel/analytics` | |

Sin React ni three.js: los dibujos son SVG en componentes Astro y la pintura del footer es Canvas 2D.

## Scripts

```bash
npm run dev      # dev server (http://localhost:4321)
npm run build    # build de producción
npm run check    # astro check (debe salir en 0 errores)
```

## Scripts de cliente (`src/scripts/`)

| Archivo | Qué hace |
|---|---|
| `ink.ts` | Pluma roja, dibujos que se pintan, revelados con scroll, contadores, arrastre, capas con el mouse, pista horizontal de Holdings. `initInk()` / `killInk()` |
| `smooth.ts` | Lenis + links internos `[data-scroll]` |
| `splatter.ts` | Pintura salpicada con el cursor en el footer |

Todos se inicializan en `Base.astro` (al cargar y en `astro:page-load`) y se limpian en `astro:before-swap`.

## Configuración

`astro.config.mjs`: `site: 'https://andrevalle.xyz'` + adapter de Vercel. `tsconfig.json` extiende `astro/tsconfigs/strict`.
