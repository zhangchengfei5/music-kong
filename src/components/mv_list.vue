<template>
  <div class="list_wrapper">
    <div class="list_header">
      <span
        >{{ title }}&nbsp;<el-icon :size="16"><arrow-right /></el-icon
      ></span>
      <div v-if="title == '最新MV'" class="tag_box">
        <em
          v-for="(item, index) in firstMvTag"
          :key="index"
          :class="item == tag ? 'active_tag' : ''"
          @click="clickTag(item)"
          >{{ item }}</em
        >
      </div>
    </div>
    <div class="list_box">
      <div class="content_box" v-for="item in mvData" :key="item.id">
        <div class="img_box" @click="toMvDetail(item.id)">
          <img :src="item.cover" alt="" />
          <div class="playCount">
            <el-icon :size="16"><video-play /></el-icon>&nbsp;{{
              playCount(item.playCount)
            }}
          </div>
          <div class="bg_top"></div>
        </div>
        <p @click="toMvDetail(item.id)">{{ item.name }}</p>
        <span v-if="title != '网易出品MV'">{{ item.artistName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/utils/util.js";

export default {
  props: ["mvData", "title"],
  computed: {
    playCount: function () {
      return function (val) {
        let count = util.playCount(val);
        return count;
      };
    },
  },
  data() {
    return {
      firstMvTag: ["内地", "港台", "欧美", "日本", "韩国"],
      tag: "内地",
    };
  },
  methods: {
    clickTag(area) {
      if (this.tag == area) return;
      this.tag = area;
      console.log(this.tag);
      this.$emit("switchFirstMv", area);
    },
    // 跳转到MV详情页
    toMvDetail(id) {
      this.$router.push("/mv_detail?mvid=" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
$theme: #cc66ff;
.list_wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 0.3rem;

  .list_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.1rem;

    > span {
      font-size: 0.18rem;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .tag_box {
      display: flex;
      align-items: center;

      em {
        font-style: normal;
        font-size: 0.12rem;
        padding: 0.05rem 0.1rem;
        color: #666;
        margin-right: 0.1rem;

        &:hover {
          cursor: pointer;
          color: #000;
        }
      }
    }
  }

  .list_box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 0.2rem;
    column-gap: 0.15rem;

    .content_box {
      display: flex;
      flex-direction: column;

      .img_box {
        position: relative;
        z-index: 49;

        &:hover {
          cursor: pointer;
        }

        img {
          width: 100%;
          height: 1.4rem;
          object-fit: cover;
          border-radius: 0.06rem;
        }
        .playCount {
          position: absolute;
          z-index: 50;
          top: 0.02rem;
          right: 0.05rem;
          font-size: 0.12rem;
          color: #fff;
          display: flex;
          align-items: center;
        }

        .bg_top {
          height: 0.18rem;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 49;
          top: 0;
          border-top-left-radius: 0.06rem;
          border-top-right-radius: 0.06rem;
        }
      }

      > p {
        font-size: 0.14rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -moz-box;
        -moz-line-clamp: 2;
        -moz-box-orient: vertical;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
        color: #666;
        margin-bottom: 0.03rem;

        &:hover {
          cursor: pointer;
          color: #000;
        }
      }

      > span {
        color: #666;
        font-size: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          cursor: pointer;
          color: #000;
        }
      }
    }
  }
}

.active_tag {
  background-color: #fff0ff;
  color: $theme !important;
  border-radius: 0.3rem;
}
</style>