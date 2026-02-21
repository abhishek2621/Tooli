const CACHE_NAME = 'tooli-v2';

const STATIC_ASSETS = [
    '/',
    '/manifest.json',
];

const CACHE_STRATEGIES = {
    STATIC: ['GET'],
    CACHE_FIRST: ['GET'],
    NETWORK_FIRST: ['GET'],
};

function shouldCache(request) {
    const url = new URL(request.url);
    
    if (url.origin !== location.origin) {
        return false;
    }
    
    const path = url.pathname;
    
    if (path.startsWith('/_next/static/')) {
        return true;
    }
    
    if (path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
        return true;
    }
    
    return false;
}

self.addEventListener('install', (event) => {
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    if (request.method !== 'GET') {
        return;
    }
    
    if (!shouldCache(request)) {
        return;
    }
    
    if (url.pathname.startsWith('/_next/static/')) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    event.respondWith(staleWhileRevalidate(request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        return new Response('Offline', { status: 503 });
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => {
        if (cached) {
            return cached;
        }
        return new Response('Offline', { status: 503 });
    });
    
    return cached || fetchPromise;
}

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        
        if (cached) {
            return cached;
        }
        
        return new Response('Offline', { status: 503 });
    }
}
