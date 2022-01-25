export default {
  // 更新热搜列表
  updateSearchHotList(state, list) {
    state.searchHotList = list;
  },
  // 更新搜索历史
  updateHistory(state, inp) {
    let shr = state.searchHistory;
    let i = shr.findIndex((c) => {
      return c == inp;
    });
    if (i === -1) {
      shr.push(inp);
    } else {
      shr.splice(i, 1);
      shr.unshift(inp);
    }
    localStorage.setItem("searchHistory", JSON.stringify(shr));
    state.searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  },
  // 更新搜索结果
  updateSearchResult(state, result) {
    state.searchResult = result;
  },
  updateMusicUrl(state, songData) {
    state.musicUrl = songData;
    state.urlReady = !state.urlReady;
    console.log(state.musicUrl);
  },
};
