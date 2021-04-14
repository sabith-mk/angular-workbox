import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { setCatchHandler } from 'workbox-routing'
import { strategyRoutes } from './service-routes'
import { googleFontsCache, imageCache } from 'workbox-recipes'
import { catchHandler } from './catch-handler'

declare const self: any

const componentName = 'Service Worker'

const DEBUG_MODE = location.hostname === 'localhost'

const SERVICE_WORKER_VERSION = '0.0.1'

if (DEBUG_MODE) {
    console.log(`${componentName}:: Service worker version ${SERVICE_WORKER_VERSION} loading...`)
}

cleanupOutdatedCaches()

const assetsToCache = self.__WB_MANIFEST
precacheAndRoute(assetsToCache)

if (DEBUG_MODE) {
    console.log(`${componentName}:: Assets that will be cached: `, assetsToCache)
}

const defaultRouteHandler = createHandlerBoundToURL('/index.html')
registerRoute(new NavigationRoute(defaultRouteHandler))

setCatchHandler(catchHandler)

strategyRoutes.forEach(route => registerRoute(route.path, route.strategy))

googleFontsCache({})
imageCache({cacheName: 'image'})

self.addEventListener('install', (e: any) => {
    self.skipWaiting()
})

self.addEventListener('message', (event: { data: any; type: any; ports: any }) => {
    console.log(event)
    if (event && event.data && event.data.type) {
        if ('GET_VERSION' === event.data.type) {
            if (DEBUG_MODE) {
                console.log(`${componentName}:: Returning the service worker version: ${SERVICE_WORKER_VERSION}`)
            }
            event.ports[0].postMessage(SERVICE_WORKER_VERSION)
        }

        if ('SKIP_WAITING' === event.data.type) {
            if (DEBUG_MODE) {
                console.log(`${componentName}:: Skipping waiting...`)
            }
            self.skipWaiting()
        }

        if ('CLIENTS_CLAIM' === event.data.type) {
            if (DEBUG_MODE) {
                console.log(`${componentName}:: Claiming clients and cleaning old caches`)
            }
            self.clients.claim()
        }
    }
})