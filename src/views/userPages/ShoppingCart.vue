<template>
  <div class="user-page-shopping-cart">
    <div class="shopping-cart">
      <!-- 標題區塊 -->
      <h1 class="shopping-cart-page-title">購物車清單</h1>
      <!-- 商品列表 -->
      <div
        class="product-container"
        v-if="shoppingCartProductList.carts.length > 0"
      >
        <div
          class="product"
          v-for="item in shoppingCartProductList.carts"
          :key="item.id"
        >
          <img :src="item.product.imageUrl" alt="" />
          <div class="product-content">
            <h1 class="product-title">
              <p>{{ item.product.title }}</p>
            </h1>
            <div class="product-delete" @click="deletCart(item.id)">
              <i class="bi bi-trash"></i>
            </div>
            <!-- 商品選購數量 -->
            <div class="product-purchase-quantity">
              <i
                class="bi bi-dash-lg"
                :class="{ 'dash-disabled': item.qty <= 1 || !btnIsActive }"
                @click="changeCartQty(item.id, item.qty - 1)"
              ></i>
              <input
                type="text"
                v-model.lazy="item.qty"
                minlength="1"
                maxlength="2"
                required
                @change="changeCartQty(item.id, item.qty)"
              />
              <span class="product-unit">{{ item.product.unit }}</span>
              <i
                class="bi bi-plus-lg"
                :class="{ 'plus-disabled': item.qty >= 99 || !btnIsActive }"
                @click="changeCartQty(item.id, item.qty + 1)"
              ></i>
            </div>
            <!-- 商品總價 -->
            <div class="product-price">
              ${{ $filters.currency(item.product.price * item.qty) }}
            </div>
          </div>
        </div>
      </div>
      <!-- 商品無資料時 -->
      <div class="product-no-data-wrap" v-else>
        <div class="product-no-data-container">
          <h1 class="product-no-data-title">目前沒有商品</h1>
          <img
            class="product-no-data-img"
            src="../../../public/images/empty-shopping-cart.svg"
            alt="購物車無商品圖片"
          />
          <router-link
            :to="{ name: 'UserProducts' }"
            class="product-no-data-btn"
            @click="$emit('change-current-page-style', 'UserProducts')"
            >去逛逛</router-link
          >
        </div>
      </div>

      <!-- 商品總計 -->
      <div class="product-total">
        <div class="product-nutrition-list-container">
          <div class="nutrition-title-container">
            <div class="nutrition-title">
              <i class="bi bi-brightness-high-fill"></i>熱量
            </div>
            <div class="nutrition-title">
              <i class="bi bi-egg-fill"></i>蛋白質
            </div>
            <div class="nutrition-title">
              <i class="bi bi-droplet-half"></i>脂肪
            </div>
            <div class="nutrition-title">
              <i class="bi bi-palette-fill"></i>碳水化合物
            </div>
          </div>
          <div class="nutrition-content-container">
            <div class="nutrition-content">
              {{ nutrientContentCaloriesTotal }}
            </div>
            <div class="nutrition-content">
              {{ nutrientContentProteinTotal }}
            </div>
            <div class="nutrition-content">{{ nutrientContentFatTotal }}</div>
            <div class="nutrition-content">
              {{ nutrientContentCarbohydratesTotal }}
            </div>
          </div>
        </div>
        <div class="product-price-title">商品金額總計</div>
        <div class="product-price-total">
          ${{
            shoppingCartProductList.carts.length > 0
              ? $filters.currency(shoppingCartProductList.total)
              : 0
          }}
        </div>
        <input
          type="text"
          placeholder="請輸入優惠券序號"
          class="coupon-codes"
          v-model="couponCode"
        />
        <button class="coupon-use" type="button" @click="useCoupon">
          套用
        </button>
        <div class="coupon-rebate-title">優惠券折抵</div>
        <div class="coupon-rebate-price">
          ${{
            shoppingCartProductList.carts.length > 0
              ? $filters.currency(
                  Math.round(
                    shoppingCartProductList.total -
                      shoppingCartProductList.final_total
                  )
                )
              : 0
          }}
        </div>
        <div class="product-final-price-title">合計</div>
        <div class="product-final-price">
          ${{
            shoppingCartProductList.carts.length > 0
              ? $filters.currency(
                  Math.round(shoppingCartProductList.final_total)
                )
              : 0
          }}
        </div>
        <button
          type="button"
          class="product-all-delect-btn"
          @click="deletCartList"
        >
          清空購物車
        </button>
        <button type="button" class="payment-btn" @click="goCheckOut">
          結帳去
        </button>
      </div>
    </div>
    <!-- Loading -->
    <Loading :active="isLoading"></Loading>
  </div>
</template>

<script>
import FavoriteDataAndShoppingCartData from "../../mixins/userPages/FavoriteDataAndShoppingCartData";

export default {
  name: "ShoppingCart",
  inject: ["emitter"],
  mixins: [FavoriteDataAndShoppingCartData],
  data() {
    return {
      couponCode: "", // 使用者輸入的優惠券代碼
      btnIsActive: true, // 商品數量增減按鈕的開關
      isLoading: false, // 全域Loading 開關
    };
  },
  computed: {
    // 熱量總量
    nutrientContentCaloriesTotal() {
      // 計算單項商品的總含量
      const itemCaloriesContent = this.shoppingCartProductList.carts.map(
        (item) => {
          return item.qty * item.product.nutrientContent.calories;
        }
      );
      // 統合全部商品的含量
      const totalCaloriesContent = itemCaloriesContent.reduce((total, val) => {
        return total + val;
      }, 0);
      // 取小數點到第二位
      return parseFloat(totalCaloriesContent.toFixed(2));
    },
    // 蛋白質總量
    nutrientContentProteinTotal() {
      const itemProteinContent = this.shoppingCartProductList.carts.map(
        (item) => {
          return item.qty * item.product.nutrientContent.protein;
        }
      );
      const totalProteinContent = itemProteinContent.reduce((total, val) => {
        return total + val;
      }, 0);
      return parseFloat(totalProteinContent.toFixed(2));
    },
    // 脂肪總量
    nutrientContentFatTotal() {
      const itemFatContent = this.shoppingCartProductList.carts.map((item) => {
        return item.qty * item.product.nutrientContent.fat;
      });
      const totalFatContent = itemFatContent.reduce((total, val) => {
        return total + val;
      }, 0);
      return parseFloat(totalFatContent.toFixed(2));
    },
    // 碳水化合物總量
    nutrientContentCarbohydratesTotal() {
      const itemCarbohydratesContent = this.shoppingCartProductList.carts.map(
        (item) => {
          return item.qty * item.product.nutrientContent.carbohydrates;
        }
      );
      const totalCarbohydratesContent = itemCarbohydratesContent.reduce(
        (total, val) => {
          return total + val;
        },
        0
      );
      return parseFloat(totalCarbohydratesContent.toFixed(2));
    },
  },
  methods: {
    // 結帳去
    goCheckOut() {
      if (this.shoppingCartProductList.carts.length === 0) {
        this.$swal.fire("目前購物車無任何商品哦!");
      } else {
        this.$router.push("/userorderform");
      }
    },
    // 更改購物車數量
    changeCartQty(id, qty) {
      this.isLoading = true;
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      qty = Number(qty); // 強制轉型
      const item = { product_id: id, qty };

      vm.$http.put(api, { data: item }).then((response) => {
        vm.isLoading = false;
        vm.$httpMessageState(response, "更新商品數量");
        // 重新取得資料
        vm.$emit("update-shopping-cart-products");
      });
    },
    // 刪除購物車 單一商品
    deletCart(id) {
      this.isLoading = true;
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;

      vm.$http.delete(api).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, "刪除商品");
        // 重新取得資料
        vm.$emit("update-shopping-cart-products");
      });
    },
    // 刪除購物車 所有商品
    deletCartList() {
      this.isLoading = true;
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;

      vm.$http.delete(api).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, "刪除所有商品");
        // 重新取得資料
        vm.$emit("update-shopping-cart-products");
      });
    },
    // 套用優惠券
    useCoupon() {
      this.isLoading = true;
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: vm.couponCode,
      };

      vm.$http.post(api, { data: coupon }).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, "已套用優惠券");
        // 重新取得資料
        vm.$emit("update-shopping-cart-products");
      });
    },
  },
  created() {
    // 重新取得資料
    this.$emit("update-shopping-cart-products");
  },
};
</script>
