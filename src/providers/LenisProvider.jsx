"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LenisProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.4, // Increased for smoother effect
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)), // More gradual easing
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: true, // Enable smooth touch
        touchMultiplier: 1.5,
        wheelMultiplier: 1.2, // Slightly increased
        infinite: false,
      });

      // Add some event listeners for better UX
      lenis.on('scroll', (e) => {
        // console.log('Scrolling:', e);
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, [pathname]);

  return <>{children}</>;
}