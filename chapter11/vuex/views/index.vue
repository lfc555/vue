<template>
  <div>
    <div>首页</div>

    <span>list中大于10的数字{{list}}长度：{{listCount}}</span>
    {{count}}
    <button @click="handleIncrement">+10</button>
    <button @click="handleDecrease">-1</button>
    <button @click="handleActionIncrement">action +2</button>
    <button @click="handleSyncActionIncrement">action +3</button>
    <!-- 在HTML5 的History 模式下会拦截点击，避免浏览器重新加载页面 -->
    <router-link to="/about" tag="li" replace>跳转到about</router-link>
  </div>
</template>
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    list() {
      //方式1
      //return this.$store.state.list.filter(itme=>itme>10);
      //方式二  getters
      return this.$store.getters.filteredList;
    },
    listCount() {
      return this.$store.getters.listCount;
    }
  },
  methods: {
    handleIncrement() {
      this.$store.commit({
        type: "increment",
        count: 10
      });
    },
    handleDecrease() {
      this.$store.commit("decrease");
    },
    handleActionIncrement: function() {
      this.$store.dispatch("increment");
    },
    //handleSyncActionIncrement:()=>{}//不适用？？？
    //异步操作
    handleSyncActionIncrement(){
      this.$store.dispatch("ansycIncrement").then(()=>{
        console.log(this.$store.state.count);
      });
    }
  }
};
</script>