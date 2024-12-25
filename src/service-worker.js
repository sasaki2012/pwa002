/* eslint-disable no-undef */
/* global importScripts, workbox */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

// Workbox が正しく読み込まれた場合の処理
if (workbox) {
  console.log("Workbox loaded successfully.");
} else {
  console.error("Workbox failed to load.");
}
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.routing.registerRoute(
  new RegExp("https://api.example.com/.*"),
  new workbox.strategies.NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24, // 1日
      }),
    ],
  })
);
