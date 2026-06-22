const CACHE = 'kuis-pramuka-v2';

const PRECACHE = [
  '/',
  '/lencana/',
  '/profil/',
  '/morse/',
  '/semaphore/',
  '/sandi/',
  '/sku/',
  '/uu-pramuka/',
  '/simpul/',
  '/sejarah/',
  '/p3k/',
  '/kompas/',
  '/baris-berbaris/',
  '/perkemahan/',
  '/tanda-pengenal/',
  '/pioniring/',
  '/organisasi/',
  '/referensi/',
  '/dasa-darma/',
  '/site.webmanifest',
  '/favicon.svg',
  '/icons/pwa-192.svg',
  '/icons/pwa-512.svg',
];

// Install: pre-cache all pages
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for navigation + assets, network-first for everything else
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip cross-origin requests (Google Fonts, CDN, etc.)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Only cache successful same-origin responses
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback: return cached home page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/') || new Response('Offline — buka dulu saat ada koneksi.', { status: 503 });
        }
      });
    })
  );
});
