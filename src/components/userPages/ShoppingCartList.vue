<template>
  <div class="user-page-shopping-cart-list" :class="{'order-active': orderStatus}">
    <!-- 商品群組 -->
    <div class="shopping-cart-group" v-for="item in shoppingCartProductList.carts" :key="item.id">
      <!-- 單一商品 -->
      <div class="shopping-cart-item">
        <div class="product-name">{{ item.product.title }}</div>
        <div class="product-qty">
          {{ item.qty }}
          <span class="product-unit">{{ item.product.unit }}</span>
        </div>
        <div class="product-price">${{ item.total }}</div>
      </div>
    </div>
    <!-- 結算區域 -->
    <div class="products-total-price-container">
      <div class="coupon-discount-container">
        <div class="coupon-title">優惠券折抵</div>
        <div class="coupon-discount-price">${{ shoppingCartProductList.total - shoppingCartProductList.final_total }}</div>
      </div>
      <div class="product-total-container">
        <div class="product-title">合計</div>
        <div class="product-total-price">${{ shoppingCartProductList.total }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartList',
  inject: ["emitter"],
  props: {
    shoppingCartProducts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      orderStatus: false,
      shoppingCartProductList: {carts:[]}, // 購物車資料
    };
  },
  watch: {
    shoppingCartProducts() {
      this.shoppingCartProductList = this.shoppingCartProducts;
    }
  },
  created() {
    // 模板開關
    this.emitter.on("switch-order", () => {this.orderStatus = !this.orderStatus});
    // 重新取得資料
    this.shoppingCartProductList = this.shoppingCartProducts;
  },
};
</script>
