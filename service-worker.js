const C="ucwm-v4-real-calendar";
const F=["./","./index.html","./manifest.json","./icon.svg"];
self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c=>c.addAll(F)));
});
self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener("fetch",e=>{
  e.respondWith(fetch(e.request).then(r=>{
    const clone=r.clone();
    caches.open(C).then(c=>c.put(e.request,clone));
    return r;
  }).catch(()=>caches.match(e.request)));
});