---
title: "Flouvia"
subtitle: "Estudio de Diseño e Ingeniería para Comercio y B2B"
role: "Co-Founder & Lead Engineer"
timeline: "2024 — Presente"
impact: "+12 Infraestructuras Desplegadas"
url: "https://flouvia.com"
lang: "es"
draft: false
---

Flouvia es un estudio de diseño e ingeniería con sede en la Ciudad de México. Construye la operación digital de negocios establecidos —sitios, tiendas en línea, portales B2B privados, apps de Shopify, plataformas, apps móviles e IA— y le entrega a cada cliente las herramientas para ver y operar lo que se construyó. Trabajamos con un número limitado de clientes al año, por aplicación.

## 1. Trabajo seleccionado

- **Cord** — el producto propio del estudio: una plataforma de cierre comercial, de la propuesta al pago en un solo link. Nació como la app de Shopify de Flouvia para cotizaciones B2B y se volvió una empresa independiente.
- **El Zarco** — un distribuidor mayorista que desde 1992 surte a restaurantes, tiendas y cafeterías desde la Central de Abasto, donde los precios cambian cada día. Reconstruimos su sitio, el catálogo donde sus clientes arman el pedido y el portal donde lo siguen y lo repiten, y construimos el panel desde donde se opera, con cotizaciones de Cord.
- **shwcs** — una plataforma de descubrimiento B2B donde una empresa busca con sus palabras y llega al software, la agencia o el servicio que resuelve su problema. Diseñamos y construimos la búsqueda, las fichas con revisión editorial, la biblioteca del comprador y el contacto con consentimiento.

## 2. Flouvia OS: el portal de clientes

Cada cliente recibe `os.flouvia.com`, un portal privado para seguir su proyecto sin tener que pedir actualizaciones:

- **Inicio:** el estado del proyecto y lo que está pendiente de su lado.
- **Sitio en vivo:** Core Web Vitals de campo y el estado de cada deploy, leídos de Vercel.
- **Pagos:** plan, importe, método de pago e historial de facturas con Stripe.
- **Bóveda:** almacenamiento privado de archivos del proyecto.
- **Conversaciones:** un solo canal con el equipo, bajo los términos de soporte acordados con cada cliente.

El acceso es por invitación, con passkeys. El portal nunca muestra datos de ejemplo: lo que nadie ha cargado aparece vacío, no inventado.

## 3. Flouvia Ops: la consola interna

`ops.flouvia.com` es desde donde se opera el estudio: resumen, bandeja, clientes con vista 360°, leads y accesos.

## 4. Marca y oficio, hechos en casa

- **Gota** — la librería de íconos de Flouvia, con explorador, guía, licencia y su propio servidor MCP, en `gota.flouvia.com`.
- **Flouvia Sans** — la tipografía propia del estudio, dibujada y generada en casa para el logo y los títulos.
- **3D por script** — escenas modeladas y renderizadas en Blender (Cycles) desde código, que luego se editan en los films que abren cada caso.

## 5. Cómo está construido

Astro 6 (SSR) en Vercel, islas de React donde hay estado real, Tailwind v4 y GSAP. Datos en Neon PostgreSQL, archivos en Vercel Blob privado, correo con Resend y analítica de producto en PostHog. El sitio y el portal funcionan en español e inglés.
