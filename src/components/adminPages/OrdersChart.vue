<script>
import { Bar } from 'vue3-chart-v2'

export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      datasets: [
        {
          label: '一周的已付款訂單數量',
          backgroundColor: '#37f858',
          data: [3, 7, 12, 9, 5, 15, 20]
        }
      ]
    })
  }
}
</script>
