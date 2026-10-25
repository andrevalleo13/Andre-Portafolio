# Estructura del Proyecto

```
Portafolio/
├── CLAUDE.md                     ← Reglas del proyecto + índice de docs
├── docs/                         ← Documentación (diseño, stack, componentes, páginas, i18n, changelog)
├── public/
│   ├── favicon.png
│   └── og-image.jpg              ← 1200×675, estética "Lujo vivido"
├── src/
│   ├── layouts/Base.astro        ← <head>, tokens, piezas lv-*, Navbar, Footer, init de scripts
│   ├── components/
│   │   ├── Navbar.astro · Footer.astro · Newsletter.astro · TypeformContact.astro
│   │   ├── Home.astro · WorkIndex.astro · WorkCase.astro · About.astro
│   │   ├── JournalIndex.astro · JournalPost.astro
│   │   ├── home/                 ← Cover, Tesis, Holdings, Coleccion, Memos, Folio, Pieza, Obra
│   │   └── art/                  ← Dibujos SVG (lobo, tigre, 911, GAT…), Trazo, Etiqueta, InkDefs
│   ├── scripts/                  ← ink.ts (animaciones), smooth.ts (Lenis), splatter.ts (pintura)
│   ├── lib/                      ← work.ts, journal.ts, resend.ts
│   ├── data/about.ts             ← Experiencia, formación, competencias, certificaciones (EN/ES)
│   ├── i18n/                     ← ui.ts (textos EN/ES), utils.ts
│   ├── emails/                   ← Plantillas de correo (Resend)
│   ├── content/                  ← Colecciones journal/ y work/ (markdown EN + ES)
│   └── pages/
│       ├── index · work/index · work/[id] · about/index · journal · journal/[slug] · contact · 404
│       ├── api/contact.ts · api/subscribe.ts   ← serverless (Vercel)
│       └── es/                   ← mismas rutas en español (envoltorios)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Convenciones

- Las páginas (EN en `src/pages`, ES en `src/pages/es`) son envoltorios de una línea; el contenido vive en un componente compartido que saca el idioma de la URL.
- Cada componente lleva su `<style>` scoped. Tokens y piezas compartidas (`lv-*`) viven en `Base.astro`.
- Textos de interfaz en `src/i18n/ui.ts`; contenido estructurado en `src/data/`.
- El movimiento se declara con atributos (`data-reveal`, `data-draw`, `data-pen`…), ver `design.md`.
