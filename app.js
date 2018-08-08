run()

function loadServiceWorker() {
	if ('serviceWorker in navigator') {
		navigator.serviceWorker
			.register('./service-worker.js')
			.then(() => console.log('Service Worker Registered'))
	}
}

function run() {
	loadServiceWorker()
}
