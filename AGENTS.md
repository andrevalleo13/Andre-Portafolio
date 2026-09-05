# André Valle Ortega — Portafolio
## Golden Rules (Aesthetics & Code)
1. **Stealth Wealth Técnico**: Estética inspirada en lujo discreto (Maison Margiela, The Row, Porsche). Menos es más.
2. **Minimalismo Absoluto**: NO bordes redondeados (solo ligeros 2px en botones), NO cajas visibles, NO sombras baratas. Todo debe sentirse editorial y tipográfico.
3. **Interacciones Cinematográficas**: Las animaciones (gsap) deben ser fluidas (`expo.out`), elegantes y tener un propósito. Nada de rebotes infantiles.
4. **Código Artesanal**: Evitamos librerías pesadas (UI libs, Tailwind) a menos que sea necesario. CSS vanilla con variables bien estructuradas en `Base.astro`.

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
