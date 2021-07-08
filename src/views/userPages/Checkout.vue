<template>
  <div class="user-page-checkout">
    <div class="checkout-container">
      <CheckoutFlowchart :flowchartStatus="flowchartStatus" />
      <div class="checkout">
        <div class="checkout-title">確認付款</div>
        <!-- 訂單區域(下拉式) -->
        <button
          type="button"
          class="shopping-cart-order-btn"
          @click="emitter.emit('switch-order')"
        >
          購物車訂單
          <i class="bi bi-caret-down-fill"></i>
        </button>
        <ShoppingCartList :shopping-cart-products="shoppingCartProductList" />
        <div class="customer-checkout-container">
          <div class="customer-container">
            <div class="customer-title">姓名</div>
            <div class="customer-content">{{ orderData.user.name }}</div>
          </div>
          <div class="customer-container">
            <div class="customer-title">手機</div>
            <div class="customer-content">{{ orderData.user.tel }}</div>
          </div>
          <div class="customer-container">
            <div class="customer-title">電子信箱</div>
            <div class="customer-content">{{ orderData.user.email }}</div>
          </div>
          <div class="customer-container">
            <div class="customer-title">地址</div>
            <div class="customer-content">{{ orderData.user.address }}</div>
          </div>
          <div class="customer-container">
            <div class="customer-title">備註訊息</div>
            <div class="customer-content">{{ orderData.message }}</div>
          </div>
          <div class="customer-container">
            <div class="customer-title">付款方式</div>
            <div class="customer-content">{{ paymentMethod }}</div>
          </div>
          <div class="customer-container">
            <div class="customer-title">付款狀態</div>
            <div class="customer-payment-completed" v-if="orderData.is_paid">
              付款完成
            </div>
            <div class="customer-unpaid" v-else>尚未付款</div>
          </div>
        </div>
        <button type="button" class="payment-btn" @click="payOrder">
          確認付款
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutFlowchart from "../../components/userPages/CheckoutFlowchart.vue";
import ShoppingCartList from "../../components/userPages/ShoppingCartList.vue";

export default {
  name: 'Checkout',
  inject: ["emitter"],
  props: {
    shoppingCartProducts: {
      type: Object,
      default() {
        return {};
      },
    },
    // 付款方式
    paymentMethod: {
      type: String,
      default() {
        return '';
      }
    },
  },
  components: {
    CheckoutFlowchart,
    ShoppingCartList,
  },
  data() {
    return {
      orderId: "",
      orderData: {
        user: {},
      },
      flowchartStatus: "Checkout",
      shoppingCartProductList: {carts:[]}, // 購物車資料
    };
  },
  methods: {
    // 取得此筆訂單資料
    getOrderData() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${vm.orderId}`;

      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.orderData = response.data.order;
        }
      });
    },
    // 付款功能
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${vm.orderId}`;

      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/userpayment/${vm.orderId}`);
        }
      });
    },
  },
  created() {
    // 從網址取出訂單id
    this.orderId = this.$route.params.orderId;
    // 取得訂單資料
    this.getOrderData();
    // 更新資料
    this.$emit('update-shopping-cart-products');
    // 將資料拷貝做渲染使用
    this.shoppingCartProductList = this.shoppingCartProducts;
  },
};
</script>
