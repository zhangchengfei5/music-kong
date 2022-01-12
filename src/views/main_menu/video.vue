<template>
  <div
    class="video_wrapper"
    @scroll="scrollData"
    :style="videoLoading ? 'overflow:hidden' : ''"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="视频" name="video">
        <!-- S-视频容器 -->
        <div class="video_box">
          <!-- S-视频标签页头部 -->
          <div class="video_head">
            <!-- 头部左边 -->
            <div class="head_left">
              <el-popover
                :visible="turnPop"
                placement="bottom-start"
                :width="650"
              >
                <div class="tags_list_box">
                  <span
                    :class="tagName == '全部视频' ? 'active_tag' : ''"
                    @click="clickAllVideo"
                    >全部视频</span
                  >
                  <div class="list_tag">
                    <span
                      :class="tagName == item.name ? 'active_tag' : ''"
                      v-for="item in groupList"
                      :key="item.id"
                      @click="switchTag(item)"
                      >{{ item.name }}</span
                    >
                  </div>
                </div>
                <template #reference>
                  <div class="tag_reference" @click="turnPop = !turnPop">
                    {{ tagName }}&nbsp;<el-icon :size="16"
                      ><arrow-right
                    /></el-icon>
                  </div>
                </template>
              </el-popover>
            </div>
            <!-- 头部右边 -->
            <div class="head_right">
              <div class="category_box">
                <span
                  :class="tagName == item.name ? 'active_tag' : ''"
                  v-for="item in categoryList"
                  :key="item.id"
                  @click="switchTag(item)"
                  >{{ item.name }}</span
                >
              </div>
            </div>
          </div>
          <!-- E-视频标签页头部 -->

          <!-- S-视频标签页主体 -->
          <div
            class="video_main"
            v-loading.lock="videoLoading"
            element-loading-text="加载中..."
            :style="videoLoadingStyle ? 'height:200px;width:100%;' : ''"
          >
            <!-- 视频个体容器 -->
            <div class="video_list_box" v-for="item in timelineAll" :key="item">
              <div class="video_img" @click="toVideoDetail(item.vid)">
                <img :src="item.coverUrl" alt="" />
                <div class="play_count">
                  <el-icon :size="16"><video-play /></el-icon
                  >{{ playCount(item.playTime) }}
                </div>
                <em>{{ formatterSongTime(item.durationms) }}</em>
                <div class="bg_top"></div>
                <div class="bg_bottom"></div>
              </div>
              <p @click="toVideoDetail(item.vid)">{{ item.title }}</p>
              <div class="author">
                <i>by</i>
                <span
                  >&nbsp;{{ item.creator ? item.creator.nickname : "" }}</span
                >
              </div>
            </div>
          </div>
          <!-- E-视频标签页主体 -->
        </div>
        <!-- E-视频容器 -->
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import server from "../../utils/http.js";
import util from "@/utils/util.js";

export default {
  name: "videoPage",
  data() {
    return {
      activeName: "video",
      tagName: "全部视频",
      turnPop: false,

      // 分类列表数据
      categoryList: [],
      // 标签列表数据
      groupList: [],
      // 标签Id
      groupId: "",
      // 视频列表数据
      timelineAll: [],
      videoLoading: true,
      videoLoadingStyle: true,
      // 成功取出视频的次数
      vCount: 0,
      hasmore: true,
    };
  },
  computed: {
    playCount: function () {
      return function (val) {
        let count = util.playCount(val);
        return count;
      };
    },
    // 格式化歌曲时间
    formatterSongTime: function () {
      return function (time) {
        let songTime = util.formatterSongTime(time);
        return songTime;
      };
    },
  },
  created() {
    // 获取视频分类列表
    this.getCategoryList();
    // 获取视频标签列表
    this.getGroupList();
    // 获取全部视频
    this.getTimelineAll();
  },
  mounted() {
    this.scrollData();
  },
  methods: {
    // 获取视频分类列表
    getCategoryList() {
      let params = {};
      server
        .get("/video/category/list", params)
        .then((res) => {
          console.log("获取视频分类列表", res);
          if (res.code != 200) {
            this.$message.error("获获取视频分类列表失败！");
          }
          this.categoryList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取视频标签列表
    getGroupList() {
      let params = {};
      server
        .get("/video/group/list", params)
        .then((res) => {
          console.log("获取视频标签列表", res);
          if (res.code != 200) {
            this.$message.error("获取视频标签列表失败！");
          }
          this.groupList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击标签全部视频
    clickAllVideo() {
      this.turnPop = false;
      if (this.tagName == "全部视频") return;
      this.tagName = "全部视频";
      this.vCount = 0;
      this.videoLoading = true;
      this.videoLoadingStyle = true;
      this.timelineAll = [];
      this.hasmore = true;
      this.getTimelineAll();
      let timer = setTimeout(() => {
        this.scrollData();
        clearTimeout(timer);
        timer = null;
      }, 500);
    },
    // 点击标签切换
    switchTag(item) {
      this.turnPop = false;
      if (item.name == this.tagName) return;
      this.tagName = item.name;
      this.vCount = 0;
      this.videoLoading = true;
      this.videoLoadingStyle = true;
      this.timelineAll = [];
      this.hasmore = true;
      this.groupId = item.id;
      this.getVideoGroup(this.groupId);
      let timer = setTimeout(() => {
        this.scrollData();
        clearTimeout(timer);
        timer = null;
      }, 500);
    },
    // 获取全部视频列表
    getTimelineAll() {
      if (!this.hasmore && this.vCount != 0) return;
      let params = {};
      params.offset = 8 * this.vCount;
      let timestamp = Date.now();
      server
        .get("/video/timeline/all?t=" + timestamp, params)
        .then((res) => {
          console.log("获取全部视频列表", res);
          if (res.code != 200) {
            this.$message.error("获取全部视频列表失败！");
          }
          // 判断是否还有更多
          if (res.hasmore) {
            // 判断成功取到视频数据的次数
            if (this.vCount > 0) {
              let allVideo = [];
              res.datas.forEach((i) => {
                if (i.type == 1) {
                  allVideo.push(i.data);
                }
              });
              this.timelineAll = this.timelineAll.concat(allVideo);
            } else {
              res.datas.forEach((i) => {
                if (i.type == 1) {
                  this.timelineAll.push(i.data);
                }
              });
            }
            if (this.timelineAll.length > 0) {
              this.videoLoadingStyle = false;
            }
            this.vCount++;
          }
          this.hasmore = res.hasmore;
          this.videoLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取视频标签/分类下的视频
    getVideoGroup(id) {
      if (!this.hasmore && this.vCount != 0) return;
      let params = {};
      params.offset = 8 * this.vCount;
      let timestamp = Date.now();
      server
        .get("/video/group?id=" + id + "&t=" + timestamp, params)
        .then((res) => {
          console.log("获取视频标签/分类下的视频", res);
          if (res.code != 200) {
            this.$message.error("获取视频标签/分类下的视频失败！");
          }
          // 判断是否还有更多
          if (res.hasmore) {
            // 判断成功取到视频数据的次数
            if (this.vCount > 0) {
              let allVideo = [];
              res.datas.forEach((i) => {
                if (i.type == 1) {
                  allVideo.push(i.data);
                }
              });
              this.timelineAll = this.timelineAll.concat(allVideo);
            } else {
              res.datas.forEach((i) => {
                if (i.type == 1) {
                  this.timelineAll.push(i.data);
                }
              });
            }
            if (this.timelineAll.length > 0) {
              this.videoLoadingStyle = false;
            }
            this.vCount++;
          }
          this.hasmore = res.hasmore;
          this.videoLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 视频滚动到底部自动加载
    scrollData() {
      let list = document.getElementsByClassName("video_wrapper")[0];
      if (list.scrollHeight - list.scrollTop <= list.clientHeight) {
        if (this.hasmore && !this.videoLoading) {
          this.videoLoading = true;
        }
        if (this.tagName == "全部视频") {
          this.getTimelineAll();
        } else {
          this.getVideoGroup(this.groupId);
        }
      }
    },

    // 跳转到视频详情页
    toVideoDetail(id) {
      this.$router.push("/video_detail?vid=" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
$theme: #cc66ff;
.video_wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  overflow: auto;
  font-size: 0.16rem;
  padding: 0.1rem 0.25rem;

  /* 设置滚动条的背景色 */
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
  }

  // 去掉tabborder下面的一整条黑线
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }

  // 标签字体大小
  /deep/ .el-tabs__item {
    font-size: 0.18rem;
  }

  // 选中的tab的颜色
  /deep/ .el-tabs__item.is-active {
    color: #000;
    font: {
      weight: bold;
      size: 0.22rem;
    }
  }
  // 选中的tab的下划线颜色
  /deep/ .el-tabs__active-bar {
    background-color: $theme;
  }

  // 鼠标移入时字体颜色变化
  /deep/ .el-tabs__item:hover {
    color: #000;
  }

  .video_box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;

    .video_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      // 头部左边
      .head_left {
        display: flex;
        align-items: center;

        // 激活popover容器
        .tag_reference {
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #666;
          font-size: 0.16rem;

          &:hover {
            color: #000;
          }

          .el-icon {
            line-height: 0.21rem;
          }
        }
      }

      // 头部右边
      .head_right {
        display: flex;
        align-items: center;

        .category_box {
          overflow: hidden;
          display: flex;
          align-items: center;

          span {
            font-size: 0.12rem;
            margin-right: 0.1rem;
            user-select: none;
            color: #666;
            padding: 0.05rem 0.1rem;

            &:hover {
              color: #000;
            }
          }
        }
      }
    }

    .video_main {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.2rem;
      overflow: hidden;
      margin-top: 0.2rem;

      .video_list_box {
        display: flex;
        flex-direction: column;
        width: 2.385rem;
        border-radius: 0.06rem;

        .video_img {
          display: flex;
          position: relative;

          &:hover {
            cursor: pointer;
          }

          > img {
            width: 100%;
            height: 1.4rem;
            object-fit: cover;
            border-radius: 0.06rem;
          }

          .play_count {
            color: #fff;
            font-size: 0.12rem;
            position: absolute;
            z-index: 50;
            top: 0.02rem;
            right: 0.05rem;
            display: flex;
            align-items: center;

            .el-icon {
              margin-right: 0.03rem;
            }
          }

          em {
            font-style: normal;
            color: #fff;
            font-size: 0.12rem;
            position: absolute;
            z-index: 50;
            bottom: 0.05rem;
            right: 0.05rem;
          }

          .bg_top {
            height: 0.18rem;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.1);
            position: absolute;
            z-index: 49;
            top: 0;
            border-top-left-radius: 0.06rem;
            border-top-right-radius: 0.06rem;
          }
          .bg_bottom {
            width: 100%;
            height: 0.2rem;
            background-color: rgba(0, 0, 0, 0.1);
            position: absolute;
            z-index: 49;
            bottom: 0;
            border-bottom-left-radius: 0.06rem;
            border-bottom-right-radius: 0.06rem;
          }
        }

        p {
          font-size: 0.14rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-top: 0.1rem;
          color: #666;

          &:hover {
            color: #000;
            cursor: pointer;
          }
        }

        .author {
          display: flex;
          align-items: center;
          font-size: 0.12rem;
          margin-top: 0.02rem;
          width: 100%;

          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #e2e2e2;

            &:hover {
              color: #999;
              cursor: pointer;
            }
          }

          i {
            font-style: normal;
            color: #e2e2e2;
            user-select: none;
          }
        }
      }
    }
  }
}

.el-popper.is-light {
  padding: 0;
}

// 标签列表容器
.tags_list_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 4.5rem;
  overflow-y: auto;
  overflow-x: hidden;

  /* 隐藏滚动条或改变滚动条的样式 */
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 0.04rem;
  }
  /* 设置滚动条的颜色和圆角 */
  &::-webkit-scrollbar-thumb {
    border-radius: 0.06rem;
    width: 0.1rem;
    background-color: #e6e6e6;
  }

  span {
    font-size: 0.12rem;
    padding: 0.05rem 0.1rem;

    &:hover {
      color: $theme;
      cursor: pointer;
    }
  }

  > span {
    margin: 0.1rem;
    width: 0.5rem;
  }

  .list_tag {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.2rem;
    border-top: 1px solid #e6e6e6;
    padding: 0.1rem;
    width: 100%;
    box-sizing: border-box;

    > span {
      text-align: center;
    }
  }
}

.active_tag {
  background-color: #fff0ff;
  color: $theme !important;
  border-radius: 0.3rem;
}
</style>