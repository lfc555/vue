//该文件用作 生产环境的配置文件
//注意该配置文件 同时引用了 基本配置 webpack.config.js
var webpack = require("webpack");

var HtmlwebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
var merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

var webpackBaseConfig = require("./webpack.config.js"); //引用 基本配置
//清空基本配置的插件列表
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: "./dist/",
    //将入口文件重命名为带有20位hash值的唯一文件
    filename: "[name].[hash].js",
    
  },
  stats:{children:false},
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      //提取css 并重命名为带有20位的hash值的唯一文件
      filename: "[name].[hash].css",
      allChunks: true
    }),
    //定义当前node环境为生产环境
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    //提取模板，并保存入口 html文件
    new HtmlwebpackPlugin({
      filename: "../index_prod.html",
      template: "./index.ejs",
      inject: false
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, //开启缓存
        parallel: true, //多进程
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ]
  }
});
