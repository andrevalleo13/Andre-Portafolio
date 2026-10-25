# André Valle Ortega — Portafolio
## Golden Rules (Aesthetics & Code)
1. **Lujo vivido, con un toque**: 90 % clásico (finanzas), 10 % raro (dev, arte, humor). Referencias: el Pinterest de André (Margiela, Golden Goose, RRL, Basquiat, cerámica, lucha libre). Ver `docs/design.md`.
2. **Composición libre, tipo collage**: nada de "texto a la izquierda, imagen a la derecha". Piezas encimadas, chuecas, arrastrables, en capas. Dibujos propios en SVG (`src/components/art/`); no repetir el mismo dibujo ni la misma marca entre páginas.
3. **Solo dos fuentes**: Redaction (+ Redaction 50) y Hubot Sans. Sin fuentes manuscritas, sin Google Fonts.
4. **Paleta**: papel, tinta, rojo, azul, naranja (+ verde olivo, cielo, cognac). **Nada de amarillo.** Radios solo de 2px en botones.
5. **Movimiento con propósito**: GSAP con `expo.out` (líneas `power3.inOut`), declarado con atributos (`data-reveal`, `data-draw`, `data-pen`…) en `src/scripts/ink.ts`. Respetar `prefers-reduced-motion`.
6. **Frases duras**, no blandas (*Work hard*, *Play the game*, *i lowkey dgaf anymore*…). El animal de André es el lobo.
7. **Código artesanal**: CSS vanilla con tokens en `Base.astro`, piezas compartidas con prefijo `lv-`. Nada de UI libs ni Tailwind.

## Quick Start
- `npm run dev` — Levantar servidor local (Astro dev; los endpoints `/api/*` corren aquí)
- `npm run build` — Compilar para producción
- `npm run check` — Type-check de Astro/TS (debe salir en 0 errores)
- Copia `.env.example` → `.env` y rellena las claves de Resend para probar formularios en local.

## Arquitectura de Deploy

- **Hosting:** Vercel. Dominio de producción: **`https://andrevalle.xyz`** (definido en `astro.config.mjs` → `site`).
- **Render:** el sitio es **estático**. El adapter `@astrojs/vercel` solo convierte en función serverless los archivos con `export const prerender = false` (hoy: `src/pages/api/contact.ts` y `src/pages/api/subscribe.ts`).
- **Deploy:** push a `main` → Vercel construye y publica automáticamente.

## Backend / Formularios (Resend)

- `src/lib/resend.ts` — cliente Resend + validación + helper JSON. Solo server-side; lee de `import.meta.env`.
- `src/emails/` — plantillas de correo **puras** (sin env ni red; reciben datos → devuelven `{ subject, html, text }`). Table-based, estilos inline, sin web fonts: la estética "carbón" del sitio (`#1c1917`, hueso, Helvetica Neue thin, hairlines). Reutilizables por endpoints y scripts.
  - `layout.ts` — `emailShell()` + helpers (`field`, `hairline`, `escapeHtml`) y tokens `EMAIL`.
  - `contact-notification.ts` — el correo que le llega a André desde el formulario.
- **`POST /api/contact`** — formulario de contacto (`TypeformContact.astro`). Envía email transaccional (HTML + texto) a `RESEND_CONTACT_TO` con `replyTo` del remitente. **No** es marketing.
- **`POST /api/subscribe`** — newsletter (`Newsletter.astro`). Alta en la audiencia de marketing (`RESEND_AUDIENCE_ID`) con `unsubscribed: false`.
- **Audiencias en Resend:** `Newsletter` = única lista de marketing (broadcasts). `Leads · Formulario` (opcional, `RESEND_LEADS_AUDIENCE_ID`) = registro de quien usa el form de contacto, siempre `unsubscribed: true`.
- **Variables de entorno** (Vercel + `.env` local): `RESEND_API_KEY` (Full access), `RESEND_FROM` (dominio verificado), `RESEND_CONTACT_TO`, `RESEND_AUDIENCE_ID`, `RESEND_LEADS_AUDIENCE_ID` (opcional). Ver `.env.example`.
- **DNS / deliverability:** `andrevalle.xyz` verificado en Resend (SPF + DKIM). DMARC activo: `TXT _dmarc.andrevalle.xyz` = `v=DMARC1; p=none; rua=mailto:andrevalleo13@gmail.com`. Los correos nuevos que caigan en spam: "no es spam" + agregar el `from` a contactos (patrón dominio-propio→Gmail).

## Índice de Documentación Extensa

Toda la documentación técnica profunda del proyecto vive en `docs/`. Cada tema tiene su propio archivo.

| Archivo | Contenido |
|---|---|
| [estructura.md](./docs/estructura.md) | Árbol de archivos y organización del proyecto |
| [stack.md](./docs/stack.md) | Tecnologías, dependencias y configuración |
| [design.md](./docs/design.md) | Sistema de diseño — estética, tokens, tipografía, principios |
| [i18n.md](./docs/i18n.md) | Sistema de internacionalización EN/ES |
| [components.md](./docs/components.md) | Documentación de cada componente |
| [pages.md](./docs/pages.md) | Estado y descripción de cada página |
| [changelog.md](./docs/changelog.md) | Historial de cambios cronológico |
