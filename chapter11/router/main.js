//第一种
// import './style.css'
// document.getElementById('app').innerHTML='hello webpack'
//第二种 使用vue
//导入Vue框架
import Vue from "vue";
//导出 vue 路由插件
import VueRouter from "vue-router";
//导入 app.vue组件
import App from "./app.vue";

//使用vue路由组件，不同的请求动态加载不同的组件
Vue.use(VueRouter);
//01 定义常量 路由数组
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
    //定义默认页面
    path: "*",
    redirect: "./index", //指 index.vue页面
  },
];
//02 配置模式
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

  if (false) {
    if (to.path !== "/index") {
      if (window.localStorage.getItem("token")) {
        console.log("用户已经登录，正常跳转");
        next();
      } else {
        console.log("用户没有登录，跳转到首页");
        next("/index");
        //next(false);//可以取消导航
      }
    } else {
      next();
    }
  }
  else{
    next();
  }
});
//
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

//创建Vue根实例
new Vue({
  el: "#app",
  router: router,
  render: (h) => h(App),
});
