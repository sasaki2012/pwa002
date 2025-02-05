<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      token: ""
    };
  },
  mounted() {
    this.requestNotificationPermission();
  },
  methods: {
    requestNotificationPermission() {
      if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          console.log("Service worker registered.");
        })
        .catch((error) => {
          console.warn("Service worker error.", error);
        });

      if (!("Notification" in window)) {
        alert("このブラウザは通知に対応していません。");
        return;
      }

      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          this.getFCMToken();
        } else {
          console.log("通知の許可が拒否されました。");
        }
      });

      
    }
    },
    getFCMToken() {
      const firebaseConfig = {
        apiKey: "AIzaSyA-kpaHoCYnE7bNNGuLlNtikTKkwt97Sz4",
        authDomain: "push-notification-sample-cc5b4.firebaseapp.com",
        projectId: "push-notification-sample-cc5b4",
        storageBucket: "push-notification-sample-cc5b4.firebasestorage.app",
        messagingSenderId: "689806237170",
        appId: "1:689806237170:web:c294dbfe6a5d2345989f6b",
        measurementId: "G-604YNM1BW7",
      };

      // Firebase 初期化
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      // FCM トークン取得
      getToken(messaging, { 
        vapidKey: "BOdwVfQbieXMwPlWEc7pBYDu9chE4gQOVhmaqo15PNk6UQEr1uJ7MAm7agdMUfRmAdlTJ2rKzLu7t9cBAxzpz6M"
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("FCMトークン:", currentToken);
            this.token = currentToken;
          } else {
            console.log("登録トークンがありません。許可をリクエストしてください。");
          }
        })
        .catch((err) => {
          console.error("トークン取得エラー:", err);
        });
    }
  },
}
</script>
