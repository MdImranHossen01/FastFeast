// public/sw.js - AUTO-UPDATE SERVICE WORKER
const CACHE_NAME = 'fastfeast-v2.0'; // ⭐ CHANGED VERSION
const APP_VERSION = '2.0'; // ⭐ ADDED VERSION TRACKING

console.log(`🚀 FastFeast Service Worker ${APP_VERSION} Loading...`);

// ⭐ UPDATED INSTALL - Auto-skip waiting
self.addEventListener('install', (event) => {
  console.log(`✅ Service Worker ${APP_VERSION}: Install event`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache opened:', CACHE_NAME);
        return cache.addAll([
          '/',
          '/manifest.json',
          '/icons/icon-192x192.png',
          '/icons/icon-512x512.png'
        ]);
      })
      .then(() => {
        console.log('✅ All resources cached');
        return self.skipWaiting(); // ⭐ FORCE IMMEDIATE ACTIVATION
      })
      .catch((error) => {
        console.error('❌ Cache failed:', error);
      })
  );
});

// ⭐ UPDATED ACTIVATE - Better cache cleanup
self.addEventListener('activate', (event) => {
  console.log(`✅ Service Worker ${APP_VERSION}: Activate event`);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // ⭐ DELETE ALL OLD CACHES (not just different names)
          if (!cacheName.startsWith('fastfeast-v') || cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated! Taking control...');
      return self.clients.claim(); // ⭐ TAKE CONTROL IMMEDIATELY
    })
  );
});

// ⭐ UPDATED FETCH - Smart caching with update checks
self.addEventListener('fetch', (event) => {
  // ⭐ FOR HTML PAGES: Network first, then cache (always fresh)
  if (event.request.mode === 'navigate' || 
      event.request.destination === 'document') {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // ⭐ UPDATE CACHE WITH FRESH CONTENT
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // ⭐ FALLBACK TO CACHE IF OFFLINE
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                console.log('📦 Serving offline page from cache');
                return cachedResponse;
              }
              // ⭐ RETURN OFFLINE PAGE IF NO CACHE
              return caches.match('/');
            });
        })
    );
  } 
  // ⭐ FOR STATIC ASSETS: Cache first, then network
  else if (event.request.url.includes('/_next/static/') ||
           event.request.url.includes('/icons/') ||
           event.request.destination === 'image') {
    
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log('📦 Serving static asset from cache:', event.request.url);
            return response;
          }
          
          // ⭐ NOT IN CACHE - FETCH AND CACHE
          return fetch(event.request)
            .then(networkResponse => {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
              return networkResponse;
            })
            .catch(error => {
              console.error('❌ Fetch failed:', error);
              // ⭐ RETURN PLACEHOLDER FOR FAILED IMAGES
              if (event.request.destination === 'image') {
                return new Response(
                  '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="#9ca3af" text-anchor="middle" dy=".3em">Image</text></svg>',
                  { headers: { 'Content-Type': 'image/svg+xml' } }
                );
              }
              throw error;
            });
        })
    );
  }
  // ⭐ FOR API CALLS: Network only (don't cache)
  else if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
  }
  // ⭐ DEFAULT: Cache first, then network
  else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});

// ⭐ ADDED MESSAGE HANDLER - For update commands
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('🔄 Received skip waiting command');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: APP_VERSION });
  }
});

// ⭐ ADDED BACKGROUND SYNC - For offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // ⭐ YOU CAN ADD OFFLINE SYNC LOGIC HERE LATER
  console.log('🔄 Performing background sync...');
}