<template>
  <div class="admin-page-coupons">
    <!-- 優惠券管理列表 Main -->
    <div class="coupons-container">
      <!-- 標題列 -->
      <div class="coupons-title-group">
        <div class="coupons-name">名稱</div>
        <div class="coupons-serial-number">序號</div>
        <div class="coupons-discount">折扣</div>
        <div class="coupons-deadline-date">截止日期</div>
        <div class="coupons-deadline-time">截止時間</div>
        <div class="coupons-status">啟用狀態</div>
        <div class="coupon-edit-btn-group">
          <i
            class="bi bi-toggle2-off"
            @click="couponEditStatus = true"
            v-if="!couponEditStatus"
          ></i>
          <i
            class="bi bi-toggle2-on"
            @click="couponEditStatus = false"
            v-else
          ></i>
        </div>
      </div>
      <!-- 內容列 -->
      <div
        class="coupons-content-group"
        v-for="coupon in coupons"
        :key="coupon.id"
      >
        <div class="coupons-name">{{ coupon.title }}</div>
        <div class="coupons-serial-number">
          <p>{{ coupon.code }}</p>
        </div>
        <div class="coupons-discount">{{ coupon.percent }}</div>
        <div class="coupons-deadline-date">
          {{ new Date(coupon.due_date * 1000).toISOString().split("T")[0] }}
        </div>
        <div class="coupons-deadline-time">
          {{
            new Date(coupon.due_date * 1000)
              .toISOString()
              .split("T")[1]
              .slice(0, 5)
          }}
        </div>

        <div class="coupons-status-enabled" v-if="coupon.is_enabled">啟用</div>
        <div class="coupons-status-unenabled" v-else>未啟用</div>
        <i
          class="bi bi-pencil-fill"
          @click="openModal('修改優惠券', coupon)"
          v-if="couponEditStatus"
        ></i>
        <i
          class="bi bi-trash"
          @click="openModal('刪除優惠券', coupon)"
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
    <Pagination :pagination="pagination" @change-page="getCoupon" />
    <!-- 優惠券模板 -->
    <CouponModal
      :class="{ 'modal-active': couponModalStatus }"
      :coupon="tempCoupon"
      :coupon-deadline="couponDeadline"
      :coupon-modal="couponModal"
      @close-modal="couponModalStatus = false"
      @create-coupon="updateCoupon"
    />
    <!-- 刪除模板 -->
    <DeletModal
      :class="{ 'modal-active': deletModalStatus }"
      :delet-modal="tempCoupon"
      @close-modal="deletModalStatus = false"
      @delete-product="updateCoupon"
    />
  </div>
</template>

<script>
import CouponModal from "../../components/adminPages/CouponModal.vue";
import AdminPagesUniversal from "../../mixins/adminPages/AdminPagesUniversal";
import LoadingConfiguration from "../../mixins/LoadingConfiguration";

export default {
  mixins: [AdminPagesUniversal, LoadingConfiguration],
  components: {
    CouponModal,
  },
  data() {
    return {
      coupons: [],
      couponModalStatus: false, // 優惠券模板 開關
      deletModalStatus: false, // 刪除模板 開關
      couponEditStatus: true, // 切換編輯/刪除
      couponStatus: "", // 當前優惠券狀態
      tempCoupon: {}, // 優惠券模板資料
      couponModal: {
        // 優惠券模板內容
        title: "",
        btn: "",
      },
      couponDeadline: {}, // 優惠券模板的資料(日期與時間)
    };
  },
  methods: {
    // 取得優惠券資料
    getCoupon(page = 1) {
      this.isLoading = true; // 開啟Loading元件
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      
      // 發送API
      this.$http.get(api).then((res) => {
        this.isLoading = false; // 關閉Loading元件
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
      });
    },
    // 打開商品模板功能
    openModal(status, item) {
      this.couponStatus = status; // 保存目前優惠券狀態
      if (status === "新增優惠券") {
        this.tempCoupon = {}; // 清空模板內容
        this.couponDeadline = {};
        this.couponModal = { title: "新增優惠券", btn: "建立" };
        this.couponModalStatus = true; // 如為優惠券管理頁面，則開啟優惠券模板
      } else if (status === "修改優惠券") {
        this.tempCoupon = { ...item }; // 淺拷貝模板內容
        this.couponDeadline.year = Number(
          new Date(this.tempCoupon.due_date * 1000)
            .toISOString()
            .split("T")[0]
            .slice(0, 4)
        );
        this.couponDeadline.month = Number(
          new Date(this.tempCoupon.due_date * 1000)
            .toISOString()
            .split("T")[0]
            .slice(5, 7)
        );
        this.couponDeadline.date = Number(
          new Date(this.tempCoupon.due_date * 1000)
            .toISOString()
            .split("T")[0]
            .slice(8, 10)
        );
        this.couponDeadline.hour = Number(
          new Date(this.tempCoupon.due_date * 1000)
            .toISOString()
            .split("T")[1]
            .slice(0, 2)
        );
        this.couponDeadline.minute = Number(
          new Date(this.tempCoupon.due_date * 1000)
            .toISOString()
            .split("T")[1]
            .slice(3, 5)
        );
        this.couponModal = { title: "修改優惠券", btn: "更新" };
        this.couponModalStatus = true; // 如為優惠券管理頁面，則開啟優惠券模板
      } else {
        this.tempCoupon = { ...item }; // 淺拷貝模板內容
        this.deletModalStatus = true; // 如為優惠券管理頁面，則開啟優惠券模板
      }
    },
    // 新增優惠券
    updateCoupon(coupon) {
      this.isLoading = true; // 開啟Loading元件
      this.tempCoupon = coupon;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = "post";
      // 編輯商品
      if (this.couponStatus === "修改優惠券") {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
        httpMethod = "put";
      } else if (this.couponStatus === "刪除優惠券") {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`;
        httpMethod = "delete";
      }
      // 發送API
      this.$http[httpMethod](api, { data: coupon }).then((res) => {
        this.isLoading = false; // 關閉Loading元件
        this.couponModalStatus = false;
        this.deletModalStatus = false;
        this.getCoupon();
        this.$emit('update-coupons-number');
        switch (this.couponStatus) {
          case "新增優惠券":
            this.$httpMessageState(res, "新增優惠券");
            break;
          case "修改優惠券":
            this.$httpMessageState(res, "修改優惠券");
            break;
          default:
            this.$httpMessageState(res, "刪除優惠券");
        }
      });
    },
  },
  created() {
    // 更改Navbar頁面標題
    this.$emit("change-navbar-page-title", "優惠券管理");
    // 更改Navbar表單按鈕標題
    this.$emit("change-navbar-btn-title", "建立優惠券");

    // 監聽Navbar的 新增按鈕
    this.emitter.on("open-modal", (status) => {
      if (status === "優惠券管理") {
        this.openModal("新增優惠券");
      }
    });

    // 渲染優惠券列表畫面
    this.getCoupon();
  },
};
</script>

