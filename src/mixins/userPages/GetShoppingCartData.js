export default {
  created() {
    // 重新取得購物車資料
    this.$emit("update-shopping-cart-products");
  },
};
