/* eslint-disable no-undef */
/* global importScripts, workbox */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

// Workboxの読み込み確認
if (workbox) {
  console.log("Workbox loaded successfully.");
} else {
  console.error("Workbox failed to load.");
}

// __WB_MANIFEST を使ってキャッシュ対象を指定
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

self.addEventListener(
  "notificationclick",
  function (event) {
    event.notification.close();
    const url = event.notification.data.url || "/";
    clients.openWindow(url);
  },
  false
);
