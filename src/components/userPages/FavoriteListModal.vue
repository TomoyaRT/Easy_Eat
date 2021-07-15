<template>
  <div class="user-page-favorite-list-modal">
    <div class="favorite-list-container">
      <div class="favorite-list-header-container">
        <div class="favorite-list-title">我的最愛</div>
        <i class="bi bi-x-lg" @click="$emit('close-favorite-list-modal')"></i>
      </div>
      <div class="show-favorite-products" v-if="favoriteProductList.length > 0">
        <div
          class="favorite-list-main-container"
          v-for="product in favoriteProductList"
          :key="product.id"
        >
          <div class="product-img-container">
            <img :src="product.imgUrl" alt="商品圖片" class="product-img" />
          </div>
          <div class="product-name-and-price-container">
            <div class="product-name">
              <p>{{ product.title }}</p>
            </div>
            <div class="product-price">${{ $filters.currency(product.price) }}</div>
          </div>
          <div class="product-btn-group">
            <i
              class="bi bi-cart-check-fill"
              :class="{
                'btn-disable': shoppingCartProductList.carts
                  .map((item) => {
                    return item.product_id;
                  })
                  .includes(product.id),
              }"
              @click="addToCart(product.id)"
              v-if="
                shoppingCartProductList.carts
                  .map((item) => {
                    return item.product_id;
                  })
                  .includes(product.id)
              "
            ></i>
            <i
              class="bi bi-cart-plus-fill"
              @click="addToCart(product.id)"
              v-else
            ></i>
            <i
              class="bi bi-trash-fill"
              @click="
                localStorageFavoriteProductListManager('刪除單一商品', product)
              "
            ></i>
          </div>
        </div>
      </div>
      <div
        class="no-favorite-products-found"
        v-if="favoriteProductList.length === 0"
      >
        <div class="no-favorite-products-container">
          <div class="no-favorite-products-left-side">
            <div class="no-favorite-products-title">目前沒有商品</div>
            <router-link
              :to="{ name: 'UserProducts' }"
              @click.prevent="favoriteProductList"
              >去逛逛</router-link
            >
          </div>
          <img
            class="no-favorite-products-right-side"
            src="../../../public/images/empty-favorite-list.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- Loading -->
    <Loading :active="isLoading"></Loading>
  </div>
</template>

<script>
import FavoriteDataAndShoppingCartData from '../../mixins/userPages/FavoriteDataAndShoppingCartData';

export default {
  name: "FavoriteModal",
  inject: ["emitter"],
  mixins: [FavoriteDataAndShoppingCartData],
  data() {
    return {
      isLoading: false, // 全域Loading 開關
    };
  },
  methods: {
    // 加入購物車
    addToCart(id, qty = 1) {
      // 如果尚未加入購物車
      if (
        !this.shoppingCartProductList.carts
          .map((item) => {
            return item.product_id;
          })
          .includes(id)
      ) {
        this.isLoading = true; // 開啟Loading元件
        const vm = this;
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
        const cart = {
          product_id: id,
          qty,
        };

        vm.$http.post(api, { data: cart }).then((response) => {
          vm.isLoading = false; // 關閉Loading元件
          // 使用者回饋訊息
          vm.$httpMessageState(response, "加入購物車");
          // 更新資料、渲染畫面
          vm.$emit("update-shopping-cart-products");
        });
      } else {
        this.$swal.fire("此商品以加入購物車");
      }
    },
    // localStorage我的最愛資料
    localStorageFavoriteProductListManager(status, product) {
      if (status === "刪除單一商品") {
        // 取得重複物件的索引
        let targetIndex = this.favoriteProductList
          .map((item) => {
            return item.id;
          })
          .indexOf(product.id);
        // 依據索引位置刪除該物件
        this.favoriteProductList.splice(targetIndex, 1);
        // 儲存商品資料在localStorage儲存庫
        localStorage.setItem(
          "addedFavoriteProducts",
          JSON.stringify(this.favoriteProductList)
        );
        // 更新資料、渲染畫面
        this.$emit("update-favorite-products");
      } else {
        // 刪除localStorage儲存庫的全部商品資料
        localStorage.removeItem("addedFavoriteProducts");
        // 更新資料、渲染畫面
        this.$emit("update-favorite-products");
      }
    },
    // 關閉 我的最愛模板
    closeFavoriteProductsModal() {
      // 關閉模板樣式
      this.$emit("close-favorite-list-modal");
    },
  },
};
</script>
