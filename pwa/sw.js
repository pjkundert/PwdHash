const CACHE_NAME = 'pwdhash-v2';
const ASSETS = [
  './index.html',
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
  var url = new URL(event.request.url);
  // Map directory requests to index.html
  if (url.pathname.endsWith('/')) {
    url.pathname += 'index.html';
  }
  event.respondWith(
    caches.match(url.pathname).then(cached => cached || fetch(event.request))
  );
});
