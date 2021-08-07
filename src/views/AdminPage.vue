<template>
  <div class="admin-page-container">
    <!-- 遮罩板 Sidebar-->
    <div
      class="admin-page-sidebar-overlay"
      :class="{ 'sidebar-overlay-active': sidebarStatus }"
      @click="sidebarStatus = false"
    ></div>
    <!-- Sidebar -->
    <Sidebar
      class="admin-page-sidebar"
      @close-sidebar="sidebarStatus = false"
      :class="{ 'sidebar-active': sidebarStatus }"
      :current-page="currentPage"
      @change-current-page="changeCurrentPage"
    />
    <!-- Main -->
    <div class="admin-page-main">
      <Navbar
        class="admin-page-navbar"
        @open-sidebar="sidebarStatus = true"
        :navbar-title="navbarPageTitle"
        :navbar-btn-title="navbarOrderBtnTitle"
      />
      <ToastMessages />
      <router-view
        class="admin-page-products"
        @change-navbar-page-title="changeNavbarPageTitle"
        @change-navbar-btn-title="changeNavbarBtnTitle"
        @change-current-page="changeCurrentPage"
      ></router-view>
    </div>
  </div>
</template>

<script>
import emitter from "@/methods/emitter"; // 引入mitt套件(類似Vue2 Event Bus功能)
import ToastMessages from "../components/ToastMessages.vue"; // 引入提示訊息元件
import Sidebar from "../components/adminPages/Sidebar.vue";
import Navbar from "../components/adminPages/Navbar.vue";

export default {
  components: {
    ToastMessages,
    Sidebar,
    Navbar,
  },
  // 讓所有AdminPage的子元件都能使用到 emitter
  provide() {
    return {
      emitter,
    };
  },
  data() {
    return {
      sidebarStatus: false, // Sidebar元件的樣式開關
      navbarPageTitle: "", // Navbar 頁面標題
      navbarOrderBtnTitle: "", // Navbar 按鈕文字
      currentPage: 'AdminHome', // 當前頁面
    };
  },
  methods: {
    // 更改當前頁面樣式
    changeCurrentPage(name) {
      this.currentPage = name;
    },
    // 更改Navbar標題
    changeNavbarPageTitle(title) {
      this.navbarPageTitle = title;
    },
    // 更改Navbar按鈕
    changeNavbarBtnTitle(title) {
      this.navbarOrderBtnTitle = title;
    },
    // 驗證使用者，是否維持登入的狀態。
    loginVerification() {
      // 取出Token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)ecToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      // 發送API時，自動夾帶Token在Header裡面。
      this.$http.defaults.headers.common.Authorization = token;
      // 發送API，驗證是否維持登入狀態。
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      this.$http.post(api, this.user).then((res) => {
        // 如屬未登入狀態，即轉址到Login頁面。
        if (!res.data.success) {
          this.$router.push({ name: "Login" });
        }
      });
    },
  },
  created() {
    this.loginVerification();
    this.currentPage = this.$route.name;
  },
};
</script>

<style scoped lang="scss">
.admin-page-container {
  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  }

  // Sidebar 遮罩板
  .admin-page-sidebar-overlay {
    opacity: 0;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #00000099;
    transition: all 0.5s;
  }

  // Main (管理頁面-通用樣式)
  .admin-page-main {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  // 開始 Sidebar樣式
  .sidebar-active {
    transform: translateX(0%);
  }

  // 開啟 Sidebar 遮罩板
  .sidebar-overlay-active {
    opacity: 1;
    z-index: 10;
  }
}
</style>
