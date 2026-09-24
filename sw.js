/* ==========================================================
   5th Grade CBSE — Service Worker (Offline & Auto-Update Engine)
   ========================================================== */

const CACHE_NAME = 'cbse5-app-v1.0.0';

// Core App Shell assets to pre-cache immediately on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './pwa.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon.svg',
  './icons/favicon-64.png',
  // Maths
  './maths/index.html',
  './maths/styles.css',
  './maths/app.js',
  // Science
  './science/index.html',
  './science/styles.css',
  './science/app.js',
  // English Grammar
  './english_grammer/index.html',
  './english_grammer/styles.css',
  './english_grammer/app.js',
  // Hindi Vyakaran
  './hindi_vyakaran/index.html',
  './hindi_vyakaran/styles.css',
  './hindi_vyakaran/app.js',
  // SST Chapters
  './sst_chapters/index.html',
  './sst_chapters/styles.css',
  './sst_chapters/app.js',
  // Social Science Maps
  './social_sicence_maps/index.html',
  './social_sicence_maps/styles.css',
  './social_sicence_maps/app.js',
  // General Knowledge
  './general_knowledge/index.html',
  './general_knowledge/styles.css',
  './general_knowledge/app.js',
  './general_knowledge/data.js'
];

/* ----------------------------------------------------------
   Install Event: Cache core shell
   ---------------------------------------------------------- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use cache.addAll with individual catch to avoid failure if one optional file fails
      return Promise.all(
        PRECACHE_ASSETS.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn(`[SW] Precache failed for ${url}:`, err);
          });
        })
      );
    }).then(() => {
      // Do not skipWaiting immediately by default so active tabs aren't disrupted mid-quiz
      // Skip waiting will be triggered when user clicks "Update Now"
    })
  );
});

/* ----------------------------------------------------------
   Activate Event: Clean up stale caches and claim clients
   ---------------------------------------------------------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`[SW] Deleting old cache: ${key}`);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

/* ----------------------------------------------------------
   Fetch Strategy: Stale-While-Revalidate
   - Return cached asset immediately for sub-millisecond response & offline support
   - Fetch network in background and update cache silently
   - Fall back to cache or offline shell if offline
   ---------------------------------------------------------- */
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests from http / https schemes
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);

      // Background network fetch promise
      const networkFetch = fetch(request).then((networkResponse) => {
        // Cache valid responses (status 200 or opaque responses for CDNs/Google Fonts)
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      }).catch((err) => {
        // Network failed (offline)
        return null;
      });

      // If we have it in cache, return it immediately while network updates in background
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not in cache, wait for network
      const networkResponse = await networkFetch;
      if (networkResponse) {
        return networkResponse;
      }

      // If both network and cache fail:
      // For navigation requests (HTML pages), return cached index.html
      if (request.mode === 'navigate') {
        const fallbackPage = await cache.match('./index.html');
        if (fallbackPage) return fallbackPage;
      }

      return new Response('Offline: Content not yet cached.', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({ 'Content-Type': 'text/plain' })
      });
    })
  );
});

/* ----------------------------------------------------------
   Message Event: Allow client to trigger SKIP_WAITING
   ---------------------------------------------------------- */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
