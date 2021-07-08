<template>
  <div class="admin-page-orders">
    <!-- 頁面 -->
    <div class="orders-container">
      <!-- 標題 -->
      <div class="orders-title-container">
        <div class="purchase-time">購買日期</div>
        <div class="customer-email">顧客信箱</div>
        <div class="bought-products">購買款項</div>
        <div class="amounts-payable">應付金額</div>
        <div class="payment-status">付款狀態</div>
        <div class="order-edit-btn-group">
          <i
            class="bi bi-toggle2-off"
            @click="orderEditStatus = true"
            v-if="!orderEditStatus"
          ></i>
          <i
            class="bi bi-toggle2-on"
            @click="orderEditStatus = false"
            v-else
          ></i>
        </div>
      </div>
      <!-- 內容 -->
      <div
        class="orders-content-container"
        v-for="order in orderList.orders"
        :key="order.id"
      >
        <div class="purchase-time">{{ order.is_paid ? new Date(order.paid_date * 1000).toISOString().split('T')[0] : '未付款狀態'  }}</div>
        <div class="customer-email">{{ order.user.email }}</div>
        <div class="bought-products-container">
          <div
            class="bought-products"
            v-for="product in order.products"
            :key="product.id"
          >
            <div class="product-title">{{ `${product.product.title} :` }}</div>
            <div class="product-qty">{{ product.qty }}</div>
            <div class="product-unit">{{ product.product.unit }}</div>
          </div>
        </div>
        <div class="amounts-payable">${{ $filters.currency(order.total) }}</div>
        <div class="payment-paid-status" v-if="order.is_paid">已付款</div>
        <div class="payment-unpaid-status" v-else>尚未付款</div>
        <div class="order-edit-btn-group">
          <i class="bi bi-eye-fill" v-if="!orderEditStatus"></i>
          <i class="bi bi-trash" v-else></i>
        </div>
      </div>
    </div>
    <!-- Loading -->
    <Loading :active="isLoading"></Loading>
    <!-- 分頁模板 -->
    <Pagination :pagination="pagination" @change-page="getOrders" />
    <!-- 訂單模板 -->
    <OrderModal />
  </div>
</template>

<script>
import Pagination from "../../components/adminPages/Pagination.vue";
import OrderModal from "../../components/adminPages/OrderModal.vue";

export default {
  // 區域註冊子元件
  components: {
    Pagination,
    OrderModal,
  },
  // 使用父元件的 emitter元件
  inject: ["emitter"],
  data() {
    return {
      orderList: {}, // 訂單列表資料
      pagination: {}, // 分頁資料
      orderEditStatus: false, // 訂單編輯按鈕判斷
      isLoading: false, // Loading元件(全域)
    };
  },
  methods: {
    // 取得 API訂單列表資料
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading = true; // 開啟Loading元件
      this.$http.get(api).then((res) => {
        this.isLoading = false; // 關閉Loading元件
        if (res.data.success) {
          this.orderList = res.data;
          this.pagination = res.data.pagination;
        }
      });
    },
  },
  created() {
    // 更改Navbar頁面標題
    this.emitter.emit("change-page-title", "訂單管理");
    // 隱藏表單的按鈕
    this.emitter.emit("change-order-btn-title", "隱藏按鈕");
    // 取得訂單列表資料
    this.getOrders();
  },
};
</script>
