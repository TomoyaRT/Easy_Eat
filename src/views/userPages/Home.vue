<template>
  <!-- 網站首頁 -->
  <div class="user-page-home">
    <!-- 輪播圖 -->
    <div class="carousel">
      <transition-group
        tag="div"
        :name="direction === 'prev' ? 'prev' : 'next'"
        class="carousel-list"
      >
        <img
          v-for="(img, index) in images"
          :key="img.id"
          :src="img.src"
          v-show="index === current"
        />
      </transition-group>
      <div
        class="carousel-btn carousel-btn-prev"
        @click="changePage(current - 1)"
      >
        &#10094;
      </div>
      <div
        class="carousel-btn carousel-btn-next"
        @click="changePage(current + 1)"
      >
        &#10095;
      </div>
      <ul class="carousel-page-list">
        <li
          class="carousel-page-item"
          :class="{ 'carousel-page-item-active': current === 0 }"
          @click="changePage(0)"
        ></li>
        <li
          class="carousel-page-item"
          :class="{ 'carousel-page-item-active': current === 1 }"
          @click="changePage(1)"
        ></li>
        <li
          class="carousel-page-item"
          :class="{ 'carousel-page-item-active': current === 2 }"
          @click="changePage(2)"
        ></li>
        <li
          class="carousel-page-item"
          :class="{ 'carousel-page-item-active': current === 3 }"
          @click="changePage(3)"
        ></li>
        <li
          class="carousel-page-item"
          :class="{ 'carousel-page-item-active': current === 4 }"
          @click="changePage(4)"
        ></li>
      </ul>
    </div>

    <!-- 推薦商品容器 -->
    <div class="recommend-product-container">
      <span class="recommend-product-name">
        <i class="bi bi-hand-thumbs-up-fill"></i>
        優惠特價中
      </span>
      <router-link
        class="recommend-product-link"
        :to="{ name: 'UserProducts' }"
        @click="$emit('change-current-page-style', 'UserProducts')"
        >查看更多 <i class="bi bi-caret-right-fill"></i
      ></router-link>
    </div>
    <!-- 推薦商品列表 -->
    <div class="recommend-product-list">
      <!-- 商品卡片 -->
      <div
        class="product-item-card"
        v-for="cart in displayProducts"
        :key="cart.id"
      >
        <router-link :to="`/userproduct/${cart.id}`">
          <img :src="cart.imageUrl" alt="商品圖片" />
        </router-link>

        <div class="product-item-title">
          <p class="ellipsis">
            {{ cart.title }}
          </p>
        </div>
        <div class="product-price">
          <span class="origin-price"
            >${{ $filters.currency(cart.origin_price) }}</span
          >
          <span class="on-sale-price"
            >${{ $filters.currency(cart.price) }}</span
          >
        </div>
        <div class="card-btn-group">
          <div
            class="favorite-list-btn"
            :class="{
              'favorite-list-btn-disable': favoriteProductList.some((item) => {
                return item.id === cart.id;
              }),
            }"
            @click="localStorageFavoriteProductListManager('更新', cart)"
          >
            <i
              class="bi bi-heart-fill"
              :class="{
                'favorite-btn-disable': favoriteProductList.some((item) => {
                  return item.id === cart.id;
                }),
              }"
              v-if="
                favoriteProductList.some((item) => {
                  return item.id === cart.id;
                })
              "
            ></i>
            <i class="bi bi-heart" v-else></i>
          </div>
          <div
            class="shopping-cart-list-btn"
            :class="{
              'shopping-cart-btn-disable': shoppingCartProductList.carts
                .map((item) => {
                  return item.product_id;
                })
                .includes(cart.id),
            }"
            @click="addToCart(cart.id)"
          >
            <i
              class="bi bi-cart-check-fill"
              v-if="
                shoppingCartProductList.carts
                  .map((item) => {
                    return item.product_id;
                  })
                  .includes(cart.id)
              "
            ></i>
            <i class="bi bi-cart-plus-fill" v-else></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 產品特色 橫幅卡片 -->
    <div class="featured-banner-top">
      <img src="images/04.jpg" alt="橫幅卡片的圖片" />
      <div class="featured-banner-overlay-top">
        <div class="featured-banner-title">
          專注健身有效率<br />生活飲食好均衡
        </div>
        <div class="featured-banner-content">
          疫情期間也享高品質服務<br />下單購買立刻出貨!
        </div>
        <router-link
          :to="{ name: 'UserProducts' }"
          @click="$emit('change-current-page-style', 'UserProducts')"
          class="featured-banner-link"
          >去逛逛</router-link
        >
      </div>
    </div>
    <div class="featured-banner-bottom">
      <img src="images/06.jpg" alt="橫幅卡片的圖片" />
      <div class="featured-banner-overlay-bottom">
        <div class="featured-banner-title">
          飲食均衡顧得好<br />身體健康沒煩惱
        </div>
        <div class="featured-banner-content">
          疫情期間也享高品質服務<br />下單購買立刻出貨!
        </div>
        <router-link
          :to="{ name: 'UserProducts' }"
          @click="$emit('change-current-page-style', 'UserProducts')"
          class="featured-banner-link"
          >去逛逛</router-link
        >
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
import AddToCartAndUpdateFavoriteList from "../../mixins/userPages/AddToCartAndUpdateFavoriteList.js";
import FavoriteDataAndShoppingCartData from "../../mixins/userPages/FavoriteDataAndShoppingCartData";
import LoadingConfiguration from "../../mixins/LoadingConfiguration";
import GetShoppingCartData from "../../mixins/userPages/GetShoppingCartData";

export default {
  name: "Home",
  inject: ["emitter"],
  mixins: [AddToCartAndUpdateFavoriteList, FavoriteDataAndShoppingCartData, LoadingConfiguration, GetShoppingCartData],
  data() {
    return {
      current: 0, //當前圖片
      direction: "", //換頁方向
      changePageBtnStatus: true, // 輪播圖按鈕狀態
      images: [
        { id: 1, src: "images/01.jpg" },
        { id: 2, src: "images/02.jpg" },
        { id: 3, src: "images/03.jpg" },
        { id: 4, src: "images/04.jpg" },
        { id: 5, src: "images/05.jpg" },
      ],
      displayProducts: [], // 展示用的四個特價商品
    };
  },
  methods: {
    // 輪播圖換頁 (手動)
    changePage(index) {
        const vm = this;
        // 暫時關閉 輪播圖換頁事件 1s
        vm.changePageBtnStatus = false;
        // 開啟換頁功能
        setTimeout(function () {
          vm.changePageBtnStatus = true;
        }, 1000);
        // 判斷使用下一頁樣式，還是上一頁的轉場樣式
        vm.direction = index > this.current ? "next" : "prev";
        // 限制換頁的頁數
        vm.current = (index + this.images.length) % this.images.length;
    },
    // 取得商品資料
    getProducts() {
      this.isLoading = true;
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;

      vm.$http.get(api).then((response) => {
        // 篩選出有特價的商品，並擷取前四個做為展示用商品。
        vm.displayProducts = response.data.products
          .filter((item) => {
            return item.origin_price !== item.price;
          })
          .slice(0, 4);

        this.isLoading = false;
      });
    },
  },
  created() {
    // 取得API商品資料
    this.getProducts();
  },
};
</script>
