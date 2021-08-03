<template>
  <div class="toastMessages">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<style scoped lang="scss">
.toastMessages {
  z-index: 1500;
  position: fixed;
  top: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>


<script>
import Toast from "@/components/Toast.vue";

export default {
  components: { Toast },
  data() {
    return {
      messages: [], // 存放回饋標題、樣式、內容
    };
  },
  inject: ["emitter"],
  mounted() {
    // 接收回饋訊息，並存入this.messages
    this.emitter.on("push-message", (message) => {
      const { style = "success", title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
