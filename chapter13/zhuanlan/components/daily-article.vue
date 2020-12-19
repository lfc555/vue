<template>
  <div class="daily-article" v-if="dataInfo!=null">
    <div class="daily-article-title">{{ dataInfo.title }}</div>
    <div class="daily-article-content" v-html="dataInfo.content"></div>

    <div class="daily-comments" v-show="comments.length">
      <span>评论({{ comments.length }})</span>
      <div class="daily-comment" v-for="comment in comments">
        <div class="daily-comment-avatar">
          <img :src="comment.author.member.avatar_url" />
        </div>
        <div class="daily-comment-content">
          <div class="daily-comment-name">{{ comment.author.member.name }}</div>
          <div class="daily-comment-time" v-time="comment.created_time"></div>
          <div class="daily-comment-text" v-html="comment.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "../libs/util";
import API from "../libs/api";
import Time from "../directives/time";

export default {
  directives: { Time },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      dataInfo: this.data,
      comments: [],
    };
  },
  methods: {
    getArticle() {
      //将文章中的图片地址替换为代理的地址
      this.data.content = this.data.content.replace(
        /src="http/g,
        'src="' + $.imgPath + "http"
      );
      this.data.content = this.data.content.replace(
        /src="https/g,
        'src="' + $.imgPath + "https"
      );
      this.dataInfo = this.data;
      //返回文章顶端
      window.scrollTo(0, 0);

      //
      this.getComments();
    },
    getComments: function () {
      this.comments = [];
      let articlecomments = `/${API.articlecomments}${this.id}/root_comments?order=normal&limit=20&offset=0&status=open`;

      $.ajax.get(articlecomments).then((res) => {
        //将头像 的图片 地址 转为 代理地址
        this.comments = res.data.map((comment) => {
          comment.author.member.avatar_url = $.imgPath + comment.author.member.avatar_url;
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