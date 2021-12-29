<template>
  <!-- tpbc指transparent background color 透明背景颜色 -->
  <div class="tpbc">
    <div
      class="progress-wrapper"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <div class="progress" :style="'width:' + tPrecent + '%'"></div>
      <div
        class="pointer"
        :style="'left:' + tPrecent + '%'"
        draggable="true"
        @dragstart="dragStart"
        @drag="onDrag"
        @dragend="onDragEnd"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    precentage: { required: true, default: 0 },
  },
  data() {
    return {
      tPrecent: 0,
      cPrecent: 0,
      pointerLeft: 0,
      startX: 0,
      centerX: 0,
      endX: 0,
    };
  },
  created() {
    this.tPrecent = this.precentage;
    this.cPrecent = this.precentage;
  },
  watch: {
    precentage(now, old) {
      this.tPrecent = now;
      this.cPrecent = now;
      console.log(old);
    },
  },
  methods: {
    // 点击准备拖拽
    dragStart(e) {
      // 587 914
      this.startX = e.clientX;
      this.centerX = e.clientX;
      // console.log("开始时的宽度距离666：", e.clientX);
      e.dataTransfer.setData("text/plain", e.target.id);
    },
    // 拖拽过程中
    onDrag(e) {
      let allProgress = document.querySelector(".progress-wrapper");
      let progress = document.getElementsByClassName("progress")[0];
      let pointer = document.getElementsByClassName("pointer")[0];
      this.endX = e.clientX;
      let pre;
      let fp;
      if (this.centerX - this.endX > 0) {
        pre = ((this.centerX - this.endX) / allProgress.clientWidth) * 100;
        fp = this.cPrecent - pre;
        if (fp < 0) {
          fp = 0;
        }
      } else {
        pre = ((this.endX - this.centerX) / allProgress.clientWidth) * 100;
        fp = this.cPrecent + pre;
        if (fp > 100) {
          fp = 100;
        }
      }
      progress.style.width = fp + "%";
      pointer.style.left = fp + "%";
      this.cPrecent = fp;
      this.centerX = e.clientX;
    },
    // 拖拽结束放下鼠标
    onDragEnd(e) {
      // console.log("结束时的宽度距离777：", e.clientX);
      let allProgress = document.querySelector(".progress-wrapper");
      let progress = document.getElementsByClassName("progress")[0];
      let pointer = document.getElementsByClassName("pointer")[0];
      this.endX = e.clientX;
      // console.log("开始-结束是多少：", this.startX - this.endX);
      // console.log("总进度条的宽度：", allProgress.clientWidth);
      let pre;
      let fp;
      if (this.startX - this.endX > 0) {
        pre = ((this.startX - this.endX) / allProgress.clientWidth) * 100;
        fp = this.tPrecent - pre;
        if (fp < 0) {
          fp = 0;
        }
      } else {
        pre = ((this.endX - this.startX) / allProgress.clientWidth) * 100;
        fp = this.tPrecent + pre;
        if (fp > 100) {
          fp = 100;
        }
      }
      progress.style.width = fp + "%";
      pointer.style.left = fp + "%";
      this.tPrecent = fp;
      this.cPrecent = fp;
      this.$emit("dragPro", fp);
    },
    // 让鼠标在拖拽时在父容器内时的鼠标样式变为正常鼠标而不是禁止的样式
    onDragOver(e) {
      e.preventDefault();
    },
  },
};
</script>

<style>
.tpbc {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10px;
  background-color: transparent;
}
.progress-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 4px;
  background-color: #e6e6e6;
}
.progress-wrapper:hover {
  height: 6px;
  top: -1px;
}
.progress-wrapper:hover > .pointer {
  width: 8px;
  height: 8px;
}
.progress-wrapper > .progress {
  position: absolute;
  z-index: 20;
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #cc99ff;
}
.progress-wrapper > .pointer {
  position: absolute;
  z-index: 200;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: -1px;
  left: -3px;
  background-color: #8c1aff;
}
</style>