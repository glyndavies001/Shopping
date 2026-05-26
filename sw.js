// Trolley service worker — caches app shell for offline use
const CACHE_NAME = 'trolley-v4';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Never cache Supabase or ESM CDN — let them fail naturally when offline so the
  // app uses its IndexedDB sync queue. Only cache app shell.
  if (url.origin !== location.origin) return;
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy)).catch(() => {});
        return resp;
      }).catch(() => cached);
    })
  );
});
