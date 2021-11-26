<template>
  <div class="home_wrapper">
    <!-- S-顶部导航 -->
    <div class="home_top_wrapper">
      <!-- S-登录 -->
      <div class="login_wrapper" @click="login">
        <el-image :src="imgUrl.user"></el-image>
        <p>登录</p>
      </div>
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
    <div class="home_main_wrapper"></div>
    <!-- E-主体部分 -->

    <!-- S-底部导航 -->
    <div class="home_bottom_wrapper">
      <el-image :src="imgUrl.songImg"></el-image>
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
} from "@element-plus/icons";

export default {
  components: {
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
  },
  data() {
    return {
      imgUrl: {
        user: require("../assets/images/topNav/user.png"),
        back: require("../assets/images/topNav/back.png"),
        songImg: require("../assets/images/bottomNav/songImg.jpg"),
      },
      song: "",
    };
  },
  methods: {
    login() {
      console.log("点击登录");
    },
  },
};
</script>

<style>
.home_wrapper {
  width: 70vw;
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
.home_main_wrapper {
  flex: 1;
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
.home_bottom_wrapper .song_about {
  height: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* font-size: 0.16rem; */
  margin-left: 0.1rem;
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
.song_action > .el-icon:hover {
  color: #999;
  cursor: pointer;
}
</style>