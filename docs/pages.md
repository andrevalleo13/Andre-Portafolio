# Páginas

Estado y descripción de cada ruta del portafolio.

## Enrutamiento y Estructura

El sitio utiliza el enrutamiento basado en archivos de Astro.
Todas las páginas están envueltas por el layout `src/layouts/Base.astro`.
El idioma principal (Inglés) se sirve desde la raíz `/`.
El idioma Español se sirve desde el subdirectorio `/es/`.

## Directorio de Páginas

| Ruta (EN) | Ruta (ES) | Estado | Propósito |
|---|---|---|---|
| `/` | `/es/` | ✅ Completa | Landing page. Contiene el Hero con el Shader 3D, el nombre, un breve descriptor y llamadas a la acción (CTAs) directas a Trabajo y Contacto. |
| `/work` | `/es/work` | 🔲 Pendiente | Mostrará proyectos seleccionados, emprendimientos y trabajo técnico. |
| `/about` | `/es/about` | ✅ Completa | Sección "Acerca de". Filosofía, background como estudiante de finanzas y operador, ventures (Cord, Flouvia) y certificaciones. |
| `/journal` | `/es/journal` | 🔲 Pendiente | Espacio tipo blog/ensayos sobre la intersección de finanzas, estrategia y tecnología. |
| `/contact` | `/es/contact` | ✅ Completa | Motor avanzado de calificación de leads. Flujo estilo Typeform dinámico impulsado por JS Vanilla, animaciones GSAP y LocalStorage. |

## Mantenimiento

Al crear o modificar una página:
1. Crear el archivo base en `src/pages/`.
2. Usar el layout `Base`.
3. Integrar las traducciones con `useTranslations(lang)`.
4. Duplicar el archivo en `src/pages/es/`, asegurando que los imports apunten un nivel más arriba (`../../`).
