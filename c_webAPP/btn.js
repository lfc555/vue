Vue.component("btn", {
  props: {
    //按钮的文本
    text: {
      type: String
    },
    //按钮的颜色
    color: {
      type: String
    },
    //是否显示按钮
    show: {
      type: Boolean,
      default: true
    },
    //是否禁用
    disabled: {
      type: Boolean,
      defalut: true
    }
  },
  template:
    "<button v-show='show'\
     :style=\"{'color':color}\"\
     :disabled ='disabled'\
     @click='click'> {{text}}</button>",
  methods: {
    click: function() {
      this.$emit("click");
    }
  },
  computed: {}
});
