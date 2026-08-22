# Componentes

Documentación de los componentes de UI reutilizables del portafolio.

## `Navbar.astro`
El menú de navegación principal.
- **Posición:** `fixed` arriba, con z-index alto.
- **Estado scroll:** Al hacer scroll, adquiere un fondo semi-transparente oscuro con `backdrop-filter: blur(18px)`.
- **Lógica Dinámica:** Si el usuario no está en la página principal (`Astro.url.pathname !== '/'`), se inyecta automáticamente el link "HOME" (o "INICIO") en el lado izquierdo.
- **Padding:** Utiliza un margen editorial extremo de `12vw` en los laterales.

**Ubicación:** `src/components/Navbar.astro`
**Uso:** Invocada automáticamente en `src/layouts/Base.astro`.

**Comportamiento:**
- `position: fixed` en la parte superior.
- **Estado inicial:** Transparente (para integrarse con el Hero).
- **Estado scrolled (>40px):** Fondo semi-transparente (`rgba(20, 17, 15, 0.75)`) con desenfoque (`backdrop-filter: blur(18px)`).

**Estructura:**
- **Izquierda:** Links de navegación (Work, About, Journal, Contact). Mapeados desde `navItems` en `ui.ts`.
- **Derecha:** Selector de idioma (EN / ES). Usa enlaces de navegación reales a las rutas correspondientes (`/ruta` o `/es/ruta`), no requiere JavaScript para funcionar.

**Estética:**
- Tipografía pequeña y espaciada (Stealth Wealth).
- Sin bordes, solo cambios sutiles de opacidad en hover.

## Footer (en Base.astro)

Sección inferior global del sitio.

**Ubicación:** `src/layouts/Base.astro`
**Uso:** Renderizado automáticamente al final de cada página.

**Estructura y Comportamiento:**
- **Email Copy Button:** Un botón de bloque masivo a la izquierda. Al hacer clic, usa la API del portapapeles (`navigator.clipboard`) para copiar el correo. El texto se actualiza a "Copied!" (o "¡Copiado!") y vuelve a su estado original después de 2 segundos.
- **Flechas Dinámicas:** Usa iconos SVG en lugar de texto para las flechas (↗). Están separadas del texto mediante flexbox (`gap` o `margin-left`) para mantener un margen perfecto y tienen padding lateral invisible para evitar cortes en la animación `hoverFill`.
- **Redes Sociales:** Iconos en SVG limpio abajo a la derecha.

**Estética:**
- Separación clara.
- Subrayado arquitectónico personalizado (`border-bottom`) en lugar del default.

## `VideoPlayer.astro`
... (Por implementar para el caso de estudio de Cord).

## `Newsletter.astro`
Componente de captura de correos (suscripción) alojado al final de los artículos en el Journal.
- **Estética:** Extremo minimalismo. Sin cajas ni bordes de colores. Es una sola línea gris interactiva que se ilumina al hacer *focus*.
- **Botón:** Un botón sólido color "hueso" con una flecha sutil (`→`) que reacciona en hover.
- **Interacción:** Al darle submit, se limpia el HTML vía JavaScript y despliega un texto sutil en verde: `SUBSCRIBED.`.

## HeroShader.jsx

Fondo animado en 3D para la página de inicio.

**Ubicación:** `src/components/HeroShader.jsx`
**Uso:** Montado en `src/pages/index.astro` usando `<HeroShader client:only="react" />`.

**Características Técnicas:**
- Construido con React, `@react-three/fiber` y `three.js`.
- Renderiza un *quad* a pantalla completa (clip-space) que ignora las matrices de cámara tradicionales, asegurando que siempre cubra el 100% del viewport sin importar la relación de aspecto.
- Animación generada por algoritmos de *Raymarching* en el fragment shader.
- Incorpora iluminación (soft shadows, ambient occlusion), texturas procedurales (grano de película) y post-procesamiento (tone mapping ACES, viñeta).

**Estética:**
- Oscura, elegante, orgánica. Simula olas o dunas fluidas.
- Paleta en tonos Taupe, Arcilla y Bone White.

---
*Nota: Este proyecto prioriza una arquitectura simple. Los componentes se crean solo cuando son estrictamente necesarios por reutilización o separación de responsabilidades (como aislar React de Astro).*

## TypeformContact.astro

Motor de formulario interactivo tipo Typeform con lógica condicional avanzada.

**Ubicación:** `src/components/TypeformContact.astro`
**Uso:** Renderizado en `/contact` y `/es/contact`.

**Características Técnicas:**
- **Máquina de Estados en Vanilla JS:** Gestiona un flujo de 6 pasos con árboles de decisión en tiempo real basados en la intención del usuario (Investment, Project, Networking).
- **LocalStorage Caching:** Serializa el estado y el paso actual en tiempo real para persistir datos ante recargas accidentales.
- **GSAP Animations:** Deslizamientos en el eje Y coordinados con la barra de progreso.
- **Cinematic Focus:** Oscurece elementos globales en eventos de `focus` para eliminar distracciones visuales.
- **Color Grading Dinámico:** Transición lenta (2s) hacia tintes casi negros dependiendo de la rama lógica.
- **Keyboard Power User:** Soporte para atajos de teclado (A, B, C, Enter).
