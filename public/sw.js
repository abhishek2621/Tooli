// Simple Service Worker for Tooli
const CACHE_NAME = 'tooli-cache-v1';

self.addEventListener('install', (event) => {
    // @ts-ignore
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/manifest.json',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    // @ts-ignore
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
