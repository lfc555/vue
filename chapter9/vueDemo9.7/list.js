Vue.component("vList", {
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  render: function(h) {
    var _this = this;
    var list = [];
    this.list.forEach(function(msg, index) {
      var node = h("div", [
        h("span", msg.name + ":"),
        h(
          "div",
          {
            attrs: {
              class: "list-msg"
            }
          },
          [
            h("p", msg.message),
            h(
              "a",
              {
                attrs: {
                  class: "list-reply"
                },
                on: {
                  click: function(event) {
                    _this.handleReply(index);
                  }
                }
              },
              "回复"
            )
          ]
        )
      ]);
      //
      list.push(node);
    });
    //
    if (list.length > 0) {
      return h(
        "div",
        {
          attrs: {
            class: "list"
          }
        },
        list
      );
    } else {
      return h(
        "div",
        {
          attrs: {
            class: "list-nothing"
          }
        },
        "留言内容为空"
      );
    }
  },
  methods: {
    handleReply: function(index) {
      //回复
      this.$emit("reply", index);
    }
  }
});
