<template>
  <!-- 付款方式 表單驗證 -->
  <div class="payment-method-container">
    <div class="two-payment-method-container">
      <div
        class="credit-card-payment-container"
        :class="{
          'credit-card-container-active': paymentMethod === '信用卡付款',
        }"
        @click="changePaymentMethod('信用卡付款')"
      >
        <i
          class="bi bi-circle"
          :class="{ 'payment-btn-active': paymentMethodStyle === '貨到付款' }"
        ></i>
        <i
          class="bi bi-check-circle"
          :class="{ 'payment-btn-active': paymentMethodStyle === '信用卡付款' }"
        ></i>
        <div class="credit-card-payment">信用卡付款</div>
      </div>
      <div
        class="cash-on-delivery-container"
        :class="{
          'cash-on-delivery-container-active': paymentMethod === '貨到付款',
        }"
        @click="changePaymentMethod('貨到付款')"
      >
        <i
          class="bi bi-circle"
          :class="{ 'payment-btn-active': paymentMethodStyle === '信用卡付款' }"
        ></i>
        <i
          class="bi bi-check-circle"
          :class="{ 'payment-btn-active': paymentMethodStyle === '貨到付款' }"
        ></i>
        <div class="cash-on-delivery">貨到付款</div>
      </div>
    </div>
    <!-- 表單驗證 -->
    <Form @submit="goNextStep" v-slot="{ isSubmitting }" v-if="paymentMethod === '信用卡付款'">
      <Field
        name="credit-card-number"
        type="number"
        rules="digits:16|required"
        v-slot="{ field, meta }"
      >
        <div class="credit-card-number-container">
          <!-- 信用卡卡號 -->
          <label for="credit-card-number" class="credit-card-number-title"
            >信用卡卡號</label
          >
          <input
            id="credit-card-number"
            name="credit-card-number"
            type="text"
            class="credit-card-number-input"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
            v-bind="field"
            v-model.number="creditCard.code"
            @click="creditCardStatus = true"
            maxlength="16"
            placeholder="請輸入信用卡卡號"
          />
          <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
          <i class="bi bi-x-circle-fill" v-if="!meta.valid && meta.touched"></i>
        </div>
      </Field>
      <div class="credit-card-date-container">
        <Field
          v-model.number="creditCard.year"
          name="credit-card-year"
          type="text"
          rules="required"
          v-slot="{ field, meta }"
        >
          <!-- 信用卡 有效日期 -->
          <select
            class="credit-card-year"
            @click="creditCardStatus = true"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
            v-bind="field"
          >
            <option selected disabled :value="null">有效年</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="21">24</option>
            <option value="22">25</option>
            <option value="23">26</option>
          </select>
        </Field>
        <Field
          v-model.number="creditCard.month"
          name="credit-card-month"
          type="text"
          rules="required"
          v-slot="{ field, meta }"
        >
          <select
            class="credit-card-month"
            @click="creditCardStatus = true"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
            v-bind="field"
          >
            <option selected disabled :value="null">有效月</option>
            <option v-for="m in 12" :value="m" :key="m">{{ m }}</option>
          </select>
        </Field>
        <Field
          v-model.number="creditCard.threeCode"
          name="credit-card-three-codes"
          rules="digits:3|required"
          v-slot="{ field, meta }"
        >
          <input
            type="text"
            class="credit-card-three-codes"
            @click="creditCardStatus = false"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
            v-bind="field"
            maxlength="3"
            placeholder="末三碼"
          />
        </Field>
      </div>
      <!-- 信用卡 圖像區 -->
      <div class="credit-card" @click="creditCardStatus = !creditCardStatus">
        <div
          class="card-face card-front"
          :class="{ 'card-front-active': !creditCardStatus }"
        >
          <div class="card-debit">Credit Card</div>
          <div class="card-bank">Bank Name</div>
          <img
            src="../../../public/images/chip.png"
            class="card-chip"
            alt="card-chip"
          />
          <div class="card-number">{{ creditCardCode }}</div>
          <div class="card-valid">
            <span>GOOD<br />THRU</span
            ><span>{{ creditCardMonth }}/{{ creditCard.year }}</span>
          </div>
          <div class="card-holder">Gude Maru</div>
        </div>
        <div
          class="card-face card-back"
          :class="{ 'card-back-active': !creditCardStatus }"
        >
          <div class="card-blackbar"></div>
          <div class="card-ccvtext">
            <p>Autorized Signature-not valid unless signed</p>
          </div>
          <div class="card-whitebar"></div>
          <div class="card-ccv">{{ creditCard.threeCode }}</div>
          <p class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            facere nam, reiciendis rationeLorem ipsum dolor sit amet consectetur
            Nesciunt facere nam.
          </p>
        </div>
      </div>

      <!-- 付款方式 按鈕區 -->
      <div class="form-btn-container">
        <button
          type="button"
          class="btn-go-back"
          @click="$router.push('/usershoppingcart')"
        >
          回購物車
        </button>
        <button
          type="submit"
          class="btn-go-checkout"
          :disabled="isSubmitting"
        >
          下一步
        </button>
      </div>
    </Form>

    <!-- 貨到付款 -->
    <div class="cash-on-delivery-message" v-else>
      <h1>請前往下一步填寫相關表單</h1>
      <img src="../../../public/images/cash-on-delivery.svg" alt="貨到付款圖片">
      <!-- 付款方式 按鈕區 -->
      <div class="form-btn-container">
        <button
          type="button"
          class="btn-go-back"
          @click="$router.push('/usershoppingcart')"
        >
          回購物車
        </button>
        <button
          type="submit"
          class="btn-go-checkout"
          @click="skipVerification"
        >
          下一步
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 使用父元件的 emitter元件
  inject: ["emitter"],
  data() {
    return {
      // 信用卡資料
      creditCard: {
        code: "",
        year: "",
        month: "",
        threeCode: "",
      },
      paymentMethodStyle: "信用卡付款", // 付款方式的按鈕 開啟/關閉
      paymentMethod: "信用卡付款", // 付款的方式 參數
      btnStatus: "paymentMethod", // 訂單資料的三大按鈕
      creditCardStatus: true, // 翻轉信用卡基準 (true = 正面, false = 反面)
    };
  },
  methods: {
    // 跳過驗證 (貨到付款)
    skipVerification() {
      if (this.paymentMethod === "貨到付款") {
        this.goNextStep();
      } else {
        return;
      }
    },
    // 更換付款方式
    changePaymentMethod(status) {
      if (status === this.paymentMethod) {
        return;
      } else if (status === "貨到付款" && this.paymentMethod === "信用卡付款") {
        this.paymentMethod = "貨到付款";
        this.paymentMethodStyle = "貨到付款";
      } else {
        this.paymentMethod = "信用卡付款";
        this.paymentMethodStyle = "信用卡付款";
      }
    },
    // 前往下一個步驟
    goNextStep() {
      // 關閉購物車訂單模板
      this.emitter.emit('switch-order', false);
      // 更新表單標題
      this.$emit('update-form-title', '訂購人資料');
      // 發送該參數給HomePage保存
      this.emitter.emit("payment-method", this.paymentMethod);
      // 跳轉到下一個元件
      this.$emit("change-form-step", "ordererForm");
    },
  },
  computed: {
    // 信用卡卡號 每四個數字空一格
    creditCardCode() {
      return String(this.creditCard.code)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    },
    // 信用卡有效月 個位數補0
    creditCardMonth() {
      return String(this.creditCard.month).padStart(2, "0");
    },
  },
};
</script>
