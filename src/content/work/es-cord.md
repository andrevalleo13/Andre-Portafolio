---
title: "Cord"
subtitle: "Propuesta a Pago en un Solo Link"
role: "Fundador & CEO"
timeline: "2026 — Presente"
impact: "$16k MRR"
url: "https://cordhq.app"
lang: "es"
draft: false
---

Cord es la plataforma operativa que transforma propuestas y acuerdos en transacciones pagadas al instante. Diseñada específicamente para agencias, elimina la fricción de enviar PDFs, esperar firmas y conciliar pagos manualmente. 

## 1. La Capa de Cierre (The Atomic Link)

Matamos el proceso manual. Todo el ciclo de cierre de clientes ocurre en un entorno web en vivo y unificado. 

- **Cotizaciones Interactivas:** El cliente revisa el alcance (*scope*) del proyecto de forma interactiva, no en un documento estático.
- **Acuerdo Legal Integrado:** Aprobación de términos y condiciones directamente en la plataforma.
- **Transición a Checkout:** Al instante de aprobar, el sistema detona un modal de pago (Stripe Routing). Todo ocurre en un solo link.

## 2. El Motor Financiero (Cord Payments)

No somos un simple *wrapper*; poseemos la pasarela de pagos operando bajo el capó mediante infraestructura de marca blanca (Stripe Connect Custom).

- **KYC Automatizado:** El *onboarding* y verificación de identidad para que una agencia pueda empezar a cobrar ocurre completamente dentro de nuestra interfaz, sin fricción.
- **Ruteo Directo (Zero-Touch):** Los fondos van directo a la cuenta conectada de la agencia. Cord procesa la transacción pero nunca retiene el dinero, clave para *compliance* y confianza.
- **Soporte Multi-Moneda:** Ruteo de pagos internacionales de forma automática.

## 3. Facturación Inteligente (Cord Invoicing)

- **Facturación Automatizada:** Generación y envío de facturas ligadas directamente al evento de pago.
- **Cálculo Dinámico:** Manejo automático de impuestos (taxes) y retenciones transfronterizas.
- **Suscripciones B2B:** Capacidad nativa para manejar cobros recurrentes y *retainers* (igualas) de agencias.

## 4. Cobranza Autónoma (La Capa de Inteligencia)

- **IA de Cobranza:** Un agente autónomo integrado nativamente que persigue facturas sin pagar.
- **Seguimiento en Segundo Plano:** El sistema manda recordatorios, calcula fechas de vencimiento y realiza la conciliación de forma invisible para que el operador no pierda tiempo.
- **Reducción de DSO:** Optimizado específicamente para bajar los Días Promedio de Cobro.

## 5. La Terminal Analítica (Dashboard Institucional)

Construida con React y Remotion para físicas de resorte (*spring physics*) nivel Apple, en un modo oscuro *pixel-perfect*.

- **Métrica de DSO:** Medición exacta de la velocidad del flujo de caja (Days Sales Outstanding).
- **Concentración de Riesgo:** Análisis de la diversificación en la cartera de clientes.
- **Salud del Pipeline:** Rastreo en tiempo real de qué dinero está cotizado, aprobado y cobrado.

## 6. El Modelo de Apalancamiento

Un modelo *dual-engine*: la plataforma monetiza cobrando una suscripción SaaS por el acceso al sistema operativo, y toma un porcentaje (*basis points*) del volumen transaccional procesado por el motor financiero.
