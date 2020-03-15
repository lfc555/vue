记录遇到的一些问题
=========================================
#### 问题1：webpack打包报错Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead  
**问题分析**： extract-text-webpack-plugin 与高版本 webpack 不兼容  
**解决方法**：升级 extract-text-webpack-plugin 或降级webpack版本  
**参考地址**：[参考](https://blog.csdn.net/qq_35585701/article/details/81041584)
*************************************************
#### 问题2：webpack-babel解决babel-loader@8.0.5 requires a peer of @babel/core@^7.0.0 版本兼容的问题
**解决方法**：  
+ 方法1：降级 ***babel-loader*** 版本  
+ 方法2：安装 ***@babel/core***  

**参考地址**：
 * [参考1：webpack-babel解决babel-loader@8.0.5 requires a peer of @babel/core@^7.0.0 版本兼容的问题](https://blog.csdn.net/qq_34979346/article/details/99983375)
 * [参考2：关于`babel-loader`和`babel-core`版本兼容性问题](https://www.cnblogs.com/codebook/p/10285475.html)

*************************************************
#### 问题3：Plugin/Preset files are not allowed to export objects,only functions.webpack报错/babel报错的解决办法
**解决方法**：  
+ 方法1：降级 ***babel-loader*** 版本  
+ 方法2：升级 ***babel***  
  
**参考地址**：  
 [参考1：Plugin/Preset files are not allowed to export objects,only functions.webpack报错/babel报错的解决办法](https://www.jianshu.com/p/7d26443001b9)

*************************************************
#### 问题4：File was processed with these loaders: * ./node_modules/vue-loader/lib/index.js
**解决方法**：  
方法1：vue-loader 15与之前的版本语法需要更新

**参考地址**：  
 + [参考1：Vue加载单文件使用vue-loader报错](https://blog.csdn.net/zyx527734377/article/details/98640617)
 + [参考2：官网：从旧版本迁移](https://vue-loader.vuejs.org/migrating.html#notable-breaking-changes)
*************************************************

#### 问题5：Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimiza
**问题分析**： webpack4.0+  已经废弃了内置的压缩功能  
**解决方法**：  
+ 方法1：单独安装 uglifyjsPlugin 插件
+ 方法2：按webpack 官网的引导使用 optimization  

**参考地址**：  
 + [参考1](https://www.cnblogs.com/planetwithpig/p/11904870.html)
 + [参考2](https://blog.csdn.net/cominglately/article/details/89525175)

*************************************************
## 记录其他网友的问题集
+ [webpack踩坑之路](https://www.jianshu.com/p/ceaf950a027b)
+ [html img src 图片不显示](https://blog.csdn.net/zc135565/article/details/104166781)
