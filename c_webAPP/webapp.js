Vue.component("webapp", {
  props: {},
  template:
    '\
    <div class="container">\
  <div class="header">\
      <div>{{title}}</div>\
  <div>\
  <div class="content">\
      <slot></slot>\
  </div>\
  <div class="footer">\
      <btn text="提交" color="#eeeee" :show="submitShow" :disabled="subBtnDisabled" @click="submit"></btn>\
      <btn text="上一步" color="#eeeee" :show="lastShow"   @click="last"></btn>\
      <btn text="下一步" color="#eeeee" :show="nextShow" :disabled="nextBtnDisabled" @click="next"></btn>\
      <btn text="重置" color="#eeeee" :show="true"  @click="reset"></btn>\
  </div>\
  </div>',
  data: function() {
    return {
      title: "",
      currentValue: null,
      submitShow: false,
      nextShow: true,
      lastShow: true,
      subBtnDisabled: true,
      nextBtnDisabled: true,
      pageList: [],
      pageData: {}
    };
  },
  methods: {
    //V:true 启用, false 禁用
    updateSubmitStatus: function(v) {
      if (this.submitShow == true) {
        this.subBtnDisabled = !v;
      }
      if (this.nextShow == true) {
        this.nextBtnDisabled = !v;
      }
      this.keepStatus(!v);
    },
    //保持状态，“下一项”状态，即使来回切换，也保持原始状态
    keepStatus: function(v) {
      var _this = this;
      this.pageList.forEach(function(item, index) {
        if (item.name == _this.currentValue) {
          item.nextBtnDisabled = v;
          item.subBtnDisabled = v;
        }
      });
    },
    //自动获取所有的page
    getPages: function() {
      return this.$children.filter(function(item) {
        return item.$options.name === "page"; //通过遍历子组件，找到所有 name='page'的子组件
      });
    },
    //初始化
    updatePage: function() {
      var _this = this;
      this.getPages().forEach(function(page, index) {
        //console.log(index);

        _this.pageList.push({
          name: index,
          nextBtnDisabled: true, //保持状态
          subBtnDisabled: true //保持状态
        });

        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = index;
          }
        }
      });
      //
      this.updateStatus();
    },
    //切换页面时，更新按钮的状态
    updateStatus: function() {
      var pages = this.getPages();
      var _this = this;
      pages.forEach(function(page, index) {
        var v = index === _this.currentValue;
        //更新title
        if (v == true) {
          _this.title = page.title;
          //只有一页
          if (pages.length == 1) {
            _this.lastShow = false;
            _this.nextShow = false;
            _this.submitShow = true;
            _this.subBtnDisabled = false;
          } else {
            //第一页
            if (index == 0) {
              _this.lastShow = false;
              _this.nextShow = true;
              _this.nextBtnDisabled = true;

              _this.submitShow = false;
            }
            //最后一页
            else if (index == pages.length - 1) {
              _this.lastShow = true;
              _this.nextShow = false;
              _this.submitShow = true;
              _this.subBtnDisabled = true;
            }
            //既不是第一页，又不是最后一页
            else {
              _this.lastShow = true;
              _this.nextShow = true;
              _this.nextShow = true;
              _this.submitShow=false;
              _this.nextBtnDisabled = true;
            }
          }
        }
        //切换面内容
        return (page.show = v);
      });
      //恢复原有保持的状态
      var findItem = this.pageList.find(function(item, index) {
        return item.name == _this.currentValue;
      });
      this.nextBtnDisabled = findItem.nextBtnDisabled;
      this.subBtnDisabled = findItem.subBtnDisabled;
    },
    //提交所有数据
    submit: function() {
      console.log(this.pageData);
      alert(JSON.stringify(this.pageData));
      //console.log("submit");
    },
    //下一项
    next: function() {
      var _this = this;
      this.keepStatus(false);
      //
      this.currentValue++;

      //console.log("next：" + this.currentValue);
    },
    //上一项
    last: function() {
      this.currentValue--;

      //
      console.log("last");
    },
    //重置
    reset: function() {
      this.$children.forEach(function(item) {
        if (item.reset && typeof item.reset === "function") {
          item.reset();
        }
      });
      this.updateSubmitStatus(false);
      // console.log("reset");
    }
  },
  watch: {
    currentValue: function(val) {
      // console.log("currentValue:" + val);
      this.updateStatus();
    }
  },
  mounted: function() {
    this.updatePage();
  }
});
