<template>
  <!-- 流程圖容器 -->
  <div class="checkout-flowchart">
    <!-- 流程圖 外框與圓點容器 -->
    <div class="checkout-flowchart-status-container">
      <!-- 流程圓點外框 -->
      <div class="checkout-flowchart-status-frame">
        <!-- 流程圓點 -->
        <div
          class="checkout-flowchart-status"
          :class="{ active: flowchartStatus === 'OrderForm' }"
        ></div>
      </div>
      <div class="checkout-flowchart-status-frame">
        <div
          class="checkout-flowchart-status"
          :class="{ active: flowchartStatus === 'Checkout' }"
        ></div>
      </div>
      <div class="checkout-flowchart-status-frame">
        <div
          class="checkout-flowchart-status"
          :class="{ active: flowchartStatus === 'Payment' }"
        ></div>
      </div>
    </div>
    <!-- 流程線 -->
    <div class="checkout-flowchart-line"></div>
    <!-- 流程文字說明 -->
    <ul class="checkout-flowchart-title-container">
      <li>訂單資料</li>
      <li>確認付款</li>
      <li>完成購買</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    flowchartStatus: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>
