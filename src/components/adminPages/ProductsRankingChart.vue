<script>
import { Doughnut } from "vue3-chart-v2";

export default {
  extends: Doughnut,
  mounted() {
    this.renderChart(
      {
        labels: [
          "翡翠沙拉",
          "豪邁工作餐",
          "活力午餐GoGoGo",
          "經典焦糖吐司套餐",
          "烈陽中的一抹餚香",
        ],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#EAA495",
            ],
            data: [40, 20, 80, 10, 20],
          },
        ],
      },
      { responsive: true, maintainAspectRatio: true }
    );
  },
};
</script>
