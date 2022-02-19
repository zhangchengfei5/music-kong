<template>
  <div class="search_detail_wrapper">
    <div class="header">找到{{ searchResult.songCount }}首单曲</div>
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
              <div
                class="list_box"
                v-for="(item, index) in searchResult.songs"
                :key="item.id"
                :class="index % 2 == 0 ? 'dan' : 'shuang'"
                :tabindex="index"
                @dblclick="listenMusic(item, index)"
              >
                <div class="title">
                  <music-action :listIndex="index"></music-action>
                  <p>{{ item.name }}</p>
                  <em>{{ item.alia[0] }}</em>
                </div>
                <div class="singer">
                  <p v-for="(secItem, secIndex) in item.ar" :key="secItem.id">
                    <span>
                      {{ secItem.name }}
                    </span>
                    <i v-if="secIndex != item.ar.length - 1">&nbsp;/&nbsp;</i>
                  </p>
                </div>
                <div class="album">{{ item.al ? item.al.name : "" }}</div>
                <div class="time">{{ formatterSongTime(item.dt) }}</div>
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
import { mapState, mapActions } from "vuex";
import utils from "../../../utils/util";

export default {
  name: "search_detail",
  components: { musicAction },
  data() {
    return {
      activeName: "songs",
      loading: true,
      loadingStyle: true,
    };
  },
  computed: {
    ...mapState(["searchResult"]),
    formatterSongTime: function () {
      return function (time) {
        return utils.formatterSongTime(time);
      };
    },
  },
  methods: {
    ...mapActions(["getMusicUrl"]),
    listenMusic(item, index) {
      // let music = JSON.stringify(item);
      // let m = encodeURIComponent(music);
      this.getMusicUrl(item, index);
    },
  },
};
</script>

<style lang="scss" scoped>
$theme: #cc66ff;
// 一行文字，多余的省略
@mixin oneText {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
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
  ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }
  /* 标签下划线的颜色 */
  ::v-deep .el-tabs__active-bar {
    background-color: $theme;
  }
  /* 标签字体大小 */
  ::v-deep .el-tabs__item {
    font-size: 0.18rem;
  }
  /* 鼠标移入标签时的文字颜色 */
  ::v-deep .el-tabs__item:hover {
    cursor: pointer;
    color: #000;
  }
  /* 鼠标点击时标签的文字变大 */
  ::v-deep.el-tabs__item.is-active {
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

    .loading {
      height: 2rem;
      width: 100%;
    }

    .songs_list {
      display: flex;
      flex-direction: column;
      font-size: 0.14rem;
      color: #999;
      .title {
        flex: 5;
        padding-right: 0.1rem;
        > i {
          font-style: normal;
          margin-left: 0.8rem;
        }
      }
      .singer {
        flex: 2;
        @include oneText;
        padding-right: 0.1rem;
      }
      .album {
        flex: 3;
        @include oneText;
        padding-right: 0.1rem;
      }
      .time {
        flex: 1;
      }

      .list_header {
        display: flex;
        align-items: center;
        user-select: none;
        padding: 0.05rem 0.1rem;
      }
      .list_body {
        display: flex;
        flex-direction: column;
        padding: 0.05rem 0;

        .list_box {
          display: flex;
          align-items: center;
          padding: 0.1rem;

          /* 鼠标聚焦列表时 */
          &:focus {
            background-color: #e5e5e5;
          }
          /* 鼠标移入列表时 */
          &:hover {
            background-color: #f0f1f2;
            cursor: pointer;
          }

          .title {
            display: flex;
            align-items: center;
            overflow: hidden;
            p {
              margin-right: 0.1rem;
              color: #666;
              @include oneText;
            }
            em {
              font-style: normal;
            }
          }
          .album {
            color: #999;
            &:hover {
              cursor: pointer;
              color: #373737;
            }
          }
          .singer {
            color: #999;
            display: flex;
            align-items: center;
            p {
              span {
                &:hover {
                  cursor: pointer;
                  color: #373737;
                }
              }
              i {
                font-style: normal;
                user-select: none;
              }
            }
          }
          .time {
            color: #999;
          }
        }
        /* 单数行 */
        .dan {
          background-color: #f9f9f9;
        }
        /* 双数行 */
        .shuang {
          background-color: #fff;
        }
      }
    }
  }
}
</style>