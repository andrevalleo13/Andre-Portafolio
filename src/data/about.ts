/**
 * ── About: contenido ──────────────────────────────────
 *
 * Experiencia, formación, competencias y certificaciones (EN/ES).
 * Va aparte de ui.ts porque es contenido estructurado, no strings
 * sueltos de interfaz. Lo consume src/components/About.astro.
 */
import type { Lang } from '../i18n/ui';

interface Venture {
  name: string;
  slug: string;
  role: string;
  years: string;
  desc: string;
}

interface Credential {
  name: string;
  detail: string;
}

interface Certificate {
  name: string;
  href: string;
}

interface AboutContent {
  experience: Venture[];
  education: Credential[];
  expertise: string[];
  certificates: Certificate[];
  labels: {
    title: string;
    experience: string;
    education: string;
    expertise: string;
    certificates: string;
    note: string;
  };
  soft: { title: string };
}

const certificates = (negotiation: string): Certificate[] => [
  { name: 'Bloomberg Spreadsheet Analysis', href: 'https://portal.bloombergforeducation.com/certificates/tgRZzdz3X6Aeo5gvBdLT8tNB' },
  { name: 'Bloomberg Environmental Social Governance', href: 'https://portal.bloombergforeducation.com/certificates/B2XtqMFCbFDV4Tb9HaBXNze9' },
  { name: 'Bloomberg Market Concepts', href: 'https://portal.bloombergforeducation.com/certificates/hm27SBZtruTZ5na6UHsGrDZs' },
  { name: 'Bloomberg Finance Fundamentals', href: 'https://portal.bloombergforeducation.com/certificates/DnvidwmcJQSpEmuevbw8HDag' },
  { name: 'Google Data Analytics', href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/M78Q3GWTX9ZJ' },
  { name: 'Google AI Essentials', href: 'https://www.coursera.org/account/accomplishments/verify/N8MSIAVXK4NH' },
  { name: 'Microsoft Office Specialist: Excel', href: 'https://www.credly.com/badges/6cd883f6-18ba-498e-a0d6-72f0d03ed20b/linked_in_profile' },
  { name: negotiation, href: 'https://www.coursera.org/account/accomplishments/verify/ZJS4A9GN29GH' },
];

/** Las reglas de la casa (cuadro pintado en About). En inglés en ambos idiomas. */
export const RULES = [
  'Work hard',
  'Buy it good, buy it once',
  'Ship it',
  'Let it compound',
  'Read the fine print',
  'Bet on yourself',
  'No templates',
  'Visca el Barça',
  'Tequila, neat',
];

export const about: Record<Lang, AboutContent> = {
  en: {
    experience: [
      {
        name: 'Cord',
        slug: 'cord',
        role: 'Founder & Lead Architect',
        years: '2026 — Present',
        desc: 'Founded and built Cord, a closing platform from proposal to payment in a single link: interactive quotes, signature, payments on white-label Stripe Connect, CFDI 4.0 and Verifactu invoicing and AI collections, live in 12 countries. Freemium SaaS plus a share of payment volume, at $5k MRR.',
      },
      {
        name: 'Flouvia',
        slug: 'flouvia',
        role: 'Founder & Engineering Lead',
        years: '2024 — Present',
        desc: 'Design and engineering studio based in Mexico City. Builds sites, online stores, private B2B portals, Shopify apps and platforms for established businesses, plus the studio’s own client portal (Flouvia OS), internal console (Flouvia Ops), icon library (Gota) and typeface (Flouvia Sans).',
      },
    ],
    education: [
      { name: 'Universidad Panamericana', detail: 'Finance (2024 — 2028)' },
      { name: 'Bolsa Mexicana de Valores', detail: 'Financial Markets Seminar (Jan — Jun 2026)' },
      { name: 'BBVA Mexico', detail: 'Investment Seminar (Aug — Dec 2026)' },
    ],
    expertise: ['Unit Economics', 'Corporate Finance', 'Capital Allocation', 'System Architecture'],
    certificates: certificates('The Art of Negotiation'),
    labels: {
      title: 'About',
      experience: 'Experience & Ventures',
      education: 'Education',
      expertise: 'Core Expertise',
      certificates: 'Certifications',
      note: 'sewn-in labels: drag them',
    },
    soft: { title: 'House rules' },
  },
  es: {
    experience: [
      {
        name: 'Cord',
        slug: 'cord',
        role: 'Fundador & Arquitecto Principal',
        years: '2026 — Presente',
        desc: 'Fundé y construí Cord, una plataforma de cierre comercial de la propuesta al pago en un solo link: cotizaciones interactivas, firma, cobros con Stripe Connect de marca blanca, facturación CFDI 4.0 y Verifactu y cobranza con IA, en 12 países. SaaS freemium más un porcentaje del volumen procesado, con $5k de MRR.',
      },
      {
        name: 'Flouvia',
        slug: 'flouvia',
        role: 'Fundador & Líder de Ingeniería',
        years: '2024 — Presente',
        desc: 'Estudio de diseño e ingeniería con sede en la Ciudad de México. Construye sitios, tiendas en línea, portales B2B privados, apps de Shopify y plataformas para negocios establecidos, además de su propio portal de clientes (Flouvia OS), consola interna (Flouvia Ops), librería de íconos (Gota) y tipografía (Flouvia Sans).',
      },
    ],
    education: [
      { name: 'Universidad Panamericana', detail: 'Finanzas (2024 — 2028)' },
      { name: 'Bolsa Mexicana de Valores', detail: 'Cátedra Bursátil (Ene — Jun 2026)' },
      { name: 'BBVA México', detail: 'Cátedra de Inversiones (Ago — Dic 2026)' },
    ],
    expertise: ['Unit Economics', 'Finanzas Corporativas', 'Asignación de Capital', 'Arquitectura de Sistemas'],
    certificates: certificates('El arte de negociar'),
    labels: {
      title: 'Acerca',
      experience: 'Experiencia & Ventures',
      education: 'Educación',
      expertise: 'Competencias Clave',
      certificates: 'Certificaciones',
      note: 'etiquetas cosidas: muévelas',
    },
    soft: { title: 'Reglas de la casa' },
  },
};
