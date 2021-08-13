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
            <div class="customer-content">
              {{ orderData.user.name }}
            </div>
          </div>
          <div class="customer-container">
            <div class="customer-title">手機</div>
            <div class="customer-content">
              {{ orderData.user.tel }}
            </div>
          </div>
          <div class="customer-container">
            <div class="customer-title">電子信箱</div>
            <div class="customer-content">
              {{ orderData.user.email }}
            </div>
          </div>
          <div class="customer-container">
            <div class="customer-title">地址</div>
            <div class="customer-content">
              {{ orderData.user.address }}
            </div>
          </div>
          <div class="customer-container">
            <div class="customer-title">備註訊息</div>
            <div class="customer-content">
              {{ orderData.message }}
            </div>
          </div>
          <div class="customer-container">
            <div class="customer-title">付款方式</div>
            <div class="customer-content">
              {{ paymentMethod }}
            </div>
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
import OrderData from "../../mixins/userPages/OrderData";
import CheckoutFlowchart from "../../components/userPages/CheckoutFlowchart.vue";
import ShoppingCartList from "../../components/userPages/ShoppingCartList.vue";
import LoadingConfiguration from "../../mixins/LoadingConfiguration";
import GetShoppingCartData from "../../mixins/userPages/GetShoppingCartData";

export default {
  name: "Checkout",
  inject: ["emitter"],
  mixins: [OrderData, LoadingConfiguration, GetShoppingCartData],
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
        return "";
      },
    },
  },
  components: {
    CheckoutFlowchart,
    ShoppingCartList,
  },
  data() {
    return {
      flowchartStatus: "Checkout",
      shoppingCartProductList: { carts: [] }, // 購物車資料
    };
  },
  methods: {
    // 付款功能
    payOrder() {
      this.isLoading = true;
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${vm.orderId}`;

      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          this.isLoading = false;
          vm.$router.push(`/userpayment/${vm.orderId}`);
        }
      });
    },
  },
  created() {
    // 將資料拷貝做渲染使用
    this.shoppingCartProductList = this.shoppingCartProducts;
  },
  mounted() {
    // 重新整理、關閉頁面時，瀏覽器預設的提醒訊息。
    window.onbeforeunload = () => {
      return "";
    };
  },
  beforeUnmount() {
    // 清除onbeforeunload監聽
    window.onbeforeunload = null;
  },
};
</script>
