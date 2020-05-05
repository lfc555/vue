<template>
  <div>
    <div class="head">我是头部</div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="bottom">我是尾部</div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.bottom,
.head {
  height: 200px;
  background-color: rgb(172, 173, 88);
  text-align: center;
  line-height: 200px;
}
.content{
  line-height:100px;
  background-color:rgba(160, 147, 151, 0.253);
}

</style>