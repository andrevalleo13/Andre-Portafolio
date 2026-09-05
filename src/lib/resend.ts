/**
 * ── Resend client + config ────────────────────────────
 *
 * Server-only. Never import this from a client-side script.
 * All values come from environment variables (see .env.example).
 */
import { Resend } from 'resend';

const apiKey = import.meta.env.RESEND_API_KEY;

if (!apiKey && import.meta.env.PROD) {
  console.warn('[resend] RESEND_API_KEY no está definida — los formularios devolverán 500.');
}

export const resend = new Resend(apiKey ?? 'missing');

/** Remitente verificado. Debe usar un dominio validado en Resend. */
export const RESEND_FROM =
  import.meta.env.RESEND_FROM ?? 'André Valle <onboarding@resend.dev>';

/** Bandeja donde llegan los mensajes del formulario de contacto. */
export const CONTACT_TO = import.meta.env.RESEND_CONTACT_TO ?? 'andrevalleo13@gmail.com';

/** Audiencia de marketing (newsletter / broadcasts). */
export const NEWSLETTER_AUDIENCE_ID = import.meta.env.RESEND_AUDIENCE_ID;

/** Audiencia opcional de leads del formulario (solo registro, nunca marketing). */
export const LEADS_AUDIENCE_ID = import.meta.env.RESEND_LEADS_AUDIENCE_ID;

export const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
