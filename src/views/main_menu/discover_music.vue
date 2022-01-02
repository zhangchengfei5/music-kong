<template>
  <div class="discover_music_wrapper">
    <el-tabs v-model="activeName">
      <!-- 个性推荐页 -->
      <el-tab-pane label="个性推荐" name="1">
        <!-- 轮播图 -->
        <el-carousel type="card" :interval="5000">
          <el-carousel-item
            v-for="(bannerItem, index) in bannerList"
            :key="index"
            :name="'' + index"
          >
            <el-image :src="bannerItem.imageUrl">
              <template #placeholder>
                <span>图片加载中...</span>
              </template>
            </el-image>
          </el-carousel-item>
        </el-carousel>
        <!-- S-推荐歌单外层容器 -->
        <div class="recommend_song_wrapper">
          <!-- 推荐歌单大标题 -->
          <div class="recommend_song_title">
            <p @click="toRecommendSongList">
              推荐歌单
              <el-icon color="#666" :size="22"><arrow-right /></el-icon>
            </p>
          </div>
          <!-- 推荐歌单列表容器 -->
          <div class="song_list_wrapper">
            <div
              class="song_list"
              v-for="slItem in recommendSongList"
              :key="slItem.id"
              @click="getRcListDetail(slItem.id)"
            >
              <el-image :src="slItem.picUrl"> </el-image>
              <el-icon class="song_play_btn"><video-play /></el-icon>
              <p class="song_list_title">{{ slItem.name }}</p>
              <div class="song_play_count">
                <el-icon class="list_play_icon" color="#fff"
                  ><video-play
                /></el-icon>
                {{ playCount(slItem.playCount) }}
              </div>
              <div class="count_bg"></div>
            </div>
          </div>
        </div>
        <!-- E-推荐歌单外层容器 -->

        <!-- S-独家放送列表入口 -->
        <div class="privatecontent_wrapper">
          <!-- 独家放送大标题 -->
          <div class="privatecontent_title">
            <p>
              独家放送
              <el-icon color="#666" :size="22"><arrow-right /></el-icon>
            </p>
          </div>
          <!-- 独家放送列表容器 -->
          <div class="privatecontent_list_wrapper">
            <!-- 独家放送个体容器 -->
            <div
              class="privatecontent_list"
              v-for="pclItem in privatecontentList"
              :key="pclItem.id"
            >
              <el-image :src="pclItem.sPicUrl"></el-image>
              <el-icon class="plsp_btn"><video-play /></el-icon>
              <p class="privatecontent_list_title">{{ pclItem.name }}</p>
              <div class="plsp_bg"></div>
            </div>
          </div>
        </div>
        <!-- E-独家放送列表入口 -->

        <!-- S-推荐MV外层容器 -->
        <div class="recommend_mv_wrapper">
          <!-- 推荐MV大标题 -->
          <div class="recommend_mv_title">
            <p>
              推荐MV
              <el-icon color="#666" :size="22"><arrow-right /></el-icon>
            </p>
          </div>
          <!-- 推荐MV列表容器 -->
          <div class="recommend_mv_list_wrapper">
            <!-- 推荐MV个体容器 -->
            <div
              class="recommend_mv_list"
              v-for="mvItem in recommendMvList"
              :key="mvItem.id"
            >
              <el-image :src="mvItem.picUrl"></el-image>
              <p class="mv_list_title">{{ mvItem.name }}</p>
              <div class="mv_list_artistName">
                <p
                  v-for="(artists, artistsIndex) in mvItem.artists"
                  :key="artists.id"
                >
                  {{ artists.name
                  }}{{
                    mvItem.artists.length > 1
                      ? artistsIndex == mvItem.artists.length - 1
                        ? ""
                        : " /&nbsp;"
                      : ""
                  }}
                </p>
              </div>
              <div class="mv_play_count">
                <el-icon class="list_play_icon" color="#fff"
                  ><video-play
                /></el-icon>
                {{ playCount(mvItem.playCount) }}
              </div>
              <div class="count_bg"></div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="专属定制" name="2">专属定制</el-tab-pane>
      <el-tab-pane label="歌单" name="songList">
        <!-- S-歌单标签页最外层容器 -->
        <div class="gedan-box">
          <!-- S-头部标签弹出等 -->
          <div class="song_tag_head">
            <el-popover :width="500" placement="bottom-start">
              <div class="song_tag_list_box">
                <div class="list_one">
                  <span>语种</span>
                  <span>风格</span>
                </div>
                <div class="list_sec">
                  <span>华语</span>
                  <span>欧美</span>
                  <span>日语</span>
                </div>
              </div>
              <template #reference>
                <div class="allSongList">
                  全部歌单 <el-icon><arrow-right /></el-icon>
                </div>
              </template>
            </el-popover>
            <el-breadcrumb separator=" ">
              <el-breadcrumb-item>华语</el-breadcrumb-item>
              <el-breadcrumb-item>流行</el-breadcrumb-item>
              <el-breadcrumb-item>摇滚</el-breadcrumb-item>
              <el-breadcrumb-item>民谣</el-breadcrumb-item>
              <el-breadcrumb-item>电子</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- E-头部标签弹出等 -->

          <!-- S-歌单列表 -->
          <div class="song_list_wrapper" v-loading="topLoading">
            <div
              class="song_list"
              v-for="songlistItem in topSongList"
              :key="songlistItem.id"
              @click="goDetailSongList(songlistItem)"
            >
              <el-image :src="songlistItem.coverImgUrl"> </el-image>
              <el-icon class="song_play_btn"><video-play /></el-icon>
              <p class="song_list_title">{{ songlistItem.name }}</p>
              <div class="song_play_count">
                <el-icon class="list_play_icon" color="#fff"
                  ><video-play
                /></el-icon>
                {{ playCount(songlistItem.playCount) }}
              </div>
              <div class="count_bg"></div>
            </div>
          </div>
          <!-- E-歌单列表 -->

          <!-- 分页 -->
          <el-pagination
            v-show="!topLoading"
            v-model:current-page="currentPage"
            :page-size="100"
            layout=" prev, pager, next"
            v-model:total="totalTopSongList"
            :pager-count="9"
            background
          >
          </el-pagination>
        </div>
        <!-- E-歌单标签页最外层容器 -->
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="4">排行榜</el-tab-pane>
      <el-tab-pane label="歌手" name="5">歌手</el-tab-pane>
      <el-tab-pane label="最新音乐" name="6">最新音乐</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import server from "../../utils/http.js";
import util from "@/utils/util.js";

export default {
  components: {},
  data() {
    return {
      activeName: "1",
      bannerList: [],
      // 推荐歌单列表
      recommendSongList: [],
      // 独家放送
      privatecontentList: [],
      // 推荐MV列表
      recommendMvList: [],

      scrollTop: "",

      // 歌单标签页歌单列表
      topSongList: [],
      // 歌单请求条数
      limit: 100,
      // 歌单列表加载中
      topLoading: false,
      // 歌单总数目
      totalTopSongList: 0,
      // 当前页数
      currentPage: 1,
    };
  },
  watch: {
    // 标签改变后的页面变动
    activeName: function (newVal, oldVal) {
      if (newVal == "songList") {
        this.getTopSongList(this.currentPage);
        console.log(oldVal);
      }
    },
    // 歌单列表页数变动后页面回到顶部
    currentPage: function (newVal, oldVal) {
      console.log(oldVal);
      this.getTopSongList(newVal);
      // 切换页数时回到顶部
      let wrapper = document.querySelector(".discover_music_wrapper");
      wrapper.scrollTop = 0;
    },
  },
  mounted() {
    this.getBanner();
    this.getRecommendSongList();
    this.getPrivateContentList();
    this.getRecommendMvList();
  },
  computed: {
    playCount: function () {
      return function (val) {
        let count = util.playCount(val);
        return count;
      };
    },
  },
  methods: {
    // 获取banner图
    getBanner() {
      let that = this;
      let url = "/banner";
      var params = {};
      server
        .get(url, params)
        .then((res) => {
          if (res.code == 200) {
            that.bannerList = res.banners;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取推荐歌单
    getRecommendSongList() {
      let that = this;
      // 默认取出30条，设置limit可以设置取出条数
      let limit = 10;
      let url = "/personalized?";
      // let timestamp = Date.parse(new Date());
      // let url = "/recommend/resource?t=" + timestamp;
      var params = {};
      params.limit = limit;
      server
        .post(url, params)
        .then((res) => {
          console.log("推荐歌单:", res);
          if (res.code != 200) {
            console.log("获取推荐歌单失败");
            return;
          }
          that.recommendSongList = res.result;
          console.log("推荐歌单：", res);
          // 获取到11条数据，去掉最开始的那条数据
          // let rsList = res.recommend;
          // rsList.shift();
          // that.recommendSongList = rsList;
          // console.log("推荐歌单：", rsList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取推荐歌单详情
    // getRsListDetail() {
    //   let that = this;
    //   // 默认取出30条，设置limit可以设置取出条数
    //   let limit = 10;
    //   let url = "/personalized?limit=" + limit;
    //   var params = {};
    //   server
    //     .post(url, params)
    //     .then((res) => {
    // if (res.code != 200) {
    //       console.log("获取每日推荐歌单失败");
    //       return;
    //     }
    //       that.recommendSongList = res.result;
    //       console.log("推荐歌单：", res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // 获取独家放送入口列表
    getPrivateContentList() {
      let that = this;
      let url = "/personalized/privatecontent";
      var params = {};
      server
        .post(url, params)
        .then((res) => {
          if (res.code != 200) {
            console.log("获取独家放送入口列表失败");
            return;
          }
          that.privatecontentList = res.result;
          console.log("独家放送列表入口：", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取推荐MV
    getRecommendMvList() {
      let that = this;
      let url = "/personalized/mv";
      server
        .post(url)
        .then((res) => {
          if (res.code != 200) {
            console.log("获取推荐MV失败");
            return;
          }
          that.recommendMvList = res.result;
          console.log("推荐MV：", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 点击跳转到歌单标签页
    toRecommendSongList() {
      this.activeName = "songList";
    },
    // 获取歌单标签页的歌单
    getTopSongList(currentPage) {
      let that = this;
      that.topLoading = true;
      // 默认取出50条，设置limit可以设置取出条数 设置offset可以设置页数 order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
      let order = "hot";
      let limit = that.limit;
      let offset = currentPage;
      // let url = "/top/playlist?limit=" + limit + "&order=" + order;
      let timestamp = Date.parse(new Date());
      let url = "/top/playlist?t=" + timestamp;
      var params = {};
      params.offset = offset;
      params.limit = limit;
      params.order = order;
      server
        .post(url, params)
        .then((res) => {
          if (res.code != 200) {
            console.log("获取歌单标签页的歌单失败");
            return;
          }
          that.topSongList = res.playlists;
          that.totalTopSongList = res.total;
          that.topLoading = false;
          console.log("歌单(精选)：", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 歌单标签页的歌单跳转到歌单详情
    goDetailSongList(slItem) {
      let d = JSON.stringify(slItem);
      let songItem = encodeURIComponent(d);
      this.$router.push("/my_favourtie_song?slItem=" + songItem);
    },
    // 获取推荐歌单的歌单详情
    getRcListDetail(id) {
      let that = this;
      // 默认取出30条，设置limit可以设置取出条数
      let url = "/playlist/detail";
      var params = {};
      params.id = id;
      server
        .post(url, params)
        .then((res) => {
          console.log("推荐歌单的歌单详情：", res);
          if (res.code != 200) {
            console.log("获取推荐歌单的歌单详情失败");
            return;
          }
          that.goDetailSongList(res.playlist);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.discover_music_wrapper {
  flex: 1;
  background-color: #fff;
  padding: 0 0.25rem;
  overflow: auto;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
/* 隐藏滚动条 */
.discover_music_wrapper::-webkit-scrollbar {
  /* display: none; */
  background-color: #fff;
  width: 0.04rem;
}
/* 设置滚动条的颜色和圆角 */
.discover_music_wrapper::-webkit-scrollbar-thumb {
  /* border-radius: 0.06rem; */
  width: 0.1rem;
  background-color: #e6e6e6;
}
/* 顶部标签 */
.el-tabs {
  height: 100%;
  width: 100%;
  font-size: 0.2rem;
}
/* 让标签固定在发现音乐页面的顶部 */
.discover_music_wrapper >>> .el-tabs__nav-wrap {
  position: fixed;
  z-index: 99;
  background-color: #fff;
  left: 2.25rem;
  right: 0;
  top: 0.62rem;
  padding-top: 0.2rem;
  padding-bottom: 0.08rem;
}
/* 去除标签下面灰色的线 */
.discover_music_wrapper >>> .el-tabs__nav-wrap::after {
  display: none;
}
/* 标签下划线的颜色 */
.discover_music_wrapper >>> .el-tabs__active-bar {
  background-color: #cc66ff;
}
/* 标签字体大小 */
.discover_music_wrapper >>> .el-tabs__item {
  font-size: 0.18rem;
}
/* 鼠标移入标签时的文字颜色 */
.discover_music_wrapper >>> .el-tabs__item:hover {
  cursor: pointer;
  color: #000;
}
/* 鼠标点击时标签的文字变大 */
.discover_music_wrapper >>> .el-tabs__item.is-active {
  font-size: 0.22rem;
  font-weight: bold;
  color: #000;
}
.el-tab-pane {
  overflow-y: auto;
  overflow-x: auto;
  padding: 0.65rem 0 0.1rem;
  position: relative;
}

/* 个性推荐标签页—————————————————————————————————————————————————————————————————————————————————————————— */
/* 轮播图容器的高度 */
.el-tabs >>> .el-carousel__container {
  height: 1.8rem;
}
.el-tabs >>> .el-carousel__container .el-image {
  width: 100%;
  height: 100%;
  border-radius: 0.08rem;
}

/* 推荐歌单最外层容器 */
.recommend_song_wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}
/* 推荐歌单大标题、独家放送大标题、推荐MV大标题  */
.recommend_song_wrapper .recommend_song_title,
.privatecontent_wrapper .privatecontent_title,
.recommend_mv_wrapper .recommend_mv_title {
  font-size: 0.24rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.recommend_song_title > p,
.privatecontent_title > p,
.recommend_mv_title > p {
  display: flex;
  align-items: center;
  float: left;
}
.recommend_song_wrapper .recommend_song_title > p:hover,
.privatecontent_wrapper .privatecontent_title > p:hover,
.recommend_mv_title > p:hover {
  cursor: pointer;
  color: #303133;
}
/* 推荐歌单列表外层容器 */
.song_list_wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 0.2rem;
  column-gap: 0.18rem;
  margin-bottom: 0.2rem;
}
/* 歌单容器 */
.song_list_wrapper .song_list,
.recommend_mv_list_wrapper .recommend_mv_list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
/* 歌单封面图片、独家放送图片 */
.song_list > .el-image,
.privatecontent_list > .el-image,
.recommend_mv_list > .el-image {
  border-radius: 0.06rem;
  margin-bottom: 0.1rem;
}
.song_list > .el-image:hover,
.privatecontent_list > .el-image:hover,
.recommend_mv_list > .el-image:hover {
  cursor: pointer;
}
/* 歌单名字、独家放送个体名字 */
.song_list_title,
.privatecontent_list_title {
  width: 100%;
  font-size: 0.14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  color: #303133;
}
.song_list_title:hover,
.privatecontent_list_title:hover {
  cursor: pointer;
  color: #000;
}
/* 图片右下角的按钮 */
.song_list .song_play_btn {
  position: absolute;
  font-size: 0.3rem;
  top: 65%;
  right: 5%;
  color: transparent;
  transition: all 0.5s;
}
.song_list > .el-image:hover + .song_play_btn {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.05);
}
.song_list .count_bg,
.recommend_mv_list .count_bg {
  height: 0.2rem;
  background-color: rgba(0, 0, 0, 0.03);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-top-right-radius: 0.06rem;
}
/* 推荐歌单播放量、推荐MV播放量 */
.song_list .song_play_count,
.recommend_mv_list .mv_play_count {
  position: absolute;
  top: 0.04rem;
  right: 0.06rem;
  display: flex;
  align-items: center;
  font-size: 0.1rem;
  color: #fff;
}
.song_play_count .list_play_icon,
.mv_play_count .list_play_icon {
  margin-right: 0.04rem;
  text-align: center;
}

/* 独家放送入口列表外层容器 */
.privatecontent_wrapper {
  display: flex;
  flex-direction: column;
}
/* 独家放送列表容器 */
.privatecontent_wrapper .privatecontent_list_wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.18rem;
  margin-bottom: 0.2rem;
}
/* 独家放送个体容器 */
.privatecontent_list_wrapper .privatecontent_list {
  display: flex;
  flex-direction: column;
  position: relative;
}
/* 图片左上角角的播放按钮 */
.privatecontent_list .plsp_btn {
  position: absolute;
  font-size: 0.3rem;
  top: 0.05rem;
  left: 0.05rem;
  color: #fff;
}

.privatecontent_list .plsp_bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 0.35rem;
  /* width: 0.35rem; */
  background-color: rgba(0, 0, 0, 0.03);
}

/* 推荐MV外层容器 */
.recommend_mv_wrapper {
  display: flex;
  flex-direction: column;
}
/* 推荐MV列表容器 */
.recommend_mv_wrapper .recommend_mv_list_wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.18rem;
  margin-bottom: 0.2rem;
}
.recommend_mv_list > .el-image {
  width: 100%;
  height: 100%;
}
/* MV名字 */
.recommend_mv_list .mv_list_title {
  width: 100%;
  font-size: 0.14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #303133;
  margin-bottom: 0.02rem;
}
.recommend_mv_list .mv_list_title:hover {
  cursor: pointer;
  color: #000;
}
/* MV作者名字 */
.recommend_mv_list .mv_list_artistName {
  font-size: 0.12rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.mv_list_artistName > p {
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
.mv_list_artistName > p:hover {
  cursor: pointer;
  color: #303133;
}

/* 歌单标签页—————————————————————————————————————————————————————————————————————————————————————————— */
.gedan-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
/* 隐藏滚动条 */
.gedan-box::-webkit-scrollbar {
  /* display: none; */
  background-color: #fff;
  width: 0.04rem;
}
/* 头部标签容器 */
.song_tag_head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.1rem;
  width: 100%;
}
body >>> .el-popper.is-light {
  left: 210px !important;
}
.gedan-box >>> .el-popper__arrow {
  display: none;
}
/* 标签弹出容器 */
.song_tag_list_box {
  display: flex;
}
/* 第一列容器 */
.song_tag_list_box .list_one {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 0.1rem;
  border-right: 0.01rem solid #999;
  width: 1rem;
}
/* 子标签第二列容器 */
.song_tag_list_box .list_sec {
  display: flex;
  margin-left: 0.1rem;
}
.list_sec > span {
  margin-right: 0.1rem;
  cursor: pointer;
}
.list_sec > span:hover {
  color: #cc66ff;
}
/* 全部歌单（触发弹出的按钮） */
.allSongList {
  cursor: pointer;
}
.el-breadcrumb__item {
  cursor: pointer;
}
</style>