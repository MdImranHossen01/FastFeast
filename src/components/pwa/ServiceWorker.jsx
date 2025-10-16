"use client";

import { useEffect } from 'react';

const ServiceWorker = () => {
  useEffect(() => {
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          console.log('🔧 Attempting to register Service Worker...');
          
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          
          console.log('✅ Service Worker registered successfully!', registration);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('🔄 New Service Worker found:', newWorker);
            
            newWorker.addEventListener('statechange', () => {
              console.log('🔄 Service Worker state:', newWorker.state);
            });
          });
          
          // Check if service worker is controlling the page
          if (registration.active) {
            console.log('🎯 Service Worker is active and controlling the page');
          }
          
        } catch (error) {
          console.error('❌ Service Worker registration failed:', error);
        }
      } else {
        console.log('❌ Service Workers are not supported in this browser');
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