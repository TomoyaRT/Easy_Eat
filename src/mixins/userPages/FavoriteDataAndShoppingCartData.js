export default {
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
        }

    },
    watch: {
        favoriteProducts() {
            this.favoriteProductList = this.favoriteProducts;
        },
        shoppingCartProducts() {
            this.shoppingCartProductList = this.shoppingCartProducts;
        }
    },
};
