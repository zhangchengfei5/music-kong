<template>
  <div class="my_favourite_song_wrapper">
    <!-- S-歌单详情顶部外层容器 -->
    <div class="mfst_wrapper">
      <!-- 歌单封面图片 -->
      <el-image src="../../../assets/images/bg.jpg"></el-image>
      <!-- 歌单顶部右边容器 -->
      <div class="mfst_right_wrapper">
        <!-- 歌单名字/类型 -->
        <div class="mfst_name">
          <p class="name_type">歌单</p>
          <p class="song_list_name">我喜欢的音乐</p>
        </div>
        <!-- 歌单创建者/创建时间 -->
        <div class="msft_creator">
          <el-image src="../../../assets/images/bg.jpg"></el-image>
          <p class="creator_name">你好包包</p>
          <p class="creator_time">2018-01-09创建</p>
        </div>
        <!-- 歌单操作 -->
        <div class="mfst_action">
          <el-button
            style="background-color: #cc66ff; border-color: #cc66ff"
            round
            ><el-icon><caret-right /></el-icon> 播放全部</el-button
          >
          <el-button round
            ><el-icon v-if="subscribed"><folder-checked /></el-icon
            ><el-icon v-else><folder-add /></el-icon> 收藏(0)</el-button
          >
          <el-button round
            ><el-icon><share /></el-icon> 分享</el-button
          >
          <el-button round
            ><el-icon><download /></el-icon> 下载全部</el-button
          >
        </div>
        <!-- 歌单简介 -->
        <div class="mfst_describe">
          <p>标签 : <span>华语/流行</span></p>
          <p>歌曲：100 播放：10万</p>
          <p>
            简介：<span>你好，欢迎收听本歌单</span
            ><el-icon><caret-bottom /></el-icon>
          </p>
        </div>
      </div>
    </div>
    <!-- E-歌单详情顶部外层容器 -->
  </div>
</template>

<script>
import {
  CaretRight,
  FolderAdd,
  FolderChecked,
  Share,
  CaretBottom,
  Download,
} from "@element-plus/icons";

export default {
  components: {
    CaretRight,
    FolderAdd,
    FolderChecked,
    Share,
    CaretBottom,
    Download,
  },
  data() {
    return {
      subscribed: false,
    };
  },
};
</script>

<style>
/* 歌单详情最外层容器 */
.my_favourite_song_wrapper {
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
/* 顶部容器 */
.mfst_wrapper {
  display: flex;
}
/* 歌单封面 */
.mfst_wrapper .el-image {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 0.04rem;
}
/* .mfst_wrapper .mfst_right_wrapper{
  display: flex;
  flex-direction: column;
} */

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
}
/* 歌单名字 */
.mfst_name .song_list_name {
  font-size: 0.22rem;
  color: #000;
}

/* 歌单创建信息容器 */
.mfst_right_wrapper .msft_creator {
  display: flex;
  align-items: center;
}
/* 创建者头像 */
.msft_creator .el-image {
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 50%;
}
/* 创建者名字 */
.msft_creator .creator_name {
  color: #cc66ff;
  font-size: 0.12rem;
}
.msft_creator .creator_name:hover {
  color: #bb33ff;
  cursor: pointer;
}
/* 创建时间 */
.msft_creator .creator_time {
  color: #999;
  font-size: 0.12rem;
}

/* 歌单操作 */
.msft_creator .mfst_action {
  display: flex;
  align-items: center;
}
/* 播放全部按钮 */
.mfst_action .el-button:not(:first-child):hover {
  background-color: rgba(0, 0, 0, 0.03);
  color: #606266;
  border-color: #dcdfe6;
}
</style>