<template>
  <div class="admin-page-navbar">
    <!-- 手機版 -->
    <div class="navbar-mobile-container">
      <div class="navbar-header-container">
        <i class="bi bi-list" @click="$emit('open-sidebar')"></i>
        <h1 class="navbar-title">{{ pageTitle }}</h1>
        <i
          class="bi bi-plus-lg"
          :class="{'orders-page-hidden': orderBtnTitle === '隱藏按鈕'}"
          @click="emitter.emit('open-modal', pageTitle)"
        ></i>
      </div>
      <div class="navbar-search-container">
        <i class="bi bi-search"></i>
        <input class="navbar-search" type="input" placeholder="搜尋" />
      </div>
    </div>
    <!-- 電腦版 -->
    <div class="navbar-desktop-container">
      <h1 class="navbar-title">{{ pageTitle }}</h1>
      <div class="navbar-search-container">
        <i class="bi bi-search"></i>
        <input class="navbar-search" type="input" placeholder="搜尋" />
      </div>
      <button
        type="button"
        class="navbar-button"
        :class="{'orders-page-hidden': orderBtnTitle === '隱藏按鈕'}"
        @click="emitter.emit('open-modal', pageTitle)"
      >
        {{ orderBtnTitle }}
      </button>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      pageTitle: "商品管理",
      orderBtnTitle: "建立商品",
    };
  },
  inject: ["emitter"],
  created() {
    // 更改頁面標題
    this.emitter.on("change-page-title", (title) => {
      this.pageTitle = title;
    });
    // 更改標題按鈕
    this.emitter.on("change-order-btn-title", (title) => {
      this.orderBtnTitle = title;
    });
  },
};
</script>
