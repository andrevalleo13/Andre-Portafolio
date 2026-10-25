/**
 * ── Caso Flouvia: contenido ───────────────────────────
 *
 * Texto de src/components/CaseFlouvia.astro (EN/ES). Los datos salen
 * del repo ~/Desktop/flouvia (CLAUDE.md, docs/products, src/data/casos.ts,
 * src/data/servicios/*, src/data/gota.ts) a octubre de 2026.
 */
import type { Lang } from '../../i18n/ui';

interface Item {
  title: string;
  text: string;
}

export interface FlouviaCase {
  lede: string;
  chapters: { menu: string; work: string; os: string; workshop: string; label: string };
  menu: { title: string; items: Array<{ name: string; desc: string }>; price: string; foot: string };
  work: { title: string; items: Array<{ slug: 'cord' | 'el-zarco' | 'shwcs'; name: string; tag: string; line: string; text: string; href: string; cta: string }> };
  os: { title: string; intro: string; panels: Item[]; note: string; ops: Item };
  workshop: { title: string; items: Item[] };
  label: { title: string; lines: string[]; made: string; care: string };
}

export const flouviaCase: Record<Lang, FlouviaCase> = {
  es: {
    lede: 'Un estudio de diseño e ingeniería en la Ciudad de México. Construimos la operación digital de negocios establecidos y le damos a cada cliente las herramientas para ver y operar lo que se construyó.',
    chapters: { menu: 'La carta', work: 'El trabajo', os: 'Flouvia OS', workshop: 'El taller', label: 'Composición' },
    menu: {
      title: 'La carta',
      items: [
        { name: 'Sitios web', desc: 'Diseño y desarrollo' },
        { name: 'Tiendas en línea', desc: 'Shopify y Shopify Plus' },
        { name: 'Portales B2B', desc: 'Para mayoristas' },
        { name: 'Apps de Shopify', desc: 'A la medida' },
        { name: 'Plataformas', desc: 'Software a la medida y SaaS' },
        { name: 'Apps móviles', desc: 'iOS y Android' },
        { name: 'Automatización', desc: 'Procesos e integración con ERP' },
      ],
      price: 'por aplicación',
      foot: 'Pocos clientes al año. Sin plantillas.',
    },
    work: {
      title: 'Trabajo seleccionado',
      items: [
        {
          slug: 'cord', name: 'Cord', tag: 'Producto propio', line: 'De la propuesta al pago en un solo link.',
          text: 'Nació como nuestra app de Shopify para cotizaciones B2B y se volvió una empresa.',
          href: '/work/cord', cta: 'Ver el caso',
        },
        {
          slug: 'el-zarco', name: 'El Zarco', tag: 'Cliente · Portal B2B', line: 'Mayoreo desde la Central de Abasto, donde el precio cambia cada día.',
          text: 'Desde 1992 surte a restaurantes, tiendas y cafeterías. Reconstruimos su sitio, el catálogo donde sus clientes arman el pedido y el portal donde lo siguen y lo repiten, y construimos el panel desde donde se opera, con cotizaciones de Cord.',
          href: 'https://elzarcodistribuidora.com.mx', cta: 'Ver el sitio',
        },
        {
          slug: 'shwcs', name: 'shwcs', tag: 'Plataforma de descubrimiento B2B', line: 'Encuentra soluciones. Conoce a sus creadores.',
          text: 'Una empresa busca con sus palabras y llega al software, la agencia o el servicio que resuelve su problema. Diseñamos y construimos la búsqueda, las fichas con revisión editorial, la biblioteca del comprador y el contacto con consentimiento.',
          href: 'https://shwcs.site', cta: 'Ver el sitio',
        },
      ],
    },
    os: {
      title: 'Cada cliente ve su proyecto, sin preguntar.',
      intro: 'os.flouvia.com es el portal privado que recibe cada cliente.',
      panels: [
        { title: 'Inicio', text: 'El estado del proyecto y lo que espera de su lado.' },
        { title: 'Sitio en vivo', text: 'Core Web Vitals de campo y cada deploy, leídos de Vercel.' },
        { title: 'Pagos', text: 'Plan, importe e historial con Stripe.' },
        { title: 'Bóveda', text: 'Los archivos privados del proyecto.' },
        { title: 'Conversaciones', text: 'Un solo canal con el equipo, con términos de soporte acordados.' },
      ],
      note: 'Acceso por invitación, con passkeys. Nunca muestra datos de ejemplo: lo que nadie cargó aparece vacío.',
      ops: { title: 'Flouvia Ops', text: 'Y del otro lado, ops.flouvia.com: desde donde operamos el estudio. Resumen, bandeja, clientes con vista 360°, leads y accesos.' },
    },
    workshop: {
      title: 'Lo que hacemos para nosotros',
      items: [
        { title: 'Gota', text: 'Nuestra librería de íconos: más de mil, dibujados a mano, con su propio servidor MCP, en gota.flouvia.com.' },
        { title: 'Flouvia Sans', text: 'Nuestra tipografía, dibujada y generada en casa para el logo y los títulos.' },
        { title: '3D por script', text: 'Escenas modeladas y renderizadas en Blender desde código, que se editan en los films que abren cada caso.' },
      ],
    },
    label: {
      title: 'Composición',
      lines: ['Astro 6 (SSR) · islas de React', 'Tailwind v4 · GSAP', 'Neon PostgreSQL · Vercel Blob', 'Resend · PostHog'],
      made: 'Hecho en CDMX · ES / EN',
      care: 'Lavar a mano. No usar plantillas.',
    },
  },
  en: {
    lede: 'A design and engineering studio in Mexico City. We build the digital operation of established businesses and give every client the tools to see and run what was built.',
    chapters: { menu: 'The menu', work: 'The work', os: 'Flouvia OS', workshop: 'The workshop', label: 'Composition' },
    menu: {
      title: 'The menu',
      items: [
        { name: 'Websites', desc: 'Design and development' },
        { name: 'Online stores', desc: 'Shopify and Shopify Plus' },
        { name: 'B2B portals', desc: 'For wholesalers' },
        { name: 'Shopify apps', desc: 'Custom-built' },
        { name: 'Platforms', desc: 'Custom software and SaaS' },
        { name: 'Mobile apps', desc: 'iOS and Android' },
        { name: 'Automation', desc: 'Processes and ERP integration' },
      ],
      price: 'by application',
      foot: 'A few clients a year. No templates.',
    },
    work: {
      title: 'Selected work',
      items: [
        {
          slug: 'cord', name: 'Cord', tag: 'Our own product', line: 'From proposal to payment in a single link.',
          text: 'It started as our Shopify app for B2B quotes and became a company.',
          href: '/work/cord', cta: 'Read the case',
        },
        {
          slug: 'el-zarco', name: 'El Zarco', tag: 'Client · B2B portal', line: 'Wholesale from the Central de Abasto, where prices change every day.',
          text: 'Since 1992 it has supplied restaurants, shops and cafés. We rebuilt its site, the catalog where clients put their orders together and the portal where they track and repeat them, and built the panel the business runs on, with quotes from Cord.',
          href: 'https://elzarcodistribuidora.com.mx', cta: 'Visit the site',
        },
        {
          slug: 'shwcs', name: 'shwcs', tag: 'B2B discovery platform', line: 'Find solutions. Meet their creators.',
          text: 'A company searches in its own words and lands on the software, agency or service that solves its problem. We designed and built the search, listings with editorial review, the buyer’s library and consent-based contact.',
          href: 'https://shwcs.site', cta: 'Visit the site',
        },
      ],
    },
    os: {
      title: 'Every client sees their project, without asking.',
      intro: 'os.flouvia.com is the private portal every client gets.',
      panels: [
        { title: 'Home', text: 'Project status and what’s waiting on them.' },
        { title: 'Live site', text: 'Field Core Web Vitals and every deploy, read from Vercel.' },
        { title: 'Payments', text: 'Plan, amount and history through Stripe.' },
        { title: 'Vault', text: 'The project’s private files.' },
        { title: 'Conversations', text: 'One channel with the team, under agreed support terms.' },
      ],
      note: 'Invitation-only, with passkeys. It never shows sample data: what nobody has loaded shows as empty.',
      ops: { title: 'Flouvia Ops', text: 'And on the other side, ops.flouvia.com: where we run the studio. Overview, inbox, clients with a 360° view, leads and access.' },
    },
    workshop: {
      title: 'What we make for ourselves',
      items: [
        { title: 'Gota', text: 'Our icon library: over a thousand, drawn by hand, with its own MCP server, at gota.flouvia.com.' },
        { title: 'Flouvia Sans', text: 'Our typeface, drawn and generated in-house for the logo and display titles.' },
        { title: '3D by script', text: 'Scenes modeled and rendered in Blender from code, cut into the films that open each case study.' },
      ],
    },
    label: {
      title: 'Composition',
      lines: ['Astro 6 (SSR) · React islands', 'Tailwind v4 · GSAP', 'Neon PostgreSQL · Vercel Blob', 'Resend · PostHog'],
      made: 'Made in Mexico City · ES / EN',
      care: 'Hand wash only. Do not use templates.',
    },
  },
};
