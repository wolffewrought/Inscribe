// Inscribe service worker — minimal, enables installable PWA (no Chrome badge)
const CACHE = 'inscribe-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  // Network-first, fall back to cache so the app works offline once visited
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
