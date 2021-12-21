<template>
  <div class="my_favourite_song_wrapper">
    <!-- S-歌单详情顶部外层容器 -->
    <div class="mfst_wrapper">
      <!-- 歌单封面图片 -->
      <el-image :src="slItem.coverImgUrl"></el-image>

      <!-- 歌单顶部右边容器 -->
      <div class="mfst_right_wrapper">
        <!-- 歌单名字/类型 -->
        <div class="mfst_name">
          <p class="name_type">歌单</p>
          <p class="song_list_name">{{ slItem.name }}</p>
        </div>
        <!-- 歌单创建者/创建时间 -->
        <div class="mfst_creator">
          <el-image :src="creator != null ? creator.avatarUrl : ''"></el-image>
          <p class="creator_name">
            {{ creator != null ? creator.nickname : "" }}
          </p>
          <p class="creator_time">{{ formatterTime(slItem.createTime) }}创建</p>
        </div>
        <!-- 歌单操作 -->
        <div class="mfst_action">
          <div class="btn">
            <el-icon><caret-right /></el-icon><span>播放全部</span>
          </div>
          <div class="btn">
            <el-icon v-if="subscribed"><folder-checked /></el-icon>
            <el-icon v-else><folder-add /></el-icon>
            <span>收藏({{ slItem.subscribedCount }})</span>
          </div>
          <div class="btn">
            <el-icon><share /></el-icon><span>分享</span>
          </div>
          <div class="btn">
            <el-icon><download /></el-icon><span>下载全部</span>
          </div>
        </div>
        <!-- 歌单简介 -->
        <div class="mfst_describe">
          <p v-if="tags != [] ? tags.length > 0 : ''">
            <span v-for="(tagItem, tagIndex) in tags" :key="tagIndex"
              >{{ tagItem }}
              {{
                tags != [] ? (tagIndex == tags.length - 1 ? "" : "/") : ""
              }}</span
            >
          </p>
          <p>
            歌曲 : {{ slItem.trackCount }} 播放：{{
              playCount(slItem.playCount)
            }}
          </p>
          <div v-if="description" class="description_wrapper">
            <p>简介 :</p>
            <span
              id="describe_text"
              :style="
                showDescribe ? 'white-space:pre-wrap' : 'white-space:nowrap'
              "
              >{{ description }}</span
            >
            <el-icon v-if="switchWrap" @click="showDescribe = !showDescribe">
              <caret-top v-if="showDescribe" /><caret-bottom v-else />
            </el-icon>
          </div>
          <span id="copy_describe" style="display: none"></span>
        </div>
      </div>
    </div>
    <!-- E-歌单详情顶部外层容器 -->

    <!-- S-歌单列表容器 -->
    <div class="mfsl_wrapper">
      <el-tabs v-model="activeName">
        <!-- S-歌曲列表 -->
        <el-tab-pane label="歌曲列表" name="1">
          <table
            class="mfsl_song_table"
            v-loading.lock="loading"
            element-loading-text="加载中..."
          >
            <thead class="mfsl_song_head">
              <tr>
                <th class="head_action">操作</th>
                <th class="head_name">标题</th>
                <th class="head_singer">歌手</th>
                <th class="head_album">专辑</th>
                <th class="head_time">时间</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="mfsl_song_list"
                :class="songIndex % 2 == 0 ? 'dan' : 'shuang'"
                v-for="(songItem, songIndex) in songList"
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
                <td class="list_singer">
                  <p
                    v-for="(singerItem, singerIndex) in songItem.singer"
                    :key="singerIndex"
                  >
                    {{ singerItem
                    }}{{ singerIndex != songItem.singer.length - 1 ? "/" : "" }}
                  </p>
                </td>
                <td class="list_album">
                  <p>{{ songItem.album }}</p>
                </td>
                <td class="list_time">
                  <p>{{ formatterSongTime(songItem.time) }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <!-- E-歌曲列表 -->
        <el-tab-pane label="评论(177)" name="2">Config</el-tab-pane>
        <el-tab-pane label="收藏者" name="3">Role</el-tab-pane>
      </el-tabs>
    </div>
    <!-- E-歌单列表容器 -->
  </div>
</template>

<script>
import {
  CaretRight,
  FolderAdd,
  FolderChecked,
  Share,
  CaretBottom,
  CaretTop,
  Download,
} from "@element-plus/icons";
// import util from "../../../utils/util.js";
import util from "@/utils/util.js";
import server from "@/utils/http.js";

export default {
  components: {
    CaretRight,
    FolderAdd,
    FolderChecked,
    Share,
    CaretBottom,
    Download,
    CaretTop,
  },
  emits: ["playingSong"],
  data() {
    return {
      subscribed: false,
      showDescribe: false,
      activeName: "1",
      // 歌单列表对象
      slItem: "",
      creator: "",
      tags: [],
      description: "",
      songList: [],
      switchWrap: false,

      // 喜欢和下载
      like: false,
      download: false,
      // 是否在加载
      loading: true,
    };
  },
  created() {
    this.getSlItem();
  },
  mounted() {
    this.isLineFeed();
    this.getPlayListSong();
  },
  computed: {
    // 播放量
    playCount: function () {
      return function (val) {
        let count = util.playCount(val);
        return count;
      };
    },
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
  watch: {
    // 由于不同的歌单不同的数据，所以当路由变换时执行以下方法
    $route: function () {
      this.loading = true;
      this.showDescribe = false;
      this.switchWrap = false;
      if (this.$route.query.slItem == null) {
        console.log("传递过来的参数为空");
      } else {
        this.getSlItem();
        this.isLineFeed();
        this.getPlayListSong();
      }
    },
  },
  methods: {
    // 切换歌单后重新获取数据
    getSlItem() {
      // 获取到传递过来的歌单对象
      let listItem = decodeURIComponent(this.$route.query.slItem);
      this.slItem = JSON.parse(listItem);
      if (Object.keys(this.slItem).length > 0) {
        this.creator = this.slItem.creator;
        this.tags = this.slItem.tags;
        this.description = this.slItem.description;
      }
    },
    // 判断文字是否超出一行
    isLineFeed() {
      this.$nextTick(function () {
        // 判断文字是否超出一行
        let desc = document.getElementById("describe_text");
        let cpds = document.getElementById("copy_describe");
        if (desc != null) {
          cpds.style.display = "block";
          // 绝对定位是为了避免它的宽度撑满了父容器的宽度，让它是被内容被撑开
          cpds.style.position = "absolute";
          let descWidth = desc.offsetWidth;
          cpds.style.fontSize = "0.14rem";
          let kongGE =
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          cpds.innerHTML = desc.innerHTML;
          desc.innerHTML = kongGE + cpds.innerHTML;
          let cpdsWidth = cpds.offsetWidth;
          // 内容的宽度比容器的宽度大则显示展示按钮
          if (cpdsWidth > descWidth) {
            this.switchWrap = true;
            cpds.style.display = "none";
          } else {
            this.switchWrap = false;
            cpds.style.display = "none";
          }
        }
      });
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
      if (this.songList[index].like == 1) {
        this.songList[index].like = 0;
      } else {
        this.songList[index].like = 1;
      }
    },
    // 点击下载歌曲
    songDownLoad(index) {
      if (this.songList[index].download == 1) {
        this.songList[index].download = 0;
      } else {
        this.songList[index].download = 1;
      }
    },

    // 双击后播放歌曲
    playSong(song, songIndex) {
      song.indexId = songIndex;
      song.list = this.songList;
      this.$emit("playingSong", song);
    },

    // 获取歌单所有歌曲
    getPlayListSong() {
      let that = this;
      let timestamp = Date.parse(new Date());
      let url = "/playlist/track/all?t=" + timestamp;
      let id = that.slItem.id;
      let params = {};
      params.id = id;
      server
        .post(url, params)
        .then((res) => {
          console.log(res);
          if (res.code != 200) {
            console.log("获取歌单歌曲失败");
            return;
          }
          console.log("获取歌单歌曲成功");
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
          that.songList = songList;
          console.log("歌单歌曲列表my：", that.songList);
          that.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
/* 歌单详情最外层容器 */
.my_favourite_song_wrapper {
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 0.25rem;
  overflow-y: auto;
  overflow-x: hidden;
}
/* 隐藏滚动条或改变滚动条整体样式 */
.my_favourite_song_wrapper::-webkit-scrollbar {
  background-color: #fff;
  width: 0.04rem;
}
/* 设置内部滚动条的颜色和圆角 */
.my_favourite_song_wrapper::-webkit-scrollbar-thumb {
  width: 0.1rem;
  background-color: #e6e6e6;
}
/* 顶部容器 */
.mfst_wrapper {
  display: flex;
  margin-top: 0.1rem;
}
/* 歌单封面 */
.mfst_wrapper .el-image {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 0.04rem;
}
/* 顶部右边容器 */
.mfst_wrapper .mfst_right_wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 0.15rem;
  flex: 1;
  position: relative;
}

/* 歌单名字容器 */
.mfst_right_wrapper .mfst_name {
  display: flex;
  align-items: center;
}
/* 列表类型 */
.mfst_name .name_type {
  border: 1px solid #cc66ff;
  color: #cc66ff;
  font-size: 0.14rem;
  padding: 0 0.04rem;
  user-select: none;
}
/* 歌单名字 */
.mfst_name .song_list_name {
  font-size: 0.22rem;
  font-weight: bold;
  color: #000;
  margin-left: 0.1rem;
}

/* 歌单创建信息容器 */
.mfst_right_wrapper .mfst_creator {
  display: flex;
  align-items: center;
  margin-top: 0.05rem;
}
/* 创建者头像 */
.mfst_creator .el-image {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 50%;
}
/* 创建者名字 */
.mfst_creator .creator_name {
  color: #cc66ff;
  font-size: 0.12rem;
  margin-left: 0.05rem;
}
.mfst_creator .creator_name:hover {
  color: #bb33ff;
  cursor: pointer;
}
/* 创建时间 */
.mfst_creator .creator_time {
  color: #999;
  font-size: 0.12rem;
  margin-left: 0.05rem;
  user-select: none;
}

/* 歌单操作 */
.mfst_right_wrapper .mfst_action {
  display: flex;
  align-items: center;
  margin-top: 0.1rem;
  font-size: 0.14rem;
}
/* 按钮样式 */
.mfst_action > .btn {
  display: flex;
  align-items: center;
  border: 1px solid #606266;
  border-radius: 0.5rem;
  padding: 0.03rem 0.2rem 0.03rem 0.1rem;
}
/* 第一个播放全部按钮 */
.mfst_action > .btn:first-child {
  background-color: #cc66ff;
  border-color: #cc66ff;
  color: #fff;
}
.mfst_action > .btn:first-child:hover {
  background-color: #bb33ff;
  border-color: #bb33ff;
  cursor: pointer;
}
/* 除了第一个按钮之外 */
.mfst_action > .btn:not(:first-child) {
  margin-left: 0.1rem;
  border-color: #e2e2e2;
  color: #606266;
}
.mfst_action > .btn:not(:first-child):hover {
  background-color: rgba(0, 0, 0, 0.03);
  cursor: pointer;
}
/* 图标的大小 */
.btn > .el-icon {
  font-size: 0.2rem;
}
.btn > .el-icon:first-child {
  font-size: 0.24rem;
}
.btn > span {
  margin-left: 0.05rem;
  user-select: none;
}

/* 歌单描述 */
.mfst_right_wrapper .mfst_describe {
  display: flex;
  flex-direction: column;
  margin-top: 0.1rem;
  overflow: hidden;
}
.mfst_describe > p {
  font-size: 0.14rem;
  padding-right: 0.2rem;
  user-select: none;
  color: #606266;
}
/* 标签 */
.mfst_describe > p:first-child > span {
  color: #cc66ff;
}
.mfst_describe > p:first-child > span:hover {
  cursor: pointer;
  color: #bb33ff;
}
/* 简介内容 */
.description_wrapper {
  display: flex;
  font-size: 0.14rem;
  overflow: hidden;
  user-select: none;
  color: #606266;
  position: relative;
}
.description_wrapper > p {
  width: 0.41rem;
  position: absolute;
}
.description_wrapper > span {
  user-select: text;
  width: 7.7rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #999;
}
/* 简介展示和缩放的icon */
.description_wrapper > .el-icon {
  position: absolute;
  right: 0;
}
.description_wrapper > .el-icon:hover {
  cursor: pointer;
}

/* 歌曲列表的标签 */
.mfsl_wrapper {
  flex: 1;
  margin-top: 0.1rem;
}
.mfsl_wrapper .el-tabs {
  font-size: 0.2rem;
  width: 100%;
  height: 100%;
}
/* 去除标签下面灰色的线 */
.mfsl_wrapper >>> .el-tabs__nav-wrap::after {
  display: none;
}
/* 标签下划线的颜色 */
.mfsl_wrapper >>> .el-tabs__active-bar {
  background-color: #cc66ff;
}
/* 标签字体大小 */
.mfsl_wrapper >>> .el-tabs__item {
  font-size: 0.18rem;
}
/* 鼠标移入标签时的文字颜色 */
.mfsl_wrapper >>> .el-tabs__item:hover {
  cursor: pointer;
  color: #000;
}
/* 鼠标点击时标签的文字变大 */
.mfsl_wrapper >>> .el-tabs__item.is-active {
  font-size: 0.22rem;
  font-weight: bold;
  color: #000;
}

/* 歌单列表的表格 */
.mfsl_song_table {
  width: 100%;
  font-size: 0.14rem;
  border-collapse: collapse;
  table-layout: fixed;
}

/* 表头 */
.mfsl_song_head th {
  font-weight: normal;
  color: #888;
  padding: 0.1rem;
  user-select: none;
}

/* 其他表头的标题靠左 */
.mfsl_song_head th:not(:first-child) {
  text-align: left;
}

.mfsl_song_head th:not(:first-child):hover {
  background-color: #f0f1f2;
}

/* 表头的操作and表头的时间 */
.mfsl_song_head .head_action,
.mfsl_song_head .head_time {
  width: 10%;
}

/* 表头的标题 */
.mfsl_song_head .head_name {
  width: 40px;
}

/* 表头的歌手 */
.mfsl_song_head .head_singer {
  width: 20px;
}

/* 表头的专辑 */
.mfsl_song_head .head_album {
  width: 30px;
}

/* 列表 */
.mfsl_song_list {
  color: #656565;
}

/* 单数行 */
.dan {
  background-color: #f9f9f9;
}
/* 双数行 */
.shuang {
  background-color: #fff;
}

.mfsl_song_list:hover {
  background-color: #f0f1f2;
}

.mfsl_song_list:active {
  background-color: #e5e5e5;
}

.mfsl_song_list td {
  user-select: none;
  padding: 0.1rem;
}

.mfsl_song_list td:first-child {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.mfsl_song_list td:first-child > p {
  color: #d2c3db;
  user-select: none;
}

.list_action > p {
  font-size: 0.14rem;
}

/* 改变选中行的颜色以及鼠标移入行的颜色 */
/* .el-tab-pane .el-table {
  --el-table-current-row-background-color: #e5e5e5;
  --el-table-row-hover-background-color: #f0f1f2;
}
.mfsl_wrapper >>> .el-table td.el-table__cell div {
  display: flex;
  align-items: center;
} */
/* 喜欢和下载两个icon */
.mfsl_wrapper >>> i.iconfont.icon-like {
  font-size: 0.24rem;
  color: #b3b3b3;
}
.mfsl_wrapper >>> i.iconfont.icon-like:hover {
  cursor: pointer;
  color: #606266;
}
.mfsl_wrapper >>> i.iconfont.icon-likefill {
  font-size: 0.24rem;
  color: #ec4141;
}
.mfsl_wrapper >>> i.iconfont.icon-likefill:hover {
  cursor: pointer;
  color: #d73535;
}
.mfsl_wrapper >>> i.iconfont.icon-chenggong {
  font-size: 0.18rem;
  color: #507daf;
}
.mfsl_wrapper >>> i.el-icon.download_icon {
  --font-size: 0.18rem;
  color: #b3b3b3;
}
.mfsl_wrapper >>> i.el-icon.download_icon:hover {
  cursor: pointer;
  color: #606266;
}

.mfsl_song_list td > p {
  /* float: left; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* .list_name > p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
} */

.mfsl_song_list .list_singer {
  display: flex;
  align-items: center;
}

.list_singer > p {
  line-height: 0.19rem;
}

.mfsl_song_list .list_singer > p:hover,
.mfsl_song_list .list_album > p:hover {
  color: #343434;
  cursor: pointer;
}
</style>