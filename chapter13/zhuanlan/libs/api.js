/*知乎专栏api
参考：https://github.com/TonnyL/Zhihu_Zhuanlan_APIs/wiki
1 随机专栏列表api：   https://zhuanlan.zhihu.com/api/recommendations/columns?limit=8&offset=1&seed=7
2 某一专栏文章列表api:   https://www.zhihu.com/api/v4/columns/abcwj/items?limit=10&offset=80
3 文章详细列表api（从2中获取即可）：https://zhuanlan.zhihu.com/p/159294914  
4   文章评论列表：https://www.zhihu.com/api/v4/articles/259494288/root_comments?order=normal&limit=20&offset=0&status=open
*/
const host = "https://www.zhihu.com/";
const zhuanlanHost = "https://zhuanlan.zhihu.com/";
let api = {
  //eg：zhuanlanList = "https://zhuanlan.zhihu.com/api/recommendations/columns?limit=8&offset=1&seed=7"
  zhuanlanList: zhuanlanHost + "api/recommendations/columns",
  //https://www.zhihu.com/api/v4/columns/abcwj/items?limit=10&offset=80
  zhuanlanArticleList: host + "api/v4/columns/",
  //https://zhuanlan.zhihu.com/p/159294914
  articleDetail: zhuanlanHost + "api/posts/",
  articlecomments: host + "api/v4/articles/",
};
export default api;
