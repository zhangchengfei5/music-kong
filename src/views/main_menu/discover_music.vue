<template>
  <div class="discover_music_wrapper">
    <el-tabs v-model="activeName">
      <el-tab-pane label="个性推荐" name="1">
        <el-carousel type="card" :interval="5000">
          <el-carousel-item
            v-for="(item, index) in bannerList"
            :key="index"
            :name="'' + index"
          >
            <el-image :src="item.imageUrl">
              <template #placeholder>
                <span>图片加载中...</span>
              </template>
            </el-image>
          </el-carousel-item>
        </el-carousel>
        <div class="recommend_song_wrapper">
          <div class="title">
            推荐歌曲 <el-icon color="#666" :size="20"><arrow-right /></el-icon>
          </div>
        </div>
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
// const axios = require("axios");
import { ArrowRight } from "@element-plus/icons";
import server from "../../utils/http.js";

export default {
  components: {
    ArrowRight,
  },
  data() {
    return {
      activeName: "1",
      bannerList: [],
      recommendSongList: [],
    };
  },
  mounted() {
    this.getBanner();
    this.getRecommendSongList();
  },
  methods: {
    getBanner() {
      // axios
      //   .get("http://localhost:3000/banner")
      //   .then((response) => {
      //     this.bannerList = response.data.banners;
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      let url = "/banner";
      var params = {};
      server
        .get(url, params)
        .then((res) => {
          if (res.code == 200) {
            this.bannerList = res.banners;
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRecommendSongList() {
      let url = "/recommend/resource";
      var params = {};
      // params.cookie = sessionStorage.getItem("cookie");
      server
        .post(url, params)
        .then((res) => {
          this.recommendSongList = res.recommend;
          console.log("推荐歌单：", res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.discover_music_wrapper {
  flex: 1;
  background-color: #fff;
  padding: 0.1rem;
}
/* 顶部标签 */
.el-tabs {
  height: 100%;
  width: 100%;
  font-size: 0.16rem;
}
/* 标签下划线的颜色 */
.el-tabs__active-bar {
  background-color: #cc66ff;
}
/* 鼠标移入标签时的文字颜色 */
.el-tabs__item:hover {
  cursor: pointer;
  color: #000;
}
/* 鼠标点击时标签的文字变大 */
.el-tabs__item.is-active {
  font-size: 0.18rem;
  font-weight: bold;
  color: #000;
}

/* 轮播图容器的高度 */
.el-carousel__container {
  height: 2.2rem;
}
.el-carousel__container .el-image {
  width: 100%;
  height: 100%;
  border-radius: 0.08rem;
}
</style>