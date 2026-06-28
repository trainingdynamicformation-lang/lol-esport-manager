const CACHE_NAME = 'lol-esport-manager-v1.12.13';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css?v=1.12.13',
  '/lang.js?v=1.12.13',
  '/game.js?v=1.12.13',
  '/map.js?v=1.12.13',
  '/data_teams.js?v=1.12.13',
  '/data_champions.js?v=1.12.13',
  '/data_counters.js?v=1.12.13',
  '/data_transfers.js?v=1.12.13',
  '/img/logo.png',
  '/img/logoV2.png',
  '/img/map.png',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/img/apple-touch-icon.png',
  '/img/favicon-32.png',
  '/img/favicon-16.png'
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
