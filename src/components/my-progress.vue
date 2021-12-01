<template>
  <!-- tpbc指transparent background color 透明背景颜色 -->
  <div class="tpbc">
    <div class="progress-wrapper">
      <div class="progress" :style="'width:' + precentage + '%'"></div>
      <div class="pointer" :style="'left:' + precentage + '%'"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    precentage: { required: true, default: 0 },
  },
  // mounted() {
  //   this.setPointer();
  // },
  // computed: {
  //   precent() {
  //     return this.precentage;
  //   },
  // },
  // methods: {
  //   setPointer() {
  //     const progress = document.getElementsByClassName("progress")[0];
  //     const pointer = document.getElementsByClassName("pointer")[0];
  //     progress.style.width = this.precent + "%";
  //     pointer.style.left = this.precent + "%";
  //   },
  // },
  // watch: {
  //   precentage(val1, val2) {
  //     console.log(val1);
  //     console.log(val2);
  //     this.setPointer();
  //     // return this.precentage;
  //   },
  // },
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