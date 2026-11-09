// 앱(PWA)용 서비스 워커: 항상 최신 내용을 먼저 받고, 인터넷이 끊기면 저장해 둔 화면을 보여줍니다.
var CACHE = 'salon-v1';
var CORE = ['./', './store.js?v=3', './manifest.webmanifest', './icons/icon-192.png', './img/hero.jpg'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || caches.match('./'); });
    })
  );
});
