<template>
  <div class="admin-page-product-modal">
    <div class="product-modal-container">
      <div class="modal-header-container">
        <h1 class="product-modal-title">{{ productModal.title }}</h1>
        <i class="bi bi-x-lg" @click="$emit('close-modal')"></i>
      </div>
      <!-- 切換成平板 電腦版 -->
      <div class="product-modal-desktop-container">
        <div class="modal-image-container">
          <div class="product-image-range" v-if="!tempProduct.imageUrl"></div>
          <img
            :src="tempProduct.imageUrl"
            alt="商品圖片"
            class="product-image"
            v-if="tempProduct.imageUrl"
          />
          <h3>圖片來源</h3>
          <button
            type="button"
            class="btn-upload"
            :class="{ 'upload-active': imageSwitch === 'upload' }"
            @click="imageSwitch = 'upload'"
          >
            上傳
          </button>
          <button
            type="button"
            class="btn-url"
            :class="{ 'url-active': imageSwitch === 'url' }"
            @click="imageSwitch = 'url'"
          >
            網址
          </button>
          <div class="product-image-upload" v-if="imageSwitch === 'upload'">
            <input
              type="file"
              id="file"
              class="image-upload-origin-input"
              ref="fileInput"
              @change="uploadFile"
            />
            <label for="file" class="image-upload-input">{{ tempProduct.image || '未選擇圖片檔案' }}</label>
            <label for="file" class="image-upload-btn">瀏覽</label>
          </div>
          <div class="product-image-url" v-if="imageSwitch === 'url'">
            <input
              type="text"
              class="image-url-input"
              placeholder="請輸入圖片連結"
              v-model="tempProduct.imageUrl"
            />
            <button type="button" class="image-url-btn">確認</button>
          </div>
          <h3>是否上架</h3>
          <div class="product-status-switch-container">
            <input
              type="checkbox"
              id="productStatus"
              class="switch-checkbox"
              v-model="tempProduct.is_enabled"
            />
            <label for="productStatus" class="switch-label"></label>
          </div>
        </div>
        <div class="modal-product-container">
          <div class="product-name-container">
            <label for="name" class="product-name">商品名稱</label>
            <input
              type="text"
              id="name"
              class="product-name-input"
              v-model="tempProduct.title"
            />
          </div>
          <div class="product-two-column-layout">
            <div class="product-category-container">
              <label for="category" class="product-category">商品分類</label>
              <input
                type="text"
                id="category"
                class="product-category-input"
                v-model="tempProduct.category"
              />
            </div>
            <div class="product-unit-container">
              <label for="unit" class="product-unit">單位</label>
              <input
                type="text"
                id="unit"
                class="product-unit-input"
                v-model="tempProduct.unit"
              />
            </div>
          </div>
          <div class="product-two-column-layout">
            <div class="product-origin-price-container">
              <label for="origin-price" class="product-origin-price"
                >原價</label
              >
              <input
                type="number"
                class="product-origin-price-input"
                id="origin-price"
                v-model.number="tempProduct.origin_price"
              />
            </div>
            <div class="product-price-container">
              <label for="price" class="product-price">售價</label>
              <input
                type="number"
                id="price"
                class="product-price-input"
                v-model.number="tempProduct.price"
              />
            </div>
          </div>
          <div class="product-two-column-layout">
            <div class="product-calories-container">
              <label for="calories" class="product-calories">熱量</label>
              <input
                type="number"
                id="calories"
                class="product-calories-input"
                v-model.number="tempProduct.nutrientContent.calories"
              />
            </div>
            <div class="product-protein-container">
              <label for="protein" class="product-protein">蛋白質</label>
              <input
                type="number"
                id="protein"
                class="product-protein-input"
                v-model.number="tempProduct.nutrientContent.protein"
              />
            </div>
          </div>
          <div class="product-two-column-layout">
            <div class="product-fat-container">
              <label for="fat" class="product-fat">脂肪</label>
              <input
                type="number"
                id="fat"
                class="product-fat-input"
                v-model.number="tempProduct.nutrientContent.fat"
              />
            </div>
            <div class="product-carbohydrates-container">
              <label for="carbohydrates" class="product-carbohydrates"
                >碳水化合物</label
              >
              <input
                type="number"
                id="carbohydrates"
                class="product-carbohydrates-input"
                v-model.number="tempProduct.nutrientContent.carbohydrates"
              />
            </div>
          </div>
          <div class="product-summary-container">
            <label for="description" class="product-summary">商品摘要</label>
            <textarea
              id="description"
              class="product-summary-textarea"
              v-model="tempProduct.description"
            ></textarea>
          </div>
          <div class="product-content-container">
            <label for="content" class="product-content">商品說明</label>
            <textarea
              id="content"
              class="product-content-textarea"
              v-model="tempProduct.content"
            ></textarea>
          </div>
          <div class="modal-footer-container">
            <button
              type="button"
              class="product-modal-cancel"
              @click="$emit('close-modal')"
            >
              取消
            </button>
            <button
              type="button"
              class="product-modal-create"
              @click="$emit('create-product', tempProduct)"
            >
              {{ productModal.btn }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSwitch: "upload", // 切換上傳圖片 & 輸入圖片連結
      tempProduct: {nutrientContent:{}}, // 接收父元件的資料
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    productModal: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    // 單一數據流，使用tempProduct接收、更改、並回傳。
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    // 上傳檔案功能
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      this.tempProduct.image = uploadedFile.name;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(api, formData).then((res) => {
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$httpMessageState(res, "圖片上傳");
        }
      });
    },
  },
};
</script>