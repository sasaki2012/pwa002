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
          .register("./service-worker.js")
          .then((registration) => console.log("registered", registration))
          .catch((error) => console.log("error", error));
      }
    });

    // 通知の送信
    document.getElementById("send").addEventListener("click", () => {
      if (Notification.permission === "granted") {
        console.log(navigator.serviceWorker);
        navigator.serviceWorker.ready.then((registration) => {
          console.log("Service Worker ready", registration);
          // メッセージをService Workerに送信
          registration.active.postMessage("プッシュ通知を確認しました。");
        });
      } else {
        alert("通知の許可が必要です");
      }
    });
  },
  methods: {
    requestNotificationPermission() {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
        alert(
          permission === "granted"
            ? "通知の許可が完了しました。"
            : "通知の許可が拒否されました。"
        );
      });
    },
  },
};
</script>
