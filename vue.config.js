const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: "./", //基本路径
  outputDir: "dist", //构建时的输出目录
  assetsDir: "static", //放置静态资源的目录
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件

  // 代理配
  // devServer: {
  //     open: true, //配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
  //     host: "0.0.0.0",
  //     port: 8088, // 端口号
  //     https: false, // https:{type:Boolean}
  //     // 配置多个代理
  //     proxy: {
  //         "/api": {//配置代理以“/api”
  //             target: "http://platform.sundan.com/sundan", //目标主机
  //             ws: true, //代理的WebSockets
  //             changeOrigin: true, //需要虚拟主机站点
  //             pathRewrite: {
  //                 "^/api": ""
  //             }
  //         }
  //     }
  // },

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"));
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      config["performance"] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000,
      };
    }
  },
  // css: {
  //     loaderOptions: {
  //         css: {},
  //         postcss: {
  //             plugins: [
  //                 require('postcss-px2rem')({
  //                     remUnit: 37.5 //设计图给的375的图就写37.5，也就是1rem=37.5px
  //                 })
  //             ]
  //         }
  //     }
  // },
};
