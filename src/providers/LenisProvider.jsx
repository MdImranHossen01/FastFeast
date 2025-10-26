// providers/LenisProvider.jsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LenisProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2,
        wheelMultiplier: 1,
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