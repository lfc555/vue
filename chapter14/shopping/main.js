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

//数组去重
function getFilterArray(array) {
  const res = [];
  const json = {};
  for (let i = 0; i < array.length; i++) {
    const _self = array[i];
    if (!json[_self]) {
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}

//路由配置
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

//路由状态
const store = new Vuex.Store({
  modules: {},
  //状态存储
  state: {
    //商品列表数据
    productList: [],
    //购物车数据
    cartList: [],
  },
  //类似于计算属性

  getters: {
    brands: (state) => {
      const brands = state.productList.map((item) => item.brand);
      return getFilterArray(brands);
    },
    colors: (state) => {
      const colors = state.productList.map((item) => item.color);
      return getFilterArray(colors);
    },
  },
  //改变 状态
  mutations: {
    //添加商品列表
    setProductList(state, data) {
      state.productList = data;
    },
    //添加购物车
    addCart(state, id) {
      const isAdded = state.cartList.find((item) => item.id === id);
      if (isAdded) {
        isAdded.count++;
      } else {
        state.cartList.push({
          id: id,
          count: 1,
        });
      }
    },
    //修改商品数量
    editCartCount(state, payload) {
      const product = state.cartList.find((item) => item.id == payload.id);
      product.count += payload.count;
    },
    // 删除商品
    deleteCart(state, id) {
      const index = state.cartList.findIndex((item) => item.id == id);
      state.cartList.splice(index, 1);
    },
    //清空购物车
    emptyCart(state) {
      state.cartList = [];
    },
  },
  //异步改变状态
  actions: {
    //请求商品列表
    getProductList(context) {
      //真实环境 应该通过ajax获取 这里用异步进行模拟
      setTimeout(() => {
        context.commit("setProductList", product_data);
      }, 1000);
    },
    //购买结算
    buy(context) {
      //真实环境应通过ajax提交数据再清空购物车， 这里用promise进行模拟
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit("emptyCart");
          resolve();
        }, 500);
      });
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
