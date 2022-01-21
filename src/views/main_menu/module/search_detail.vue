<template>
  <div class="search_detail_wrapper">
    <div class="header">找到300首单曲</div>
    <div class="main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="单曲" name="songs">
          <!-- S-歌曲列表 -->
          <div class="songs_list">
            <!-- 歌曲列表表头 -->
            <div class="list_header">
              <div class="title"><i>音乐标题</i></div>
              <div class="singer">歌手</div>
              <div class="album">专辑</div>
              <div class="time">时间</div>
            </div>
            <!-- 歌曲列表表体 -->
            <div class="list_body">
              <!-- 每一列 即 每一首歌 -->
              <div class="list_box">
                <div class="title">
                  <music-action :listIndex="0"></music-action>
                  <p>孤勇者</p>
                  <em>《英雄联盟：双城之战》</em>
                </div>
                <div class="singer">陈奕迅</div>
                <div class="album">孤勇者</div>
                <div class="time">4:16</div>
              </div>
            </div>
          </div>
          <!-- E-歌曲列表 -->
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
import musicAction from "../../../components/music_action";

export default {
  name: "search_detail",
  components: { musicAction },
  data() {
    return {
      activeName: "songs",
    };
  },
};
</script>

<style lang="scss" scoped>
$theme: #cc66ff;
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
    background-color: $theme;
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

  // 页面头部
  .header {
    font: {
      size: 0.18rem;
      weight: bold;
    }
    color: #373737;
    padding-top: 0.3rem;
    padding-bottom: 0.15rem;
  }
  // 主题
  .main {
    display: flex;
    flex-direction: column;

    .songs_list {
      display: flex;
      flex-direction: column;
      font-size: 0.14rem;
      color: #999;
      .title {
        flex: 5;

        > i {
          font-style: normal;
          margin-left: 0.8rem;
        }
      }
      .singer {
        flex: 2;
      }
      .album {
        flex: 3;
      }
      .time {
        flex: 1;
      }

      .list_header {
        display: flex;
        align-items: center;
        user-select: none;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        padding: 0.1rem;
      }
      .list_body {
        display: flex;
        flex-direction: column;
        padding: 0.05rem 0;

        .list_box {
          display: flex;
          align-items: center;
          padding: 0.1rem;

          &:hover {
            background-color: #f0f1f2;
            cursor: pointer;
          }

          .title {
            display: flex;
            align-items: center;
            p {
              margin: 0 0.1rem;
            }
            em {
              font-style: normal;
            }
          }
          .singer,
          .album {
            color: #999;
            &:hover {
              cursor: pointer;
              color: #373737;
            }
          }
          .time {
            color: #999;
          }
        }
      }
    }
  }
}
</style>