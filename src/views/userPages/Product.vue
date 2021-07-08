<template>
  <div class="user-page-product">
    <!-- 單一商品容器-->
    <div class="product-container">
      <!-- 麵包屑 -->
      <div class="breadcrumb">
        <i class="fas fa-map-marker-alt"></i>
        <a class="breadcrumb-item">首頁</a>
        <a class="breadcrumb-item">本店商品</a>
        <a class="breadcrumb-item">商品類別</a>
      </div>
      <!-- 商品圖片 -->
      <img :src="product.imageUrl" alt="產品圖片" />
      <div class="product-detail-container">
        <!-- 商品標籤 -->
        <div class="product-tag">{{ product.category }}</div>
        <!-- 商品標題 -->
        <h1 class="product-title">{{ product.title }}</h1>
        <!-- 商品原價與售價 -->
        <div class="product-price-container">
          <div class="product-promotional-price">
            {{ priceCalculation }}
          </div>
          <div class="product-origin-price">
            {{ originPriceCalculation }}
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
                <span class="number">{{ caloriesCalculation }}</span>
                <span class="unit"> 卡</span>
              </div>
            </li>
            <li>
              <div class="content-group">
                <i class="fas fa-drumstick-bite"></i>
                <span class="content">蛋白質 </span>
              </div>
              <div class="number-group">
                <span class="number">{{ proteinCalculation }}</span>
                <span class="unit"> 克</span>
              </div>
            </li>
            <li>
              <div class="content-group">
                <i class="fas fa-tint"></i>
                <span class="content">油脂 </span>
              </div>
              <div class="number-group">
                <span class="number">{{ fatCalculation }}</span>
                <span class="unit"> 克</span>
              </div>
            </li>
            <li>
              <div class="content-group">
                <i class="fas fa-seedling"></i>
                <span class="content">碳水化合物 </span>
              </div>
              <div class="number-group">
                <span class="number">{{ carbohydratesCalculation }}</span>
                <span class="unit"> 克</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 商品資訊 -->
        <div class="product-information">
          <div class="product-information-title">商品資訊</div>
          <p class="product-information-content">
            {{ product.content }}
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
    <!-- Loading -->
    <Loading :active="isLoading"></Loading>
  </div>
</template>

<script>
export default {
  name: "Product",
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
      favoriteProductList: this.favoriteProducts, // 我的最愛資料
      shoppingCartProductList: { carts: [] }, // 購物車資料
      productId: "", // 產品ID
      product: {
        // 單一產品資訊
        nutrientContent: {}, // 單一產品營養成分
      },
      qty: 1, // 選購產品數量 (預設值: 1)
      isLoading: false, // Loading元件(全域)
    };
  },
  watch: {
    // 判斷商品數量是否為 1-9 的數值 (驗證用)
    qty(val) {
      if (val < 1 || isNaN(val)) {
        return (this.qty = 1);
      }
    },
    favoriteProducts() {
      this.favoriteProductList = this.favoriteProducts;
    },
    shoppingCartProducts() {
      this.shoppingCartProductList = this.shoppingCartProducts;
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
      console.log(`單一產品API: ${api}`);

      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
        } else {
          console.log("API串聯失敗");
        }
      });
    },
    // 加入購物車
    addToCart(id, qty) {
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
        qty = Number(qty); // 強制轉型
        const cart = {
          product_id: id,
          qty,
        };

        vm.$http.post(api, { data: cart }).then((response) => {
          this.isLoading = false; // 關閉Loading元件
          // 使用者回饋訊息
          this.$httpMessageState(response, "加入購物車");
          // 更新資料、渲染畫面
          vm.$emit("update-shopping-cart-products");
        });
      } else {
        this.$swal.fire("此商品以加入購物車");
      }
    },
    // localStorage我的最愛資料
    localStorageFavoriteProductListManager(status, product) {
      if (status === "更新") {
        // 如果localStorage儲存庫 有重複 的商品資料
        if (
          this.favoriteProductList.some((item) => {
            return item.id === product.id;
          })
        ) {
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
          // 通知父層 重新取得商品
          this.$emit("update-favorite-products");
          // 結束函式
          return;
        }
        // 如果localStorage儲存庫 無重複 的商品資料
        // 先建立商品資料
        let item = {
          id: product.id,
          imgUrl: product.imageUrl,
          title: product.title,
          price: product.price,
        };
        // 儲存商品資料在data變數
        this.favoriteProductList.push(item);
        // 儲存商品資料在localStorage儲存庫
        localStorage.setItem(
          "addedFavoriteProducts",
          JSON.stringify(this.favoriteProductList)
        );
        // 通知父層 重新取得商品
        this.$emit("update-favorite-products");
      } else {
        // 通知父層 重新取得商品
        this.$emit("update-favorite-products");
      }
    },
  },
  created() {
    this.productId = this.$route.params.id;
    // 取得API商品資料
    this.getProduct();
    // 重新取得資料
    this.$emit("update-shopping-cart-products");
  },
};
</script>
