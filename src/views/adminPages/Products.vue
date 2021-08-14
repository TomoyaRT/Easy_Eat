<template>
  <div class="admin-page-products">
    <!-- 商品管理列表 Main -->
    <div class="products-container">
      <!-- 標題列 -->
      <div class="products-title-group">
        <div class="products-img">圖片</div>
        <div class="products-category">類別</div>
        <div class="products-name">名稱</div>
        <div class="products-origin-price">原價</div>
        <div class="products-price">售價</div>
        <div class="products-status">啟用狀態</div>
        <div class="product-edit-btn-group">
          <i
            class="bi bi-toggle2-off"
            @click="productEditStatus = true"
            v-if="!productEditStatus"
          ></i>
          <i
            class="bi bi-toggle2-on"
            @click="productEditStatus = false"
            v-else
          ></i>
        </div>
      </div>
      <!-- 內容列 -->
      <div
        class="products-content-group"
        v-for="product in products"
        :key="product.id"
      >
        <div class="products-img-container">
          <img :src="product.imageUrl" alt="商品圖片" class="products-img" />
        </div>
        <div class="products-category">{{ product.category }}</div>
        <div class="products-title">
          <p>{{ product.title }}</p>
        </div>
        <div class="products-origin-price">
          ${{ $filters.currency(product.origin_price) }}
        </div>
        <div class="products-price">
          ${{ $filters.currency(product.price) }}
        </div>
        <div class="products-status-enabled" v-if="product.is_enabled">
          啟用
        </div>
        <div class="products-status-unenabled" v-else>未啟用</div>
        <i
          class="bi bi-pencil-fill"
          @click="openModal('編輯商品', product)"
          v-if="productEditStatus"
        ></i>
        <i
          class="bi bi-trash"
          @click="openModal('刪除商品', product)"
          v-else
        ></i>
      </div>
    </div>
    <!-- Loading -->
    <Loading
      :active="isLoading"
      :background-color="loadingObj.bgc"
      :loader="loadingObj.style"
      :color="loadingObj.color"
      :opacity="loadingObj.opacity"
      :height="loadingObj.height"
      :width="loadingObj.width"
    ></Loading>
    <!-- 分頁模板 -->
    <Pagination :pagination="pagination" @change-page="getProducts" />
    <!-- 商品模板 -->
    <ProductModal
      :class="{ 'modal-active': productModalStatus }"
      @close-modal="productModalStatus = false"
      :product="tempProduct"
      :product-modal="productModal"
      @create-product="updateProduct"
    />
    <!-- 刪除模板 -->
    <DeletModal
      :class="{ 'modal-active': deletModalStatus }"
      :delet-modal="tempProduct"
      @delete-product="updateProduct"
      @close-modal="deletModalStatus = false"
    />
  </div>
</template>

<script>
import ProductModal from "@/components/adminPages/ProductModal.vue";
import AdminPagesUniversal from "@/mixins/adminPages/AdminPagesUniversal";
import LoadingConfiguration from "@/mixins/LoadingConfiguration";

export default {
  mixins: [AdminPagesUniversal, LoadingConfiguration],
  // 區域註冊子元件
  components: {
    ProductModal,
  },
  data() {
    return {
      productModalStatus: false, // 商品模板 是否開啟
      deletModalStatus: false, // 刪除模板 是否開啟
      productEditStatus: true, // 切換編輯 / 刪除按鈕
      products: [], // API商品資料
      nowPage: 1, // 當前分頁(預設為 1)
      tempProduct: {}, // 新增、編輯、刪除商品的模板資料
      productStatus: "", // 使用者當前選擇的商品狀態
      productModal: {
        // 商品模板的動態內容
        title: "新增商品",
        btn: "建立",
      },
    };
  },

  methods: {
    // 取得商品資料(按照分頁)
    getProducts(page) {
      this.isLoading = true;
      this.nowPage = page; // 保存當前分頁頁數
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${this.nowPage}`;
      this.$http.get(api).then((res) => {
        this.isLoading = false; // 關閉Loading元件
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.goTop();
        }
      });
    },
    // 打開商品模板功能
    openModal(status, item) {
      this.productStatus = status; // 保存目前商品狀態
      if (status === "新增商品") {
        this.tempProduct = { nutrientContent: {} }; // 清空模板內容
        this.productModal = { title: "新增商品", btn: "建立" };
        this.productModalStatus = true; // 如為商品管理頁面，則開啟商品模板
      } else if (status === "編輯商品") {
        this.tempProduct = { ...item };
        this.productModal.title = "修改商品";
        this.productModal.btn = "更新";
        this.productModalStatus = true;
      } else {
        this.tempProduct = { ...item };
        this.deletModalStatus = true;
      }
    },
    // 更新商品資料
    updateProduct(item) {
      this.isLoading = true; // 開啟Loading元件
      this.tempProduct = item; // 存入商品資料
      // 新增商品
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = "post";
      // 編輯商品
      if (this.productStatus === "編輯商品") {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = "put";
      } else if (this.productStatus === "刪除商品") {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = "delete";
      }
      // 發送API
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.productModalStatus = false; // 關閉商品模板
        this.deletModalStatus = false; // 關閉刪除模板
        this.isLoading = false; // 關閉Loading元件
        this.getProducts(this.nowPage); // 取得商品資料、帶入當前頁數、渲染畫面。
        this.$emit('update-products-number');
        // 使用者回饋訊息
        switch (this.productStatus) {
          case "新增商品":
            this.$httpMessageState(res, "新增商品");
            break;
          case "編輯商品":
            this.$httpMessageState(res, "編輯商品");
            break;
          default:
            this.$httpMessageState(res, "刪除商品");
        }
      });
    },
    // 滾動至頂
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  created() {
    // 更改Navbar頁面標題
    this.$emit("change-navbar-page-title", "商品管理");
    // 更改Navbar表單按鈕標題
    this.$emit("change-navbar-btn-title", "建立商品");

    // 監聽Navbar的 新增按鈕
    this.emitter.on("open-modal", (status) => {
      if (status === "商品管理") {
        this.openModal("新增商品");
      }
    });

    // 取得商品資料
    this.getProducts(this.nowPage);
  },
};
</script>