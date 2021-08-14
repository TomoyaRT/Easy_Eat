<template>
  <div class="admin-page-order-modal">
    <div class="order-modal-container">
      <div class="order-modal-header">
        <div class="header-title">訂單資訊</div>
        <i class="bi bi-x-lg" @click="$emit('close-order-modal')"></i>
      </div>
      <div class="order-modal-main">
        <!-- 訂單細節 -->
        <div class="order-detail-container">
          <div class="order-detail-title">訂單細節</div>
          <div class="order-detail-content-container">
            <div class="title">訂單編號</div>
            <div class="content">{{ order.id }}</div>
          </div>
          <div class="order-detail-content-container">
            <div class="title">下單時間</div>
            <div class="content">
              {{
                order.create_at !== undefined
                  ? new Date(order.create_at * 1000).toISOString().split("T")[0]
                  : "下單時間有誤"
              }}
            </div>
          </div>
          <div class="order-detail-content-container">
            <div class="title">付款時間</div>
            <div class="content">
              {{
                order.is_paid
                  ? new Date(order.paid_date * 1000).toISOString().split("T")[0]
                  : "屬尚未付款狀態"
              }}
            </div>
          </div>
          <div class="order-detail-content-container">
            <div class="title">付款狀態</div>
            <div class="content">{{ order.is_paid ? "已付款" : "未付款" }}</div>
          </div>
          <div class="order-detail-content-container">
            <div class="title">總金額</div>
            <div class="content">${{ $filters.currency(order.total) }}</div>
          </div>
        </div>
        <!-- 用戶資料 -->
        <div class="user-information-container">
          <div class="user-information-title">用戶資料</div>
          <div class="user-information-content-container">
            <div class="title">姓名</div>
            <div class="content">{{ order.user?.name }}</div>
          </div>
          <div class="user-information-content-container">
            <div class="title">Email</div>
            <div class="content">{{ order.user?.email }}</div>
          </div>
          <div class="user-information-content-container">
            <div class="title">電話</div>
            <div class="content">{{ order.user?.tel }}</div>
          </div>
          <div class="user-information-content-container">
            <div class="title">地址</div>
            <div class="content">{{ order.user?.address }}</div>
          </div>
          <div class="user-information-content-container">
            <div class="title">備註</div>
            <div class="content">
              {{ order.message === undefined ? "顧客無留言" : order.message }}
            </div>
          </div>
        </div>
        <!-- 選購商品 -->
        <div
          class="purchased-products-container"
          v-for="item in order.products"
          :key="item.product.id"
        >
          <div class="purchased-products-title">選購商品</div>
          <div class="purchased-products-content-container">
            <div class="title">{{ item.product.title }}</div>
            <div class="qty-unit">{{ item.qty }} / {{ item.product.unit }}</div>
            <div class="price">${{ $filters.currency(item.final_total) }}</div>
          </div>
        </div>
      </div>
      <div class="order-modal-footer">
        <button type="button" @click="$emit('close-order-modal')">取消</button>
        <button type="button" @click="$emit('close-order-modal')">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      order: {},
    };
  },
  watch: {
    orderData() {
      this.order = this.orderData;
    },
  },
};
</script>
