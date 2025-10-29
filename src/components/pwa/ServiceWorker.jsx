"use client";

import { useEffect } from 'react';

const ServiceWorker = () => {
  useEffect(() => {
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
            });
          });
          
          // Check if service worker is controlling the page
          if (registration.active) {
          }
          
        } catch (error) {
          console.error('❌ Service Worker registration failed:', error);
        }
      } else {
      }
    };

    // Wait for page to load completely
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default ServiceWorker;