<template>
  <div class="singer_detail_wrapper" @scroll="getScrollData">
    <!-- 顶部 -->
    <el-skeleton :loading="hotLoading" animated :throttle="500">
      <template v-slot:template>
        <div style="display: flex; width: 100%; height: 100%">
          <el-skeleton-item
            variant="image"
            style="width: 1.8rem; height: 1.8rem"
          />
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              margin-left: 0.3rem;
            "
          >
            <el-skeleton-item variant="text" style="0.5rem" />
            <el-skeleton-item variant="text" style="1.2rem" />
            <el-skeleton-item variant="text" style="width: 1rem" />
            <el-skeleton-item variant="text" style="width: 1.5rem" />
          </div>
        </div>
      </template>
      <template v-slot:default>
        <!-- 歌手详情页顶部 -->
        <div class="singer_detail_header">
          <!-- 歌手照片 -->
          <img :src="userData ? userData.avatarUrl : artistData.cover" alt="" />
          <!-- 歌手详情页顶部右边 -->
          <div class="sdhr">
            <!-- 歌手名字 -->
            <b>{{ artistData.name }}</b>
            <!-- 歌手别称 -->
            <span v-if="otherName != ''">{{ otherName }}</span>
            <!-- 操作 -->
            <div class="sdhr_action">
              <!-- 收藏 -->
              <div class="btn">
                <el-icon v-if="subscribed"><folder-checked /></el-icon>
                <el-icon v-else><folder-add /></el-icon>
                <span>{{ subscribed ? "已收藏" : "收藏" }}</span>
              </div>
              <!-- 个人主页 -->
              <div class="btn">
                <el-icon><user /></el-icon><span>个人主页</span>
              </div>
            </div>
            <!-- 歌手的各项数据 -->
            <p>
              <em>单曲数: {{ artistData.musicSize }}</em>
              <em>专辑数: {{ artistData.albumSize }}</em>
              <em>MV数: {{ artistData.mvSize }}</em>
            </p>
          </div>
        </div>
      </template>
    </el-skeleton>

    <!-- 歌手详情页主体 -->
    <div class="singer_detail_main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="专辑" name="1">
          <div
            class="hot_song_box"
            v-loading.lock="hotLoading"
            element-loading-text="加载中..."
          >
            <img src="../../../assets/images/top50.jpg" alt="" />
            <div class="hot_list_box">
              <p>热门50首</p>
              <table class="mfsl_song_table">
                <tbody>
                  <tr
                    class="mfsl_song_list"
                    :class="songIndex % 2 == 0 ? 'dan' : 'shuang'"
                    v-for="(songItem, songIndex) in topSong"
                    :key="songItem.id"
                    @dblclick="playSong(songItem, songIndex)"
                  >
                    <td class="list_action">
                      <p>{{ getIndexNum(songIndex) }}</p>
                      <i
                        v-if="songItem.like == 1"
                        class="iconfont icon-likefill"
                        @click="songLike(songIndex)"
                      ></i>
                      <i
                        v-else
                        class="iconfont icon-like"
                        @click="songLike(songIndex)"
                      ></i>
                      <i
                        v-if="songItem.download == 1"
                        class="iconfont icon-chenggong"
                      ></i>
                      <el-icon
                        v-else
                        class="download_icon"
                        @click="songDownLoad(songIndex)"
                        ><download
                      /></el-icon>
                    </td>
                    <td class="list_name">
                      <p>{{ songItem.name }}</p>
                    </td>
                    <td class="list_time">
                      <p>{{ formatterSongTime(songItem.time) }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span v-if="readMoreStatus" @click="readMore"
                >查看全部{{ hotSongNum }}首 ></span
              >
            </div>
          </div>
          <div
            class="hot_album_list"
            v-loading.lock="hALoading && hCount > 0"
            element-loading-text="加载中..."
          >
            <div
              class="hot_album_box"
              v-for="aItem in hotAlbums"
              :key="aItem.id"
              @click="goAlbumDetail(aItem)"
            >
              <img :src="aItem.picUrl" alt="" />
              <p>{{ aItem.name }}</p>
              <span>{{ formatterTime(aItem.publishTime) }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="2"> </el-tab-pane>
        <el-tab-pane label="歌手详情" name="3"> </el-tab-pane>
        <el-tab-pane label="相似歌手" name="4"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import util from "@/utils/util.js";
import server from "@/utils/http.js";

export default {
  name: "singer_detail",
  data() {
    return {
      //   标签页
      activeName: "1",
      //   是否加载中
      hotLoading: false,
      subscribed: true,

      // 歌手ID
      id: 0,
      // 描述数据
      descData: {},
      // 详细数据
      artistData: {},
      userData: {},
      // 歌手别称
      otherName: "",

      // 前10首热门
      topSong: [],
      // 后40首热门
      aTopSong: [],
      // 歌手专辑
      hotAlbums: [],
      // 第几次获取专辑
      hCount: 0,
      hAMore: false,
      hALoading: true,
      // 要播放的音乐
      songList: [],
      readMoreStatus: true,
      hotSongNum: 0,
    };
  },
  computed: {
    // 创建时间
    formatterTime: function () {
      return function (val) {
        let date = util.formatterTime(val);
        return date;
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
  mounted() {
    this.id = this.$route.query.id;
    // 获取歌手详情
    this.getSingerArtistData();
    // 获取歌手描述
    this.getSingerDescData();
    // 获取热门50首
    this.getArtistTopSong();
    // 获取专辑
    this.getSingerAlbumData();
  },
  methods: {
    //   获取歌手详情数据
    getSingerArtistData() {
      let params = {};
      params.id = this.id;
      server
        .post("/artist/detail", params)
        .then((res) => {
          console.log("获取歌手详情数据", res);
          if (res.code != 200) {
            this.$message.error("获取歌手详情数据失败！");
          }
          this.artistData = res.data.artist;
          this.userData = res.data.user;
          this.getOtherName();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 截取歌手别称
    getOtherName() {
      let briefDesc = this.artistData.briefDesc;
      let start = briefDesc.indexOf("（");
      let end = briefDesc.indexOf("）");
      if (start == -1 || end == -1) {
        this.otherName = "";
      } else {
        this.otherName = briefDesc.substring(start + 1, end);
      }
    },

    //   获取歌手描述数据
    getSingerDescData() {
      let params = {};
      params.id = this.id;
      server
        .post("/artist/desc", params)
        .then((res) => {
          console.log("获取歌手描述数据", res);
          if (res.code != 200) {
            this.$message.error("获取歌手描述数据失败！");
          }
          this.descData = res.introduction;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //   歌手热门50首歌曲
    getArtistTopSong() {
      this.readMoreStatus = false;
      this.hotLoading = true;
      let params = {};
      params.id = this.id;
      server
        .post("/artist/top/song", params)
        .then((res) => {
          console.log("歌手热门50首歌曲", res);
          if (res.code != 200) {
            this.$message.error("获取歌手热门歌曲失败");
          }
          let songs = res.songs;
          let songList = songs.map((i) => {
            let song = {};
            song.id = i.id;
            song.name = i.name;
            song.singer = i.ar.map((singer) => {
              return singer.name;
            });
            song.album = i.al.name;
            song.picUrl = i.al.picUrl;
            song.time = i.dt;
            song.fee = i.fee;
            return song;
          });
          //   前10首歌曲
          this.topSong = songList.splice(0, 10);
          //   后40首歌曲
          this.aTopSong = songList;
          this.songList = this.topSong.concat(this.aTopSong);
          //   查看更多按钮显示
          this.readMoreStatus = true;
          //   加载完成
          this.hotLoading = false;
          this.hotSongNum = res.songs.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 双击后播放歌曲
    playSong(song, songIndex) {
      // console.log("双击成功", song, songIndex);
      song.indexId = songIndex;
      song.list = this.songList;
      this.$emit("playingSong", song);
    },

    //   获取歌手专辑数据
    getSingerAlbumData() {
      // if (!this.hAMore) return;
      let params = {};
      let limit = 30;
      params.id = this.id;
      params.limit = limit;
      params.offset = this.hCount * limit;
      let timestamp = Date.now();
      server
        .post("/artist/album?t=" + timestamp, params)
        .then((res) => {
          console.log("获取歌手专辑数据", res);
          if (res.code != 200) {
            this.$message.error("获取歌手专辑数据失败！");
          }
          this.hAMore = res.more;
          this.hCount++;
          this.hotAlbums = this.hotAlbums.concat(res.hotAlbums);
          this.hALoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 滚动继续获取数据
    getScrollData() {
      let list = document.getElementsByClassName("singer_detail_wrapper")[0];
      if (list.scrollHeight - list.scrollTop <= list.clientHeight) {
        if (this.hAMore && !this.hALoading) {
          this.getSingerAlbumData();
          this.hALoading = true;
        }
      }
    },

    // 查看更多N首
    readMore() {
      this.readMoreStatus = false;
      this.topSong = this.topSong.concat(this.aTopSong);
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

    // 点击喜欢歌曲
    songLike(index) {
      if (this.topSong[index].like == 1) {
        this.topSong[index].like = 0;
      } else {
        this.topSong[index].like = 1;
      }
    },
    // 点击下载歌曲
    songDownLoad(index) {
      if (this.topSong[index].download == 1) {
        this.topSong[index].download = 0;
      } else {
        this.topSong[index].download = 1;
      }
    },

    goAlbumDetail(slItem) {
      let d = JSON.stringify(slItem);
      let songItem = encodeURIComponent(d);
      this.$router.push("/album_song?slItem=" + songItem);
    },
  },
};
</script>

<style scoped>
/* 歌手详情页最外层容器 */
.singer_detail_wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.2rem;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 隐藏滚动条或改变滚动条整体样式 */
.singer_detail_wrapper::-webkit-scrollbar {
  background-color: #fff;
  width: 0.04rem;
}
/* 设置内部滚动条的颜色和圆角 */
.singer_detail_wrapper::-webkit-scrollbar-thumb {
  width: 0.1rem;
  background-color: #e6e6e6;
}

/* 头部 */
.singer_detail_header {
  display: flex;
  align-items: center;
  width: 100%;
  /* height: 100%; */
}
.singer_detail_header img {
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  margin-right: 0.1rem;
  border-radius: 0.06rem;
  border: 1px solid #e2e2e2;
}
/* 头部右边 */
.singer_detail_header .sdhr {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 0.13rem;
  color: #606266;
}
/* 歌手名字 */
.sdhr > b {
  font-size: 0.22rem;
  color: #000;
  margin-bottom: 0.1rem;
}
.sdhr > span {
  margin-bottom: 0.1rem;
}

/* 歌手详细页面顶部的操作 */
.sdhr .sdhr_action {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
/* 按钮样式 */
.sdhr_action > .btn {
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  padding: 0.05rem 0.15rem;
  color: #606266;
  margin-right: 0.1rem;
}
.sdhr_action > .btn:hover {
  background-color: rgba(0, 0, 0, 0.03);
  cursor: pointer;
}
/* 图标的大小 */
.btn > .el-icon {
  font-size: 0.2rem;
}
.btn > span {
  margin-left: 0.05rem;
  user-select: none;
}

/* 各种数据 */
.sdhr p > em {
  font-style: normal;
  margin-right: 0.1rem;
}

/* 歌手详情页的主体部分 */
.singer_detail_main {
  flex: 1;
  margin-top: 0.2rem;
}
.singer_detail_main .el-tabs {
  font-size: 0.2rem;
  width: 100%;
  height: 100%;
}
/* 去除标签下面灰色的线 */
.singer_detail_main >>> .el-tabs__nav-wrap::after {
  display: none;
}
/* 标签下划线的颜色 */
.singer_detail_main >>> .el-tabs__active-bar {
  background-color: #cc66ff;
}
/* 标签字体大小 */
.singer_detail_main >>> .el-tabs__item {
  font-size: 0.18rem;
}
/* 鼠标移入标签时的文字颜色 */
.singer_detail_main >>> .el-tabs__item:hover {
  cursor: pointer;
  color: #000;
}
/* 鼠标点击时标签的文字变大 */
.singer_detail_main >>> .el-tabs__item.is-active {
  font-size: 0.22rem;
  font-weight: bold;
  color: #000;
}

.hot_song_box {
  display: flex;
  width: 100%;
  height: 100%;
  margin-bottom: 0.1rem;
}

.hot_song_box img {
  height: 1.5rem;
  width: 1.5rem;
  object-fit: cover;
  border: 1px solid #e2e2e2;
  border-radius: 0.06rem;
  margin-right: 0.5rem;
}

.hot_list_box {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.hot_list_box > p {
  font-size: 0.16rem;
  margin-bottom: 0.1rem;
}

/* 查看更多按钮 */
.hot_list_box > span {
  text-align: right;
  font-size: 0.14rem;
  padding-right: 0.3rem;
  color: #9b9b9b;
  background-color: #f9f9f9;
  cursor: pointer;
  line-height: 0.34rem;
}

.hot_list_box > span:hover {
  color: #656565;
}

/* 歌单列表的表格 */
.mfsl_song_table {
  width: 100%;
  font-size: 0.14rem;
  border-collapse: collapse;
  table-layout: fixed;
}

/* 列表 */
.mfsl_song_list {
  color: #656565;
  display: flex;
  align-items: center;
}

/* 单数行 */
.dan {
  background-color: #f9f9f9;
}
/* 双数行 */
.shuang {
  background-color: #fff;
}
/* 每列鼠标移入的效果 */
.mfsl_song_list:hover {
  background-color: #f0f1f2;
}

.mfsl_song_list:focus {
  background-color: #e5e5e5;
}

.mfsl_song_list td {
  user-select: none;
  padding: 0.05rem 0.1rem;
}

.mfsl_song_list td:first-child {
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
}

.mfsl_song_list td:first-child > p {
  color: #d2c3db;
  user-select: none;
  line-height: 0.24rem;
}
/* 歌曲的操作如:收藏或下载 */
.list_action {
  margin-right: 0.1rem;
}

.list_action > p {
  font-size: 0.14rem;
}

.list_action i {
  margin-left: 0.1rem;
}

/* 喜欢和下载两个icon */
.singer_detail_main >>> i.iconfont.icon-like {
  font-size: 0.24rem;
  color: #b3b3b3;
}
.singer_detail_main >>> i.iconfont.icon-like:hover {
  cursor: pointer;
  color: #606266;
}
.singer_detail_main >>> i.iconfont.icon-likefill {
  font-size: 0.24rem;
  color: #ec4141;
}
.singer_detail_main >>> i.iconfont.icon-likefill:hover {
  cursor: pointer;
  color: #d73535;
}
.singer_detail_main >>> i.iconfont.icon-chenggong {
  font-size: 0.18rem;
  color: #507daf;
}
.singer_detail_main >>> i.el-icon.download_icon {
  --font-size: 0.18rem;
  color: #b3b3b3;
}
.singer_detail_main >>> i.el-icon.download_icon:hover {
  cursor: pointer;
  color: #606266;
}

/* 给所有的P元素超出width显示省略号 */
.mfsl_song_list td > p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 0.24rem;
}

.mfsl_song_list .list_name {
  flex: 1;
}
.mfsl_song_list .list_time {
  width: 1rem;
  color: #999;
}

/* 专辑列表 */
.hot_album_list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.2rem;
}
/* 专辑列表个体容器 */
.hot_album_box {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.hot_album_box img {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 0.06rem;
  object-fit: cover;
  border: 1px solid #e2e2e2;
}
.hot_album_box p {
  font-size: 0.14rem;
  color: #606266;
  width: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0.05rem 0;
}
.hot_album_box span {
  font-size: 0.12rem;
}
</style>