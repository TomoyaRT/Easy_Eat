<template>
  <div
    class="user-page-coupon-modal"
    :class="{ 'coupon-modal-active': couponModalStatus }"
  >
    <div class="coupon-modal" :class="{ 'modal-active': couponModalStatus }">
      <div class="coupon-header">
        <div class="title">完成拼圖</div>
        <i class="bi bi-x-lg" @click="closeModal"></i>
      </div>
      <div class="coupon-main">
        <h3>恭喜獲得</h3>
        <h2>{{ currentCoupon.name }}</h2>
        <p>在購物車輸入此序號可享{{ currentCoupon.discount }}優惠</p>
        <input
          type="text"
          readonly="readonly"
          class="coupon-code"
          :value="currentCoupon.code"
        />
      </div>
      <div class="coupon-footer">
        <button type="button" class="coupon-btn" @click="copyCoupon">
          複製
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 模板樣式開關
    couponModalStatus: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 優惠券資料
    couponData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentCoupon: this.couponData, // 當前優惠券的資料
    };
  },
  watch: {
    // 當 couponData 資料有更動，隨時更新。
    couponData() {
      this.currentCoupon = this.couponData;
    },
  },
  methods: {
    // 複製優惠券代碼到剪貼簿
    copyCoupon() {
      const vm = this;
      navigator.clipboard.writeText(vm.currentCoupon.code).then(
        () => {
          vm.$emit("copy-coupon-code");
        },
        () => {
          // 使用者回饋訊息
          vm.$httpMessageState("failed", "複製優惠券");
        }
      );
    },
    // 關閉模板
    closeModal() {
      this.$swal
        .fire({
          title: "再次確認",
          text: "拼圖已完成，是否確定不領取優惠券!?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "領取優惠券",
          cancelButtonText: "不領取",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.copyCoupon();
          } else {
            this.$emit("random-puzzle");
            this.$emit("random-coupon");
            this.$emit("close-coupon-modal");
          }
        });
    },
  },
};
</script>
