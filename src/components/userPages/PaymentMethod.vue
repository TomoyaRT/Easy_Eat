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
    <Form
      @submit="goNextStep"
      v-slot="{ isSubmitting }"
      v-if="paymentMethod === '信用卡付款'"
    >
      <Field
        v-model.number="creditCard.code"
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
            class="credit-card-number-input"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
            v-bind="field"
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
        <div class="flip" :class="{ 'flip-active': !creditCardStatus }">
          <div class="front">
            <div class="strip-bottom"></div>
            <div class="strip-top"></div>
            <div class="credit-card-type">VISA</div>
            <div class="back-name">Back Name</div>
            <div class="chip">
              <div class="chip-line"></div>
              <div class="chip-line"></div>
              <div class="chip-line"></div>
              <div class="chip-line"></div>
              <div class="chip-main"></div>
            </div>
            <svg
              class="wave"
              viewBox="0 3.71 26.959 38.787"
              width="26.959"
              height="38.787"
              fill="white"
            >
              <path
                d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z"
              ></path>
              <path
                d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z"
              ></path>
              <path
                d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z"
              ></path>
            </svg>
            <div class="card-number">
              {{ creditCardCode }}
            </div>
            <div class="end">
              <span class="end-text">exp. end:</span
              ><span class="end-date"
                >{{ creditCardMonth }}/{{ creditCard.year }}</span
              >
            </div>
            <div class="card-holder">Gude Maru</div>
            <div class="master">
              <div class="circle master-red"></div>
              <div class="circle master-yellow"></div>
            </div>
          </div>
          <div class="back">
            <div class="strip-black"></div>
            <div class="ccv">
              <div>{{ creditCard.threeCode }}</div>
            </div>
            <div class="terms">
              <p>
                This card is property of Gude Maru Bank. Misuse is
                criminal offence. If found, please return to Gude Maru Bank.
              </p>
              <p>Use of this card is subject to the credit card agreement.</p>
            </div>
          </div>
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
        <button type="submit" class="btn-go-checkout" :disabled="isSubmitting">
          下一步
        </button>
      </div>
    </Form>

    <!-- 貨到付款 -->
    <div class="cash-on-delivery-message" v-else>
      <h1>請前往下一步填寫相關表單</h1>
      <img
        src="../../../public/images/cash-on-delivery.svg"
        alt="貨到付款圖片"
      />
      <!-- 付款方式 按鈕區 -->
      <div class="form-btn-container">
        <button
          type="button"
          class="btn-go-back"
          @click="$router.push('/usershoppingcart')"
        >
          回購物車
        </button>
        <button type="submit" class="btn-go-checkout" @click="skipVerification">
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
      this.emitter.emit("switch-order", false);
      // 更新表單標題
      this.$emit("update-form-title", "訂購人資料");
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
