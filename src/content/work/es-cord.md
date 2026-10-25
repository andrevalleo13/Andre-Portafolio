---
title: "Cord"
subtitle: "De la Propuesta al Pago, en un Solo Link"
role: "Fundador & CEO"
timeline: "2026 — Presente"
impact: "$5k MRR"
url: "https://cordhq.app"
lang: "es"
draft: false
---

Cord es una plataforma de cierre comercial: cubre el ciclo de ventas de la propuesta al pago —cotización con precios negociados, link público para el cliente, firma, cobro en línea, facturación y cobranza— para cualquier negocio, en cualquiera de los países que soporta. Nació en junio de 2026 como la versión independiente de la app de Shopify de Flouvia para cotizaciones B2B, y hoy no depende de Shopify, ni del B2B, ni de un solo país.

## 1. El link de cierre

Todo el cierre pasa en un solo link web en vivo, no en PDFs y cadenas de correos.

- **Cotizaciones interactivas:** partidas, precios negociados e impuestos por línea que el cliente revisa en la página.
- **Firma en el mismo link:** los términos se aceptan donde vive la cotización.
- **Cobro en el momento del sí:** la aprobación se convierte en checkout sin salir del link.
- **Incrustable:** el cotizador se distribuye como Web Component (`<cord-cotizador>`) que cualquier sitio puede poner.

## 2. Cord Payments

Cord es dueño del riel de pagos por debajo, con Stripe Connect de marca blanca.

- **Alta y KYC dentro de Cord:** varios titulares por cuenta, requisitos derivados del proveedor en vez de ramas por país, y captura de documentos con compuertas de calidad y guía por país.
- **El dinero va directo al negocio:** Cord procesa el cobro pero nunca retiene los fondos.
- **Depósitos con historial y frecuencia propia**, y tarifas por divisa.
- **Mercado Pago en Latinoamérica:** en Brasil, Colombia, Argentina, Chile y Perú, el cobro en línea va con la cuenta de Mercado Pago del negocio.

## 3. Facturación que aguanta al fisco

- **México:** CFDI 4.0 timbrado con Facturapi.
- **España:** Verifactu, el sistema de facturación certificado que exige el RD 1007/2023 — huella SHA-256 encadenada verificada contra los vectores oficiales de la AEAT y envío real por SOAP validado contra el XSD oficial. En producción desde el 14 de octubre de 2026.
- **Estados Unidos:** sales tax por estado y alta de Connect que acepta KYC estadounidense.
- **Un solo motor de totales** para toda cotización y factura, con impuestos por línea sembrados por país.

## 4. Cobranza con IA

Un agente construido sobre la API de Anthropic persigue facturas sin pagar, manda recordatorios, calcula vencimientos y concilia pagos en segundo plano, para que el operador no se pase la semana cobrando.

## 5. Hecho para cualquier país

El alta está abierta en los 12 países que Cord sostiene de punta a punta: México, EE.UU., Canadá, Brasil, España, Reino Unido, Alemania, Francia, Colombia, Argentina, Chile y Perú. Las cuentas de depósito usan el formato de cada país (CLABE, IBAN, routing, sort code, BSB…). La app y sus correos funcionan en español e inglés, y el sitio público en cinco idiomas.

## 6. Una plataforma para desarrolladores

- **API REST pública** (`/api/v1`) y **servidor MCP**, para operar Cord desde código o desde un asistente de IA.
- **Cord Workflows** para automatizar pasos del ciclo.
- Documentación, blog de desarrolladores, página de estado y comunidad propias, cada una en su subdominio.

## 7. Seguridad y multi-tenant

- **Autenticación propia:** Argon2id, acceso con Google y Apple, passkeys, TOTP y SSO SAML. Reemplazó a Clerk conservando todas las identidades existentes.
- **Aislamiento real entre organizaciones:** Neon PostgreSQL con row-level security aplicada. La app se conecta con un rol que no puede saltarse el RLS, toda consulta a datos de una organización viaja por un carril declarado y las verificaciones del CI impiden que esa deuda vuelva.
- **Candados en cada despliegue:** un push a `main` llega a producción solo si pasan los chequeos de seguridad.

## 8. El modelo de negocio

Dos motores: una suscripción freemium en Stripe Billing —cinco planes con cuotas mensuales y excedentes medidos de IA, facturas, llamadas a la API y usuarios— y un porcentaje del volumen procesado por Cord Payments.

## En números

- **$5k MRR.**
- **+1,600 commits** desde junio de 2026.
- **187 tablas**, **+350 rutas de API** y **+470 archivos de pruebas**.
- **12 países** y **5 idiomas**.
- Construido con Astro 7 (SSR) en Vercel, Neon, Stripe, Resend, Facturapi y Anthropic.
