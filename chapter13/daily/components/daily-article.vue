<template>
  <div class="daily-article">
    <div class="daily-article-title">{{ data.title }}</div>
    <div class="daily-article-content" v-html="data.body"></div>

    <div class="daily-comments" v-show="comments.length">
      <span>评论({{ comments.length }})</span>
      <div class="daily-comment" v-for="comment in comments">
        <div class="daily-comment-avatar">
          <img :src="comment.avatar" />
        </div>
        <div class="daily-comment-content">
          <div class="daily-comment-name">{{ comment.author }}</div>
          <div class="daily-comment-time" v-time="comment.time"></div>
          <div class="daily-comment-text">{{ comment.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "../libs/util";
import Time from "../directives/time";

export default {
  directives: { Time },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      data: {},
      comments: [],
    };
  },
  methods: {
    getArticle() {
      $.ajax.get("news/" + this.id).then((res) => {
        //将文章中的图片地址替换为代理的地址
        res.body = res.body.replace(/src="http/g, 'src="' + $.imgPath + "http");
        res.body = res.body.replace(
          /src="https/g,
          'src="' + $.imgPath + "https"
        );
        this.data = res;
        //返回文章顶端
        window.scrollTo(0, 0);

        //
        this.getComments();
      });
    },
    getComments: function () {
      this.comments = [];
      $.ajax.get("story/" + this.id + "/short-comments").then((res) => {
        //将头像 的图片 地址 转为 代理地址
        this.comments = res.comments.map((comment) => {
          comment.avatar = $.imgPath + comment.avatar;
          return comment;
        });
      });
    },
  },
  watch: {
    id(val) {
      if (val) this.getArticle();
    },
  },
};
</script>