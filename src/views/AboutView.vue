<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button id="confirm">通知の許可を取得する</button>
    <button id="send">通知を送信する</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {
    // 通知の許可
    const confirmButton = document.getElementById("confirm");
    if (confirmButton) {
      confirmButton.addEventListener(
        "click",
        this.requestNotificationPermission
      );
    }
    // ServiceWorkerの登録
    window.addEventListener("load", () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("sw.js")
          .then((registration) => console.log("registered", registration))
          .catch((error) => console.log("error", error));
      }
    });

    // 通知の送信
    document.getElementById("send").addEventListener("click", () => {
      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.active.postMessage("プッシュ通知を確認しました。");
        });
      }
    });
  },
  methods: {
    requestNotificationPermission() {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
        alert(permission);
      });
    },
  },
};
</script>
