/**
 * ── Smooth: scroll con inercia (Lenis) ────────────────
 *
 * Una sola instancia para todo el sitio, sincronizada con el reloj
 * de GSAP para que ScrollTrigger (pins, scrub, parallax) no tiemble.
 * Se expone en `window.__lenis` para el menú y "volver arriba".
 * Con movimiento reducido no se activa: queda el scroll nativo.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmooth() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as unknown as { __lenis: Lenis }).__lenis = lenis;
}

/* Tras una View Transition el documento cambia de alto. */
export function refreshSmooth() {
  lenis?.resize();
}

/* Links internos [data-scroll] (índice, anclas): desplazamiento suave. */
export function initScrollLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-scroll]').forEach((a) => {
    if (a.dataset.scrollBound) return;
    a.dataset.scrollBound = 'true';
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -24, duration: 1.4 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
