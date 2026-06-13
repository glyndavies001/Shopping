// Bump this version any time index.html changes meaningfully
const CACHE_NAME = 'trolley-v5.12-2026-06-02';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg'];

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

// Race network against a timeout; fall back to cache if network is slow
function raceNetworkCache(request, timeoutMs) {
  return new Promise(resolve => {
    let settled = false;
    const timer = setTimeout(async () => {
      if (settled) return;
      const cached = await caches.match(request);
      if (cached) { settled = true; resolve(cached); }
    }, timeoutMs);

    fetch(request).then(resp => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(c => c.put(request, copy)).catch(() => {});
      resolve(resp);
    }).catch(async () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const cached = await caches.match(request);
      resolve(cached || new Response('Offline', { status: 503 }));
    });
  });
}

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (e.request.method !== 'GET') return;

  // Bug 7 fix: index.html uses race with 3s timeout, not pure network-first
  if (url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    e.respondWith(raceNetworkCache(e.request, 3000));
    return;
  }

  // Static assets: cache-first
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
