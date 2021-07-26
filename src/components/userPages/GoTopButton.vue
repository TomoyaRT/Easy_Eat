<template>
  <div @click="scrollToTop">
    <i class="bi bi-arrow-up-square-fill"></i>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';

export default {
  methods: {
    // 至頂功能
    scrollToTop() {
      smoothscroll.polyfill();
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    },
  },
};
</script>
