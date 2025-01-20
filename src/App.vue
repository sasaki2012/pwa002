<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
<script>
import { messaging, getToken, onMessage } from "@/firebase";

export default {
  name: "App",
  mounted() {
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
            vapidKey: "YOUR_VAPID_KEY"
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
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
