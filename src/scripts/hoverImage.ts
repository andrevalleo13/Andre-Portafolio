import { gsap } from 'gsap';

export function initHoverImage() {
  const links = document.querySelectorAll('.work__link');
  
  if (links.length === 0) return;

  // We'll create a floating image element dynamically
  const floatingImage = document.createElement('div');
  floatingImage.classList.add('floating-project-image');
  document.body.appendChild(floatingImage);

  // Styling for the floating image container
  Object.assign(floatingImage.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '300px',
    height: '400px',
    pointerEvents: 'none',
    opacity: '0',
    zIndex: '0', // Keep it behind the text but above the background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'translate(-50%, -50%) scale(0.8)',
    transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity'
  });

  // Track mouse position globally
  let mouseX = 0;
  let mouseY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Smooth follow using GSAP
    gsap.to(floatingImage, {
      x: mouseX,
      y: mouseY,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  links.forEach((link, index) => {
    link.addEventListener('mouseenter', (e) => {
      const target = e.currentTarget as HTMLElement;
      const bgImage = target.getAttribute('data-image') || `https://picsum.photos/seed/${index + 10}/600/800`;
      
      floatingImage.style.backgroundImage = `url('${bgImage}')`;
      floatingImage.style.opacity = '0.4'; // High end fade behind the text
      floatingImage.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    link.addEventListener('mouseleave', () => {
      floatingImage.style.opacity = '0';
      floatingImage.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
  });
}
