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
    // プッシュ通知許可処理
    async requestNotificationPermission() {
      if ("serviceWorker" in navigator) {
        // serviceWorkerの登録
        navigator.serviceWorker
          .register("/service-worker.js")
          .then(() => {
            console.log("Service worker registered.");
          })
          .catch((error) => {
            console.warn("Service worker error.", error);
          });

        // ブラウザが非対応の場合はトークン処理を実行しない
        if (!("Notification" in window)) {
          console.log("ブラウザが非対応の場合はトークン処理を実行しない");
          return;
        }

        // 通知許可されている場合はトークン処理を実行しない
        if (localStorage.getItem("pushNotificationGranted") === "true") {
          console.log("通知許可されている場合はトークン処理を実行しない");
          return;
        }

        // トークン取得、DB登録処理
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // 許可されたらローカルストレージに保存
            this.getFCMToken().then((token) => {
              if (token) {
                localStorage.setItem("pushNotificationGranted", "true");
                console.log("取得したtoken", token);
              }
            });
          } else {
            console.log("通知の許可が拒否されました。");
          }
        });
      }
    },
    // FCMトークン取得処理
    async getFCMToken() {
      // Firebase 初期化あa
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      try {
         // FCM トークン取得
        const currentToken = await getToken(messaging, { 
          vapidKey: firebaseConfig.vapidKey
        });
        if (currentToken) {
          return currentToken;
        } else {
          return null;
        }
      } catch (err) {
        console.error("トークン取得エラー:", err);
        return null;
      }
    },
  },
}
</script>
