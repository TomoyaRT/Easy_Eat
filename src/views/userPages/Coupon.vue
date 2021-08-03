<template>
  <div class="user-page-coupon">
    <div class="coupon-container">
      <img
        class="jigsaw-puzzle-bg"
        src="@/../public/images/promotion-bg.svg"
        alt="拼圖的背景圖片"
      />
      <img
        class="jigsaw-puzzle-title"
        src="@/../public/images/promotion-title.svg"
        alt="優惠券頁面標題"
      />
      <div class="how-to-play">
        {{ playMethod }}交換位置
        <i class="bi bi-arrow-left-right"></i>
      </div>
      <div class="jigsaw-puzzle-container">
        <div class="jigsaw-puzzle">
          <div class="jigsaw-puzzle-piece" v-for="n in 9" :key="n">
            <img
              :src="
                require(`@/../public/images/puzzle/${
                  currentImgNameOrder[n - 1]
                }.jpg`)
              "
              alt="拼圖的部分圖片"
              :class="{
                start: targetStartNum === n - 1,
                enter: targetEnterNum === n - 1,
              }"
              draggable="true"
              @mousedown="classChange($event, 'start')"
              @mouseup="classChange($event, 'cancel')"
              @dragstart="dragStart"
              @dragover.prevent
              @dragenter.prevent="dragEnter"
              @dragend="dragEnd"
              @drop="dropped"
              @touchstart="touchStart"
              :data-num="n - 1"
            />
          </div>
        </div>
      </div>
      <CouponModal
        :coupon-modal-status="couponModalStatus"
        @close-coupon-modal="couponModalStatus = false"
        @random-puzzle="getRandomOrder"
        @copy-coupon-code="copyCoupon"
      />
    </div>
  </div>
</template>

<script>
import CouponModal from "../../components/userPages/CouponModal.vue";

export default {
  components: {
    CouponModal,
  },
  data() {
    return {
      couponModalStatus: false,
      // S型 正確擺放方式
      correctImgNameOrder: ["9", "8", "7", "6", "5", "4", "3", "2", "1"],
      // 當前擺放位置
      currentImgNameOrder: [],
      targetStartNum: false, // 拖移起、點擊起
      targetEnterNum: false, // 拖移後、點擊後
      playMethod: "拖移", // 玩法說明
      coupon: "", // 優惠券代碼
    };
  },
  methods: {
    // 將拼圖隨機擺放
    getRandomOrder() {
      this.currentImgNameOrder = [];
      const numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const randomNumArray = [];
      let randomIndex;
      let i = 0;
      while (i < 9) {
        randomIndex = Math.floor(Math.random() * numArray.length);
        randomNumArray.push(numArray[randomIndex]);
        numArray.splice(randomIndex, 1);
        i += 1;
      }
      randomNumArray.forEach((obj) => {
        const str = `${this.correctImgNameOrder[obj]}`;
        this.currentImgNameOrder.push(str);
      });
    },
    // 改變拼圖樣式
    classChange(e, status) {
      const vm = this;
      switch (status) {
        case "start":
          vm.targetStartNum = parseInt(e.target.dataset.num, 10);
          break;
        case "enter":
          vm.targetEnterNum = parseInt(e.target.dataset.num, 10);
          break;
        case "cancel":
          vm.targetStartNum = false;
          vm.targetEnterNum = false;
          break;
        default:
          break;
      }
    },
    // 拖移起，拼圖懸空。
    dragStart(e) {
      const vm = this;
      vm.classChange(e, "start");
      // 夾帶此拼圖方格的位置資料
      e.dataTransfer.setData("text/plain", e.target.dataset.num);
    },
    // 拖移中，抵達可放入拼圖的目標位置
    dragEnter(e) {
      const vm = this;
      vm.classChange(e, "enter");
    },
    // 拖移後，放入該位置
    dragEnd() {
      const vm = this;
      vm.classChange("none", "cancel");
    },
    // 拖移完成
    dropped(e) {
      const vm = this;
      // 取得新拼圖方格的位置資料
      const dragNum = e.dataTransfer.getData("text/plain");
      // 取得原拼圖方格的位置資料
      const targetNum = parseInt(e.target.dataset.num, 10);
      vm.changePuzzlePlace(dragNum, targetNum);
      vm.classChange("none", "cancel");
      vm.isPuzzleComplete();
    },
    // 交換拼圖的位置
    changePuzzlePlace(num1, num2) {
      const vm = this;
      const data = vm.currentImgNameOrder;
      [data[num1], data[num2]] = [data[num2], data[num1]];
      vm.currentImgNameOrder = data;
    },
    // 支援手機的觸發事件
    touchStart(e) {
      const vm = this;
      const currentTargetNum = parseInt(e.target.dataset.num, 10);
      const targetNum = vm.targetStartNum;
      e.preventDefault();
      if (currentTargetNum === targetNum) {
        vm.classChange("none", "cancel");
        return;
      }
      if (targetNum) {
        vm.classChange("none", "cancel");
        vm.changePuzzlePlace(currentTargetNum, targetNum);
        vm.isPuzzleComplete();
      } else {
        vm.classChange(e, "start");
      }
    },
    // 完成拼圖
    isPuzzleComplete() {
      const vm = this;
      if (
        vm.correctImgNameOrder.toString() === vm.currentImgNameOrder.toString()
      ) {
        setTimeout(() => {
          this.couponModalStatus = true;
        }, 300);
      }
    },
    // 複製優惠券代碼的使用者提示訊息
    copyCoupon() {
      this.$swal.fire("複製成功!", "您已獲得優惠券代碼", "success");
      this.couponModalStatus = false;
      this.getRandomOrder();
    },
  },
  // 生命週期
  created() {
    this.getRandomOrder();
    if (window.ontouchstart === null) {
      this.playMethod = '點擊';
    }
  },
};
</script>
