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
import { firebaseConfig } from "@/config/firebaseConfig";


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

        // すでに許可されている場合は `getFCMToken()` を実行しない
        if (localStorage.getItem("pushNotificationGranted") === "true") {
          console.log("プッシュ通知はすでに許可されています。トークン取得をスキップします。");
          return;
        }

        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // 許可されたらローカルストレージに保存
            localStorage.setItem("pushNotificationGranted", "true");
            this.getFCMToken();
          } else {
            console.log("通知の許可が拒否されました。");
          }
        });
      }
    },
    getFCMToken() {
      // Firebase 初期化
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      // FCM トークン取得
      getToken(messaging, { 
        vapidKey: firebaseConfig.vapidKey
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
