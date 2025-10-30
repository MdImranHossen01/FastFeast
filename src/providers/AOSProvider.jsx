"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 

export default function AOSProvider({ children }) {
  useEffect(() => {
    // Initialize AOS once on the client-side
    AOS.init({
      duration: 800, // Animation duration
      once: true,    // Whether animation should happen only once - while scrolling down
      offset: 100,   // Offset (in px) from the original trigger point
      easing: 'ease-out-cubic', // Default easing for AOS animations
    });
  }, []); 

  return <>{children}</>;
}