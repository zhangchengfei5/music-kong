<template>
  <div class="home_wrapper">
    <!-- 登录Dialog -->
    <el-dialog v-model="isLogin" center>
      <span class="title">登录</span>
      <!-- 表单 -->
      <el-form :model="form" ref="form" :rules="rules" label-width="0.75rem">
        <!-- 手机号 -->
        <el-form-item label="手机号 :" prop="phone">
          <el-input
            v-model="form.phone"
            type="tel"
            placeholder="请输入手机号"
            @keyup.enter="login"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码 :" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="login"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 登录按钮 -->
      <el-button type="primary" plain @click="login">登录</el-button>
    </el-dialog>

    <!-- S-顶部导航 -->
    <div class="home_top_wrapper">
      <!-- S-登录 -->
      <div class="login_wrapper" @click="isShowLogin">
        <el-image :src="imgUrl.user"></el-image>
        <p>{{ username }}</p>
      </div>
      <!-- E-登录 -->

      <!-- S-搜索 -->
      <div class="search_wrapper">
        <el-icon color="#e6e6e6" :size="25" @click="goBack"
          ><arrow-left
        /></el-icon>
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
          default-active="0"
          :default-openeds="opends"
          text-color="#666"
          active-text-color="#000"
          @select="onClickMenu"
        >
          <el-menu-item index="0">发现音乐</el-menu-item>
          <el-menu-item index="1">播客</el-menu-item>
          <el-menu-item index="2">视频</el-menu-item>
          <el-menu-item index="3">朋友</el-menu-item>
          <el-menu-item index="4">直播</el-menu-item>
          <el-menu-item index="5">私人FM</el-menu-item>
          <el-menu-item-group title="我的音乐">
            <el-menu-item index="6">本地与下载</el-menu-item>
            <el-menu-item index="7">最近播放</el-menu-item>
            <el-menu-item index="8">我的音乐云盘</el-menu-item>
            <el-menu-item index="9">我的播客</el-menu-item>
            <el-menu-item index="10">我的收藏</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="11">
            <template #title>
              <span>创建的歌单</span>
            </template>
            <el-menu-item
              v-for="(slItem, slIndex) in songList"
              :key="slItem.id"
              :index="'11-' + slIndex"
              @click="selectMenu(slItem)"
              >{{ slItem.name }}</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </div>
      <router-view @playingSong="playSong"></router-view>
    </div>
    <!-- E-主体部分 -->

    <!-- S-底部导航 -->
    <div class="home_bottom_wrapper">
      <!-- 歌曲封面 -->
      <el-image :src="imgUrl.songImg"></el-image>
      <!-- 歌曲信息：歌名、歌手、对这首歌收藏 -->
      <div class="song_about">
        <div class="song_info">
          <p>{{ songName }}</p>
          <span>&nbsp;-&nbsp;{{ singer }}</span>
        </div>
        <div class="song_action">
          <el-icon color="#333" :size="20"><star /></el-icon>
          <el-icon color="#333" :size="20" style="margin: 0 0.2rem"
            ><download
          /></el-icon>
          <el-icon color="#333" :size="20"><more /></el-icon>
        </div>
      </div>
      <!-- 歌曲控制：进度条的拖动、点击；歌曲的播放、暂停 -->
      <div class="song_control">
        <!-- 歌曲进度条 -->
        <div class="song_duration">
          <span>{{ currentDuration }}</span>
          <my-progress
            :precentage="precentAge"
            @dragPro="dragProgress"
          ></my-progress>
          <span>{{ songDuration }}</span>
        </div>
        <!-- 歌曲播放、暂停等 -->
        <div class="song_control_btn">
          <i class="iconfont icon-liebiaoxunhuan"></i>
          <el-icon color="#666" @click="switchMusic(1)"><caret-left /></el-icon>
          <el-icon
            class="btn_pause"
            v-if="playStatus"
            color="#666"
            @click="controlPlay"
            key="pause-icon"
            ><video-pause
          /></el-icon>
          <el-icon
            class="btn_play"
            v-else
            key="play-icon"
            color="#666"
            @click="controlPlay"
            ><video-play
          /></el-icon>
          <el-icon color="#666" @click="switchMusic(0)"
            ><caret-right
          /></el-icon>
          <span>词</span>
        </div>
        <!-- 播放音乐 -->
        <audio id="nowSong" autoplay hidden @timeupdate="tUpdate">
          <source :src="songUrl" type="audio/ogg" />
          <source :src="songUrl" type="audio/mpeg" />
          <source :src="songUrl" type="audio/mp4" />
          暂不支持在此浏览器播放音乐
        </audio>
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
import myProgress from "../components/my-progress.vue";
import server from "../utils/http.js";
import util from "@/utils/util.js";

export default {
  components: {
    myProgress,
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
      // 表单数据
      form: {
        // phone: "",
        // password: "",
        phone: "15976523669",
        password: "158735677",
      },
      // 表单验证规则
      rules: {
        // 手机验证
        phone: [
          { required: true, message: "手机号不能为空", trigger: "change" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
        // 密码不能为空
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
          },
        ],
      },
      username: "登录",
      isLogin: false,
      loginStatus: false,
      song: "",
      // 播放状态 true为播放中显示暂停按钮，false为暂停中显示播放按钮
      playStatus: false,
      // 歌曲播放进度条百分比
      precentAge: 0,
      songList: [],
      // 默认展开菜单
      opends: ["11"],
      songNowList: [],
      songIndexId: 0,
      songUrl: "",
      songName: "",
      singer: "",
      // 歌曲总时长 和 歌曲正确时长
      songDuration: "00:00",
      currentDuration: "00:00",
    };
  },
  mounted() {
    // 判断是否登录了，如果登陆了就直接赋值用户名和头像
    this.loginStatus = sessionStorage.getItem("loginStatus");
    if (this.loginStatus) {
      let user = JSON.parse(sessionStorage.getItem("profile"));
      // 判断user里是否有属性，如果有就是不为空可以赋值
      if (Object.keys(user).length > 0) {
        this.username = user.nickname;
        this.imgUrl.user = user.avatarUrl;
      }
    }
  },
  watch: {
    loginStatus: function (newVal, oldVal) {
      if (newVal) {
        this.getUserPlayList();
      } else {
        console.log("上一个值为：", oldVal);
      }
    },
  },
  methods: {
    // 登录
    login() {
      console.log("点击登录");
      let that = this;
      if (!that.form.phone) {
        this.$message({
          message: "手机号不能为空",
          type: "warning",
          duration: 1500,
        });
        console.log("手机号不能为空");
        return;
      } else {
        let r = new RegExp(/^1[34578][0-9]{9}$/);
        let a = r.test(that.form.phone);
        if (!a) {
          this.$message({
            message: "请输入正确的手机号码",
            type: "warning",
            duration: 1500,
          });
          return;
        }
      }
      if (!that.form.password) {
        this.$message({
          message: "密码不能为空",
          type: "warning",
          duration: 1500,
        });
        console.log("密码不能为空");
        return;
      }
      that.isLogin = false;
      let url = "/login/cellphone";
      var params = {};
      params.phone = that.form.phone;
      params.password = that.form.password;
      server
        .post(url, params)
        .then((res) => {
          if (res.code != 200) {
            that.$message({
              message: "登录失败，请稍后重试",
            });
            return;
          }
          // 判断是否登录了
          sessionStorage.setItem("loginStatus", true);
          sessionStorage.setItem("cookie", res.cookie);
          sessionStorage.setItem("profile", JSON.stringify(res.profile));
          sessionStorage.setItem("uid", res.account.id);
          that.imgUrl.user = res.profile.avatarUrl;
          that.username = res.profile.nickname;
          that.loginStatus = true;
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取用户歌单
    getUserPlayList() {
      if (!sessionStorage.getItem("loginStatus")) {
        this.$message({
          message: "请先登录,才能获取歌单",
        });
        return;
      }
      let that = this;
      // limit用于设置返回数量，不设置则默认为30
      let limit = 20;
      let uid = sessionStorage.getItem("uid");
      let url = "/user/playlist";
      let params = {};
      params.uid = uid;
      params.limit = limit;
      server
        .post(url, params)
        .then((res) => {
          console.log(res);
          if (res.code != 200) {
            console.log("获取用户歌单失败");
            return;
          }
          that.songList = res.playlist;
          console.log("用户歌单为：", res.playlist);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //  点击左边导航菜单跳转页面
    onClickMenu(index) {
      switch (Number(index)) {
        case 0:
          this.$router.push("/discover_music");
          break;
        case 1:
          this.$router.push("/boke");
          break;
        case 2:
          this.$router.push("/video");
          break;
        case 3:
          this.$router.push("/friends");
          break;
        case 4:
          this.$router.push("/living");
          break;
        case 5:
          this.$router.push("/private_fm");
          break;
        case 6:
          this.$router.push("/local_download");
          break;
        case 7:
          this.$router.push("/last_play");
          break;
        case 8:
          this.$router.push("/my_music_cloud");
          break;
        case 9:
          this.$router.push("/my_boke");
          break;
        case 10:
          this.$router.push("/my_collections");
          break;
        default:
          break;
      }
    },
    // 点击歌单菜单时
    selectMenu(item) {
      let songList = JSON.stringify(item);
      this.$router.push(
        "/my_favourtie_song?slItem=" + encodeURIComponent(songList)
      );
    },
    // 点击登录文字后
    isShowLogin() {
      let loginStatus = sessionStorage.getItem("loginStatus");
      if (loginStatus) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    // 获取音乐URL
    getSongUrl(id) {
      let that = this;
      let timestamp = Date.parse(new Date());
      let songAudio = document.getElementById("nowSong");
      let songUrl = "/song/url?t=" + timestamp;
      let songParams = {};
      songParams.id = id;
      server
        .post(songUrl, songParams)
        .then((res) => {
          console.log(res);
          if (res.code != 200) {
            console.log("获取歌曲链接失败");
            return;
          }
          // url看有没有，没有则提示后跳出
          if (res.data[0].url != null) {
            that.songUrl = res.data[0].url;
          } else {
            that.$message({
              message: "当前歌曲暂无音源",
              type: "error",
              duration: 3000,
            });
            that.playStatus = false;
            songAudio.pause();
            that.precentAge = 0;
            that.songDuration = "00:00";
            that.currentDuration = "00:00";
            return;
          }
          // src资源更改后重新加载
          songAudio.load();
          // 如果音乐在播放，把播放状态改为播放
          songAudio.onplay = () => {
            that.playStatus = true;
          };
          // 如果音乐暂停了，把播放状态改为暂停
          songAudio.onpause = () => {
            that.playStatus = false;
          };
          // 当音乐由于需要缓冲下一帧而停止时触发
          songAudio.onwaiting = () => {
            that.playStatus = false;
          };
          // 播放位置发生改变时触发
          songAudio.ontimeupdate = () => {
            that.playStatus = true;
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击歌曲播放音乐
    playSong(song) {
      let that = this;
      console.log("传送过来的数据：", song);
      that.songNowList = song.list;
      if (song.fee == 0) {
        this.$message({
          message: "当前歌曲暂无音源",
          type: "error",
          duration: 3000,
        });
        return;
      }
      console.log("songNowList:", that.songNowList);
      that.songIndexId = song.indexId;
      that.songName = song.name;
      that.formatterSinger(song.singer);
      that.imgUrl.songImg = song.picUrl;
      that.songDuration = util.formatterSongTime(song.time);
      console.log("这首音乐的时间为：", that.songDuration);
      that.getSongUrl(song.id);
    },

    // 播放下一首
    switchMusic(status) {
      if (this.songUrl == null || this.songUrl == "") {
        return;
      }
      // status为 0是下一首，其他是上一首
      if (status == 0) {
        this.songIndexId += 1;
      } else {
        this.songIndexId -= 1;
      }
      let nowSong = this.songNowList[this.songIndexId];
      if (nowSong.fee == 0) {
        if (status == 0) {
          this.songIndexId += 1;
        } else {
          this.songIndexId -= 1;
        }
        nowSong = this.songNowList[this.songIndexId];
        this.getSongUrl(nowSong.id);
      } else {
        this.getSongUrl(nowSong.id);
      }
      this.songName = nowSong.name;
      this.formatterSinger(nowSong.singer);
      this.imgUrl.songImg = nowSong.picUrl;
    },

    // 格式化歌手名字
    formatterSinger(singer) {
      this.singer = "";
      singer.forEach((item, index, arr) => {
        if (arr.length > 1) {
          if (index != arr.length - 1) {
            this.singer += item + "/";
          } else {
            this.singer += item;
          }
        } else {
          this.singer = item;
        }
      });
    },

    // 在音频/视频（audio/video）的播放位置发生改变时触发
    tUpdate() {
      let songAudio = document.getElementById("nowSong");
      this.currentDuration = util.formatterSongTime(
        songAudio.currentTime * 1000
      );
      this.precentAge = parseInt(
        (songAudio.currentTime / songAudio.duration) * 100
      );
    },

    // 控制播放音乐 (播放、暂停等)
    controlPlay() {
      let songAudio = document.getElementById("nowSong");
      // let src = songAudio.childNodes[0];
      // 如果资源不为空，则看音乐是否暂停，如果暂停则播放，如果播放则暂停
      if (this.songUrl != null && this.songUrl != "") {
        if (songAudio.paused) {
          songAudio.play();
        } else {
          songAudio.pause();
        }
      }
    },

    // 拖拽进度条后跳转播放
    dragProgress(ct) {
      if (this.songUrl == "" || this.songUrl == null) {
        return;
      }
      let songAudio = document.getElementById("nowSong");
      let allDuration = songAudio.duration;
      songAudio.currentTime = (ct * allDuration) / 100;
    },

    // 回到上一页
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.home_wrapper {
  width: 70vw;
  min-width: 12.64rem;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 50vh;
  transform: translateY(-50%);
}

/* 登录Dialog */
.el-dialog {
  font-size: 0.14rem;
  width: 40%;
}
.home_wrapper >>> .el-dialog--center .el-dialog__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 登录标题 */
.el-dialog .title {
  font-size: 0.3rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  background: linear-gradient(
    to bottom right,
    #8080ff,
    #bb33ff,
    #cc66ff,
    #8080ff,
    #dd99ff
  );
  background-clip: text;
  color: transparent;
}
.el-dialog .el-form {
  width: 100%;
}
/* 登录按钮 */
.el-dialog .el-button--primary.is-plain {
  background-color: #f6e5ff;
  border-color: #e5b3ff;
}
.el-button--primary.is-plain:focus,
.el-button--primary.is-plain:hover {
  color: #dd99ff;
}
.el-dialog .el-button--primary {
  --el-button-background-color: #cc66ff;
  --el-button-border-color: #cc66ff;
  --el-button-hover-color: #dd99ff;
  --el-button-active-font-color: #e6e6e6;
  --el-button-active-background-color: #bb33ff;
  --el-button-active-border-color: #bb33ff;
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
  z-index: 100;
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
  width: 0.5rem;
  height: 0.5rem;
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
.search_wrapper >>> .el-input__inner:focus {
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
  overflow-y: auto;
}
/* 左侧菜单 */
.home_main_wrapper > .menu_wrapper {
  width: 2rem;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
/* 隐藏滚动条 */
.menu_wrapper::-webkit-scrollbar {
  display: none;
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

.el-sub-menu .el-menu-item {
  padding: 0 0.2rem !important;
  min-width: unset;
  display: block;
  width: 1.99rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 底部导航 */
.home_bottom_wrapper {
  width: 100%;
  height: 12%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  background-color: #fff;
}
.home_bottom_wrapper > .el-image {
  width: 0.6rem;
  height: 0.6rem;
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
  align-items: flex-start;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}
.song_info {
  display: flex;
  font-size: 0.16rem;
  width: 2rem;
  white-space: nowrap;
}
.song_info > p {
  line-height: 0.21rem;
}
.song_info > span {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 0.21rem;
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
  width: 0.32rem;
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