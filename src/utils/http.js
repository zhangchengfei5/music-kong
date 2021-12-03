const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = function (url, params) {
  return instance({
    url: url,
    method: "get",
    params: params,
  });
};

const post = function (url, params) {
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
