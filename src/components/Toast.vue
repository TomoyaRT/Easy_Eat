<template>
  <div class="toast-container" v-if="toastActive === true">
    <div
      class="toast"
      :class="{
        'status-success': msg.style === 'success',
        'status-danger': msg.style === 'danger',
      }"
    >
      <div class="toast-title">{{ msg.title }}</div>
      <i class="bi bi-x-octagon" @click="toastActive = false"></i>
    </div>
    <div class="toast-supplement" v-if="msg.style === 'danger'">
      <div class="supplement-content">{{ msg.content }}</div>
      <i class="bi bi-exclamation-circle"></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.toast,
.toast-supplement {
  box-sizing: border-box;
  opacity: 1;
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 0 0.5rem 0 1rem;
  margin-bottom: 1rem;
  transition: opacity 0.5s;

  .toast-title,
  .supplement-content {
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1.5px;
    color: #fff;
  }

  .bi-x-octagon,
  .bi-exclamation-circle {
    font-size: 1.2rem;
    color: #fff;
  }

  .bi-x-octagon {
    cursor: pointer;
  }
}

.status-success {
  background-color: #22af16;
}

.status-danger {
  background-color: #af1644;
}

// API串接失敗的補充說明
.toast-supplement {
  background-color: #FFCC29;
}
</style>

<script>
export default {
  data() {
    return {
      toastActive: false,
    };
  },
  props: ["msg"],
  created() {
    this.toastActive = true;
    setTimeout(() => {
      this.toastActive = false;
    }, 2500);
  },
};
</script>
