// components/ui/SmoothLink.jsx
"use client";

import Link from 'next/link';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function SmoothLink({ 
  href, 
  children, 
  className, 
  offset = 80,
  onClick 
}) {
  const { scrollToSection } = useSmoothScroll();

  const handleClick = (e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      scrollToSection(sectionId);
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}