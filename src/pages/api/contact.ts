/**
 * POST /api/contact  → email transaccional a André con el mensaje del formulario.
 * Body: { name, email, details, intent, subIntent, subIntentLabel }
 *
 * El formulario de contacto NO alimenta la audiencia de marketing. Si
 * RESEND_LEADS_AUDIENCE_ID está definida, se guarda el contacto ahí como
 * registro con unsubscribed: true (nunca recibe broadcasts).
 */
import type { APIRoute } from 'astro';
import {
  resend,
  RESEND_FROM,
  CONTACT_TO,
  LEADS_AUDIENCE_ID,
  isEmail,
  json,
} from '../../lib/resend';
import { contactNotificationEmail } from '../../emails/contact-notification';

export const prerender = false;

const INTENT_LABELS: Record<string, string> = {
  a: 'Partnership / Inversión',
  b: 'Proyecto (Flouvia / Arquitecturas)',
  c: 'Networking',
};

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }

  const name = clean(data.name, 120);
  const email = clean(data.email, 160).toLowerCase();
  const details = clean(data.details, 5000);
  const intent = INTENT_LABELS[String(data.intent)] ?? 'Sin especificar';
  const subIntent = clean(data.subIntentLabel ?? data.subIntent, 160);

  if (!name || !isEmail(email)) return json({ error: 'invalid_input' }, 422);

  const { subject, html, text } = contactNotificationEmail({
    name,
    email,
    intent,
    subIntent,
    details,
  });

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: [CONTACT_TO],
    replyTo: email,
    subject,
    html,
    text,
  });

  if (error) {
    console.error('[contact]', error);
    return json({ error: 'provider_error' }, 502);
  }

  if (LEADS_AUDIENCE_ID) {
    void resend.contacts
      .create({
        audienceId: LEADS_AUDIENCE_ID,
        email,
        firstName: name.split(' ')[0],
        unsubscribed: true,
      })
      .catch((e) => console.error('[contact:lead]', e));
  }

  return json({ ok: true });
};
