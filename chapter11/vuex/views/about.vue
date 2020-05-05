<template>
<div>
  <div>介绍页</div>
  <button @click="handoeRouter">跳转到user</button>
  </div>
</template>
<script>
export default {
  methods: {
    handoeRouter(){
      this.$router.push('/user/吕方操');
    }
  },
};
</script>