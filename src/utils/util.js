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

function formatterSongTime(time) {
  let minutes = new Date(time).getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = new Date(time).getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let songTime = minutes + ":" + seconds;
  return songTime;
}

function wholeTime(time) {
  let year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  let day = new Date(time).getDate();
  let hour = new Date(time).getHours();
  let h = 0;
  hour < 9 ? (h = "0" + hour) : (h = hour);
  let m = 0;
  let min = new Date(time).getMinutes();
  min < 9 ? (m = "0" + min) : (m = min);
  let t = year + "-" + month + "-" + day + "\n" + h + ":" + m;
  return t;
}

module.exports = {
  formatterTime,
  playCount,
  formatterSongTime,
  wholeTime,
};
