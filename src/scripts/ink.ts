/**
 * ── Ink: animaciones "Lujo vivido" ─────────────────────
 *
 * Todo lo que se mueve imita un gesto físico sobre papel:
 *
 *   [data-pen]            Pluma roja: encierra el elemento al pasar el cursor.
 *                         `data-pen="under"` subraya en vez de encerrar.
 *                         `aria-current="page"` o `data-pen-on` lo deja trazado.
 *                         `data-pen-scroll` lo traza al entrar en pantalla.
 *   [data-pen-group]      El hover de este contenedor activa sus [data-pen].
 *   [data-draw]           SVG que se pinta trazo por trazo ([data-s]), luego
 *                         rellenos ([data-fill]) y detalles ([data-pop]).
 *                         load = al cargar · scroll = al entrar · scrub = avanza
 *                         con el scroll · manual = lo dispara otro script.
 *   [data-reveal]         lines · fade · rule · sheet · drop · type · write
 *   [data-count]          Número que cuenta desde cero al entrar.
 *   [data-drag]           Pieza de collage que se puede mover (con inercia).
 *   [data-depth]          Capa que flota con el mouse dentro de [data-collage].
 *   [data-parallax="n"]   Deriva vertical sutil con el scroll.
 *   [data-holdings]       Pista horizontal fijada (sección Holdings).
 *   [data-delay="s"]      Retraso en segundos (para secuencias).
 *
 * Los estados iniciales ocultos viven en CSS (@media (scripting: enabled))
 * hasta que el elemento recibe `.is-ready`, así no hay parpadeos.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, Draggable, InertiaPlugin);

const EASE = 'expo.out';
const SVG_NS = 'http://www.w3.org/2000/svg';
const START = 'top 86%';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const delayOf = (el: Element) => parseFloat((el as HTMLElement).dataset.delay || '0');
const pad = (n: number) => String(n).padStart(2, '0');

type Drawable = SVGSVGElement & { __draw?: gsap.core.Timeline };

/* Lo que hay que soltar cuando cambia la página (View Transitions). */
const cleanups: Array<() => void> = [];

/* Tres círculos y dos subrayados distintos: ninguna mano repite el trazo. */
const CIRCLES = [
  'M34 40 C18 24 62 7 116 8 C168 9 194 22 186 39 C178 54 122 58 74 54 C38 51 18 43 24 29 C28 20 46 14 66 11',
  'M168 14 C130 4 52 8 26 24 C6 38 40 54 100 54 C156 54 192 44 190 28 C188 14 150 8 112 9 C80 10 52 16 40 22',
  'M40 46 C14 36 30 12 92 9 C150 6 190 16 188 32 C186 50 130 56 82 53 C46 51 24 42 30 28 C34 20 52 14 74 12',
];
const UNDERLINES = [
  'M4 12 C40 8 90 14 130 10 C160 7 184 9 196 12',
  'M3 9 C50 13 100 7 150 11 C172 12 188 10 197 8',
];

const pick = <T>(list: T[]) => list[Math.floor(Math.random() * list.length)];

function onEnter(el: Element, fn: () => void, start = START) {
  ScrollTrigger.create({ trigger: el, start, once: true, onEnter: fn });
}

/* ── Pluma roja ─────────────────────────────────────── */
export function initPen() {
  document.querySelectorAll<HTMLElement>('[data-pen]').forEach((el) => {
    if (el.dataset.penBound) return;
    el.dataset.penBound = 'true';

    const kind = el.dataset.pen === 'under' ? 'under' : 'circle';
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', kind === 'circle' ? '0 0 200 60' : '0 0 200 20');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add(kind === 'circle' ? 'lv-pen-circle' : 'lv-pen-under');
    svg.style.rotate = `${(Math.random() * 4 - 2).toFixed(2)}deg`;
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', pick(kind === 'circle' ? CIRCLES : UNDERLINES));
    svg.appendChild(path);
    el.appendChild(svg);

    const isOn = el.getAttribute('aria-current') === 'page' || el.hasAttribute('data-pen-on');
    gsap.set(path, { drawSVG: isOn ? '0% 100%' : '0% 0%' });
    if (isOn) return;

    const draw = () =>
      gsap.fromTo(path, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: reduced() ? 0 : 0.8, ease: EASE, overwrite: true });

    if (el.hasAttribute('data-pen-scroll')) {
      onEnter(el, () => gsap.delayedCall(delayOf(el), draw));
      return;
    }

    const erase = () =>
      gsap.to(path, { drawSVG: '100% 100%', duration: reduced() ? 0 : 0.55, ease: 'power2.inOut', overwrite: true });

    const target = el.closest<HTMLElement>('[data-pen-group]') ?? el;
    target.addEventListener('pointerenter', draw);
    target.addEventListener('pointerleave', erase);
    target.addEventListener('focusin', draw);
    target.addEventListener('focusout', erase);
  });
}

/* ── Dibujos que se pintan solos ────────────────────── */
export function initDraw() {
  document.querySelectorAll<Drawable>('svg[data-draw]').forEach((svg) => {
    if (svg.dataset.drawBound) return;
    svg.dataset.drawBound = 'true';

    const strokes = Array.from(svg.querySelectorAll<SVGGeometryElement>('[data-s]'));
    const fills = svg.querySelectorAll('[data-fill]');
    const pops = svg.querySelectorAll('[data-pop]');

    if (reduced()) {
      svg.classList.add('is-ready');
      return;
    }

    gsap.set(strokes, { drawSVG: '0%' });
    gsap.set(fills, { opacity: 0 });
    gsap.set(pops, { scale: 0, transformOrigin: '50% 50%' });
    svg.classList.add('is-ready');

    // scrub: el trazo avanza con el scroll (p. ej. el cordón del caso Cord)
    if (svg.dataset.draw === 'scrub') {
      gsap.to(strokes, {
        drawSVG: '100%',
        ease: 'none',
        scrollTrigger: { trigger: svg, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
      });
      if (fills.length || pops.length) {
        onEnter(svg, () => {
          gsap.to(fills, { opacity: 1, duration: 0.8, ease: EASE });
          gsap.to(pops, { scale: 1, duration: 0.7, ease: EASE, stagger: 0.05 });
        }, 'top 40%');
      }
      return;
    }

    const speed = parseFloat(svg.dataset.speed || '1');
    const tl = gsap.timeline({ paused: true, delay: delayOf(svg) });

    if (fills.length) tl.to(fills, { opacity: 1, duration: 1.1, ease: EASE, stagger: 0.12 }, 0);
    strokes.forEach((s, i) => {
      const length = typeof s.getTotalLength === 'function' ? s.getTotalLength() : 120;
      const duration = gsap.utils.clamp(0.22, 1.1, length / 240) / speed;
      tl.to(s, { drawSVG: '100%', duration, ease: 'power2.inOut' }, i === 0 ? (fills.length ? 0.3 : 0) : `-=${duration * 0.45}`);
    });
    if (pops.length) tl.to(pops, { scale: 1, duration: 0.7, ease: EASE, stagger: 0.04 }, '-=0.45');

    svg.__draw = tl;
    if (svg.dataset.draw === 'load') tl.play();
    else if (svg.dataset.draw === 'scroll') onEnter(svg, () => tl.play(), 'top 82%');
  });
}

/* ── Revelados con scroll ───────────────────────────── */
function typewrite(el: HTMLElement) {
  const text = el.textContent ?? '';
  const sr = document.createElement('span');
  sr.className = 'lv-sr-only';
  sr.textContent = text;
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  for (const ch of text) {
    const span = document.createElement('span');
    span.textContent = ch;
    visual.appendChild(span);
  }
  el.replaceChildren(sr, visual);
  return Array.from(visual.children);
}

export function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.dataset.revealBound) return;
    el.dataset.revealBound = 'true';

    const kind = el.dataset.reveal;
    const delay = delayOf(el);

    if (reduced()) {
      el.classList.add('is-ready');
      return;
    }

    let play: () => void = () => {};

    switch (kind) {
      case 'lines': {
        const inner = el.querySelectorAll('.lv-line > span');
        gsap.set(inner, { yPercent: 115 });
        play = () => gsap.to(inner, { yPercent: 0, duration: 1.4, ease: EASE, stagger: 0.1, delay });
        break;
      }
      case 'rule': {
        gsap.set(el, { scaleX: 0, transformOrigin: '0% 50%' });
        play = () => gsap.to(el, { scaleX: 1, duration: 1.3, ease: 'power3.inOut', delay });
        break;
      }
      case 'sheet': {
        // La hoja cae y se asienta en su inclinación (definida en CSS con `rotate`);
        // luego se pega la cinta.
        const tape = el.querySelector('.lv-tape');
        gsap.set(el, { y: 70, rotation: 5, opacity: 0 });
        if (tape) gsap.set(tape, { scaleX: 0, transformOrigin: '0% 50%' });
        play = () => {
          const tl = gsap.timeline({ delay });
          tl.to(el, { y: 0, rotation: 0, opacity: 1, duration: 1.4, ease: EASE });
          if (tape) tl.to(tape, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.8');
        };
        break;
      }
      case 'drop': {
        // Pieza que se deja caer sobre la mesa: llega de arriba, girada.
        const tape = el.querySelector('.lv-tape');
        gsap.set(el, { y: -60, rotation: gsap.utils.random(-12, 12), scale: 1.08, opacity: 0 });
        if (tape) gsap.set(tape, { scaleX: 0, transformOrigin: '0% 50%' });
        play = () => {
          const tl = gsap.timeline({ delay });
          tl.to(el, { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.3, ease: EASE });
          if (tape) tl.to(tape, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, '-=0.75');
        };
        break;
      }
      case 'type': {
        const chars = typewrite(el);
        gsap.set(chars, { opacity: 0 });
        play = () => gsap.to(chars, { opacity: 1, duration: 0.01, stagger: 0.028, ease: 'none', delay });
        break;
      }
      case 'write': {
        gsap.set(el, { clipPath: 'inset(-20% 100% -20% 0%)' });
        play = () => gsap.to(el, { clipPath: 'inset(-20% 0% -20% 0%)', duration: 1.3, ease: 'power2.inOut', delay });
        break;
      }
      default: {
        gsap.set(el, { y: 26, opacity: 0 });
        play = () => gsap.to(el, { y: 0, opacity: 1, duration: 1.3, ease: EASE, delay });
      }
    }

    el.classList.add('is-ready');
    onEnter(el, play);
  });

  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    if (el.dataset.parallaxBound) return;
    el.dataset.parallaxBound = 'true';
    const amount = parseFloat(el.dataset.parallax || '0.08');
    gsap.fromTo(
      el,
      { yPercent: amount * 50 },
      {
        yPercent: amount * -50,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* ── Números que cuentan ────────────────────────────── */
export function initCount() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    if (el.dataset.countBound) return;
    el.dataset.countBound = 'true';
    const value = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix ?? '';
    if (reduced()) return;
    const state = { v: 0 };
    el.textContent = pad(0) + suffix;
    onEnter(el, () =>
      gsap.to(state, {
        v: value,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => (el.textContent = pad(Math.round(state.v)) + suffix),
      })
    );
  });
}

/* ── Collage: piezas que se mueven ──────────────────── */
let zTop = 20;

export function initDrag() {
  if (!finePointer()) return;
  document.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
    if (el.dataset.dragBound) return;
    el.dataset.dragBound = 'true';
    const piece = el.closest<HTMLElement>('.pieza');

    const [instance] = Draggable.create(el, {
      type: 'x,y',
      inertia: !reduced(),
      edgeResistance: 0.6,
      onPress() {
        if (piece) piece.style.zIndex = String(++zTop);
      },
      onDragStart() {
        el.classList.add('is-dragging');
        gsap.to(el, { scale: 1.04, duration: 0.4, ease: EASE });
      },
      onDrag() {
        gsap.to(el, { rotation: gsap.utils.clamp(-10, 10, this.deltaX * 0.8), duration: 0.4, ease: EASE });
      },
      onRelease() {
        el.classList.remove('is-dragging');
        gsap.to(el, { scale: 1, rotation: 0, duration: 1, ease: EASE });
      },
    });
    cleanups.push(() => instance.kill());
  });
}

/* ── Collage: capas que flotan con el mouse ─────────── */
export function initDepth() {
  if (!finePointer() || reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-collage]').forEach((stage) => {
    if (stage.dataset.depthBound) return;
    stage.dataset.depthBound = 'true';

    const layers = Array.from(stage.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
      depth: parseFloat(el.dataset.depth || '0'),
      x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
    }));
    if (!layers.length) return;

    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        l.x(nx * l.depth * -48);
        l.y(ny * l.depth * -36);
      });
    };
    stage.addEventListener('pointermove', move);
    cleanups.push(() => stage.removeEventListener('pointermove', move));
  });
}

/* ── Holdings: pista horizontal fijada ──────────────── */
export function initHoldings() {
  const pin = document.querySelector<HTMLElement>('[data-holdings]');
  if (!pin || pin.dataset.holdingsBound) return;
  pin.dataset.holdingsBound = 'true';

  const track = pin.querySelector<HTMLElement>('[data-holdings-track]');
  const viewport = track?.parentElement;
  if (!track || !viewport) return;
  const plates = Array.from(track.querySelectorAll<HTMLElement>('[data-plate]'));
  const total = plates.length;
  const lots = Math.max(1, total - 1);
  const current = pin.querySelector<HTMLElement>('[data-holdings-current]');
  const bar = pin.querySelector<HTMLElement>('[data-holdings-bar]');
  const drawsIn = (plate: HTMLElement) => Array.from(plate.querySelectorAll<Drawable>('svg[data-draw="manual"]'));

  const mm = gsap.matchMedia();
  cleanups.push(() => mm.revert());

  mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
    const distance = () => track.scrollWidth - viewport.clientWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
          if (current) current.textContent = pad(Math.min(lots, Math.round(self.progress * (total - 1)) + 1));
        },
      },
    });

    plates.forEach((plate) => {
      const sheet = plate.querySelector('[data-plate-sheet]');
      const card = plate.querySelector('[data-plate-card]');
      const scrub = { trigger: plate, containerAnimation: tween, start: 'left 100%', end: 'left 35%', scrub: true };
      if (sheet) gsap.from(sheet, { rotation: 12, y: 80, opacity: 0, ease: 'power2.out', scrollTrigger: scrub });
      if (card) gsap.from(card, { rotation: -10, y: 120, opacity: 0, ease: 'power2.out', scrollTrigger: { ...scrub, start: 'left 90%', end: 'left 25%' } });
      drawsIn(plate).forEach((svg, i) =>
        ScrollTrigger.create({
          trigger: plate,
          containerAnimation: tween,
          start: i === 0 ? 'left 65%' : 'left 30%',
          once: true,
          onEnter: () => svg.__draw?.play(),
        })
      );
    });
  });

  mm.add('(max-width: 900px), (prefers-reduced-motion: reduce)', () => {
    plates.forEach((plate) => drawsIn(plate).forEach((svg) => onEnter(svg, () => svg.__draw?.play(), 'top 80%')));
  });
}

/* ── Ciclo de vida con View Transitions ─────────────── */
export function initInk() {
  initPen();
  initDraw();
  initReveal();
  initCount();
  initDrag();
  initDepth();
  initHoldings();
  // Los triggers se crean por tipo, no en orden de página: reordenarlos para
  // que los que van después del pin de Holdings calculen bien su posición.
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export function killInk() {
  cleanups.splice(0).forEach((fn) => fn());
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
