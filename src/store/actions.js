import server from "../utils/http.js";
import { ElMessage } from "element-plus";

export default {
  // 获取热搜列表(详细)
  getSearchHot(context) {
    if (context.state.searchHotList.length > 0) return;
    let params = {};
    let url = "/search/hot/detail";
    server.get(url, params).then((res) => {
      console.log("获取热搜列表", res);
      if (res.code != 200) {
        ElMessage.error({
          message: "获取热搜列表失败！",
        });
      }
      context.commit("updateSearchHotList", res.data);
    });
  },
  // 搜索结果
  getSearchResult(context, inp, type = 1) {
    let params = {};
    let url = "/cloudsearch?keywords=" + inp + "&type=" + type;
    server.get(url, params).then((res) => {
      console.log("获取搜索结果", res);
      if (res.code != 200) {
        ElMessage.error({
          message: "获取搜索结果失败！",
        });
      }
      if (type == 1) {
        context.commit("updateSearchResult", res.result);
      }
      context.commit("updateHistory", inp);
    });
  },
  // 获取音乐Url
  getMusicUrl(context, music, index) {
    let params = {};
    console.log("传过来的音乐对象", context);
    let url = "/song/url?id=" + music.id;
    server.get(url, params).then((res) => {
      console.log("获取音乐Url", res);
      if (res.code != 200) {
        ElMessage.error({
          message: "获取音乐Url失败！",
        });
      }
      let songData = {};
      songData.id = music.id;
      songData.indexId = index;
      songData.name = music.name;
      songData.picUrl = music.al.picUrl;
      songData.singer = music.ar.map((i) => {
        return i.name;
      });
      songData.time = music.dt;
      songData.list = context.state.searchResult.songs;
      songData.url = res.data[0].url;
      context.commit("updateMusicUrl", songData);
    });
  },
};
