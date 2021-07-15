export default {
    data() {
        return {
            orderId: "",
            orderData: {
                user: {},
            },
        }

    },
    methods: {
        // 取得此筆訂單資料
        getOrderData() {
            const vm = this;
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${vm.orderId}`;

            vm.$http.get(api).then((response) => {
                if (response.data.success) {
                    vm.orderData = response.data.order;
                }
            });
        },
    },
    created() {
        // 從網址取出訂單id
        this.orderId = this.$route.params.orderId;
        // 取得訂單資料
        this.getOrderData();
    },
};
