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
          <el-image
            :src="slItem.creator != null ? slItem.creator.avatarUrl : ''"
          ></el-image>
          <p class="creator_name">
            {{ slItem.creator != null ? slItem.creator.nickname : "" }}
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
          <p v-if="slItem.tags != [] ? slItem.tags.length > 0 : ''">
            标签 :
            <span v-for="(tagItem, tagIndex) in slItem.tags" :key="tagIndex"
              >{{ tagItem }}
              {{
                (tagIndex == slItem.tags) != []
                  ? slItem.tags.length - 1
                    ? ""
                    : "/"
                  : ""
              }}</span
            >
          </p>
          <p>歌曲 : 100 播放：10万</p>
          <p>
            简介 : <span>你好，欢迎收听本歌单</span>
            <el-icon @click="showDescribe = !showDescribe"
              ><caret-top v-if="showDescribe" /><caret-bottom v-else
            /></el-icon>
          </p>
        </div>
      </div>
    </div>
    <!-- E-歌单详情顶部外层容器 -->

    <!-- S-歌单列表容器 -->
    <div class="mfsl_wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="1">
          <el-table :data="songList" stripe highlight-current-row>
            <el-table-column
              type="index"
              :index="getIndexNum"
              width="40"
            ></el-table-column>
            <el-table-column prop="action" label="操作" width="70"
              ><i class="iconfont icon-like"></i
              ><el-icon class="download_icon"><download /></el-icon
            ></el-table-column>
            <el-table-column prop="name" label="标题"> </el-table-column>
            <el-table-column prop="singer" label="歌手"> </el-table-column>
            <el-table-column prop="album" label="专辑"> </el-table-column>
            <el-table-column prop="time" label="时间"> </el-table-column>
          </el-table>
        </el-tab-pane>
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
// import server from "../../../utils/http.js";

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
  data() {
    return {
      subscribed: false,
      showDescribe: false,
      activeName: "1",
      // 歌单列表对象
      slItem: "",
      creator: "",
      tags: [],
      subscribers: [],
      songList: [
        {
          action: 1,
          name: "你好",
          singer: "nihao",
          album: "你好专辑",
          time: "3:27",
        },
        {
          action: 1,
          name: "你好",
          singer: "nihao",
          album: "你好专辑",
          time: "3:27",
        },
        {
          action: 1,
          name: "你好",
          singer: "nihao",
          album: "你好专辑",
          time: "3:27",
        },
      ],
      songListId: "",
    };
  },
  mounted() {
    // 获取到传递过来的歌单对象
    let listItem = decodeURIComponent(this.$route.query.slItem);
    this.slItem = JSON.parse(listItem);
    if (Object.keys(this.slItem).length > 0) {
      this.creator = this.slItem.creator;
      this.tags = this.slItem.tags;
      this.subscribers = this.slItem.subscribers;
    }
  },
  methods: {
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
    // 格式化时间
    formatterTime(time) {
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1;
      let day = new Date(time).getDate();
      let date = year + "-" + month + "-" + day;
      return date;
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
  margin-top: 0.05rem;
  font-size: 0.14rem;
}
/* 按钮样式 */
.mfst_action > .btn {
  display: flex;
  align-items: center;
  border: 1px solid #606266;
  border-radius: 0.5rem;
  padding: 0.05rem 0.2rem;
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
}
.mfst_describe > p {
  position: relative;
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
.mfst_describe > p:last-child > span {
  user-select: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 简介展示和缩放的icon */
.mfst_describe > p > .el-icon {
  position: absolute;
  right: 0;
}
.mfst_describe > p > .el-icon:hover {
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

/* 改变选中行的颜色以及鼠标移入行的颜色 */
.el-tab-pane .el-table {
  --el-table-current-row-background-color: #e5e5e5;
  --el-table-row-hover-background-color: #f0f1f2;
}
.mfsl_wrapper >>> .el-table td.el-table__cell div {
  display: flex;
  align-items: center;
}
/* 喜欢和下载两个icon */
.mfsl_wrapper >>> i.iconfont.icon-like {
  font-size: 0.22rem;
  color: #b3b3b3;
}
.mfsl_wrapper >>> i.iconfont.icon-like:hover {
  cursor: pointer;
  color: #606266;
}
.mfsl_wrapper >>> i.el-icon.download_icon {
  --font-size: 0.22rem;
  margin-left: 0.1rem;
  color: #b3b3b3;
}
.mfsl_wrapper >>> i.el-icon.download_icon:hover {
  cursor: pointer;
  color: #606266;
}
</style>