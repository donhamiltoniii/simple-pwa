var cachePrefix = 'simple-pwa-v'
var cacheNumber = 0
var cacheName = cachePrefix + cacheNumber
var filesToCache = ['/', '/index.html', '/app.js', '/style.css']

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
