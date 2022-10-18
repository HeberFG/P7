const STATIC_CACHE_NAME = 'appShell';
const INMUTABLE_CACHE_NAME = 'cacheInmutable';
const DYNAMIC_CACHE_NAME = 'dynamicCache';

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const promiseCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        //addAll es una promesa
        return cache.addAll(
            [
                '/P7/',
                '/P7/index.html',
            ]
        );
    })

    const promiseCacheInmutable = caches
        .open(INMUTABLE_CACHE_NAME)
        .then((cache) => {
            return cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
            ]);
        })

    event.waitUntil(Promise.all([promiseCache, promiseCacheInmutable]));

})

self.addEventListener('fetch', event =>{
    const respCache = caches.match(event.request)
    event.respondWith(respCache);
});