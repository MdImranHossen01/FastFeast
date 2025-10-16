// public/sw.js - Manual Service Worker
const CACHE_NAME = 'fastfeast-v1.0';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

console.log('🚀 FastFeast Service Worker Loading...');

// Install event
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ All resources cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Cache failed:', error);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated and ready!');
      return self.clients.claim();
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('📦 Serving from cache:', event.request.url);
          return response;
        }
        console.log('🌐 Fetching from network:', event.request.url);
        return fetch(event.request);
      })
      .catch((error) => {
        console.error('❌ Fetch failed:', error);
        // You can return a custom offline page here
      })
  );
});