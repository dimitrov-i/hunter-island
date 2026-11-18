// Generated offline app cache. Updates wait until all old app windows close.
const PREFIX = 'hunter-island:' + self.registration.scope + ':';
const CACHE = PREFIX + "3afab160257eadc4b1e580e2cc6b72cf5a67d1e2e225d930478de7d66c515fc0";
const ASSETS = ["apple-touch-icon.png","assets/browser-BBPnv8OC.js","assets/fur-elise-D_clFgWz.js","assets/index-BS0ibhkg.js","assets/index-BwZLY6Kq.css","assets/mozart-40-DR0gpBF7.js","assets/piano-data-Dr5Ex1Xa.js","assets/qr-scanner-worker.min-CJaXo3yu.js","assets/qr-scanner.min-DOKNa_B6.js","assets/radetzky-DWGMKmit.js","assets/sabre-dance-b_kZ0q_G.js","docs/game-guide.html","explorers-chart.svg","icon-1024.png","icon-128.png","icon-180.png","icon-192.png","icon-256.png","icon-32.png","icon-512.png","icon-64.png","icon.png","icon.svg","index.html","manifest.json"];
const urls = new Set(ASSETS.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(
    [...urls].map(url => new Request(url, { cache: 'reload', credentials: 'same-origin' }))
  )));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))
  )));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  url.search = ''; url.hash = '';
  if (url.href === self.registration.scope) url.pathname += 'index.html';
  if (!urls.has(url.href)) return;
  event.respondWith(caches.open(CACHE).then(async cache =>
    await cache.match(url.href) || fetch(event.request)
  ));
});
