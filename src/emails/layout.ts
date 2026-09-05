/**
 * ── Email layout ──────────────────────────────────────
 *
 * Shell HTML compartido para todos los correos (contacto, bienvenida,
 * broadcasts). Table-based, estilos inline, sin web fonts — la estética
 * "Stealth Wealth" del sitio traducida a lo que los clientes de correo
 * saben renderizar.
 *
 * Funciones puras: NO tocan env ni red. Reciben datos, devuelven strings.
 */

export const EMAIL = {
  bg: '#1c1917',
  hairline: '#2e2a27',
  bone: '#ede9e4',
  ecru: '#a89e94',
  taupe: '#8c8078',
  font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  width: 600,
} as const;

export function escapeHtml(input: string): string {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Micro-label en versalitas con tracking, sobre un valor en tono hueso. */
export function field(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:0 0 22px;">
      <div style="font:300 10px/1 ${EMAIL.font};letter-spacing:3px;text-transform:uppercase;color:${EMAIL.taupe};padding-bottom:7px;">${escapeHtml(label)}</div>
      <div style="font:300 15px/1.6 ${EMAIL.font};color:${EMAIL.bone};">${value}</div>
    </td>
  </tr>`;
}

export function hairline(): string {
  return `<tr><td style="border-top:1px solid ${EMAIL.hairline};font-size:0;line-height:0;height:1px;">&nbsp;</td></tr>`;
}

interface ShellOptions {
  /** Título de la pestaña / lo que se lee en el listado antes de abrir. */
  preview: string;
  /** Filas <tr> ya renderizadas que van dentro de la tabla de contenido. */
  contentRows: string;
  /** Texto pequeño del pie (opcional). */
  footerNote?: string;
  /** Placeholder de Resend para broadcasts. */
  unsubscribeUrl?: string;
}

export function emailShell({ preview, contentRows, footerNote, unsubscribeUrl }: ShellOptions): string {
  const footerLinks = unsubscribeUrl
    ? `<a href="${unsubscribeUrl}" style="color:${EMAIL.taupe};text-decoration:underline;">Cancelar suscripción</a>`
    : '';

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${escapeHtml(preview)}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL.bg};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${EMAIL.bg};">
  <tr>
    <td align="center" style="padding:40px 20px;">
      <table role="presentation" width="${EMAIL.width}" cellpadding="0" cellspacing="0" style="width:100%;max-width:${EMAIL.width}px;background:${EMAIL.bg};">
        <tr>
          <td style="padding:8px 4px 28px;">
            <span style="font:300 11px/1 ${EMAIL.font};letter-spacing:4px;text-transform:uppercase;color:${EMAIL.taupe};">André Valle Ortega</span>
          </td>
        </tr>
        ${hairline()}
        <tr>
          <td style="padding:36px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${contentRows}
            </table>
          </td>
        </tr>
        ${hairline()}
        <tr>
          <td style="padding:24px 4px 4px;">
            <span style="font:300 11px/1.6 ${EMAIL.font};letter-spacing:0.5px;color:${EMAIL.taupe};">
              ${footerNote ? escapeHtml(footerNote) : 'andrevalle.xyz'}${footerLinks ? ' &nbsp;·&nbsp; ' + footerLinks : ''}
            </span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
