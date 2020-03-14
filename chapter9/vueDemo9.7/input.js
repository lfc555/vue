Vue.component("vInput", {
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },
  render: function(h) {
    var _this = this;
    return h("div", [
      h("span", "昵称："),
      h("input", {
        attrs: {
          type: "text"
        },
        domProps: {
          value: _this.value
        },
        on: {
          input: function(event) {
            _this.value = event.target.value;
            _this.$emit("input", event.target.value);
          }
        }
      })
    ]);
  }
});
//textarea 组件
Vue.component("vTextarea", {
  props: {
    value: {
      type: [String, Number],
      default: ""
    }
  },
  render: function(h) {
    var _this = this;
    return h("div", [
      h("span", "留言内容："),
      h("textarea", {
        attrs: {
          placeholder: "请输入留言内容"
        },
        ref: "message",
        domProps: {
          value: _this.value
        },
        on: {
          input: function(event) {
            _this.value = event.target.value;
            _this.$emit("input", event.target.value);
          }
        }
      })
    ]);
  },
  methods: {
    focus: function() {
      this.$refs.message.focus();
      
    }
  }
});
