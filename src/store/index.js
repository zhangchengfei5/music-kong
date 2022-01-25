import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";

const state = {
  // 热搜列表
  searchHotList: [],
  // 搜索历史
  searchHistory: [],
  // 搜索结果
  searchResult: {},
  // 音乐url
  musicUrl: {},
  // 判断是否有音乐了
  urlReady: false,
};

export default createStore({
  state,
  mutations,
  actions,
  modules: {},
});
