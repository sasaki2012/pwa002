<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <button id="confirm">通知の許可を取得する</button> -->
    <!-- <button id="send">通知を送信する</button> -->
  </div>
</template>

<script>
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";


import { messaging, getToken, onMessage } from "@/firebase";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    // // Firebase configuration
    // const firebaseConfig = {
    //   apiKey: "AIzaSyA-kpaHoCYnE7bNNGuLlNtikTKkwt97Sz4",
    //   authDomain: "push-notification-sample-cc5b4.firebaseapp.com",
    //   projectId: "push-notification-sample-cc5b4",
    //   storageBucket: "push-notification-sample-cc5b4.firebasestorage.app",
    //   messagingSenderId: "689806237170",
    //   appId: "1:689806237170:web:c294dbfe6a5d2345989f6b",
    //   measurementId: "G-604YNM1BW7",
    // };

    // // Initialize Firebase
    // const app = initializeApp(firebaseConfig);

    // // Request notification permission and fetch token
    // const requestNotificationPermission = () => {
    //   if (!("Notification" in window)) {
    //     alert("このブラウザーはデスクトップ通知には対応していません。");
    //   } else if (Notification.permission !== "denied") {
    //     Notification.requestPermission().then((permission) => {
    //       console.log(permission);
    //       const messaging = getMessaging(app);
    //       getToken(messaging, {
    //         vapidKey:
    //           "BOdwVfQbieXMwPlWEc7pBYDu9chE4gQOVhmaqo15PNk6UQEr1uJ7MAm7agdMUfRmAdlTJ2rKzLu7t9cBAxzpz6M",
    //       })
    //         .then((token) => {
    //           if (token) {
    //             console.log("token", token);
    //             document.getElementById("output").textContent = token;
    //           } else {
    //             console.log("登録トークンがありません。生成する許可をリクエストします。");
    //           }
    //         })
    //         .catch((err) => {
    //           console.log("getToken Error", err);
    //         });
    //     });
    //   }
    // };

    // // Automatically request notification permission on page load
    // requestNotificationPermission();

    this.requestPermission();
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      // 必要に応じて通知を表示
      const title = payload.notification.title;
      const options = {
        body: payload.notification.body,
      };
      new Notification(title, options);
    });

    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          console.log("Service worker registered.");
        })
        .catch((error) => {
          console.warn("Service worker error.", error);
        });
    }
  },
  methods: {
    async requestPermission() {
      try {
        // 通知の許可をリクエスト
        const status = await Notification.requestPermission();
        if (status === "granted") {
          console.log("Notification permission granted.");

          // トークンを取得
          const token = await getToken(messaging, {
            vapidKey: "BOdwVfQbieXMwPlWEc7pBYDu9chE4gQOVhmaqo15PNk6UQEr1uJ7MAm7agdMUfRmAdlTJ2rKzLu7t9cBAxzpz6M"
          });
          console.log("FCM Token:", token);

          // サーバーにトークンを送信して登録するなどの処理を実行
        } else {
          console.warn("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error getting notification permission:", error);
      }
    },
  },
};
</script>