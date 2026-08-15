# Estructura del Proyecto

Árbol completo de archivos y su propósito.

```
André-Portafolio/
│
├── CLAUDE.md                   ← Reglas para el agente (dev server, docs Astro)
│
├── docs/                       ← Documentación artesanal del proyecto
│   ├── claude.md               ← Índice — links a todos los docs
│   ├── estructura.md           ← Este archivo
│   ├── stack.md                ← Tecnologías y dependencias
│   ├── design.md               ← Sistema de diseño
│   ├── i18n.md                 ← Sistema de internacionalización
│   ├── components.md           ← Documentación de componentes
│   ├── pages.md                ← Estado de cada página
│   └── changelog.md            ← Historial de cambios
│
├── public/
│   └── favicon.svg
│
├── src/
│   │
│   ├── i18n/
│   │   ├── ui.ts               ← Diccionario central de traducciones EN/ES
│   │   └── utils.ts            ← Helpers i18n (getLangFromUrl, useTranslations…)
│   │
│   ├── components/
│   │   ├── Navbar.astro        ← Barra de navegación fija
│   │   └── HeroShader.jsx      ← Shader 3D raymarching (React + Three.js)
│   │
│   ├── layouts/
│   │   └── Base.astro          ← Layout compartido: <head>, Navbar, Footer, CSS global
│   │
│   └── pages/
│       ├── index.astro         ← Home EN
│       ├── work.astro          ← Work EN
│       ├── about.astro         ← About EN
│       ├── journal.astro       ← Journal EN
│       ├── contact.astro       ← Contact EN
│       └── es/
│           ├── index.astro     ← Home ES
│           ├── work.astro      ← Work ES
│           ├── about.astro     ← About ES
│           ├── journal.astro   ← Journal ES
│           └── contact.astro   ← Contact ES
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Convenciones

- Las páginas EN viven en `src/pages/*.astro`
- Las páginas ES viven en `src/pages/es/*.astro` (mirrors de las EN, mismos archivos)
- Los imports en páginas ES usan `../../` en vez de `../`
- Cada componente tiene su CSS `<style>` scoped dentro del mismo archivo
- Los estilos globales y tokens viven únicamente en `src/layouts/Base.astro`
