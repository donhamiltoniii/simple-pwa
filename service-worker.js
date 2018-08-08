const cacheName = 'simple-pwa-v1'
const filesToCache = []

self.addEventListener('install', event => {
	console.log('[ServiceWorker] Install')
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('[ServiceWorker] Caching app shell')
			return cache.addAll(filesToCache)
		})
	)
})

self.addEventListener('activate', event => {
	console.log('[ServiceWorker] Activate')
})
