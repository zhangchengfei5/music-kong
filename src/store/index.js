import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";

const state = {
  searchHotList: [],
  searchHistory: [],
  searchResult: {},
};

export default createStore({
  state,
  mutations,
  actions,
  modules: {},
});
