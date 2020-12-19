<template>
  <a class="daily-item">
    <div class="daily-img" v-if="data.image_url">
      <img :src="imgPath + data.image_url" />
    </div>
    <div class="daily-title" :class="{ noImg: data.image_url }">
      {{ data.title }}
    </div>
    <div>评论数({{ data.comment_count }})</div>
    <div><a :href="data.url" target="_blank">原文链接</a></div>
  </a>
</template>
<script>
import $ from "../libs/util";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      imgPath: $.imgPath,
    };
  },
};
</script>