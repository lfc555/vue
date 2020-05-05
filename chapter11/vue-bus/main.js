//第一种
// import './style.css'
// document.getElementById('app').innerHTML='hello webpack'
//第二种 使用vue
//导入Vue框架
import Vue from "vue";
//导出 vue 路由插件
import VueRouter from "vue-router";
//导出 vuex 状态管理插件
import Vuex from "vuex";
import VueBus from "./vue-bus";

//导入 app.vue组件
import App from "./app.vue";

Vue.use(VueRouter); //使用路由
Vue.use(Vuex); //使用Vuex
Vue.use(VueBus);

//01  路由配置
const Routers = [
  {
    path: "/index",
    meta: {
      title: "首页",
    },
    component: (resolve) => require(["./views/index.vue"], resolve),
  },
  {
    path: "/about",
    meta: {
      title: "关于",
    },
    component: (resolve) => require(["./views/about.vue"], resolve),
  },
  {
    path: "/user/:id", //直接在页面中  跳转http://127.0.0.1:8888/user/212312 失败
    meta: {
      title: "个人主页",
    },
    component: (resolve) => require(["./views/user.vue"], resolve),
  },
  {
    path: "*",
    redirect: "./index", //指 index.vue页面
  },
];
//路由配置模式
const RouterConfig = {
  //使用html5的history模式，默认模式为hash
  mode: "history",
  routes: Routers,
};
const router = new VueRouter(RouterConfig);
//hook beforeeach /aftereach
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  
  //可以用来判断用户是否 已经登录，没有登录则跳转到登录页面
  console.log(to.path);
  if (to.path !== "/index") {
    if (window.localStorage.getItem("token")) {
      console.log("用户已经登录，正常跳转");
      next();
    } else {
      console.log("用户没有登录，跳转到首页");
      next("/index");
    }
  } else {
    next();
  }
});
//
router.afterEach((to, from, next) => {
  //window.scrollTo(0, 0);
});

//02  Vuex 配置
const store = new Vuex.Store({
  //vuex的配置
  state: {
    count: 0,
    list: [1, 5, 8, 10, 11, 45, 19],
  },
  //getters
  getters: {
    filteredList: (state) => {
      return state.list.filter((itme) => itme > 10);
    },
    listCount: (state, getters) => {
      return getters.filteredList.length;
    },
  },
  //mutation
  mutations: {
    increment(state, params) {
      state.count += params.count;
    },
    decrease(state) {
      state.count--;
    },
  },
  //action 用来处理异步操作，
  actions: {
    //这是一个非异步示例
    increment: function(context) {
      context.commit({
        type: "increment",
        count: 2,
      });
    },
    //这是一个异步示例
    ansycIncrement: (context) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit({
            type: "increment",
            count: 3,
          });
          resolve();
        }, 1000);
      });
    },
  },
});

//创建Vue根实例
new Vue({
  el: "#app",
  router: router, //使用router
  store: store, //使用vuex
  render: (h) => h(App),
});
