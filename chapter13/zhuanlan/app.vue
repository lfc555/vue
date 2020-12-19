<template>
  <div class="daily">
    <!-- 左侧菜单 -->
    <div class="daily-menu">
      <div
        class="daily-menu-item"
        :class="{ on: type === 'daily' }"
        @click="getThemes"
      >
        知乎专栏
      </div>
      <ul>
        <li v-if="themes.length > 0" v-for="item in themes">
          <a
            :class="{ on: item.id === themeId && type === 'daily' }"
            @click="handleToTheme(item.id)"
          >
            {{ item.title }}
          </a>
        </li>
        <li v-else>暂时没有内容</li>
      </ul>
    </div>
    <!-- 中间文章列表 -->
    <div class="daily-list" ref="list">
      <!-- <template v-if="type === 'recommend'">
        <div v-for="list in recommendList">
          <div class="daily-date">{{ formatDay(list.date) }}</div>
          <Item
            v-for="item in list.stories"
            :data="item"
            :key="item.id"
            @click.native="handleClick(item.id)"
          ></Item>
        </div>
      </template> -->

      <template v-if="type === 'daily'">
        <Item
          v-for="item in list"
          :data="item"
          :key="item.id"
          @click.native="handleClick(item.id, item)"
        ></Item>
      </template>
    </div>
    <!-- 右侧文章详细 -->

    <daily-article
      :id="articleId"
      :data="articleData"
      v-show="articleId != 0"
    ></daily-article>
  </div>
</template>
<script>
//import
import $ from "./libs/util";
import API from "./libs/api";
//导入组件
import Item from "./components/item.vue";
import dailyArticle from "./components/daily-article.vue";

export default {
  components: { Item, dailyArticle }, //局部组件
  data: function () {
    return {
      themes: [],
      type: "recommend",
      recommendList: [],
      list: [],
      dailyTime: $.getTodayTime(),
      isLoading: false,
      themeId: 0, //专栏Id
      articleId: 0, //文章id
      articleData: null, //文章数据（没有api，只能从文章列表中获取信息）
      zhuanlanParams: { limit: 8, offset: 0, seed: 7 },
      zhuanlanArticleListParams: {
        limit: 20,
        offset: 0,
        zhuanlanName: "",
        is_end: false,
      },
    };
  },
  methods: {
    handleClick(id, data) {
      this.articleId = id;
      this.articleData = data;
    },
    //获取专栏推荐
    getThemes: function () {
      var _this = this;
      //axios 发起get请求
      //"https://zhuanlan.zhihu.com/api/recommendations/columns?limit=8&offset=1&seed=7"
      var zhuanlanListUrl = `/${API.zhuanlanList}?limit=${this.zhuanlanParams.limit}&offset=${this.zhuanlanParams.offset}&seed=${this.zhuanlanParams.seed}`;
      $.ajax.get(zhuanlanListUrl).then((res) => {
        let filterNULL = res.data.filter((x) => {
          //数据里面有个别值为NULL 需要排除
          return x !== null;
        });
        _this.themes = filterNULL;
        //
        _this.zhuanlanParams.offset += 8;
      });
    },
    //专栏文章列表
    handleToTheme(id, para) {
      if (para != "next") {
        this.list = [];
        this.zhuanlanArticleListParams = {
          limit: 20,
          offset: 0,
          zhuanlanName: "",
        };
      }

      this.isLoading = true;
      var _this = this;
      // 改变菜单分类
      this.type = "daily";
      //专栏id
      this.themeId = id;

      //https://www.zhihu.com/api/v4/columns/abcwj/items?limit=10&offset=80
      this.zhuanlanArticleListParams.zhuanlanName = id;
      var zhuanlanArticleListUrl = `/${API.zhuanlanArticleList}${id}/items?limit=${this.zhuanlanArticleListParams.limit}&offset=${this.zhuanlanArticleListParams.offset}`;

      $.ajax.get(zhuanlanArticleListUrl).then((res) => {
        if (res.paging.is_end == true) {
          _this.isLoading = false;
          alert("没有更多内容了");
        } else {
          _this.list.push.apply(_this.list, res.data);
          _this.zhuanlanArticleListParams.offset += 20;
          _this.isLoading = false;
        }
      });
    },

    //转换为带汉字的月日
    formatDay(date) {
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      if (month.substr(0, 1) === "0") month = month.substr(1, 1);
      if (day.substr(0, 1) === "0") day = day.substr(1, 1);
      return `${month}月${day}日`;
    },
  },
  mounted() {
    let _this = this;
    //初始化时调用获取 主题日报子类
    this.getThemes();
    //获取到 dom
    const $list = this.$refs.list;
    //临听中栏的滚动事件
    $list.addEventListener("scroll", () => {
      //在“主题日报” 或正在加载推荐列表时停止操作
      if (this.isLoading) {
        return;
      }
      //已经滚动的距离加页面的高度 = 整个内容区域高度时，视为接触底部
      if (
        $list.scrollTop + document.body.clientHeight + 500 >=
        $list.scrollHeight
      ) {
        _this.handleToTheme(_this.themeId, "next");
      }
    });
  },
};
</script>

 