<template>
  <div
    class="admin-page-navbar"
    :class="{ 'home-page-navbar': pageTitle === '資訊儀表板' }"
  >
    <!-- 手機版 -->
    <div class="navbar-mobile-container">
      <div class="navbar-header-container">
        <i class="bi bi-list" @click="$emit('open-sidebar')"></i>
        <h1 class="navbar-title">{{ pageTitle }}</h1>
        <i
          class="bi bi-house-door"
          @click="emitter.emit('open-modal', pageTitle)"
          v-if="orderBtnTitle === '回前台首頁'"
        ></i>
        <i
          class="bi bi-trash2-fill"
          @click="emitter.emit('open-modal', pageTitle)"
          v-else-if="orderBtnTitle === '清除所有訂單'"
        ></i>
        <i
          class="bi bi-plus-lg"
          @click="emitter.emit('open-modal', pageTitle)"
          v-else
        ></i>
      </div>
    </div>
    <!-- 電腦版 -->
    <div class="navbar-desktop-container">
      <h1 class="navbar-title">{{ pageTitle }}</h1>
      <button
        type="button"
        class="navbar-button"
        :class="{ 'order-page-btn': orderBtnTitle === '清除所有訂單' }"
        @click="emitter.emit('open-modal', pageTitle)"
      >
        {{ orderBtnTitle }}
      </button>
    </div>
  </div>
</template>
 
<script>
export default {
  // 使用父元件的 emitter元件
  inject: ["emitter"],
  props: {
    navbarTitle: {
      type: String,
      default() {
        return "";
      },
    },
    navbarBtnTitle: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      pageTitle: "商品管理",
      orderBtnTitle: "建立商品",
    };
  },
  watch: {
    navbarTitle() {
      this.pageTitle = this.navbarTitle;
    },
    navbarBtnTitle() {
      this.orderBtnTitle = this.navbarBtnTitle;
    },
  },
};
</script>
