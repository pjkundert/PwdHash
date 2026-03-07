const CACHE_NAME = 'pwdhash-v4';
const ASSETS = [
  './',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      // For page navigations (e.g. /index.html), serve the cached root
      if (event.request.mode === 'navigate') {
        return caches.match('./').then(function(root) {
          return root || fetch(event.request);
        });
      }
      return fetch(event.request);
    })
  );
});
