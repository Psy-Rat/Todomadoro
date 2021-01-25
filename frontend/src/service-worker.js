/* eslint-disable no-undef */
self.__precacheManifest = [].concat(self.__precacheManifest || [])

workbox.setConfig({ debug: true })

workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute(self.__precacheManifest)

self.addEventListener('message', e => {
  if (e.data.action == 'skipWaiting') self.skipWaiting()
})

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gscatic).com/(.*)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ],
    method: 'GET',
    cacheableResponse: { statuses: [0, 200] }
  })
)
