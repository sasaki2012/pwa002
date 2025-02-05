<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { messaging, getToken, onMessage } from "@/firebase";

export default {
  name: 'HomeView',
  components: {
    HelloWorld
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
  mounted() {

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

    this.requestPermission();
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      const title = payload.notification.title;
      const options = {
        body: payload.notification.body,
      };
      new Notification(title, options);
    });
  },
}
</script>
