<template>
  <div @click="scrollToTop">
    <i class="bi bi-arrow-up-square-fill"></i>
  </div>
</template>

<script>
export default {
  methods: {
    // 至頂功能
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
