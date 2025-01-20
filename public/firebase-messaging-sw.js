importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Firebase の設定情報をここに記述
firebase.initializeApp({
  apiKey: "AIzaSyA-kpaHoCYnE7bNNGuLlNtikTKkwt97Sz4",
  authDomain: "push-notification-sample-cc5b4.firebaseapp.com",
  projectId: "push-notification-sample-cc5b4",
  storageBucket: "push-notification-sample-cc5b4.firebasestorage.app",
  messagingSenderId: "689806237170",
  appId: "1:689806237170:web:c294dbfe6a5d2345989f6b",
  measurementId: "G-604YNM1BW7",
});

// Messaging を初期化
const messaging = firebase.messaging();

// Push 通知イベント
self.addEventListener('push', function (event) {
  var data = {};
  if (event.data) {
    data = event.data.json();
  }
  var title = data.notification.title;
  var message = data.notification.body;
  event.waitUntil(
    self.registration.showNotification(title, {
      body: message
    })
  );
});