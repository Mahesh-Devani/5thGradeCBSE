/* ==========================================================
   5th Grade CBSE — Service Worker (Offline & Auto-Update Engine)
   ========================================================== */

const CACHE_NAME = 'cbse5-app-v2.9.0';

// Core App Shell assets to pre-cache immediately on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './hub.js',
  './manifest.webmanifest',
  './pwa.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon.svg',
  './icons/favicon-64.png',
  // Shared Utilities
  './shared/js/sound.js',
  './shared/js/confetti.js',
  './shared/js/drawer.js',
  './shared/js/speech.js',
  './shared/js/storage.js',
  './shared/js/grader.js',
  './shared/js/voice.js',
  './shared/js/llm-providers.js',
  './shared/js/profile.js',
  './shared/js/auth.js',
  './shared/js/curriculum.js',
  './shared/js/google-drive-sync.js',
  // Maths
  './maths/index.html',
  './maths/styles.css',
  './maths/engines/solvers.js',
  './maths/engines/tables_lab.js',
  './maths/engines/fractions_lab.js',
  './maths/data/topic1_hcf_lcm.js',
  './maths/data/topic2_divisibility.js',
  './maths/data/topic3_expressions.js',
  './maths/data/topic4_patterns.js',
  './maths/data/topic5_geometry.js',
  './maths/data/topic_tables.js',
  './maths/data/topic_fractions.js',
  './maths/data/topic_revision.js',
  './maths/data/topic8_area.js',
  './maths/data/topic9_volume.js',
  './maths/app.js',
  // Science
  './science/index.html',
  './science/styles.css',
  './science/data/chapter_l2_animals.js',
  './science/data/chapter_l3_skeletal.js',
  './science/data/chapter_l4_nervous.js',
  './science/data/chapter_l5_health.js',
  './science/data/chapter_l7_air_water.js',
  './science/data/chapter_l11_rocks.js',
  './science/data/chapter_l13_matter.js',
  './science/data/milestones.js',
  './science/app.js',
  // English Grammar
  './english_grammer/index.html',
  './english_grammer/styles.css',
  './english_grammer/data/topics.js',
  './english_grammer/data/milestones.js',
  './english_grammer/app.js',
  // Hindi Vyakaran
  './hindi_vyakaran/index.html',
  './hindi_vyakaran/styles.css',
  './hindi_vyakaran/data/chitra_varnan.js',
  './hindi_vyakaran/data/vakyansh.js',
  './hindi_vyakaran/data/sangya.js',
  './hindi_vyakaran/data/milestones.js',
  './hindi_vyakaran/app.js',
  // SST Chapters
  './sst_chapters/index.html',
  './sst_chapters/styles.css',
  './sst_chapters/data/chapter_l5_drc.js',
  './sst_chapters/data/chapter_l6_greenland.js',
  './sst_chapters/data/chapter_l7_saudi.js',
  './sst_chapters/data/chapter_l17_revolt1857.js',
  './sst_chapters/data/chapter_l18_struggle.js',
  './sst_chapters/data/chapter_l19_freedom.js',
  './sst_chapters/data/chapter_l20_government.js',
  './sst_chapters/data/milestones.js',
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
   Install Event: Cache core shell & skip waiting immediately
   ---------------------------------------------------------- */
self.addEventListener('install', (event) => {
  self.skipWaiting();
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
   Fetch Strategy:
   - Navigation (HTML) & Code Scripts (JS): Network-First with Cache Fallback
     ensures fresh deployments & matching script tags load immediately when online,
     preventing stale code version mismatches while guaranteeing 100% offline support.
   - Heavy Assets (CSS, Images, Fonts, Audio): Stale-While-Revalidate
     provides sub-millisecond local launch with background updating.
   ---------------------------------------------------------- */
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests from http / https schemes
  if (request.method !== 'GET') return;
  if (!request.url.startsWith('http')) return;

  // Exclude external CDNs, model hosts, and AI API endpoints from service worker caching
  // (Preserves WebLLM model download streaming and browser cache isolation)
  try {
    const reqUrl = new URL(request.url);
    if (
      reqUrl.hostname.includes('huggingface.co') ||
      reqUrl.hostname.includes('hf.co') ||
      reqUrl.hostname.includes('raw.githubusercontent.com') ||
      reqUrl.hostname.includes('esm.run') ||
      reqUrl.hostname.includes('jsdelivr.net') ||
      reqUrl.hostname.includes('anthropic.com') ||
      reqUrl.hostname.includes('openai.com') ||
      reqUrl.hostname.includes('googleapis.com')
    ) {
      return; // Direct browser network fetch without SW interception
    }
  } catch (e) {}

  // 1. Navigation (HTML) & Scripts (JS): Network-First
  const isCodeScript = request.url.endsWith('.js') || request.url.includes('.js?');
  if (request.mode === 'navigate' || isCodeScript) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(request);
          if (cached) return cached;
          if (request.mode === 'navigate') {
            const fallback = await cache.match('./index.html');
            if (fallback) return fallback;
          }
          return new Response('Offline: Content not yet cached.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        })
    );
    return;
  }

  // 2. Static Assets (CSS, Images, Fonts, Audio): Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);

      // Background network fetch promise
      const networkFetch = fetch(request).then((networkResponse) => {
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      }).catch((err) => {
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

      return new Response('Offline: Asset not found.', {
        status: 404,
        statusText: 'Not Found'
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
