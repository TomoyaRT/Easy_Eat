<template>
  <div class="admin-page-sidebar">
    <!-- Logo容器 -->
    <div class="sidebar-logo-container">
      <i class="bi bi-x-lg" @click="$emit('close-sidebar')"></i>
      <router-link :to="{ name: 'Home' }">
        <img
          src="../../assets/Logo2.png"
          alt="網站的Logo"
          class="sidebar-logo"
        />
      </router-link>
    </div>
    <!-- Admin 分頁容器 -->
    <div class="admin-page-group">
      <router-link
        to="/adminproducts"
        class="admin-page-title"
        @click="$emit('close-sidebar')"
      >
        <i class="bi bi-bag-check-fill"></i>
        商品管理
      </router-link>
      <router-link
        to="/adminorders"
        class="admin-page-title"
        @click="$emit('close-sidebar')"
      >
        <i class="bi bi-file-text"></i>
        訂單管理
      </router-link>
      <router-link
        to="/admincoupons"
        class="admin-page-title"
        @click="$emit('close-sidebar')"
      >
        <i class="bi bi-receipt"></i>
        優惠券管理
      </router-link>
    </div>
    <!-- 登出容器 -->
    <div class="sidebar-logout-container">
      <i class="bi bi-arrow-left"></i>
      <span class="logout" @click.prevent="logout">登出</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 登出功能
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;

      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          console.log(res);
          this.$router.push({ name: "Login" });
        }
      });
    },
  },
};
</script>
