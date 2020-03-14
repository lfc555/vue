var app = new Vue({
  el: "#app",
  data: {
    username: "",
    message: "",
    list: []
  },
  methods: {
    //发送
    handleSend: function() {
      if (this.username === "") {
        window.alert("请输入昵称");
        return;
      }
      if (this.message === "") {
        window.alert("请输入留言内容");
      }

      this.list.push({
        name: this.username,
        message: this.message
      });
      this.message = "";
    },
    //回复
    handleReply: function(index) {
      var name = this.list[index].name;
      this.message = "回复@" + name + "：";
      //
      this.$refs.message.focus();
    }
  }
});
