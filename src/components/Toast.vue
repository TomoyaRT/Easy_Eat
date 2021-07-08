<template>
  <div class="toast" v-if="toastActive === true">
    <div :class="{'toast-status-success': msg.style === 'success'}"></div>
    <div class="toast-content">{{ msg.title }}</div>
    <i class="bi bi-x-octagon" @click="toastActive = false"></i>
  </div>
</template>

<style scoped lang="scss">
.toast {
  opacity: 1;
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #cacaca;
  border-radius: 5px;
  background-color: #fff;
  padding: 0rem 0.5rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  transition: opacity .5s;

  .toast-status-success {
    width: 20px;
    height: 20px;
    border-radius: 30%;
    background-color: rgb(34, 175, 22);
    margin-right: 0.5rem;
  }

  .toast-content {
    flex: 10;
    font-size: 0.8rem;
    font-weight: bold;
    color: #464646;
  }

  .bi-x-octagon {
    flex: 1;
  }
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
    }, 5000);
  },
};
</script>
