/**
 * ── Mano ──────────────────────────────────────────────
 *
 * Letra de palo trazada a mano para los cuadros: mayúsculas de un solo
 * trazo en una rejilla de 14 de alto, cada letra un poco chueca y
 * movida, como escritas con barra de óleo. No es una fuente: devuelve
 * el `d` de un <path> (con trazo, sin relleno) que se dibuja con
 * `data-s` como cualquier otro trazo.
 */

/** [ancho, trazo] en la rejilla (alto 14) */
const GLYPHS: Record<string, [number, string]> = {
  A: [10, 'M0 14 L5 0 L10 14 M2 8.5 L8 8.5'],
  B: [10, 'M0 14 L0 0 L5.5 0 Q9 0 9 3.5 Q9 7 5.5 7 L0 7 M5.5 7 Q10 7 10 10.5 Q10 14 5.5 14 L0 14'],
  C: [10, 'M10 2 Q8 0 5 0 Q0 0 0 7 Q0 14 5 14 Q8 14 10 12'],
  D: [10, 'M0 0 L0 14 L4.5 14 Q10 14 10 7 Q10 0 4.5 0 L0 0'],
  E: [9, 'M9 0 L0 0 L0 14 L9 14 M0 7 L6.5 7'],
  F: [9, 'M9 0 L0 0 L0 14 M0 7 L6.5 7'],
  G: [10, 'M10 2 Q8 0 5 0 Q0 0 0 7 Q0 14 5 14 Q10 14 10 8.5 L5.5 8.5'],
  H: [10, 'M0 0 L0 14 M10 0 L10 14 M0 7 L10 7'],
  I: [6, 'M3 0 L3 14 M0 0 L6 0 M0 14 L6 14'],
  J: [8, 'M8 0 L8 10 Q8 14 4 14 Q0 14 0 10.5'],
  K: [10, 'M0 0 L0 14 M10 0 L0 8.5 M3.2 6 L10 14'],
  L: [9, 'M0 0 L0 14 L9 14'],
  M: [12, 'M0 14 L0 0 L6 9 L12 0 L12 14'],
  N: [10, 'M0 14 L0 0 L10 14 L10 0'],
  O: [10, 'M5 0 Q0 0 0 7 Q0 14 5 14 Q10 14 10 7 Q10 0 5 0'],
  P: [9, 'M0 14 L0 0 L5 0 Q9 0 9 3.6 Q9 7.2 5 7.2 L0 7.2'],
  Q: [10, 'M5 0 Q0 0 0 7 Q0 14 5 14 Q10 14 10 7 Q10 0 5 0 M6 10 L10.5 15'],
  R: [9, 'M0 14 L0 0 L5 0 Q9 0 9 3.6 Q9 7.2 5 7.2 L0 7.2 M4.5 7.2 L9.5 14'],
  S: [9, 'M9 2 Q7.5 0 4.5 0 Q0 0 0 3.5 Q0 6.6 4.5 7 Q9 7.4 9 10.5 Q9 14 4.5 14 Q1.5 14 0 12'],
  T: [10, 'M0 0 L10 0 M5 0 L5 14'],
  U: [10, 'M0 0 L0 10 Q0 14 5 14 Q10 14 10 10 L10 0'],
  V: [10, 'M0 0 L5 14 L10 0'],
  W: [13, 'M0 0 L3 14 L6.5 4 L10 14 L13 0'],
  X: [10, 'M0 0 L10 14 M10 0 L0 14'],
  Y: [10, 'M0 0 L5 7 L10 0 M5 7 L5 14'],
  Z: [9, 'M0 0 L9 0 L0 14 L9 14'],
  '0': [9, 'M4.5 0 Q0 0 0 7 Q0 14 4.5 14 Q9 14 9 7 Q9 0 4.5 0 M8 2 L1 12'],
  '1': [7, 'M1 3 L4 0 L4 14 M1 14 L7 14'],
  '2': [9, 'M0 3 Q1 0 4.5 0 Q9 0 9 4 Q9 7 0 14 L9 14'],
  '3': [9, 'M0 1.5 Q2 0 4.5 0 Q9 0 9 3.5 Q9 7 4.5 7 Q9 7 9 10.5 Q9 14 4.5 14 Q2 14 0 12.5'],
  '4': [9, 'M7 14 L7 0 L0 10 L9.5 10'],
  '5': [9, 'M9 0 L1 0 L0 6.2 Q2 5 4.5 5 Q9 5 9 9.5 Q9 14 4.5 14 Q2 14 0 12'],
  '6': [9, 'M8.5 1 Q7 0 5 0 Q0 0 0 8 Q0 14 4.5 14 Q9 14 9 10 Q9 6 4.5 6 Q1 6 0 9'],
  '7': [9, 'M0 0 L9 0 L3.5 14'],
  '8': [9, 'M4.5 7 Q0.5 7 0.5 3.5 Q0.5 0 4.5 0 Q8.5 0 8.5 3.5 Q8.5 7 4.5 7 Q0 7 0 10.5 Q0 14 4.5 14 Q9 14 9 10.5 Q9 7 4.5 7'],
  '9': [9, 'M9 5 Q9 8.5 4.5 8.5 Q0 8.5 0 4.2 Q0 0 4.5 0 Q9 0 9 5 L9 14'],
  '$': [9, 'M9 2.5 Q7.5 1 4.5 1 Q0 1 0 4 Q0 6.6 4.5 7 Q9 7.4 9 10 Q9 13 4.5 13 Q1.5 13 0 11.5 M4.5 -1.5 L4.5 15.5'],
  '%': [10, 'M10 0 L0 14 M2 0.5 Q0 0.5 0 2.5 Q0 4.5 2 4.5 Q4 4.5 4 2.5 Q4 0.5 2 0.5 M8 9.5 Q6 9.5 6 11.5 Q6 13.5 8 13.5 Q10 13.5 10 11.5 Q10 9.5 8 9.5'],
  '©': [12, 'M6 1 Q12 1 12 7 Q12 13 6 13 Q0 13 0 7 Q0 1 6 1 M8.2 5 Q7.4 4 6.2 4 Q3.4 4 3.4 7 Q3.4 10 6.2 10 Q7.4 10 8.2 9'],
  '>': [8, 'M0 1 L8 7 L0 13'],
  '<': [8, 'M8 1 L0 7 L8 13'],
  '→': [12, 'M0 7 L12 7 M7.5 2.5 L12 7 L7.5 11.5'],
  '-': [7, 'M0 7 L7 7'],
  '+': [10, 'M5 2 L5 12 M0 7 L10 7'],
  '=': [9, 'M0 5 L9 5 M0 9.5 L9 9.5'],
  '×': [9, 'M0 3 L9 12 M9 3 L0 12'],
  '.': [2, 'M1 13 L1 14'],
  ',': [3, 'M2 12.5 L0.8 15.5'],
  '!': [2, 'M1 0 L1 9.5 M1 13 L1 14'],
  '?': [9, 'M0 3 Q0 0 4.5 0 Q9 0 9 3.8 Q9 6.8 4.5 8 L4.5 10 M4.5 13 L4.5 14'],
  '/': [8, 'M8 0 L0 14'],
  "'": [2, 'M1.2 0 L0.8 4.5'],
  '·': [3, 'M1.5 6.5 L1.5 7.5'],
  '#': [10, 'M3 1 L2 13 M8 1 L7 13 M0 5 L10 5 M0 9.5 L10 9.5'],
};

const SPACE = 6;

export interface ManoOpts {
  /** alto de la letra en px del viewBox */
  size?: number;
  /** inclinación del renglón, en grados */
  tilt?: number;
  /** semilla: misma palabra con otra semilla = otra mano */
  seed?: number;
  /** espacio entre letras, en unidades de rejilla */
  gap?: number;
  /** cuánto se mueve la mano (0 = rígida) */
  wobble?: number;
}

const fmt = (n: number) => (Math.round(n * 10) / 10).toString();

/** Ancho del texto, en px del viewBox */
export function ancho(text: string, { size = 20, gap = 3.2 }: ManoOpts = {}): number {
  const s = size / 14;
  let w = 0;
  for (const ch of text.toUpperCase()) w += (ch === ' ' ? SPACE : (GLYPHS[ch]?.[0] ?? 8)) + gap;
  return (w - gap) * s;
}

/** `d` del texto escrito a mano; (x, y) es la esquina superior izquierda */
export function escribir(text: string, x: number, y: number, opts: ManoOpts = {}): string {
  const { size = 20, tilt = 0, seed = 1, gap = 3.2, wobble = 1 } = opts;
  const s = size / 14;
  const rnd = (n: number) => {
    const v = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  const ct = Math.cos((tilt * Math.PI) / 180);
  const st = Math.sin((tilt * Math.PI) / 180);

  let cursor = 0;
  let out = '';
  [...text.toUpperCase()].forEach((ch, k) => {
    if (ch === ' ') { cursor += SPACE + gap; return; }
    const glyph = GLYPHS[ch];
    if (!glyph) { cursor += 8 + gap; return; }
    const [w, d] = glyph;
    const rot = ((rnd(k * 7 + 1) - 0.5) * 10 * wobble * Math.PI) / 180;
    const cr = Math.cos(rot), sr = Math.sin(rot);
    const dy = (rnd(k * 7 + 2) - 0.5) * 2 * wobble;
    const sc = 1 + (rnd(k * 7 + 3) - 0.5) * 0.14 * wobble;
    let j = 0;

    out += d.replace(/-?\d*\.?\d+\s+-?\d*\.?\d+/g, (pair) => {
      const [px, py] = pair.trim().split(/\s+/).map(Number);
      j += 1;
      const jx = px + (rnd(k * 97 + j) - 0.5) * 0.8 * wobble;
      const jy = py + (rnd(k * 89 + j * 3) - 0.5) * 0.8 * wobble;
      /* letra: gira sobre su centro y se mueve un poco */
      const lx = (jx - w / 2) * sc, ly = (jy - 7) * sc;
      const rx = lx * cr - ly * sr + w / 2 + cursor;
      const ry = lx * sr + ly * cr + 7 + dy;
      /* renglón: escala y gira sobre (x, y) */
      const gx = rx * s, gy = ry * s;
      return `${fmt(x + gx * ct - gy * st)} ${fmt(y + gx * st + gy * ct)}`;
    }) + ' ';
    cursor += w + gap;
  });
  return out.trim();
}
