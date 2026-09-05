# Historial de Cambios

Registro cronológico de modificaciones mayores y evolución del proyecto.

## [0.3.1] - 2026-09-05

### Añadido
- **Plantillas de correo (`src/emails/`).** `layout.ts` con `emailShell()` reutilizable (table-based, estilos inline, sin web fonts, paleta carbón del sitio) + `contact-notification.ts`. El correo del formulario ahora llega como HTML + texto plano (antes solo texto).
- **DMARC.** `TXT _dmarc.andrevalle.xyz` = `v=DMARC1; p=none; rua=mailto:andrevalleo13@gmail.com`. Junto con SPF + DKIM (Resend) resuelve el envío a spam de Gmail.

## [0.3.0] - 2026-09-05

### Añadido
- **Backend serverless (Resend).** Adapter `@astrojs/vercel` en modo estático + endpoints on-demand:
  - `POST /api/contact` — el formulario Typeform ahora envía un email transaccional real (antes solo hacía `console.log` y mostraba éxito falso). Incluye `replyTo` del remitente y estado de error en la UI.
  - `POST /api/subscribe` — el newsletter da de alta el correo en una audiencia de marketing de Resend (antes el submit era un `innerHTML` fingido).
- `src/lib/resend.ts` — cliente + validación de email + helper de respuesta JSON.
- `.env.example` con las variables de Resend (`RESEND_API_KEY`, `RESEND_FROM`, `RESEND_CONTACT_TO`, `RESEND_AUDIENCE_ID`, `RESEND_LEADS_AUDIENCE_ID`).
- `astro.config.mjs`: `site: 'https://andrevalle.xyz'` (canónicas, OG, sitemap).
- Meta tags sociales ampliados: `og:site_name`, `og:locale`, `og:url`, `og:image:width/height/type/alt`, `twitter:creator`, `link[rel=canonical]`.
- `npm run check` (`@astrojs/check` + `typescript` como devDependencies).

### Modificado
- **Navbar:** el menú hamburguesa se re-inicializa en `astro:page-load`; antes dejaba de abrir tras navegar por transiciones de vista (SPA).
- **`og-image`:** era un PNG de 10 MB (1920×1080, 16-bit) que X rechazaba por superar el límite de 5 MB. Ahora `og-image.jpg` de 160 KB (1200×675, 8-bit). La URL pasó de relativa a absoluta.
- **`favicon.png`:** 3.5 MB (1000×1000) → 96 KB (256×256).
- **`Base.astro`:** `<ClientRouter />` movido al final del `<head>`; JSON-LD con datos reales (fuera el placeholder "Universidad Finanzas"; `alumniOf` = Universidad Panamericana; `sameAs` con redes reales); `description` por defecto alineada con el hero.
- **`i18n/ui.ts`:** eliminada la clave duplicada `journal.heading`; añadidas `newsletter.success` / `newsletter.error` (EN + ES).
- `TypeformContact.astro`: corregido el tipado del handler `keydown` (`astro check` pasaba de 4 errores a 0).

## [0.2.0] - 2026-08-22

### Añadido
- **Mobile overlay menu full-screen**: El Navbar en móvil (≤768px) ahora despliega un overlay full-screen con links editoriales grandes, números de índice, y stagger animado (expo.out). Reemplaza el dropdown simple anterior.
- **Hamburger → X morph**: Botón de 3 líneas con transformación CSS pura a X (rotate + scaleX). Sin outlines de browser ni tap-highlight.
- **Reubicación dinámica de EN/ES**: Al abrir el overlay, el selector de idioma se fade-out del navbar, se mueve al DOM del overlay (slot inferior), y se fade-in con stagger. Al cerrar, regresa a la barra superior. Evita duplicación de elementos.
- **Fix ↗ emoji en iOS**: Agregado `&#xFE0E;` (variation selector) a todos los caracteres ↗ para forzar renderizado como texto plano en móvil.

### Modificado
- **Footer email → Contact link**: El botón de copiar email en el footer ahora es un `<a>` que navega a `/contact` (respetando idioma con `getLocalePath`). Se eliminó la lógica de clipboard.
- Navbar z-index reestructurado: navbar 200, overlay 150, burger y lang 300.

## [0.1.0] - 2026-08-15

### Añadido
- Inicialización del proyecto con Astro (`create-astro`).
- Configuración de repositorio Git y vinculación a GitHub.
- Integración de React y `three.js` / `@react-three/fiber`.
- Implementación de `HeroShader.jsx`: Un fondo 3D reactivo usando raymarching.
- Sistema de internacionalización artesanal route-based (EN/ES) con `ui.ts` y `utils.ts`.
- Componente `Navbar.astro` con transición transparente a blur en el scroll.
- Layout centralizado `Base.astro`.
- Páginas estructuradas (index, work, about, journal, contact) para ambos idiomas.
- Documentación completa y dividida en la carpeta `docs/`.
- Integración de GSAP para interacciones de alto nivel (efecto de relleno cuadrado al hacer hover en links `hoverFill.ts`, y entrada cinemática de texto `splitText.ts`).
- Transiciones de página SPA nativas con `<ClientRouter />` de Astro.
- Interactividad en tiempo real en el shader de fondo conectando las coordenadas del cursor (`uMouse`) al parallax geométrico.
- Finalización de la página `/about` (y `/es/about`) con traducciones dinámicas, datos de proyectos, y enlaces a certificados.
- Reestructuración de la página `/contact` (y `/es/contact`) en un motor avanzado estilo Typeform con árboles de decisión dinámicos, caché (LocalStorage), animaciones de CSS (morphing) y dimming cinemático.

### Modificado
- El shader se actualizó para renderizar en clip-space (full viewport real) solucionando problemas de aspect ratio de la cámara ortográfica/perspectiva.
- Rediseño de la UI hacia "Stealth Wealth Técnico" (Helvetica Neue, minimalismo extremo, sin bordes en botones, foco tipográfico).
- Refactorización de las flechas (↗) en el index y el footer usando vectores (SVG) independientes y con flexbox dinámico para anclarlas a la derecha.
- Optimizaciones tipográficas rigurosas (límites de `max-width` en `ch`) para mejorar la lectura ("espacio negativo").
- El botón de contacto del Footer ahora incluye una lógica de copiar al portapapeles sin destruir el DOM animado de GSAP.

### Eliminado
- Archivos por defecto de la plantilla original de Astro.
