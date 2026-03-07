const CACHE_NAME = 'pwdhash-v3';
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
  var request = event.request;
  var url = new URL(request.url);
  // Map directory requests to index.html
  if (url.pathname.endsWith('/')) {
    url.pathname += 'index.html';
    request = new Request(url.href, {headers: request.headers});
  }
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(event.request))
  );
});
