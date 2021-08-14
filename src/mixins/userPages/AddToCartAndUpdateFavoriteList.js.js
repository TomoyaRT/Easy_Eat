export default {
  methods: {
    // 加入購物車
    addToCart(id, qty = 1) {
      if (!this.shoppingCartProductList.carts.map((item) => { return item.product_id }).includes(id)) {
        const vm = this;
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
        const cart = {
          product_id: id,
          qty,
        };
        vm.isLoading = true; // 開啟Loading元件


        vm.$http.post(api, { data: cart }).then((response) => {
          vm.isLoading = false; // 關閉Loading元件
          // 使用者回饋訊息
          vm.$httpMessageState(response, "加入購物車");
          // 更新資料、渲染畫面
          vm.$emit('update-shopping-cart-products');
        });
      } else {
        vm.$swal.fire("此商品以加入購物車");
      }
    },
    // localStorage我的最愛資料
    localStorageFavoriteProductListManager(status, product) {
      if (status === "更新") {
        // 如果localStorage儲存庫 有重複 的商品資料
        if (this.favoriteProductList.some((item) => { return item.id === product.id; })) {
          // 取得重複物件的索引
          let targetIndex = this.favoriteProductList.map((item) => { return item.id; }).indexOf(product.id);
          // 依據索引位置刪除該物件
          this.favoriteProductList.splice(targetIndex, 1);
          // 儲存商品資料在localStorage儲存庫
          localStorage.setItem("addedFavoriteProducts", JSON.stringify(this.favoriteProductList));
          // 通知父層 重新取得商品
          this.$emit('update-favorite-products');
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
        localStorage.setItem("addedFavoriteProducts", JSON.stringify(this.favoriteProductList));
        // 通知父層 重新取得商品
        this.$emit('update-favorite-products');
      } else {
        // 通知父層 重新取得商品
        this.$emit('update-favorite-products');
      }
    },
  },
};
