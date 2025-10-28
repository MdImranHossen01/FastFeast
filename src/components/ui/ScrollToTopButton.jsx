// components/ui/ScrollToTopButton.jsx
"use client";

import { useState, useEffect, useRef } from 'react'; // <-- 1. IMPORT useRef
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioRef = useRef(null); // <-- 2. CREATE the ref here

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) {
        setScrollProgress(0);
        setIsVisible(false);
        return;
      }
      
      const scrollPercent = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(Math.round(scrollPercent * 100));
      setIsVisible(scrollTop > 300);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', calculateScrollProgress);
      calculateScrollProgress();

      return () => window.removeEventListener('scroll', calculateScrollProgress);
    }
  }, []);

  const scrollToTop = () => {
    if (audioRef.current) { // Good practice to check if it exists
      audioRef.current.play();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
 
  if (!isVisible) {
    return null;
  }

  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 z-50 w-10 h-10 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label={`Scroll to top - ${scrollProgress}% scrolled`}
    >
      <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 20 20">
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke="#fed7aa"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center -space-y-1">
          <ChevronUp 
            size={12}
            className="text-orange-600 font-bold group-hover:-translate-y-0.5 transition-transform" 
          />
          <ChevronUp 
            size={12}
            className="text-orange-600 font-bold group-hover:-translate-y-0.5 transition-transform" 
          />
        </div>
      </div>
        <audio ref={audioRef} src="/audio/back-to-top.mp3" />
    </button>
  );
}