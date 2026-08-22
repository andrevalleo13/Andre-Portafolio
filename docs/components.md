# Componentes

Documentación de los componentes de UI reutilizables del portafolio.

## `Navbar.astro`
El menú de navegación principal.
- **Posición:** `fixed` arriba, con z-index 200 (overlay mobile: 150, burger y lang: 300).
- **Estado scroll:** Al hacer scroll, adquiere fondo semi-transparente oscuro con `backdrop-filter: blur(18px)`.
- **Lógica Dinámica:** Si el usuario no está en la página principal, se inyecta automáticamente el link "HOME" / "INICIO" al inicio.
- **Padding:** Margen editorial de `12vw` en los laterales (ambos desktop y overlay mobile).

**Ubicación:** `src/components/Navbar.astro`
**Uso:** Invocada automáticamente en `src/layouts/Base.astro`.

**Comportamiento:**
- **Estado inicial:** Transparente (integración con el Hero).
- **Estado scrolled (>40px):** Fondo semi-transparente + `backdrop-filter: blur(18px)`.

**Estructura Desktop:**
- **Izquierda:** Links de navegación mapeados desde `navItems` en `ui.ts`.
- **Derecha:** Selector de idioma (EN / ES). Navegación real sin JS.

**Estructura Mobile (`≤768px`):**
- La barra superior muestra solo: **hamburger (izquierda)** + **EN / ES (derecha)**.
- Los links de desktop se ocultan con `display: none !important`.
- El botón hamburger muta a una **X** via CSS puro (3 líneas → morph con `rotate` y `scaleX`).
- Al activar el menú se despliega un **overlay full-screen** (`rgba(20,17,15,0.98)` + blur 24px) por encima de todo el contenido.
- Los links del overlay se revelan con **stagger** (delay de 50ms por item), con tipo editorial grande (`clamp(1.5rem, 7.5vw, 2.2rem)`, peso 200) y un número de índice a la izquierda.
- **EN / ES se reubica dinámicamente:** Al abrir el overlay, el selector de idioma se fade-out de la barra superior, se mueve al DOM del overlay (slot inferior) y se fade-in con stagger. Al cerrar, regresa a la barra. Esto evita duplicar elementos y mantiene una sola fuente de verdad.
- El overlay bloquea el scroll del body (`overflow: hidden`) mientras está abierto.
- Hacer tap en cualquier link cierra el overlay y navega.

**Estética:**
- Paleta bone/taupe exclusiva. Sin colores de acento, sin sombras.
- Curvas de animación: `cubic-bezier(0.16, 1, 0.3, 1)` (equivalente expo.out) en todos los elementos.
- El tipo de letra grande en el overlay _es_ el diseño — Stealth Wealth a escala.

## Footer (en Base.astro)

Sección inferior global del sitio.

**Ubicación:** `src/layouts/Base.astro`
**Uso:** Renderizado automáticamente al final de cada página.

**Estructura y Comportamiento:**
- **Email → Contact Link:** Un enlace `<a>` de bloque masivo a la izquierda con el email visible. Al hacer clic, navega a la página de Contact (usa `getLocalePath('/contact', lang)` para respetar el idioma activo). Ya no copia al portapapeles.
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
