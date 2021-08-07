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
        :products-length="productsLength"
        :orders-length="ordersData.ordersNum"
        :coupons-length="couponsData.couponsNum"
        :total-income="totalIncome"
        @change-navbar-page-title="changeNavbarPageTitle"
        @change-navbar-btn-title="changeNavbarBtnTitle"
        @change-current-page="changeCurrentPage"
      ></router-view>
    </div>
    <!-- Loading -->
    <Loading
      :active="isLoading"
      :background-color="loadingObj.bgc"
      :loader="loadingObj.style"
      :color="loadingObj.color"
      :opacity="loadingObj.opacity"
      :height="loadingObj.height"
      :width="loadingObj.width"
    ></Loading>
  </div>
</template>

<script>
import emitter from "@/methods/emitter"; // 引入mitt套件(類似Vue2 Event Bus功能)
import ToastMessages from "../components/ToastMessages.vue"; // 引入提示訊息元件
import Sidebar from "../components/adminPages/Sidebar.vue";
import Navbar from "../components/adminPages/Navbar.vue";
import LoadingConfiguration from "../mixins/LoadingConfiguration";

export default {
  mixins: [LoadingConfiguration],
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
      currentPage: "AdminHome", // Sidebar 當前顯示頁面
      navbarPageTitle: "", // Navbar 頁面標題
      navbarOrderBtnTitle: "", // Navbar 按鈕文字
      productsLength: 0, // 目前庫存商品數

      ordersData: {
        page: 1, // 當前API的分頁頁數
        pageNum: 0, // 當前API分頁的訂單數
        ordersArray: [], // 訂單總陣列
        ordersNum: 0, // 訂單總數
      },

      couponsData: {
        page: 1, // 當前API的分頁頁數
        pageNum: 0, // 當前API分頁的訂單數
        couponsArray: [], // 訂單總陣列
        couponsNum: 0, // 訂單總數
      },

      totalIncome: 0, // 目前的總獲利
    };
  },
  methods: {
    // 更改Sidebar分頁
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
    // 取得目前庫存商品數量
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.productsLength = Object.keys(res.data.products).length;
          this.isLoading = false;
        }
      });
    },
    // 取得當前分頁的訂單數量
    getOrders() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.ordersData.page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          // 組合並儲存訂單總陣列
          this.ordersData.ordersArray = this.ordersData.ordersArray.concat(
            res.data.orders
          );
          // 當前分頁的訂單數量
          this.ordersData.pageNum = res.data.orders.length;
          // 訂單API判斷函式
          this.ordersAPIManager();
        } else {
          // 此處若失敗，可能是沒有訂單了。直接顯示已儲存的陣列數量
          this.ordersData.ordersNum = this.ordersData.ordersArray.length;
          // 計算出目前總獲利
          this.getTotalIncome();
          this.isLoading = false;
        }
      });
    },
    // 訂單API判斷函式
    ordersAPIManager() {
      if (this.ordersData.pageNum === 10) {
        this.ordersData.page += 1;
        this.getOrders();
      } else {
        // 此處若失敗，可能是沒有訂單了。直接顯示已儲存的陣列數量
        this.ordersData.ordersNum = this.ordersData.ordersArray.length;
        // 計算出目前總獲利
        this.getTotalIncome();
        this.isLoading = false;
      }
    },
    // 取得當前分頁的優惠券數量
    getCoupons() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${this.couponsData.page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          // 組合並儲存訂單總陣列
          this.couponsData.couponsArray = this.couponsData.couponsArray.concat(
            res.data.coupons
          );
          // 當前分頁的訂單數量
          this.couponsData.pageNum = res.data.coupons.length;
          // 訂單API判斷函式
          this.couponsAPIManager();
        } else {
          // 此處若失敗，可能是沒有訂單了。直接顯示已儲存的陣列數量
          this.couponsData.couponsNum = this.couponsData.couponsArray.length;
          this.isLoading = false;
        }
      });
    },
    // 優惠券API判斷函式
    couponsAPIManager() {
      if (this.couponsData.pageNum === 10) {
        this.couponsData.page += 1;
        this.getCoupons();
      } else {
        // 此處若失敗，可能是沒有訂單了。直接顯示已儲存的陣列數量
        this.couponsData.couponsNum = this.couponsData.couponsArray.length;
        this.isLoading = false;
      }
    },
    // 取得 目前已付款訂單的總獲利
    getTotalIncome() {
      this.isLoading = true;
      if (this.ordersData.ordersNum > 0) {
        this.totalIncome = this.ordersData.ordersArray
          // 篩選出 已付款訂單
          .filter((order) => {
            return order.is_paid;
          })
          // 將訂單的總付款金額，重組成一個新的陣列
          .map((order) => {
            return order.total;
          })
          // 將陣列中的值，全部相加起來。
          .reduce((a, b) => {
            return a + b;
          })
          // 將總金額做四捨五入
          .toFixed(0);
      } else {
        this.totalIncome = 0;
      }

      this.isLoading = false;
    },
  },
  created() {
    // 驗證登入狀態
    this.loginVerification();
    // 取得當前頁面(適用於剛登入進來、重新整理)
    this.currentPage = this.$route.name;
    // 取得庫存商品總數
    this.getProducts();
    // 取得新增訂單總數
    this.getOrders();
    // 取得庫存優惠券總數
    this.getCoupons();
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
