<template>
  <!-- <div>Hello {{name}}</div> -->
  <div>
    <v-title title="Vue组件化"></v-title>
    <v-button @click="handleClick">点击按钮</v-button>
    <p>
      <img src="images/image.png" style="width:200px">
    </p>
  </div>
</template>
<script>
//导入组件
import vTitle from "./title.vue";
import vButton from "./button.vue";
export default {
  //局部注册
  components: {
    vTitle,
    vButton
  },
  methods: {
    handleClick(e) {
      console.log(e);
    }
  },
  data() {
    return {
      name: "Vue.js"
    };
  }
};
</script>

<style scoped>
div {
  color: #f60;
  font-size: 24px;
}
</style>
