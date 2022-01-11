<template>
  <div class="video_wrapper">
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
                    @click="
                      tagName = '全部视频';
                      turnPop = false;
                    "
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
          <div class="video_main">
            <!-- 视频个体容器 -->
            <div class="video_list_box">
              <img src="../../assets/images/bottomNav/songImg1.jpg" alt="" />
              <p>视频名字</p>
              <span><i>By</i>&nbsp;这是谁发的？</span>
              <div class="play_count"></div>
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
// import util from "@/utils/util.js";

export default {
  data() {
    return {
      activeName: "video",
      tagName: "全部视频",
      turnPop: false,

      categoryList: [],
      groupList: [],
      timelineAll: [],
    };
  },
  mounted() {
    this.getCategoryList();
    this.getGroupList();
    this.getTimelineAll();
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
    // 点击标签切换
    switchTag(item) {
      this.turnPop = false;
      this.tagName = item.name;
    },
    // 获取全部视频列表
    getTimelineAll(offset = 0) {
      let params = {};
      params.offset = offset;
      server
        .get("/video/timeline/all", params)
        .then((res) => {
          console.log("获取全部视频列表", res);
          if (res.code != 200) {
            this.$message.error("获取全部视频列表失败！");
          }
          this.timelineAll = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
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