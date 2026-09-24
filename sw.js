// Service worker de despedida.
// Ate 2026-09 o app do Vox vivia neste endereco (voxcharmai.com) e registrou
// um service worker aqui. O app mudou pra app.voxcharmai.com e este endereco
// virou a landing. Quem ja tinha aberto o app aqui ainda carrega o SW antigo:
// este arquivo o substitui, apaga o cache dele (o video da intro etc.) e se
// desregistra. Nao toca em IndexedDB nem localStorage: os dados de quem usava
// o app continuam intactos neste endereco, so o cache some.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
  })());
});
