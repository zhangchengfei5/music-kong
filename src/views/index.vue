<template>
  <div class="home_wrapper">
    <!-- S-顶部导航 -->
    <div class="home_top_wrapper">
      <!-- S-登录 -->
      <div class="login_wrapper" @click="login">
        <el-image :src="imgUrl.user"></el-image>
        <p>{{ username }}</p>
      </div>
      <el-dialog v-model="isLogin" title="登录"> </el-dialog>
      <!-- E-登录 -->

      <!-- S-搜索 -->
      <div class="search_wrapper">
        <el-icon color="#e6e6e6" :size="25"><arrow-left /></el-icon>
        <el-input v-model="song" placeholder="搜索" clearable>
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <el-icon color="#e6e6e6" :size="25"><microphone /></el-icon>
      </div>
      <!-- E-搜索 -->

      <!-- S-主题、消息、关闭 -->
      <div class="close_wrapper">
        <el-icon color="#e6e6e6" :size="25"><setting /></el-icon>
        <el-icon color="#e6e6e6" :size="25"><bell /></el-icon>
        <el-icon color="#e6e6e6" :size="25"><full-screen /></el-icon>
        <el-icon color="#e6e6e6" :size="25"><close /></el-icon>
      </div>
      <!-- E-主题、消息、关闭 -->
    </div>
    <!-- E-顶部导航 -->

    <!-- S-主体部分 -->
    <div class="home_main_wrapper">
      <div class="menu_wrapper">
        <el-menu
          default-active="/discover_music"
          text-color="#666"
          active-text-color="#000"
          router
        >
          <el-menu-item index="/discover_music">发现音乐</el-menu-item>
          <el-menu-item index="/boke">播客</el-menu-item>
          <el-menu-item index="/video">视频</el-menu-item>
          <el-menu-item index="/friends">朋友</el-menu-item>
          <el-menu-item index="/living">直播</el-menu-item>
          <el-menu-item index="/private_fm">私人FM</el-menu-item>
          <el-menu-item-group title="我的音乐">
            <el-menu-item index="/local_download">本地与下载</el-menu-item>
            <el-menu-item index="/last_play">最近播放</el-menu-item>
            <el-menu-item index="/my_music_cloud">我的音乐云盘</el-menu-item>
            <el-menu-item index="/my_boke">我的播客</el-menu-item>
            <el-menu-item index="/my_collections">我的收藏</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="8">
            <template #title>
              <span>创建的歌单</span>
            </template>
            <el-menu-item index="/my_favourtie_song">我喜欢的音乐</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
    <!-- E-主体部分 -->

    <!-- S-底部导航 -->
    <div class="home_bottom_wrapper">
      <!-- 歌曲封面 -->
      <el-image :src="imgUrl.songImg"></el-image>
      <!-- 歌曲信息：歌名、歌手、对这首歌收藏 -->
      <div class="song_about">
        <div class="song_info">
          <p>晴天</p>
          <span>&nbsp;-&nbsp;周杰伦</span>
        </div>
        <div class="song_action">
          <el-icon color="#333" :size="20"><star /></el-icon>
          <el-icon color="#333" :size="20"><download /></el-icon>
          <el-icon color="#333" :size="20"><more /></el-icon>
        </div>
      </div>
      <!-- 歌曲控制：进度条的拖动、点击；歌曲的播放、暂停 -->
      <div class="song_control">
        <!-- 歌曲进度条 -->
        <div class="song_duration">
          <span>00:00</span>
          <my-progress :precentage="precentAge"></my-progress>
          <span>4:11</span>
        </div>
        <!-- 歌曲播放、暂停等 -->
        <div class="song_control_btn">
          <i class="iconfont icon-liebiaoxunhuan"></i>
          <el-icon color="#666"><caret-left /></el-icon>
          <el-icon class="btn_pause" v-if="playStatus" color="#666"
            ><video-pause
          /></el-icon>
          <el-icon class="btn_play" v-else color="#666"><video-play /></el-icon>
          <el-icon color="#666"><caret-right /></el-icon>
          <span>词</span>
        </div>
      </div>
      <!-- 歌曲的待播放列表和声音控制 -->
      <div class="song_expand">
        <i class="iconfont icon-shengyin"></i>
        <el-icon color="#666"><expand /></el-icon>
      </div>
    </div>
    <!-- E-底部导航 -->
  </div>
</template>

<script>
import {
  ArrowLeft,
  Search,
  Microphone,
  Bell,
  Close,
  Setting,
  FullScreen,
  Star,
  Download,
  More,
  CaretLeft,
  CaretRight,
  Expand,
  VideoPlay,
  VideoPause,
} from "@element-plus/icons";
import myProgress from "../components/my-progress.vue";
import server from "../utils/http.js";

export default {
  components: {
    myProgress,
    ArrowLeft,
    Search,
    Microphone,
    Bell,
    Close,
    Setting,
    FullScreen,
    Star,
    Download,
    More,
    CaretLeft,
    CaretRight,
    Expand,
    VideoPlay,
    VideoPause,
  },
  data() {
    return {
      imgUrl: {
        user: require("../assets/images/topNav/user.png"),
        back: require("../assets/images/topNav/back.png"),
        songImg: require("../assets/images/bottomNav/songImg.jpg"),
        play: require("../assets/images/bottomNav/play.png"),
        stop: require("../assets/images/bottomNav/stop.png"),
      },
      username: "登录",
      isLogin: false,
      song: "",
      playStatus: false,
      precentAge: 50,
      phone: "15976523669",
      password: "158735677",
    };
  },
  mounted() {
    setTimeout(() => {
      this.precentAge = 80;
    }, 2000);
  },
  methods: {
    login() {
      console.log("点击登录");
      let that = this;
      let url = "/login/cellphone";
      var params = {};
      params.phone = that.phone;
      params.password = that.password;
      server
        .post(url, params)
        .then((res) => {
          console.log(res);
          if (res.status != 200) {
            that.$toast(res.statusText);
            return;
          }
          let data = res.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("cookie", data.cookie);
          that.imgUrl.user = data.profile.avatarUrl;
          that.username = data.profile.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.home_wrapper {
  width: 70vw;
  min-width: 7.87rem;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 50vh;
  transform: translateY(-50%);
}

/* 顶部导航 */
.home_top_wrapper {
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.1rem 0.3rem;
  background-color: #cc66ff;
}
/* 登录容器 */
.login_wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.login_wrapper > p {
  font-size: 0.18rem;
  margin-left: 0.1rem;
  color: #e6e6e6;
}
.login_wrapper > p:hover {
  color: #fff;
}
/* 头像 */
.login_wrapper .el-image {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
}
.login_wrapper .el-image__inner {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
}
/* 搜索容器 */
.search_wrapper {
  display: flex;
  align-items: center;
}
.search_wrapper > .el-icon {
  cursor: pointer;
}
.search_wrapper > .el-icon:hover {
  color: #fff;
}
.search_wrapper > .el-input {
  margin: 0 0.1rem;
  width: 4rem;
}
.search_wrapper .el-input__inner {
  height: 0.3rem;
  min-height: 30px;
  line-height: 0.3rem;
}
.search_wrapper .el-input__inner:focus {
  border-color: #cc66ff;
}
/* 顶部右边 */
.close_wrapper {
  display: flex;
  align-items: center;
}
.close_wrapper > .el-icon {
  cursor: pointer;
  margin-left: 0.2rem;
}
.close_wrapper > .el-icon:hover {
  color: #fff;
}

/* 主体部分 */
.home_main_wrapper {
  flex: 1;
  display: flex;
  overflow: auto;
}
/* 左侧菜单 */
.home_main_wrapper > .menu_wrapper {
  width: 2rem;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 点击菜单栏字体变大 */
.el-menu > .el-menu-item.is-active:not(:last-child) {
  font-weight: bold;
  font-size: 0.16rem;
}
.el-menu-item:hover,
.el-sub-menu__title:hover {
  background-color: #f5f5f5;
}

/* 底部导航 */
.home_bottom_wrapper {
  width: 100%;
  height: 12%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0.1rem;
  background-color: #fff;
}
.home_bottom_wrapper > .el-image {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 0.06rem;
}
.home_bottom_wrapper .el-icon:hover {
  color: #999;
  cursor: pointer;
}

/* 歌曲相关-名字-歌手-收藏等 */
.home_bottom_wrapper .song_about {
  height: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}
.song_info {
  display: flex;
  font-size: 0.16rem;
}
.song_info > span {
  color: #999;
}
.song_action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 歌曲控制 */
.song_control {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 进度条 */
.song_control > .song_duration {
  margin-top: 0.1rem;
  width: 50%;
  display: flex;
  align-items: center;
}
.song_duration > span {
  font-size: 0.12rem;
  color: #999;
}
.song_duration > .tpbc {
  margin: 0 0.1rem;
}

/* 播放、暂停、上/下一首 */
.song_control_btn {
  display: flex;
  align-items: center;
  margin-top: 0.1rem;
}
.song_control_btn > i {
  font-size: 0.2rem;
  color: #666;
}

.song_control_btn > i:hover {
  color: #999;
  cursor: pointer;
}

.song_control_btn > .el-icon {
  font-size: 0.3rem;
  margin: 0 0.15rem;
}
/* 播放、暂停 */
.song_control_btn > .btn_play,
.song_control_btn > .btn_pause {
  font-size: 0.35rem;
  margin: 0;
}

.song_control_btn > span {
  color: #666;
  font-size: 0.16rem;
  line-height: 0.3rem;
}

.song_control_btn > span:hover {
  color: #999;
  cursor: pointer;
}

/* 歌曲扩展、播放列表等 */
.song_expand {
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
}
.song_expand > i {
  font-size: 0.2rem;
}
.song_expand > .el-icon {
  font-size: 0.2rem;
  margin-left: 0.2rem;
}
</style>