import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal() {
  const ethosText = document.querySelector('.ethos__text');
  
  if (ethosText) {
    // Split the text into words or characters for a premium reveal,
    // but for now, we'll just do a simple opacity fade on the whole block
    // or if we use SplitText it would be better. Let's do a simple vertical reveal.
    gsap.fromTo(ethosText, 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ethosText,
          start: 'top 80%',
        }
      }
    );
  }

  const ethosSub = document.querySelector('.ethos__subtext');
  if (ethosSub) {
    gsap.fromTo(ethosSub, 
      { 
        y: 30, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ethosText,
          start: 'top 80%',
        }
      }
    );
  }
}
