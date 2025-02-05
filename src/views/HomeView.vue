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
      firebaseConfig: null,
    };
  },
  async mounted() {
    await this.loadFirebaseConfig();
    if (this.firebaseConfig) {
      this.requestNotificationPermission();
    }
  },
  methods: {
    // Firebase 設定をJSONから取得
    async loadFirebaseConfig() {
      try {
        const response = await fetch("/firebaseConfig.json");
        this.firebaseConfig = await response.json();
        console.log("Firebase設定取得:", this.firebaseConfig);
      } catch (error) {
        console.error("Firebase設定の取得に失敗:", error);
      }
    },
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
    // FCMトークン取得処理あ
    async getFCMToken() {
      // Firebase 初期化あa
      if (!this.firebaseConfig) {
        console.error("Firebase 設定が取得できていません");
        return null;
      }

      const app = initializeApp(this.firebaseConfig);
      const messaging = getMessaging(app);
      try {
         // FCM トークン取得
        const currentToken = await getToken(messaging, { 
          vapidKey: this.firebaseConfig.vapidKey
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
