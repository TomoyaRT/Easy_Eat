<template>
  <div class="user-page-navbar">
    <div class="navbar-container">
      <!-- 手機版 -->
      <div class="mobile-navbar">
        <div class="navbar-left-side">
          <i class="bi bi-list" @click="menuStatus = true"></i>
          <router-link to="/">
            <img src="../../assets/Logo.png" alt="網站的Logo"
          /></router-link>
        </div>
        <div class="navbar-right-side">
          <div class="admin-login-icon-container">
            <router-link to="/login"
              ><i class="bi bi-person-circle"></i
            ></router-link>
          </div>
          <div
            class="favorite-list-icon-container"
            @click="$emit('open-favorite-list-modal')"
          >
            <div
              class="favorite-list-number-point"
              v-if="favoriteProductList.length !== 0"
            >
              {{ favoriteProductList.length }}
            </div>
            <i class="bi bi-suit-heart-fill"></i>
          </div>
          <div class="shopping-cart-icon-conatiner">
            <div
              class="favorite-list-number-point"
              v-if="shoppingCartProductList.length !== 0"
            >
              {{ shoppingCartProductList.length }}
            </div>
            <router-link to="/usershoppingcart"
              ><i class="bi bi-cart4"></i
            ></router-link>
          </div>
        </div>
      </div>
      <!-- 手機版的漢堡選單 -->
      <div
        class="circle-overlay-background"
        :class="{ 'overlay-background-active': menuStatus }"
      ></div>
      <div
        class="navbar-menu-container"
        :class="{ 'menu-container-active': menuStatus }"
      >
        <i class="bi bi-x-lg" @click="menuStatus = false"></i>
        <div class="navbar-menu">
          <router-link
            :class="{ 'title-active': menuStatus }"
            to="/"
            @click="menuStatus = false"
            >首頁</router-link
          >
          <router-link
            :class="{ 'title-active': menuStatus }"
            to="/userproducts"
            @click="menuStatus = false"
            >本店商品</router-link
          >
          <router-link
            :class="{ 'title-active': menuStatus }"
            to="/"
            @click="menuStatus = false"
            >超值優惠</router-link
          >
        </div>
      </div>
      <!-- 平板1024、電腦版 -->
      <div class="tablet-desktop-navbar">
        <div class="navbar-left-side">
          <router-link to="/">
            <img src="../../assets/Logo.png" alt="網站的Logo"
          /></router-link>
          <router-link to="/">首頁</router-link>
          <router-link to="/userproducts">本店商品</router-link>
          <router-link to="/">超值優惠</router-link>
        </div>
        <div class="navbar-right-side">
          <div class="admin-login-icon-container">
            <router-link to="/login"
              ><i class="bi bi-person-circle"></i
            ></router-link>
          </div>
          <div
            class="favorite-list-icon-container"
            @click="$emit('open-favorite-list-modal')"
          >
            <div
              class="favorite-list-number-point"
              v-if="favoriteProductList.length !== 0"
            >
              {{ favoriteProductList.length }}
            </div>
            <i class="bi bi-suit-heart-fill"></i>
          </div>
          <div class="shopping-cart-icon-conatiner">
            <div
              class="favorite-list-number-point"
              v-if="shoppingCartProductList.length !== 0"
            >
              {{ shoppingCartProductList.length }}
            </div>
            <router-link to="/usershoppingcart"
              ><i class="bi bi-cart4"></i
            ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  inject: ["emitter"],
  props: {
    favoriteProducts: {
      type: Array,
      default() {
        return [];
      },
    },
    shoppingCartProducts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      shoppingCartDataLength: 0, // 購物車資料長度
      menuStatus: false,
      favoriteProductList: this.favoriteProducts, // 我的最愛資料
      shoppingCartProductList: [], // 購物車資料
    };
  },
  watch: {
    favoriteProducts() {
      this.favoriteProductList = this.favoriteProducts;
    },
    shoppingCartProducts() {
      this.shoppingCartProductList = this.shoppingCartProducts.carts;
    }
  },
  methods: {
    // 取得localStorage的資料
    updateLocalStorageData() {
      this.localstorageFavoriteProductList = this.localstorageFavoriteProducts;
      this.localstorageShoppingCartProductList = this.localstorageShoppingCartProducts;
    },
    // 取得購物車資料
    getShoppindCartData() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;

      vm.$http.get(api).then((response) => {
        vm.shoppingCartDataLength = response.data.data.carts.length;
        vm.$emit('shopping-cart-data', response.data.data);
      });
    },
  },
  
  created() {
    // 取得localStorage的資料
    this.updateLocalStorageData();
    this.getShoppindCartData();
  },
};
</script>
