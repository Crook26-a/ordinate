/* ════════════════════════════════════════════════════════════════
   sw.js — offline cache for the plotting table

   Network-first with a short leash, same as the game: when there's
   signal you always get the newest file, so a fresh upload shows up on
   the next open with no version numbers to remember. With no signal it
   falls back to the cache and opens instantly.

   The editor is one HTML file, so there is very little to keep.
   ════════════════════════════════════════════════════════════════ */

const CACHE = "ordinate-survey";
const TIMEOUT = 2500;
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-512-maskable.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      // allSettled, not all: one missing file must not sink the install
      .then(c => Promise.allSettled(ASSETS.map(u => c.add(new Request(u, { cache: "reload" })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function fromNetwork(req) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("slow")), TIMEOUT);
    fetch(req).then(res => {
      clearTimeout(timer);
      if (res && res.ok && res.type === "basic") {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      }
      resolve(res);
    }, err => { clearTimeout(timer); reject(err); });
  });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fromNetwork(req).catch(() =>
      caches.match(req, { ignoreSearch: true }).then(hit => hit || caches.match("./index.html"))
    )
  );
});
