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
        <h2>八折券序號一組</h2>
        <p>在購物車輸入此序號可享七折優惠</p>
        <input
          type="text"
          readonly="readonly"
          class="coupon-code"
          :value="couponCode"
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
  },
  data() {
    return {
      couponCode: "A5566",
    };
  },
  methods: {
    // 關閉模板
    closeModal() {
      this.$swal.fire({
        title: "再次確認",
        text: "拼圖已完成，是否確定不領取優惠券!?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "領取優惠券",
        cancelButtonText: "不領取",
      }).then((result) => {
        if (result.isConfirmed) {
          this.copyCoupon();
        } else {
          this.$emit('random-puzzle');
          this.$emit('close-coupon-modal');
        }
      });
    },
    // 複製優惠券代碼到剪貼簿
    copyCoupon() {
      const vm = this;
      const cb = navigator.clipboard;
      cb.writeText(vm.couponCode)
        .then(() => {
          vm.$emit("copy-coupon-code");
        })
        ,() => {
          // 使用者回饋訊息
          vm.$httpMessageState("複製優惠券");
        };
    },
  },
};
</script>
