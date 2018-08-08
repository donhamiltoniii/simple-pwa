var cacheName = 'simple-pwa-v1'
var filesToCache = ['index.html', 'app.js', 'style.css']

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
	event.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(
				keyList.map(key => {
					if (key !== cacheName) {
						console.log('[ServiceWorker] removing old cache', key)
						return caches.delete(key)
					}
				})
			)
		})
	)
	return self.clients.claim()
})

self.addEventListener('fetch', event => {
	console.log('[ServiceWorker] Fetch', event.request.url)
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request)
		})
	)
})
