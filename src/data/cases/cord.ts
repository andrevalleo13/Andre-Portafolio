/**
 * ── Caso Cord: contenido ──────────────────────────────
 *
 * Texto de src/components/CaseCord.astro (EN/ES). Los datos salen
 * del repo ~/Desktop/flouvia-cord (docs/proyecto.md, docs/estado/*,
 * db/schema.sql) a octubre de 2026.
 */
import type { Lang } from '../../i18n/ui';

export type CountryCode = 'MX' | 'US' | 'CA' | 'BR' | 'ES' | 'GB' | 'DE' | 'FR' | 'CO' | 'AR' | 'CL' | 'PE';

interface Item {
  title: string;
  text: string;
}

export interface CordCase {
  lede: string;
  link: { title: string; intro: string; steps: Item[]; embed: string };
  countries: {
    word: string;
    intro: string;
    note: string;
    rails: { payments: string; mp: string };
    legend: { payments: string; mp: string };
    names: Record<CountryCode, string>;
  };
  payments: { title: string; text: string; bullets: string[]; note: string; flow: { client: string; cord: string; business: string } };
  fiscal: { title: string; intro: string; stamps: Array<{ top: string; center: string; text: string }>; chain: string; engine: string };
  collections: { title: string; text: string; stamp: string };
  devs: { title: string; text: string; items: string[] };
  security: { title: string; text: string };
  model: { title: string; engines: Item[] };
  numbers: { title: string; items: Array<{ value: string; label: string }>; stack: string };
  chapters: { link: string; countries: string; payments: string; fiscal: string; collections: string; build: string; model: string; numbers: string };
}

/* Los 12 países, en el orden del alta. Sin Cord Payments: cobran con Mercado Pago. */
export const CORD_COUNTRIES: Array<{ code: CountryCode; rail: 'payments' | 'mp' }> = [
  { code: 'MX', rail: 'payments' }, { code: 'US', rail: 'payments' }, { code: 'CA', rail: 'payments' },
  { code: 'BR', rail: 'mp' }, { code: 'ES', rail: 'payments' }, { code: 'GB', rail: 'payments' },
  { code: 'DE', rail: 'payments' }, { code: 'FR', rail: 'payments' }, { code: 'CO', rail: 'mp' },
  { code: 'AR', rail: 'mp' }, { code: 'CL', rail: 'mp' }, { code: 'PE', rail: 'mp' },
];

export const cordCase: Record<Lang, CordCase> = {
  es: {
    lede: 'Cord cubre el ciclo de ventas de la propuesta al pago —cotización, firma, cobro, factura y cobranza— en un solo link. Nació en junio de 2026 como la versión independiente de la app de Shopify de Flouvia para cotizaciones B2B. Hoy no depende de Shopify, ni del B2B, ni de un solo país.',
    chapters: {
      link: 'El link', countries: 'Países', payments: 'Cord Payments', fiscal: 'El fisco',
      collections: 'La cobranza', build: 'Cómo está hecho', model: 'El modelo', numbers: 'En números',
    },
    link: {
      title: 'Todo el cierre, amarrado en un link.',
      intro: 'Nada de PDFs, firmas por correo ni conciliaciones a mano. El cliente abre un link y ahí pasa todo.',
      steps: [
        { title: 'Cotización', text: 'Partidas, precios negociados e impuestos por línea, en una página que el cliente revisa.' },
        { title: 'Firma', text: 'Los términos se aceptan donde vive la cotización.' },
        { title: 'Cobro', text: 'El sí se convierte en checkout sin salir del link.' },
        { title: 'Factura', text: 'Se emite ligada al pago, con el formato fiscal de cada país.' },
      ],
      embed: 'y el cotizador se incrusta en cualquier sitio: <cord-cotizador>',
    },
    countries: {
      word: 'países',
      intro: 'El alta está abierta en los 12 países que Cord sostiene de punta a punta. Las cuentas de depósito usan el formato de cada uno: CLABE, IBAN, routing, sort code, transit, BSB.',
      note: 'impresas con las tintas de la casa: el amarillo sale naranja',
      rails: { payments: 'Cord Payments', mp: 'Mercado Pago' },
      legend: {
        payments: 'Cobro en línea con Cord Payments (Stripe Connect).',
        mp: 'Cobro en línea con la cuenta de Mercado Pago del negocio.',
      },
      names: {
        MX: 'México', US: 'Estados Unidos', CA: 'Canadá', BR: 'Brasil', ES: 'España', GB: 'Reino Unido',
        DE: 'Alemania', FR: 'Francia', CO: 'Colombia', AR: 'Argentina', CL: 'Chile', PE: 'Perú',
      },
    },
    payments: {
      title: 'El riel de pagos es de Cord.',
      text: 'Cord Payments corre sobre Stripe Connect de marca blanca. El alta y el KYC pasan dentro de Cord, con la interfaz de Cord.',
      bullets: [
        'Varios titulares por cuenta y requisitos que salen del proveedor, no de ramas por país.',
        'Captura de documentos con compuertas de calidad y guía documental por país.',
        'Depósitos con historial y frecuencia propia, y tarifas por divisa.',
      ],
      note: 'Cord procesa el cobro. Nunca toca el dinero.',
      flow: { client: 'Cliente', cord: 'Cord', business: 'Negocio' },
    },
    fiscal: {
      title: 'Facturas que aguantan al fisco.',
      intro: 'Un solo motor de totales para toda cotización y factura, con impuestos por línea sembrados por país. Y lo que cada fisco exige, de verdad:',
      stamps: [
        { top: 'SAT · México', center: 'CFDI 4.0', text: 'Timbrado con Facturapi.' },
        { top: 'AEAT · España', center: 'VERIFACTU', text: 'El sistema certificado que exige el RD 1007/2023. Encendido en producción el 14 de octubre de 2026.' },
        { top: 'Por estado · EE.UU.', center: 'SALES TAX', text: 'Sales tax por estado y alta de Connect con KYC estadounidense.' },
      ],
      chain: 'Verifactu encadena cada factura con la huella de la anterior (SHA-256), verificada contra los vectores oficiales de la AEAT y enviada por SOAP según el XSD oficial.',
      engine: 'Un solo motor de totales.',
    },
    collections: {
      title: 'Cobrar ya no es trabajo de nadie.',
      text: 'Un agente construido sobre la API de Anthropic persigue las facturas sin pagar: manda recordatorios, calcula vencimientos y concilia en segundo plano. El operador deja de pasarse la semana cobrando.',
      stamp: 'PAGADO',
    },
    devs: {
      title: 'Se opera desde código.',
      text: 'O desde un asistente de IA.',
      items: ['API REST pública', 'Servidor MCP', 'Cord Workflows', 'Docs, blog, status y comunidad en sus subdominios'],
    },
    security: {
      title: 'Y no se cae a pedazos.',
      text: 'Autenticación propia —Argon2id, Google, Apple, passkeys, TOTP y SSO SAML— que reemplazó a Clerk sin perder una identidad. Row-level security aplicada de verdad: la app entra con un rol que no puede saltarse el RLS, y las 69 rutas que tocan datos de una organización viajan por un carril declarado.',
    },
    model: {
      title: 'Dos motores.',
      engines: [
        { title: 'Suscripción', text: 'Freemium en Stripe Billing: cinco planes con cuotas mensuales y excedentes medidos de IA, facturas, API y usuarios.' },
        { title: 'Volumen', text: 'Un porcentaje de lo que se cobra por Cord Payments.' },
      ],
    },
    numbers: {
      title: 'En números',
      items: [
        { value: '$5k', label: 'MRR' },
        { value: '1,600+', label: 'commits desde junio de 2026' },
        { value: '187', label: 'tablas en la base' },
        { value: '350+', label: 'rutas de API' },
        { value: '470+', label: 'archivos de pruebas' },
        { value: '5', label: 'idiomas en el sitio' },
      ],
      stack: 'Astro 7 (SSR) · Vercel · Neon PostgreSQL · Stripe · Resend · Facturapi · Anthropic',
    },
  },
  en: {
    lede: 'Cord covers the sales cycle from proposal to payment —quote, signature, payment, invoice and collections— in a single link. It started in June 2026 as the standalone version of Flouvia’s Shopify app for B2B quotes. Today it doesn’t depend on Shopify, on B2B or on a single country.',
    chapters: {
      link: 'The link', countries: 'Countries', payments: 'Cord Payments', fiscal: 'The tax man',
      collections: 'Collections', build: 'How it’s built', model: 'The model', numbers: 'By the numbers',
    },
    link: {
      title: 'The whole close, tied into one link.',
      intro: 'No PDFs, no signatures over email, no reconciling by hand. The client opens a link and everything happens there.',
      steps: [
        { title: 'Quote', text: 'Line items, negotiated prices and per-line taxes, on a page the client reviews.' },
        { title: 'Signature', text: 'Terms are accepted where the quote lives.' },
        { title: 'Payment', text: 'The yes turns into checkout without leaving the link.' },
        { title: 'Invoice', text: 'Issued against the payment, in each country’s tax format.' },
      ],
      embed: 'and the quote builder embeds anywhere: <cord-cotizador>',
    },
    countries: {
      word: 'countries',
      intro: 'Signup is open in the 12 countries Cord supports end to end. Payout accounts use each country’s format: CLABE, IBAN, routing, sort code, transit, BSB.',
      note: 'printed in house inks: yellow comes out orange',
      rails: { payments: 'Cord Payments', mp: 'Mercado Pago' },
      legend: {
        payments: 'Online payments through Cord Payments (Stripe Connect).',
        mp: 'Online payments through the business’s own Mercado Pago account.',
      },
      names: {
        MX: 'Mexico', US: 'United States', CA: 'Canada', BR: 'Brazil', ES: 'Spain', GB: 'United Kingdom',
        DE: 'Germany', FR: 'France', CO: 'Colombia', AR: 'Argentina', CL: 'Chile', PE: 'Peru',
      },
    },
    payments: {
      title: 'The payment rail belongs to Cord.',
      text: 'Cord Payments runs on white-label Stripe Connect. Onboarding and KYC happen inside Cord, in Cord’s own interface.',
      bullets: [
        'Multiple owners per account, with requirements derived from the provider instead of country-by-country branches.',
        'Document capture with quality gates and country-specific guidance.',
        'Payouts with history and their own schedule, and fees per currency.',
      ],
      note: 'Cord processes the payment. It never touches the money.',
      flow: { client: 'Client', cord: 'Cord', business: 'Business' },
    },
    fiscal: {
      title: 'Invoices that hold up to the tax man.',
      intro: 'One totals engine for every quote and invoice, with per-line taxes seeded by country. And what each tax authority actually requires:',
      stamps: [
        { top: 'SAT · Mexico', center: 'CFDI 4.0', text: 'Stamped through Facturapi.' },
        { top: 'AEAT · Spain', center: 'VERIFACTU', text: 'The certified system required by RD 1007/2023. Switched on in production on October 14, 2026.' },
        { top: 'Per state · USA', center: 'SALES TAX', text: 'Sales tax per state, and Connect onboarding with US KYC.' },
      ],
      chain: 'Verifactu chains every invoice to the previous one’s fingerprint (SHA-256), checked against the AEAT’s official vectors and submitted over SOAP per the official XSD.',
      engine: 'One totals engine.',
    },
    collections: {
      title: 'Chasing money is nobody’s job anymore.',
      text: 'An agent built on the Anthropic API chases unpaid invoices: it sends reminders, tracks due dates and reconciles in the background. The operator stops spending the week collecting.',
      stamp: 'PAID',
    },
    devs: {
      title: 'Run it from code.',
      text: 'Or from an AI assistant.',
      items: ['Public REST API', 'MCP server', 'Cord Workflows', 'Docs, blog, status and community on their own subdomains'],
    },
    security: {
      title: 'And it holds together.',
      text: 'Its own authentication —Argon2id, Google, Apple, passkeys, TOTP and SAML SSO— that replaced Clerk without losing a single identity. Row-level security that’s actually enforced: the app connects with a role that can’t bypass RLS, and the 69 routes that touch an organization’s data travel on a declared lane.',
    },
    model: {
      title: 'Two engines.',
      engines: [
        { title: 'Subscription', text: 'Freemium on Stripe Billing: five plans with monthly quotas and metered overage for AI, invoices, API and seats.' },
        { title: 'Volume', text: 'A share of what’s processed through Cord Payments.' },
      ],
    },
    numbers: {
      title: 'By the numbers',
      items: [
        { value: '$5k', label: 'MRR' },
        { value: '1,600+', label: 'commits since June 2026' },
        { value: '187', label: 'database tables' },
        { value: '350+', label: 'API routes' },
        { value: '470+', label: 'test files' },
        { value: '5', label: 'languages on the site' },
      ],
      stack: 'Astro 7 (SSR) · Vercel · Neon PostgreSQL · Stripe · Resend · Facturapi · Anthropic',
    },
  },
};
