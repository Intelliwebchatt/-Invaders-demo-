// Service Worker for Kelley Accounting & Tax Service PWA
// Version 1.0

const CACHE_NAME = 'kelley-accounting-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const urlsToCache = [
    '/',
    '/about/',
    '/services/',
    '/resources/',
    '/contact/',
    '/css/styles.css',
    '/js/main.js',
    '/images/logo.svg',
    '/images/icon-192.png',
    '/images/icon-512.png',
    '/manifest.json',
    OFFLINE_URL
];

// Cache critical external resources
const externalResources = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
    'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDTbtXK-F2qC0s.woff2'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('[SW] Install event');
    
    event.waitUntil(
        Promise.all([
            // Cache local resources
            caches.open(CACHE_NAME).then(cache => {
                console.log('[SW] Caching local resources');
                return cache.addAll(urlsToCache);
            }),
            
            // Cache external resources with error handling
            caches.open(CACHE_NAME + '-external').then(cache => {
                console.log('[SW] Caching external resources');
                return Promise.all(
                    externalResources.map(url => {
                        return fetch(url, {
                            mode: 'cors',
                            credentials: 'omit'
                        }).then(response => {
                            if (response.ok) {
                                return cache.put(url, response);
                            }
                        }).catch(error => {
                            console.warn('[SW] Failed to cache external resource:', url, error);
                        });
                    })
                );
            })
        ]).then(() => {
            // Force activation of new service worker
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[SW] Activate event');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME && 
                            cacheName !== CACHE_NAME + '-external' &&
                            cacheName !== CACHE_NAME + '-runtime') {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Take control of all pages
            self.clients.claim()
        ])
    );
});

// Fetch event - handle requests with different strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // Handle different types of requests
    if (url.origin === location.origin) {
        // Same origin requests - use cache-first strategy for assets
        if (isStaticAsset(url.pathname)) {
            event.respondWith(cacheFirstStrategy(request));
        } else {
            // HTML pages - use network-first strategy
            event.respondWith(networkFirstStrategy(request));
        }
    } else {
        // External resources - use cache-first with network fallback
        event.respondWith(cacheFirstStrategy(request));
    }
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
    try {
        // Try cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If not in cache, fetch from network and cache
        const networkResponse = await fetch(request);
        
        // Only cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME + '-runtime');
            // Clone the response since it can only be consumed once
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('[SW] Cache-first strategy failed:', error);
        
        // For images, return a placeholder
        if (request.destination === 'image') {
            return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="#f0f0f0"/><text x="100" y="75" text-anchor="middle" fill="#666" font-family="Arial, sans-serif" font-size="14">Image unavailable</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
            );
        }
        
        throw error;
    }
}

// Network-first strategy for HTML pages
async function networkFirstStrategy(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        // Cache successful HTML responses
        if (networkResponse.ok && request.headers.get('accept').includes('text/html')) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', error);
        
        // Fall back to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If requesting an HTML page and nothing in cache, show offline page
        if (request.headers.get('accept').includes('text/html')) {
            const offlineResponse = await caches.match(OFFLINE_URL);
            if (offlineResponse) {
                return offlineResponse;
            }
        }
        
        throw error;
    }
}

// Helper function to determine if a URL is a static asset
function isStaticAsset(pathname) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ico'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Background sync for form submissions (future enhancement)
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    // This would handle offline form submissions
    console.log('[SW] Syncing contact form submissions');
    
    try {
        // Retrieve stored form data from IndexedDB
        // Send to server when connection is restored
        // Remove from local storage after successful submission
    } catch (error) {
        console.error('[SW] Form sync failed:', error);
    }
}

// Push notification handling (future enhancement)
self.addEventListener('push', event => {
    if (!event.data) {
        return;
    }
    
    const data = event.data.json();
    
    const options = {
        body: data.body,
        icon: '/images/icon-192.png',
        badge: '/images/badge-72.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/',
            timestamp: Date.now()
        },
        actions: [
            {
                action: 'view',
                title: 'View',
                icon: '/images/view-icon.png'
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: '/images/dismiss-icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        const url = event.notification.data.url || '/';
        
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then(clientList => {
                // Check if there's already a window open
                for (const client of clientList) {
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
        );
    }
});

// Handle service worker updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync for cache updates (future enhancement)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'cache-update') {
        event.waitUntil(updateCriticalResources());
    }
});

async function updateCriticalResources() {
    console.log('[SW] Updating critical resources in background');
    
    try {
        const cache = await caches.open(CACHE_NAME);
        const criticalUrls = ['/', '/services/', '/contact/'];
        
        await Promise.all(
            criticalUrls.map(async url => {
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        await cache.put(url, response);
                    }
                } catch (error) {
                    console.warn('[SW] Failed to update:', url, error);
                }
            })
        );
    } catch (error) {
        console.error('[SW] Background sync failed:', error);
    }
}

// Error handling for uncaught errors
self.addEventListener('error', event => {
    console.error('[SW] Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('[SW] Unhandled promise rejection:', event.reason);
});

console.log('[SW] Service Worker loaded successfully');
