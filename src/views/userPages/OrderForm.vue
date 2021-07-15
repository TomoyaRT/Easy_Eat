<template>
  <div class="user-page-order-form">
    <!-- 訂單表單頁面容器 -->
    <div class="order-form-container">
      <CheckoutFlowchart :flowchartStatus="flowchartStatus" />
      <!-- 表單容器 -->
      <div class="order-form">
        <div class="order-form-title">{{ formTitle }}</div>
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
        <PaymentMethod
          :class="{ 'payment-method-active': btnStatus === 'paymentForm' }"
          @change-form-step="changeFormStep"
          @update-form-title="updateFormTitle"
        />
        <OrdererForm
          :class="{
            'orderer-information-active': btnStatus === 'ordererForm',
          }"
          @change-form-step="changeFormStep"
          @update-form-title="updateFormTitle"
          @send-order-form-data="getFormData"
        />
        <RecipientForm
          :class="{
            'recipient-information-active': btnStatus === 'recipientForm',
          }"
          @change-form-step="changeFormStep"
          @update-form-title="updateFormTitle"
          :orderer-form-data="ordererFormData"
          @create-order="createOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import areaList from "@/assets/json/areaList";
import ShoppingCartList from "../../components/userPages/ShoppingCartList.vue";
import CheckoutFlowchart from "../../components/userPages/CheckoutFlowchart.vue";
import PaymentMethod from "../../components/userPages/PaymentMethod.vue";
import OrdererForm from "../../components/userPages/OrdererForm.vue";
import RecipientForm from "../../components/userPages/RecipientForm.vue";

export default {
  name: 'OrderForm',
  inject: ["emitter"],
  props: {
    shoppingCartProducts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    ShoppingCartList,
    CheckoutFlowchart,
    PaymentMethod,
    OrdererForm,
    RecipientForm,
  },
  data() {
    return {
      form: {
        user: {
          name: "",
          address: "",
          tel: "",
          email: "",
        },
        message: "",
      },
      areaList, // 縣市鄉鎮區資料
      selectCountyIndex: null,
      selectRegionIndex: null,
      ordererFormData: {},
      flowchartStatus: "OrderForm", // 表單流程圖樣式
      btnStatus: "paymentForm", // 訂單資料的三大按鈕
      shoppingCartProductList: {carts:[]}, // 購物車資料
      formTitle: '付款方式',
    };
  },
  watch: {
    shoppingCartProducts() {
      this.shoppingCartProductList = this.shoppingCartProducts;
    }
  },
  methods: {
    // 更新表單標題
    updateFormTitle(title) {
      this.formTitle = title;
    },
    // 取得元件內表單資料，並整理到本元件data內。
    getFormData(data) {
      this.ordererFormData = data;
      this.form.user = data.user;
      this.form.message = data.message;
      this.selectCountyIndex = data.ordererCountySelectIndex;
      this.selectRegionIndex = data.ordererRegionSelectIndex;
    },
    // 變動步驟
    changeFormStep(targetStep) {
      this.btnStatus = targetStep;
    },
    // 建立訂單
    createOrder(form) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`;
      // 將地址做組合
      const county = this.areaList[form.recipientCountySelectIndex].county;
      const region =
        this.areaList[form.recipientCountySelectIndex].region[
          form.recipientRegionSelectIndex
        ].split(" ");
      // 將地址重新整合到 user.address
      form.user.address = `${region[1]}${county}${region[0]}${form.user.address}`;

      // 發送API
      vm.$http.post(api, { data: form }).then((response) => {
        if (response.data.success) {
          // 跳轉到 確認付款的頁面
          vm.$router.push(`/usercheckout/${response.data.orderId}`);
        }
      });
    },
  },
  created() {
    // 重新取得資料
    this.$emit('update-shopping-cart-products');
  },
  mounted() {
    // 重新整理、關閉頁面時，瀏覽器預設的提醒訊息。
    window.onbeforeunload = () => {
        return '';
    };
  },
  beforeUnmount() {
    // 清除onbeforeunload監聽
    window.onbeforeunload = null;
  },
};
</script>