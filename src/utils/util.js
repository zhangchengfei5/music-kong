// 计算播放量
function playCount(count) {
  let play;
  let playNum;
  if (count > 10000) {
    play = Math.round(count / 10000);
    playNum = play + "万";
  } else {
    play = count;
    playNum = play + "";
  }
  return playNum;
}

// 格式化时间
function formatterTime(time) {
  let year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  let day = new Date(time).getDate();
  let date = year + "-" + month + "-" + day;
  return date;
}

module.exports = {
  formatterTime,
  playCount,
};
