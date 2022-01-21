<template>
  <div class="music_action_wrapper">
    <p>{{ getIndexNum(listIndex) }}</p>
    <i v-if="item.like == 1" class="iconfont icon-likefill" @click="like()"></i>
    <i v-else class="iconfont icon-like" @click="like()"></i>
    <i v-if="item.download == 1" class="iconfont icon-chenggong"></i>
    <el-icon v-else class="download_icon" @click="downLoad()"
      ><download
    /></el-icon>
  </div>
</template>

<script>
export default {
  props: ["listIndex"],
  data() {
    return {
      item: { like: 0, download: 0 },
    };
  },
  methods: {
    // 自定义列表的索引
    getIndexNum(num) {
      if (num < 9) {
        let num1 = num + 1;
        return "0" + num1;
      } else {
        let num2 = num + 1;
        return num2;
      }
    },
    // 点击喜欢
    like() {
      this.item.like == 0 ? (this.item.like = 1) : (this.item.like = 0);
    },
    downLoad() {
      this.item.download == 0
        ? (this.item.download = 1)
        : (this.item.download = 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.music_action_wrapper {
  display: flex;
  align-items: center;

  p {
    font-size: 0.14rem;
    color: #999;
    margin-right: 0.05rem;
  }
  i {
    margin-right: 0.05rem;
  }
  /* 喜欢和下载两个icon */
  /deep/ i.iconfont.icon-like {
    font-size: 0.22rem;
    color: #b3b3b3;
  }
  /deep/ i.iconfont.icon-like:hover {
    cursor: pointer;
    color: #606266;
  }
  /deep/ i.iconfont.icon-likefill {
    font-size: 0.22rem;
    color: #ec4141;
  }
  /deep/ i.iconfont.icon-likefill:hover {
    cursor: pointer;
    color: #d73535;
  }
  /deep/ i.iconfont.icon-chenggong {
    font-size: 0.18rem;
    color: #507daf;
  }
  /deep/ i.el-icon.download_icon {
    --font-size: 0.18rem;
    color: #b3b3b3;
  }
  /deep/ i.el-icon.download_icon:hover {
    cursor: pointer;
    color: #606266;
  }
}
</style>