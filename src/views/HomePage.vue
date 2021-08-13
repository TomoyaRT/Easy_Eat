<template>
  <div>
    <Navbar
      @open-favorite-list-modal="favoriteListModal = true"
      :favorite-products="favoriteProducts"
      @update-favorite-products="getFavoriteProducts"
      :shopping-cart-products="shoppingCartProducts"
      :current-page-name="currentPageName"
      @change-current-page-style="changeCurrentPageStyle"
    />
    <ToastMessages />
    <FavoriteListModal
      :class="{ 'modal-active': favoriteListModal }"
      @close-favorite-list-modal="favoriteListModal = false"
      :favorite-products="favoriteProducts"
      @update-favorite-products="getFavoriteProducts"
      :shopping-cart-products="shoppingCartProducts"
      @update-shopping-cart-products="getShoppingCartProducts"
      @change-current-page-style="changeCurrentPageStyle"
    />
    <router-view
      :favorite-products="favoriteProducts"
      @update-favorite-products="getFavoriteProducts"
      :shopping-cart-products="shoppingCartProducts"
      @update-shopping-cart-products="getShoppingCartProducts"
      :payment-method="paymentMethod"
      @change-current-page-style="changeCurrentPageStyle"
    ></router-view>
    <Footer />
    <GoTopButton class="user-page-gotop-button" :class="{'active': goTopStatus}" />
  </div>
</template>

<script>
import emitter from "../methods/emitter"; // 引入mitt套件(類似Vue2 Event Bus功能)
import Navbar from "../components/userPages/Navbar.vue";
import Footer from "../components/userPages/Footer.vue";
import ToastMessages from "../components/ToastMessages.vue";
import FavoriteListModal from "../components/userPages/FavoriteListModal.vue";
import GoTopButton from '../components/userPages/GoTopButton.vue';

export default {
  components: {
    Navbar,
    Footer,
    ToastMessages,
    FavoriteListModal,
    GoTopButton,
  },
  data() {
    return {
      paymentMethod: "", // 付款方式
      favoriteListModal: false, // 我的最愛模板 狀態
      shoppingCartProducts: {}, // API購物車資料
      favoriteProducts: [], // localStorage我的最愛資料
      goTopStatus: false,
      currentPageName: 'Home',
    };
  },
  // 讓所有HomePage的子元件都能使用到 emitter
  provide() {
    return {
      emitter,
    };
  },
  methods: {
    // 取得 localStorage我的最愛資料
    getFavoriteProducts() {
      // 存入Data變數
      this.favoriteProducts = JSON.parse(localStorage.getItem("addedFavoriteProducts"));
      // 如無資料，將null轉型成[]
      if (this.favoriteProducts === null) this.favoriteProducts = [];
    },
    // 取得 API購物車資料
    getShoppingCartProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;

      vm.$http.get(api).then((response) => {
        // 存入Data變數
        vm.shoppingCartProducts = response.data.data;
      });
    },
    // 顯示至頂按鈕
    activeGoTop() {
      window.addEventListener("scroll", () => {
        let scroll = Math.floor(window.pageYOffset);
        if (scroll > 300) {
          this.goTopStatus = true;
        } else {
          this.goTopStatus = false;
        }
      });
    },
    // 改變當前頁面樣式
    changeCurrentPageStyle(name) {
      this.currentPageName = name;
    }
  },
  created() {
    // 監聽 至頂按鈕的顯示
    this.activeGoTop();
    // 接收 付款方式的字串
    emitter.on("payment-method", (payment) => { this.paymentMethod = payment; });
    // 取得 localStorage我的最愛資料
    this.getFavoriteProducts();
    // 取得 當前頁面名稱
    this.currentPageName = this.$route.name;
  },
};
</script>
