<template>
  <!-- 收件人 表單驗證 -->
  <Form
    @submit="createOrder"
    v-slot="{ isSubmitting }"
    class="recipient-information-container"
  >
    <div class="same-orderer-information-container">
      <i
        class="bi bi-circle"
        v-if="!copyOrdererFormData"
        @click="copyOrdererFormData = true"
      ></i>
      <i class="bi bi-check-circle-fill" v-else></i>
      <span class="same-orderer-information" @click="copyOrdererFormData = true"
        >同訂購人表單資料</span
      >
    </div>
    <Field
      v-model="recipientForm.user.name"
      name="姓名"
      class="user-name-container"
      type="text"
      rules="required"
      v-slot="{ field, meta }"
      as="div"
    >
      <label class="user-name">姓名</label>
      <input
        type="text"
        class="user-name-input"
        :class="{
          'is-invalid': !meta.valid && meta.touched,
          'is-valid': meta.valid,
        }"
        v-bind="field"
        placeholder="請輸入真實姓名"
      />
      <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
      <i class="bi bi-x-circle-fill" v-if="!meta.valid && meta.touched"></i>
      <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
    </Field>
    <div class="user-address-container">
      <div class="user-address">地址</div>

      <div class="user-address-wrap">
        <Field
          name="user-address-county-select-container"
          rules="required"
          v-slot="{ field, meta }"
          v-model="recipientForm.recipientCountySelectIndex"
        >
          <select
            class="user-address-county-select"
            @change="getRegion(recipientForm.recipientCountySelectIndex)"
            v-bind="field"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
          >
            <option selected disabled :value="null">請選擇縣市</option>
            <option
              v-for="(item, index) in areaList"
              :key="item.county"
              :value="index"
            >
              {{ item.county }}
            </option>
          </select>
        </Field>
        <Field
          name="user-address-county-select"
          rules="required"
          v-slot="{ field, meta }"
          v-model="recipientForm.recipientRegionSelectIndex"
        >
          <select
            class="user-address-region-select"
            v-bind="field"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
          >
            <option selected disabled :value="null">請選擇鄉鎮區</option>
            <option
              v-for="(item, index) in regionList"
              :key="item"
              :value="index"
            >
              {{ item }}
            </option>
          </select>
        </Field>
      </div>
      <Field
        v-model="recipientForm.user.address"
        name="地址"
        type="text"
        rules="required"
        v-slot="{ field, meta }"
      >
        <input
          type="text"
          class="user-address-input"
          placeholder="請輸入地址"
          :class="{
            'is-invalid': !meta.valid && meta.touched,
            'is-valid': meta.valid,
          }"
          v-bind="field"
        />
        <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
        <i class="bi bi-x-circle-fill" v-if="!meta.valid && meta.touched"></i>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </Field>
    </div>
    <Field
      v-model="recipientForm.user.tel"
      name="手機"
      type="text"
      rules="digits:10|required"
      v-slot="{ field, meta }"
    >
      <div class="user-phone-container">
        <div class="user-phone">手機</div>
        <input
          type="text"
          class="user-phone-input"
          placeholder="請輸入手機電話"
          :class="{
            'is-invalid': !meta.valid && meta.touched,
            'is-valid': meta.valid,
          }"
          v-bind="field"
          maxlength="10"
        />
        <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
        <i class="bi bi-x-circle-fill" v-if="!meta.valid && meta.touched"></i>
        <ErrorMessage name="手機" class="invalid-feedback"></ErrorMessage>
      </div>
    </Field>
    <Field
      v-model="recipientForm.user.email"
      name="電子信箱"
      type="email"
      rules="email|required"
      v-slot="{ field, meta }"
    >
      <div class="user-email-container">
        <div class="user-email">電子信箱</div>
        <input
          type="text"
          class="user-email-input"
          placeholder="請輸入電子郵件"
          :class="{
            'is-invalid': !meta.valid && meta.touched,
            'is-valid': meta.valid,
          }"
          v-bind="field"
        />
        <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
        <i class="bi bi-x-circle-fill" v-if="!meta.valid && meta.touched"></i>
        <ErrorMessage name="電子信箱" class="invalid-feedback"></ErrorMessage>
      </div>
    </Field>
    <div class="user-remark-container">
      <div class="user-remark">備註</div>
      <textarea
        class="user-remark-textarea"
        v-model="recipientForm.message"
      ></textarea>
    </div>
    <div class="form-btn-container">
      <button type="button" class="btn-go-back" @click="goPrevStep">
        上一步
      </button>
      <button type="submit" class="btn-go-checkout" :disabled="isSubmitting">
        開始結帳
      </button>
    </div>
  </Form>
</template>

<script>
import areaList from "@/assets/json/areaList";

export default {
  // 使用父元件的 emitter元件
  inject: ["emitter"],
  props: {
    // 訂購人資料
    ordererFormData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      areaList, // 縣市鄉鎮區資料
      regionList: "", // 鄉鎮區列表
      copyOrdererFormData: false, // 是否勾選複製訂購人資料
      // 收件人表單
      recipientForm: {
        recipientCountySelectIndex: null, // 收件人 當前縣市索引
        recipientRegionSelectIndex: null, // 收件人 當前鄉鎮區索引
        user: {
          name: "",
          address: "",
          tel: "",
          email: "",
        },
        message: "",
      },
    };
  },
  watch: {
    // 收件人 當選擇縣市選單時，鄉鎮區選單保持預設值
    "recipientForm.recipientCountySelectIndex"(nVal, oVal) {
      // 當沒有勾選 複製訂購人資料時，保持更動恢復預設值。
      if (this.copyOrdererFormData && oVal === null) {
        return;
      } else if (nVal !== oVal) {
        this.recipientForm.recipientRegionSelectIndex = null;
      }
    },
    // 監聽 複製訂購人資料的按鈕
    copyOrdererFormData(nVal) {
      if (nVal) {
        // 深拷貝ordererForm表單資料
        this.recipientForm = JSON.parse(JSON.stringify(this.ordererFormData));
        // 淺拷貝ordererForm地址的縣市資料
        this.recipientForm.recipientCountySelectIndex =
          this.ordererFormData.ordererCountySelectIndex;
        // 淺拷貝ordererForm地址的鄉鎮區資料
        this.recipientForm.recipientRegionSelectIndex =
          this.ordererFormData.ordererRegionSelectIndex;
        // 開啟列表
        this.getRegion(this.recipientForm.recipientCountySelectIndex);
      } else {
        // 清空recipientForm表單資料
        this.recipientForm = { user: {} };
        // 清空recipientForm地址的縣市資料
        this.recipientForm.recipientCountySelectIndex = null;
        // 清空recipientForm地址的鄉鎮區資料
        this.recipientForm.recipientRegionSelectIndex = null;
      }
    },
  },
  methods: {
    // 上一步
    goPrevStep() {
      // 關閉購物車訂單模板
      this.emitter.emit("switch-order", false);
      // 更新表單標題
      this.$emit("update-form-title", "訂購人資料");
      // 跳轉到上一個元件
      this.$emit("change-form-step", "ordererForm");
    },
    // 創建訂單
    createOrder() {
      // 最後一次更新購物車資料
      this.$emit("update-shopping-cart-products");
      // 建立訂單(會銷毀購物車資料)
      this.$emit("create-order", this.recipientForm);
    },
    // 取得鄉鎮區的列表
    getRegion(countyIndex) {
      if (countyIndex !== null)
        this.regionList = this.areaList[countyIndex].region;
    },
  },
  created() {
    this.emitter.emit("switch-order", false);
  },
};
</script>
