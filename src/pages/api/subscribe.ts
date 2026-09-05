/**
 * POST /api/subscribe  → alta en la audiencia de newsletter (Resend).
 * Body: { email: string }
 */
import type { APIRoute } from 'astro';
import { resend, NEWSLETTER_AUDIENCE_ID, isEmail, json } from '../../lib/resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let email: unknown;
  try {
    email = (await request.json())?.email;
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }

  if (!isEmail(email)) return json({ error: 'invalid_email' }, 422);
  if (!NEWSLETTER_AUDIENCE_ID) return json({ error: 'not_configured' }, 500);

  const { error } = await resend.contacts.create({
    audienceId: NEWSLETTER_AUDIENCE_ID,
    email: email.trim().toLowerCase(),
    unsubscribed: false,
  });

  // Un contacto duplicado no es un fallo para el usuario final.
  if (error && !/already|exists|duplicate/i.test(error.message ?? '')) {
    console.error('[subscribe]', error);
    return json({ error: 'provider_error' }, 502);
  }

  return json({ ok: true });
};
