//webpack 入口文件
import Vue from "vue";
import VueRouter from "vue-router";
import Routers from "./router.js";
import Vuex from "vuex";
import App from "./app.vue";
import "./style.css";
import product_data from "./product";

Vue.use(VueRouter);
Vue.use(Vuex);

const RouterConfig = {
  //使用 html5的 history 路由模式
  mode: "history",
  routes: Routers,
};

//路由配置
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  window.document.title = "to.meta.title";
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
//路由状态
const store = new Vuex.Store({
  //状态存储
  state: {
    //商品列表数据
    productList: [],
    //购物车数据
    cartList: [],
  },
  //类似于计算属性
  getters: {},
  //改变 状态
  mutations: {
    //添加商品列表
    setProductList(state, data) {
      state.productList = data;
    },
  },
  //异步改变状态
  actions: {
    //请求商品列表
    getProductList(context) {
      //真实环境 应该通过ajax获取 这里用异步进行模拟
      setTimeout(() => {
        context.commit("setProductList", product_data);
      },1000);
    },
  },
});

//初始化实例
new Vue({
  el: "#app",
  router: router,
  store: store,
  render: (h) => {
    return h(App);
  },
});
