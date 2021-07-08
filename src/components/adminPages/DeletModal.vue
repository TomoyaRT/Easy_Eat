<template>
  <div class="admin-page-delet-modal">
    <div class="delet-modal-container">
      <div class="delet-modal-header">
        <div class="delet-modal-title">刪除{{ data.title }}</div>
        <i class="bi bi-x-lg" @click="$emit('close-modal')"></i>
      </div>
      <div class="delet-modal-main">
        確定要刪除<span>{{ data.title }}</span>
      </div>
      <div class="delet-modal-footer">
        <button type="button" class="cancel-btn" @click="$emit('close-modal')">
          取消
        </button>
        <button
          type="button"
          class="delete-btn"
          @click="$emit('delete-product', data)"
        >
          確定刪除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}, // 接收父元件的資料
    };
  },
  watch: {
    // 單一數據流，使用tempProduct接收、更改、並回傳。
    deletModal() {
      this.data = this.deletModal;
    },
  },
  props: {
    deletModal: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
