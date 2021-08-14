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
              <div class="number">{{ ordersLength }}</div>
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
              <div class="number">${{ $filters.currency(totalIncome) }}</div>
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
        <ProductsRankingChart class="order-chart" />
        <OrdersChart class="product-chart" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsRankingChart from "@/components/adminPages/ProductsRankingChart.vue";
import OrdersChart from "@/components/adminPages/OrdersChart.vue";

export default {
  components: {
    ProductsRankingChart,
    OrdersChart,
  },
  props: {
    productsLength: {
      type: Number,
      default() {
        return 0;
      },
    },
    ordersLength: {
      type: Number,
      default() {
        return 0;
      },
    },
    couponsLength: {
      type: Number,
      default() {
        return 0;
      },
    },
    totalIncome: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  // 使用父元件的 emitter元件
  inject: ["emitter"],
  methods: {
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
    // 監聽Navbar的 新增按鈕
    this.emitter.on("open-modal", (status) => {
      if (status === "資訊儀表板") {
        this.goUserHomePage();
      }
    });
  },
};
</script>
