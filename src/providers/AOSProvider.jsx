"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({ children }) {
  useEffect(() => {
    // Initialize AOS with settings that prevent hydration issues
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      // Critical settings to prevent hydration mismatches:
      useClassNames: false, // Prevents AOS from automatically adding classes
      initClassName: false, // Don't use init class
      animatedClassName: false, // Don't use animated class
      disableMutationObserver: false,
      startEvent: 'DOMContentLoaded',
      // Disable AOS for server-side rendering
      disable: function() {
        const isServer = typeof window === 'undefined';
        return isServer;
      }
    });

    // Refresh AOS after all components are mounted
    const refreshTimer = setTimeout(() => {
      AOS.refresh();
    }, 1000);

    return () => clearTimeout(refreshTimer);
  }, []);

  return <>{children}</>;
}