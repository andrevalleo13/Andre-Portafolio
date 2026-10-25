/**
 * ── Splatter: pintura salpicada con el cursor ─────────
 *
 * Como los GATs pintados de Margiela, o un Pollock en pequeño:
 * al mover el cursor sobre [data-splatter-host] cae pintura en su
 * <canvas data-splatter>.
 *
 *   · Cada gota es una mancha orgánica (borde irregular) con un
 *     brillo de pintura húmeda.
 *   · Moverse rápido avienta latigazos: chorros alargados y gotitas
 *     en la dirección del movimiento.
 *   · Algunas gotas escurren hacia abajo y terminan en una gotita.
 *   · Un color por gesto: al detenerse, cambia de bote.
 *   · Al entrar el footer en pantalla ya caen unas manchas solas.
 *   · [data-splatter-clear] limpia el lienzo.
 *
 * Canvas 2D, sin dependencias.
 */

const COLORS = ['#E2533F', '#3E63B0', '#E2682B', '#F4F2ED', '#6F8B5E'];
const STEP = 46; // px recorridos entre una salpicadura y la siguiente
const PAUSE = 650; // ms quieto para cambiar de color

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T>(list: T[]) => list[Math.floor(Math.random() * list.length)];

interface Drip {
  x: number;
  y: number;
  len: number;
  drawn: number;
  width: number;
  speed: number;
  color: string;
}

/** Mancha de borde irregular: polígono suavizado con radios que varían. */
function blob(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, stretch = 1, angle = 0) {
  const n = 16;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * rand(0.72, 1.22);
    const px = Math.cos(a) * rr * stretch;
    const py = Math.sin(a) * rr;
    pts.push([
      x + px * Math.cos(angle) - py * Math.sin(angle),
      y + px * Math.sin(angle) + py * Math.cos(angle),
    ]);
  }
  ctx.beginPath();
  const mid = (i: number) => {
    const [x1, y1] = pts[i % n];
    const [x2, y2] = pts[(i + 1) % n];
    return [(x1 + x2) / 2, (y1 + y2) / 2];
  };
  const [sx, sy] = mid(n - 1);
  ctx.moveTo(sx, sy);
  for (let i = 0; i < n; i++) {
    const [cx, cy] = pts[i];
    const [mx, my] = mid(i);
    ctx.quadraticCurveTo(cx, cy, mx, my);
  }
  ctx.closePath();
  ctx.fill();
}

/** Brillo de pintura húmeda arriba a la izquierda de la mancha. */
function gloss(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(x - r * 0.3, y - r * 0.35, r * 0.32, r * 0.16, -0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function initSplatter() {
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-splatter]').forEach((canvas) => {
    if (canvas.dataset.splatterBound) return;
    canvas.dataset.splatterBound = 'true';

    const host = canvas.closest<HTMLElement>('[data-splatter-host]') ?? canvas.parentElement ?? canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Tamaño: conservar la pintura al redimensionar ── */
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      const keep = document.createElement('canvas');
      keep.width = canvas.width;
      keep.height = canvas.height;
      if (canvas.width && canvas.height) keep.getContext('2d')?.drawImage(canvas, 0, 0);
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (keep.width && keep.height) ctx.drawImage(keep, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    new ResizeObserver(resize).observe(canvas);

    /* ── Escurrimientos animados ── */
    const drips: Drip[] = [];
    let raf = 0;

    const stepDrips = () => {
      for (let i = drips.length - 1; i >= 0; i--) {
        const d = drips[i];
        const next = Math.min(d.len, d.drawn + d.speed);
        const w = d.width * (1 - (next / d.len) * 0.45);
        ctx.strokeStyle = d.color;
        ctx.lineCap = 'round';
        ctx.lineWidth = w;
        ctx.globalAlpha = 0.92;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y + d.drawn);
        ctx.lineTo(d.x + Math.sin((d.y + next) * 0.05) * 0.6, d.y + next);
        ctx.stroke();
        d.drawn = next;
        d.speed *= 0.985;
        if (d.drawn >= d.len || d.speed < 0.25) {
          ctx.fillStyle = d.color;
          ctx.beginPath();
          ctx.arc(d.x, d.y + d.drawn + w * 0.4, w * 0.9, 0, Math.PI * 2);
          ctx.fill();
          drips.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
      raf = drips.length ? requestAnimationFrame(stepDrips) : 0;
    };

    const addDrip = (x: number, y: number, r: number, color: string) => {
      const drip: Drip = { x: x + rand(-r * 0.4, r * 0.4), y, len: rand(24, 120), drawn: 0, width: Math.max(1.6, r * rand(0.3, 0.5)), speed: rand(1.4, 2.6), color };
      if (reduce) {
        drip.drawn = 0;
        drip.speed = drip.len;
      }
      drips.push(drip);
      if (!raf) raf = requestAnimationFrame(stepDrips);
    };

    /* ── Una salpicadura ── */
    const splat = (x: number, y: number, color: string, power: number, vx = 0, vy = 0) => {
      const speed = Math.hypot(vx, vy);
      const dir = speed > 0.01 ? Math.atan2(vy, vx) : rand(0, Math.PI * 2);
      const r = rand(4, 10) * power;

      ctx.fillStyle = color;
      ctx.globalAlpha = 0.94;

      // Mancha principal, estirada si hay velocidad
      const stretch = 1 + Math.min(speed / 30, 1.4);
      blob(ctx, x, y, r, stretch, dir);
      gloss(ctx, x, y, r);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.94;

      // Latigazo: chorro alargado en la dirección del movimiento
      if (speed > 12) {
        const len = Math.min(speed * 2.2, 140);
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(dir) * len * 0.55, y + Math.sin(dir) * len * 0.55, len * 0.5, Math.max(1.2, r * 0.22), dir, 0, Math.PI * 2);
        ctx.fill();
      }

      // Gotitas: más y más lejos cuanto más rápido
      const drops = Math.floor(rand(8, 16) * power + speed * 0.4);
      for (let i = 0; i < drops; i++) {
        const spread = speed > 4 ? 0.9 : Math.PI;
        const a = dir + rand(-spread, spread);
        const d = rand(r * 1.3, r * 3 + speed * 2.4);
        const size = Math.max(0.5, rand(0.6, 2.8) * (1 - d / (r * 4 + speed * 3)) * Math.min(power, 1.8));
        const px = x + Math.cos(a) * d;
        const py = y + Math.sin(a) * d;
        ctx.beginPath();
        if (Math.random() < 0.3) ctx.ellipse(px, py, size * rand(1.8, 3.6), size * 0.7, a, 0, Math.PI * 2);
        else ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // A veces escurre
      if (r > 6 && Math.random() < 0.4) addDrip(x, y + r * 0.5, r, color);
    };

    /* ── Cursor ── */
    let color = pick(COLORS);
    let last: { x: number; y: number; t: number } | null = null;
    let travelled = 0;
    let lastMove = 0;

    const point = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    host.addEventListener('pointermove', (e) => {
      const now = performance.now();
      if (now - lastMove > PAUSE) color = pick(COLORS.filter((c) => c !== color));
      lastMove = now;

      const p = point(e);
      if (!last) {
        last = { ...p, t: now };
        return;
      }
      const dx = p.x - last.x;
      const dy = p.y - last.y;
      travelled += Math.hypot(dx, dy);
      if (travelled > STEP) {
        travelled = 0;
        const dt = Math.max(16, now - last.t);
        splat(p.x, p.y, color, rand(0.7, 1.2), (dx / dt) * 16, (dy / dt) * 16);
      }
      last = { ...p, t: now };
    });

    host.addEventListener('pointerleave', () => (last = null));

    host.addEventListener('pointerdown', (e) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      const p = point(e);
      color = pick(COLORS.filter((c) => c !== color));
      splat(p.x, p.y, color, 2.6);
      for (let i = 0; i < 3; i++) addDrip(p.x + rand(-14, 14), p.y + rand(4, 12), rand(8, 14), color);
    });

    /* ── Al llegar: unas manchas caen solas ── */
    const seed = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const palette = [...COLORS].sort(() => Math.random() - 0.5);
      for (let i = 0; i < 7; i++) {
        const go = () => {
          const x = rand(w * 0.05, w * 0.95);
          const y = rand(h * 0.08, h * 0.7);
          const a = rand(0, Math.PI * 2);
          const v = rand(8, 26);
          splat(x, y, palette[i % palette.length], rand(1.1, 2), Math.cos(a) * v, Math.sin(a) * v);
        };
        if (reduce) go();
        else setTimeout(go, 260 + i * 170);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      seed();
    }, { threshold: 0.25 });
    io.observe(canvas);

    /* ── Limpiar ── */
    host.querySelectorAll<HTMLButtonElement>('[data-splatter-clear]').forEach((btn) => {
      btn.addEventListener('click', () => {
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          drips.length = 0;
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
          canvas.style.opacity = '1';
        }, 500);
      });
    });
  });
}
