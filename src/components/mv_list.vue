<template>
  <div class="list_wrapper">
    <span
      >{{ title }}&nbsp;<el-icon :size="16"><arrow-right /></el-icon
    ></span>
    <div class="list_box">
      <div class="content_box" v-for="item in mvData" :key="item.id">
        <div class="img_box">
          <img :src="item.cover" alt="" />
          <div class="playCount">
            <el-icon :size="16"><video-play /></el-icon>&nbsp;{{
              playCount(item.playCount)
            }}
          </div>
          <div class="bg_top"></div>
        </div>
        <p>{{ item.name }}</p>
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
};
</script>

<style lang="scss" scoped>
.list_wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 0.3rem;

  > span {
    font-size: 0.18rem;
    cursor: pointer;
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
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
</style>