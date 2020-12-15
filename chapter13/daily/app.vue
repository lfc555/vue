<template>
  <div class="daily">
    <!-- 左侧菜单 -->
    <div class="daily-menu">
      <div
        class="daily-menu-item"
        :class="{ on: type === 'recommend' }"
        @click="handleToRecommend"
      >
        每日推荐
      </div>
      <div
        class="daily-menu-item"
        :class="{ on: type === 'daily' }"
        @click="showThemes = !showThemes"
      >
        主题日报
      </div>
      <ul v-show="showThemes">
        <li v-for="item in themes">
          <a
            :class="{ on: item.id === themeId && type === 'daily' }"
            @click="handleToTheme(item.id)"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <!-- 中间文章列表 -->
    <div class="daily-list" ref="list">
      <template v-if="type === 'recommend'">
        <div v-for="list in recommendList">
          <div class="daily-date">{{ formatDay(list.date) }}</div>
          <Item v-for="item in list.stories" :data="item" :key="item.id"></Item>
        </div>
      </template>
      <template v-if="type === 'daily'">
        <div v-for="list in list">
          <Item v-for="item in list.stories" :data="item" :key="item.id"></Item>
        </div>
      </template>
    </div>
    <!-- 右文章详细 -->
    <daily-article></daily-article>
  </div>
</template>
<script>
//import
import $ from "./libs/util";
import Item from "./components/item.vue";

export default {
  components: { Item }, //局部组件
  data: function () {
    return {
      themes: [],
      showThems: false,
      type: "recommend",
      recommendList: [],
      dailyTime: $.getTodayTime(),
      isLoading: false,
      themeId: 0,
    };
  },
  methods: {
    //获取主题日报下面的子分类
    getThemes: function () {
      //axios 发起get请求
      $.ajax.get("themes").then((res) => {
        this.themes = res.others;
      });
    },
    //点击 主题日报的子类时加载 该子类文章列表
    handleToTheme(id) {
      // 改变菜单分类
      this.type = "daily";
      //设置当前点击子类的主题日报id
      this.themeId = id;
      //清空中间栏的数据
      this.list = [];
      $.ajax.get("theme/" + id).then((res) => {
        this.list = res.stories.filter((item) => item.type !== 1);
      });
    },
    //每日推荐
    handleToRecommend() {
      this.type = "recommend";
      this.recommendList = [];
      this.dailyTime = $.getTodayTime();
      this.getRecommendList();
    },
    getRecommendList() {
      this.isLoading = true;
      const prevDay = $.prevDay(this.dailyTime + 86400000);
      $.ajax.get("news/before/" + prevDay).then((res) => {
        this.recommendList.push(res);
        this.isLoading = false;
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
    //初始化时调用获取 主题日报子类
    this.getThemes();
    //默认获取并显示每日推荐
    this.getRecommendList();
    //获取到 dom
    const $list = this.$refs.list;
    //临听中栏的滚动事件
    $list.addEventListene("scroll", () => {
      //在“主题日报” 或正在加载推荐列表时停止操作
      if (this.type === "daily" || this.isLoading) {
        return;
      }
      //已经滚动的距离加页面的高度 = 整个内容区域高度时，视为接触底部
      if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
        //时间相对减少一天
        this.dailyTime -= 86400000;
        this.getRecommendList();
      }
    });
  },
};
</script>

 