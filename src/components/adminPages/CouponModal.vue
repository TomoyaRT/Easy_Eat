<template>
  <div class="admin-page-coupon-modal">
    <!-- 模板容器 -->
    <div class="coupon-modal-container">
      <!-- 模板標題 -->
      <div class="modal-header-container">
        <h1 class="coupon-modal-title">{{ couponModal.title }}</h1>
        <i class="bi bi-x-lg" @click="$emit('close-modal')"></i>
      </div>
      <!-- 優惠券名稱 -->
      <div class="coupon-name-container">
        <label for="coupon-name" class="coupon-name">名稱</label>
        <input
          type="text"
          id="coupon-name"
          class="coupon-name-input"
          v-model="tempCoupon.title"
        />
      </div>
      <!-- 優惠券序號 -->
      <div class="coupon-serial-number-container">
        <label for="serial-number" class="coupon-serial-number">序號</label>
        <input
          type="text"
          id="serial-number"
          class="coupon-serial-number-input"
          v-model="tempCoupon.code"
        />
      </div>
      <!-- 優惠券優惠折數 -->
      <div class="coupon-discount-container">
        <label for="discount" class="coupon-discount">優惠折數</label>
        <input
          type="number"
          id="discount"
          class="coupon-discount-input"
          v-model.number="tempCoupon.percent"
        />
      </div>
      <!-- 優惠券截止 年 -->
      <h4 class="coupon-deadline">截止時間</h4>
      <div class="coupon-deadline-three-columns-container">
        <select
          name="deadline-year"
          id="deadline-year"
          class="coupon-deadline-year-container"
          v-model.number="selectedTime.year"
          required
        >
          <option value="" selected disabled>年</option>
          <option v-for="y in 11" :key="y" :value="getNowYear + (y - 1)">
            {{ getNowYear + (y - 1) }}
          </option>
        </select>
        <!-- 優惠券截止 月 -->
        <select
          name="deadline-month"
          id="deadline-month"
          class="coupon-deadline-month-container"
          v-model.number="selectedTime.month"
          required
        >
          <option value="" selected disabled>月</option>
          <option v-for="m in 12" :key="m" :value="m">
            {{ timeStr(m) }}
          </option>
        </select>
        <!-- 優惠券截止 日 -->
        <select
          name="deadline-date"
          id="deadline-date"
          class="coupon-deadline-date-container"
          v-model.number="selectedTime.date"
          required
        >
          <option value="" selected disabled>日</option>
          <option v-for="d in getCurrentRangeDate" :key="d" :value="d">
            {{ timeStr(d) }}
          </option>
        </select>
      </div>

      <div class="coupon-deadline-two-columns-container">
        <!-- 優惠券截止 時 -->
        <select
          name="deadline-hour"
          id="deadline-hour"
          class="coupon-deadline-hour-container"
          v-model.number="selectedTime.hour"
          required
        >
          <option value="" selected disabled>時</option>
          <option v-for="h in 24" :key="h" :value="h">
            {{ timeStr(h) }}
          </option>
        </select>
        <!-- 優惠券截止 分 -->
        <select
          name="deadline-minute"
          id="deadline-minute"
          class="coupon-deadline-minute-container"
          v-model.number="selectedTime.minute"
          required
        >
          <option value="" selected disabled>分</option>
          <option v-for="m in 60" :key="m" :value="m">
            {{ timeStr(m) }}
          </option>
        </select>
      </div>

      <!-- 優惠券狀態 -->
      <h3 class="coupon-status-switch">是否啟用</h3>
      <div class="coupon-status-switch-container">
        <input
          type="checkbox"
          id="couponStatus"
          class="switch-checkbox"
          v-model="tempCoupon.is_enabled"
          :true-value="1"
          :false-value="0"
        />
        <label for="couponStatus" class="switch-label"></label>
      </div>
      <!-- 按鈕群組 -->
      <div class="modal-footer-container">
        <button
          type="button"
          class="coupon-modal-cancel"
          @click="$emit('closeModal')"
        >
          取消
        </button>
        <button type="button" class="coupon-modal-create" @click="createCoupon">
          {{ couponModal.btn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 優惠券資料
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    // 動態優惠券內容
    couponModal: {
      type: Object,
      default() {
        return {};
      },
    },
    // 優惠券期限 (修改時使用)
    couponDeadline: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tempCoupon: {},
      selectedTime: this.couponDeadline,
      nowTime: {},
    };
  },

  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
    },
    couponDeadline() {
      this.selectedTime = this.couponDeadline;
    },
  },
  computed: {
    // 年份
    getNowYear() {
      return new Date().getFullYear();
    },
    // 當月天數
    getCurrentRangeDate() {
      const selectedYear = this.selectedTime.year;
      const selectedMonth = this.selectedTime.month;
      const greaterMonth = [1, 3, 5, 7, 8, 10, 12];
      const commonMonth = [2, 4, 6, 9, 11];

      // 先判斷 大月
      if (greaterMonth.includes(selectedMonth)) {
        return 31;
      }
      // 再判斷 小月 (排除二月)
      else if (commonMonth.includes(selectedMonth) && selectedMonth !== 2) {
        return 30;
      }
      // 判斷 如為閏年
      else if (
        (selectedYear % 4 === 0 &&
          selectedYear % 100 !== 0 &&
          selectedYear !== "") ||
        (selectedYear % 400 === 0 && selectedYear !== "")
      ) {
        return 29;
      }
      // 判斷 為平年
      else if (
        (selectedYear % 4 !== 0 &&
          selectedYear % 100 === 0 &&
          selectedYear !== "") ||
        (selectedYear % 400 !== 0 && selectedYear !== "")
      ) {
        return 28;
      }
      // 當沒有選擇年份時，二月回傳空值。
      else {
        return "";
      }
    },
  },
  methods: {
    // 補零
    timeStr(num) {
      let str = "";
      if (num < 10) {
        str = `0${num}`;
      } else {
        str = `${num}`;
      }
      return str;
    },
    createCoupon() {
      // 將時間轉為Unix timestamp格式
      const vm = this;
      const nowTime = { ...vm.selectedTime };
      // 如果為個位數，則補0
      if (nowTime.month < 10) nowTime.month = `0${nowTime.month}`;
      if (nowTime.date < 10) nowTime.date = `0${nowTime.date}`;
      if (nowTime.hour < 10) nowTime.hour = `0${nowTime.hour}`;
      if (nowTime.minute < 10) nowTime.minute = `0${nowTime.minute}`;
      // 先組合字串
      const due_date = `${nowTime.year}-${nowTime.month}-${nowTime.date}T${nowTime.hour}:${nowTime.minute}:00`;
      // 將字串轉換成 unix timestamp格式 並以秒為單位儲存
      const unixTimestamp = Date.parse(due_date) / 1000;
      vm.tempCoupon.due_date = unixTimestamp; // 將時間戳存入資料
      vm.$emit("create-coupon", vm.tempCoupon); // 將coupon資料emit給父層元件
    },
  },
};
</script>
