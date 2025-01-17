<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="インストールサンプル" />
    <!-- インストールボタン -->
    <button id="btn">インストールButton</button>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {
  // インストールプロンプトイベントを保存する変数
  installPromptEvent = null;

  mounted() {
    window.addEventListener("beforeinstallprompt", this.onBeforeInstallPrompt);

    // #btnをクリックした時にプロンプトを表示
    const btn = document.querySelector("#btn");
    if (btn) {
      btn.addEventListener("click", this.onInstallButtonClick);
    }
  }

  beforeDestroy() {
    // イベントリスナーをクリーンアップ
    window.removeEventListener(
      "beforeinstallprompt",
      this.onBeforeInstallPrompt
    );
  }

  // 'beforeinstallprompt' イベントのハンドラ
  onBeforeInstallPrompt(event) {
    // イベントをキャンセルし、インストールプロンプトが表示されないようにする
    event.preventDefault();

    // イベントを変数に保存
    this.installPromptEvent = event;

    // #btnボタンを活性化
    const btn = document.querySelector("#btn");
    if (btn) {
      btn.disabled = false;
    }
  }

  // インストールボタンがクリックされた時にプロンプトを表示
  onInstallButtonClick() {
    if (this.installPromptEvent) {
      // #btnを非活性に
      const btn = document.querySelector("#btn");
      if (btn) {
        btn.disabled = true;
      }

      // プロンプトを表示
      this.installPromptEvent.prompt();

      // ダイアログの結果を取得
      this.installPromptEvent.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }

        // プロンプトイベントをリセット
        this.installPromptEvent = null;
      });
    }
  }
}
</script>

<style scoped>
/* スタイルを適宜追加 */
</style>
