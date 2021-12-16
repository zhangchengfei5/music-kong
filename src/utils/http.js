const axios = require("axios");

const instance = axios.create({
  baseURL: "https://zcf-netease-cloud-music-api.vercel.app",
  timeout: 60 * 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    let cookie = sessionStorage.getItem("cookie");
    if (config.headers["Content-Type"] == "multipart/form-data") {
      return config;
    }
    if (config.method === "post") {
      if (cookie != null) {
        config.data.cookie = cookie;
      }
      config.data.readIP = "192.168.100.127";
      config.data = JSON.stringify(config.data);
    }
    if (config.method === "get") {
      if (cookie != null) {
        config.params.cookie = encodeURIComponent(cookie);
      }
      config.params.readIP = "192.168.100.127";
      config.params = JSON.stringify(config.params);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = function (url, params = {}) {
  return instance({
    url: url,
    method: "get",
    params: params,
  });
};

const post = function (url, params = {}) {
  return instance({
    url: url,
    method: "post",
    data: params,
  });
};

export default {
  get,
  post,
};
