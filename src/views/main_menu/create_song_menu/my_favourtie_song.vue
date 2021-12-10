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
            标签 :
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
// import util from "../../../utils/util.js";
import util from "@/utils/util.js";
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
      description: "",
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
      switchWrap: false,
    };
  },
  created() {
    this.getSlItem();
  },
  mounted() {
    this.isLineFeed();
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
  },
  watch: {
    // 由于不同的歌单不同的数据，所以当路由变换时执行以下方法
    $route: function () {
      this.showDescribe = false;
      this.switchWrap = false;
      if (this.$route.query.slItem == null) {
        console.log("传递过来的参数为空");
      } else {
        this.getSlItem();
        this.isLineFeed();
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
        console.log(this.description);
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
            console.log(this.switchWrap);
            cpds.style.display = "none";
          } else {
            this.switchWrap = false;
            console.log(this.switchWrap);
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
  margin-top: 0.05rem;
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