Vue.component("tabs", {
  template:
    '\
    <div class="tabs">\
    <div class="tabs-bar">\
    <div \
       :class="tabCls(item)"\
       v-for="(item,index) in navList"\
       @click="handleChange(index)">\
       <span>{{item.label}}</span>\
       <span class="closable" @click="closable(index)" v-show="item.closable">X</span>\
    </div>\
    </div>\
    <div class="tabs-content">\
        <slot></slot>\
    </div>\
    </div>\
    ',
  props: {
    value: {
      type: [String, Number],
    },
  },
  data: function () {
    return {
      currentValue: this.value,
      navList: [],
    };
  },
  methods: {
    tabCls: function (item) {
      return [
        "tabs-tab",
        {
          "tabs-tab-active": item.name === this.currentValue,
        },
      ];
    },
    getTabs: function () {
      return this.$children.filter(function (item) {
        return item.$options.name === "pane"; //通过遍历子组件，找到所有 name='pane'的子组件
      });
    },
    updateNav: function () {
      this.navList = [];
      var _this = this;
      this.getTabs().forEach(function (pane, index) {
        console.log(pane.closable);

        _this.navList.push({
          label: pane.label,
          closable: pane.closable,
          name: pane.name || index,
        });
        if (!pane.name) pane.name = index;
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index;
          }
        }
      });
      this.updateStatus();
    },
    updateStatus: function () {
      var tabs = this.getTabs();
      var _this = this;
      tabs.forEach(function (tab) {
        return (tab.show = tab.name === _this.currentValue);
      });
    },
    //切换 tabs
    handleChange: function (index) {
      var nav = this.navList[index];
      var name = nav.name;
      this.currentValue = name;
      //
      this.$emit("input", name);
      this.$emit("on-click", name);
    },
    //关闭tab
    closable: function (index) {
      var nav = this.navList[index];
      var name = nav.name;
    },
  },
  watch: {
    value: function (val) {
      this.currentValue = val;
    },
    currentValue: function () {
      this.updateStatus();
    },
  },
  mounted: function () {
    console.log(this.navList);
  },
});
