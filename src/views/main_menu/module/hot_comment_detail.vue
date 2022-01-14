<template>
  <div
    v-if="hotComments"
    class="comment_content"
    :style="loading ? 'overflow:hidden' : ''"
    @scroll="scrollData"
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
</template>

<script>
import server from "@/utils/http.js";
import util from "@/utils/util.js";

export default {
  name: "hot_comment_detail",
  data() {
    return {
      // 精彩评论数据
      hotComments: [],
      // 是否还有更多评论
      hasMore: true,
      loading: true,
      cCount: 0,
    };
  },
  computed: {
    // 完整的时间
    wholeTime: function () {
      return function (time) {
        return util.wholeTime(time);
      };
    },
  },
  mounted() {
    this.getComment();
  },
  methods: {
    // 获取视频评论
    getComment() {
      if (!this.hasMore && this.cCount != 0) return;
      let params = {};
      let id = this.$route.query.id;
      let type = this.$route.query.type;
      let url =
        "/comment/hot?id=" +
        id +
        "&type=" +
        type +
        "&offset=" +
        this.cCount * 20;
      server
        .get(url, params)
        .then((res) => {
          console.log("获取评论", res);
          if (res.code != 200) {
            this.$message.error("获取评论失败");
          }
          // 判断是否还有更多歌手
          if (this.hasMore) {
            // 判断是第几次加载
            this.cCount > 0
              ? (this.hotComments = this.hotComments.concat(res.hotComments))
              : (this.hotComments = res.hotComments);
            this.cCount++;
          } else {
            this.more = res.more;
            this.cCount > 0
              ? (this.hotComments = this.hotComments.concat(res.hotComments))
              : (this.hotComments = res.hotComments);
          }
          this.loading = false;
          this.hasMore = res.hasMore;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 视频滚动到底部自动加载
    scrollData() {
      let list = document.getElementsByClassName("comment_content")[0];
      if (list.scrollHeight - list.scrollTop <= list.clientHeight) {
        if (this.hasMore) {
          this.loading = true;
        }
        this.getComment();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$theme: #cc66ff;
// 评论内容（精彩评论/最新评论）
.comment_content {
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
</style>