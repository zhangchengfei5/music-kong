import server from "../utils/http.js";

export default {
  // 获取热搜列表(详细)
  getSearchHot(context) {
    let params = {};
    let url = "/search/hot/detail";
    server.get(url, params).then((res) => {
      console.log("获取热搜列表", res);
      if (res.code != 200) {
        this.$message.error("获取热搜列表失败！");
      }
      console.log("state里的context是：", context);
      context.commit("updateSearchHotList", res.data);
    });
  },
};
