var CACHE_NAME = 'Bootstrap Extra';
var urlsToCache = [
    '/bootstrap-extra/background-image.html',
    '/',
    '/bootstrap-extra/css/bootstrap.css',
    '/bootstrap-extra/css/animation.css',
    '/bootstrap-extra/images/favicon/manifest.json',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
    '/bootstrap-extra/js/bootstrap.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

const yargs = require('yargs')

yargs.command({
         command: 'add',
         describe: 'add new describe',
         handler: function() {
                   console.log("Your command has executed")
         }
})
yargs.parse()