import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheFirst, CacheOnly, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies'

// constants

const DAY_IN_SECONDS = 24 * 60 * 60
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365

// plugins

const cacheableResponsePlugin = (statuses = [200]) => new CacheableResponsePlugin({ statuses })

const expirationPlugin = (maxEntries = 1024, maxAgeSeconds = MONTH_IN_SECONDS) => new ExpirationPlugin({ maxEntries, maxAgeSeconds })

const networkTimeoutSeconds = 10

// interfaces

interface StrategyRoute {
    path: RegExp | string,
    strategy: StaleWhileRevalidate | CacheFirst | NetworkFirst | NetworkOnly | CacheOnly
}

// routes

const strategyRoutes: StrategyRoute[] = [
    {
        path: /.*some-path-as-regex.*/,
        strategy: new NetworkFirst({
            cacheName: 'some-cache-name',
            plugins: [cacheableResponsePlugin([200]), expirationPlugin(20, DAY_IN_SECONDS)],
            networkTimeoutSeconds
        })
    }
]

// exports

export { strategyRoutes }
