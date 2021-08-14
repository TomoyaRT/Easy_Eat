<template>
  <div class="user-page-product">
    <!-- 單一商品容器-->
    <div class="product-container">
      <!-- 商品圖片 -->
      <div class="product-img-container">
        <img :src="product.imageUrl" alt="產品圖片" v-if="productStatus" />
        <div class="overlay-img" v-else></div>
      </div>

      <div class="product-detail-container">
        <!-- 商品標籤 -->
        <div class="product-tag">
          {{ productStatus ? product.category : "類別" }}
        </div>
        <!-- 商品標題 -->
        <h1 class="product-title">
          {{ productStatus ? product.title : "商品名稱" }}
        </h1>
        <!-- 商品原價與售價 -->
        <div class="product-price-container">
          <div class="product-promotional-price">
            ${{ productStatus ? priceCalculation : 0 }}
          </div>
          <div class="product-origin-price">
            {{ productStatus ? originPriceCalculation : "" }}
          </div>
        </div>
        <!-- 營養成分 -->
        <div class="product-nutrient-content">
          <div class="product-nutrition-title">營養成分</div>
          <ul class="nutrient-content">
            <li>
              <div class="content-group">
                <i class="fas fa-fire-alt"></i>
                <span class="content">熱量 </span>
              </div>
              <div class="number-group">
                <span class="number">{{
                  productStatus ? caloriesCalculation : 0
                }}</span>
                <span class="unit"> 卡</span>
              </div>
            </li>
            <li>
              <div class="content-group">
                <i class="fas fa-drumstick-bite"></i>
                <span class="content">蛋白質 </span>
              </div>
              <div class="number-group">
                <span class="number">{{
                  productStatus ? proteinCalculation : 0
                }}</span>
                <span class="unit"> 克</span>
              </div>
            </li>
            <li>
              <div class="content-group">
                <i class="fas fa-tint"></i>
                <span class="content">油脂 </span>
              </div>
              <div class="number-group">
                <span class="number">{{
                  productStatus ? fatCalculation : 0
                }}</span>
                <span class="unit"> 克</span>
              </div>
            </li>
            <li>
              <div class="content-group">
                <i class="fas fa-seedling"></i>
                <span class="content">碳水化合物 </span>
              </div>
              <div class="number-group">
                <span class="number">{{
                  productStatus ? carbohydratesCalculation : 0
                }}</span>
                <span class="unit"> 克</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 商品資訊 -->
        <div class="product-information">
          <div class="product-information-title">商品資訊</div>
          <p class="product-information-content">
            {{ productStatus ? product.content : "商品的簡介..." }}
          </p>
        </div>
        <!-- 商品選購數量 -->
        <div class="product-purchase-quantity">
          <span class="product-purchase-quantity-title">選購數量 </span>
          <i
            class="bi bi-dash-lg"
            :class="{ 'dash-disabled': qty <= 1 }"
            @click="qty--"
          ></i>
          <input
            type="text"
            v-model="qty"
            minlength="1"
            maxlength="2"
            required
          />
          <i
            class="bi bi-plus-lg"
            :class="{ 'plus-disabled': qty >= 99 }"
            @click="qty++"
          ></i>
        </div>
        <div class="product-btn-group">
          <button
            class="product-add-like"
            :class="{
              'add-like-btn-disable': favoriteProductList.some((item) => {
                return item.id === product.id;
              }),
            }"
            @click="localStorageFavoriteProductListManager('更新', product)"
          >
            {{
              favoriteProductList.some((item) => {
                return item.id === product.id;
              })
                ? "已加入我的最愛"
                : "加入我的最愛"
            }}
          </button>
          <button
            class="product-add-cart"
            :class="{
              'add-cart-btn-disable': shoppingCartProductList.carts
                .map((item) => {
                  return item.product_id;
                })
                .includes(product.id),
            }"
            @click="addToCart(product.id, qty)"
          >
            {{
              shoppingCartProductList.carts
                .map((item) => {
                  return item.product_id;
                })
                .includes(product.id)
                ? "已加入購物車"
                : "加入購物車"
            }}
          </button>
        </div>
      </div>
    </div>
    <Loading
      :active="isLoading"
      :background-color="loadingObj.bgc"
      :loader="loadingObj.style"
      :color="loadingObj.color"
      :opacity="loadingObj.opacity"
      :height="loadingObj.height"
      :width="loadingObj.width"
    />
  </div>
</template>

<script>
import AddToCartAndUpdateFavoriteList from "@/mixins/userPages/AddToCartAndUpdateFavoriteList.js";
import FavoriteDataAndShoppingCartData from "@/mixins/userPages/FavoriteDataAndShoppingCartData";
import LoadingConfiguration from "@/mixins/LoadingConfiguration";
import GetShoppingCartData from "@/mixins/userPages/GetShoppingCartData";

export default {
  name: "Product",
  inject: ["emitter"],
  mixins: [
    AddToCartAndUpdateFavoriteList,
    FavoriteDataAndShoppingCartData,
    LoadingConfiguration,
    GetShoppingCartData,
  ],
  data() {
    return {
      productId: "", // 產品ID
      product: {
        // 單一產品資訊
        nutrientContent: {}, // 單一產品營養成分
      },
      qty: 1, // 選購產品數量 (預設值: 1)
      isLoading: false, // Loading元件(全域)
      productStatus: false, // 商品圖片讀取狀態
    };
  },
  watch: {
    // 判斷商品數量是否為 1-9 的數值 (驗證用)
    qty(val) {
      if (val < 1 || isNaN(val)) {
        return (this.qty = 1);
      }
    },
  },
  computed: {
    // 商品售價計算
    priceCalculation() {
      return this.product.price * this.qty;
    },
    // 商品原價計算
    originPriceCalculation() {
      return this.product.origin_price * this.qty;
    },
    // 熱量計算
    caloriesCalculation() {
      return parseFloat(
        Number(this.product.nutrientContent.calories * this.qty).toFixed(2)
      );
    },
    // 蛋白質計算
    proteinCalculation() {
      return parseFloat(
        Number(this.product.nutrientContent.protein * this.qty).toFixed(2)
      );
    },
    // 脂肪計算
    fatCalculation() {
      return parseFloat(
        Number(this.product.nutrientContent.fat * this.qty).toFixed(2)
      );
    },
    // 碳水化合物計算
    carbohydratesCalculation() {
      return parseFloat(
        Number(this.product.nutrientContent.carbohydrates * this.qty).toFixed(2)
      );
    },
  },
  methods: {
    // 取得商品單一資料
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${vm.productId}`;

      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
          vm.productStatus = true;
        } else {
          console.warn("API串聯失敗");
        }
      });
    },
  },
  created() {
    this.productId = this.$route.params.id;
    // 取得API商品資料
    this.getProduct();
  },
};
</script>
