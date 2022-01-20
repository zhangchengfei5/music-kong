<template>
  <div class="search_detail_wrapper">
    <div class="header">找到300首单曲</div>
    <div class="main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="单曲" name="songs">
          <!-- 歌曲列表 -->
          <div class="songs_list"></div>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="artists"> </el-tab-pane>
        <el-tab-pane label="专辑" name="albums"> </el-tab-pane>
        <el-tab-pane label="视频" name="videos"> </el-tab-pane>
        <el-tab-pane label="歌单" name="playLists"> </el-tab-pane>
        <el-tab-pane label="歌词" name="lyrics"> </el-tab-pane>
        <el-tab-pane label="播客" name="bokes"> </el-tab-pane>
        <el-tab-pane label="用户" name="users"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "search_detail",
  data() {
    return {
      activeName: "songs",
    };
  },
};
</script>

<style lang="scss" scoped>
/* 歌单详情最外层容器 */
.search_detail_wrapper {
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 0.25rem;
  overflow-y: auto;
  overflow-x: hidden;

  /* 可以隐藏滚动条或改变滚动条整体样式 */
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 0.04rem;
  }
  /* 设置内部滚动条的颜色和圆角 */
  &::-webkit-scrollbar-thumb {
    width: 0.1rem;
    background-color: #e6e6e6;
  }

  .el-tabs {
    font-size: 0.2rem;
    width: 100%;
    height: 100%;
  }
  /* 去除标签下面灰色的线 */
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }
  /* 标签下划线的颜色 */
  /deep/ .el-tabs__active-bar {
    background-color: #cc66ff;
  }
  /* 标签字体大小 */
  /deep/ .el-tabs__item {
    font-size: 0.18rem;
  }
  /* 鼠标移入标签时的文字颜色 */
  /deep/ .el-tabs__item:hover {
    cursor: pointer;
    color: #000;
  }
  /* 鼠标点击时标签的文字变大 */
  /deep/ .el-tabs__item.is-active {
    font-size: 0.22rem;
    font-weight: bold;
    color: #000;
  }

  .header {
    font: {
      size: 0.18rem;
      weight: bold;
    }
    color: #373737;
    padding-top: 0.3rem;
    padding-bottom: 0.15rem;
  }
}
</style>