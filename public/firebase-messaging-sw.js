importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

self.addEventListener('install', (event) => {
  event.waitUntil(
    fetch('/firebaseConfig.json')
      .then((response) => response.json())
      .then((config) => {
        firebase.initializeApp(config);
        console.log('Firebase initialized with config:', config);
      })
      .catch((error) => console.error('Failed to load firebaseConfig.json:', error))
  );
});

// Firebase Messaging の初期化
self.addEventListener('activate', (event) => {
  event.waitUntil(
    fetch('/firebaseConfig.json')
      .then((response) => response.json())
      .then((config) => {
        firebase.initializeApp(config);
        console.log('Firebase re-initialized with config:', config);
      })
      .catch((error) => console.error('Failed to reload firebaseConfig.json:', error))
  );
});
const messaging = firebase.messaging();

// Push 通知イベント
self.addEventListener('push', function (event) {
  var data = event.data ? event.data.json() : {};
  var title = data.notification?.title || 'Push Notification';
  var message = data.notification?.body || 'You have a new message';

  event.waitUntil(
    self.registration.showNotification(title, {
      body: message
    })
  );
});