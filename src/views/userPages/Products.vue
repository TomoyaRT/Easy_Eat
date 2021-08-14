<template>
  <!-- 商品頁面 -->
  <div class="user-page-products">
    <!-- 頁面標頭 -->
    <div class="products-header">
      <!-- 標題 -->
      <div class="products-title-container">
        <h1 class="products-title">
          {{
            searchPriceStatus || productsSearchStatus
              ? "搜尋商品"
              : currentFilterTag
          }}
        </h1>
        <h2 class="products-total">共{{ categoryProductsLength }}件商品</h2>
      </div>
      <!-- 篩選器 -->
      <div class="products-filter">
        <div class="products-title-container-tablet-1024">
          <h1 class="products-title">
            {{
              searchPriceStatus || productsSearchStatus
                ? "搜尋商品"
                : currentFilterTag
            }}
          </h1>
          <h2 class="products-total">共{{ categoryProductsLength }}件商品</h2>
        </div>
        <!-- 搜尋框 -->
        <div class="searchbar-container-desktop-1280">
          <i class="bi bi-search"></i>
          <input
            type="search"
            placeholder="搜尋"
            v-model.trim="searchWord"
            @input="productsSearch(searchWord)"
          />
        </div>
        <!-- 商品篩選 -->
        <div class="products-filter-container">
          <div class="products-filter-title">類別</div>
          <div class="products-filter-content">
            <div
              class="product-filter-item"
              :class="{
                'product-filter-item-active': currentFilterTag === '全部商品',
              }"
              @click="productsFilter('全部商品')"
            >
              全部商品
            </div>
            <div
              class="product-filter-item"
              :class="{
                'product-filter-item-active': currentFilterTag === '特價商品',
              }"
              @click="productsFilter('特價商品')"
            >
              特價商品
            </div>
            <div
              class="product-filter-item"
              :class="{
                'product-filter-item-active': currentFilterTag === item,
              }"
              v-for="(item, index) in categoryTag"
              :key="index"
              @click="productsFilter('類別篩選', item)"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <!-- 商品排序 -->
        <div class="products-sorting-container">
          <div class="products-sorting-title">排序</div>
          <div class="products-sorting-content">
            <div
              class="product-sort-item"
              :class="{ 'product-sort-item-active': currentSortTag === '價錢' }"
              @click="productsSorter('價錢')"
            >
              價錢
            </div>
            <div
              class="product-sort-item"
              :class="{ 'product-sort-item-active': currentSortTag === '熱量' }"
              @click="productsSorter('熱量')"
            >
              熱量
            </div>
            <div
              class="product-sort-item"
              :class="{
                'product-sort-item-active': currentSortTag === '蛋白質',
              }"
              @click="productsSorter('蛋白質')"
            >
              蛋白質
            </div>
            <div
              class="product-sort-item"
              :class="{ 'product-sort-item-active': currentSortTag === '脂肪' }"
              @click="productsSorter('脂肪')"
            >
              脂肪
            </div>
            <div
              class="product-sort-item"
              :class="{
                'product-sort-item-active': currentSortTag === '碳水化合物',
              }"
              @click="productsSorter('碳水化合物')"
            >
              碳水化合物
            </div>
          </div>
        </div>

        <!-- 搜尋框 -->
        <div class="searchbar-container">
          <i class="bi bi-search"></i>
          <input
            type="search"
            placeholder="搜尋"
            v-model.trim="searchWord"
            @input="productsSearch(searchWord)"
          />
        </div>
        <!-- 排序icon -->
        <div class="sorting-container">
          <i
            class="bi bi-sort-down-alt"
            v-if="!productsSorterToggle"
            @click="sortingController(currentSortTag, '高到低')"
          ></i>
          <i
            class="bi bi-sort-down"
            v-if="productsSorterToggle"
            @click="sortingController(currentSortTag, '低到高')"
          ></i>
        </div>
        <!-- 價格區間 -->
        <form class="price-range-container">
          <div class="price-range-title">價格區間</div>
          <input
            type="text"
            placeholder="$最小值"
            maxlength="6"
            required
            pattern="[0-9]{0,6}"
            v-model="searchPriceMinNum"
          />
          <input
            type="text"
            placeholder="$最大值"
            maxlength="6"
            required
            pattern="[0-9]{0,6}"
            v-model="searchPriceMaxNum"
          />
          <button
            @click="
              searchPriceRangeProducts(searchPriceMinNum, searchPriceMaxNum)
            "
          >
            篩選
          </button>
        </form>
      </div>
    </div>

    <!-- 頁面主體 -->
    <div class="products-main">
      <!-- 商品列表 -->
      <transition-group
        tag="div"
        name="products-transition"
        class="product-list"
        v-if="categoryProductsLength > 0"
      >
        <!-- 商品卡片 -->
        <div
          class="product-item-card products-transition"
          v-for="item in filteredProducts"
          :key="item.id"
        >
          <!-- 商品圖片 -->
          <router-link :to="`/userproduct/${item.id}`" class="item-link">
            <img :src="item.imageUrl" alt="商品圖片" />
          </router-link>
          <!-- 商品名稱 -->
          <div class="product-item-title">
            <p class="ellipsis">
              {{ item.title }}
            </p>
          </div>
          <!-- 商品標籤 / 營養成分 -->
          <div class="product-tag-group">
            <div
              class="product-tag"
              :class="{ 'nutrition-tag': nutrientContentVisible === true }"
            >
              {{ nutrientContentVisible ? currentSortTag : item.category }}
            </div>
            <!-- 營養成分的含量 -->
            <div
              class="nutrient-content"
              v-if="nutrientContentVisible === true"
            >
              {{ item.nutrientContent[nutrientContentName]
              }}{{ nutrientContentUnit }}
            </div>
          </div>

          <!-- 商品原價 / 售價 -->
          <div class="product-price">
            <span
              class="origin-price"
              :class="{
                'origin-price-active': item.origin_price === item.price,
              }"
              >${{ item.origin_price }}</span
            >
            <span class="on-sale-price" v-if="item.origin_price !== item.price"
              >${{ item.price }}</span
            >
          </div>
          <!-- 願望清單 / 購物車 按鈕 -->
          <div class="card-btn-group">
            <div
              class="favorite-list-btn"
              :class="{
                'favorite-list-btn-disable': favoriteProductList.some(
                  (product) => {
                    return product.id === item.id;
                  }
                ),
              }"
              @click="localStorageFavoriteProductListManager('更新', item)"
            >
              <i
                class="bi bi-heart-fill"
                :class="{
                  'favorite-btn-disable': favoriteProductList.some(
                    (product) => {
                      return product.id === item.id;
                    }
                  ),
                }"
                v-if="
                  favoriteProductList.some((product) => {
                    return product.id === item.id;
                  })
                "
              ></i>
              <i class="bi bi-heart" v-else></i>
            </div>
            <div
              class="shopping-cart-list-btn"
              :class="{
                'shopping-cart-btn-disable': shoppingCartProductList.carts
                  .map((product) => {
                    return product.product_id;
                  })
                  .includes(item.id),
              }"
              @click="addToCart(item.id)"
            >
              <i
                class="bi bi-cart-check-fill"
                v-if="
                  shoppingCartProductList.carts
                    .map((product) => {
                      return product.product_id;
                    })
                    .includes(item.id)
                "
              ></i>
              <i class="bi bi-cart-plus-fill" v-else></i>
            </div>
          </div>
        </div>
      </transition-group>
      <!-- Lazyloading -->
      <div
        class="overlay-container"
        v-if="categoryProductsLength <= 0 && !productsSearchStatus"
      >
        <div class="overlay" v-for="(item, index) in 12" :key="index">
          <div class="overlay-img"></div>
          <div class="overlay-title"></div>
          <div class="overlay-tag"></div>
          <div class="overlay-btn-group">
            <div class="overlay-btn-left"></div>
            <div class="overlay-btn-right"></div>
          </div>
        </div>
      </div>
      <div
        class="noProducts"
        v-if="categoryProductsLength <= 0 && productsSearchStatus"
      >
        目前尚無此商品，盡快為您準備中...
      </div>
    </div>

    <!-- 分頁標籤 -->
    <div class="pagination-container" v-if="categoryProductsLength >= 12">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ 'page-item-disabled': pagination.currentPage === 1 }"
          @click.prevent="getPageProducts(pagination.currentPage - 1)"
        >
          <a href="#" class="page-link">&laquo;</a>
        </li>
        <li
          class="page-item"
          :class="{ 'page-item-active': pagination.currentPage === page }"
          v-for="page in pagination.totalPages"
          :key="page"
        >
          <a
            href="#"
            class="page-link"
            :class="{ 'page-link-active': pagination.currentPage === page }"
            @click.prevent="getPageProducts(page)"
            >{{ page }}</a
          >
        </li>
        <li
          class="page-item"
          :class="{
            'page-item-disabled':
              pagination.currentPage === pagination.totalPages,
          }"
          @click.prevent="getPageProducts(pagination.currentPage + 1)"
        >
          <a href="#" class="page-link">&raquo;</a>
        </li>
      </ul>
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
  </div>
</template>

<script>
import smoothscroll from "smoothscroll-polyfill";
import AddToCartAndUpdateFavoriteList from "@/mixins/userPages/AddToCartAndUpdateFavoriteList.js";
import FavoriteDataAndShoppingCartData from "@/mixins/userPages/FavoriteDataAndShoppingCartData";
import LoadingConfiguration from "@/mixins/LoadingConfiguration";
import GetShoppingCartData from "@/mixins/userPages/GetShoppingCartData";

export default {
  name: "Products",
  inject: ["emitter"],
  mixins: [AddToCartAndUpdateFavoriteList, FavoriteDataAndShoppingCartData, LoadingConfiguration, GetShoppingCartData],
  data() {
    return {
      products: [], // 全部商品資料
      categoryProducts: [], // 當前類別商品資料
      filteredProducts: [], // 當前分頁的商品陣列
      pagination: {
        currentPage: "", // 當前頁面
        totalPages: "", // 總頁數
        maxProductsPage: "", // 滿足最大商品數的頁數
        maxProductsNum: 12, // 滿足頁面需求商品數
      },
      categoryTag: [], // API的類別陣列
      searchWord: "", //當前搜尋的字詞
      productsSorterToggle: false, // 切換目前商品排序
      nutrientContentVisible: false, // 切換營養成分隱藏&顯示
      currentFilterTag: "全部商品", // 當前的篩選標籤
      currentSortTag: "價錢", // 當前的排序標籤
      nutrientContentName: "", // 當前的營養成分名稱
      nutrientContentUnit: "", // 當前的營養成分單位
      searchPriceMinNum: "", // 價格區間的最小值
      searchPriceMaxNum: "", // 價格區間的最大值
      searchPriceStatus: false, // 價格區間搜尋狀態
      productsSearchStatus: false, // 搜尋狀態
      isLoading: false, // Loading元件(全域)
    };
  },
  computed: {
    // 計算目前類別的商品數量
    categoryProductsLength() {
      return this.categoryProducts.length;
    },
    // 價錢低到高 排序功能
    priceLowToHigh() {
      return this.filteredProducts
        .filter((item) => item)
        .sort(function (a, b) {
          return a.price - b.price;
        });
    },
    // 價錢高到低 排序功能
    priceHighToLow() {
      return this.filteredProducts
        .filter((item) => item)
        .sort(function (a, b) {
          return b.price - a.price;
        });
    },
    // 營養成分低到高 排序功能
    nutritionLowToHigh() {
      const name = this.nutrientContentName;
      return this.filteredProducts
        .filter((item) => item.nutrientContent)
        .sort(function (a, b) {
          return a.nutrientContent[name] - b.nutrientContent[name];
        });
    },
    // 營養成分高到低 排序功能
    nutritionHighToLow() {
      const name = this.nutrientContentName;
      return this.filteredProducts
        .filter((item) => item.nutrientContent)
        .sort(function (a, b) {
          return b.nutrientContent[name] - a.nutrientContent[name];
        });
    },
  },
  methods: {
    // 取得全部商品資料
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;

      vm.$http.get(api).then((res) => {
        vm.products = res.data.products;
        // 從API提取出類別資料，並重組陣列。
        const categories = this.products.map((item) => item.category);
        // 提取出不重複的類別
        vm.categoryTag = categories.filter(
          (item, index, array) => array.indexOf(item) === index
        );
        vm.productsFilter();
      });
    },
    // 篩選商品
    productsFilter(productTag = "全部商品", keyword) {
      this.categoryProducts = this.products; // 每次使用原資料做篩選
      this.searchWord = ""; // 清空搜尋欄
      this.productsSearchStatus = false; // 關閉搜尋狀態
      this.searchPriceStatus = false; // 關閉價格區間搜尋狀態
      this.searchPriceMinNum = ""; // 清空價格區間最小值
      this.searchPriceMaxNum = ""; // 清空價格空間最大值
      this.nutrientContentVisible = false; // 顯示營養成分標籤
      this.currentSortTag = "價錢"; // 當前的排序標籤 預設為 價錢
      this.productsSorterToggle = false; // 將切換排序icon改為 低到高(預設)

      if (productTag === "全部商品") {
        this.currentFilterTag = productTag;
      } else if (productTag === "特價商品") {
        this.currentFilterTag = productTag;
        this.categoryProducts = this.products.filter(
          (item) => item.origin_price !== item.price
        );
      } else {
        this.currentFilterTag = keyword;
        this.categoryProducts = this.products.filter(
          (item) => item.category === keyword
        );
      }

      // 渲染當前分頁畫面
      this.getPageProducts();
    },
    // 渲染當前頁面
    getPageProducts(page = 1) {
      this.pagination.currentPage = page;
      this.pagination.totalPages = Math.ceil(this.categoryProducts.length / 12);
      this.pagination.maxProductsPage = Math.floor(
        this.categoryProducts.length / 12
      );
      const productsLength = this.categoryProducts.length; // 當前類別的總商品數

      // 依商品剩餘量，判斷呈現畫面的數量
      if (page === 1) {
        this.pagination.maxProductsPage >= page
          ? (this.filteredProducts = this.categoryProducts.slice(
              0,
              this.pagination.maxProductsNum
            ))
          : (this.filteredProducts = this.categoryProducts.slice(
              0,
              productsLength
            ));
      } else if (page > 1) {
        this.pagination.maxProductsPage >= page
          ? (this.filteredProducts = this.categoryProducts.slice(
              this.pagination.maxProductsNum * (page - 1),
              this.pagination.maxProductsNum * page
            ))
          : (this.filteredProducts = this.categoryProducts.slice(
              this.pagination.maxProductsNum * (page - 1),
              productsLength
            ));
      } else {
        this.filteredProducts = this.categoryProducts.slice(
          this.pagination.maxProductsNum * (page - 1),
          productsLength
        );
      }

      // 將所有產品資料 預設為 金額低到高
      this.filteredProducts = this.priceLowToHigh;
      // 滾動至頂
      this.goTop();
    },
    // 商品搜尋
    productsSearch(keyword) {
      this.searchPriceStatus = false; // 關閉價格區間搜尋狀態
      this.searchPriceMinNum = ""; // 清空價格區間最小值
      this.searchPriceMaxNum = ""; // 清空價格空間最大值
      const vm = this;
      vm.productsSearchStatus = true; // 開啟 關鍵字搜尋狀態
      // 搜尋關鍵字
      vm.categoryProducts = vm.products.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
      // 渲染畫面，判斷有無分頁。
      this.getPageProducts();
    },
    // 產品排序 (預設為低到高)
    productsSorter(sortingName) {
      this.productsSorterToggle = false; // 將切換排序icon改為 低到高(預設)
      switch (sortingName) {
        case "價錢":
          this.nutrientContentVisible = false; // 顯示商品標籤
          this.currentSortTag = sortingName; // 標示當前的 標籤
          this.filteredProducts = this.priceLowToHigh;
          break;
        case "熱量":
          this.nutrientContentVisible = true; // 顯示營養成分
          this.currentSortTag = sortingName; // 標示當前的 標籤
          this.nutrientContentName = "calories"; // 標示當前的營養成分 名稱
          this.nutrientContentUnit = "k"; // 標示當前的營養成分 單位
          this.filteredProducts = this.nutritionLowToHigh;
          break;
        case "蛋白質":
          this.nutrientContentVisible = true; // 顯示營養成分
          this.currentSortTag = sortingName; // 標示當前的 標籤
          this.nutrientContentName = "protein"; // 標示當前的營養成分 名稱
          this.nutrientContentUnit = "g"; // 標示當前的營養成分 單位
          this.filteredProducts = this.nutritionLowToHigh;
          break;
        case "脂肪":
          this.nutrientContentVisible = true; // 顯示營養成分
          this.currentSortTag = sortingName; // 標示當前的 標籤
          this.nutrientContentName = "fat"; // 標示當前的營養成分 名稱
          this.nutrientContentUnit = "g"; // 標示當前的營養成分 單位
          this.filteredProducts = this.nutritionLowToHigh;
          break;
        case "碳水化合物":
          this.nutrientContentVisible = true; // 顯示營養成分
          this.currentSortTag = sortingName; // 標示當前的 標籤
          this.nutrientContentName = "carbohydrates"; // 標示當前的營養成分 名稱
          this.nutrientContentUnit = "g"; // 標示當前的營養成分 單位
          this.filteredProducts = this.nutritionLowToHigh;
          break;
      }
    },
    // 商品排序 (切換)
    sortingController(nowTag, status) {
      this.productsSorterToggle = status === "低到高" ? false : true;
      if (nowTag === "價錢") {
        this.filteredProducts =
          status === "低到高" ? this.priceLowToHigh : this.priceHighToLow;
      } else {
        this.filteredProducts =
          status === "低到高"
            ? this.nutritionLowToHigh
            : this.nutritionHighToLow;
      }
    },
    // 商品價格區間 (預設為低到高)
    searchPriceRangeProducts(minNum, maxNum) {
      if (
        minNum &&
        maxNum !== "" &&
        maxNum > minNum &&
        !isNaN(maxNum) &&
        !isNaN(minNum)
      ) {
        this.searchWord = ""; // 清空搜尋欄
        this.productsSearchStatus = false; // 關閉搜尋狀態
        this.searchPriceStatus = true; // 開啟搜尋狀態
        const min = parseInt(minNum);
        const max = parseInt(maxNum);

        // 每次使用原資料做篩選
        // 篩選出價格區間內的商品
        let filteredProducts = this.products
          .filter((item) => item.price < max)
          .filter((item) => item.price > min);

        if (filteredProducts.length === 0) {
          this.$swal.fire("此價格區間內查無商品");
        } else {
          this.categoryProducts = filteredProducts;
          this.getPageProducts();
        }
      } else if (
        (minNum && maxNum !== "" && maxNum < minNum) ||
        isNaN(maxNum) ||
        isNaN(minNum)
      ) {
        this.$swal.fire("商品的價格區間輸入格式或範圍有錯誤");
      } else {
        this.$swal.fire("請先輸入想查詢的商品價格範圍哦!");
      }
    },
    // 滾動至頂
    goTop() {
      smoothscroll.polyfill();
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    },
  },
  created() {
    // 取得API商品資料
    this.getProducts();
  },
};
</script>
