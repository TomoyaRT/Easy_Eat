import DeletModal from "../../components/adminPages/DeletModal.vue";
import Pagination from "../../components/adminPages/Pagination.vue";

export default {
    // 使用父元件的 emitter元件
    inject: ["emitter"],
    components: {
        DeletModal,
        Pagination,
    },
    data() {
        return {
            pagination: {}, // API分頁資料
            isLoading: false, // Loading元件(全域)
        }
    }
};
