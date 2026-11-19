// Imported by the generated service worker (vite.config.ts → workbox.importScripts): shows push notifications and opens the app when one is tapped.
self.addEventListener('push', (e) => {
  let d = {}
  try { d = e.data ? e.data.json() : {} } catch { d = { body: e.data && e.data.text() } }
  e.waitUntil(self.registration.showNotification(String(d.title || 'Lemontree').slice(0, 80), {
    body: String(d.body || '').slice(0, 160),
    tag: d.tag || 'lemontree',
    icon: 'icon-192.png',
    badge: 'favicon-32.png',
    data: { url: d.url || '' },
  }))
})
self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  const target = new URL(e.notification.data && e.notification.data.url || '', self.registration.scope).href
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    for (const c of all) { if ('focus' in c) { try { await c.navigate(target) } catch (_) { /* cross-origin guard */ } return c.focus() } }
    return self.clients.openWindow(target)
  })())
})
