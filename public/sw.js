// public/sw.js – AUTO-UPDATE + SAFE CACHE SERVICE WORKER

const CACHE_NAME = "fastfeast-v2.1"; // 🔹 Increment version whenever you deploy
const APP_VERSION = "2.1"; // 🔹 Version log

/**
 * ✅ Utility: Cache only valid HTTP(S) GET requests
 */
function canCache(request, response) {
  try {
    const url = new URL(request.url);
    return (
      request.method === "GET" &&
      (url.protocol === "http:" || url.protocol === "https:") &&
      response &&
      response.status === 200 &&
      response.type !== "opaqueredirect"
    );
  } catch {
    return false;
  }
}

/**
 * ✅ INSTALL: Precache app shell & skip waiting immediately
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll([
          "/",
          "/manifest.json",
          "/icons/icon-192x192.png",
          "/icons/icon-512x512.png",
        ])
      )
      .then(() => self.skipWaiting())
      .catch((err) => console.error("❌ Cache preload failed:", err))
  );
});

/**
 * ✅ ACTIVATE: Clear all old caches + claim clients
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith("fastfeast-v")) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

/**
 * ✅ FETCH: Intelligent caching strategies
 */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Ignore non-http(s) URLs (like extensions)
  try {
    const url = new URL(req.url);
    if (!["http:", "https:"].includes(url.protocol)) return;
  } catch {
    return;
  }

  // HTML navigation → Network-first, fallback to cache
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          if (canCache(req, clone))
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("/")))
    );
    return;
  }

  // Static files & images → Cache-first, update in background
  if (
    req.url.includes("/_next/static/") ||
    req.url.includes("/icons/") ||
    req.destination === "image" ||
    req.destination === "audio" 
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) {
          fetch(req)
            .then((netRes) => {
              const clone = netRes.clone();
              if (canCache(req, clone))
                caches.open(CACHE_NAME).then((c) => c.put(req, clone));
            })
            .catch(() => {}); // Background update
          return cached;
        }
        return fetch(req)
          .then((res) => {
            const clone = res.clone();
            if (canCache(req, clone))
              caches.open(CACHE_NAME).then((c) => c.put(req, clone));
            return res;
          })
          .catch(() =>
            req.destination === "image"
              ? new Response(
                  `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="#9ca3af" text-anchor="middle" dy=".3em">Image</text></svg>`,
                  { headers: { "Content-Type": "image/svg+xml" } }
                )
              : new Response("Network error", { status: 408 })
          );
      })
    );
    return;
  }

  // API calls → Network-only (no caching)
  if (req.url.includes("/api/")) {
    event.respondWith(fetch(req));
    return;
  }

  // Default: Cache-first fallback
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const clone = res.clone();
        if (canCache(req, clone))
          caches.open(CACHE_NAME).then((c) => c.put(req, clone));
        return res;
      });
    })
  );
});

/**
 * ✅ MESSAGE HANDLER: Manual update commands
 */
self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data) return;

  if (data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (data.type === "GET_VERSION") {
    event.ports?.[0]?.postMessage({ version: APP_VERSION });
  }
});

/**
 * ✅ BACKGROUND SYNC (future offline features)
 */
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // future offline upload logic here
}
