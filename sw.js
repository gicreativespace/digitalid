const CACHE_NAME = 'digital-id-v21'; // Version incremented
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './assets/sample-profile.jpg',
  './assets/icon-192x192.png', // Added Icons
  './assets/icon-512x512.png'  // Added Icons
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Forces new SW to activate immediately
  );
});

// Activate Event (Cleans up old caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
