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
        v-for="order in orderList"
        :key="order.id"
      >
        <div class="purchase-time">
          {{
            order.is_paid
              ? new Date(order.paid_date * 1000).toISOString().split("T")[0]
              : "未付款狀態"
          }}
        </div>
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
          <i
            class="bi bi-eye-fill"
            @click="openModal('檢視訂單', order)"
            v-if="orderEditStatus"
          ></i>
          <i
            class="bi bi-trash"
            @click="openModal('刪除訂單', order)"
            v-else
          ></i>
        </div>
      </div>
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
    <!-- 分頁模板 -->
    <Pagination :pagination="pagination" @change-page="getOrders" />
    <!-- 訂單模板 -->
    <OrderModal
      :class="{ 'modal-active': orderModalStatus }"
      @close-order-modal="orderModalStatus = false"
      :order-data="tempOrder"
    />
    <!-- 刪除模板 -->
    <DeletModal
      :class="{ 'modal-active': deletModalStatus }"
      @close-modal="deletModalStatus = false"
      :delet-modal="tempOrder"
      @delete-product="deleteOrder"
    />
  </div>
</template>

<script>
import OrderModal from "@/components/adminPages/OrderModal.vue";
import AdminPagesUniversal from "@/mixins/adminPages/AdminPagesUniversal";
import LoadingConfiguration from "@/mixins/LoadingConfiguration";

export default {
  mixins: [AdminPagesUniversal, LoadingConfiguration],
  // 區域註冊子元件
  components: {
    OrderModal,
  },
  data() {
    return {
      orderList: {}, // 訂單列表資料
      tempOrder: {}, // 單筆訂單資料(刪除模板用)
      orderEditStatus: true, // 訂單編輯按鈕判斷
      orderModalStatus: false, // 訂單模板 開關
      deletModalStatus: false, // 刪除模板 開關
      orderStatus: "", // 保存目前訂單狀態
    };
  },
  methods: {
    // 取得 API訂單列表資料
    getOrders(page = 1) {
      this.isLoading = true; // 開啟Loading元件
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;

      this.$http.get(api).then((res) => {
        this.isLoading = false; // 關閉Loading元件
        if (res.data.success) {
          this.orderList = res.data.orders;
          this.pagination = res.data.pagination;
        }
      });
    },
    // 打開模板功能
    openModal(status, order) {
      this.orderStatus = status; // 保存目前訂單狀態
      this.tempOrder = { ...order }; // 淺拷貝此筆訂單資料
      status === "檢視訂單"
        ? (this.orderModalStatus = true)
        : (this.deletModalStatus = true);
    },
    // 刪除單筆訂單
    deleteOrder(order) {
      this.isLoading = true; // 開啟Loading元件
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;

      this.$http.delete(api).then((res) => {
        this.isLoading = false; // 關閉Loading元件
        if (res.data.success) {
          this.getOrders();
          this.$emit('update-orders-number');
          this.deletModalStatus = false;
          this.$httpMessageState(res, "該訂單已被刪除");
        }
      });
    },
    // 刪除所有訂單
    deleteAllOrder() {
      this.isLoading = true; // 開啟Loading元件
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;

      vm.$swal
        .fire({
          title: "再次確認",
          text: "是否要刪除所有的訂單資料",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "取消",
          confirmButtonText: "確定刪除",
        })
        .then((result) => {
          if (result.isConfirmed) {
            vm.$http.delete(api).then((res) => {
              this.isLoading = false; // 關閉Loading元件
              if (res.data.success) {
                vm.getOrders();
                this.$emit('update-orders-number');
                vm.$swal.fire("刪除成功!", "你已刪除所有訂單資料", "success");
              }
            });
          } else {
            this.isLoading = false; // 關閉Loading元件
          }
        });
    },
  },
  created() {
    // 更改Navbar頁面標題
    this.$emit("change-navbar-page-title", "訂單管理");
    // 更改Navbar表單按鈕標題
    this.$emit("change-navbar-btn-title", "清除所有訂單");
    // 監聽Navbar的 新增按鈕
    this.emitter.on("open-modal", (status) => {
      if (status === "訂單管理") {
        this.deleteAllOrder();
      }
    });
    // 取得訂單列表資料
    this.getOrders();
  },
};
</script>
