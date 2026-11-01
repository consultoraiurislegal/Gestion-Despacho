const CACHE_NAME = 'portal-juridico-v2';
const urlsToCache = [
  './index.html',
  './Referidos.html',
  './Linetime.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/vis-network/standalone/umd/vis-network.min.js',
  'https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css',
  'https://unpkg.com/vis-timeline@latest/standalone/umd/vis-timeline-graph2d.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        // Opcional: Manejo de respaldo offline para páginas HTML si fuera necesario
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
