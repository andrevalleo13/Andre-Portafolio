# Stack Técnico

Tecnologías, dependencias y configuración del proyecto.

## Framework

| Capa | Tecnología | Versión |
|---|---|---|
| Framework principal | Astro | 7.x |
| Integración React | `@astrojs/react` | 6.x |
| UI runtime | React + React DOM | 19.x |
| 3D / WebGL | Three.js | latest |
| 3D abstraction | `@react-three/fiber` | latest |
| Animaciones | GSAP | 3.x |
| Navegación SPA | `astro:transitions` | nativo |

## Dev Server

```bash
npx astro dev --background   # arrancar en segundo plano
astro dev stop               # detener
astro dev status             # ver estado
astro dev logs               # ver logs
```

URL local: `http://localhost:4321`

## Scripts disponibles

```bash
npm run dev      # dev server
npm run build    # build de producción
npm run preview  # preview del build
```

## Configuración

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()]
});
```

### `tsconfig.json`

Extend de `astro/tsconfigs/strict` con soporte para JSX de React.

## Tipografía

**Helvetica Neue** — fuente del sistema, sin carga de red.
Stack: `'Helvetica Neue', Helvetica, Arial, sans-serif`

No se usa Google Fonts ni ninguna fuente externa en este proyecto.

## Nota de dependencias

- `preserveDrawingBuffer` removido del Canvas de Three.js (no necesario en producción)
- El vertex shader dibuja en clip-space para independencia total del aspect ratio
