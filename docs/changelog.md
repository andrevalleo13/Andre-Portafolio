# Historial de Cambios

Registro cronológico de modificaciones mayores y evolución del proyecto.

## [0.4.3] - 2026-10-25

### Modificado
- **Navbar más única:** "Índice" va sobre un brochazo negro de bordes irregulares que se repinta de rojo (se probó una etiqueta colgante con hilo y puntadas en la marca; a André no le convenció). El índice a pantalla completa se volvió un cuadro sobre lino (`Lienzo`: lobo "NO LEASH" en azul, "BUILT, NOT BOUGHT©" en negro, naranja con la cuenta, chorreados rojos) con notas a barra de óleo por sección. Reemplaza al caballo, la mancha verde, los puntos y las estrellas.
- **Índice del Journal:** sin nota principal gigante; los memos cuelgan como cuadros del mismo tamaño (clavo y alambre, marcos negro, nogal y roble claro), cada uno con su pintura neoexpresionista relacionada con el tema (campo `cover`: `CuadroBootstrap`, `CuadroFriccion`, `CuadroChurn`) y una cédula de museo abajo. Cuelgan chuecos y se enderezan al pasar el cursor.

### Añadido
- `mano.ts`: letra de palo a mano (mayúsculas de un trazo, chuecas) para escribir sobre los cuadros sin una tercera fuente.
- Subagentes en `.claude/agents/`: `pintor-portadas`, `ilustrador-memos`, `escritor-memos`, `disenador-landing`, `copy-landing`, `dibujante-sitio`, `revisor-visual`.
- `tools/shot.mjs`: capturas con Chrome headless para verificar cambios.
- `AGENTS.md` (CLAUDE.md) reescrito: cómo funciona la estética, lo que se hizo, lo que André rechazó, cómo agregar un memo, mañas del dev server y autor de commits para Vercel.

### Eliminado
- El dibujo `Signos` (sol, estrella, pez…).

## [0.4.2] - 2026-10-25

### Añadido
- **Journal nuevo:** tres memos en primera persona (EN/ES) sobre lo aprendido en clase y aplicado en Cord y Flouvia: Agile, Lean y bootstrapping; Design Thinking, UX y el recorrido del cliente; NPS, churn, LTV/CAC y omnicanalidad.
- **Memos en MDX** (`@astrojs/mdx`) con ilustraciones a tinta en `src/components/memo/` (ciclos, Kanban, Venn, iceberg, recorrido del cliente, embudo, balanza, escala NPS, cuentas, multicanal vs. omnicanal, notas al margen).
- Suscripción a memos rediseñada: sin caja, con paloma mensajera (`Paloma`), campo subrayado a pluma y sello.

### Modificado
- Astro 7.2.2 → 7.2.10 (requisito de `@astrojs/mdx` 8).
- Ancho de lectura de los memos limitado a ~70 caracteres.

### Eliminado
- Los 12 memos anteriores.

## [0.4.1] - 2026-10-25

### Añadido
- **Casos con página propia** (no plantilla): `CaseCord` (cordón que se dibuja con el scroll, 12 banderas pintadas, timbres fiscales, cobranza, terminal, engranes, libro de números) y `CaseFlouvia` (carta de servicios, pósters de clientes, boceto de Flouvia OS, el taller, etiqueta de composición). Contenido actualizado desde los repos `flouvia-cord` y `flouvia`; Cord a $5k MRR.
- Dibujos nuevos: `Barca`, `TheSix`, `Cafe`, `Tequila`, `Bandera`, `Timbre`, `Doodle`; `Tigre` redibujado (naranja con rayas). Pinturas de fondo `grafiti` y `brochazo`.
- About: sección "Reglas de la casa": sus reglas pintadas a brocha roja (`Reglas`, filtro `#brocha`), con The 6, tequila y el 911 alrededor.
- Pared del inicio: "La manga rota" (`Manga`): reloj de acero asomando por una manga de suéter rota, en lugar de la máscara de luchador.
- Hero: la etiqueta roja dice "i lowkey dgaf anymore".
- Pared del inicio: el as de corazones "PLAY THE GAME" a crayón (`Carta`) reemplaza la frase en acrílico naranja (`Frase`, eliminada).
- `data-draw="scrub"`: trazos que avanzan con el scroll.
- Favicon: lobo crema sobre la etiqueta roja (`favicon.svg`, `favicon.png`, `apple-touch-icon.png`).

### Modificado
- Footer: "let's talk." en ambos idiomas, sin folio, sin colofón; pintura más realista (gotas orgánicas, latigazos, escurrimientos, limpiar el lienzo).
- Filtros SVG con región amplia: los brochazos gruesos ya no se recortan.

### Eliminado
- La mancha azul circular (`acuarela`), el GAT, el plato con serpiente, el chorreado tipo peine y el salpicado tipo Pollock.

## [0.4.0] - 2026-10-25

### Rediseño completo: "Lujo vivido, con un toque"
Sale del Pinterest de André (Margiela, Golden Goose, RRL, Basquiat, cerámica, lucha libre, caballos, lobos). Reemplaza "Stealth Wealth Técnico" en todo el sitio.

### Añadido
- **Composición libre tipo collage** en todas las páginas: piezas encimadas, chuecas, arrastrables (GSAP Draggable + Inertia) y en capas que siguen al mouse.
- **Dibujos propios en SVG** (`src/components/art/`): lobo, lobo con corona, tigre, serpiente, pulpo, dálmata, caballos, máscara de luchador, reloj, 911, GAT pintado, puro, taza, velero, cuerda, estampilla, páginas y frases pintadas, y marcas abstractas (`Trazo`). Se pintan trazo por trazo.
- **Sistema de movimiento declarativo** (`src/scripts/ink.ts`): pluma roja, `data-draw`, `data-reveal` (lines, rule, sheet, drop, type, write), contadores, pista horizontal de Holdings.
- **Scroll con inercia** (Lenis, `src/scripts/smooth.ts`).
- **Tipografía**: Redaction (+ corte desgastado Redaction 50) y Hubot Sans, servidas desde el sitio vía Fontsource.
- **Marca**: etiqueta roja de ropa (`Etiqueta.astro`) con numeración 0–23 de Margiela.
- **Home**: portada collage, Tesis, Holdings horizontal, Colección (pared a lo salón), Memos.
- **Work, caso, About, Journal y memo** rediseñados como componentes compartidos EN/ES (`WorkIndex`, `WorkCase`, `About`, `JournalIndex`, `JournalPost`); helpers en `src/lib/work.ts` y `src/lib/journal.ts`; contenido de About en `src/data/about.ts`.
- **Índice a pantalla completa** (navbar) compuesto como collage.
- **Footer** oscuro con pintura salpicada por el cursor (`splatter.ts`).
- **Contacto** con la misma lógica Typeform en la estética nueva; el dibujo cambia con la intención.
- **Página 404** ("El lobo se comió esta página.").
- **OG image** nueva (1200×675).

### Eliminado
- React, `@astrojs/react`, three.js y `@react-three/fiber` (y `HeroShader.jsx`).
- Scripts del diseño anterior (`hoverFill`, `splitText`, `scrollReveal`, `hoverImage`), tokens oscuros y clases `.wrapper` / `.section*`.
- Google Fonts.

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
