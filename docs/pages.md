# Páginas

El idioma principal (inglés) se sirve desde `/` y el español desde `/es/`. Cada archivo de `src/pages` es un envoltorio de una línea sobre un componente compartido (ver `components.md`); el idioma sale de la URL.

| Ruta (EN) | Ruta (ES) | Componente | Contenido |
|---|---|---|---|
| `/` | `/es/` | `Home` | Portada collage · I. Tesis · II. Holdings · III. Colección · IV. Memos |
| `/work` | `/es/work` | `WorkIndex` | Holdings & Ventures |
| `/work/[id]` | `/es/work/[id]` | `WorkCase` | Caso por proyecto (colección `work`) |
| `/about` | `/es/about` | `About` | Manifiesto, experiencia, competencias, formación |
| `/journal` | `/es/journal` | `JournalIndex` | Primera plana de memos + cupón |
| `/journal/[slug]` | `/es/journal/[slug]` | `JournalPost` | Memo (colección `journal`) |
| `/contact` | `/es/contact` | `TypeformContact` | Formulario paso a paso |
| `/404` | — | `pages/404.astro` | "El lobo se comió esta página." Cambia a español en el navegador si la ruta empieza con `/es` |

## Agregar una página

1. Crear el componente en `src/components/` (saca el idioma con `getLangFromUrl(Astro.url)`).
2. Crear `src/pages/<ruta>.astro` y `src/pages/es/<ruta>.astro` que solo hacen `<Base title=…><Componente /></Base>`.
3. Textos de interfaz en `src/i18n/ui.ts` (EN + ES); contenido estructurado en `src/data/`.

## OG image

`public/og-image.jpg` (1200×675) se rindió con los mismos componentes del sitio (lobo, etiqueta, trazos) desde una página temporal y se capturó con Chrome headless. Para regenerarla, repetir ese proceso y borrar la página temporal.
