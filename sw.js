const CACHE_NAME = 'lol-esport-manager-v1.2.6';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/game.js',
  '/map.js',
  '/data_teams.js',
  '/data_champions.js',
  '/data_counters.js',
  '/img/logo.png',
  '/img/map.png',
  '/img/icon-192.png',
  '/img/icon-512.png'
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
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
