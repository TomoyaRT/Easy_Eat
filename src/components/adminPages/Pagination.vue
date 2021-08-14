<template>
  <!-- 分頁標籤 -->
  <div class="admin-page-pagination-container">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ 'page-item-disabled': !pagination.has_pre }"
        @click.prevent="changePage(pagination.current_page - 1)"
      >
        <a href="#" class="page-link">&laquo;</a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ 'page-item-active': pagination.current_page === page }"
      >
        <a
          href="#"
          class="page-link"
          :class="{ 'page-link-active': pagination.current_page === page }"
          @click.prevent="changePage(page)"
          >{{ page }}</a
        >
      </li>
      <li
        class="page-item"
        :class="{ 'page-item-disabled': !pagination.has_next }"
        @click.prevent="changePage(pagination.current_page + 1)"
      >
        <a href="#" class="page-link">&raquo;</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    changePage(page) {
      // 變更頁數
      this.$emit("change-page", page);
      // 滾動至頂
    },
  },
};
</script>
