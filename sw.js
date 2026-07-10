const CACHE_NAME = 'lol-esport-manager-v1.17.5';
/* Cache dédié aux portraits de champions, volontairement NON versionné :
   contrairement au reste (CACHE_NAME, purgé à chaque mise à jour pour forcer
   le rechargement du code), les images ne doivent être téléchargées qu'une
   seule fois par le joueur, y compris à travers les futures mises à jour. */
const IMAGE_CACHE_NAME = 'lol-esport-manager-champion-images';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css?v=1.17.5',
  '/lang.js?v=1.17.5',
  '/game.js?v=1.17.5',
  '/map.js?v=1.17.5',
  '/data_teams.js?v=1.17.5',
  '/data_champions.js?v=1.17.5',
  '/data_counters.js?v=1.17.5',
  '/data_transfers.js?v=1.17.5',
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
      Promise.all(keys.filter(k => k !== CACHE_NAME && k !== IMAGE_CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Portraits de champions : cache-first persistant. Téléchargés une seule
  // fois au premier affichage (draft, liste Champions, mini-carte de match),
  // puis servis depuis le cache à chaque session suivante — pas de re-téléchargement,
  // et pas de purge à chaque mise à jour de version (IMAGE_CACHE_NAME est stable).
  if (url.pathname.startsWith('/img/champions/')) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            if (response && response.ok) cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
