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

    <div>
      随机增加：
      <Counter :number="number"></Counter>
    </div>
  </div>
</template>
<script>
//引入组件
import Counter from "./Counter.vue";

export default {
  components: {
    Counter
  },
  data() {
    return {
      number: 0
    };
  },

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
    handleAddRandom(num) {
    console.log("使用了 vue bus 插件");
      this.number += num;
    },
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
    handleSyncActionIncrement() {
      this.$store.dispatch("ansycIncrement").then(() => {
        console.log(this.$store.state.count);
      });
    }
  },
  created() {
    this.$bus.on("add", this.handleAddRandom);
  },
  beforeDestroy() {
    this.$bus.off("add", this.handleAddRandom);
  }
};
</script>