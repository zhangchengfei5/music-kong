<template>
  <div class="mv_detail_wrapper">
    <div class="mv_detail_left">
      <p @click="goBackMv">
        <el-icon :size="16"><arrow-left /></el-icon>&nbsp;MV详情
      </p>
      <video :src="mvUrl.url" width="625" height="355" controls>
        <source :src="mvUrl.url" type="video/mp4" />
        <source :src="mvUrl.url" type="video/ogg" />
        <source :src="mvUrl.url" type="video/webm" />
        您的浏览器不支持 mv 标签。
      </video>
      <!-- S-发布者信息 -->
      <div class="author">
        <div class="avatar">
          <img :src="creator[0] ? creator[0].img1v1Url : ''" alt="" />
          <p v-for="(item, index) in creator" :key="item.id">
            {{ item.name }}<i v-if="index != creator.length - 1"> /</i>
          </p>
        </div>
      </div>
      <!-- E-发布者信息 -->
      <div class="title">
        <p>{{ detailData.name }}&nbsp;</p>
        <template v-if="detailData.desc">
          <el-icon v-if="showDesc" :size="18" @click="showDesc = !showDesc"
            ><caret-top
          /></el-icon>
          <el-icon v-else :size="18" @click="showDesc = !showDesc"
            ><caret-bottom
          /></el-icon>
        </template>
      </div>
      <div class="create_info">
        <p>发布：{{ detailData.publishTime }}</p>
        &nbsp;&nbsp;
        <p>播放：{{ playCount(detailData.playCount) }}次</p>
      </div>
      <div class="mv_tag" v-if="mvGroup">
        <span v-for="item in mvGroup" :key="item.id">{{ item.name }}</span>
      </div>
      <p v-show="showDesc" class="mv_desc">{{ detailData.desc }}</p>
      <!-- MV操作 -->
      <div class="mv_action">
        <div class="btn">
          <i v-if="actionData.liked" class="iconfont icon-dianzan"></i
          ><i v-else class="iconfont icon-z-like"></i
          ><span>&nbsp;赞({{ actionData.likedCount }})</span>
        </div>
        <div class="btn">
          <el-icon v-if="subscribed"><folder-checked /></el-icon>
          <el-icon v-else><folder-add /></el-icon>
          <span>&nbsp;收藏({{ detailData.subCount }})</span>
        </div>
        <div class="btn">
          <el-icon><share /></el-icon
          ><span>&nbsp;分享({{ actionData.shareCount }})</span>
        </div>
      </div>
      <!-- MV评论 -->
      <div class="mv_comment">
        <div class="submit_comment">
          <span
            >评论<i>({{ actionData.commentCount }})</i></span
          >
          <el-input
            v-model="comment"
            type="textarea"
            :rows="3"
            maxlength="140"
            show-word-limit
            resize="none"
          ></el-input>
          <button>评论</button>
        </div>
        <!-- S-精彩评论 -->
        <div
          v-if="currentPage < 2 && hotComments"
          class="comment_content"
          id="hotComment"
        >
          <span>精彩评论</span>
          <!-- 精彩评论列表 -->
          <div class="comment_list">
            <!-- 列表个体容器 -->
            <div
              class="comment_list_box"
              v-for="item in hotComments"
              :key="item.commentId"
            >
              <img :src="item.user ? item.user.avatarUrl : ''" alt="" />
              <div class="list_right">
                <p>
                  <span>{{ item.user ? item.user.nickname : "未知用户" }}:</span
                  >&nbsp;{{ item.content }}
                </p>
                <div class="time">
                  <span>{{ wholeTime(item.time) }}</span>
                  <p>
                    <i v-if="item.liked" class="iconfont icon-dianzan"></i
                    ><i v-else class="iconfont icon-z-like"></i>
                    {{ item.likedCount ? item.likedCount : "" }}&nbsp;
                    <el-icon :size="12"><chat-line-round /></el-icon>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- E-精彩评论 -->

        <!-- 更多精彩评论 -->
        <div
          v-if="currentPage < 2 && hotComments"
          class="more_hot"
          @click="toHotCommentsDetail"
        >
          更多精彩评论 >
        </div>

        <!-- S-最新评论 -->
        <div class="comment_content" id="larestComment">
          <span>最新评论({{ actionData.commentCount }})</span>
          <!-- 精彩评论列表 -->
          <div class="comment_list">
            <!-- 列表个体容器 -->
            <div
              class="comment_list_box"
              v-for="item in comments"
              :key="item.commentId"
            >
              <img :src="item.user ? item.user.avatarUrl : ''" alt="" />
              <div class="list_right">
                <p>
                  <span>{{ item.user ? item.user.nickname : "未知用户" }}:</span
                  >&nbsp;{{ item.content }}
                </p>
                <div class="time">
                  <!-- item.timeStr ? item.timeStr : item.time -->
                  <span>{{ wholeTime(item.time) }}</span>
                  <p>
                    <i v-if="item.liked" class="iconfont icon-dianzan"></i
                    ><i v-else class="iconfont icon-z-like"></i>
                    {{ item.likedCount ? item.likedCount : "" }}&nbsp;
                    <el-icon :size="12"><chat-line-round /></el-icon>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- E-最新评论 -->

        <!-- S-分页功能 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="actionData.commentCount"
          v-model:current-page="currentPage"
          :page-size="20"
        >
        </el-pagination>
        <!-- E-分页功能 -->
      </div>
    </div>
    <div class="mv_detail_right">
      <p>相关推荐</p>
      <div class="mv_rc_list">
        <div
          class="rc_list_box"
          v-for="item in relatedAllmv"
          :key="item"
          @click="switchMv(item.id)"
        >
          <!-- MV封面 -->
          <div class="mv_img">
            <img :src="item.cover" alt="" />
            <div class="play_count">
              <el-icon :size="16"><video-play /></el-icon
              >{{ playCount(item.playCount) }}
            </div>
            <em>{{ formatterMvTime(item.duration) }}</em>
            <div class="bg_top"></div>
            <div class="bg_bottom"></div>
          </div>
          <div class="rc_title">
            <p>{{ item.name }}</p>
            <div class="author">
              <i>by</i>
              <span
                >&nbsp;{{
                  item.artists.length > 0 ? item.artists[0].name : "发布者"
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import server from "@/utils/http.js";
import util from "@/utils/util.js";

export default {
  name: "mv_detail",
  data() {
    return {
      // MVID
      mvId: "",
      // 是否收藏了
      subscribed: false,
      // 输入的评论
      comment: "",
      // 展开简介
      showDesc: false,
      // 详情数据
      detailData: {},
      // 创作者数据
      creator: [],
      // 标签数据
      mvGroup: [],
      // 点赞等数据
      actionData: {},
      // MVUrl
      mvUrl: {},
      // 相关MV
      relatedAllmv: [],
      // 精彩评论数据
      hotComments: [],
      // 最新评论数据
      comments: [],
      // 是否还有更多评论
      more: true,
      moreHot: false,
      // 当前所在页数
      currentPage: 1,
    };
  },
  watch: {
    currentPage: function (newVal, oldVal) {
      console.log(oldVal);
      this.currentPage = newVal;
      this.getMvComment();
    },
  },
  computed: {
    // 格式化MV时间
    formatterMvTime: function () {
      return function (time) {
        return util.formatterSongTime(time);
      };
    },
    // 播放次数
    playCount: function () {
      return function (count) {
        return util.playCount(count);
      };
    },
    // 完整的时间
    wholeTime: function () {
      return function (time) {
        return util.wholeTime(time);
      };
    },
  },
  mounted() {
    this.mvId = this.$route.query.mvid;
    this.getMvDetail();
    this.getRelatedAllmv();
    this.getDetailInfo();
    this.getMvUrl();
    this.getMvComment();
  },
  methods: {
    // 获取MV详情
    getMvDetail() {
      let params = {};
      server
        .get("/mv/detail?mvid=" + this.mvId, params)
        .then((res) => {
          console.log("获取MV详情", res);
          if (res.code != 200) {
            this.$message.error("获取MV详情失败！");
            return;
          }
          this.detailData = res.data;
          this.creator = res.data.artists;
          this.mvGroup = res.data.videoGroup;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取相关MV
    getRelatedAllmv() {
      let params = {};
      let url = "/simi/mv?mvid=" + this.mvId;
      server
        .get(url, params)
        .then((res) => {
          console.log("获取相关MV", res);
          if (res.code != 200) {
            this.$message.error("获取相关MV失败！");
          }
          this.relatedAllmv = res.mvs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取MV点赞转发评论数数据
    getDetailInfo() {
      let params = {};
      let url = "/mv/detail/info?mvid=" + this.mvId;
      server
        .get(url, params)
        .then((res) => {
          console.log("获取MV点赞转发评论数数据：", res);
          if (res.code != 200) {
            this.$message.error("获取MV点赞转发评论数数据失败");
          }
          this.actionData = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取MV播放地址
    getMvUrl() {
      let params = {};
      let url = "/mv/url?id=" + this.mvId;
      server
        .get(url, params)
        .then((res) => {
          console.log("获取MV播放地址", res);
          if (res.code != 200) {
            this.$message.error("获取MV播放地址失败");
          }
          this.mvUrl = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取MV评论
    getMvComment() {
      if (!this.more && this.comments.length > 0) return;
      let params = {};
      let url =
        "/comment/mv?id=" +
        this.mvId +
        "&offset=" +
        (this.currentPage - 1) * 20;
      server
        .get(url, params)
        .then((res) => {
          console.log("获取MV评论", res);
          if (res.code != 200) {
            this.$message.error("获取MV评论失败");
          }
          if (this.more) {
            this.hotComments = res.hotComments.slice(0, 10);
            this.comments = res.comments;
          }
          this.moreHot = res.moreHot;
          this.more = res.more;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // MV详情按钮点击
    goBackMv() {
      this.$router.go(-1);
    },
    // 更多详情评论
    toHotCommentsDetail() {
      let id = this.mvId;
      this.$router.push("/hot_comment_detail?id=" + id + "&type=" + 1);
    },
    // 点击相关MV
    switchMv(vid) {
      this.mvId = vid;
      this.getMvDetail();
      this.getRelatedAllmv();
      this.getDetailInfo();
      this.getMvUrl();
      this.getMvComment();
    },
  },
};
</script>

<style lang="scss" scoped>
$theme: #cc66ff;
.mv_detail_wrapper {
  display: flex;
  position: absolute;
  z-index: 500;
  left: 0;
  right: 0;
  height: 90%;
  box-sizing: border-box;
  background-color: #fff;
  padding: 0.15rem 0;
  overflow-y: auto;
  overflow-x: hidden;
}
/* 滚动条样式 */
.mv_detail_wrapper::-webkit-scrollbar {
  background-color: #fff;
  width: 0.04rem;
}
/* 设置滚动条的颜色和圆角 */
.mv_detail_wrapper::-webkit-scrollbar-thumb {
  width: 0.1rem;
  background-color: #e6e6e6;
}
.mv_detail_left {
  display: flex;
  flex-direction: column;
  width: 6.3rem;
  height: 100%;
  margin-left: 2rem;

  > p {
    font-size: 0.16rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 0.1rem;
    width: 0.86rem;
  }

  // 发布者信息
  .author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;

    .avatar {
      display: flex;
      align-items: center;

      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        object-fit: cover;
      }

      p {
        font-size: 0.14rem;
        color: #666;
        margin-left: 0.1rem;
        &:hover {
          color: #000;
          cursor: pointer;
        }

        i {
          user-select: none;
        }
      }
    }
  }
  // MV标题
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 0.1rem;

    p {
      font-size: 0.18rem;
      font-weight: bold;
      user-select: none;
    }
  }
  // 发布信息
  .create_info {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 0.12rem;
    margin-bottom: 0.1rem;
  }
  // 标签
  .mv_tag {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 0.1rem;

    > span {
      font-size: 0.12rem;
      color: #333;
      background-color: #f5f5f5;
      padding: 0.02rem 0.05rem;
      border-radius: 0.1rem;
      cursor: pointer;
      margin-right: 0.1rem;
    }
  }
  // 简介
  .mv_desc {
    font-size: 0.13rem;
    color: #373737;
    user-select: none;
    font-weight: 500;
    width: 100%;
    cursor: auto;
    margin-bottom: 0.1rem;
  }
  // MV操作
  .mv_action {
    display: flex;
    align-items: center;
    margin: 0.2rem 0;

    .btn {
      display: flex;
      align-items: center;
      border: 1px solid #999;
      border-radius: 0.15rem;
      padding: 0.05rem 0.2rem;
      color: #333;
      margin-right: 0.1rem;
      font-size: 0.14rem;
      user-select: none;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
      }

      .icon-z-like {
        font-size: 0.18rem;
      }

      .el-icon {
        font-size: 0.2rem;
      }
    }
  }
  //MV评论
  .mv_comment {
    display: flex;
    flex-direction: column;
    padding: 0.1rem 0;

    // 发布评论
    .submit_comment {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.1rem;

      span {
        font-size: 0.16rem;
        font-weight: bold;
        color: #000;
        margin-bottom: 0.1rem;

        i {
          font-size: 0.12rem;
          font-style: normal;
          color: #999;
        }
      }
      .el-textarea {
        width: 100%;
        font-size: 0.14rem;
        margin-bottom: 0.1rem;
      }
      ::v-deep .el-textarea__inner {
        &:focus {
          border-color: $theme;
        }
      }
      button {
        padding: 0.05rem 0;
        color: #333333;
        border: 1px solid #999999;
        border-radius: 0.3rem;
        background-color: #fff;
        width: 0.6rem;
        align-self: flex-end;

        &:hover {
          cursor: pointer;
          background-color: rgba(50, 50, 50, 0.1);
        }
      }
    }
    // 评论内容（精彩评论/最新评论）
    .comment_content {
      display: flex;
      flex-direction: column;

      > span {
        color: #333;
        font-weight: bold;
        font-size: 0.14rem;
        margin-bottom: 0.2rem;
      }
      .comment_list {
        display: flex;
        flex-direction: column;
        // 个体容器
        .comment_list_box {
          display: flex;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 0.1rem;
          padding-bottom: 0.2rem;

          img {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 0.1rem;
            user-select: none;
            cursor: pointer;
          }

          .list_right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 0.14rem;
            width: 100%;

            p {
              color: #666;

              span {
                color: #dd99ff;
                user-select: none;

                &:hover {
                  color: $theme;
                  cursor: pointer;
                }
              }
            }

            .time {
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: space-between;
              user-select: none;

              > span {
                color: #999;
                font-size: 0.12rem;
              }

              > p {
                font-size: 0.13rem;
              }

              i {
                font-size: 0.16rem;
                margin-left: 0.1rem;

                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }

    .more_hot {
      font-size: 0.14rem;
      border: 1px solid #e5e5e5;
      width: 1rem;
      padding: 0.05rem 0.2rem;
      border-radius: 0.2rem;
      margin: 0.1rem auto;
      user-select: none;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
      }
    }

    .el-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.1rem;
    }
  }
}
.mv_detail_right {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 0.2rem;

  > p {
    font-size: 0.16rem;
    font-weight: bold;
    margin-bottom: 0.1rem;
  }

  .mv_rc_list {
    display: flex;
    flex-direction: column;

    .rc_list_box {
      display: flex;
      box-sizing: border-box;
      border-radius: 0.06rem;
      margin-bottom: 0.1rem;

      .mv_img {
        display: flex;
        position: relative;

        &:hover {
          cursor: pointer;
        }

        > img {
          width: 1.6rem;
          height: 0.85rem;
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

      .rc_title {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 1.4rem;
        margin-left: 0.1rem;

        p {
          font-size: 0.14rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -moz-box;
          -moz-line-clamp: 2;
          -moz-box-orient: vertical;
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal;
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
</style>