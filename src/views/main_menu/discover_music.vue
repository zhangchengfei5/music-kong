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
            推荐歌单 <el-icon color="#666" :size="22"><arrow-right /></el-icon>
          </div>
          <!-- 推荐歌单列表容器 -->
          <div class="song_list_wrapper">
            <div
              class="song_list"
              v-for="songlistItem in recommendSongList"
              :key="songlistItem.id"
            >
              <el-image :src="songlistItem.picUrl"> </el-image>
              <el-icon class="song_play_btn"><video-play /></el-icon>
              <p class="song_list_title">{{ songlistItem.name }}</p>
              <div class="song_play_count">
                <el-icon class="list_play_icon" color="#fff"
                  ><video-play
                /></el-icon>
                {{ playCount(songlistItem.playCount) }}
              </div>
            </div>
          </div>
        </div>
        <!-- E-推荐歌单外层容器 -->

        <!-- S-独家放送列表入口 -->
        <div class="privatecontent_wrapper">
          <!-- 独家放送大标题 -->
          <div class="privatecontent_title">
            独家放送 <el-icon color="#666" :size="22"><arrow-right /></el-icon>
          </div>
          <!-- 独家放送列表个体容器 -->
          <div class="privatecontent_list_wrapper">
            <div
              class="privatecontent_list"
              v-for="pclItem in privatecontentList"
              :key="pclItem.id"
            >
              <el-image :src="pclItem.sPicUrl"></el-image>
              <el-icon class="plsp_btn"><video-play /></el-icon>
              <p class="privatecontent_list_title">{{ pclItem.name }}</p>
            </div>
          </div>
        </div>
        <!-- E-独家放送列表入口 -->
      </el-tab-pane>
      <el-tab-pane label="专属定制" name="2">专属定制</el-tab-pane>
      <el-tab-pane label="歌单" name="3">歌单</el-tab-pane>
      <el-tab-pane label="排行榜" name="4">排行榜</el-tab-pane>
      <el-tab-pane label="歌手" name="5">歌手</el-tab-pane>
      <el-tab-pane label="最新音乐" name="6">最新音乐</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ArrowRight, VideoPlay } from "@element-plus/icons";
import server from "../../utils/http.js";

export default {
  components: {
    ArrowRight,
    VideoPlay,
  },
  data() {
    return {
      activeName: "1",
      bannerList: [],
      recommendSongList: [],
      privatecontentList: [],
    };
  },
  mounted() {
    this.getBanner();
    this.getRecommendSongList();
    this.getPrivateContentList();
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
      let url = "/personalized?limit=" + limit;
      var params = {};
      server
        .post(url, params)
        .then((res) => {
          that.recommendSongList = res.result;
          console.log("推荐歌单：", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 计算歌单播放量
    playCount(count) {
      let play = Math.round(count / 10000);
      let playNum = play + "万";
      return playNum;
    },
    // 获取独家放送入口列表
    getPrivateContentList() {
      let that = this;
      let url = "/personalized/privatecontent";
      var params = {};
      server
        .post(url, params)
        .then((res) => {
          console.log(res);
          that.privatecontentList = res.result;
          console.log("独家放送列表入口：", res);
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
  top: 0.735rem;
  padding-top: 0.1rem;
  padding-bottom: 0.08rem;
  border-top: 1px solid #cc66ff;
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
.discover_music_wrapper .el-tabs__item {
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
  padding: 0.65rem 0 0.5rem;
}

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
}
/* 推荐歌单大标题、独家放送大标题  */
.recommend_song_wrapper .recommend_song_title,
.privatecontent_wrapper .privatecontent_title {
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.recommend_song_wrapper .recommend_song_title:hover,
.privatecontent_wrapper .privatecontent_title:hover {
  cursor: pointer;
  color: #303133;
}
/* 推荐歌单列表外层容器 */
.recommend_song_wrapper .song_list_wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 0.2rem;
  column-gap: 0.18rem;
  margin-bottom: 0.2rem;
}
/* 歌单容器 */
.song_list_wrapper .song_list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
/* 歌单封面图片、独家放送图片 */
.song_list > .el-image,
.privatecontent_list > .el-image {
  border-radius: 0.06rem;
  margin-bottom: 0.1rem;
}
.song_list > .el-image:hover，.privatecontent_list > .el-image:hover {
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
.song_list .el-image:hover + .song_play_btn {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.05);
}
/* 推荐歌单播放量 */
.song_list .song_play_count {
  position: absolute;
  top: 0.04rem;
  right: 0.06rem;
  display: flex;
  align-items: center;
  font-size: 0.1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.08);
}
.song_play_count .list_play_icon {
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
.privatecontent_list .plsp_btn {
  position: absolute;
}
</style>