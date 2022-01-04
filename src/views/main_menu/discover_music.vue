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
      <el-tab-pane label="排行榜" name="rank">
        <div class="ranking-box" v-loading="rankLoading">
          <p>官方榜</p>
          <div
            class="official-box"
            v-for="(item, index) in officicalList"
            :key="index"
          >
            <div class="ranking-list-box">
              <div class="ranking-list-left">
                <img
                  :src="item.coverImgUrl"
                  alt=""
                  @click="goDetailSongList(item)"
                />
              </div>
              <div class="ranking-list-right">
                <div
                  class="rank-list-box"
                  v-for="(secItem, secIndex) in item.tracks"
                  :key="secIndex"
                  :class="secIndex % 2 == 0 ? 'dan' : 'shuang'"
                >
                  <p>
                    <em>{{ secIndex + 1 }}</em> {{ secItem.first }}
                    <!-- <span>(《英雄联盟：双城之战》动画剧集中文主题曲)</span> -->
                  </p>
                  <i>{{ secItem.second }}</i>
                </div>
              </div>
            </div>
            <span @click="goDetailSongList(item)">查看全部</span>
          </div>
          <p>全球榜</p>
          <div class="global-box">
            <div class="global-grid-box">
              <div
                class="song_list"
                v-for="globalItem in globalList"
                :key="globalItem.id"
                @click="goDetailSongList(globalItem)"
              >
                <el-image :src="globalItem.coverImgUrl"> </el-image>
                <el-icon class="song_play_btn"><video-play /></el-icon>
                <p class="song_list_title">{{ globalItem.name }}</p>
                <div class="song_play_count">
                  <el-icon class="list_play_icon" color="#fff"
                    ><video-play
                  /></el-icon>
                  {{ playCount(globalItem.playCount) }}
                </div>
                <div class="count_bg"></div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="5">
        <div class="singer-box">
          <!-- language -->
          <div class="lang-tag-box">
            <p>语种：</p>
            <el-radio-group v-model="langRadio">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="华语"></el-radio-button>
              <el-radio-button label="欧美"></el-radio-button>
              <el-radio-button label="日本"></el-radio-button>
              <el-radio-button label="韩国"></el-radio-button>
              <el-radio-button label="其他"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="最新音乐" name="newsMusic">
        <div class="new-music-box">
          <div class="news-music-tabs">
            <p :class="activeTab == 1 ? 'dianji' : ''" @click="clickTab">
              新歌速递
            </p>
            <p :class="activeTab == 2 ? 'dianji' : ''" @click="clickTab">
              新碟上架
            </p>
          </div>
          <div class="nm-header">
            <el-breadcrumb separator=" ">
              <el-breadcrumb-item>全部</el-breadcrumb-item>
              <el-breadcrumb-item>华语</el-breadcrumb-item>
              <el-breadcrumb-item>欧美</el-breadcrumb-item>
              <el-breadcrumb-item>韩国</el-breadcrumb-item>
              <el-breadcrumb-item>日本</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div v-if="activeTab == 1" class="news-music-one">
            <div class="nm-main" v-loading="newsLoading">
              <div class="nm-list-box">
                <div
                  class="nm-box"
                  v-for="(newsOneItem, newsOneIndex) in newsMusicData"
                  :key="newsOneIndex"
                  :class="newsOneIndex % 2 == 0 ? 'dan' : 'shuang'"
                  @dblclick="playSong(newsOneItem, newsOneIndex)"
                >
                  <i>{{ getIndexNum(newsOneIndex) }}</i>
                  <img :src="newsOneItem.picUrl" alt="" />
                  <p>{{ newsOneItem.name }}</p>
                  <div class="artists-box">
                    <span
                      v-for="(art, artIndex) in newsOneItem.singer"
                      :key="artIndex"
                      >{{ art
                      }}{{
                        artIndex == newsOneItem.singer.length - 1 ? "" : " / "
                      }}</span
                    >
                  </div>
                  <div class="album-box">
                    <span>{{ newsOneItem.album }}</span>
                  </div>
                  <em>{{ formatterSongTime(newsOneItem.time) }}</em>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="activeTab == 2" class="news-music-two">
            <p>本周新碟</p>
            <div class="nmt-list-box" v-loading="nmtLoading">
              <div
                class="nmt-box"
                v-for="nmtItem in nmtData"
                :key="nmtItem.id"
                @click="goDetailAlbum(nmtItem)"
              >
                <img :src="nmtItem.picUrl" alt="" />
                <p>{{ nmtItem.name }}</p>
                <span>{{ nmtItem.artist.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
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
      // 是否不是第一次加载
      topListStatus: false,

      // 排行榜标签页官方榜
      officicalList: [],
      globalList: [],
      rankLoading: true,
      // 是否不是第一次加载
      rankStatus: false,

      langRadio: "全部",

      // 最新音乐标签页
      newsLoading: true,
      newsStatus: false,
      // 1是新歌速递，2是新碟上架
      activeTab: 1,
      // 新歌速递列表数据
      newsMusicData: [],
      // 新碟上架数据
      nmtData: [],
      nmtLoading: true,
      nmtStatus: false,
    };
  },
  watch: {
    // 标签改变后的页面变动
    activeName: function (newVal, oldVal) {
      console.log(oldVal);
      switch (newVal) {
        case "songList":
          if (!this.topListStatus) {
            this.getTopSongList(this.currentPage);
            this.topListStatus = true;
          }
          break;
        case "rank":
          if (!this.rankStatus) {
            this.getRankingList();
            this.rankStatus = true;
          }
          break;
        case "newsMusic":
          if (!this.newsStatus) {
            this.newsStatus = true;
            this.getNewsOneData();
          }
          break;

        default:
          break;
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
    // 格式化歌曲时间
    formatterSongTime: function () {
      return function (time) {
        let songTime = util.formatterSongTime(time);
        return songTime;
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

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

    // 个性推荐页里的推荐歌单点击跳转到歌单标签页
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
    // 最新音乐标签页的新碟上架歌单跳转到歌单详情
    goDetailAlbum(slItem) {
      let d = JSON.stringify(slItem);
      let songItem = encodeURIComponent(d);
      this.$router.push("/album_song?slItem=" + songItem);
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

    // 所有榜单
    getRankingList() {
      let that = this;
      let params = {};
      server.post("/toplist/detail", params).then((res) => {
        console.log("所有榜单：", res);
        if (res.code != 200) {
          that.$message.error("获取所有榜单失败");
          return;
        }
        that.rankLoading = false;
        let allList = res.list;
        that.officicalList = allList.splice(0, 4);
        that.globalList = allList;
        console.log("官方榜：", that.officicalList);
      });
    },

    // 切换最新音乐里的标签
    clickTab() {
      if (this.activeTab == 1) {
        this.activeTab = 2;
        if (!this.nmtStatus) {
          this.getNmtData();
          this.nmtStatus = true;
        }
      } else {
        this.activeTab = 1;
      }
    },

    // 获取新歌速递的数据
    getNewsOneData() {
      // let that = this
      let params = {};
      // type: 地区类型 id,全部:0,华语:7,欧美:96,日本:8,韩国:16
      params.type = 0;
      server
        .post("/top/song", params)
        .then((res) => {
          console.log("新歌速递：", res);
          if (res.code != 200) {
            this.$message.error("新歌速递的数据获取失败！");
            return;
          }
          let data = res.data;
          let songList = data.map((i) => {
            let song = {};
            song.id = i.id;
            song.name = i.name;
            song.singer = i.artists.map((singer) => {
              return singer.name;
            });
            song.album = i.album.name;
            song.picUrl = i.album.picUrl;
            song.time = i.duration;
            song.fee = i.fee;
            return song;
          });
          this.newsMusicData = songList;
          this.newsLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 双击后播放歌曲
    playSong(song, songIndex) {
      song.indexId = songIndex;
      song.list = this.newsMusicData;
      this.$emit("playingSong", song);
    },

    // 自定义歌单列表的索引
    getIndexNum(num) {
      if (num < 9) {
        let num1 = num + 1;
        return "0" + num1;
      } else {
        let num2 = num + 1;
        return num2;
      }
    },

    // 获取新碟上架数据
    getNmtData() {
      let params = {};
      // 可选参数 area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本  type : new:全部 hot:热门,默认为 new
      server
        .post("/top/album", params)
        .then((res) => {
          console.log("新碟上架", res);
          if (res.code != 200) {
            this.$message.error("新碟上架数据获取失败！");
            return;
          }
          this.nmtLoading = false;
          let weekData = res.weekData;
          let monthData = res.monthData;
          this.nmtData = weekData.concat(monthData);
        })
        .catch((err) => {
          console.log(err);
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
/* 隐藏滚动条或改变滚动条整体样式 */
.el-tab-pane::-webkit-scrollbar {
  display: none;
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
  height: 0.3rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  position: absolute;
  z-index: 97;
  top: 0;
  left: 0;
  right: 0;
  border-top-right-radius: 0.06rem;
}
/* 推荐歌单播放量、推荐MV播放量 */
.song_list .song_play_count,
.recommend_mv_list .mv_play_count {
  position: absolute;
  z-index: 98;
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
  left: 2.1rem !important;
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
  color: #999;
}
.discover_music_wrapper >>> .el-breadcrumb__item:hover {
  color: #666;
}
/* 单数行 */
.dan {
  background-color: #f9f9f9;
}
/* 双数行 */
.shuang {
  background-color: #fff;
}

/* 排行榜标签页—————————————————————————————————————————————————————————————————————————————————————————— */
/* 排行榜最外层容器 */
.ranking-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.ranking-box > p {
  margin-bottom: 0.1rem;
}
/* 官方榜容器 */
.official-box {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.official-box > span {
  margin-left: 1.5rem;
  font-size: 0.14rem;
  color: #999;
  margin-bottom: 0.1rem;
}
.official-box > span:hover {
  color: #666;
  cursor: pointer;
}
/* 列表容器 */
.ranking-list-box {
  display: flex;
  align-items: center;
  margin-bottom: 0.1rem;
  height: 1.2rem;
}
.ranking-list-left {
  width: 1.2rem;
  cursor: pointer;
}
/* 列表左边图片 */
.ranking-list-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.06rem;
}
/* 列表右边歌曲 */
.ranking-list-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-left: 0.3rem;
  height: 100%;
}
/* 歌曲容器 */
.rank-list-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.14rem;
  padding: 0.1rem;
  cursor: pointer;
}
.rank-list-box:hover {
  background-color: #f0f1f2;
}
.rank-list-box:active {
  background-color: #e5e5e5;
}
/* 歌名 */
.rank-list-box > p {
  font-style: normal;
}
/* 序列号 */
.rank-list-box em {
  font-style: normal;
  color: #cc66ff;
  font-weight: bold;
}
.rank-list-box span {
  color: #999;
}
/* 歌手 */
.rank-list-box > i {
  font-style: normal;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 3.4rem;
  text-align: right;
}
/* 全球榜 */
.global-grid-box {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 0.2rem;
  column-gap: 0.18rem;
}
.global-grid-box .song_list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

/* 歌手标签页—————————————————————————————————————————————————————————————————————————————————————————— */
/* 歌手最外层容器 */
.singer-box {
  display: flex;
  flex-direction: column;
}
.lang-tag-box {
  display: flex;
  align-items: center;
}

/* 最新音乐标签页—————————————————————————————————————————————————————————————————————————————————————————— */
/* 最新音乐最外层容器 */
.new-music-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
/* 标签容器 */
.news-music-tabs {
  display: flex;
  align-self: center;
  justify-content: center;
  border: 1px solid #999;
  border-radius: 0.2rem;
}
/* 标签名 */
.news-music-tabs > p {
  border-radius: 0.2rem;
  padding: 0.05rem 0.5rem;
  font-size: 0.14rem;
}
.news-music-tabs > p:hover {
  cursor: pointer;
}
.dianji {
  background-color: #999;
  color: #fff;
}
/* 新歌速递 */
.news-music-one {
  display: flex;
  flex-direction: column;
  flex: 1;
}
/* 页面头部 */
.nm-header {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.1rem;
}
/* 页面主要内容 */
.nm-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
/* 列表容器 */
.nm-list-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
/* 歌曲容器 */
.nm-box {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 0.8rem;
  font-size: 0.14rem;
  padding: 0.1rem;
}
.nm-box:hover {
  background-color: #f0f1f2;
}
.nm-box:active {
  background-color: #e5e5e5;
}
.nm-box i {
  color: #cc66ff;
  font-style: normal;
}
.nm-box img {
  height: 100%;
  width: 0.6rem;
  border-radius: 0.06rem;
  object-fit: cover;
  margin: 0 0.2rem;
}
.nm-box p {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.nm-box .artists-box {
  width: 2.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0.1rem;
}
.nm-box .album-box {
  width: 2.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 0.1rem;
}
.nm-box span {
  color: #999;
  cursor: pointer;
  white-space: nowrap;
}
.nm-box span:hover {
  color: #666;
}
.nm-box em {
  font-style: normal;
  color: #999;
  width: 0.5rem;
  text-align: center;
  margin-right: 0.1rem;
}

/* 新碟上架 */
.news-music-two {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}
.news-music-two > p {
  width: 0.4rem;
  position: fixed;
}
/* 列表容器 */
.nmt-list-box {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 0.18rem;
  column-gap: 0.2rem;
  margin-left: 0.6rem;
}
/* 个体容器 */
.nmt-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.14rem;
}
.nmt-box img {
  width: 100%;
  height: 1.74rem;
  object-fit: cover;
  border-radius: 0.06rem;
}
.nmt-box p {
  flex-wrap: wrap;
  max-lines: 3;
  color: #666;
  cursor: pointer;
}
.nmt-box p:hover {
  color: #303133;
}
.nmt-box span {
  white-space: nowrap;
  color: #999;
  cursor: pointer;
  font-size: 0.12rem;
}
.nmt-box span:hover {
  color: #666;
}
</style>