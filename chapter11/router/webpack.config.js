//该文件用作开发环境的基本配置
var path = require("path");
//导入插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var HtmlWebpackPlugin=require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

var config = {
  //入口:webpack 从这里开始寻找依赖并且编译
  entry: {
    main: "./main.js",
  },
  //出口:编译后输出的文件存储位置和文件名
  // 存储： demo/dist/main.js
  output: {
    path: path.join(__dirname, "./dist"), //打包后文件输出目录
    publicPath: "/dist", //资源引用的目录地址
    filename: "main.js", //输出的文件名称,
    chunkFilename: "[name].[hash].chunk.js",//
  },
  module: {
    rules: [
      //指定一系列插件
      {
        test: /\.vue$/, //处理vue
        loader: "vue-loader",
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: "css-loader",
              // publicPath:'../../',
              fallback: "vue-style-loader",
            }),
          },
        },
        //use: ["style-loader", "css-loader"]//第一种
        // use: ExtractTextPlugin.extract({//第二种 提取css
        //   use: "css-loader",
        //   fallback: "style-loader"
        // })
      },
      {
        test: /\.js$/, //处理js
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, //处理css
        use: ExtractTextPlugin.extract({
          use: "css-loader",
          //publicPath:'../../',
          fallback: "style-loader",
        }),
      },
      // {
      //   test: /\.html$/,
      //   loader: "html-withimg-loader"
      // },
      {
        //处理图片
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        //limit=1024 如果文件小于1024b，则以base64加载，不会生成文件
        loader: "url-loader?limit=1024",
      },
    ],
  },
  plugins: [
    //重命名提取后的css文件
    new ExtractTextPlugin(
      {
        filename: "[name].css",
        allChunks: true
      },
    ),
    new VueLoaderPlugin(),
    // new HtmlWebpackPlugin({
    //   //设置打包完成后的文件名
    //   filename: "index.html",
    //   template: "./index.html"
    // })
  ],
};
module.exports = config;
