/**
 * Correo que le llega a André cuando alguien completa el formulario.
 * Devuelve { subject, html, text } — el endpoint solo lo envía.
 */
import { EMAIL, emailShell, escapeHtml, field } from './layout.ts';

export interface ContactPayload {
  name: string;
  email: string;
  intent: string;
  subIntent?: string;
  details?: string;
}

export function contactNotificationEmail(p: ContactPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Nuevo contacto — ${p.name} · ${p.intent}`;
  const message = (p.details || '').trim();

  const contentRows = `
    <tr>
      <td style="padding:0 0 30px;">
        <div style="font:300 10px/1 ${EMAIL.font};letter-spacing:3px;text-transform:uppercase;color:${EMAIL.taupe};padding-bottom:12px;">Nuevo mensaje</div>
        <div style="font:200 26px/1.25 ${EMAIL.font};letter-spacing:-0.01em;color:${EMAIL.bone};">${escapeHtml(p.name)}</div>
      </td>
    </tr>
    ${field('Email', `<a href="mailto:${escapeHtml(p.email)}" style="color:${EMAIL.bone};text-decoration:none;border-bottom:1px solid ${EMAIL.taupe};">${escapeHtml(p.email)}</a>`)}
    ${field('Intención', escapeHtml(p.intent))}
    ${p.subIntent ? field('Contexto', escapeHtml(p.subIntent)) : ''}
    <tr>
      <td style="padding:8px 0 0;">
        <div style="font:300 10px/1 ${EMAIL.font};letter-spacing:3px;text-transform:uppercase;color:${EMAIL.taupe};padding-bottom:10px;">Mensaje</div>
        <div style="font:300 15px/1.7 ${EMAIL.font};color:${EMAIL.ecru};">${
          message ? escapeHtml(message).replace(/\n/g, '<br>') : '<span style="color:' + EMAIL.taupe + ';">(sin mensaje)</span>'
        }</div>
      </td>
    </tr>`;

  const html = emailShell({
    preview: `${p.name} — ${p.intent}`,
    contentRows,
    footerNote: `Enviado desde andrevalle.xyz/contact · Responde a este correo para contestarle a ${p.name.split(' ')[0]}`,
  });

  const text = [
    `NUEVO CONTACTO`,
    ``,
    `Nombre:    ${p.name}`,
    `Email:     ${p.email}`,
    `Intención: ${p.intent}`,
    p.subIntent ? `Contexto:  ${p.subIntent}` : null,
    ``,
    message || '(sin mensaje)',
    ``,
    `— andrevalle.xyz/contact`,
  ]
    .filter((l): l is string => l !== null)
    .join('\n');

  return { subject, html, text };
}
