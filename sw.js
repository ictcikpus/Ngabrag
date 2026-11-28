'use strict';

const scope = self.registration.scope;
const prefix = 'ngabrag-pwa:' + scope + ':';
const cacheName = prefix + '4cbce748db7d';
const shell = new URL('./index.html', scope).href;
const files = new Set([
  './index.html',
  './pwa.js',
  './manifest.webmanifest',
  './vendor/three-r128.min.js',
  './vendor/tailwind.min.js',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
].map(path => new URL(path, scope).href));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache =>
    cache.addAll([...files].map(url => new Request(url, { cache: 'reload' })))
  ));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(prefix) && key !== cacheName)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const index = new URL(shell);
  const base = new URL(scope);
  const isLaunch = request.mode === 'navigate' && url.origin === base.origin &&
    (url.pathname === base.pathname || url.pathname === index.pathname);
  if (!isLaunch && !files.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const key = isLaunch ? shell : url.href;
    return (await cache.match(key)) || fetch(request);
  })());
});
