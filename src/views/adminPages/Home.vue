<template>
  <div class="admin-page-home">
    <div class="home-container">
      <div class="information-card-group-container">
        <!-- 卡片一 -->
        <div class="card">
          <div class="card-main-container">
            <div class="card-icon">
              <i class="bi bi-inbox-fill"></i>
            </div>
            <div class="card-content">
              <div class="number">{{ productsLength }}</div>
              <div class="title">庫存商品</div>
            </div>
          </div>
          <router-link
            class="view-more-container"
            :to="{ name: 'AdminProducts' }"
            @click="$emit('change-current-page', 'AdminProducts')"
            ><div class="title">查看更多</div>
            <i class="bi bi-arrow-right-circle"></i
          ></router-link>
        </div>
        <!-- 卡片二 -->
        <div class="card">
          <div class="card-main-container">
            <div class="card-icon">
              <i class="bi bi-cart3"></i>
            </div>
            <div class="card-content">
              <div class="number">{{ orderList?.length }}</div>
              <div class="title">新增訂單</div>
            </div>
          </div>
          <router-link
            class="view-more-container"
            :to="{ name: 'AdminOrders' }"
            @click="$emit('change-current-page', 'AdminOrders')"
            ><div class="title">查看更多</div>
            <i class="bi bi-arrow-right-circle"></i
          ></router-link>
        </div>
        <!-- 卡片三 -->
        <div class="card">
          <div class="card-main-container">
            <div class="card-icon">
              <i class="bi bi-receipt"></i>
            </div>
            <div class="card-content">
              <div class="number">{{ couponsLength }}</div>
              <div class="title">庫存優惠券</div>
            </div>
          </div>
          <router-link
            class="view-more-container"
            :to="{ name: 'AdminCoupons' }"
            @click="$emit('change-current-page', 'AdminCoupons')"
            ><div class="title">查看更多</div>
            <i class="bi bi-arrow-right-circle"></i
          ></router-link>
        </div>
        <!-- 卡片四 -->
        <div class="card">
          <div class="card-main-container">
            <div class="card-icon">
              <i class="bi bi-bank"></i>
            </div>
            <div class="card-content">
              <div class="number">${{ $filters.currency(getTotalIncome) }}</div>
              <div class="title">總獲利額</div>
            </div>
          </div>
          <router-link
            class="view-more-container"
            :to="{ name: 'AdminOrders' }"
            @click="$emit('change-current-page', 'AdminOrders')"
            ><div class="title">查看更多</div>
            <i class="bi bi-arrow-right-circle"></i
          ></router-link>
        </div>
      </div>
      <div class="chart-group-container">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 使用父元件的 emitter元件
  inject: ["emitter"],
  data() {
    return {
      productsLength: 0, // 庫存商品數量
      orderList: [], // API訂單資料
      couponsLength: 0, // 優惠券數量
    };
  },
  computed: {
    // 取得 總獲利的值
    getTotalIncome() {
      if (this.orderList.length > 0) {
        return this.orderList
          .filter((order) => {
            return order.is_paid;
          })
          .map((order) => {
            return order.total;
          })
          .reduce((a, b) => {
            return a + b;
          });
      } else {
        return 0;
      }
    },
  },
  methods: {
    // 取得庫存商品數量
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.productsLength = Object.keys(res.data.products).length;
        }
      });
    },
    // 取得新增訂單數量
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orderList = res.data.orders;
        }
      });
    },
    // 取得優惠券數量
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;

      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.couponsLength = res.data.coupons.length;
          this.isLoading = false;
        }
      });
    },
    // 返回前台首頁
    goUserHomePage() {
      // 使用者提示訊息
      this.$swal
        .fire({
          title: "再次確認",
          text: "是否要回到前台的首頁",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "取消",
          confirmButtonText: "確定",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire("轉移成功!", "您已回到網站首頁", "success");
            this.$router.push("/");
          }
        });
    },
  },
  created() {
    // 更改Navbar頁面標題
    this.$emit("change-navbar-page-title", "資訊儀表板");
    // 更改Navbar表單按鈕標題
    this.$emit("change-navbar-btn-title", "回前台首頁");
    // 取得庫存商品數
    this.getProducts();
    // 取得訂單數量
    this.getOrders();
    // 取得優惠券數量
    this.getCoupons();
    // 監聽Navbar的 新增按鈕
    this.emitter.on("open-modal", (status) => {
      if (status === "資訊儀表板") {
        this.goUserHomePage();
      }
    });
  },
};
</script>
