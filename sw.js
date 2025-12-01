// Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_GuillermoVargasPWA';

// ficheros a cachear en la aplicación
var urlsToCache = [
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/1024.png',
    './img/512.png',
    './img/384.png',
    './img/256.png',
    './img/128.png',
    './img/96.png',
    './img/64.png',
    './img/32.png',
    './img/16.png'
];

// Evento install
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    );
});

// Evento activate
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                return fetch(e.request);
            })
    );
});


// ----------------------------------------------------
// 🔔 NOTIFICACIONES PUSH (CLIENTE → CLIENTE)
// ----------------------------------------------------

// Permite que la notificación abra tu PWA cuando se toca
self.addEventListener("notificationclick", event => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true })
            .then(clientList => {
                // Si ya hay una pestaña abierta, la enfocamos
                for (const client of clientList) {
                    if (client.url.includes("/") && "focus" in client) {
                        return client.focus();
                    }
                }
                // Si no hay pestañas, abrimos una nueva
                return clients.openWindow("./");
            })
    );
});

// (Opcional) Manera limpia de mostrar notificaciones desde el SW
self.addEventListener("push", event => {
    const data = event.data ? event.data.json() : {};

    self.registration.showNotification(data.title || "Nueva notificación", {
        body: data.body || "",
        icon: data.icon || "img/16.png",
        badge: "img/16.png",
        vibrate: [200, 100, 200]
    });
});
