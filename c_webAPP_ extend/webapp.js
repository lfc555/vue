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
  data: function () {
    return {
      title: "",
      currentValue: null,
      submitShow: false,
      nextShow: true,
      lastShow: true,
      subBtnDisabled: true,
      nextBtnDisabled: true,
      pageList: [], //存储 页码、该页面验证状态（通过、不通过等）
      pageData: {},
    };
  },
  methods: {
    //自动获取所有的page
    getPages: function () {
      return this.$children.filter(function (item) {
        return item.$options.name === "page"; //通过遍历子组件，找到所有 name='page'的子组件
      });
    },
    //初始化
    updatePage: function () {
      var _this = this;
      let validatorParams = {}; //验证的参数
      this.getPages().forEach(function (page, index) {
        //console.log(index);

        validatorParams = {
          index: index,
          name: page.name,
          validaotr: false, //默认验证不通过
          validaotrTotal: 0, //该页面 需要验证的数量
          validTotal: 0, //验证通过数量
          validList: [], //验证列表[{id:001,valid:false,error:至少选择3个选项}，{id:002,valid:true,error:""}]
        };

        page.$children.filter(function (item) {
          var isValid = item.$attrs.valid; //通过遍历子组件，找到所有 需要验证的 valid 子组件
          if (isValid != undefined) {
            var id = item.id;
            validatorParams.validList.push({
              id: id,
              valid: false,
              error: "初始状态",
            });
          }
        });
        validatorParams.validaotrTotal = validatorParams.validList.length;
        _this.pageList.push(validatorParams);
        //
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
    updateStatus: function () {
      var pages = this.getPages();
      var _this = this;
      pages.forEach(function (page, index) {
        var v = index === _this.currentValue;
        //更新title
        if (v == true) {
          var validatorParams = _this.pageList.find((item) => {
            return item.index == index;
          }); //
          if (!validatorParams || validatorParams.validList.length == 0) {
            validatorParams = { validaotr: true };
          }
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
              if (validatorParams.validaotr) {
                _this.nextShow = true;
                _this.nextBtnDisabled = false;
              } else {
                _this.nextShow = true;
                _this.nextBtnDisabled = true;
              }
              _this.submitShow = false;
            }
            //最后一页
            else if (index == pages.length - 1) {
              _this.lastShow = true;
              _this.nextShow = false;
              if (validatorParams.validaotr) {
                _this.submitShow = true;
                _this.subBtnDisabled = false;
              } else {
                _this.submitShow = true;
                _this.subBtnDisabled = true;
              }
            }
            //既不是第一页，又不是最后一页
            else {
              _this.lastShow = true;
              if (validatorParams.validaotr) {
                _this.nextShow = true;
                _this.nextBtnDisabled = false;
              } else {
                _this.nextShow = true;
                _this.nextBtnDisabled = true;
              }
              _this.submitShow = false;
            }
          }
        }
        //切换面内容
        return (page.show = v);
      });
    },
    //提交所有数据
    submit: function () {
      console.log(this.pageData);
      alert(JSON.stringify(this.pageData));
      //console.log("submit");
    },
    //下一项
    next: function () {
      var _this = this;
      //
      this.currentValue++;

      //console.log("next：" + this.currentValue);
    },
    //上一项
    last: function () {
      this.currentValue--;

      //
      console.log("last");
    },
    //重置
    reset: function () {
      this.$children.forEach(function (item) {
        if (item.reset && typeof item.reset === "function") {
          item.reset();
        }
      });
      // console.log("reset");
    },
  },
  watch: {
    currentValue: function (val) {
      // console.log("currentValue:" + val);
      this.updateStatus();
    },
  },
  mounted: function () {
    this.updatePage();
  },
});
