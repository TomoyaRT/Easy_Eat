<template>
  <div class="user-page-payment">
    <div class="payment-container">
      <CheckoutFlowchart :flowchartStatus="flowchartStatus" />
      <div class="payment">
        <div class="payment-title">付款完成</div>
        <div class="payment-information-container">
          <div class="payment-item-container">
            <div class="payment-item-title">訂單編號</div>
            <div class="payment-item-content">{{ orderData.id }}</div>
          </div>
          <div class="payment-item-container">
            <div class="payment-item-title">商店名稱</div>
            <div class="payment-item-content">Easy Eat</div>
          </div>
          <div class="payment-item-container">
            <div class="payment-item-title">訂單金額</div>
            <div class="payment-item-content">
              ${{ $filters.currency(orderData.total) }}
            </div>
          </div>
          <div class="payment-item-container">
            <div class="payment-item-title">訂單日期</div>
            <div class="payment-item-content">
              {{
                new Date(parseInt(orderData.create_at) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ")
              }}
            </div>
          </div>
          <div class="payment-item-container">
            <div class="payment-item-title">付款日期</div>
            <div class="payment-item-content">
              {{
                new Date(parseInt(orderData.paid_date) * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ")
              }}
            </div>
          </div>
          <div class="payment-item-container">
            <div class="payment-item-title">付款方式</div>
            <div class="payment-item-content">
              {{ paymentMethod }}
            </div>
          </div>
          <div class="payment-item-container">
            <div class="payment-item-title">付款狀態</div>
            <div class="payment-completed" v-if="orderData.is_paid">
              付款完成
            </div>
            <div class="unpaid" v-else>尚未付款</div>
          </div>
          <div class="payment-item-container" v-if="orderData.message === ''">
            <div class="payment-item-title">備註訊息</div>
            <div class="payment-item-content">{{ orderData.message }}</div>
          </div>
        </div>
        <router-link
          :to="{ name: 'Home' }"
          class="go-back-btn"
          @click="$emit('change-current-page-style', 'Home')"
          >回首頁</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import OrderData from "../../mixins/userPages/OrderData";
import CheckoutFlowchart from "../../components/userPages/CheckoutFlowchart.vue";

export default {
  mixins: [OrderData],
  components: {
    CheckoutFlowchart,
  },
  props: {
    // 付款方式
    paymentMethod: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      flowchartStatus: "Payment",
    };
  },
  created() {
    // 使用者回饋訊息
    this.$swal.fire({
      position: "center",
      icon: "success",
      title: "恭喜您，付款成功!",
      showConfirmButton: false,
      timer: 1500,
    });
  },
};
</script>
