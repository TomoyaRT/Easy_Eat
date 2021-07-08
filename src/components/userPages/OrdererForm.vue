<template>
  <!-- 訂購人 表單驗證 -->
  <Form
    @submit="goNextStep"
    v-slot="{ isSubmitting }"
    class="orderer-information-container"
  >
    <Field
      v-model="ordererForm.user.name"
      name="姓名"
      type="text"
      rules="required"
      v-slot="{ field, meta }"
    >
      <div class="user-name-container">
        <div class="user-name">姓名</div>
        <input
          type="text"
          class="user-name-input"
          :class="{
            'is-invalid': !meta.valid && meta.touched,
            'is-valid': meta.valid,
          }"
          v-bind="field"
          placeholder="請輸入大名"
        />
        <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
        <i class="bi bi-x-circle-fill" v-if="!meta.valid && meta.touched"></i>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
    </Field>
    <div class="user-address-container">
      <div class="user-address">地址</div>
      <div class="user-address-wrap">
        <Field
          v-model="ordererForm.ordererCountySelectIndex"
          name="user-address-county-select"
          type="text"
          rules="required"
          v-slot="{ field, meta }"
        >
          <select
            class="user-address-county-select"
            @change="getRegion(ordererForm.ordererCountySelectIndex)"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
            v-bind="field"
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
          v-model="ordererForm.ordererRegionSelectIndex"
          name="user-address-region-select"
          type="text"
          rules="required"
          v-slot="{ field, meta }"
        >
          <select
            class="user-address-region-select"
            :class="{
              'is-invalid': !meta.valid && meta.touched,
              'is-valid': meta.valid,
            }"
            v-bind="field"
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
        v-model="ordererForm.user.address"
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
        <error-message name="地址" class="invalid-feedback"></error-message>
      </Field>
    </div>
    <Field
      v-model="ordererForm.user.tel"
      name="手機"
      type="text"
      :rules="{ regex: /^0(9)\d{8}$/ }"
      v-slot="{ field, meta }"
    >
      <div class="user-phone-container">
        <div class="user-phone">手機</div>
        <input
          type="tel"
          class="user-phone-input"
          placeholder="請輸入手機電話 (0912-123-456)"
          :class="{
            'is-invalid': !meta.valid && meta.touched,
            'is-valid': meta.valid,
          }"
          maxlength="10"
          v-bind="field"
        />
        <i class="bi bi-check-circle-fill" v-if="meta.valid"></i>
        <i class="bi bi-x-circle-fill" v-if="!meta.valid && meta.touched"></i>
        <error-message name="手機" class="invalid-feedback"></error-message>
      </div>
    </Field>
    <Field
      v-model="ordererForm.user.email"
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
        <error-message name="電子信箱" class="invalid-feedback"></error-message>
      </div>
    </Field>
    <div class="user-remark-container">
      <div class="user-remark">備註</div>
      <textarea
        class="user-remark-textarea"
        v-model="ordererForm.message"
      ></textarea>
    </div>
    <div class="form-btn-container">
      <button
        type="button"
        class="btn-go-back"
        @click="goPrevStep"
      >
        上一步
      </button>
      <button type="submit" class="btn-go-checkout" :disabled="isSubmitting">
        下一步
      </button>
    </div>
  </Form>
</template>

<script>
import areaList from "@/assets/json/areaList";

export default {
  data() {
    return {
      areaList, // 縣市鄉鎮區資料
      regionList: "", // 鄉鎮區列表
      // 訂購人表單
      ordererForm: {
        ordererCountySelectIndex: null, // 訂購人 當前縣市索引
        ordererRegionSelectIndex: null, // 訂購人 當前鄉鎮區索引
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
    // 訂購人 當選擇縣市選單時，鄉鎮區選單保持預設值
    "ordererForm.ordererCountySelectIndex"(nVal, oVal) {
      if (nVal !== oVal) this.ordererForm.ordererRegionSelectIndex = null;
    },
  },
  methods: {
    // 取得鄉鎮區的列表
    getRegion(countyIndex) {
      if (countyIndex !== null)
        this.regionList = this.areaList[countyIndex].region;
    },
    // 上一步
    goPrevStep() {
      // 更新表單標題
      this.$emit('update-form-title', '付款方式');
      // 跳轉到上一個元件
      this.$emit('change-form-step', 'paymentForm');
    },
    // 下一步
    goNextStep() {
      // 更新表單標題
      this.$emit('update-form-title', '收件人資料');
      // 跳轉到下一個元件
      this.$emit("change-form-step", "recipientForm");
      // 發送該參數給HomePage保存
      this.$emit("send-order-form-data", this.ordererForm);
    },
  },
};
</script>
