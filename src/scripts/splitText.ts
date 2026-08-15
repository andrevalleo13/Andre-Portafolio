import { gsap } from 'gsap';

export function initHeroAnimation() {
  const nameEl = document.querySelector('.hero__name') as HTMLElement;
  const descriptorEl = document.querySelector('.hero__descriptor') as HTMLElement;
  const ctaEl = document.querySelector('.hero__cta') as HTMLElement;

  if (!nameEl) return;

  // Prevent double initialization during view transitions
  if (nameEl.dataset.animated === 'true') return;
  nameEl.dataset.animated = 'true';

  // Split text
  const text = nameEl.textContent || '';
  nameEl.innerHTML = '';
  // Set container opacity to 1 because we will animate the inner spans
  nameEl.style.opacity = '1'; 
  
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(25px)';
    nameEl.appendChild(span);
    return span;
  });

  // Master timeline
  const tl = gsap.timeline({ delay: 0.5 }); 

  // Animate descriptor
  if (descriptorEl) {
    tl.fromTo(descriptorEl, 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }
    );
  }

  // Animate Name characters sequentially
  tl.to(chars, {
    opacity: 1,
    y: 0,
    duration: 1.4,
    stagger: 0.03,
    ease: 'expo.out'
  }, "-=1.0");

  // Animate CTAs
  if (ctaEl) {
    tl.fromTo(ctaEl,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' },
      "-=1.1"
    );
  }
}
