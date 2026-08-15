import { gsap } from 'gsap';

export function initHoverFill() {
  const links = document.querySelectorAll('.hover-fill');

  links.forEach((link) => {
    // Prevent double initialization
    if (link.querySelector('.fill-bg')) return;

    // Wrap text so we can change its color above the background
    const text = link.innerHTML;
    link.innerHTML = `
      <span class="fill-bg"></span>
      <span class="fill-text">${text}</span>
    `;

    const fillBg = link.querySelector('.fill-bg') as HTMLElement;
    const fillText = link.querySelector('.fill-text') as HTMLElement;

    // Apply necessary styles
    (link as HTMLElement).style.position = 'relative';
    (link as HTMLElement).style.overflow = 'hidden';
    (link as HTMLElement).style.borderRadius = '2px'; // Redondeado pero súper poco

    fillBg.style.position = 'absolute';
    fillBg.style.top = '0';
    fillBg.style.left = '0';
    fillBg.style.width = '100%';
    fillBg.style.height = '100%';
    fillBg.style.backgroundColor = 'var(--bone-light)';
    fillBg.style.pointerEvents = 'none';
    fillBg.style.transform = 'scale(0)';
    fillBg.style.zIndex = '0';

    fillText.style.position = 'relative';
    fillText.style.zIndex = '1';
    fillText.style.transition = 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

    link.addEventListener('mouseenter', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = link.getBoundingClientRect();
      const relX = mouseEvent.clientX - rect.left;
      const relY = mouseEvent.clientY - rect.top;

      // Start from mouse position (square shape)
      gsap.set(fillBg, {
        x: relX - rect.width / 2,
        y: relY - rect.height / 2,
        scale: 0
      });

      // Animate to full coverage smoothly
      gsap.to(fillBg, {
        x: 0,
        y: 0,
        scale: 2.5,
        duration: 0.7,
        ease: 'expo.out'
      });

      // Change text color to dark
      fillText.style.color = 'var(--dark)';
    });

    link.addEventListener('mouseleave', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = link.getBoundingClientRect();
      const relX = mouseEvent.clientX - rect.left;
      const relY = mouseEvent.clientY - rect.top;

      // Animate out towards exit position smoothly
      gsap.to(fillBg, {
        x: relX - rect.width / 2,
        y: relY - rect.height / 2,
        scale: 0,
        duration: 0.65,
        ease: 'expo.out'
      });

      // Reset text color
      fillText.style.color = '';
    });
  });
}
