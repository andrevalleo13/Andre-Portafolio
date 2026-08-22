# Historial de Cambios

Registro cronológico de modificaciones mayores y evolución del proyecto.

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
