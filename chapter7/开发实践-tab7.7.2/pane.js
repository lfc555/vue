Vue.component("pane", {
  name: "pane", //递归组件
  props: {
    //标签页的唯一标识
    name: {
      type: String,
    },
    //标签标题
    label: {
      type: String,
      default: "",
    },
    //该tab是否可以被关闭，默认可以关闭
    closable: {
      type: String,
      default: true,
    },
  },
  template: '<div class="pane" v-show="show">\
<slot></slot>\
    </div>',
  data: function () {
    return {
      show: true,
    };
  },
  methods: {
    updateNav: function () {
      this.$parent.updateNav(); //除了tab ，其他位置尽量不要使用$parent操作父链
    },
  },
  watch: {
    label: function () {
      this.updateNav();
    },
  },
  mounted: function () {
    this.updateNav();
  },
});
