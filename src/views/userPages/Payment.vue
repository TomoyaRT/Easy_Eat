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
        <button
          type="button"
          class="go-back-btn"
          @click="$router.push({ name: 'Home' })"
        >
          回首頁
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutFlowchart from "../../components/userPages/CheckoutFlowchart.vue";

export default {
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
      orderId: "",
      orderData: {},
      flowchartStatus: "Payment",
    };
  },
  methods: {
    // 取得此筆訂單資料
    getOrderData() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${vm.orderId}`;

      vm.$http.get(api).then((response) => {
        console.log("取得訂單資料", response);
        vm.orderData = response.data.order;
      });
    },
  },
  created() {
    // 從網址取出訂單id
    this.orderId = this.$route.params.orderId;
    // 取得訂單資料
    this.getOrderData();
  },
};
</script>
