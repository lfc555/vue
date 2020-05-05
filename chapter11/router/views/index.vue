<template>
<div>
  <div>首页</div>
  <!-- 在HTML5 的History 模式下会拦截点击，避免浏览器重新加载页面 -->
  <router-link to="/about" tag="li" replace>跳转到about</router-link>
  </div>
</template>
<script>
export default {};
</script>